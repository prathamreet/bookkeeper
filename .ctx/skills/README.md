---
read_when: An installed skill might apply, or its advice seems to conflict with this project's rules.
verified: <YYYY-MM-DD>
---

# Skills

Two things live in this folder: a register of the external skills you've
installed, and the setup skill that ships with the template.

## What's here

| Path | What it is |
|---|---|
| This file | The register. Which external skills are installed, and their conflicts with project rules. |
| `setup-project-context/` | First-run setup — the two forms, or the chat interview if you ask for one. Copy it to `.claude/skills/` or `.agents/skills/` to make it trigger on its own. |

---

# Installed skills

External skills add behaviour to every session, and they don't know anything
about this project. Below is where we record which ones are installed, what
they're for, and what happens when they disagree with us.

Empty is fine. Most projects need none.

## Why register them at all

A skill is text injected into the agent's context, same as everything in `.ctx/`
— so it competes with your rules. A minimalism skill telling the agent to avoid
abstraction will sooner or later meet a `rules/` file that mandates one.
Undeclared, the agent silently picks a side and you never find out which.

Registering a skill does three things: makes it visible in review, records the
conflicts you already know about, and gives the agent somewhere to look when
advice arrives that didn't come from this repo.

## Precedence

Repeated from `AGENTS.md` because this is where it gets tested:

1. `.ctx/core.md` and `.ctx/rules/` — this project's rules.
2. Your personal global config.
3. **Installed skills** — general good practice, applied only where nothing
   local says otherwise.

When a skill and a project rule collide, the project wins, and the agent says
which it followed and what it overrode. Silent resolution is the failure mode.

## Installed

<!-- One row per skill. Delete the example. -->

| Skill | What it does | Fires when | Known conflicts |
|---|---|---|---|
| `<FILL>` | <FILL> | <FILL: the trigger, from its description> | <FILL: or "none known"> |

<!-- Worked example:

| ponytail | Pushes the agent down a "do we need this at all" ladder before writing code — reuse, stdlib, native platform feature, one line, and only then a real implementation. | Any code-writing task; always-on ruleset. | Tension with `rules/api.md`, which requires every handler to go through the shared `Problem` type even when a bare throw would be shorter. **`rules/api.md` wins.** |
| code-graph | Builds a symbol graph so the agent can trace call sites instead of grepping. | Asked to find usages, trace a flow, or assess blast radius. | None. Complements `map.md` — the graph answers "what calls this", `map.md` answers "where should new code go". |

-->

## Notes per skill

<!-- Where a skill needs more than a table row: setup steps, a flag you always
     pass, a case where you deliberately turn it off. -->

- <FILL>

## Deliberately not installed

<!-- Same value as the parked list in brainstorm.md: without the reason written
     down, someone re-proposes it every couple of months. -->

| Skill | Why not |
|---|---|
| `<FILL>` | <FILL> |

---

## Before you install anything

Treat a skill like a dependency, because that's what it is — except it ships
instructions instead of code, and you pay for them on every future prompt.

- **Read its `SKILL.md` first.** All of it. Stars are a popularity signal, not a
  review.
- **Check what it always loads.** Some skills are on-demand (a name and one line
  of description sit in context until triggered); others inject a full ruleset
  every turn. The second kind competes with `core.md` for attention.
- **Look for overlap with what you already have.** A skill that restates your
  `taste.md` in different words is worse than either alone, because now the
  agent has two similar-but-not-identical rulesets and no way to reconcile them.
- **Write down the conflict when you find one**, in the table above. That's the
  whole point of this file.

## Where skills load from

Not from here. Each tool looks in its own place, so a skill has to be copied
where the tool expects it:

| Tool | Location |
|---|---|
| Cursor | `.cursor/skills/` or `.agents/skills/` |
| Claude Code | `.claude/skills/` |
| Codex | `.agents/skills/` |

`.agents/skills/` is read by both Cursor and Codex, which makes it the best
single destination for a skill you want portable.
