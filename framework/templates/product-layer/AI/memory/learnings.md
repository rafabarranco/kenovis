<!-- PROJECT-SPECIFIC: this product's own recorded knowledge; the rules around it are framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

AI Learnings

Version: 1.7
---
Scope

The rules in this document are framework-level and reusable.

The learnings recorded by the AI while working on a product are project-specific and must be cleared when starting a new product.
---
Purpose

This document stores accumulated organizational knowledge.

The purpose is to capture:

- Important lessons.
- Repeated mistakes.
- Successful patterns.
- Process improvements.
- Technical discoveries.
- Product insights.

This file represents the experience gained by the organization over time.
---
Learning Philosophy

A learning is not a record of what happened.

A learning explains:

What happened

↓

Why it happened

↓

What was learned

↓

What should change in the future

---
What Should Be Stored

Store learnings about:

- Architecture decisions.
- Development processes.
- Product discovery.
- User behaviour.
- Technical limitations.
- Failed approaches.
- Successful approaches.
---
What Should NOT Be Stored

Do not store:

- Temporary tasks.
- Daily progress updates.
- Completed tickets.
- Meeting notes.
- Personal opinions without evidence.
- Project-specific details that have no future value.
---
Learning Format

Every learning should follow this structure:

## Learning ID

Date:

Category:

Context:

Problem:

What happened:

Root cause:

Learning:

Future action:

`Future action:` either cites the id of a scheduled item or queued finding in `company-os/PRODUCT/ROADMAP.md`, or states that no work is implied. A future action naming work that exists nowhere else is a finding with no disposition wearing a different field name — see `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected".

---
Categories

Use one of these categories:

Architecture

Engineering

Product

Business

Security

Process

User Experience

Performance

Operations

---
Learning Examples

The two entries below are format examples, not real recorded learnings. Leave them, or replace them once this product has real ones. Every learning recorded from here on is project-specific and belongs to this product.

Example: Architecture

## Learning-001

Date:
2026-01-01

Category:
Architecture

Context:
Introducing a new external service.

Problem:
The service was integrated directly inside business logic.

What happened:
Changing the provider required modifying multiple modules.

Root cause:
The external dependency was not isolated.

Learning:
External services should be hidden behind interfaces.

Future action:
Use adapters for external integrations.

---
Example: Product

## Learning-002

Date:
2026-01-01

Category:
Product

Context:
Testing a new workflow.

Problem:
Users ignored a complex configuration screen.

What happened:
The feature adoption was lower than expected.

Root cause:
The workflow required too much setup before providing value.

Learning:
Users should reach the first valuable action as quickly as possible.

Future action:
Prioritize simple onboarding flows.

---
Learning Validation

Before adding a learning, verify:

✓ Is this based on a real experience?

✓ Does this change future behaviour?

✓ Can another project benefit from this?

✓ Is this more than a simple observation?

If the answer is no, do not store it.
---
Priority Levels

Each learning can have a priority:

Critical

Important

Useful

---
Critical

Must influence future decisions.

Examples:

- Security failures.
- Data loss prevention.
- Architecture mistakes.
---
Important

Should be considered regularly.

Examples:

- Development patterns.
- Product lessons.
---
Useful

Helpful but not mandatory.

Examples:

- Minor improvements.
- Optimizations.
---
Review Process

Periodically review learnings.

The AI should identify:

- Repeated problems.
- Patterns.
- Opportunities to improve policies.

If a learning becomes a permanent rule:

Move it to:

.kenovis/AI/policies/

If a learning becomes a naming rule:

Move it to:

company-os/AI/memory/conventions.md

If a learning becomes domain knowledge:

Move it to:

company-os/DOMAIN/

---
What "Move It" Means

"Move" is the whole instruction, and the half that is easy to skip is what happens to the entry afterwards.

A promotion is not done when the rule appears in a policy. It is done when the rule appears in the policy **and** the learning stops being the place that rule lives. Otherwise the same rule sits in two documents, one loaded per task and one loaded at session start, and the second keeps growing.

So a promoted learning closes:

1. The rule is written into the policy that enforces it, in that policy's own voice — a rule, not a story. The policy cites the learning id, so the reasoning is one hop away.
2. The entry moves verbatim to `company-os/AI/memory/LEARNINGS-ARCHIVE.md`. Create that file when the first learning closes, not before — an empty archive is noise.
3. One line stays here, naming what the learning established and which policy section now carries it.
4. Any finding the entry raised already has a disposition in `company-os/PRODUCT/ROADMAP.md` before the move. An entry holding the only copy of an unresolved finding is not ready to be archived.

Run this process when this file crosses the size threshold in `.kenovis/AI/policies/documentation.md` → "Document Lifecycle", and at every `/init-project` in a repurposed repository, before the previous product's learnings are deleted.

A learning that has not become a rule stays here. Most do not, and that is the normal outcome.

---
Evolution Rules

The AI should improve the organization over time.

When a recurring problem appears:

Do not only fix the issue.

Improve the system that allowed the issue.

Example:

Bad:

Fix bug.

Good:

Fix bug.

Understand why it happened.

Update policy.

Prevent future repetition.

---
Cross-Project Knowledge

The AI-OS may be reused across different products.

Therefore:

Store only reusable knowledge.

Avoid:

This product uses React.

Prefer:

Technology choices should be documented explicitly per project.

---
Relationship With Other Memory Files

conventions.md

Stores:

"What rules do we follow?"
---
glossary.md

Stores:

"What do concepts mean?"
---
learnings.md

Stores:

"What have we learned?"
---
Final Principle

A strong organization does not only accumulate code.

It accumulates experience.

This document is the mechanism through which the AI organization becomes better over time.
