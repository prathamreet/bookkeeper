---
tier: 1
describes: [<FILL: files whose change would invalidate this — e.g. "package.json", "Makefile", ".github/workflows/**". Never "." or "**": that makes every commit invalidate the doc.>]
verified_sha: <commit>
verified: <YYYY-MM-DD>
---

# Project core

<!-- FILL: one sentence. What this project is and who uses it. -->

> Tier 1 — loaded on **every** request. Keep it short not because models can't
> hold many rules, but because an irrelevant line makes the relevant ones harder
> to find. Target ~60 lines here once filled in (the guidance comments are meant
> to be deleted as you go); the whole always-on surface is this file plus the
> root `AGENTS.md`, and Anthropic's guidance is under 200 lines per file.
> Anything not needed for nearly every task belongs in `.ctx/rules/` or a tier-3
> doc, with a row added to `index.md`.

## Verify — run these before claiming anything works

- Install: `<FILL>`
- Typecheck: `<FILL>`
- Lint: `<FILL>`
- Test (all): `<FILL>`
- Test (one file): `<FILL>` <!-- the most important one: fast iteration -->
- Dev server: `<FILL>`

## Never — specific to this project

<!-- The universal hard stops (git, dependencies, tests, secrets, destructive
     commands, scratchpad) live in the root `AGENTS.md` and are deliberately
     not repeated here. Duplicated rules cost tokens twice and drift apart. -->

- Never edit: `<FILL: generated dirs, lockfiles, vendored code, build output>`
- Never run: `<FILL: commands that hit prod, cost money, or can't be undone>`
- `<FILL: anything else peculiar to this codebase>`

## You may do this without asking

- Read anything; run read-only commands; run tests, typecheck, and linters.
- Create and edit source and test files under `<FILL: paths>`.
- Update `.ctx/handoff.md`, `.ctx/sessions/`, `.ctx/gotchas.md`, `.ctx/inbox/`.
  Not just permitted — required. See the bookkeeping section in `AGENTS.md`.

## Ask first

- Schema or migration changes, dependency changes, deleting files, renaming
  public APIs, and anything touching auth, billing, payments, or infrastructure.
- If a task's requirements are ambiguous, ask rather than picking an
  interpretation and building on it.

## Style

Imitate `<FILL: path to the most exemplary file in this repo>`. Match its
structure, naming, and error handling in preference to generic conventions.
Deeper preferences: `.ctx/taste.md`.

## Definition of done

<!-- FILL. A reasonable default: -->
1. Typecheck, lint, and the relevant tests pass — and you ran them.
2. New behaviour has a test; fixed bugs have a regression test.
3. No debug logging, commented-out code, or stray TODOs left behind.
4. `.ctx/handoff.md` reflects where things actually stand. See `AGENTS.md` for
   the rest of the bookkeeping, which is judgement rather than duty.

## Read next

- `.ctx/handoff.md` — where the last session stopped. **Read at session start.**
- `.ctx/index.md` — everything else available, and when each applies.
- `.ctx/gotchas.md` — **before** simplifying anything that looks redundant.

## When you're unsure

Say so. A question costs a minute; a confident wrong assumption costs an hour.
Do not invent file paths, commands, config keys, or API signatures — check.
