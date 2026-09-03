---
name: setup-project-context
description: Turn the generic .ctx/ context template into project-specific docs by exploring the repo, verifying what can be verified, and asking the user about what can't — via a pre-filled form or a one-question-at-a-time interview. Use when setting up agent context for a project, when .ctx/starter.md still exists, when a form in .ctx/setup/ is handed back, when asked to fill in AGENTS.md, a PRD, a design doc, or a codebase map, or when the user mentions context engineering, agent onboarding, or project bootstrap.
license: MIT-0
---

# Set up project context

Convert a freshly unzipped `.ctx/` template into documents that describe *this*
project. Two jobs, in this order: **derive everything derivable from the repo**,
then **get the rest from the user** — as a pre-filled form they correct, or one
question at a time in chat, whichever they prefer.

The single rule that matters: **never invent an answer.** A confident,
plausible, wrong context file is worse than a blank one, because agents follow
their instructions and will carry the error for months. Every line you write is
either verified against the repo, stated by the user, a recommendation they were
shown and left alone, or `<FILL: ...>`. Proposing an answer out loud is not
inventing one; writing it down unlabelled is.

This is a context-setup task. Do not write application code.

<!-- Tools don't auto-load skills from `.ctx/`. To make this trigger on its own,
     copy this folder to `.claude/skills/` (Claude Code) or `.agents/skills/`
     (Cursor, Codex). Otherwise the user points you here from starter.md. -->

---

## Phase 0 — Orient

Read `.ctx/README.md` and `.ctx/index.md` so you understand the three tiers and
what belongs where. Then check what state you're in:

- No `.ctx/` directory → say so and stop. The template isn't installed.
- `.ctx/starter.md` missing → setup already ran. Ask whether to re-run it before
  overwriting anything.
- **A form in `.ctx/setup/` with `status: filled`** → setup is already underway
  and you're resuming it. Skip to Phase 3 and read that form; re-running the
  exploration is cheap, but re-asking answered questions is not.
- Files already filled in → treat existing content as authoritative. You are
  adding, not replacing, and you flag contradictions rather than silently fixing.

## Phase 1 — Explore before asking

Never spend a question on something the repo can answer. Read, in this order:

1. **Manifests and scripts** — `package.json`, `pyproject.toml`, `Cargo.toml`,
   `go.mod`, `Makefile`, `justfile`, `composer.json`. The `scripts`/`tasks`
   block is where verify commands come from.
2. **CI config** — `.github/workflows/`, `.gitlab-ci.yml`. CI is the most honest
   statement of how the project is actually built and tested, because it has to
   work.
3. **Tooling config** — linter, formatter, typechecker, test runner. These tell
   you which conventions are already machine-enforced, and therefore must *not*
   be repeated as prose in `taste.md`.
4. **Layout** — top-level directories, entry points, where tests live.
5. **Git history** — `git log --oneline -50` for real commit conventions,
   `git log --format='%an' | sort -u | head` for team size.
6. **Existing docs** — `README`, `CONTRIBUTING`, `docs/`, any `ADR`s. Do not
   duplicate them into `.ctx/`; link to them. Duplicated docs drift.
7. **Which tools are already in use** — an existing `.cursor/`, `.claude/`,
   `.github/copilot-instructions.md`, or `.codex/` answers Phase 3's tooling
   question without you having to ask it.

## Phase 2 — Verify, don't assume

**Run every command before you write it down.** A verify command that doesn't
work is worse than no verify command, because everything downstream trusts it.

For each candidate (install, typecheck, lint, test-all, test-one-file, dev):
run it, and write it into `core.md` only if it succeeds. If it fails, note what
happened and ask about it in Phase 3. For the dev server, check that it starts,
then stop it — don't leave it running.

Note the one-file test command especially. It's run fifty times an hour, and
guessing it wrong makes every later session slow.

## Phase 3 — Ask

Everything the repo couldn't tell you, in two rounds: the project, then its
house rules. There are two ways to run each. Offer the choice once, in a single
turn, and don't turn it into a discussion:

> I've read the repo and run the commands. I can write my answers into a form
> for you to correct, or ask the same things one at a time in chat.
> Recommended: **the form** — you can do it in an editor at your own pace, and
> it survives a context reset. Say `grill me` for chat instead.

Both routes ask the same things and produce the same files. The difference is
only where the typing happens.

### Form mode — the default

The form is pre-filled. That distinction is the whole design: a blank form is
homework and gets abandoned, while a filled one is a diff to review, which is
the cheapest thing you can ask of anybody.

**Round A — the project.**

