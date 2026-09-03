---
verified: <YYYY-MM-DD>
---

<!-- No `describes:` — vocabulary isn't bound to paths. Review, don't diff. -->


# Glossary

Terms that mean something **specific** here. Cheap to write, and it prevents a
whole class of subtly wrong code: if `account`, `workspace`, and `org` are three
different things in your product, an agent that treats them as synonyms will
produce plausible code with the wrong semantics.

Only list words that are overloaded, domain-specific, or easy to confuse. Don't
define `database`.

## Domain terms

| Term | Here it means | Don't confuse with |
|---|---|---|
| `<FILL>` | <precise definition> | <the neighbouring term> |

<!-- Worked example of why this file earns its keep:

| Account   | The billing entity. Exactly one per paying customer.   | Workspace, User |
| Workspace | A collaboration container. An Account has many.        | Account, Org    |
| User      | A person. Joins many Workspaces via a Membership.      | Account, Member |
| Member    | A User's role *within* one Workspace. Not a person.    | User            |
| Seat      | A paid slot on an Account. Consumed by a Membership.   | Member, User    |

-->

## Internal jargon and code names

<!-- Names that appear in the code and mean nothing to an outsider: the old
     project codename, that one service everybody calls "the shredder", the
     legacy table prefix nobody has renamed. -->

| Name | What it actually is | Notes |
|---|---|---|
| `<FILL>` | <FILL> | <FILL: e.g. "legacy name for X, renaming is ADR 0004"> |

## Status and state vocabulary

<!-- Enums and lifecycles get misused constantly. Spell out the legal values and
     transitions once. -->

- `<FILL: e.g. Subscription.status>`: `<values>` — <what each means, and which
  transitions are legal>

## Words we deliberately don't use

<!-- Stops an agent from reintroducing retired terminology into new code and UI. -->

- Not `<FILL: old term>` — use `<FILL: current term>`. <reason>
