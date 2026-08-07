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

What is at stake if Kenovis gets this wrong is customer trust in adopting an AI system inside their own codebase. If the framework ever silently overwrites a customer's real business documentation, or leaks its own vertical's assumptions into a customer's domain, it breaks the exact operating discipline it exists to sell. The non-negotiables below protect that trust.
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

## Installation Rules

### RULE-INST-01

Framework updates never touch Product-layer files without explicit customer action.

Entities affected: Installation, Framework Release.

Rule: Syncing a new Framework Release must only modify files under the Framework layer (.kenovis/AI/agents/, .kenovis/AI/workflows/, .kenovis/AI/policies/, .kenovis/AI/commands/, .kenovis/AI/templates/, .kenovis/AI/SYSTEM.md, CLAUDE.md, README.md). It must never write to COMPANY_OS.md, DECISIONS.md, PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, AI/memory/, or any of the customer's own existing code — wherever in the repository it lives — without the customer explicitly initiating that step.

Example (valid): CLI sync updates .kenovis/AI/agents/backend.md to a newer version. Example (invalid): CLI sync silently rewrites the customer's COMPANY_OS.md.

---

### RULE-INST-02

Framework Release syncs must be reversible.

Entities affected: Installation, Framework Release.

Rule: A sync must never perform an in-place, non-version-controlled rewrite. The customer's own git history and PR review are the rollback mechanism — the CLI must produce a diff the customer can review and revert, not an irreversible overwrite.

---

## Vertical Rules

### RULE-VERT-01

An Agent Roster must not leak another Vertical's vocabulary.

Entities affected: Vertical, Agent Roster.

Rule: When a new Vertical's Agent Roster is defined (e.g. Legal, Accounting — see PRODUCT/ROADMAP.md Phase 3), its agents, glossary and policies must be authored from that vertical's real domain, not copied from the Software Development roster and relabeled.

---

## Commercial Rules

### RULE-COMM-01

The open-core boundary must be explicit.

Entities affected: Agent Roster, Framework Release.

Rule: Which capabilities are free (base framework) versus paid (advanced agents, support, future hosted extras) must be documented in PRODUCT/FEATURES.md. No feature may be silently gated after a customer has already relied on it being free.

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

- A customer's Installation still holding placeholder/example content (RULE-INST-01 must not assume it's already real).
- A Framework Release sync interrupted partway through.
- A customer manually editing Framework-layer files (drift between what Kenovis shipped and what the customer's repo actually has).
- A customer on a Framework Release several versions behind.
---
Final Principle

Business rules are the contract between the company and the customer.

Breaking them means breaking trust.
