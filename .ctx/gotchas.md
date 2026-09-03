---
verified: <YYYY-MM-DD>
---

<!-- No file-level `describes:` — each entry carries its own `Where:` path, and
     that's the right granularity. An entry whose path no longer exists is a
     dead entry: delete it. -->


# Gotchas

Code that **looks wrong and isn't**. Read before you remove, simplify, or
refactor anything odd.

This file exists because the most damaging thing an agent does is confidently
delete something load-bearing that appears pointless: the retry loop with the
magic number, the double null check, the seemingly redundant index, the sleep.
Code can say what it does. It cannot say why it has to.

## Format

Copy this block per entry. The **"if you change it"** line is what makes an
entry actionable rather than folklore.

### <the thing that looks wrong>

- **Looks like:** <what a reasonable person would assume on first read>
- **Actually:** <the real reason it's there>
- **If you change it:** <what breaks, and how you'd notice>
- **Verified:** <YYYY-MM-DD> · **Where:** `<path:line>`

---

<!-- Worked example, delete once you have real ones:

### The 150ms sleep in `syncWorker.ts`

- **Looks like:** a lazy patch over a race condition.
- **Actually:** the vendor's API returns 200 before the record is readable.
  An immediate follow-up read intermittently 404s.
- **If you change it:** `tests/sync/readback.test.ts` fails roughly 1 run in 5,
  so a single green run does not prove you were right.
- **Verified:** 2026-07-02 · **Where:** `src/jobs/syncWorker.ts:88`

-->

## Environment and tooling gotchas

<!-- The "works on my machine" tax. Flaky tests, ordering requirements, tools
     that need a flag on one platform. Save the next session an hour. -->

- <FILL: e.g. "`pnpm test` hangs on the integration suite — use `--runInBand`.">
- <FILL: e.g. "`db:reset` must run before `test:e2e` or fixtures collide.">

## Known-flaky tests

<!-- Name them explicitly. Otherwise an agent sees a red suite, assumes it broke
     something, and starts "fixing" working code. -->

| Test | Why it's flaky | What to do |
|---|---|---|
| `<FILL>` | <FILL> | <FILL: e.g. "re-run once; if it fails twice it's real"> |

---

## How entries get here

Promoted from `.ctx/sessions/` once the same surprise has cost someone time
**more than once**, and only with a concrete repro or a named test. One-off
confusions stay in session notes and expire.

Prune this file. An entry describing code that no longer exists is worse than no
entry at all, because it will be believed.
