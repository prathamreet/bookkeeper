---
describes: ["<FILL: src/components/**, src/app/**>"]
verified: <YYYY-MM-DD>
---

# Design

Read when touching UI, user-facing copy, or interaction behaviour.

## Principles

<!-- FILL: 3-5 real opinions, not platitudes. "Be user-friendly" is useless.
     Useful ones look like:
     - Never block the UI on a network call. Update optimistically, reconcile after.
     - No modal for a destructive action; use inline confirm in place.
     - Show the user's data before showing chrome. Content first, always.
     - If a state can't be reached in two clicks, it doesn't exist. -->

- <FILL>

## Voice and copy

- Tone: `<FILL: e.g. direct, calm, never jokey in error states>`
- Sentence case for all UI text — no Title Case. <!-- adjust to taste -->
- Errors say **what to do next**, not just what went wrong.
- No "oops", "whoops", "something went wrong", or exclamation marks in failures.
- Second person for instructions ("Choose a plan"), first person for the user's
  own things ("Your workspace").
- Numbers, dates, and currency follow `<FILL: locale/format rules>`.

## Visual system

- **Tokens are the source of truth:** `<FILL: path>`. Never hardcode a colour,
  spacing value, radius, or font size. If a token is missing, add one.
- Component library: `<FILL>`. **Check it before building anything new** — most
  "new" components already exist there.
- Spacing scale: `<FILL>`. Type scale: `<FILL>`. Radii: `<FILL>`.
- Dark mode: `<FILL: supported? via what mechanism?>`

## Every async surface needs four states

Loading, empty, error, success. All four, every time — the empty and error
states are the ones that get skipped and the ones users actually hit.

- Loading: `<FILL: skeleton? spinner? after how many ms?>`
- Empty: explain what would fill it, and offer the action that does.
- Error: what happened, what to do, and a way to retry.

## Interaction rules

- **Nothing shifts layout on load.** Reserve space for async content.
- Destructive actions are undoable, or confirmed — pick one, never neither.
- Forms: validate on blur, not per keystroke. Show errors next to the field.
- Keyboard: `<FILL: focus order, Escape behaviour, shortcut conventions>`
- Optimistic updates must roll back visibly on failure.

## Accessibility floor

Non-negotiable, treat as a lint rule you enforce by hand:

- Contrast at least 4.5:1 for text, 3:1 for UI boundaries.
- Every interactive element reachable and operable by keyboard, with a visible
  focus ring. Never remove the outline without replacing it.
- Icon-only buttons carry an accessible label.
- Never convey meaning by colour alone.
- Respect `prefers-reduced-motion`.

## Responsive

- Breakpoints: `<FILL>`
- Design mobile-first; `<FILL: which is the primary target?>`
- Touch targets at least 44px.
