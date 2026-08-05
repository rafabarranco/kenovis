<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

DATABASE.md

Database Architecture

Version: 1.0
---
Purpose

This document defines the database architecture, conventions and rules for the platform.

The database is considered a critical business component.

It must guarantee:

- Data integrity.
- Tenant isolation, if the product is multi-tenant.
- Historical preservation.
- Financial accuracy, if the product handles money.
- Scalability.
---
Database Philosophy

The database represents the business domain.

The schema should be:

- Explicit.
- Understandable.
- Predictable.

Avoid:

- Generic tables.
- Ambiguous fields.
- Excessive abstraction.
---
Database Technology

None in v1. Per DECISIONS.md DECISION-013, Kenovis operates no backend and no database in v1 — Installation state lives entirely inside the customer's own repository. This document stays intentionally unpopulated below until a hosted layer is designed (PRODUCT/ROADMAP.md Phase 4). Do not invent a schema ahead of that need.
---
Core Database Principles

Not applicable until a database exists. See ENGINEERING/ARCHITECTURE.md → Tenancy Model.

---
Principle 2

Historical data must be preserved.

Prefer:

soft delete

over:

hard delete

---
Principle 3

Database constraints protect business rules.

Do not rely only on application code.
---
Naming Conventions
---
Tables

Use:

- lowercase.
- plural names.
- snake_case.
---
Columns

Use:

snake_case

Examples:

created_at

updated_at

[tenant_key]

---
Primary Keys

All tables use:

id

Recommended type:

UUID

Reason:

- Distributed systems compatibility.
- Security.
- Easier future scaling.
---
Timestamps

All main entities should include:

created_at

updated_at

---
Soft Delete

Entities that represent business history should support:

deleted_at

---
Schema

None in v1 — no database exists. DOMAIN/DOMAIN_MODEL.md entities (Customer, Installation, Framework Release, Vertical, Agent Roster) are conceptual only; none are persisted by Kenovis.
---
Indexing Strategy

Not applicable — no database in v1.
---
Row Level Security (RLS)

Not applicable — no database, and no multi-tenant model, in v1.
---
RLS Principle

Frontend security is not enough.

The database must protect itself.
---
Migration Rules

Database changes must always use migrations.

Never manually modify production databases.
---
Migration Process

Create migration

↓

Review

↓

Test locally

↓

Deploy

---
Seed Data

Development environments should include representative seed data covering the core entities defined in DOMAIN/DOMAIN_MODEL.md.
---
Database Testing

Critical tests:

Tenant Isolation (if multi-tenant)

Verify one tenant cannot see another tenant's data.
---
Data Accuracy

Verify any business-critical calculations the domain performs.
---
Historical Preservation

Verify soft-deleted records do not remove history.
---
Performance Rules

Do not optimize prematurely.

First:

- Correct schema.
- Correct indexes.
- Correct queries.

Optimize after measuring.
---
Future Considerations

Deliberately deferred, not designed prematurely: a hosted backend + database for the optional dashboard layer (PRODUCT/ROADMAP.md Phase 4), payment provider integration for the paid open-core tier (Phase 2).
---
AI Agent Database Rules

Before changing schema:

Ask:

1. What business problem requires this?
2. Does an existing entity already represent it?
3. Does it respect tenant isolation, if applicable?
4. Does it preserve historical data?
5. Are migrations required?
---
Final Principle

The database is not storage.

The database is the memory of the company.

Protect it.
