---
name: refresh context
use_when: docs feel out of date, after a big refactor, before trusting `.ctx/`,
  or when an agent got something wrong because a context file lied
---

# Playbook: keep `.ctx/` true

Every context system that dies, dies the same way: the files grow, drift from
the code, and get believed anyway. The fix is not discipline, it's having named
operations you can actually run. There are four.

Run `refresh` and `audit` on a schedule — after a big refactor, or monthly.
Run `record` the moment something goes wrong, never later.

---

## 1. `refresh` — re-verify against reality

For each doc with `describes:` in its frontmatter:

1. **Run the commands.** Every command in `core.md` — install, typecheck, lint,
   test, test-one-file, dev. If one fails or doesn't exist, fix the doc, not the
   command. A verify command that doesn't run is worse than none.
2. **Find what moved.** Diff the declared paths since the doc was last checked:

   ```bash
   git log --diff-filter=DR --name-only <verified_sha>..HEAD -- <describes paths>
   ```

   Deleted (`D`) and renamed (`R`) files are what silently invalidate a doc.
   Every line that referenced one of them is now wrong.
3. **Check the pointers.** Every file path mentioned in prose still exists.
   Every row in `index.md` points at a real file, and every file under `.ctx/`
   has a row.
4. **Update both frontmatter fields**, and only if you actually did the above:

   ```yaml
   verified: 2026-09-03
   verified_sha: 3f9a1c2
   ```

   `verified_sha` is what makes the next refresh cheap — without it, step 2 has
   nothing to diff against.

## 2. `audit` — shrink it

The only operation that makes the system smaller, and the reason it stays
usable. For every line in every context file, ask BMAD's admission test:

> **Would removing this line change what the agent does?**

If no, delete it. Specifically, delete:

- Anything derivable from the code itself — directory listings, stack lists,
  dependency inventories. Agents read code well and grep beats a stale index.
- Commands already discoverable in `package.json`, `Makefile`, or CI config.
- Aspirational statements about how the project *should* work.
- Style rules a linter could enforce. **Propose the lint rule instead**, then
  delete the prose. A rule is a request; a check is a fact.
- Gotchas about code that no longer exists.

Keep only: conventions that differ from ecosystem defaults, command caveats
("integration tests need the DB up first"), frozen paths, security boundaries,
and pitfalls with observed evidence of an agent actually failing.

## 3. `record` — capture a failure while it's fresh

The moment an agent does something wrong because of a context file — or because
of something no context file mentioned — write it down **now**. Not at the end
of the session, when it will be forgotten.

- Agent broke something that looked pointless → `gotchas.md`, with a reproduction.
- Agent followed a doc that was wrong → fix the doc, drop its `verified:` date.
- Agent needed a fact nobody had written down → the right tier, per `index.md`.
- It's the first time → a `sessions/` note only. Promote on the second or third.

## 4. `report` — say what you found

End with a short summary: which docs were re-verified, which lines were deleted
and why, which pointers were broken, and anything you could not check. Then
update `handoff.md`. If nothing was stale, say so — that's a useful result.

---

## Verify

```bash
grep -rn "NEEDS CLARIFICATION\|<FILL:" .ctx/
```

Unfilled placeholders and open questions should be a short, deliberate list. If
it's long, the template is being carried rather than used.

## Common mistakes

- Bumping `verified:` without doing the work. This is worse than leaving it
  stale, because it launders a guess into a fact.
- Running `refresh` and skipping `audit`. Growth without pruning is how these
  systems end up costing more than they return.
- Recording a one-off confusion as a permanent gotcha. Session notes are
  disposable on purpose; only recurrence earns permanence.
