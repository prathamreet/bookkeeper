# Inbox

The work queue. Tasks, bugs, and feature requests, in a form an agent can pick
up without guessing.

**You talk; the agent files.** Saying *"add a feature request about bulk CSV
export"* is the whole interaction. The agent writes the item, drafts acceptance
criteria from what you said, and shows you them in three lines. You confirm in
a word, or correct one line. Nobody fills in a form.

## When to use it — and when not to

**This is for work you are not doing right now.** It is not a step you have to
complete before the agent is allowed to help you.

| Situation | What to do |
|---|---|
| You want it done in this session | **Just say it in chat.** Filing it first is bureaucracy. |
| You want it done later, or by someone else | Say `add to inbox: <thing>` |
| You spotted it mid-task and it's unrelated | Say `file this` |
| You're not sure it's worth doing at all | `product/brainstorm.md`, not here |
| It's a bug you'll forget by tomorrow | File it here, with the reproduction |

Two things make this worth the friction. It **survives the chat** — anything you
only said out loud is gone when the session ends. And it **forces acceptance
criteria**, which is the difference between work an agent can finish and work it
flails at.

One file per item: `NNN-short-slug.md`. Status lives in frontmatter, so items
never move between folders and git history stays readable.

## Status

```
new  →  drafted  →  ready  →  active  →  review  →  done
 ↑         ↑                                     ↘  wontfix
 └─────────┴── sent back when the criteria don't survive contact
```

| Status | Meaning | May an agent start it? |
|---|---|---|
| `new` | Captured, no criteria yet. An unfinished thought. | **No.** |
| `drafted` | The agent wrote the criteria. A proposal, not a commitment. | Only if you point at it by number. |
| `ready` | A human confirmed the criteria. | Yes — this is the pick-up queue. |
| `active` | Someone is on it. One at a time per person or agent. | — |
| `review` | Done and verified; awaiting a human. | — |
| `done` / `wontfix` | Closed. **Only a human sets these.** | — |

`drafted` is the load-bearing one, and it exists to separate two things that
look alike and aren't: *inventing a requirement and presenting it as fact*, and
*proposing one out loud so it can be corrected*. The first is the failure this
whole system is built to prevent. The second is just doing the work — the agent
has more context at the moment you describe something than at any point
afterwards, so that's when the criteria should get written.

## Rules for the agent

### Filing something

1. **File it on the spot. Don't interview first.** The user asked for a queue
   entry, not a planning session. One item, `status: drafted`, criteria drafted
   from what they actually said.
2. **Show your draft in the reply, compactly** — the id, the title, and the
   criteria in a line each. That turns confirmation into one word:

   > Filed `014-bulk-csv-export.md` — `drafted`.
   > - [ ] `GET /export?format=csv` returns a CSV for any list endpoint
   > - [ ] Exports over 10k rows stream rather than buffer
   > - [ ] `pnpm test:export` passes
   > Say `ready 014` to confirm, or tell me what's wrong.

3. **If you can't draft criteria you could check yourself, file `new`** and put
   your specific questions under `## Questions`. An honest `new` beats an
   invented `drafted`. Guessing is only forbidden when it's *silent* — a draft
   labelled as a draft is not a guess.
4. **Never set your own draft to `ready`.** That confirmation is the entire
   checkpoint. Without it the agent is grading its own homework.
5. Anything you're unsure of goes inline as `[NEEDS CLARIFICATION: the specific
   question]` rather than a plausible-sounding answer.

### Picking something up

6. **On your own, only `ready` items.** Scan by `priority`, then `created`.
   `areas:` tells you which ones touch the code you're already in.
7. **When told `pick up NNN`, a `drafted` item is fair game** — being pointed at
   it is the confirmation. Restate the criteria you're building against before
   you write any code, so a wrong draft dies in one line rather than one hour.
8. Before starting: set `status: active`, fill `assignee`, note it in
   `.ctx/handoff.md`. Work one item at a time.
9. If the criteria turn out to be vague or contradictory once you're in the
   code, stop, write what you found under `## Questions`, and set it back to
   `new`. Building the wrong thing confidently is the expensive outcome here.
10. Respect `## Out of scope`. Anything you notice outside it becomes a **new
    inbox item**, not a bonus change in your diff.
11. When finished: verify against every acceptance criterion, fill in
    `## Outcome`, set `status: review`, and add a note in `.ctx/sessions/`.
12. **Never set an item to `done` or `wontfix`.** That's a human's call.

### Grooming

On `groom inbox`, sweep every `new` item, draft criteria for each, and present
them as one compact list — this is confirmation rather than decision-making, so
batching costs the user nothing. Set each to `drafted`. Whatever you genuinely
can't specify stays `new` with a question attached, and you say which ones and
why.

Do this before a planning session, not during one. A queue of `new` items is a
queue nobody can act on.

## Rules for humans

You mostly answer `ready NNN` or correct one line. Two things are worth your
attention:

**Correct a wrong criterion rather than adding a right one.** Deleting the
agent's bad assumption is worth more than anything you add, because that
assumption is what it will build against.

**"Improve performance" produces impressive flailing.** "The dashboard's first
paint is under 1s on a cold cache, measured by `pnpm bench:dash`" produces work.
If a drafted criterion isn't checkable by a command, a test, or a look at the
screen, say so — it will otherwise be checked by vibes.

## Files

- `_TEMPLATE.md` — the blank form. Copy it per item; never edit it.
- Numbering: next unused `NNN`, zero-padded. Never reuse a number, and if two
  items land on the same one, renumber yours rather than overwriting theirs.
