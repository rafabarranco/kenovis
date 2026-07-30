<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

DOMAIN_MODEL.md

Domain Model

Version: 1.0
---
Purpose

This document defines the core business domain concepts of the platform.

The objective is to establish a shared language between:

- Product.
- Engineering.
- Design.
- AI Agents.
- Future team members.

The domain model is the foundation of the entire system.
---
Domain Overview

The platform manages organizations that coordinate:

- People.
- Groups.
- Activities.
- Participation.
- Attendance.
- Financial operations.

The core domain can be represented as:

Organization

    |
    |
    +---- Members

    |
    |
    +---- Groups

    |
    |
    +---- Events

              |
              |
              +---- Participation

              |
              |
              +---- Attendance

              |
              |
              +---- Financial Operations

---
Domain Philosophy

The product must be organization-centric.

Everything exists inside the context of an organization.

The organization is the primary boundary.

The system must never assume:

- A person exists globally without context.
- An event exists without an organization.
- Financial operations exist independently.
---
Core Entities
---
Organization

Definition

An Organization represents a group of people operating together under a common purpose.

Examples:

- Music band.
- Music school.
- Sports club.
- Cultural association.
---
Responsibilities

An Organization:

- Owns members.
- Owns groups.
- Owns events.
- Owns financial operations.
- Defines permissions.
---
Attributes

Conceptually:

Organization

id

name

logo

status

created_at

updated_at

---
Business Rules

- Every operational entity belongs to an organization.
- Organizations are isolated from each other.
- Users can only access authorized organizations.
---
User

Definition

A User represents an authenticated person using the application.

A User is not necessarily a Member.
---
Examples

A user can be:

- Administrator.
- Director.
- Teacher.
- Member.
---
Responsibilities

A User:

- Authenticates.
- Accesses organizations.
- Performs actions according to permissions.
---
Relationship

User

belongs to

Organization(s)

---
Member

Definition

A Member represents a person participating in an organization.

A member is the main human entity inside the domain.
---
Examples

Music:

- Musician.
- Student.

Sports:

- Player.

Education:

- Student.
---
Responsibilities

A Member:

- Participates in groups.
- Participates in events.
- Has attendance records.
- May receive financial distributions.
---
Attributes

Conceptually:

Member

id

organization_id

name

email

phone

status

created_at

---
Business Rules

- A member belongs to an organization.
- A member can belong to multiple groups.
- A member can participate in multiple events.
- Historical records must remain after deactivation.
---
Group

Definition

A Group represents a logical collection of members.

Groups organize people according to operational needs.
---
Examples

Music:

- Main band.
- Youth band.
- Instrument section.

Education:

- Class.
- Level.

Sports:

- Team.
- Category.
---
Responsibilities

Groups:

- Organize members.
- Simplify event assignment.
- Provide filtering.
---
Relationships

Organization

has many

Groups


Group

has many

Members

---
Business Rules

- Groups belong to organizations.
- Members can belong to multiple groups.
- Deleting a group must not delete members.
---
Event

Definition

An Event represents an activity performed by an organization.

Events are intentionally generic.
---
Examples

- Rehearsal.
- Concert.
- Class.
- Match.
- Meeting.
---
Responsibilities

Events:

- Schedule activities.
- Define participants.
- Track attendance.
- Generate financial operations.
---
Attributes

Conceptually:

Event

id

organization_id

title

date

location

status

created_at

---
Business Rules

- Events belong to organizations.
- Events can have participants.
- Events can have attendance.
- Events may have financial operations.
---
Participation

Definition

Participation represents the expected involvement of a member in an event.

It answers:

"Is this person expected to attend?"
---
Difference Between Participation and Attendance

Participation:

Future expectation.

Example:

"John is invited to the concert."

Attendance:

Historical fact.

Example:

"John attended the concert."
---
States

Pending

Confirmed

Rejected

Cancelled

---
Relationship

Member

+

Event

=

Participation

---
Attendance

Definition

Attendance represents the actual presence of a member at an event.

It answers:

"Did this person actually attend?"
---
States

Present

Absent

Excused

---
Relationship

Member

+

Event

=

Attendance Record

---
Business Rules

- One member has one attendance record per event.
- Attendance belongs to an organization.
- Attendance creates historical data.
---
Financial Operation

Definition

Represents a money-related activity.

It can represent:

- Income.
- Expense.
- Distribution.
---
Examples

Income:

- Concert payment.
- Event revenue.

Expense:

- Transport.
- Equipment.

Distribution:

- Money shared among participants.
---
Attributes

Conceptually:

FinancialOperation

id

organization_id

event_id

type

amount

status

created_at

---
Financial Distribution

Definition

Represents the calculation and allocation of money between participants.
---
Example

Event:

Concert

Total income:

3000 €

Participants:

30 members

Calculation:

3000 / 30 = 100 €

Each participant receives:

100 €

---
Business Rules

The system must always preserve:

- Original amount.
- Participants included.
- Calculation method.
- Final distribution.

Financial calculations must be auditable.
---
Permission Model

Permissions are organization-based.

Examples:

Owner

Full control.
---
Administrator

Manage organization.
---
Manager

Manage daily operations.
---
Member

View and participate.
---
Domain Relationships Summary

Organization

    |
    +-- Users

    |
    +-- Members

    |
    +-- Groups

    |
    +-- Events

            |
            +-- Participation

            |
            +-- Attendance

            |
            +-- Financial Operations

---
Domain Invariants

These rules must always be true.
---
Organization Isolation

Data must never cross organization boundaries.
---
Historical Integrity

Past events and financial records must remain consistent.
---
Financial Transparency

Every calculation must be explainable.
---
Generic Terminology

The domain must avoid vertical-specific naming.

Avoid:

Musician
Concert
BandMember

Prefer:

Member
Event
Group
Organization

---
Domain Evolution Rules

The domain should evolve carefully.

Adding a new concept requires:

1. Clear user problem.
2. Business justification.
3. Impact analysis.
4. Documentation update.
---
AI Agent Instructions

Before implementing any feature:

1. Identify affected domain entities.
2. Check existing business rules.
3. Avoid creating duplicate concepts.
4. Preserve domain consistency.

The domain model is the source of truth.
---
Final Principle

The code should represent the business.

The business should not adapt to the code.