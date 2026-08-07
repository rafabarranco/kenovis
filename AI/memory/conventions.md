<!-- PROJECT-SPECIFIC: accumulates per-product knowledge. Reset the recorded entries when starting a new product, keep the rules. See .kenovis/AI/commands/init-project.md -->

AI Memory Conventions

Version: 1.1
---
Scope

The rules in this document are framework-level and reusable.

The conventions recorded by the AI while working on a product are project-specific and must be cleared when starting a new product.
---
Purpose

This document defines the conventions that the AI should preserve throughout the lifecycle of a project.

The goal is to maintain consistency across:

- Development decisions.
- Naming.
- Architecture.
- Communication.
- Processes.
- Team collaboration.

This file represents the operational habits of the organization.
---
Memory Philosophy

Memory exists to preserve reusable knowledge.

Memory should help the AI:

- Avoid repeating mistakes.
- Maintain consistency.
- Understand project evolution.
- Make better future decisions.

Memory should not store:

- Temporary tasks.
- Short-term context.
- Individual conversations.
- Unconfirmed ideas.
---
Memory Categories

The AI should classify knowledge into three categories.
---
Permanent Knowledge

Information that should remain valid for a long time.

Examples:

- Coding conventions.
- Architecture patterns.
- Naming rules.
- Domain terminology.
- Team agreements.

Store in:

AI/memory/conventions.md

---
Domain Knowledge

Information about the business.

Examples:

- Business concepts.
- Rules.
- Definitions.
- Processes.

Store in:

DOMAIN/

Never store business rules in AI memory.
---
Technical Decisions

Information about why technical choices were made.

Examples:

- Why a database was selected.
- Why a framework was chosen.
- Why an architecture pattern exists.

Store in:

DECISIONS.md

or

AI/memory/learnings.md

depending on scope.
---
Naming Conventions

The AI must prioritize consistency over personal preference.

Before creating new names:

1. Search existing terminology.
2. Check domain definitions.
3. Reuse existing concepts.

Avoid creating synonyms.

Example:

Bad:

Customer

Client

User

Account

when they represent the same concept.

Good:

Customer

used consistently.
---
Code Conventions

The AI should preserve:

- Existing project style.
- Existing folder organization.
- Existing naming patterns.
- Existing architectural patterns.

Do not introduce new patterns without justification.
---
Documentation Conventions

Documentation should be:

- Clear.
- Concise.
- Structured.
- Actionable.

Avoid documentation that only describes what code already shows.

Good documentation explains:

- Why something exists.
- How something works.
- What constraints exist.
---
Decision Recording

When a meaningful decision is made:

The AI should ask:

"Will this decision affect future development?"

If yes:

Create or update documentation.

Examples:

Architecture decision:

DECISIONS.md

Business rule:

DOMAIN/BUSINESS_RULES.md

Technical learning:

AI/memory/learnings.md

---
Change Management

When modifying existing conventions:

The AI must:

1. Identify the current convention.
2. Explain why it should change.
3. Evaluate impact.
4. Update documentation.

Never silently change organizational rules.
---
Project Consistency Rules

The AI must maintain consistency between:

Business Language

↓

Domain Model

↓

Database Model

↓

API Contracts

↓

Frontend Models

↓

User Interface

Terminology should flow consistently through all layers.
---
Preferred Patterns

The AI should prefer:

- Explicit naming.
- Clear abstractions.
- Small focused modules.
- Reusable components.
- Predictable structures.

Avoid:

- Clever solutions.
- Hidden behavior.
- Excessive abstraction.
- Framework-specific coupling.
---
Learning From Mistakes

When an important mistake happens:

The AI should record:

Problem:

Why it happened:

Solution:

Future prevention:

Example:

Problem:
Duplicated authorization logic.

Why:
Permissions were handled in multiple places.

Solution:
Centralized authorization rules.

Future prevention:
All permissions must be validated server-side.

---
Cross-Project Reusability

The AI-OS may be reused across multiple projects.

Therefore:

Never store project-specific assumptions here.

Bad:

All projects use PostgreSQL.

Good:

Projects should document their database choice explicitly.

---
Memory Quality Rules

Before adding information to memory, verify:

✓ Is this useful in the future?

✓ Is this stable?

✓ Is this reusable?

✓ Does it belong here?

If not, do not store it.
---
Final Principle

Memory is not a diary.

Memory is the organization's accumulated experience.

Store only knowledge that improves future decisions.