# Hooks — optional

Everything else in `.ctx/` is plain text with no runtime. This directory is the
one exception, and it is **opt-in**: nothing installs it for you, and deleting
this folder breaks nothing.

It exists because of the gap between what a rule can do and what a script can.
`AGENTS.md` asks the agent to update `handoff.md` before finishing. That's a
request, and requests get dropped exactly when context is fullest and the task
was hardest — which is when you needed the handoff most. A session-end hook
turns the request into a check.

Requires **Node 18+**. Two scripts, no npm dependencies.

| Script | What it does |
|---|---|
| `handoff-gate.mjs` | At session end, nudges if source changed but `handoff.md` didn't. |
| `sync-index.mjs` | Reports files in `.ctx/` with no `index.md` row, and rows pointing at files that no longer exist. |

## `sync-index.mjs`

`index.md` says files not listed in it are effectively invisible. That's only
true if something checks, and the failure is silent: you add a rule file under
`.ctx/rules/`, forget the row, and it's never read again while everyone assumes
it is.

A row naming a directory covers everything under it, so `inbox/` and
`decisions/` don't need a row per item. Anything else needs its own.

Run it directly whenever:

```bash
node .ctx/hooks/sync-index.mjs           # report
node .ctx/hooks/sync-index.mjs --fix     # append missing files under "Unfiled"
node .ctx/hooks/sync-index.mjs --strict  # exit 1 on drift, for CI
```

**It deliberately does not regenerate the table.** The hand-written "read it
when" prose is the most valuable thing in `index.md`, and a generator would
flatten it into something uniform and useless. This only catches drift.

If a file carries `read_when: <one line>` in its frontmatter, `--fix` uses it
for the generated row. Otherwise it writes a `<FILL:>` for you to complete.

### Hooking it up

The safe wiring is the same `Stop` event as the handoff gate — once per session,
no mid-task noise:

```json
{ "command": "node .ctx/hooks/sync-index.mjs --hook", "timeout": 10 }
```

You can instead fire it on file writes (Cursor `afterFileEdit`, Claude
`PostToolUse`), but think twice. Post-edit hooks fire constantly while files are
legitimately half-finished, and a check that cries wolf gets ignored — at which
point it stops working on the day it matters. The index only changes when a file
is *added or removed*, which is rare, so session end is the right granularity.

The best wiring of all is CI, where it runs server-side on every PR regardless
of anyone's local setup: `node .ctx/hooks/sync-index.mjs --strict`.

## `handoff-gate.mjs`

When a session ends, if source files were modified and `.ctx/handoff.md` wasn't,
it tells the agent to write the handoff first. That's the whole behaviour.

It fails open on every error path: no git, no repo, bad input, timeout — all
exit silently. A broken session-end hook degrades every turn, so it's built to
do nothing rather than do harm.

## Install — Cursor

Create `.cursor/hooks.json`:

```json
{
  "version": 1,
  "hooks": {
    "stop": [
      { "command": "node .ctx/hooks/handoff-gate.mjs", "timeout": 10 }
    ]
  }
}
```

Cursor's `stop` event can't block, so the gate arrives as a follow-up message
rather than a refusal. Capped by Cursor's `loop_limit` (default 5), and the
script bails after one pass regardless.

## Install — Claude Code

Add to the existing `.claude/settings.json`, alongside `permissions`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${CLAUDE_PROJECT_DIR}/.ctx/hooks/handoff-gate.mjs"],
            "timeout": 15,
            "statusMessage": "Checking .ctx bookkeeping"
          }
        ]
      }
    ]
  }
}
```

Use the exec form (`command` plus `args`) whenever a path placeholder is
involved — each array element is passed as one argument with no quoting, which
avoids the space-in-path problem.

## Not shipped, deliberately

**Other tools.** Codex, Copilot, Windsurf, and Cline each want a different file,
a different event vocabulary, and different blocking semantics. Six configs is
six things to keep correct across six release cadences, and a stale hook config
is worse than none. Codex additionally requires a per-hook trust review on every
clone *and* every update, which is a poor first five minutes for a template.
Cline is macOS and Linux only.

**A post-edit linter.** Fires constantly mid-task when files are legitimately
half-finished. Noisy, slow, and it trains you to ignore hook output.

**LLM-written session summaries.** Model-written logs of model-written work read
plausibly and carry no information. That's how `sessions/` fills with sludge.

## Untested on the machine that wrote them

Both scripts were written against the documented hook schemas but could not be
executed where they were authored — there was no JavaScript runtime installed.
They're small, dependency-free, and fail open on every error path, but treat the
first run as a test. The quickest check:

```bash
echo '{}' | node .ctx/hooks/handoff-gate.mjs   # expect: no output, exit 0
node .ctx/hooks/sync-index.mjs                 # expect: "index.md is in sync."
```

If either misbehaves, delete the folder. Nothing else depends on it.

## Removing it

Delete `.ctx/hooks/`, and remove the `stop` block from `.cursor/hooks.json` and
the `Stop` block from `.claude/settings.json`. Nothing else references them.

If the gate ever starts feeling like noise, remove it rather than learning to
dismiss it. A gate you've trained yourself to ignore won't stop you on the day
it should.

## The honest limit

A hook is only deterministic once it is installed, trusted, and running on that
person's platform. For your own repo that's fine. For work shared across a team,
the mechanism with none of that friction is CI — it runs server-side on every
PR regardless of which agent or OS produced the code. If bookkeeping genuinely
matters to you, a CI check is stronger than this hook.
