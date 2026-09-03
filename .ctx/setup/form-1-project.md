---
form: 1
about: Scope, what this project is, what the agent may do, and what you're building
status: unfilled
---

<!-- Agent: fill this in place. Replace every `<AGENT: ...>` marker with what
     you derived from the repo, or with a `<FILL: ...>` if the repo gave you
     nothing. Then hand it over and stop.

     An `<AGENT:>` marker still present when the user opens this is a bug: it
     means you skipped a question and they can't tell which answers you
     actually stand behind.

     Write NOTHING into the context files yet. Form 2's answers change how these
     get written, and drafting twice produces two half-consistent versions. -->

# Form 1 — the project

Filled in from reading your repo. **Your job is to correct it, not to write it.**

- **Leave anything alone and it stands.** A form you hand back untouched still
  produces a working `.ctx/`. Nothing here blocks you.
- **Deleting a wrong line is worth more than adding a right one.** A confident
  wrong context file gets obeyed for months; a blank one gets a question.
- **`<FILL: ...>` means nothing in the repo answered it.** Those are the lines
  worth your minutes. Left as-is, they stay blank in the docs — which is the
  honest outcome, not a failure.

Parts 2–6 are the ones that pay. Parts 7–9 are worth it only if they apply.

**What happens after this:** the agent reads your answers, asks about anything
that contradicts the code, and then writes **Form 2** — the house rules, shaped
by what you kept in Part 1. Your context files get written once, after that.

When you're done: set `status: filled` at the top and say **`form 1 done`**.
Prefer to talk it through instead? Say **`grill me`** and the same questions
arrive one at a time in chat.

---

## Part 0 — Which AI tools do you use here?

*Decides which files get installed at your repo root. Everyone gets `AGENTS.md`;
the rest are pointers and permission files for specific tools, and installing
ones you don't use is just clutter.*

**Found evidence of:** <AGENT: existing `.cursor/`, `.claude/`, Copilot config,
or "none — recommending Cursor and Claude Code">

**Also install for:** <FILL: anything else — Codex, Copilot, Windsurf>

## Part 1 — What do you actually want in `.ctx/`?

*The scope question, and the only one that changes the shape of everything
below. **Anything you say skip to is deleted, along with its row in
`.ctx/index.md`.** An unfilled file isn't free: it costs a router row, it gets
opened by a hopeful agent, and a folder of placeholders is how people conclude
the whole thing is scaffolding. You can always take a file back out of the zip.*

Not negotiable, because the system doesn't work without them: `core.md`,
`index.md`, `handoff.md`, `map.md`, `git.md`, `gotchas.md`, `manual.md`,
`README.md`, and the `inbox/` `work/` `sessions/` `decisions/` folders.

| | Keep or skip? | Recommended |
|---|---|---|
| `product/prd.md` and `product/roadmap.md` — what you're building, and in what order | | <AGENT: keep for a new or pre-launch project; skip for an existing codebase with work already in flight, where a reconstructed PRD is worse than none> |
| `product/brainstorm.md` — ideas before they're decided | | **keep.** It's where an agent is told to put things it must not build from |
| `design.md` — UI, copy, interaction, accessibility floor | | <AGENT: keep only if you actually found a user interface> |
| `glossary.md` — words that mean something specific here | | <AGENT: keep only if you saw genuinely overloaded domain terms> |
| `taste.md` — code preferences no linter catches | | **keep.** It ships mostly written; you're editing, not authoring |
| Per-area rules in `rules/` | | <AGENT: your read — "none" is the right answer for most repos> |
| A first backlog in `inbox/` | | <AGENT: yes if the PRD is being kept, no otherwise> |
| `playbooks/` — checklists for procedures you repeat | | **keep the folder, write none yet.** A playbook earns its place after the same task goes wrong twice |
| `hooks/` — the opt-in session-end nudge | | **keep the folder, install nothing.** Form 2 asks again |

## Part 2 — Commands, verified

*Lands in `.ctx/core.md`. The highest-value section in this form: an agent with
a fast, exact verify loop looks careful, and one without it hands you broken
work with a confident summary.*

Every command below was **actually run**. Anything marked failed is written down
as failed rather than quietly dropped.

| What | Command | Result |
|---|---|---|
| Install | `<AGENT: command>` | <AGENT: passed / failed with what> |
| Typecheck | `<AGENT: command>` | <AGENT: result> |
| Lint | `<AGENT: command>` | <AGENT: result> |
| Test — everything | `<AGENT: command>` | <AGENT: result> |
| **Test — one file** | `<AGENT: command>` | <AGENT: result> |
| Dev server | `<AGENT: command>` | <AGENT: result> |

