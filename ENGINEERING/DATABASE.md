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

[No engine chosen yet. Record it here and log the decision in DECISIONS.md — see ENGINEERING/ARCHITECTURE.md.]
---
Core Database Principles

Principle 1

[If multi-tenant: every business entity carries the tenant key chosen in ENGINEERING/ARCHITECTURE.md, NOT NULL by default.]

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

[No tables defined yet. Derive the schema from DOMAIN/DOMAIN_MODEL.md — one section per core entity, each documenting: purpose, schema (conceptual column list), constraints, and status/type enums where relevant. Add an audit_logs table if DATA integrity rules in DOMAIN/BUSINESS_RULES.md require traceability.]
---
Indexing Strategy

[Once the schema is defined, list the indexes required by common query patterns — typically the tenant key on every business table, plus foreign keys used in frequent lookups.]
---
Row Level Security (RLS)

[If the chosen database and platform support RLS (e.g. Supabase/PostgreSQL) and the product is multi-tenant, RLS is mandatory: every business table must enforce that a user can only access rows belonging to their tenant.]
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

[Note here anything deliberately deferred — e.g. payment provider integration, advanced reporting, a data warehouse — without designing it prematurely.]
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
