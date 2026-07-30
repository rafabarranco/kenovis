<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

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

[Diagram or list the fundamental concepts the platform is built around — these should match the entities defined in DOMAIN/DOMAIN_MODEL.md.]
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

[List features considered and deliberately excluded, with the reason for each exclusion. Naming exclusions protects scope as much as naming what gets built.]
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
