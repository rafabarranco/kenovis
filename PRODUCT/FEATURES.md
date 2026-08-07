<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md -->

FEATURES.md

Product Features Specification

Version: 1.0
---
Purpose

This document defines the product capabilities, feature specifications and functional expectations of the platform.

Every feature must have:

- A clear user problem.
- A defined business purpose.
- Explicit behavior.
- Acceptance criteria.

A feature is not complete because it exists technically.

A feature is complete when it solves the intended user problem.
---
Product Core

Customer (Team) → owns → Installation → tracks → Framework Release, scoped to → Vertical → defines → Agent Roster.

See DOMAIN/DOMAIN_MODEL.md for full definitions. Individual FEATURE-NNN specs (CLI install, CLI sync, per-Vertical Agent Roster onboarding, etc.) get added below as they are speced — none exist yet; do not invent them here ahead of real specification.
---
Feature Specification Template

Use this structure for every feature added to the platform:

FEATURE-NNN

[Feature Name]

Purpose

[Why this feature exists.]
---
User Problem

[The problem this solves, stated from the user's perspective.]
---
Primary Users

[Which roles or personas use this feature.]
---
Capabilities

The system must support:

[List of concrete capabilities.]
---
Required Information

[Data the feature needs to function, required vs. optional.]
---
Business Rules

[Constraints from DOMAIN/BUSINESS_RULES.md that apply to this feature.]
---
Acceptance Criteria

The user can:

[List of testable outcomes.]
---
Features Explicitly Not Included Initially

- Hosted dashboard / web UI — no backend exists in v1 (DECISIONS.md DECISION-013). Revisit only in PRODUCT/ROADMAP.md Phase 4 if real demand justifies it.
- Billing / payment processing — the open-core paid tier starts as documentation-only (DOMAIN/BUSINESS_RULES.md RULE-COMM-01), not a metered system, until Phase 2.
- Multi-tenant accounts or authentication — there is no shared backend to authenticate against; each Installation lives entirely inside the customer's own repository.
- Non-Software Verticals (Legal, Accounting) — deferred to PRODUCT/ROADMAP.md Phase 3, after the model is validated on Software Development.
- Telemetry beyond explicit opt-in — see ENGINEERING/SECURITY.md.
---
Feature Development Rules

Before implementing any feature:

Answer:

Problem

What user problem does this solve?

User

Who needs this?

Frequency

How often does this happen?

Value

Why would someone care?

Complexity

What is the simplest implementation?
---
Definition of Done

A feature is complete when:

- User problem is solved.
- Business rules are implemented.
- Security is considered.
- Error states exist.
- Documentation is updated.
- Tests cover critical behavior.
---
Final Principle

Do not build features.

Build solutions to operational problems.
