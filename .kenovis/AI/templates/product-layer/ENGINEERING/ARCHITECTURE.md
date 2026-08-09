<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

ARCHITECTURE.md

Software Architecture

Version: 1.6
---
Purpose

This document defines the technical architecture principles of the platform.

The objective is to create a system that is:

- Maintainable.
- Scalable.
- Secure.
- Simple to evolve.
- Suitable for AI-assisted development.
---
Architecture Philosophy

The architecture follows these principles:

Simple first.

Scalable when necessary.

Business logic protected.

The system should avoid premature complexity.

We optimize for:

1. Fast iteration.
2. Clean domain boundaries.
3. Long-term maintainability.
---
High-Level Architecture

The platform follows a modular architecture:

Client Applications

        |

        |

Application Services

        |

        |

Domain Logic

        |

        |

Infrastructure

        |

        |

External Services

---
Technology Stack

[ANSWER: Record an explicit choice, or an explicit "none", for each line below. "None" is a valid and often correct answer — but it must be stated, because the framework's agents read this section and a missing line reads as "unknown", which makes them guess.]

- Frontend (web / mobile): [ANSWER: the choice, or "none".]
- CLI/tooling layer: [ANSWER: the choice, or "none".]
- Backend / API layer: [ANSWER: the choice, or "none".]
- Database engine: [ANSWER: the engine, or "none" — also expanded in ENGINEERING/DATABASE.md.]
- Authentication approach: [ANSWER: the approach, or "none".]
- Deployment target: [ANSWER: the target, or "none".]

[ANSWER: Where a choice was assumed rather than confirmed, say so on that line. An unmarked assumption becomes an inherited fact.]
---
Static Analysis

[ANSWER: The commands that check this codebase, and where they are run from: type checker, tests, linter, formatter.]

[ANSWER: If one of these deliberately does not exist yet, say why. "No linter yet, because X" is documentation; a silent absence is an open question every contributor re-asks.]
---
Hard Rules (No Exceptions)

[ANSWER: The rules this product's implementation may never break, whatever the feature. These are not style preferences — each one should be a rule whose violation would be a real defect, and each should trace to a business rule in DOMAIN/BUSINESS_RULES.md or a decision in DECISIONS.md.]

[ANSWER: Examples of the shape, not the content: what the system must never write to; what it must never require network access to; what it must never execute. Write this product's own.]
---
Database

[ANSWER: The engine, or "none" with the reason and the condition under which that changes. Expanded in ENGINEERING/DATABASE.md.]
---
Authentication

[ANSWER: How identity is established, or "not applicable" with the reason.]

Requirements:

- Secure login.
- Password management.
- Session handling.
- Access control scoped to the tenancy model chosen below.

Authentication is separate from authorization.

[ANSWER: If this product has no accounts, replace the requirements above with the reason — do not leave a checklist that describes a system that does not exist.]
---
Authorization Model

[ANSWER: Who may do what, and where that is enforced. Or "not applicable", with the reason.]
---
Tenancy Model

[ANSWER: Single-tenant or multi-tenant, and if multi-tenant, the exact name of the tenant key. `.kenovis/AI/policies/database.md` and `.kenovis/AI/agents/database.md` deliberately do not assume a model — they read this section. If it is vague, they will be vague.]
---
Domain Architecture

The codebase should separate:

Domain

Application

Infrastructure

Presentation

---
Domain Layer

Contains:

- Entities.
- Value objects.
- Business rules.
- Domain validations.

Should not depend on:

- Database.
- UI.
- External services.
---
Application Layer

Contains:

- Use cases.
- Workflows.
- Commands.
- Queries.
---
Infrastructure Layer

Contains:

- Database access.
- External APIs.
- File storage.
- Notifications.
---
Presentation Layer

Contains:

- Screens.
- Components.
- User interaction.

Should not contain business rules.
---
Suggested Project Structure

[ANSWER: Where this product's implementation actually lives, and how it is organized. This section is the single answer to "where is the code?" — the framework has no mandated directory name, and `.kenovis/AI/commands/bootstrap.md` reads this section instead of guessing.]

[ANSWER: For a greenfield product, decide the layout here and record it. For a product adopted from an existing repository, describe the layout that already exists — never relocate working code to match a shape suggested by a document.]

[ANSWER: Write the real tree, annotated with what each directory is for. Map the layers above onto it, and say explicitly where a layer does not apply, e.g. "no presentation layer — this product has no UI".]

src/

├── domain/                     [entities, value objects, business rules]

├── application/                [use cases, orchestration]

├── infrastructure/             [database, external APIs, filesystem]

└── [presentation]/             [UI, CLI surface, or HTTP handlers]

---
Feature-Based Organization

As the application grows, prefer feature boundaries over huge shared folders, mirroring the core entities in DOMAIN/DOMAIN_MODEL.md.
---
Database Architecture

The database should represent business concepts.

Avoid:

- Generic tables.
- Over-normalization.
- Ambiguous fields.

Prefer:

Clear tables.

Clear relationships.

Clear ownership.
---
API Philosophy

APIs should represent business actions.

Prefer:

POST /[resources]

POST /[resources]/{id}/[sub-resource]

over:

POST /updateThing

---
Error Handling

Errors must be meaningful.

Avoid:

Something went wrong

Prefer:

[SPECIFIC_ERROR_CODE]

[Human-readable explanation of what constraint was violated.]

---
Validation Strategy

Validation happens at multiple levels:

Client

Improve user experience.

Application

Protect workflows.

Database

Protect data integrity.
---
State Management

State should be simple.

Avoid unnecessary global state.

Prefer:

- Local state.
- Server state.
- Clear data ownership.
---
File Organization Rules

Each file should have one clear responsibility.

Avoid:

- Giant files.
- Mixed concerns.
- Utility dumping grounds.
---
Dependency Rules

Dependencies must justify their existence.

Before adding a library:

Ask:

- Does it solve a real problem?
- Is maintenance reliable?
- Does it increase complexity?
---
Testing Architecture

Testing priority:

1. Domain Tests

Highest value. Cover core business calculations and rules.
---
2. Integration Tests

Verify:

- Database behavior.
- Authentication.
- Workflows.
---
3. UI Tests

Cover critical user flows.
---
Deployment Philosophy

Initial deployment should prioritize:

- Reliability.
- Simplicity.
- Low operational cost.

Avoid unnecessary infrastructure.
---
Observability

The system should eventually support:

- Error tracking.
- Performance monitoring.
- Usage analytics.
---
Security Architecture

Security principles:

- Least privilege.
- Server-side validation.
- Tenant isolation, if the product is multi-tenant.
- Auditability.
---
Scalability Strategy

The expected evolution:

Phase 1:

Single application.

Phase 2:

Modular services.

Phase 3:

Independent scalable components.

Do not start with microservices.
---
AI Development Considerations

The architecture must be understandable by AI agents.

Prefer:

- Explicit naming.
- Predictable structures.
- Clear boundaries.
- Documented decisions.

Avoid:

- Clever patterns.
- Hidden behavior.
- Excessive abstraction.
---
Architecture Decision Process

Any significant technical decision requires:

1. Problem definition.
2. Alternatives considered.
3. Decision.
4. Reason.
5. Consequences.

Document in:

DECISIONS.md

---
Final Architecture Principle

The best architecture is not the most advanced one.

It is the simplest architecture that allows the company to win.
