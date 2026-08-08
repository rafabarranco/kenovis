<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md -->

DOMAIN_MODEL.md

Domain Model

Version: 1.2
---
Purpose

This document defines the core business domain concepts of the platform.

The objective is to establish a shared language between:

- Product.
- Engineering.
- Design.
- AI Agents.
- Future team members.

The domain model is the foundation of the entire system.
---
Domain Overview

[Two or three sentences: what business area this product operates in, and what the core entities are. Name the entities here before defining them below, so a reader gets the shape of the domain before the detail.]

[Derive these from the real business, not from any example. If the product's domain is unusual — not the typical customers/orders/invoices shape — say so explicitly, because every agent reading this file will otherwise assume the typical shape.]
---
Domain Philosophy

[What is always true about how this domain works, independent of any feature. The constraints that shape every design decision: what the system can and cannot know, what it has access to, what it must never assume.]
---
Core Entities

[One block per entity. Do not invent entities to fill space — a domain with four real entities is stronger than one with twelve guessed ones. Use this shape:]

### [Entity]

Definition: [One sentence, in business language.]

Attributes (conceptually): [The facts that define it. Conceptual, not a database schema — there may be no database.]

Business rules: [Any rule attached to this entity, referencing its RULE-ID in `DOMAIN/BUSINESS_RULES.md`. Omit if none.]

Relationships: [How it connects to the other entities.]

---
Domain Relationships Summary

[The cardinalities, one per line, e.g. "Customer 1—N Order." This section exists so a reader can check the relationships stated per-entity above are mutually consistent.]
---
Domain Invariants

These rules must always be true.

[List the statements that can never be violated, whatever the feature. An invariant is not a preference — if it can be broken by a reasonable product decision, it belongs in `DOMAIN/BUSINESS_RULES.md` instead.]
---
Generic Terminology

Avoid vertical-specific naming in the domain model.

Prefer generic operational concepts that could apply to more than one vertical, unless the product is intentionally single-vertical and that trade-off has been made explicitly.

[State which one this product is, and if single-vertical, where the expansion is scoped in `PRODUCT/ROADMAP.md`.]
---
Domain Evolution Rules

The domain should evolve carefully.

Adding a new concept requires:

1. Clear user problem.
2. Business justification.
3. Impact analysis.
4. Documentation update.
---
AI Agent Instructions

Before implementing any feature:

1. Identify affected domain entities.
2. Check existing business rules.
3. Avoid creating duplicate concepts.
4. Preserve domain consistency.

The domain model is the source of truth.
---
Final Principle

The code should represent the business.

The business should not adapt to the code.
