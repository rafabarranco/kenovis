<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

DATABASE.md

Database Architecture

Version: 1.2
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

[ANSWER: The engine, version, and where it is hosted. Must match ENGINEERING/ARCHITECTURE.md → Technology Stack.]

[ANSWER: If this product has no database, say so here with the reason and the condition that would change it, then mark the sections below "not applicable" rather than deleting them — a future hosted layer will need the shape back. Do not invent a schema ahead of a real need.]
---
Core Database Principles

Principle 1

Data must be scoped to its owner.

If the product is multi-tenant, every table holding customer data carries the tenant key named in ENGINEERING/ARCHITECTURE.md → Tenancy Model, and no query may omit it.

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

[ANSWER: The tables, their columns and their relationships. Every entity in DOMAIN/DOMAIN_MODEL.md that is persisted should appear here under the same name — a table whose name does not match its domain entity is where the vocabulary starts drifting.]

[ANSWER: If nothing is persisted yet, say so and name which domain entities are conceptual only.]
---
Indexing Strategy

[ANSWER: Which columns are indexed and why. Indexes follow real query patterns — list the queries that justify each one, or state that none have been measured yet.]
---
Row Level Security (RLS)

[ANSWER: Whether row-level security is enforced in the database itself, and how. If the product is single-tenant or has no database, state that instead — but do not silently drop the section, because "the application checks it" is exactly the answer the principle below rejects.]
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

[ANSWER: Data-layer work deliberately deferred, each with the phase or condition that would trigger it. Deferred is not the same as forgotten — an item listed here is a decision; an item missing here is an oversight.]
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
