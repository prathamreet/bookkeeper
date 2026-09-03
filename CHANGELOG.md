# Changelog

What changed between releases of `ctx.zip`. Adopters copy `.ctx/` into their own
repos and have no other way to find out, so every user-visible change belongs
here — including the ones that require them to do something.

Format follows [Keep a Changelog](https://keepachangelog.com/). Versions are
semantic: **major** when adopters must change something, **minor** for new files
or capabilities, **patch** for wording and fixes.

## [Unreleased]

## [1.0.0] - 2026-09-03

### Added
- `manual.md` — every phrase you can say to your agent (`catchup`, `park`,
  `reindex`, `refresh context`, `gotcha`), with two Mermaid maps and a table of
  all files showing what each is for and whether it changes over time.
- `work/` — a folder per change in flight, holding a plan and a task checklist.
  Closes the gap between `inbox/` (not started) and `sessions/` (finished).
- `playbooks/refresh-context.md` — the `refresh` / `audit` / `record`
  operations that keep docs from rotting.
- `skills/README.md` — a register for installed external skills and their known
  conflicts with project rules.
- `adapters/` — templates for the root files, installed during setup based on
  which AI tools you actually use.
- `skills/setup-project-context/` — the setup procedure: explores the repo, runs
  every command before writing it down, then asks about the rest. See `setup/`
  below for how the asking works.
- `hooks/` — two optional, dependency-free Node scripts: a session-end handoff
  gate and an index drift checker. Opt-in; delete the folder if unwanted.
- `setup/` — two forms the agent pre-fills and you correct, replacing a
  twenty-turn interview as the default path. Form 1 covers the project and opens
  by asking **which parts of `.ctx/` you want at all** — PRD, design doc,
  glossary, rule files, a first backlog. Form 2 covers house rules the repo
  can't reveal: commit policy, emojis, comment and TODO conventions, test
  expectations. Its sections are shaped by what Form 1 kept, so nobody reads
  past questions that don't apply to them. Every field ships with a
  recommendation, so a form handed back untouched still produces a working
  `.ctx/`. Nothing is written until both are back, then everything is written at
  once — the answers interlock, and drafting from half of them means rewriting
  from the rest. **Files you skip are deleted, along with their `index.md`
  rows**, rather than left half-filled. Both forms and `starter.md` delete
  themselves when setup finishes. `grill me` still runs the old
  one-question-at-a-time interview, and both routes cover the same ground.
- `inbox/` gained a `drafted` status: the agent writes the item and drafts its
  acceptance criteria, you confirm with `ready NNN`. Two new phrases,
  `add to inbox: <thing>` and `groom inbox`.

### Changed
- **The inbox is now written by the agent.** Previously you filed items and
  wrote acceptance criteria by hand, and the agent refused anything vague —
  which meant a queue of one-line wishes nobody could act on. It now drafts
  criteria at the moment you describe the work, when the most context about it
  exists, and labels them as a draft. It still may not promote its own draft to
  `ready`; that confirmation is the checkpoint.
- Setup asks about house rules at all. The old interview derived git conventions
  from `git log` and never asked whether the agent may commit, whether to use
  emojis, or what to do about `TODO`s — the conventions people notice fastest
  when an agent gets them wrong.
- Bookkeeping cut from six obligations to two required, with the rest as
  judgement. A long list of duties competes for attention exactly when
  attention is scarcest.
- `rules/` is now labelled honestly: it is **not** auto-loaded until you mirror
  it into `.cursor/rules/` or your tool's equivalent.
- Frontmatter contract tightened. `verified_sha` is authoritative, `verified` is
  cosmetic, and judgement docs (`taste.md`, `glossary.md`) carry no `describes:`
  at all, because no git diff can validate them.

### Fixed
- `core.md` declared `describes: ["."]`, which would have marked it stale on
  every single commit.
- Claims about `.cursorignore` overstated what it does. It blocks the file tools,
  not a subprocess. It is not a security boundary.
- `sync-index.mjs` matched bare filenames as well as paths, so `inbox/README.md`
  passed on the row written for `README.md` — a file could be unindexed and
  still report clean. It now matches full paths, and treats a row naming a
  directory as covering everything beneath it, so filing an inbox item or an ADR
  no longer trips the checker.
- `sync-index.mjs` reported `AGENTS.md` as a dead row. Rows may name a file at
  the repo root, and it only looked inside `.ctx/`.
- `handoff-gate.mjs` misread renamed paths out of `git status --porcelain`,
  so renaming `handoff.md` looked like an unrelated file and fired the gate. It
  also dropped an unverified `agentStop` branch that could answer
  `decision: "block"` — nothing in the gate blocks a session now.
- CI's unresolved-question check flagged the payload's own *documentation* of
  the `[NEEDS CLARIFICATION: ...]` marker. It now only counts the used form, on
  lines that aren't quoting it.

---

<!-- Template for each release:

## [1.1.0] - YYYY-MM-DD

### Added
### Changed
### Deprecated
### Removed
### Fixed

### Upgrade notes
<!-- Only if adopters must do something by hand. Say exactly what, and what
     breaks if they skip it. This is the section people actually read. -->
-->
