# Scratchpad — human only

**Agents: do not read, write, index, or summarise this file. Skip it. If you've
already opened it, ignore the contents and don't reference them.**

Your space. Half-thoughts, links, a paste buffer, notes to self, the rant about
that library. Nothing here is context for anyone but you, and nothing here is
authoritative.

Not a secret store. This is a file in a git repo — put credentials in your
password manager or `.env`, never here.

Because agents don't read it, anything you actually want acted on has to move
somewhere else:

| You wrote down | Move it to |
|---|---|
| a task or bug | `.ctx/inbox/` |
| a product idea | `.ctx/product/brainstorm.md` |
| "why is this code like this" | `.ctx/gotchas.md` |
| a convention you want followed | `.ctx/core.md` or `.ctx/rules/` |
| where you got to today | `.ctx/handoff.md` |

## Enforcement

The instruction above is a request, and requests to a model are probabilistic.
The deterministic version is `.cursorignore` in the repo root, which lists this
file and actually blocks tool access to it. Other harnesses have their own
equivalents, or none — check before you put anything sensitive here.

If you want this file private to you rather than shared with the team, add
`.ctx/scratchpad.md` to `.gitignore`.

---

<!-- yours below -->
