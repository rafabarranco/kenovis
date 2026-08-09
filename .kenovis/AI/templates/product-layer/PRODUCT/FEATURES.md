<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

FEATURES.md

Product Features Specification

Version: 1.2
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

[ANSWER: One line tracing the product's central path through the domain entities, e.g. "Customer → places → Order → fulfilled by → Shipment." This is the spine every feature hangs off.]

See DOMAIN/DOMAIN_MODEL.md for full definitions. Individual FEATURE-NNN specs get added below as they are speced. Do not invent them here ahead of real specification — an unspeced feature listed as if it were speced is worse than an empty section.
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

[ANSWER: What this product deliberately does not build yet, and why, each pointing at the decision or roadmap phase that defers it. This section is what stops an agent from helpfully implementing something the business chose to postpone.]
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
