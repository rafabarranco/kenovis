<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

customer-onboarding.md

Customer Onboarding Automation System

Version: 1.0
---
Purpose

Define the automated onboarding process that converts a new signup into an active customer.

The goal is to reduce friction and accelerate the first value moment.
---
Philosophy

Follow:

Do not teach the product.

Help users achieve their first success.

---
Activation Definition

A customer is activated when they have: installed the Kenovis CLI in a real repository, completed /init-project with real (non-placeholder) answers, and successfully run at least one framework workflow (/feature, /bug, or /review) end to end. See PRODUCT/ROADMAP.md → MVP Success Metrics.
---
Time-To-Value Objective

From `npx kenovis install` to a completed /init-project run: target under 15 minutes for a solo developer. Not yet measured against real usage.
---
Customer Journey

Discover (GitHub, word of mouth among developers using agentic tooling) → Install (CLI scaffolds the Framework layer into the repository) → Init (customer runs /init-project, answers real business questions — no invented placeholder content survives) → First Workflow (customer runs /feature or /bug on a real piece of work) → Value (framework catches an undocumented decision or policy gap plain AI-assisted coding would have missed) → Sync (customer pulls the next Framework Release).
---
Onboarding Communication

None in v1 — there is no backend and no customer email/account to message. Guidance happens inline, printed by the CLI itself (e.g. after install: "next: run /init-project"). Revisit if a hosted layer with accounts is ever built (PRODUCT/ROADMAP.md Phase 4).
---
Automation Tools

None in v1 — no auth provider, database, workflow tool or communication provider exists (DECISIONS.md DECISION-013). Onboarding automation for v1 is documentation plus CLI inline prompts only.
---
Automated Triggers

Deferred — v1 has no backend to run triggers from. The CLI can print contextual next-step reminders inline (e.g. post-install, post-sync) as a substitute.
---
Onboarding Checklist

1. Run CLI install command.
2. Run /init-project and answer with real business facts (no placeholders).
3. Run one real workflow (/feature or /bug) against actual work.
4. Sync the next Framework Release when available.
---
Self-Service Philosophy

The product should explain itself.

Avoid dependency on human support.
---
Support Escalation

When automation detects:

- Repeated failures.
- User confusion.
- High-value customer.

Create support task.
---
Metrics

Measure:
---
Activation Rate

Formula:

Activated accounts

/

Registered accounts

---
Time To Value

Measure:

Time between:

Registration

↓

First successful workflow

---
Completion Rate

Measure:

Percentage completing onboarding steps.
---
Retention Impact

Compare:

Users completing onboarding

vs

Users abandoning onboarding.
---
AI Assistance

AI can help with:

- Personalized onboarding messages.
- User behavior analysis.
- Detecting activation blockers.
- Generating help content.
---
Anti-Patterns

Avoid:
---
Long tutorials

Users do not want training.
---
Feature tours

Users care about solving problems.
---
Asking too much information

Collect only what is necessary.
---
Final Principle

The best onboarding is not teaching users how to use the product.

It is helping them achieve success before they even realize they are learning it.
