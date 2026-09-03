---
updated: <YYYY-MM-DD>
---

# Brainstorm

Where ideas live **before** they're decided. Secondary to `prd.md`, and the
distinction is the whole point:

| | `brainstorm.md` | `prd.md` |
|---|---|---|
| Contains | possibilities | commitments |
| Authority | none — nothing here is agreed | the source of intent |
| Agent may | discuss, expand, poke holes | build from it |
| Agent may not | **build from it** | change it without asking |

## Rules

**For the agent**

1. Never write code from something that's only in this file. If a task depends
   on an idea here, say so and ask for it to be promoted first.
2. You may add ideas, argue against them, and surface consequences — mark
   anything you originate as `[agent]` so its provenance is obvious.
3. **Never promote an idea into `prd.md` on your own.** Promotion is a human
   decision. Propose it, wait.
4. When a human does confirm one, move it to `prd.md`, then record it under
   *Promoted* below with the date. Don't leave the same idea live in both files
   — two copies of the truth means one is already stale.
5. Keep the parked list. An idea killed for a good reason should stay killed,
   and without the reason written down it comes back every few weeks.

**For humans**

Dump freely, half-formed is fine. Prune when it gets long. This file is
allowed to be messy; `prd.md` is not.

---

## Open ideas

<!-- Raw. No commitment implied. Add `[agent]` if a model suggested it. -->

- <FILL>

## Under discussion

<!-- Being actively weighed. Note what would settle it — the missing fact,
     the experiment, the decision-maker. -->

### <idea>

- **Why it might be good:** <FILL>
- **Why it might not:** <FILL>
- **What would settle it:** <FILL>

## Promoted

<!-- Moved into prd.md. Kept as a one-line trail so the origin isn't lost. -->

| Idea | Promoted | Now lives in |
|---|---|---|
| <FILL> | <YYYY-MM-DD> | `product/prd.md` § <section> |

## Parked

<!-- Rejected or deferred, WITH THE REASON. Without the reason this list is
     useless and the idea will be re-proposed indefinitely. -->

| Idea | Why parked | Revisit when |
|---|---|---|
| <FILL> | <FILL> | <FILL: the trigger, or "never"> |

---

<!-- If a decision here has lasting architectural consequences, it graduates
     past the PRD into an ADR: `.ctx/decisions/`. PRD is what we're building;
     ADRs are the structural choices we made doing it. -->
