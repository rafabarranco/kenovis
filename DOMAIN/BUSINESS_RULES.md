<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

BUSINESS_RULES.md

Business Rules

Version: 1.0
---
Purpose

This document defines the non-negotiable business rules of the platform.

These rules represent the real-world constraints that the software must enforce.

Business rules are more important than implementation details.

Any technical decision that violates these rules is incorrect.
---
Core Principle

The platform manages real organizations with real people, real activities and real money.

Therefore:

- Data integrity is critical.
- Historical information must be preserved.
- Financial calculations must be transparent.
- Organization boundaries must always be respected.
---
Organization Rules
---
ORG-001

Every operational entity belongs to an organization

Entities affected:

- Member.
- Group.
- Event.
- Attendance.
- Financial Operation.

Rule:

Every business entity must have a clear organization ownership.
---
Example

Valid:

Organization A

Member John
Event Concert
Attendance Record

Invalid:

Member John

(no organization)

---
ORG-002

Organizations are isolated

A user belonging to Organization A must never access data from Organization B.
---
Forbidden scenarios

A user cannot:

- View members from another organization.
- View events from another organization.
- View financial information from another organization.
---
ORG-003

Historical data belongs to the organization where it was created

If a member leaves an organization:

Historical records remain.

Example:

A member leaves in 2027.

The organization must still see:

- Previous attendance.
- Previous events.
- Previous payments.
---
Member Rules
---
MEMBER-001

Members cannot exist without an organization

A member must always belong to an organization.
---
MEMBER-002

Member deletion must preserve history

Members should generally be archived, not physically deleted.
---
Reason

Historical records depend on members.

Deleting a member can destroy:

- Attendance history.
- Financial records.
- Event history.
---
MEMBER-003

Members can belong to multiple groups

Example:

A person can belong to:

- Main group.
- Training group.
- Special project group.
---
Group Rules
---
GROUP-001

Groups belong to one organization

A group cannot contain members from different organizations.
---
GROUP-002

Removing a group does not remove members

A group is an organizational structure.

Members exist independently.
---
Event Rules
---
EVENT-001

Events belong to one organization

Every event must have an owner organization.
---
EVENT-002

Events cannot exist without date information

Every event requires:

- Date.
- Time.

Optional:

- Location.
- Description.
---
EVENT-003

Events have lifecycle states

Initial states:

Draft

Published

Completed

Cancelled

---
State Rules

Draft:

- Visible only to managers.
- Can be modified.

Published:

- Visible to participants.
- Attendance can be collected.

Completed:

- Historical.
- Attendance finalized.

Cancelled:

- Remains stored.
- Cannot generate normal attendance.
---
Participation Rules
---
PARTICIPATION-001

A member can only have one participation record per event

Invalid:

John
Concert
Confirmed

John
Concert
Rejected

---
Valid:

John
Concert
Confirmed

---
PARTICIPATION-002

Participation represents intention, not reality

Participation answers:

"Will this person attend?"

It does not confirm physical presence.
---
Attendance Rules
---
ATTENDANCE-001

Attendance belongs to an event and a member

Attendance cannot exist independently.
---
ATTENDANCE-002

A member can only have one attendance status per event

Invalid:

John
Concert
Present

John
Concert
Absent

---
Valid:

John
Concert
Present

---
ATTENDANCE-003

Attendance is historical information

Once an event is completed:

Attendance should not change without explicit permission.
---
ATTENDANCE-004

Attendance statuses

Allowed:

Present

Absent

Excused

---
Financial Rules
---
FIN-001

Financial operations must belong to an organization

No financial data can exist outside an organization.
---
FIN-002

Financial calculations must be transparent

Every distribution must explain:

- Original amount.
- Participants included.
- Calculation method.
- Final amounts.
---
FIN-003

Distribution calculations must be deterministic

Given the same inputs:

The result must always be the same.
---
Example

Input:

Total income:

3000 €

Participants:

30

Calculation:

3000 € / 30

Result:

100 € per participant

---
FIN-004

Financial history cannot be silently modified

Changes must be:

- Logged.
- Traceable.
- Authorized.
---
FIN-005

Distribution participants must be explicit

The system must never assume participants.

A distribution must define:

Included participants:

- Member A
- Member B
- Member C

---
Permission Rules
---
PERMISSION-001

Every action requires authorization

The system must validate:

- Who is performing the action.
- Which organization they belong to.
- Whether they have permission.
---
PERMISSION-002

Roles have different responsibilities

Example:

Owner:

- Full access.

Administrator:

- Organization management.

Manager:

- Operational management.

Member:

- Personal participation.
---
PERMISSION-003

Frontend permissions are not security

The backend must always enforce permissions.

The UI only improves user experience.
---
Data Integrity Rules
---
DATA-001

Never lose historical information

Prefer:

Archive

over:

Delete

---
DATA-002

Important actions should be traceable

Future audit capabilities require knowing:

- Who performed an action.
- When.
- What changed.
---
DATA-003

No duplicated business concepts

Before creating a new entity ask:

"Does this already exist under another name?"
---
Notification Rules
---
NOTIFY-001

Notifications are secondary.

The system of record is the application.

Do not make WhatsApp or email the source of truth.
---
Payment Processing Rules

Future payment features must consider:

- Transaction security.
- Payment status.
- Refunds.
- Failed payments.
- Audit history.
---
Multi-Tenant Rules
---
TENANT-001

Every query must respect organization boundaries.
---
TENANT-002

No global queries over business data unless explicitly justified.
---
TENANT-003

Tests must verify tenant isolation.
---
AI Agent Implementation Rules

Before implementing any business functionality:

Check:

1. Which business rules apply?
2. Which entities are affected?
3. Which permissions are required?
4. Which historical data could be impacted?

Never implement only the happy path.
---
Edge Case Thinking

Always consider:

- Empty organizations.
- Deleted members.
- Cancelled events.
- Duplicate actions.
- Permission changes.
- Partial failures.
- Historical records.
---
Final Principle

Business rules are the contract between the company and the customer.

Breaking them means breaking trust.