# `.ctx/` — agent context, in one place

This folder is the project's memory. It exists because language models are
stateless: the conversation dies, the repo doesn't. Anything an agent needs to
know tomorrow has to be written down here today.

Nothing in here is magic. Every file is plain text that a harness (Cursor,
Claude Code, Codex, Copilot) pastes into the model's context. The only thing
that differs between files is **when they get loaded**.

---

## The three tiers

Everything in tier 1 is paid for on **every single request**, in tokens and in
attention. The reason to keep it short isn't that models can't hold many
instructions — by 2026 they can hold thousands — it's *relevance*. Anthropic's
own guidance is blunt about the consequence: a bloated instructions file makes
the agent ignore the rules inside it, because the rule you care about is
competing with a wall of text that doesn't apply to the task at hand. Their
stated target is under 200 lines per file.

| Tier | What | Cost | Files |
|---|---|---|---|
| **1 — Always** | Facts needed on nearly every task | Every request | `core.md`, root `AGENTS.md` |
| **2 — Conditional** | Loaded when a file pattern matches | Only when relevant | `rules/*.md`, **once mirrored** |
| **3 — On demand** | The agent opens it because `index.md` said to | Zero baseline | everything else |

Most of your writing belongs in tiers 2 and 3. If you find yourself adding to
`core.md`, ask whether it's really needed for *every* task.

**Tier 2 requires a setup step.** No tool reads `.ctx/rules/` — it's the source
of truth, not a load path. Glob-scoped loading only starts working once you
generate the mirrors your harness actually reads (`.cursor/rules/*.mdc` for
Cursor, the equivalent elsewhere). Skip that and everything in `rules/` silently
becomes tier 3. Cursor's glob matching has also been reported as unreliable, so
for a rule that genuinely must always apply, put it in `core.md` and pay the
tier-1 cost rather than hoping.

Tier 3 only works if it's discoverable, which is `index.md`'s entire job. A doc
the agent doesn't know exists is dead weight.

## What lives outside this folder, and why

Nothing ships outside `.ctx/`. But a few files have to *end up* at the repo
root, because that's the only place their tool looks — so they ship as
templates in `.ctx/adapters/` and setup copies out the ones you need.

- **`AGENTS.md`** — the standing contract. Session-start reading order, the two
  required bookkeeping duties, the precedence rule, and the hard stops. Every
  tool loads it automatically, which is exactly why the *ongoing* rules live
  there rather than in `starter.md`. `starter.md` gets deleted after setup; the
  obligations have to outlive it. **Everyone installs this one.**
- **`CLAUDE.md`** and **`.github/copilot-instructions.md`** — pointers to
  `AGENTS.md`, so tools that look for their own filename land in the right
  place. Only installed if you use those tools.
- **`.cursorignore`** and **`.claude/settings.json`** — enforcement rather than
  instruction. `.cursorignore` blocks Cursor's file tools and `@`-mentions from
  reading `scratchpad.md`; the Claude settings file denies the same path plus
  `git add/commit/push` natively, with no script involved.

  **Know the limit.** Neither stops a subprocess. Cursor's own docs say terminal
  and MCP tools "cannot block access to code governed by `.cursorignore`," and
  Claude's deny rules cover its own file tools and recognised shell commands but
  not, say, a Python script that opens the file itself. This raises the cost of
  an accident; it is not a security boundary. Don't put secrets in the repo.

Everything else — conventions, intent, history — belongs here.

---

## What's here

**Always read**

- `core.md` — verify commands, hard rules, permission boundary. Tier 1.
- `index.md` — router: what exists and when to open it.
- `handoff.md` — where the last session stopped. Overwritten, not appended.

**Reference**

- `map.md` — where code lives, so nobody greps blindly.
- `taste.md` — preferences a linter can't catch.
- `design.md` — product, UX, copy, and visual rules.
- `glossary.md` — domain terms that mean something specific here.
- `gotchas.md` — code that looks wrong and isn't. Read before "cleaning up".
- `git.md` — commit conventions, and the handover model: the **agent writes
  commit messages, the user runs them**. Built on the idea that git history is
  agent memory, so every subject line has to carry the *why*.

