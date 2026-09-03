# Starter — read me first, then delete me

Temporary. This file bootstraps `.ctx/` for a project and is **deleted once
setup is done**. If you're reading it in an established project, setup was
skipped or someone forgot — run it, then delete it.

Two ways through: hand it to an agent (fastest), or fill it in yourself.

---

## Option A — let an agent do it

Say this to your agent:

> read `.ctx/starter.md` and follow it

or, equivalently:

> read `.ctx/skills/setup-project-context/SKILL.md` and follow it exactly

That skill is the full procedure. It explores the repo first, **runs every
command before writing it down**, and only then asks you about the things no
tool can derive.

**How the asking works.** Four steps, in this order:

1. **Form 1 — the project.** The agent writes its answers in first, then hands
   it over. It opens by asking **which parts of `.ctx/` you actually want** — a
   PRD or not, a design doc or not, a glossary or not. Whatever you skip gets
   deleted rather than left sitting there half-filled.
2. **It reads your corrections** and asks about anything that contradicts the
   code. Usually one or two questions.
3. **Form 2 — house rules.** Shaped by what you kept: may it commit, emojis,
   comment and TODO policy, test expectations, which areas deserve their own
   rule file. Sections that don't apply to you aren't in it.
4. **Then everything gets written at once** — every context file, your first
   backlog, the adapters at your repo root — and setup deletes itself.

Nothing is written to `.ctx/` until after Form 2, on purpose: the two forms
interlock, and drafting from half the answers means rewriting from the rest.

Every field carries a recommendation, so a form you return untouched still
produces a working `.ctx/`. The point is to make the defaults visible, not to
give you homework. Prefer talking? Say `grill me` and the same questions arrive
one at a time in chat.

It also asks **which AI tools you use**, and installs only the matching root
files from `.ctx/adapters/`. Nothing outside `.ctx/` shipped with this template,
which is why your repo root is still clean.

Want it to trigger by itself in future? Copy `.ctx/skills/setup-project-context/`
into `.claude/skills/` for Claude Code, or `.agents/skills/` for Cursor and
Codex. Optional.

If your agent can't follow a file reference, paste this instead:

```text
Bootstrap the `.ctx/` context system for this project. Context setup only — do
not write application code.

1. Read `.ctx/README.md` and `.ctx/index.md` to understand the three tiers.

2. Explore before asking. Manifests and their scripts, CI config, linter
   config, directory layout, entry points, `git log --oneline -50` for commit
   conventions, and any existing README or docs. Never spend a question on
   something the repo answers.

3. RUN every candidate verify command before writing it into `.ctx/core.md`.
   Write down only the ones that pass, and say which failed. A verify command
   that doesn't work is worse than none, because everything downstream trusts it.

4. Fill in `.ctx/setup/form-1-project.md` IN PLACE. Replace every `<AGENT: ...>`
   marker with what you derived, or `<FILL: ...>` where the repo told you
   nothing. Then STOP and hand it to me.

5. When I say `form 1 done`, read it and reconcile it against the code. Anything
   I wrote that contradicts what you read becomes a short question. That's the
   point of the form. It's either a doc that would have been wrong or a gotcha
   worth recording.

6. Then fill in `.ctx/setup/form-2-conventions.md` the same way — git and commit
   rules, emojis, comments, tests, per-area conventions. Delete the sections I
   ruled out in Form 1. Hand it over and stop. Say it's optional.

7. WRITE NOTHING into `.ctx/` until both forms are back. The answers interlock,
   and drafting from half of them means rewriting from the rest.

8. If I'd rather answer in chat, ask ONE QUESTION AT A TIME instead, each with
   your recommended answer and a one-clause reason. Bundled questions get
   skimmed and the hard one gets a lazy answer.

9. Never invent. Anything unanswered stays `<FILL: ...>`. Mark each thing you
   write as verified, stated by me, a default I left alone, or a placeholder.
   Proposing an answer out loud isn't inventing one; writing it down unlabelled
   is.

10. Then write everything in one pass: every context file, plus a first backlog
    in `.ctx/inbox/` as `drafted` items if I asked for one. DELETE the files I
    said I didn't want, and their rows in `.ctx/index.md`. Leave `handoff.md`,
    `sessions/`, `work/`, and `gotchas.md` empty — they fill from real work.
    Never read `.ctx/scratchpad.md`; it's mine.

11. Install adapters from `.ctx/adapters/` for the tools I named — see
    `.ctx/adapters/README.md` for the mapping. Everyone gets `AGENTS.md` at the
    root, copied as-is; the rest depend on the answer.

12. Finish by writing `.ctx/handoff.md`, adding one `.ctx/sessions/` note,
    DELETING `.ctx/starter.md` and `.ctx/setup/` along with their rows in
    `.ctx/index.md`, and showing me a table of what you filled in, what you
    deleted, what's verified versus assumed, which adapters you installed, and
    every question still open. Then point me at `.ctx/manual.md`.
```

