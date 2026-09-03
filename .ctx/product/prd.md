---
status: draft
owner: <FILL>
updated: <YYYY-MM-DD>
---

# PRD: <product or feature>

Intent, not implementation. Read when you need to know *why* something should
work a particular way — code can't tell you that, and guessing at product
intent is where agents produce confidently wrong work.

## Problem

<!-- FILL: who hurts, how badly, and what they do today instead. If you can't
     name the person and the pain, there's nothing to build yet. -->

## Who it's for

- **Primary user:** <FILL: role, context, technical level>
- **Their alternative today:** <FILL: the spreadsheet, the competitor, nothing>
- **Not for:** <FILL: who we're explicitly not serving — this prevents scope creep>

## What success looks like

<!-- FILL: observable outcomes, not features. "Users can export" is a feature.
     "A user can get their data into their own BI tool without asking support"
     is an outcome. -->

- <FILL>

## Requirements

### Must have

- <FILL>

### Should have

- <FILL>

### Explicitly out of scope

<!-- The most useful section for an agent. Without it, a helpful model will
     build the adjacent thing you deliberately deferred. -->

- <FILL> — <why deferred>

## Constraints

- **Technical:** <FILL: must work offline / must not add a service / etc.>
- **Compliance / legal:** <FILL>
- **Performance:** <FILL: e.g. p95 under 200ms, works on a 3-year-old phone>
- **Budget:** <FILL: e.g. no new paid vendors>

## Behaviour details

<!-- Where an agent otherwise has to guess. Be specific about the edges. -->

- **Permissions:** who can do this, who can't
- **Empty state:** what a brand-new user sees
- **Failure:** what happens when the underlying operation fails
- **Limits:** rate limits, size caps, quotas
- **Data:** what's stored, for how long, what's deleted on account deletion

## Open questions

- <FILL: question> — **blocking:** yes / no — **owner:** <who decides>

## Decisions made

<!-- Link the ADRs that came out of this, so the reasoning stays connected. -->

- `<FILL: decisions/0002-....md>`