**Intent**

- `product/prd.md` — what we're building, for whom, and what's out of scope.
- `product/brainstorm.md` — ideas *before* they're decided. Agents may discuss
  them, never build from them. Promotion into the PRD is a human decision.
- `product/roadmap.md` — sequence and current focus.
- `decisions/` — ADRs. Numbered, immutable, superseded rather than edited.
  Ships with only a template; your first real decision is `0001`.

**Procedure**

- `playbooks/` — checklists for tasks the team repeats.
- `rules/` — glob-scoped conventions. Tier 2.

**Work and history**

- `inbox/` — the task queue. One file per item, status in frontmatter. **You
  describe it in a sentence and the agent writes the item**, drafting acceptance
  criteria you confirm in a word. Filing is not something you do by hand.
- `work/<slug>/` — a change in flight: plan, task checklist, out-of-scope list.
  Skip it for small changes; open one for anything over about three steps.
- `sessions/` — one note per session: what happened, how it was verified, dead
  ends. Disposable by design — prune it, and promote anything that recurs.

**Human only, and temporary**

- `scratchpad.md` — yours. Agents are told not to read it, and `.cursorignore`
  enforces that properly. Nothing here is authoritative or acted upon.
- `starter.md` — one-time setup guide, including a prompt that has an agent fill
  this folder in. **Delete it once setup is done.**
- `setup/` — two forms the agent pre-fills and you correct: the project, then
  the house rules. Deleted with `starter.md` when setup finishes.

---

## Deliberately not included

Worth stating, because the absences are decisions rather than oversights.

**No `backlog.md`.** It would be a third place for work to live, alongside
`inbox/` and `roadmap.md`, and three sources of truth means at least two are
wrong. The backlog already exists: `inbox/` holds the items, `roadmap.md`
sequences them into Now / Next / Later. If you want a single ordered view,
generate it from inbox frontmatter rather than maintaining it by hand.

**No compaction config.** Compaction lives inside the harness's loop, and
Cursor, Codex, and Claude Code own that — you can't drive it from a file in the
repo. What you *can* control is surviving it, which is what `handoff.md` is for:
write down task state, the next concrete step, and the dead ends, and a fresh
context picks up where the old one stopped.

**No index or embedding store.** Harnesses already index your code better than
a checked-in artifact would, and a stale index is worse than none. `map.md`
covers the part they can't infer: what each area is *for* and which boundaries
matter. If retrieval genuinely becomes the bottleneck, that's the point to reach
for an MCP retrieval server — and to write an ADR about why.

---

## Maintenance rules (this is the part that matters)

Templates like this one usually die the same death: the files drift out of sync
with the code, the agent trusts them over reality, and they become actively
harmful. Three habits prevent that.

### 1. Docs declare what they describe

Reference files carry frontmatter naming the paths they cover and the commit at
which they were last checked:

```yaml
---
describes: ["src/core/**", "src/api/**"]
verified_sha: 3f9a1c2   # authoritative — this is what a checker diffs against
verified: 2026-09-02    # cosmetic, for humans
---
```

That makes staleness *mechanical* rather than a matter of hope. Diff those paths
since `verified_sha`; if there's been meaningful churn, the doc needs review.
Wire it into CI when you're ready — a doc claiming to describe a directory that
has moved 40 files since it was verified should fail the build. The cheapest and
highest-signal check isn't churn at all, though: it's whether every path in
`describes:` still *exists*. Renames and deletions are what cause the most
damage, and `git ls-files` catches them for free.

Three rules learned the hard way:

- **Never write `describes: ["."]` or `["**"]`.** Every commit then invalidates
  the doc, the checker screams constantly, and people turn it off in week two.
  Name the paths whose change would actually make the doc wrong.
- **Judgement docs get no `describes:`.** `taste.md`, `glossary.md`, `design.md`
  aren't descriptions of code, so no diff can tell you they've drifted. They stay
  true by review. Pretending otherwise gives false confidence.
- **A restamp is not a proof.** Nothing git-based can stop someone bumping
  `verified_sha` without reading anything. The check tells you where to look; it
  doesn't tell you the doc is right.

