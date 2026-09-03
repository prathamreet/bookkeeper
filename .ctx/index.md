# Context index

Router for everything in `.ctx/`. Read on demand — each row says when the file
is worth the tokens. Files not listed here are effectively invisible, so **add a
row whenever you add a doc**.

`node .ctx/hooks/sync-index.mjs` checks that claim: it reports files with no row
and rows pointing at files that no longer exist. Optional, and it never
rewrites the prose below — a generated "read it when" would be uniform and
useless, and the prose is the whole value.

## Core

| File | Read it when |
|---|---|
| `core.md` | Always loaded. Verify commands, hard rules, permission boundary. |
| `handoff.md` | **At the start of every session**, and before picking up work. |
| `README.md` | How the tiers work and the maintenance rules. Read before changing this system, or when unsure which file something belongs in. |
| `manual.md` | The user says `catchup`, `park`, `reindex`, `refresh context`, `gotcha`, or any other named phrase — this is what they mean. |

Your standing bookkeeping obligations — what to update, and when — are in the
root `AGENTS.md`. They apply to every session, not just setup.

## Reference

| File | Read it when |
|---|---|
| `map.md` | You need to find existing code or decide where new code goes. |
| `taste.md` | Writing non-trivial new code and you want it to look native here. |
| `design.md` | Touching UI, user-facing copy, or interaction behaviour. |
| `glossary.md` | A domain term appears and its exact meaning matters. |
| `gotchas.md` | **Before** removing, simplifying, or refactoring anything odd. |
| `git.md` | **Before any git operation** — commit, branch, PR, conflict. |
| `skills/README.md` | An installed external skill might apply, or its advice conflicts with a project rule. |

## Intent

| File | Read it when |
|---|---|
| `product/prd.md` | You need to know what we're building and what's out of scope. |
| `product/brainstorm.md` | Discussing ideas. **Never build from it** — unconfirmed. |
| `product/roadmap.md` | Sequencing a task, or deciding whether something is next. |
| `decisions/` | Before revisiting an architectural choice — **search here first**. |

## Procedure

| Path | Read it when |
|---|---|
| `playbooks/` | The task matches a known procedure. Check before improvising. |
| `playbooks/refresh-context.md` | Docs feel stale, after a big refactor, or an agent got something wrong because a context file lied. |
| `rules/` | Working in an area that has a rule file. **Read it manually** unless the mirrors in `.cursor/rules/` (or your tool's equivalent) have been generated — this directory is not auto-loaded on its own. |

## Work and history

| Path | Read it when |
|---|---|
| `inbox/` | You've been asked to file or pick up work. **Read `inbox/README.md` before writing an item** — who may set which status is the part that matters. |
| `work/` | A change in flight. **Open a folder here for anything over ~3 steps** — `handoff.md` holds one next action, not a plan. |
| `sessions/` | You need history on a specific past change or a known dead end. |

Work moves `inbox/` → `work/` → `sessions/`: not started, in flight, finished.

## Setup and payload

| Path | Read it when |
|---|---|
| `adapters/` | Installing or adding an AI tool. Templates for the root files — `AGENTS.md` and friends. Copied out during setup, never active in place. |
| `setup/` | Running or resuming first-run setup. Two forms the agent pre-fills and the user corrects. **Deleted when setup finishes — delete this row with it.** |
| `skills/` | The setup procedure itself. Copy to `.claude/skills/` or `.agents/skills/` to make it trigger automatically. |
| `hooks/` | Opt-in enforcement scripts. Read its README before installing. |

## Never

| Path | |
|---|---|
| `scratchpad.md` | **Human only. Do not read, write, index, or summarise.** |
| `starter.md` | One-time setup guide. Delete once setup is done — this row with it — and ignore it otherwise. |

## Conventions used across these files

- `<FILL: ...>` marks an unfilled placeholder. If a file you need is still
  mostly placeholders, treat it as **absent** rather than authoritative, and
  say so in your summary.
- Frontmatter `describes:` lists the paths a doc covers; `verified:` is when it
  was last checked against reality. If those paths have changed a lot since,
  trust the code and flag the doc.
- `status: superseded` on a decision means ignore it and follow the newer one.
