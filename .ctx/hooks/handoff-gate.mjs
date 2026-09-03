#!/usr/bin/env node
// Optional. Nudges the agent to update .ctx/handoff.md when a session is
// ending with uncommitted source changes and no handoff update.
//
// Install: see .ctx/hooks/README.md. Requires Node >= 18. Nothing else in
// .ctx/ depends on this file — delete the whole hooks/ directory if you
// don't want it.
//
// Fails open, always. A broken session-end hook degrades every single turn,
// so every error path here exits 0 and stays silent.

import { execFileSync } from "node:child_process";

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data.trim();
}

let input = {};
try {
  const raw = await readStdin();
  if (raw) input = JSON.parse(raw);
} catch {
  process.exit(0);
}

// Loop protection is not optional: without it the agent can be held in a
// session it is never allowed to end. Claude and Codex send stop_hook_active,
// Cursor sends loop_count.
if (input.stop_hook_active === true) process.exit(0);
if ((input.loop_count ?? 0) >= 1) process.exit(0);

let porcelain;
try {
  porcelain = execFileSync("git", ["status", "--porcelain"], {
    encoding: "utf8",
    timeout: 5000,
  });
} catch {
  process.exit(0); // not a repo, or no git
}

// Porcelain v1 is "XY <path>", the path starting at column 3. A rename is
// "XY <old> -> <new>", and a path with unusual characters arrives quoted.
// Take the destination in both cases, or a renamed handoff.md reads as an
// unrelated file and the gate fires when it shouldn't.
function destination(line) {
  let p = line.slice(3).trim();
  const arrow = p.lastIndexOf(" -> ");
  if (arrow !== -1) p = p.slice(arrow + 4).trim();
  if (p.startsWith('"') && p.endsWith('"')) p = p.slice(1, -1);
  return p.replace(/^\.\//, "");
}

const paths = porcelain.split("\n").map(destination).filter(Boolean);

// "Source" means anything outside .ctx/. Editing context docs alone doesn't
// trip the gate — that is usually bookkeeping, and nagging about it is how a
// gate teaches you to dismiss it.
const touchedSource = paths.some((p) => !p.startsWith(".ctx/"));
const touchedHandoff = paths.includes(".ctx/handoff.md");

if (!touchedSource || touchedHandoff) process.exit(0);

const message =
  "Source files changed but .ctx/handoff.md was not updated. Record the " +
  "current task, the single next concrete step, and anything you tried that " +
  "didn't work, then finish.";

const event = input.hook_event_name ?? "Stop";

// Two shapes, and an unknown event falls through to the second. Nothing here
// ever answers `decision: "block"`: blocking renders as an error every time the
// agent forgets, which trains people to dismiss the gate, and a gate you
// dismiss is not a gate. A host that ignores the payload gets silence, which is
// the same fail-open outcome as every error path above.
const payload =
  event === "stop"
    ? // Cursor. Its stop event cannot block, so a follow-up is the only lever.
      { followup_message: message }
    : // Claude Code and Codex.
      { hookSpecificOutput: { hookEventName: "Stop", additionalContext: message } };

try {
  process.stdout.write(JSON.stringify(payload));
} catch {
  process.exit(0); // closed pipe — still nothing worth failing a session over
}
