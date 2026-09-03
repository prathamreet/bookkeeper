---
form: 2
about: House rules — git, tone, tests, per-area conventions
status: unfilled
---

<!-- Agent: fill this in place, after Form 1 has been answered.

     DELETE the parts the user skipped in Form 1 Part 1 — Part 4 if they wanted
     no rule files, Part 5 if there's no UI, Part 6 if the domain doesn't
     overload words. Offering a section that obviously doesn't apply spends
     patience, and patience is the budget for the questions that matter. Say
     which parts you dropped and why.

     This is the last thing the user answers. Everything gets written after it. -->

# Form 2 — house rules

The conventions no linter enforces and no repo reveals. These are the ones an
agent gets wrong in a way that's technically fine and still feels foreign.

**Every row already has a recommended answer.** Hand this back untouched and
those apply — nothing here is a blocker. The point is to make the defaults
*visible* so you can override the two or three you actually care about.

Derived from your repo where possible: <AGENT: say what you read — commit
history, existing config, an editorconfig, house style in the code — or say you
found nothing and everything below is a default.>

**This is the last step.** When it comes back, the agent writes every context
file in one pass, installs your adapters, and deletes itself. After that you're
running the normal loop — `catchup`, `park`, `give @.ctx/git.md`.

When you're done: set `status: filled` and say **`form 2 done`**.
Not interested? Say **`skip form 2`** and the recommendations apply as written.

---

## Part 1 — Git and commits

*Lands in `.ctx/git.md`.*

| | Recommended | Change it to |
|---|---|---|
| May the agent run `git commit`? | **No.** It writes the message, you run it | |
| May it run `git add`? | **No** | |
| May it push, or force-push? | **Never** | |
| May it create branches? | **Ask first** | |
| Commit subject format | <AGENT: what `git log` actually shows, e.g. Conventional Commits> | |
| Subject line limit | **72 characters** | |
| Body required? | **When the *why* isn't obvious from the subject** | |
| **Emojis in commit messages?** | **No** | |
| `Co-Authored-By` or "generated with" trailers? | **No** — they add noise to every line of `git blame` | |
| Branch naming | <AGENT: the pattern in `git branch -a`, or `type/short-slug`> | |
| Merge style | <AGENT: what the history shows — squash, merge, rebase> | |
| Who opens pull requests? | **You. The agent drafts the description** | |

The "no commits" default isn't timidity. A commit is the one action in this list
that's awkward to undo once it's shared, and the agent writing the message while
you run it costs you three seconds and removes the whole class of problem.

## Part 2 — Tone and comments

*Lands in `.ctx/taste.md`.*

| | Recommended | Change it to |
|---|---|---|
| **Emojis in code, identifiers, or log output** | **No** | |
| **Emojis in user-facing UI copy** | <AGENT: match whatever the existing copy does> | |
| **Emojis in the agent's chat replies** | **No** | |
| Comment density | **Only where the code can't carry it** — a constraint, a trade-off, a reason something looks wrong | |
| Comments explaining a change you just made | **Never.** That's the commit message, and it's noise the moment the PR merges | |
| `TODO` comments | **No.** File it in `.ctx/inbox/` instead, where it's actually tracked | |
| Agent reply length | **Short. Lead with the outcome, detail after** | |
| Docstrings on every function | **No — on the non-obvious ones** | |

**Anything an agent keeps getting stylistically wrong here?**
<FILL: skip it if you don't know yet. This is much better filled in after a few
real sessions than guessed at now.>

## Part 3 — Tests and done

*Lands in `.ctx/core.md`.*

| | Recommended | Change it to |
|---|---|---|
| New behaviour ships with a test | **Yes** | |
| Fixed bugs ship with a regression test | **Yes** | |
| May the agent create test files freely? | **Yes**, under <AGENT: the test path> | |
| May it change an existing test to make a suite pass? | **Never.** It reports the failure instead | |
| Coverage bar | <AGENT: from the config, or **none — coverage isn't a goal**> | |
| Definition of done | **Typecheck, lint, and the relevant tests pass, and the agent ran them and said what they returned** | |

## Part 4 — Per-area conventions

*Lands in `.ctx/rules/` — one short file per area, named for the area.*

Only worth it where an area genuinely differs from the rest of the codebase. Two
or three files, not ten. If nothing differs, say **none** and skip the rest.

<AGENT: propose the areas you'd write rule files for, from what you read. For
each: the area, the glob, and the one convention that makes it different.
Something like:

  - `api` — glob `src/api/**` — handlers validate, call one core function, and
    map the result. No business logic, no direct database access.

If you found no area worth its own file, say so — that's the common answer and
the right one for most repos.>

**Areas to write rules for:** <AGENT: your proposal, or "none">

> Heads up: `.ctx/rules/` isn't read by any tool on its own. The agent will
> generate the mirrors your harness actually loads. Without that step these
> files are just documents.

## Part 5 — UI

*Lands in `.ctx/design.md`. **Skip unless this project has a user interface.***

| | Recommended | Change it to |
|---|---|---|
| Component library | <AGENT: from the manifest> | |
| Styling approach | <AGENT: from the config> | |
| Design tokens defined in | <AGENT: path, or `<FILL:>`> | |
| Voice of user-facing copy | **Plain, specific, no exclamation marks** | |
| Every async surface handles loading / empty / error / success | **Yes** | |
| Accessibility floor | **Keyboard reachable, labelled controls, visible focus** | |

**Two or three real opinions about interaction here** — not platitudes:
<FILL: e.g. "destructive actions never use a confirm dialog, they use undo">

## Part 6 — Vocabulary

*Lands in `.ctx/glossary.md`. **Skip unless a word means something specific
here** — most projects should.*

Words that mean something narrower than they sound, or where two similar words
are genuinely different things (*account* vs *workspace* vs *org*).

<AGENT: terms you saw used in a non-obvious way in the code, as questions.
Empty is fine and common.>

## Part 7 — Enforcement

*Rules ask nicely; a script or a CI check enforces. Optional, and off by
default.*

| | Recommended | Change it to |
|---|---|---|
| Install the session-end handoff nudge | **Offer it, don't install it unasked** — see `.ctx/hooks/README.md` | |
| Add the index check to CI | **Yes if you have CI** — it's the one silent failure in this design | |
| Block agent reads of `.ctx/scratchpad.md` at the tool level | **Yes** — the adapters do this natively | |

---

## When you hand this back — everything gets written

One pass, using both forms together:

1. **The context files** — `core.md`, `map.md`, `git.md`, `gotchas.md`, and
   whatever you kept in Form 1 Part 1. Anything you skipped gets **deleted**,
   along with its row in `.ctx/index.md`.
2. **A first backlog** in `.ctx/inbox/`, if you asked for one — items written as
   `drafted` with criteria you confirm in a word.
3. **Rule files**, plus the mirrors your harness actually loads. Without the
   mirrors, `.ctx/rules/` is just a folder of documents.
4. **Adapters** at your repo root, for the tools you named in Form 1 Part 0.
5. **`starter.md` and this whole `setup/` folder, deleted**, and their rows
   removed from the index.
6. **A report**: every file, what went in, and whether each line is verified,
   something you stated, a default you left alone, or still a placeholder.

Then it tells you plainly which parts of `.ctx/` are trustworthy and which are
still scaffolding. That last sentence is the most useful thing setup produces,
because it tells the next session what to believe.

From there the ceremonies in `.ctx/manual.md` take over. Four of them carry the
whole loop: `catchup` to start a session, `park` to end one,
`give @.ctx/git.md` to commit, `refresh context` once a month.
