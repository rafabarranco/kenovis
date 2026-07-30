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
Recommended Technology Stack

Frontend

Initial recommendation:

Mobile:

- React Native.
- Expo.
- TypeScript.

Web:

- Next.js.
- TypeScript.

Reason:

A shared TypeScript ecosystem reduces complexity.
---
Backend

Initial recommendation:

- Supabase.
- PostgreSQL.
- Edge Functions when required.

Reason:

The first phase requires:

- Fast development.
- Authentication.
- Database.
- Storage.
- Security rules.

Avoid unnecessary backend complexity initially.
---
Database

Primary database:

PostgreSQL.

Reason:

The domain is relational.

Important relationships:

- Organizations.
- Members.
- Events.
- Attendance.
- Financial operations.

Relational consistency is critical.
---
Authentication

Authentication is handled through a dedicated identity system.

Requirements:

- Secure login.
- Password management.
- Session handling.
- Organization access control.

Authentication is separate from authorization.
---
Authorization Model

The system uses organization-based authorization.

Concept:

User

belongs to

Organization

has

Role

can perform

Actions

---
Multi-Tenant Architecture

The application is multi-tenant from day one.

Every customer operates inside an isolated organization.
---
Tenant Boundary

Primary isolation key:

organization_id

Every business entity must contain:

organization_id

unless explicitly documented.
---
Example

Members:

members

id

organization_id

name

Events:

events

id

organization_id

title

Attendance:

attendance

id

organization_id

event_id

member_id

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

Examples:

Create Event

Register Attendance

Calculate Distribution

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

│   ├── organization/

│   ├── member/

│   ├── event/

│   ├── attendance/

│   └── finance/


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

As the application grows, prefer feature boundaries.

Example:

features/

organization/

members/

events/

attendance/

finance/

Avoid huge shared folders.
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

POST /events

POST /events/{id}/attendance

over:

POST /updateThing

---
Error Handling

Errors must be meaningful.

Avoid:

Something went wrong

Prefer:

EVENT_ALREADY_COMPLETED

Cannot modify attendance after event completion.

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

Highest value.

Examples:

- Distribution calculations.
- Attendance rules.
- Permission rules.
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
- Tenant isolation.
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