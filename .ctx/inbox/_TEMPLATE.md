---
id: NNN
title: <short imperative title>
type: bug | feature | chore | question | idea
status: new | drafted | ready | active | review | done | wontfix
priority: p0 | p1 | p2 | p3
reporter: <who asked for this>
assignee: <unassigned>
created: <YYYY-MM-DD>
areas: ["src/<path>"]
---

## What

<!-- FILL: one paragraph, plain language. What should be true when this is done
     that isn't true today. -->

## Why

<!-- FILL: who is affected and what it costs them. If nobody is affected, this
     is an `idea`, not a `feature`. -->

## Acceptance criteria

<!-- Must be **checkable** — by a command, a test, or a look at the screen.
     This is the line between a task and a wish.

     Agent: draft these from what the user told you and set `status: drafted`.
     Say in your reply that they're a draft. If you can't write criteria you
     could check yourself, leave `status: new` and put the question below —
     that's honest, and an honest `new` beats an invented `drafted`.

     A grammar that reliably produces testable criteria:
       WHEN <trigger> THE SYSTEM SHALL <observable behaviour>
     or, for anything with setup:
       GIVEN <state> WHEN <action> THEN <observable result>

     Where something is genuinely unknown, write it inline as
     [NEEDS CLARIFICATION: the specific question] rather than picking a
     plausible answer. A guess that reads like a requirement is the most
     expensive thing in this file. Grep for that marker before starting. -->

- [ ] <observable condition>
- [ ] <observable condition>

## Reproduce (bugs only)

1. <step>
2. <step>

- **Expected:** <FILL>
- **Actual:** <FILL>
- **Command that shows the failure:** `<FILL>`
- **Environment:** <FILL: OS, browser, version, branch — if it matters>

## Out of scope

<!-- What NOT to change while doing this. Keeps the diff reviewable and stops a
     helpful agent from refactoring the neighbourhood. -->

- <FILL>

## Notes and context

<!-- Links to decisions, related items, prior attempts, relevant code paths. -->

- <FILL>

## Questions

<!-- Agent: put blockers here and set `status: new` rather than assuming.
     Human: answer inline, or just say `ready NNN` if the draft above is right. -->

## Outcome

<!-- Filled in when moving to `review`:
     - what changed, and in which files
     - how it was verified (exact command + result)
     - anything learned that belongs in `.ctx/gotchas.md`
     - anything deliberately left undone -->