1. Open `.ctx/setup/form-1-project.md` and fill it **in place**. Replace every
   `<AGENT: ...>` marker with what you derived, or with `<FILL: ...>` where the
   repo gave you nothing. A marker you leave behind is a question you skipped,
   and the user has no way to tell which answers you stand behind.
2. **Then stop.** Tell them the path, say Parts 2–6 are the ones that pay, and
   that handing it back untouched is a valid answer.
3. On `form 1 done`, read it and **reconcile it against the code**. Anything
   they wrote that contradicts what you read becomes a short question — that
   pass is the point of the form, not a nuisance. It's usually either a doc that
   would have been wrong or a gotcha worth recording. Ask only about real
   contradictions; don't re-ask what they already answered.

**Round B — house rules.**

4. Fill `.ctx/setup/form-2-conventions.md` the same way, then **delete the parts
   Form 1 Part 1 ruled out** — no rule files means no Part 4, no UI means no
   Part 5. Say which parts you dropped. A form is short because you shortened
   it, not because the user had to skip past things.
5. Hand it over and stop. Say plainly that it's optional and the
   recommendations are sane without it, because they are.
6. On `form 2 done` or `skip form 2`, go to Phase 4.

**Write nothing into `.ctx/` until both forms are back.** This is the rule people
break, and it costs more than it looks like it will: Form 2 decides how Form 1's
answers get written down — the permission boundary and the definition of done
both land in `core.md`, and the git answers change `git.md` wholesale. Draft
before you have both and you get two versions that agree only by accident, plus
a diff the user can't review because half of it is you correcting yourself.

**If they never hand a form back**, the recommended answers stand — but say so
before you write, and record those lines as *default* rather than as stated by
the user. Silence is not confirmation, and the difference matters to whoever
runs `refresh context` later.

### Chat mode — on request

**One question per turn. Always carry a recommended answer.** Bundled questions
get skimmed and the hard one gets a lazy answer; a recommendation lets the user
reply "yes" in one word, or correct you, or name a third option you missed.

Format every question like this:

```
Current understanding: <one line of where we are>
Question: <exactly one question>
Recommended: <your best answer, and why in one clause>
```

Work in dependency order — never ask something that hinges on an unanswered
question. Scope before architecture, architecture before conventions,
conventions before polish.

Batch one thing only: **confirming what you already derived**. That's
verification rather than decision-making, so a compact list costs nothing:

> I found these. Correct me on any that are wrong:
> - Install: `pnpm install`
> - Test one file: `pnpm vitest run <path>` — verified, ran clean
> - Typecheck: `pnpm tsc --noEmit` — **failed**, 12 pre-existing errors
> - Layout: `src/api` handlers, `src/core` logic, `src/db` Prisma
> - Commits: Conventional Commits, squash merges to `main`

**Fact-check the user against the code.** If an answer contradicts what you
read, that contradiction is your next question.

### The question ladder

The same content as the forms, walked one rung at a time. Stop wherever the user
wants — Round 1 alone produces a useful `.ctx/`.

**Round 0 — tooling.** One question, skipped entirely if Phase 1 already found
the answer. Which AI coding tools will be used on this repo — Cursor, Claude
Code, Codex, Copilot, several? It decides which adapters get installed in Phase
5, and everyone gets `AGENTS.md` regardless. In form mode this is Part 0 of
Form 1.

**Round 1 — essentials.** Nothing else is worth much without these.

1. What is this project, in one sentence, and who uses it?
2. **The permission boundary**: may I install dependencies? Run migrations?
   Create files anywhere, or only in certain paths? (Recommend the template
   default: ask first for all three.)
3. Which single file best represents how code should look here? (Recommend your
   best pick from what you read, and say why.) This one line beats a page of
   style rules.
4. What must never be touched — generated directories, vendored code, anything
   with a deploy or cost attached?
