# Architecture and Diagrams

This document contains the Mermaid diagrams used across the repository, along with their source definitions.

## 1. Context Architecture & Information Flow

Corresponds to `assets/architecture.svg` in [README.md](file:///e:/development/bookkeeper/README.md).

```mermaid
flowchart TB
    START(["New session"]) --> ADAPTERS

    subgraph ADAPTERS["Auto-loaded by your tool — zero configuration"]
        direction LR
        CLAUDE["CLAUDE.md<br/><i>pointer</i>"]
        COPILOT[".github/copilot-instructions.md<br/><i>pointer</i>"]
        AGENTS["<b>AGENTS.md</b><br/>standing contract<br/>session order · 2 required duties<br/>hard stops · precedence"]
        CLAUDE --> AGENTS
        COPILOT --> AGENTS
    end

    ADAPTERS --> TIER1

    subgraph TIER1["Tier 1 — every request. Kept small: irrelevant lines dilute attention"]
        direction LR
        CORE["<b>core.md</b><br/>verify commands<br/>never-touch paths<br/>permission boundary<br/>definition of done"]
        HANDOFF["<b>handoff.md</b><br/>current task<br/>single next step<br/>REJECTED APPROACHES<br/>open questions"]
        INDEX["<b>index.md</b><br/>the router<br/>what exists<br/>and when it's worth reading"]
    end

    TIER1 --> WORKING{{"Agent works"}}

    WORKING -->|"where does this live?<br/>where should new code go?"| MAP["map.md<br/>layout · entry points<br/>architectural boundaries"]
    WORKING -->|"this looks dead.<br/>can I remove it?"| GOTCHAS["gotchas.md<br/>load-bearing oddities<br/>flaky tests<br/>environment quirks"]
    WORKING -->|"is this in scope?"| PRD["product/prd.md<br/>problem · users<br/>explicit non-goals"]
    WORKING -->|"is this next?"| ROADMAP["product/roadmap.md<br/>Now / Next / Later<br/>deliberate debt"]
    WORKING -->|"about to touch git"| GIT["git.md<br/>commit grammar<br/>handover blocks<br/>agent never commits"]
    WORKING -->|"writing non-trivial code"| TASTE["taste.md<br/>unlintable preferences<br/>naming · diff hygiene"]
    WORKING -->|"touching UI or copy"| DESIGN["design.md<br/>principles · voice<br/>four states · a11y floor"]
    WORKING -->|"what does this term mean?"| GLOSSARY["glossary.md<br/>overloaded domain words"]
    WORKING -->|"we do this often —<br/>is there a procedure?"| PLAYBOOKS["playbooks/<br/>ordered checklists<br/>refresh · audit · record"]
    WORKING -->|"working inside one area"| RULES["rules/&lt;area&gt;.md<br/>glob-scoped conventions<br/>tier 2"]
    WORKING -->|"why is it built this way?"| DECISIONS["decisions/NNNN-*.md<br/>ADRs · rejected options<br/>immutable"]
    WORKING -->|"a skill contradicts a rule"| SKILLS["skills/README.md<br/>installed skills<br/>known conflicts<br/>precedence"]

    WORKING --> PARK["<b>park</b> — handoff.md rewritten<br/>before compaction, not after"]
    PARK --> NEXT(["Session ends"])
    NEXT -.->|"next session resumes here"| START

    BLOCKED["scratchpad.md<br/>BLOCKED — human only"]
    style BLOCKED fill:#fee,stroke:#c66,stroke-dasharray: 4 4
```

---

## 2. Work Lifecycle & State Transitions

Corresponds to `assets/work-flow.svg` in [README.md](file:///e:/development/bookkeeper/README.md).

```mermaid
flowchart LR
    A[Raw idea] --> B[product/brainstorm.md<br/>unconfirmed — agent may<br/>discuss, may not build]
    B -->|you approve| C[product/prd.md<br/>committed]
    B -->|you reject| P[Parked, with the reason<br/>so it stays rejected]
    C --> D["inbox/NNN.md<br/>you describe it in a sentence<br/>the agent drafts the criteria"]
    D -->|"ready NNN — one word"| R[status: ready]
    R -->|over 3 steps| E[work/slug/plan.md<br/>task checklist]
    R -->|small| F[Just do it]
    E --> G[sessions/note.md]
    F --> G
    G -->|third occurrence| H[gotchas.md · rules/ · core.md<br/>durable]
    G -->|one-off| I[Pruned later]
```
