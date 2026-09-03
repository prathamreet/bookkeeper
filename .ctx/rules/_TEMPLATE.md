---
description: <one line — the agent uses this to decide whether to load the file>
globs: ["src/<area>/**/*.<ext>"]
alwaysApply: false
describes: ["src/<area>/**"]
verified: <YYYY-MM-DD>
---

# <Area> conventions

Tier 2 source of truth. Copy this file per area — `rules/api.md`, `rules/db.md`,
`rules/components.md` — rather than growing one giant file.

> **This directory is not read by any tool on its own.** Glob-scoped loading
> only happens once you mirror these into your harness's rules directory —
> `.cursor/rules/*.mdc` for Cursor, and the equivalent elsewhere. Until you do,
> treat this as tier 3: it loads when someone opens it, and nothing more.
> `.ctx/starter.md` step 9 covers generating the mirrors.

Keep each rule file short. If it passes ~40 lines, it's probably describing
architecture rather than conventions; move that to `map.md` or an ADR.

## Exemplar

`<FILL: path>` — **imitate this file.** One good example outperforms a page of
prose, because pattern-matching is what models do best. Everything below is a
backstop for what the example doesn't show.

## Always

- <FILL: rule> — see `<path to a file that follows it>`

## Never

- <FILL: rule> — <the reason, in one clause. A rule without a reason gets
  rationalised away the moment it's inconvenient.>

## Patterns specific to this area

<!-- FILL: the shape new code should take here. E.g. for an API layer:
     - Handlers validate input, call one core function, and map the result.
       No business logic, no direct DB access.
     - Every handler has a Zod schema in `schemas/`, named `<Route>Input`.
     - Errors return the shared `Problem` shape; never a bare string. -->

- <FILL>

## Verify

<!-- The command that specifically checks this area. Narrower than the full
     suite means faster iteration, which means better work. -->

`<FILL>`

---

<!-- Adapter note: Cursor reads glob-scoped rules from `.cursor/rules/*.mdc`.
     Treat that as generated output from this file — same frontmatter fields —
     so the source of truth stays here and portable. -->