### 2. Notes expire; only repeated lessons get promoted

Session notes in `sessions/` are **disposable by default**. A lesson earns a
permanent home only when it shows up two or three times, and only with a
verifiable source (a command that reproduces it, a failing test, a commit).

```
sessions/*.md  →  gotchas.md / rules/*.md / core.md
   (transient)        (durable, and maintained)
```

An ever-growing memory doesn't get smarter, it gets noisier. Retrieval accuracy
falls as the pile grows, and one confidently-wrong old entry does more damage
than ten missing ones. **Forgetting is a feature.** Prune `sessions/` freely.

### 3. The admission test

Before adding any line to any file here, ask:

> **Would removing this line change what the agent does?**

If not, don't write it. This one question does more to keep the system alive
than any amount of structure, and it rules out most of what people instinctively
put in context files: directory listings, dependency inventories, stack
descriptions, and anything else already sitting in the code where the agent can
read it. Duplicating the codebase in prose creates a second source of truth that
starts rotting immediately.

What passes the test is the residue: conventions that differ from ecosystem
defaults, command caveats, frozen paths, security boundaries, and pitfalls with
observed evidence of an agent actually getting it wrong.

`playbooks/refresh-context.md` turns this into a callable operation — `refresh`,
`audit`, `record` — so it happens on a schedule rather than only when someone
feels guilty.

### 4. Prefer an executable check over a written rule

"Always handle errors" is a wish. A lint rule is a fact. If a convention can be
enforced by a linter, a type, or a test, do that instead and just tell the agent
which command to run — it reads the failure and corrects itself. Prose is for
the things you *can't* enforce.

Same distinction applies to bookkeeping. Asking the agent in prose to "update
the session log when you finish" is probabilistic: it usually complies and
forgets exactly when the context is full and the task was hard, which is when
you needed it. A **hook** — a script fired by the harness on a real event — is
deterministic. Rules ask nicely; hooks enforce.

---

## Bootstrapping a project (first 20 minutes)

The normal route is to hand `starter.md` to an agent. It explores the repo, runs
your commands, and writes its answers into the two forms in `setup/` for you to
correct — the first asking which of these files you want at all, the second
covering house rules. Everything is written in one pass once both come back,
and whatever you skipped is deleted rather than left half-filled.

What follows is the same priority order, for filling it in by hand.

Do not fill in every file. In priority order, the things an agent genuinely
cannot infer from your code:

1. **`core.md` verify commands.** Highest value item in this entire folder. An
   agent with a fast, exact verify loop looks careful; one without it hands you
   broken work with a confident summary.
2. **`core.md` "Never" list.** Negative constraints prevent the expensive
   mistakes. An agent will happily "fix" a generated file if nobody said so.
3. **`core.md` exemplar file.** One line — "imitate `src/core/billing/gateway.ts`"
   — beats fifty lines of style prose, because pattern-matching is what models
   are actually good at.
4. **`map.md`.** Twenty lines that save the agent from reading two thousand.
5. **`glossary.md`**, if your domain has overloaded words.

Then stop. Add nothing else until you catch an agent making the same mistake
twice, and write down *that specific thing*. Documents born from real failures
get read; documents written speculatively go stale.

---

## Adapters: making a harness actually load this

A file in this folder is inert until some harness reads it. Tools look for their
own filenames, so the repo root holds the entry points:

| File | Read by | Role |
|---|---|---|
| `AGENTS.md` | Cursor, Codex, most newer tools | **Authored.** The standing contract, plus pointers into `.ctx/`. |
| `CLAUDE.md` | Claude Code | Pointer to `AGENTS.md`. |
| `.github/copilot-instructions.md` | Copilot | Pointer to `AGENTS.md`. |
| `.cursor/rules/*.mdc` | Cursor (glob-scoped) | Generated from `.ctx/rules/`. |

Only `AGENTS.md` holds real content, and only the part that must survive without
a pointer being followed. Everything else is a pointer or generated output:
source of truth lives here, written once and adapted outward. When the same
content exists in two hand-edited places, one of them is already wrong.

---

