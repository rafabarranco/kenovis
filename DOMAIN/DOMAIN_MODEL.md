<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

DOMAIN_MODEL.md

Domain Model

Version: 1.0
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

[No entities defined yet. Describe here what the platform's core domain actually manages, and diagram the primary entities and how they relate. Derive this from the real business — do not copy example entities from elsewhere in this framework.]
---
Domain Philosophy

[State the primary boundary the product is organized around — e.g. everything exists inside the context of an account, a tenant, a project. Name what the system must never assume, given that boundary.]
---
Core Entities

[For each core entity, document: definition, examples, responsibilities, attributes (conceptually — id, foreign keys, core fields), business rules, and relationships to other entities. Add one section per entity below as the domain is defined.]
---
Domain Relationships Summary

[Diagram or list how the core entities relate once they are defined above.]
---
Domain Invariants

These rules must always be true.

[List the non-negotiable domain-level guarantees — e.g. tenant isolation, historical integrity, calculation transparency — once the domain is defined.]
---
Generic Terminology

Avoid vertical-specific naming in the domain model.

Prefer generic operational concepts that could apply to more than one vertical, unless the product is intentionally single-vertical and that trade-off has been made explicitly.
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
