<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

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

Kenovis's domain is unusual: it is not a typical SaaS business domain (customers, orders, invoices). It is the domain of operating a specialized AI-augmented team inside someone else's codebase.

The core entities are: Customer (Team), Installation, Framework Release, Vertical, and Agent Roster. A Customer runs one or more Installations, each Installation tracks a Framework Release and is scoped to one Vertical, and each Vertical defines an Agent Roster.
---
Domain Philosophy

Everything exists inside the context of a single Installation — one customer repository running one instance of the Kenovis AI-OS. Kenovis has no runtime access to a customer's Installation once distributed: there is no backend, no telemetry beyond what a customer opts into. The system must never assume it can read from or write to a customer's repository remotely, and every domain fact about an Installation is self-reported, local to that customer's own repo.
---
Core Entities

### Customer (Team)

Definition: The human organization or individual who adopts Kenovis.

Attributes (conceptually): name, vertical served (initially Software Development), team size, adoption date.

Relationships: owns one or more Installations.

---

### Installation

Definition: One instance of the Kenovis AI-OS living inside a customer's own repository.

Attributes (conceptually): framework version installed, vertical, product-layer completion status (initialized vs. still example content), install date, last sync date.

Business rules: an Installation's Product layer (COMPANY_OS.md, DECISIONS.md, PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, AI/memory/) plus the customer's own existing code, wherever it lives in their repository, is fully owned by the customer. There is no framework-mandated directory name for it — where the code lives is a per-product choice recorded in that Installation's own ENGINEERING/ARCHITECTURE.md. Kenovis, and the CLI it distributes, must never overwrite any of it silently on update. See DOMAIN/BUSINESS_RULES.md RULE-INST-01 and RULE-INST-02.

Relationships: belongs to one Customer; tracks one Framework Release (the one currently synced); scoped to one Vertical.

---

### Framework Release

Definition: A versioned snapshot of the Framework layer (.kenovis/AI/agents/, .kenovis/AI/workflows/, .kenovis/AI/policies/, .kenovis/AI/commands/, .kenovis/AI/templates/, .kenovis/AI/SYSTEM.md) that customers can sync into their Installation.

Attributes (conceptually): version, changelog entries, release date.

Relationships: an Installation tracks the Framework Release it last synced. A Framework Release is defined for exactly one Vertical's Agent Roster (today: Software Development).

---

### Vertical

Definition: A professional practice the Agent Roster is specialized for.

Examples: Software Development (today, and the only one in v1). Legal, Accounting — planned, not yet built. See COMPANY_OS.md → Long-Term Market Vision.

Attributes (conceptually): name, Agent Roster definition, domain glossary.

Relationships: an Installation is scoped to exactly one Vertical. A Vertical defines exactly one Agent Roster per Framework Release.

Business rule: an Agent Roster for one Vertical must never assume another Vertical's domain vocabulary. See DOMAIN/BUSINESS_RULES.md RULE-VERT-01.

---

### Agent Roster

Definition: The set of specialized AI agent role definitions (e.g., for Software Development: CTO, Product Manager, Designer, Frontend, Backend, Security — see .kenovis/AI/agents/) shipped as part of a Framework Release for a given Vertical.

Attributes (conceptually): list of agent role definitions, the workflows and policies each agent operates under.

Relationships: belongs to exactly one Vertical, versioned as part of a Framework Release.

---
Domain Relationships Summary

Customer 1—N Installation.

Installation N—1 Framework Release (the one currently tracked).

Installation N—1 Vertical.

Vertical 1—1 Agent Roster (per Framework Release).
---
Domain Invariants

These rules must always be true.

- Framework layer and Product layer must never mix. A Framework Release update must never modify a customer's Product-layer files.
- Kenovis has no runtime access to a customer's Installation in v1 — no backend exists to read from or write to it.
- A Vertical's Agent Roster must be internally consistent with its own domain vocabulary; no cross-vertical term leakage.
---
Generic Terminology

Avoid vertical-specific naming in the domain model.

Prefer generic operational concepts that could apply to more than one vertical, unless the product is intentionally single-vertical and that trade-off has been made explicitly. Kenovis is intentionally single-vertical (Software Development) in v1 — see PRODUCT/ROADMAP.md Phase 3 for when this expands.
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
