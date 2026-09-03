---
verified: <YYYY-MM-DD>
---

# Version control conventions

## Agent rule first

**Never run `git add`, `git commit`, `git commit --amend`, `git push`, or
create a branch. Not even when the change is obviously ready.** Leave
everything in the working tree and hand the commands to the user to run.

The user commits. The agent writes the message. See *Handing commits over*
below for the format that handover takes.

Never `push --force`, never rewrite published history, never skip hooks
(`--no-verify`), never touch `git config`. Never `git reset --hard`,
`git clean -fd`, or `git checkout .` — uncommitted human work dies there and
does not come back.

<!-- Teams who do want agents committing directly: relax the rule above, keep
     everything else in this file, and record the change in an ADR so the
     reasoning is visible. -->

## Commits

### Why this format

**Git history is agent memory.** An agent that runs `git log` or `git diff`
should be able to reconstruct what happened and *why it happened* without
opening a single file or asking anyone. That is the test every commit here has
to pass.

A message that only says what changed fails it, because the diff already says
what changed. The why is the part that is lost forever if it is not written
down at the moment it was still obvious.

### Format

```text
<type>(<domain>): <what> + <why>

<body: the reasoning, if the subject cannot carry it>

Refs: inbox/NNN
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `build`, `ci`.

Domain is the area touched. <!-- FILL: list the real ones for this project,
e.g. `api`, `db`, `auth`, `billing`, `ui`, `jobs`. Add domains as real areas
appear; don't invent one for a direction that hasn't been chosen. -->

Write the subject so it reads as a sentence: what changed, then why, joined by
`to`, `so`, or `after`. Imperative mood, lower case, no trailing period, under
about 72 characters.

### Examples

Good — the why is in the subject, so `git log --oneline` alone is informative:

```text
fix(auth): expire reset tokens after 15m so a leaked email can't be replayed
feat(billing): key webhook handling on event id after Stripe retried on timeout
refactor(core): move retry policy behind one client so limits stay consistent
chore(ci): pin the node version to match production and stop the flaky build
docs(db): record why job dedup uses advisory locks instead of Redis
```

Bad — all of these force the reader to open the diff:

```text
update files
fix bug
docs: changes
chore(api): update handlers
feat(billing): add scoring
```

When the reasoning doesn't fit in the subject, put it in the body and keep the
subject to the what:

```text
fix(sync): stop dropping records when the vendor returns 200 early

The vendor's API returns 200 before the record is readable, so the immediate
follow-up read intermittently 404'd and we discarded the row. Now the read
retries with backoff and only gives up after 3 attempts.

Refs: inbox/042
```

### Grouping

One logical change per commit. The rule of thumb: **if the body needs the word
"also," it is two commits.**

- A commit that both moves files and changes their content is not reviewable —
  the rename hides the edit. Split it.
- Don't batch a day of unrelated work into one commit. Six specific commits are
  far more useful to an agent reading history than one commit called "updates."
- Do group changes that only make sense together. A rename plus every call site
  updated is one change, not twenty.
- Generated output ships with the change that caused it. <!-- FILL: name the
     generated files, e.g. `openapi.json`, migrations, lockfiles. -->

### Reference the work item

Put `Refs: inbox/NNN` in the body whenever an open inbox item applies. It makes
history searchable by question rather than by file, which is how the work is
actually organised.

## Handing commits over

The agent does not commit. It produces the exact commands for the user to paste
and run.

### The trigger

When the user sends **`give @.ctx/git.md`** — or any short variant — that means:
*read the uncommitted changes and hand back the commit blocks, following this
file.*

Respond with the blocks and nothing else. No summary of the work, no
explanation of what changed, no commentary on the conventions. Only:

- the fenced blocks, in the order they should run, and
- one short line above a block when something is being left unstaged on purpose
  or the order matters.

Check `git status` first, so the blocks cover what is actually uncommitted
rather than what was changed this session. The two are not always the same.

**One fenced block per commit**, containing the `git add` and the `git commit`
together, so the whole commit is a single copy action. Don't split staging and
committing into separate blocks, and don't surround the commands with prose the
user has to edit out.

```bash
git add src/auth/tokens.ts tests/auth/tokens.test.ts
git commit -m "fix(auth): expire reset tokens after 15m so a leaked email can't be replayed"
```

### With a body

Repeat `-m`. Each one becomes its own paragraph, separated by a blank line.
This works in PowerShell, bash, and zsh alike, which a heredoc does not.

```bash
git add src/sync/reader.ts tests/sync/readback.test.ts
git commit -m "fix(sync): stop dropping records when the vendor returns 200 early" -m "The vendor's API returns 200 before the record is readable, so the follow-up read intermittently 404'd and we discarded the row. It now retries with backoff and gives up after 3 attempts." -m "Refs: inbox/042"
```

### Rules for the block

- **Stage explicit paths.** Never `git add .`, `git add -A`, or `git add -u`.
  Listing paths keeps unrelated stray files out of the commit and shows the user
  exactly what they're about to include.
- **Include regenerated output** in the same block as the change that caused it.
- **One block per logical commit.** If the work splits into three commits, give
  three blocks in the order they should run, each with its own `git add`. Don't
  merge them to save the user a paste.
- **Say what is deliberately left unstaged** in prose above the block, if
  anything is. Silence reads as an oversight.
- **Watch the quoting.** Double quotes are fine unless the message contains `$`,
  `` ` ``, or `"`, which PowerShell will interpolate or break on. Use single
  quotes in that case, or reword.
- **Never add trailers the user didn't ask for**, including co-author or
  tool-attribution lines.

## Branches

```text
<type>/<NNN>-<short-slug>
```

For example `fix/042-sync-early-200`. <!-- FILL: branch from what, merge
strategy (squash / merge / rebase), delete after merge? While a project is
small, working directly on the default branch may be fine — say so here. -->

## Never commit

- Secrets, credentials, API keys, tokens, connection strings.
- Real customer data, PII, production logs or exports.
- Anything classified confidential or restricted.
- Large binaries or generated artifacts, except any deliberately committed ones
  named above.

If a secret is ever committed, treat it as compromised: **rotate it first**,
then worry about the history.

## Before committing

1. Run the verify commands in `.ctx/core.md` and confirm they pass.
2. Regenerate anything generated by the change and include it in the same commit.
3. Review your own diff. Remove debug logging, commented-out code, stray TODOs,
   and any file you touched only to reformat.
4. Confirm no sensitive data is in the diff, including test fixtures.
5. Update `.ctx/handoff.md` if the commit changes where the project stands.

## Conflicts

Resolve by understanding both sides, not by taking one wholesale. If a conflict
touches logic you don't understand, stop and ask. After resolving, re-run the
full verify suite — conflict resolution silently breaks things that neither side
broke alone.

## Pull requests

State what changed and why, link the inbox item, and call out anything touching
data handling, external services, auth, or access — those need a closer look
than ordinary code does.

Keep PRs small enough to review in one sitting. Unrelated improvements go in
`.ctx/inbox/`, not in the diff.
