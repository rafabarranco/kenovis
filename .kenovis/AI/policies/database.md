# Database Policy

Version: 2.0

---

# Purpose

This document defines the database engineering standards for all projects.

The database is the long-term memory of the business.

Changing code is easy.

Changing data is expensive.

Every database decision must prioritize correctness, consistency, and future evolution.

---

# Core Philosophy

The database represents business reality.

It is not merely a persistence layer.

Tables, relationships, and constraints should model the business, not implementation details.

---

# Golden Rules

Always prioritize:

- Data integrity
- Simplicity
- Explicit relationships
- Safe evolution
- Predictable queries

Never sacrifice correctness for convenience.

---

# Business Before Tables

Never start with:

"What tables do we need?"

Start with:

"What business concepts exist?"

Business entities become database entities.

Not the opposite.

---

# Data Modeling

Every table must answer:

- What business concept does this represent?
- Who owns it?
- Who creates it?
- Who modifies it?
- When does it stop existing?

If these questions cannot be answered, the design is incomplete.

---

# Entity Identity

Every entity requires:

- Stable identity
- Clear ownership
- Explicit lifecycle

Primary keys should never encode business meaning.

Prefer UUIDs unless documented otherwise.

---

# Naming

Use business terminology.

Table names are the plural of a concept that exists in DOMAIN/DOMAIN_MODEL.md and AI/memory/glossary.md.

If a table name does not appear in the domain vocabulary, either the name is wrong or the domain model is incomplete.

Avoid:

records

items

objects

data

table1

---

# Relationships

Relationships must be explicit.

Prefer:

Foreign keys.

Constraints.

Reference integrity.

Avoid:

Implicit relationships.

Soft references.

String-based references.

Business-critical JSON relationships.

---

# Referential Integrity

The database should prevent invalid states whenever practical.

Use:

- FOREIGN KEY
- UNIQUE
- CHECK
- NOT NULL

Do not rely solely on application code.

---

# Normalization

Normalize by default.

Denormalize only when:

- A measurable performance problem exists.
- The trade-off is documented.
- The Reviewer approves the change.

---

# Multi-Tenant Policy

Applies only if multi-tenancy is a documented decision in DECISIONS.md.

Do not assume the product is multi-tenant. Do not assume it is single-tenant either. Check first.

When the product is multi-tenant:

Every customer-owned table must explicitly belong to a tenant.

The tenant key is defined in ENGINEERING/DATABASE.md. Use that name, do not invent one.

Never allow data that cannot be associated with a tenant unless it is intentionally global and documented as such.

---

# Tenant Isolation

Applies only when the product is multi-tenant.

Every query must respect tenant boundaries.

Never expose cross-tenant data.

Enforce isolation at the database layer when the engine supports it (for example Row-Level Security in PostgreSQL).

Application filtering alone is not sufficient for high-risk data.

---

# Auditability

Important business actions should be traceable.

Consider recording:

- created_at
- updated_at
- created_by
- updated_by

For financial or security-sensitive entities also consider immutable audit logs.

---

# Soft Delete

Soft delete is not the default.

Use soft delete only when business value exists.

Examples:

- Customer recovery.
- Legal retention.
- Historical reporting.

Otherwise prefer real deletion.

---

# Financial Records

Financial data should be immutable whenever possible.

Never overwrite historical transactions.

Instead:

Create correction entries.

Maintain a complete audit trail.

Financial history must remain explainable.

---

# Migrations

Every schema change requires a migration.

Manual production changes are forbidden.

Every migration should be:

Repeatable.

Versioned.

Reviewable.

Reversible whenever practical.

---

# Safe Migration Strategy

Prefer:

Add

↓

Migrate

↓

Validate

↓

Remove

Avoid breaking migrations.

Never combine destructive schema changes with unrelated modifications.

---

# Backward Compatibility

Assume older application versions may temporarily exist.

Prefer additive changes.

Avoid immediate destructive changes.

---

# Indexing

Indexes should exist because of measured query patterns.

Before adding an index ask:

Which query becomes faster?

What is the write cost?

What storage does it consume?

Avoid indexing every foreign key blindly.

---

# Query Design

Queries should:

Return only required data.

Avoid N+1 patterns.

Avoid unnecessary joins.

Avoid loading entire datasets.

Performance begins with query design.

---

# Transactions

Use transactions when consistency matters.

Examples:

Payments.

Multi-step state changes.

Permission updates.

Inventory changes.

If partial success creates invalid business state, use a transaction.

---

# Concurrency

Assume concurrent users.

Design for:

Race conditions.

Duplicate requests.

Retry behaviour.

Concurrent updates.

Never assume sequential execution.

---

# Time

Always store timestamps in UTC.

Convert only in presentation layers.

Avoid local timezone storage.

---

# Sensitive Data

Classify sensitive information.

Examples:

Passwords.

Tokens.

Personal information.

Financial information.

Sensitive data should be:

Encrypted when appropriate.

Access-controlled.

Minimized.

---

# Backups

Every production database requires:

Backup strategy.

Restore strategy.

Recovery testing.

A backup that has never been restored is not a backup.

---

# Data Lifecycle

Every entity should define:

Creation.

Modification.

Retention.

Archiving.

Deletion.

Avoid indefinite storage without business justification.

---

# Documentation

Document:

Schema decisions.

Important constraints.

Migration strategies.

Performance assumptions.

Future engineers should understand why the schema exists.

---

# Database Review Checklist

Before approving:

✓ Business concepts are represented correctly.

✓ Relationships are explicit.

✓ Constraints protect integrity.

✓ Tenant isolation exists, if the product is multi-tenant.

✓ Migrations are safe.

✓ Indexes are justified.

✓ Queries are efficient.

✓ Sensitive data is protected.

✓ Documentation is updated.

---

# Forbidden Behaviours

Never:

- Disable constraints for convenience.
- Store business relationships as JSON.
- Skip migrations.
- Modify production manually.
- Ignore tenant isolation.
- Optimize before measuring.
- Overwrite historical financial records.
- Keep undocumented schema changes.

---

# Final Principle

Software can be rewritten.

Business data cannot.

Protect the data above everything else.