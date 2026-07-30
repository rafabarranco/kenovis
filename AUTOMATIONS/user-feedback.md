user-feedback.md

User Feedback Automation System

Version: 1.0
---
Purpose

Define the process to collect, analyze and transform user feedback into product decisions.

The objective is not to collect requests.

The objective is to discover valuable problems.
---
Philosophy

Follow:

Listen to users.

Understand problems.

Prioritize objectively.

Build intentionally.

---
Feedback Sources

The company can receive feedback from:

- In-app feedback.
- Customer conversations.
- Support messages.
- Interviews.
- Emails.
- WhatsApp conversations.
- Sales conversations.
---
Feedback Principle

A user request is not automatically a feature request.

Example:

User says:

"Add WhatsApp integration."

Possible underlying problem:

"I need members to know about events."

The problem may have multiple solutions.
---
Feedback Pipeline

The process:

Collect

↓

Classify

↓

Analyze

↓

Prioritize

↓

Implement

↓

Measure impact

---
Step 1

Collect Feedback

Every feedback item should capture:

User

Organization

Date

Context

Problem description

Requested solution

Frequency

Impact

---
Step 2

Classify Feedback

Every item belongs to one category.
---
Bug

Something does not work as expected.

Example:

"Attendance cannot be saved."

Priority:

Usually high.
---
Usability Issue

The feature works but is confusing.

Example:

"I cannot find where to create events."

Priority:

Depends on frequency.
---
Feature Request

A user proposes a solution.

Example:

"Add calendar integration."

Priority:

Requires analysis.
---
Product Insight

A discovered user behavior or problem.

Example:

"Directors spend 30 minutes every week preparing attendance."

High value.
---
Step 3

Analyze Feedback

For every important item answer:
---
Problem

What problem exists?
---
User

Who experiences it?
---
Frequency

How often happens?
---
Impact

What happens if solved?
---
Current Alternative

How is it solved today?
---
Strategic Alignment

Does it support the company direction?
---
Step 4

Prioritization

Use:

Priority Score =

Pain × Frequency × Strategic Value

/

Implementation Cost

---
High Priority

Characteristics:

- Frequent.
- Painful.
- Affects many organizations.
- Supports core workflows.
---
Low Priority

Characteristics:

- Rare.
- Cosmetic.
- Requested by one user.
- Expensive.
---
Feedback Database

Recommended structure:

feedback_items

id

organization_id

user_id

category

description

status

priority

created_at

---
Feedback Status

Possible states:

New

Analyzed

Planned

In Progress

Completed

Rejected

---
Automation Opportunities
---
Automation 1

New Feedback Notification

Trigger:

New feedback submitted.

Action:

Create item in feedback system.

Notify product team.
---
Automation 2

Weekly Feedback Review

Trigger:

Every week.

Action:

Generate summary:

- New problems.
- Most common requests.
- Customer sentiment.
---
Automation 3

Feature Completion Follow-up

Trigger:

Feature released.

Action:

Contact users who requested it.

Measure:

- Satisfaction.
- Adoption.
- Impact.
---
Customer Feedback Loop

The loop:

User problem

↓

Product improvement

↓

User validation

↓

More trust

↓

More adoption

---
AI Assistance

AI can help with:

- Categorizing feedback.
- Finding patterns.
- Summarizing conversations.
- Detecting repeated problems.
- Generating reports.
---
AI Limitations

AI should not decide alone:

- Product priorities.
- Strategic direction.
- Pricing decisions.

Human judgment is required.
---
Tools Integration

Possible tools:

Communication

- WhatsApp.
- Email.

Database

- Supabase.

Automation

- Zapier.
- Make.

Documentation

- Notion.
- Markdown repository.
---
First 100 Customers Strategy

For early customers:

Every important interaction should be captured.

Track:

- Why they joined.
- Why they stay.
- Why they leave.
- What blocks adoption.
---
Metrics

Track:

Feedback Volume

How much feedback is received.
---
Resolution Time

How quickly issues are addressed.
---
Feature Adoption

Whether improvements are used.
---
Customer Satisfaction

Whether users feel improvement.
---
Anti-Pattern

Avoid:

User asks

↓

Developer builds

↓

No measurement

---
Final Principle

Feedback is not a roadmap.

Feedback is information that helps build the right roadmap.