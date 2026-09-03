# Adapters

Templates for the files that have to sit at your **repo root** rather than in
`.ctx/`, because that's where each tool looks.

Nothing here is active. `.ctx/starter.md` asks which tools you use and copies
only the ones you need. If you'd rather do it by hand, copy them yourself:

| Copy this | To here | For |
|---|---|---|
| `AGENTS.md` | `AGENTS.md` | Cursor, Codex, and most newer tools. **Everyone needs this one.** |
| `CLAUDE.md` | `CLAUDE.md` | Claude Code |
| `copilot-instructions.md` | `.github/copilot-instructions.md` | GitHub Copilot |
| `claude-settings.json` | `.claude/settings.json` | Claude Code — native deny rules |
| `cursorignore` | `.cursorignore` | Cursor — blocks reads of `scratchpad.md` |

## Why they aren't shipped pre-installed

Most projects use one or two tools, not five. Dropping five root files into
someone's repo — four of which do nothing for them — is clutter, and clutter in
a repo root is how a template gets deleted.

## Which is real and which is a pointer

Only **`AGENTS.md`** carries content. It holds the standing contract: the
session-start reading order, the two required bookkeeping duties, the precedence
rule, and the hard stops. That lives at the root rather than in `.ctx/` because
it has to work before any pointer has been followed, and it must outlive
`starter.md`.

`CLAUDE.md` and `copilot-instructions.md` are pointers to `AGENTS.md`. Don't
copy content into them — duplicated instructions drift, and a context file that
lies is worse than one that's missing.

`claude-settings.json` and `cursorignore` aren't instructions at all. They're
enforcement: deny rules and ignore patterns the tool applies without asking the
model's opinion. Ship them if you can. Know their limit — neither stops a
subprocess that opens a file directly.

## Adding a tool later

Copy the relevant file. If your tool isn't listed, point its native entry file
at `AGENTS.md` in one line and add a row to the table above.