## Why it's built this way

The reasoning behind the layout, kept here rather than as an ADR in
`decisions/` — that folder is for *your project's* decisions and ships empty.

**Why a folder instead of one big `AGENTS.md`.** A single always-loaded file
can't hold tiered content. It grows until it stops working, and by then nobody
can tell which lines are still load-bearing.

**Why `AGENTS.md` still holds the standing contract.** Making it a pure pointer
was the obvious alternative and it's wrong: a pointer costs a tool call that a
model under load may skip, and the bookkeeping obligations are precisely what
must never be skipped. That content is short and changes rarely, so the usual
drift argument doesn't apply. Project conventions still belong in `.ctx/`.

**Why setup hands you a form when the obvious rule is that forms kill adoption.**
Because the thing that kills adoption is a *blank* form. Blank means homework,
homework gets abandoned, and the folder goes with it. A form the agent has
already answered is a diff to review, which is the cheapest thing you can ask of
anyone — and it's the same principle as asking one question at a time with a
recommended answer, just written down instead of spoken. Written down, it also
survives a context reset, gets filled in at your own pace, and shows you the
defaults you're accepting rather than hiding them. The rule that actually holds
is narrower than "no forms": **never ask a question you were capable of
answering first.**

**Why the agent drafts inbox criteria instead of demanding them.** The moment
you describe a piece of work is the moment the most context exists about it.
Making you write acceptance criteria by hand spends that context and produces a
queue of one-line wishes. The honesty rule isn't *don't propose answers* — it's
*don't present a proposal as a fact*, which is what the `drafted` status is for.

**Why files rather than a memory backend.** An MCP memory server or vector store
was considered and rejected for now: plain files are diffable, reviewable, and
versioned alongside the code for free. Revisit if cross-session retrieval
genuinely becomes the bottleneck — and write an ADR when you do.

**Why not a wiki or doc site.** An agent can't read it without network tools,
and it drifts from the code because nothing forces the two to change together.

### Signs this is going wrong

- Agents routinely ignore `.ctx/` and act on stale root files.
- `core.md` has crept past ~60 lines.
- More than a couple of docs carry a `verified:` date older than the code they
  claim to describe.
- Nobody has pruned `sessions/` in months.

---

## Extending this

Add new material in the tier where it costs least:

- A repeatable procedure → `playbooks/`
- Conventions for one area of the codebase → `rules/` with a `globs:` header
- A decision with lasting consequences → `decisions/`
- Something surprising you had to discover → `gotchas.md`, with a repro

Whatever you add, put a line in `index.md` saying when to read it. Otherwise it
may as well not exist.

## Skills, and how they relate to this folder

Agent Skills are the other half of the picture, and they're a genuinely
different thing rather than a competing one:

- **`.ctx/` is declarative.** What this project *is* — conventions,
  architecture, intent, landmines.
- **A skill is procedural.** How to *do* something — a workflow the agent
  triggers when your request matches the skill's description.

A skill is a directory with a `SKILL.md` carrying at minimum a `name` and a
`description`, and it loads progressively: the host keeps only the name and
description in context, and pulls the body in when it decides the skill is
relevant. That's the same progressive-disclosure idea as the tiers above,
applied to procedures.

Location is per-tool — `.cursor/skills/` for Cursor, `.agents/skills/` for
Codex, and so on — so **keep the substance in `playbooks/` and let the skill be
a thin wrapper.** The knowledge then survives a change of tools, and the
`use_when:` field in the playbook template maps straight onto a skill's
`description`.

### Precedence when a third-party skill disagrees with you

Installed skills inject instructions into the same context as your own rules,
and they will sometimes conflict — a minimalism skill telling the agent to avoid
abstraction, against a `rules/` file that mandates one. The order is:

1. `.ctx/core.md` and `.ctx/rules/` — this project's rules win.
2. Third-party skills — general good practice, applied where nothing local says
   otherwise.

`AGENTS.md` states this so an agent doesn't have to guess, and asks it to flag
the conflict rather than silently pick. Treat an installed skill like an npm
dependency: read its `SKILL.md` before installing, because you are adding text
to every future prompt.
