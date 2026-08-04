<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

ARCHITECTURE.md

Software Architecture

Version: 1.0
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

[No stack chosen yet. Decide and record here, then log the decision in DECISIONS.md per AI/commands/init-project.md Step 6:

- Frontend (web / mobile).
- Backend / API layer.
- Database engine.
- Authentication approach.
- Deployment target.]
---
Static Analysis

[Record which linter, formatter and type checker this project runs, and the exact commands to invoke them — see AI/policies/coding.md → "Definition of Done" and AI/policies/code-quality.md, which every agent must run before considering code done.

If a quality gate for this project only runs in CI (e.g. SonarQube behind a build server) and cannot be invoked from a coding session, maintain a generated export of its active ruleset at ENGINEERING/CODE_QUALITY.md — see AI/policies/code-quality.md → "When The Gate Only Exists In CI". Do not write that export by hand; regenerate it from the tool whenever its configuration changes.]
---
Hard Rules (No Exceptions)

[Once the stack above is chosen, record here the small set of mechanical, project-specific rules every agent must follow without exception — the kind of rule that is easy to state and cheap to verify by grep, but expensive to unwind if violated repeatedly. Examples of the shape these take (do not copy literally — derive them from the actual stack):

- The one accepted way to import across module boundaries (e.g. a fixed path alias).
- The one accepted file-to-export convention (e.g. one exported unit per file).
- Any pattern this project has deliberately banned in favor of a single alternative (e.g. one state management approach instead of several competing ones).

Keep this list short. A hard rule earns its place by being violated in practice, not by sounding rigorous. An empty or near-empty list here is healthy — it means most decisions are better left to the principles elsewhere in this document.]
---
Database

[Record the chosen database engine and why the domain's relationships require it — see ENGINEERING/DATABASE.md for schema detail.]
---
Authentication

Authentication is handled through a dedicated identity system.

Requirements:

- Secure login.
- Password management.
- Session handling.
- Access control scoped to the tenancy model chosen below.

Authentication is separate from authorization.
---
Authorization Model

[Describe how permissions are structured — e.g. role-based, scoped to an account/organization, resource-level.]
---
Tenancy Model

[Decide explicitly: single-tenant or multi-tenant. If multi-tenant, name the tenant key (e.g. organization_id, account_id) here — AI/policies/database.md and AI/agents/database.md look it up from this document and must not invent one.]
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

This structure lives inside CODE/apps/<app-name>/src/ (see CODE/README.md).

Example:

src/

├── domain/

│   ├── [entity]/

│   └── ...


├── application/

│   ├── use-cases/

│   └── services/


├── infrastructure/

│   ├── database/

│   ├── api/

│   └── storage/


└── presentation/

    ├── components/

    ├── screens/

    └── hooks/

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
