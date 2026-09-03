---
name: <procedure name>
use_when: <the trigger, phrased the way a user would ask for it>
---

# Playbook: <name>

A checklist for something this project does repeatedly, where the *order*
matters and getting it wrong produces a broken build or a half-wired feature.

Write one when you've watched the same multi-step task go wrong twice. Name the
file for the task: `add-endpoint.md`, `add-migration.md`, `release.md`.

## Preconditions

<!-- State that must hold before starting. Saves a half-finished mess. -->

- <FILL: e.g. clean working tree, dev DB running, on a feature branch>

## Steps

<!-- Exact paths and commands. "Update the router" is a hint; "add the route to
     `src/api/router.ts` next to its siblings" is a step. Include the ordering
     constraints that make this a playbook rather than a list. -->

1. <FILL>
2. <FILL>
3. <FILL>

## Verify

<!-- One command that proves the whole thing worked, plus what output means
     success. The point of a playbook is finishing confident, not hopeful. -->

`<FILL>` — success looks like <FILL>

## Common mistakes

<!-- What people and agents actually get wrong here. Highest-value section. -->

- <FILL: e.g. hand-editing `openapi.json` instead of running `openapi:gen`>
- <FILL: e.g. forgetting to register the new job in the worker's schedule>

## Related

- Decisions: `<FILL: decisions/NNNN-....md>`
- Rules: `<FILL: rules/<area>.md>`

---

<!-- Vendor skills (`SKILL.md`) can wrap this so a harness pulls it in
     automatically on a matching request. Keep the substance here so the
     knowledge survives a change of tools. -->
