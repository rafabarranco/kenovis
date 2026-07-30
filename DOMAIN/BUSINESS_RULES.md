<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

BUSINESS_RULES.md

Business Rules

Version: 1.0
---
Purpose

This document defines the non-negotiable business rules of the platform.

These rules represent the real-world constraints that the software must enforce.

Business rules are more important than implementation details.

Any technical decision that violates these rules is incorrect.
---
Core Principle

[State the fundamental thing at stake if this software gets it wrong — e.g. real people, real money, real commitments. Derive the non-negotiables below from that.]
---
Rule Format

Group rules by the entity they govern, using DOMAIN/DOMAIN_MODEL.md as the entity list. For each rule:

RULE-ID

[One-line statement of the rule]

Entities affected:

[Which entities this constrains]

Rule:

[Full statement]

Example (valid / invalid):

[Concrete illustration]

---
[No business rules recorded yet. Add them here as the domain model is defined — one group of rules per core entity (isolation, lifecycle, deletion/history, relationships), plus cross-cutting groups for permissions, data integrity, and multi-tenancy if the product is multi-tenant.]
---
AI Agent Implementation Rules

Before implementing any business functionality:

Check:

1. Which business rules apply?
2. Which entities are affected?
3. Which permissions are required?
4. Which historical data could be impacted?

Never implement only the happy path.
---
Edge Case Thinking

Always consider:

- Empty or newly created accounts.
- Deleted or archived records.
- Cancelled or abandoned workflows.
- Duplicate actions.
- Permission changes.
- Partial failures.
- Historical records.
---
Final Principle

Business rules are the contract between the company and the customer.

Breaking them means breaking trust.
