<!-- PROJECT-SPECIFIC: the Domain Terms section is placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md -->

AI Glossary

Version: 1.2
---
Document Layers

This glossary has two sections.

Domain Terms

Product-specific. The terms below the "Domain Terms" heading describe the current product and must be replaced when starting a new product.

Framework Terms

Reusable. The terms below the "Framework Terms" heading describe the AI-OS itself and apply to every product.
---
Purpose

This document defines the official terminology used across the organization.

The glossary exists to ensure consistency between:

- Business language.
- Product language.
- Domain models.
- Technical implementation.
- Documentation.

The AI must use these definitions as the source of truth.
---
Glossary Rules

Before creating a new concept, the AI must:

1. Check if an equivalent concept already exists.
2. Reuse existing terminology.
3. Avoid creating synonyms.
4. Ask for clarification if terminology is ambiguous.
---
Naming Principle

A single business concept should have:

- One name.
- One definition.
- One meaning.

Avoid situations where the same concept appears as:

Customer

Client

User

Account

unless they represent different concepts.
---
Domain Terms

PROJECT-SPECIFIC. Everything until the "Framework Terms" heading describes the current product.

Write one entry per core business concept, drawn from `DOMAIN/DOMAIN_MODEL.md`. Every entity defined there should appear here; a term that exists in the domain model but not in the glossary is a term the agents will name inconsistently.

Use this shape for each entry:

---
[ANSWER: Term]

Definition:

[ANSWER: One sentence. What the concept is, in business language, not technical language.]

Examples:

[ANSWER: Concrete instances. Omit the heading if none are useful.]

Rules:

[ANSWER: Any business rule attached to the concept, with the RULE-ID from `DOMAIN/BUSINESS_RULES.md`. Omit the heading if none.]
---

Do not invent terms to fill the section. A glossary with four real terms is more useful than one with twenty guessed ones.
---
Framework Terms

Reusable across products. Everything below describes the AI-OS itself and should not change when starting a new product.
---
Feature

Definition:

A user-facing capability that provides value.

A feature should always answer:

- Who needs it?
- What problem does it solve?
- Why does it matter?
---
Requirement

Definition:

A statement describing what the system should do.

Requirements can be:

- Functional.
- Non-functional.
- Technical.
---
Workflow

Definition:

A sequence of actions that achieves a goal.

Examples:

Business workflow:

Start the operation

↓

Involve the participants

↓

Record the outcome

Technical workflow:

Command

↓

Process

↓

Validation

↓

Output

---
Command

Definition:

A user intention that triggers a workflow.

Examples:

/next

/release

/review

Commands should be simple entry points.
---
Agent

Definition:

A specialized AI role responsible for a specific perspective.

Examples:

- CTO.
- Designer.
- Product Manager.

Agents provide expertise.

They do not replace workflows.
---
Policy

Definition:

A mandatory rule that guides decisions.

Examples:

- Security policy.
- Coding policy.
- Architecture policy.

Policies override convenience.
---
Decision

Definition:

A documented choice between alternatives.

A decision should include:

- Context.
- Options considered.
- Final choice.
- Reasoning.
---
Architecture

Definition:

The fundamental structure and organization of a software system.

Includes:

- Components.
- Boundaries.
- Communication.
- Technical decisions.
---
Domain

Definition:

The business area that the software solves problems for.

Examples:

- Finance.
- Education.
- Logistics.
- Healthcare.

The domain is independent from technology.
---
Technical Debt

Definition:

A future cost created by choosing a faster but lower-quality solution.

Technical debt should be:

- Intentional.
- Documented.
- Managed.
---
Ambiguous Terms

When a term has multiple possible meanings:

The AI must ask for clarification.

Example:

"Account"

Could mean:

- User account.
- Financial account.
- Customer account.

Do not assume.
---
Forbidden Naming Patterns

Avoid technical names leaking into business language.

Bad:

DatabaseUser
APIEntity
ComponentModel
DTOObject

Good:

User
Member
Customer
Order

---
Technical Naming

Technical names should derive from domain concepts.

Example:

Business:

Invoice

Possible technical representations:

InvoiceService

InvoiceRepository

InvoiceController

Avoid:

GenericDataManager
HelperProcessor
UtilsService

---
Glossary Maintenance

Update this document when:

- A new core business concept appears.
- A term changes meaning.
- A naming conflict appears.
- Multiple teams need alignment.

Do not update for temporary implementation details.
---
Final Principle

Language creates architecture.

If the organization uses inconsistent words, the software will become inconsistent.

The glossary protects shared understanding.
