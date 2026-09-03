---
slug: <short-slug>
inbox_item: NNN | none
started: <YYYY-MM-DD>
status: planning | in progress | blocked | done
---

<!-- Directory: .ctx/work/<slug>/plan.md — one folder per change in flight.

     WHY THIS EXISTS: `inbox/` holds work not yet started. `sessions/` holds
     work already finished. `handoff.md` deliberately holds ONE next action.
     So a fifteen-step migration had nowhere to live except the conversation,
     which is the one thing a context reset destroys.

     SKIP THIS FOR SMALL CHANGES. A typo fix does not need a folder. Open one
     when the work is more than about three steps or spans more than one
     session. Delete or archive the folder when the change ships. -->

# <what we're changing>

## Goal

<one paragraph — what is true when this is done that isn't true now>

## Acceptance criteria

<!-- Copied from the inbox item, so they can be checked off here rather than
     merely restated. Each must be checkable by a command, a test, or a look. -->

- [ ] <observable condition>

## Approach

<the shape of the solution, and the one or two real alternatives considered>

## Tasks

<!-- Each task names the file it lands in and the command that proves it.
     "Update the router" is a hint; "add the route to src/api/router.ts, then
     `pnpm test:api`" is a task. Check them off as you go — this checklist is
     the thing that survives a compaction. -->

- [ ] <task> → `<file>` → verify: `<command>`
- [ ] <task> → `<file>` → verify: `<command>`

## Out of scope

- <what we are deliberately not touching in this change>

## Open questions

<!-- Use [NEEDS CLARIFICATION: the specific question] inline anywhere above
     rather than guessing. Grep for that marker before calling the work done. -->

## Outcome

<!-- Filled in when done, then summarised into a `.ctx/sessions/` note:
     what shipped, how it was verified, what was left undone and where it's filed. -->