5. Anything that looks wrong but isn't? The retry loop with the magic number,
   the sleep, the redundant-looking index. (If the answer is "not that I can
   think of", leave `gotchas.md` empty. It fills up from real failures.)

**Round 2 — product.** For `product/prd.md`.

6. What problem does this solve, and for whom? Who is it explicitly *not* for?
7. What's deliberately out of scope right now?
8. What's in flight, what's next, and what have you decided *not* to do?
9. Any debt you're carrying on purpose, so I don't "fix" it?

If the user is still working the idea out, put it in
`product/brainstorm.md` instead and leave the PRD as placeholders. Brainstorm is
unconfirmed; the PRD is committed. Never move between them without asking.

**Round 3 — house rules.** The conventions no linter enforces and no repo
reveals. Every one of these has a recommended answer in
`.ctx/setup/form-2-conventions.md`; read it before asking so you're offering a
default rather than an open question.

10. **Git**: may I run any git command at all, or do I write commit messages for
    you to run? Commit format, subject limit, branch naming, merge style.
    (Recommend: messages only, and whatever `git log` already shows.)
11. **Emojis** — in commit messages, in code and log output, in UI copy, in my
    replies? (Recommend: none anywhere, except UI copy where the existing copy
    already uses them.) Ask it plainly; it's the convention people notice fastest
    when an agent gets it wrong.
12. **Comments and TODOs**: how much commenting, and should I leave `TODO`s or
    file them? (Recommend: comment constraints only, file rather than `TODO`.)
13. **Tests**: does new behaviour need a test, may I create test files freely,
    and what's the definition of done?
14. **Per-area conventions**: which areas differ enough from the rest to deserve
    a file in `.ctx/rules/`? (Recommend two or three at most, and "none" is a
    perfectly good answer.)

**Round 4 — vocabulary and polish.** Only if they're worth it.

15. Any words that mean something specific here — where `account`, `workspace`,
    and `org` are three different things? (Skip if the domain is simple.)
16. Anything an agent keeps getting stylistically wrong? (Skip if unknown; this
    is better filled in after a few sessions than guessed at now.)
17. If there's a UI: design tokens, component library, and two or three real
    opinions about interaction — not platitudes.

## Phase 4 — Write it all, once

Both forms are in. This is the one pass that turns the template into this
project's context, and it's deliberately one pass rather than several: the
answers interlock, and a file written twice ends up agreeing with itself by
luck rather than design.

Order: `core.md`, `map.md`, `git.md`, `taste.md`, then whatever else survived
Form 1 Part 1.

**Delete what they didn't want**, together with its row in `index.md`. If they
skipped the PRD, `product/prd.md` and `product/roadmap.md` go. No UI means
`design.md` goes. This is not tidiness — an unfilled file costs a router row,
gets opened by a hopeful agent, and turns the whole folder into something that
reads like scaffolding. Say what you deleted and mention it can be taken back
out of the zip.

Rules while writing:

- **Mark provenance**, in four levels rather than two. *Verified* — you ran it.
  *Stated* — the user wrote or corrected it. *Default* — your recommendation,
  left in place. *`<FILL: ...>`* — nobody answered. The third one is the reason
  this list isn't two items long: a default the user skimmed past is softer than
  one they chose, and whoever runs `refresh context` next needs to know which
  lines to re-check first.
- **Apply the admission test to every line**: *would removing this change what
  an agent does?* If not, don't write it. That rules out directory trees,
  dependency lists, stack descriptions, and anything else already readable in
  the code.
- **Don't restate the linter.** If a convention is machine-enforced, name the
  command in `core.md` and delete the prose.
- **Keep `core.md` short.** Area-specific detail goes to `.ctx/rules/<area>.md`.
- **Set frontmatter honestly.** `verified: <today>` and `verified_sha: <HEAD>`
  only on docs you actually checked. Never `describes: ["."]` — name the real
  paths, or omit `describes:` entirely for judgement docs like `taste.md` and
  `glossary.md`.
- **Add a `read_when:` line** to any new file's frontmatter and a row to
  `index.md`, or the file will never be read.

Leave `handoff.md`, `sessions/`, `work/`, and `gotchas.md` empty. They fill from
real work. Pre-populating them is how templates become noise.

If the user has installed any external skills, register them in `.ctx/skills/README.md`
— what each does, when it fires, and any conflict with a rule you just wrote.
Otherwise leave that file empty too.

## Phase 4.5 — Turn intent into a first backlog

Only if they kept the PRD and asked for a first backlog in Form 1 Part 1. Skip
it for an existing codebase with work already in flight, and skip it if the
product is still a sketch — a backlog built from guesses is worse than no
backlog.

Four questions first, and these are worth asking **one at a time in chat** even
in form mode. They're the only questions in setup whose answers depend on each
other, so a form would collect four guesses instead of one plan:

1. What's the smallest version that's genuinely useful to someone? (Recommend a
   cut, and name what you're leaving out.)
2. What has to exist before anything else can — auth, schema, a deploy target?
3. What are you least sure about, technically? That's usually what to prototype
   first rather than plan around.
4. Anything already decided that I should record as a decision rather than
   re-litigate later?

Then write the first state:

- **`.ctx/inbox/`** — one item per piece of work, numbered from `001`, each
  `status: drafted` with acceptance criteria you drafted from what they told
  you. List them compactly in your reply so a single `ready 001 003 004`
  confirms the lot. Where you can't write a criterion you could check yourself,
  leave that item `status: new` with the question in it — an honest `new` beats
  an invented `drafted`. Read `.ctx/inbox/README.md` first.
- **`.ctx/product/roadmap.md`** — Now / Next / Later, plus anything the user
  explicitly said they're *not* doing, with the reason.
- **An ADR in `.ctx/decisions/`**, numbered from `0001` — only for choices with
  lasting consequences that came up during the interview. Most setups produce
  zero of these, and zero is the right answer when nothing structural was
  decided.
- **`.ctx/product/brainstorm.md`** — anything raised but not committed to.

## Phase 5 — Install the adapters

Nothing outside `.ctx/` ships with the template. You install only what the
user's tools actually need — Form 1 Part 0, or Round 0 in chat mode. Sources are
in `.ctx/adapters/` — see its README for the full mapping.

**Always**, regardless of tool:

- Copy `.ctx/adapters/AGENTS.md` → `AGENTS.md` at the repo root. This is the
  standing contract and the only adapter carrying real content. **Copy it as-is
  — do not edit the hard stops or the bookkeeping rules into something friendlier.**

**Then, per tool they named:**

| Tool | Copy | To |
|---|---|---|
| Claude Code | `adapters/CLAUDE.md` | `CLAUDE.md` |
| Claude Code | `adapters/claude-settings.json` | `.claude/settings.json` |
| Copilot | `adapters/copilot-instructions.md` | `.github/copilot-instructions.md` |
| Cursor | `adapters/cursorignore` | `.cursorignore` |

Merge rather than overwrite if a file already exists, and say what you merged.
For `claude-settings.json`, drop the `_comment` key and fold `permissions.deny`
into any existing settings.

You may not be able to write `.cursorignore` yourself — it governs your own
access. If the write is refused, tell the user the one command to run.

**Also:**

- If you created `.ctx/rules/*.md`, generate matching `.cursor/rules/*.mdc`
  carrying the same `globs:`. Without this, tier 2 never loads at all.
- Offer to copy `.ctx/skills/setup-project-context/` into `.claude/skills/` or
  `.agents/skills/` so future setup runs trigger on their own. Optional.
- Mention `.ctx/hooks/README.md` exists and is opt-in. Don't install it unasked.

## Phase 6 — Report and clean up

1. Write `.ctx/handoff.md` describing the current state.
2. Add one note to `.ctx/sessions/` recording what was set up.
3. **Delete `.ctx/starter.md` and the whole `.ctx/setup/` directory**, then
   remove their two rows from `.ctx/index.md`. Both are one-time scaffolding,
   and a row pointing at a deleted file is exactly the drift the index checker
   exists to catch — leaving it behind means the first `reindex` after setup
   reports a failure you caused.
4. Show a table: file, what you filled in, and **verified / stated / default /
   still `<FILL>`** for each. Name what you **deleted** too, and why.
5. List which adapters you installed, and for which tool.
6. List every question still open, and every inbox item waiting on a `ready`.
7. **Hand over the loop.** Point at `.ctx/manual.md` and name the four phrases
   that carry it: `catchup` to start a session, `park` to end one,
   `give @.ctx/git.md` to commit, `refresh context` monthly. Nobody reads a
   manual unprompted, and the system does very little for someone who never
   learns those four. Setup is the last time anything happens in one big pass —
   from here the folder is maintained a line at a time, by the ceremonies.

Then say plainly which parts of `.ctx/` are trustworthy and which are still
scaffolding. That last sentence is the most useful thing you produce, because it
tells the next session what to believe.

---

## Anti-patterns

- **Filling everything in.** A half-filled honest `.ctx/` beats a complete
  fabricated one. Empty is a valid answer.
- **Handing over a blank form.** The whole reason form mode isn't bureaucracy is
  that you answered first. An unfilled form is homework, and homework gets
  abandoned in week one along with the folder it came in.
- **Writing docs while a form is out.** You'll write from your own draft, then
  have to unpick it when the corrections arrive. Hand it over and wait.
- **Batching the decisions in chat mode.** Round 1 questions are decisions, not
  confirmations. One at a time.
- **Asking what the repo answers.** Every avoidable question spends the user's
  patience, and patience is the budget for the questions that matter.
- **Installing every adapter.** Four root files that do nothing for this user is
  clutter, and clutter in a repo root is how a template gets deleted.
- **Writing a directory tree into `map.md`.** Say what each area is *for* and
  which boundaries matter. Structure is readable from the filesystem; intent
  isn't.
- **Committing.** You never run git here. See `.ctx/git.md`.
