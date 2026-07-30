<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

FEATURES.md

Product Features Specification

Version: 1.0
---
Purpose

This document defines the product capabilities, feature specifications and functional expectations of the platform.

Every feature must have:

- A clear user problem.
- A defined business purpose.
- Explicit behavior.
- Acceptance criteria.

A feature is not complete because it exists technically.

A feature is complete when it solves the intended user problem.
---
Product Core

The platform is built around five fundamental concepts:

Organization
      |
      |
Members
      |
      |
Groups
      |
      |
Events
      |
      |
Attendance + Financial Operations

---
FEATURE-001

Organization Management

Purpose

Allow organizations to create and manage their workspace.
---
User Problem

Organizations need a central place where their members, activities and information are managed.
---
Primary Users

- Organization administrators.
- Managers.
---
Capabilities

The system must support:

- Create organization.
- Edit organization information.
- Manage administrators.
- Configure basic settings.
---
Required Information

Organization:

- Name.
- Logo.
- Contact information.
- Creation date.
- Status.
---
Business Rules

- Every user must belong to at least one organization.
- Organization data must always be isolated.
- An organization cannot access another organization's data.
---
Acceptance Criteria

The user can:

- Create an organization.
- View organization details.
- Update organization information.
- Manage administrators.
---
FEATURE-002

Member Management

Purpose

Replace spreadsheets and manual lists.
---
User Problem

Organizations lose time managing members across different tools.
---
Primary Users

- Administrators.
- Managers.
---
Capabilities

The system must support:

- Create members.
- Edit members.
- Archive members.
- Search members.
- Filter members.
---
Member Information

Basic information:

- Name.
- Email.
- Phone.
- Status.

Optional information:

- Role.
- Group.
- Notes.
- Custom fields.
---
Business Rules

- A member belongs to an organization.
- A member can belong to multiple groups.
- Removing a member should not delete historical data.
---
Acceptance Criteria

The user can:

- Add a new member.
- Find a member quickly.
- Update member information.
- See member history.
---
FEATURE-003

Groups

Purpose

Organize members according to operational structures.
---
User Problem

Organizations often have different teams, sections or categories.
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
Capabilities

The system must support:

- Create groups.
- Rename groups.
- Add members.
- Remove members.
- View group members.
---
Business Rules

- Groups belong to an organization.
- A group can contain multiple members.
- Members can belong to multiple groups.
---
FEATURE-004

Event Management

Purpose

Manage activities performed by the organization.
---
User Problem

Organizations need visibility over upcoming activities.
---
Event Types

The system must not hardcode event categories.

Examples:

- Rehearsal.
- Concert.
- Class.
- Competition.
- Meeting.
---
Capabilities

The system must support:

- Create event.
- Edit event.
- Cancel event.
- Duplicate event.
- View event history.
---
Event Information

Required:

- Title.
- Date.
- Time.
- Organization.

Optional:

- Location.
- Description.
- Groups involved.
- Participants.
---
Business Rules

- Events belong to one organization.
- Events can have multiple participants.
- Events can generate attendance records.
- Events can generate financial operations.
---
FEATURE-005

Event Participation

Purpose

Know who is expected to participate.
---
User Problem

Organizations need to know availability before activities happen.
---
Capabilities

The system supports:

- Assign participants.
- Request confirmation.
- Track responses.
---
Participation Status

Available states:

Pending

Confirmed

Rejected

Cancelled

---
Business Rules

A member can only have one participation status per event.
---
FEATURE-006

Attendance Management

Purpose

Track actual attendance.
---
User Problem

Organizations need reliable attendance records.
---
Attendance States

Present

Absent

Excused

---
Capabilities

The system supports:

- Mark attendance.
- Update attendance.
- View attendance history.
- Export attendance.
---
Business Rules

- Attendance belongs to an event.
- Attendance belongs to a member.
- Attendance cannot exist without a valid event.
---
FEATURE-007

Financial Operations

Purpose

Manage money generated or spent by organizational activities.
---
User Problem

Organizations currently manage money manually.
---
Financial Operation Types

Income:

Examples:

- Performance payment.
- Membership fee.
- Event revenue.

Expense:

Examples:

- Transport.
- Equipment.
- Materials.
---
Capabilities

The system supports:

- Create financial operation.
- Add amount.
- Associate with event.
- Track distribution.
---
FEATURE-008

Payment Distribution

Purpose

Automatically calculate how money is distributed among participants.
---
Example

Event:

Concert

Income:

3000 €

Participants:

30

Result:

100 € per participant
---
Capabilities

The system supports:

- Define total amount.
- Select participants.
- Calculate distribution.
- Review results.
- Confirm payments.
---
Business Rules

Distribution must be transparent.

Users must understand:

- Total amount.
- Number of participants.
- Individual amount.
- Calculation method.
---
FEATURE-009

Dashboard

Purpose

Provide operational visibility.
---
Initial Metrics

Show:

- Upcoming events.
- Total members.
- Attendance summary.
- Pending actions.
---
Future Metrics

Possible:

- Revenue.
- Participation trends.
- Member activity.
---
FEATURE-010

Export

Purpose

Allow organizations to keep control of their data.
---
Initial Support

Possible exports:

- Members.
- Attendance.
- Financial reports.
---
Features Explicitly Not Included Initially

The following are intentionally excluded:

Communication Platform

Reason:

Existing solutions already exist.
---
Chat

Reason:

Not core problem.
---
Accounting System

Reason:

Requires excessive complexity.
---
AI Assistant

Reason:

Future capability.

Not required for initial validation.
---
Marketplace

Reason:

Not part of initial value proposition.
---
Feature Development Rules

Before implementing any feature:

Answer:

Problem

What user problem does this solve?

User

Who needs this?

Frequency

How often does this happen?

Value

Why would someone care?

Complexity

What is the simplest implementation?
---
Definition of Done

A feature is complete when:

- User problem is solved.
- Business rules are implemented.
- Security is considered.
- Error states exist.
- Documentation is updated.
- Tests cover critical behavior.
---
Final Principle

Do not build features.

Build solutions to operational problems.