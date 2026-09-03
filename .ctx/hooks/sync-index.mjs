#!/usr/bin/env node
// Optional. Keeps .ctx/index.md honest: every file has a row, every row points
// at a real file.
//
//   node .ctx/hooks/sync-index.mjs          report drift, exit 0
//   node .ctx/hooks/sync-index.mjs --fix    append missing files to "Unfiled"
//   node .ctx/hooks/sync-index.mjs --strict exit 1 on drift (for CI)
//   node .ctx/hooks/sync-index.mjs --hook   emit hook JSON, always exit 0
//
// It deliberately does NOT regenerate the whole table. The hand-written "read
// it when" prose is the most valuable thing in index.md and a generator would
// flatten it. This only catches the failure that actually happens: a file gets
// added and never indexed, so it stays invisible forever.
//
// Requires Node >= 18, no npm dependencies. Delete this file freely.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const CTX = ".ctx";
const INDEX = join(CTX, "index.md");
const SKIP_FILES = new Set(["index.md", "scratchpad.md", "README.md"]);
// adapters/ and skills/ are payload to be copied elsewhere, not context docs.
const SKIP_DIRS = new Set(["hooks", "sessions", "work", "adapters", "skills"]);

const args = new Set(process.argv.slice(2));
const flag = (n) => args.has(`--${n}`);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(full, out);
    } else if (e.name.endsWith(".md") && !e.name.startsWith("_")) {
      out.push(full);
    }
  }
  return out;
}

// Pull one scalar key out of a leading --- frontmatter block.
function frontmatterValue(text, key) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const line = text
    .slice(3, end)
    .split("\n")
    .find((l) => l.trim().startsWith(`${key}:`));
  if (!line) return null;
  return line.slice(line.indexOf(":") + 1).trim().replace(/^["']|["']$/g, "");
}

let indexText;
try {
  indexText = readFileSync(INDEX, "utf8");
} catch {
  if (flag("hook")) process.exit(0);
  console.error(`No ${INDEX}. Run this from the repo root.`);
  process.exit(flag("strict") ? 1 : 0);
}

const files = walk(CTX)
  .map((p) => relative(CTX, p).split(sep).join("/"))
  .filter((p) => !SKIP_FILES.has(p));

const rows = indexText
  .split("\n")
  .filter((l) => l.trim().startsWith("|") && !/^\s*\|[\s|:-]*\|?\s*$/.test(l));

// A row naming a directory covers everything beneath it. `inbox/`, `decisions/`
// and `rules/` fill up as work happens, and demanding a row per item would make
// the index a second copy of the queue — noisy, and wrong within a week.
const coveredDirs = rows.flatMap((r) =>
  [...r.matchAll(/`([A-Za-z0-9_./-]+\/)`/g)].map((m) => m[1])
);

// Match the full relative path only. Matching the basename too used to let
// `inbox/README.md` pass on the row written for `README.md`, so a file could be
// unindexed and still report clean.
const indexed = (p) =>
  rows.some((r) => r.includes(`\`${p}\``)) ||
  coveredDirs.some((d) => p.startsWith(d));

const missing = files.filter((p) => !indexed(p));

// Rows referencing a path that no longer exists. A row may legitimately name a
// file at the repo root — `AGENTS.md` is the one that matters — so a reference
// counts as live if it resolves either inside .ctx/ or beside it.
const exists = (p) => {
  try {
    statSync(p);
    return true;
  } catch {
    return false;
  }
};

const dead = [];
for (const row of rows) {
  for (const [, ref] of row.matchAll(/`([^`]+\.md)`/g)) {
    const found = ref.startsWith(".ctx/")
      ? exists(ref)
      : exists(join(CTX, ref)) || exists(ref) || exists(join(CTX, "adapters", ref));
    if (!found && !dead.includes(ref)) dead.push(ref);
  }
}

// Appending a second "Unfiled" block would bury the first one, so refuse once
// there's already an unresolved section waiting to be filed properly.
const hasUnfiled = /^##\s+Unfiled\s*$/m.test(indexText);
let appended = 0;

if (flag("fix") && missing.length && !hasUnfiled) {
  appended = missing.length;
  const lines = missing.map((p) => {
    const when =
      frontmatterValue(readFileSync(join(CTX, p), "utf8"), "read_when") ??
      "<FILL: when is this worth reading?>";
    return `| \`${p}\` | ${when} |`;
  });
  const block = `\n## Unfiled\n\n<!-- Added by sync-index. Move these into the right section above and\n     write a real "read it when" — a vague row is nearly as bad as no row. -->\n\n| File | Read it when |\n|---|---|\n${lines.join("\n")}\n`;
  writeFileSync(INDEX, indexText.trimEnd() + "\n" + block, "utf8");
}

const summary = [
  missing.length
    ? `${missing.length} file(s) in .ctx/ have no index row: ${missing.join(", ")}`
    : null,
  dead.length ? `${dead.length} index row(s) point at missing files: ${dead.join(", ")}` : null,
].filter(Boolean);

if (flag("hook")) {
  if (summary.length) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "Stop",
          additionalContext:
            `.ctx/index.md is out of sync. ${summary.join(" ")} ` +
            `Files with no row are invisible to future sessions — add rows before finishing.`,
        },
      })
    );
  }
  process.exit(0);
}

if (!summary.length) {
  console.log("index.md is in sync.");
  process.exit(0);
}

for (const line of summary) console.log(line);
if (appended) console.log(`\nAppended ${appended} row(s) under "Unfiled" — write real descriptions.`);
else if (flag("fix") && hasUnfiled)
  console.log('\nAn "Unfiled" section already exists. File those rows first.');
else if (!flag("fix")) console.log("\nRun with --fix to append the missing ones.");

process.exit(flag("strict") ? 1 : 0);
