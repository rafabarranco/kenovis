<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

BUSINESS_RULES.md

Business Rules

Version: 1.3
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

### RULE-INST-03

The AI-OS layer belongs to the AI-OS. A product neither owns it nor edits it.

Entities affected: Installation, Framework Release.

Rule: RULE-INST-01 states one direction — a sync never writes the customer's Product layer. This is the other, and until now it was only implied by the CLI's behaviour. `.kenovis/` is the AI-OS's own layer inside a customer's repository. The customer's product does not extend it, override it, or keep content there: a sync mirror-replaces that directory wholesale, so anything a product places inside it is transient by construction, not by accident.

That is deliberate, and it is what makes the AI-OS the same team in every repository it is injected into. A per-product edit to the AI-OS layer would fork the team quietly, and the fork would disappear on the next sync anyway — the worst of both.

A product's own knowledge has a place, and it is the Product layer: `COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/`. That is where the AI-OS records what it learns about the product it was injected into, and RULE-INST-01 protects it.

Because the removal is correct but not obvious, a sync states what it removed from `.kenovis/`. Deleting is the rule working; deleting silently is the rule being unreadable.

Example (valid): a customer records a house testing convention in `AI/memory/conventions.md`, which survives every sync. Example (invalid): the same convention appended to `.kenovis/AI/policies/testing.md`, which the next sync discards.

**The exception, and it is exactly one repository.** In Kenovis's own repository the product *is* the AI-OS, so its Product layer holds what Kenovis has learned about itself, and it is the only Installation permitted to modify the AI-OS layer — because there, doing so *is* developing the product. Everywhere else that same edit is a fork with a countdown on it. See DECISIONS.md DECISION-020 and DECISION-026.

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

- A customer's Installation with no Product layer at all — the normal state right after `kenovis init`/`add`, since the CLI never writes Product-layer files (DECISIONS.md DECISION-021). RULE-INST-01 must not assume those files exist, nor that they are already real.
- A Framework Release sync interrupted partway through.
- A customer manually editing Framework-layer files (drift between what Kenovis shipped and what the customer's repo actually has).
- A customer on a Framework Release several versions behind.
---
Final Principle

Business rules are the contract between the company and the customer.

Breaking them means breaking trust.