Expect ten minutes. Those answers are the part no tool can derive.

---

## Option B — fill it in yourself

In strict priority order. **Stop after step 4 on the first pass**; you can add
the rest when you actually need it.

### 1. `core.md` → verify commands

The single highest-value thing in this folder. An agent with a fast, exact
verify loop looks careful; one without it hands you broken work and a confident
summary. Include the **single-file** test command — that's the one that gets run
fifty times an hour.

### 2. `core.md` → the "Never" list

Negative constraints prevent the expensive mistakes. Generated directories,
lockfiles, vendored code, applied migrations. An agent will cheerfully "fix" a
generated file if nobody told it not to.

### 3. `core.md` → the exemplar file

One line — *imitate `src/core/billing/gateway.ts`* — beats a page of style
prose, because pattern-matching is what models are best at. Pick your cleanest
real file.

### 4. `map.md`

Twenty honest lines about where code lives, saving the agent from reading two
thousand. Include the boundaries (*`core/` must not import from `api/`*), not
just the directory names.

### 5. Then, only as needed

- `glossary.md` — if your domain overloads words like *account*, *workspace*, *org*
- `git.md` — if your team has real commit or branch conventions
- `product/prd.md` — when you know what you're building
- `product/brainstorm.md` — while you're still deciding
- `design.md` — when there's a UI
- `taste.md` — when an agent's output is technically fine but stylistically foreign
- `rules/<area>.md` — when conventions differ by area
- `gotchas.md` — the first time an agent breaks something that looked pointless

Everything else (`decisions/`, `playbooks/`, `inbox/`, `sessions/`) fills up
naturally as you work. Don't pre-populate it.

---

## The one habit that decides whether this works

**Write things down when they go wrong, not before.**

Every context template that rots was written speculatively in one sitting.
Documents born from a real failure get read, because they answer a question
someone actually had. So when you catch an agent making the same mistake twice:
write down *that specific thing*, in the right tier, with a way to check it.

And prune. A file describing code that no longer exists is worse than no file,
because it gets believed. See the maintenance rules in `.ctx/README.md`.

---

## Done?

Delete this file and the setup forms, then remove their two rows from
`.ctx/index.md`:

```
git rm .ctx/starter.md
git rm -r .ctx/setup
```

A row pointing at a deleted file is the exact drift the index checker exists to
catch, so leaving them behind means your first `reindex` reports a failure you
caused.

Nothing durable lives only here — the ongoing rules survive the deletion on
purpose:

- **What to update and when** (handoff, session notes, gotchas, promotion) is in
  the root `AGENTS.md`, which every tool loads on every session.
- **Why those rules exist**, and the tier model, is in `.ctx/README.md`.
- **The inventory of every context file** is `.ctx/index.md`.

So if you add anything durable to this file before deleting it, move it to one
of those three first. Everything above is one-time setup by design.

If an agent did the setup, it should have deleted this already and left a note
in `.ctx/sessions/`.
