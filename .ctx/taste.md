---
verified: <YYYY-MM-DD>
---

<!-- No `describes:` — this is a judgement doc, not a description of specific
     paths, so no git diff can tell you it's gone stale. It stays true by
     review, not by tooling. -->


# Taste

The preferences a linter can't catch. Everything here is a default, not a law —
**when this file and the surrounding code disagree, follow the code**, and file
the inconsistency in `.ctx/inbox/`.

If a rule below can be enforced by a linter, a type, or a test, delete it from
here and enforce it there instead. Prose is for what tooling can't check.

## Prefer

- **Explicit over clever.** A longer obvious version beats a short surprising one.
- **Early return over nesting.** Guard clauses at the top, happy path unindented.
- **Two functions over one flag parameter.** `boolean` arguments that switch
  behaviour are two functions wearing a trench coat.
- **Concrete duplication over premature abstraction.** Extract on the third use,
  not the second. A wrong abstraction costs more than repeated code.
- **Errors that name the fix.** `"config missing SMTP_HOST — set it in .env"`,
  not `"invalid configuration"`. Include the value you saw and what you expected.
- **Narrow types at the boundary, plain data inside.** Validate once on the way
  in; don't defensively re-check the same shape in five layers.
- **Tests that read as a description of behaviour.** The test name should say
  what breaks for the user if it fails.
- **Deleting code over adding a flag to disable it.**

## Avoid

- **Barrel files and re-export chains.** Import from the source module.
- **Comments that restate the code.** Comment constraints and surprises only —
  the thing the next reader can't see from the code itself.
- **Utility grab-bags** (`utils.ts`, `helpers.ts`, `misc.ts`). Name the module
  after its domain, not its role.
- **Catching an error to re-throw it with less information.** Either add context
  or let it propagate.
- **`try/catch` around code that cannot fail.** It hides the real failure later.
- **Mocking what you own.** Mock the network and the clock; call your own code.
- **`any`, `as`, and `@ts-ignore`.** If you genuinely need one, leave a comment
  saying why in one line.
- **Reformatting or reorganising files you were not asked to change.** It buries
  the real diff and makes review expensive.

## Naming

<!-- FILL with the real conventions in this repo. Some starting points: -->

- Booleans read as assertions: `isReady`, `hasAccess`, `shouldRetry`.
- Functions are verbs; values are nouns. `getUser()` returns, `user` is.
- No abbreviations except the ones already established here: `<FILL>`.
- Say what a function returns, not how it works: `findActiveMembers()`, not
  `queryMembersTableWhereActive()`.

## Comments

Write one only when the code cannot carry the information: a constraint, a
non-obvious trade-off, a reason for something that looks wrong. Never write a
comment explaining a change you just made — that belongs in the commit message
and is noise the moment the PR merges.

## Diff hygiene

- Smallest diff that solves the problem. Unrelated improvements go in `inbox/`.
- Don't rename things in passing.
- If you notice a real problem outside your scope, file it, don't fix it.

## When you disagree with this file

Say so in your summary, and explain why in one sentence. Don't silently deviate,
and don't follow it into an obviously worse outcome.
