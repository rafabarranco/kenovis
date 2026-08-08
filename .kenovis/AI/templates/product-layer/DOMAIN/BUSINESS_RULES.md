<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md -->

BUSINESS_RULES.md

Business Rules

Version: 1.1
---
Purpose

This document defines the non-negotiable business rules of the platform.

These rules represent the real-world constraints that the software must enforce.

Business rules are more important than implementation details.

Any technical decision that violates these rules is incorrect.
---
Core Principle

[What is actually at stake if this product gets its rules wrong — money, safety, legal exposure, customer trust. One paragraph. Every rule below should trace back to this.]
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

## [Entity] Rules

[One section per entity that has rules. Use a stable RULE-ID prefix per entity — e.g. RULE-ORD-01 for Order rules — so a rule can be referenced from code, tests and PRs without renumbering when a new rule is added.]

### RULE-[XXX]-01

[Rule statement, following the format above.]

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

[The states this product's rules must survive that are not the happy path — partial failures, stale data, a customer several versions behind, a half-completed process. List the real ones for this product; do not carry over another product's list.]
---
Final Principle

Business rules are the contract between the company and the customer.

Breaking them means breaking trust.
