DATABASE.md

Database Architecture

Version: 1.0
---
Purpose

This document defines the database architecture, conventions and rules for the platform.

The database is considered a critical business component.

It must guarantee:

- Data integrity.
- Organization isolation.
- Historical preservation.
- Financial accuracy.
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

Primary database:

PostgreSQL

Initial platform:

Supabase PostgreSQL

---
Core Database Principles

Principle 1

Every business entity belongs to an organization.

Default:

organization_id NOT NULL

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

Examples:

Good:

organizations

members

events

attendance_records

Bad:

Organization

MemberData

EventTable

---
Columns

Use:

snake_case

Examples:

created_at

updated_at

organization_id

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

Examples:

- Members.
- Groups.
- Events.
---
Organization Table

Purpose

Root tenant entity.
---
Schema Concept

organizations

id

name

logo_url

status

created_at

updated_at

---
Rules

An organization:

- Owns all business data.
- Defines the security boundary.
---
User Table

Purpose

Authenticated application users.
---
Concept:

users

id

email

created_at

---
Important:

A User is not the same as a Member.

A user can manage organizations.

A member represents participation.
---
Organization Membership

Purpose

Connect users with organizations.
---
Schema:

organization_memberships

id

organization_id

user_id

role

created_at

---
Roles:

Initial:

owner

admin

manager

member

---
Members Table

Purpose

People belonging to organizations.
---
Schema:

members

id

organization_id

name

email

phone

status

created_at

updated_at

deleted_at

---
Rules:

- Must belong to organization.
- Historical references must remain.
---
Groups Table

Purpose

Organizational subdivisions.
---
Schema:

groups

id

organization_id

name

created_at

updated_at

---
Group Members Table

Purpose

Many-to-many relationship.
---
Schema:

group_members

id

group_id

member_id

created_at

---
Rules:

A member:

- Can belong to multiple groups.

A group:

- Can contain multiple members.
---
Events Table

Purpose

Activities organized by the organization.
---
Schema:

events

id

organization_id

title

description

location

starts_at

ends_at

status

created_at

updated_at

---
Status:

draft

published

completed

cancelled

---
Event Participants Table

Purpose

Expected participation.
---
Schema:

event_participants

id

event_id

member_id

status

created_at

updated_at

---
Status:

pending

confirmed

rejected

cancelled

---
Constraints:

Unique:

event_id + member_id

A member cannot have duplicate participation.
---
Attendance Records Table

Purpose

Historical attendance.
---
Schema:

attendance_records

id

organization_id

event_id

member_id

status

created_at

updated_at

---
Status:

present

absent

excused

---
Constraints:

Unique:

event_id + member_id

---
Financial Operations Table

Purpose

Represent money movements.
---
Schema:

financial_operations

id

organization_id

event_id

type

amount

currency

status

created_at

updated_at

---
Type:

income

expense

distribution

---
Status:

draft

confirmed

cancelled

---
Financial Distribution Table

Purpose

Store money allocation results.
---
Schema:

financial_distributions

id

financial_operation_id

member_id

amount

status

created_at

---
Example:

Concert payment:

Total:

3000 €

Members:

30

Distribution:

100 € each

---
Audit Log Table

Purpose

Track important changes.
---
Schema:

audit_logs

id

organization_id

user_id

action

entity_type

entity_id

metadata

created_at

---
Examples:

MEMBER_CREATED

EVENT_UPDATED

PAYMENT_CONFIRMED

---
Indexing Strategy

Important indexes:

Organization filtering

All business tables:

organization_id

---
Events

Common queries:

organization_id

starts_at

---
Attendance

Common queries:

event_id

member_id

---
Financial Operations

Common queries:

organization_id

event_id

---
Row Level Security (RLS)

Supabase RLS is mandatory.

Every business table must enforce:

User can only access authorized organizations.

---
RLS Principle

Frontend security is not enough.

The database must protect itself.
---
Example Logic

Conceptually:

Allow SELECT

IF user belongs to organization_id

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

Development environments should include:

- Example organization.
- Example members.
- Example events.
- Example financial operations.
---
Database Testing

Critical tests:

Tenant Isolation

Verify:

Organization A cannot see Organization B.
---
Financial Accuracy

Verify:

Distribution calculations.
---
Historical Preservation

Verify:

Deleted members do not remove history.
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

Possible future additions:

- Payment provider integration.
- Advanced reporting.
- Event analytics.
- Data warehouse.

Do not design these prematurely.
---
AI Agent Database Rules

Before changing schema:

Ask:

1. What business problem requires this?
2. Does an existing entity already represent it?
3. Does it respect organization isolation?
4. Does it preserve historical data?
5. Are migrations required?
---
Final Principle

The database is not storage.

The database is the memory of the company.

Protect it.