The one-file test command is run fifty times an hour. If it's wrong, every later
session is slow. Check that row even if you skip the rest.

**Anything failing that shouldn't be?** <AGENT: name the failures and your guess
at why, or "nothing failed">

## Part 3 — What this is

*Lands in `.ctx/core.md`, and `.ctx/product/prd.md` if you kept it.*

**One sentence — what it does and who uses it:**
<AGENT: your best sentence from the README and the code, or a `<FILL:>`>

## Part 4 — What the agent may do without asking

*Lands in `.ctx/core.md`. The default is cautious on purpose: a boundary you
loosen deliberately beats one you discover after the fact.*

| | Recommended | Change it to |
|---|---|---|
| Read anything, run read-only commands | **yes** | |
| Run tests, linters, typechecks | **yes** | |
| Create and edit files under | `<AGENT: the source and test paths>` | |
| Install or upgrade dependencies | **ask first** | |
| Run database migrations | **ask first** | |
| Delete files | **ask first** | |
| Start a dev server or long-running process | **ask first** | |
| Make network calls from code it runs | **ask first** | |
| Run any git command | **no — writes commit messages, you run them** | |

Leave the right column empty to accept the whole table.

## Part 5 — What must never be touched

*Lands in `.ctx/core.md`. Negative constraints prevent the expensive mistakes —
an agent will cheerfully "fix" a generated file if nobody said not to.*

**Never edit:** <AGENT: generated dirs, lockfiles, vendored code, build output —
whatever you actually found, with paths>

**Never run:** <AGENT: anything that hits production, costs money, or can't be
undone — or `<FILL:>` if you found nothing>

## Part 6 — The file to imitate

*Lands in `.ctx/core.md`. One line here beats a page of style prose, because
pattern-matching is what models are best at.*

**Imitate:** `<AGENT: path to the cleanest, most representative file you read>`

*Why I picked it:* <AGENT: one clause>

Wrong pick? Replacing this path is probably the single highest-leverage edit you
can make to this form.

---

## Part 7 — Where the code lives

*Lands in `.ctx/map.md`. Skip it if the layout is obvious from the directory
names — this section is for the part the filesystem doesn't show.*

**Areas and what each is for:**
<AGENT: a handful of lines — area, and what it's *for*. Not a directory tree;
that's readable from the filesystem.>

**Boundaries that matter** — the imports that would be a mistake even though
nothing stops them:
<AGENT: e.g. "core/ must not import from api/", or `<FILL:>`>

## Part 8 — Looks wrong but isn't

*Lands in `.ctx/gotchas.md`. If nothing comes to mind, leave it — this file is
supposed to fill up from real failures, not from a form.*

The retry loop with the magic number, the sleep that's load-bearing, the index
that looks redundant, the test that needs a flag.

<AGENT: anything you noticed and couldn't explain, phrased as a question. Empty
is fine.>

## Part 9 — What you're building

*Lands in `.ctx/product/prd.md` and `.ctx/product/roadmap.md`. **Skip the whole
part if you skipped the PRD in Part 1** — a PRD reconstructed from guesses is
worse than no PRD.*

**The problem, and for whom:**
<AGENT: from the README if it says, otherwise `<FILL:>`>

**Explicitly not for:**
<FILL: who this deliberately doesn't serve — it's the more useful half>

**Out of scope right now:**
<FILL:>

**Now / Next / Later:**
<AGENT: from open issues, TODOs, or recent commits if there's evidence.
`<FILL:>` if not.>

**Decided *not* to do, and why:**
<FILL: this is what stops the same idea being re-proposed every quarter>

**Debt you're carrying on purpose,** so the agent doesn't "fix" it:
<FILL:>

---

## When you hand this back

1. The agent reconciles your answers against the code. Anything you wrote that
   contradicts what it read becomes a short question — that pass is the point of
   the form rather than a nuisance. It's usually either a doc that would have
   been wrong or a gotcha worth recording.
2. It writes **Form 2**, containing only the sections you kept in Part 1.
3. After Form 2 comes back, it writes every context file in one pass, installs
   your adapters, and deletes itself.

Nothing in `.ctx/` is written until then, on purpose. Form 2 changes how these
answers get written down, and drafting twice produces two versions that agree
with each other only by accident.
