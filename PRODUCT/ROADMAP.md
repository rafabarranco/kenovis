<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

ROADMAP.md

Product Roadmap

Version: 1.0
---
Purpose

This document defines the strategic product evolution of the platform.

It establishes:

- What we build.
- When we build it.
- Why we build it.
- What we deliberately avoid.

The roadmap exists to protect product focus.
---
Product Vision

[Restate the product vision from COMPANY_OS.md in roadmap terms — what the platform becomes once mature.]
---
Product Strategy

[Describe the phased go-to-market approach — e.g. land-and-expand, single-segment-first, platform-later. Name the phases and what each unlocks.]
---
Product Development Principles

Principle 1: Solve workflow problems

We do not build isolated features.

We build solutions to operational workflows.

Example:

Bad:

"Add [isolated feature]."

Good:

"[Reduce the time/friction of the actual workflow the user is trying to complete.]"
---
Principle 2: Build the minimum complete workflow

A feature is not complete when a screen exists.

A workflow is complete when the user can achieve their goal.

Example:

Not complete:

- [Single screen in isolation.]

Complete:

- [Full sequence of steps the user needs, start to finish.]
---
Principle 3: Avoid premature expansion

Do not build for future markets before winning the first market.

The first customer segment provides the learning foundation.
---
Product Phases
---
Phase 0 — Foundation

Objective

Create the company and product foundation.

Duration

[Estimate.]

Users

Internal.

Goal

Build the minimum architecture required to start validating.
---
Deliverables

Technical:

- Application foundation.
- Authentication.
- [Core domain entity from DOMAIN/DOMAIN_MODEL.md].
- Database foundation.
- User management.

Documentation:

- Domain model.
- Architecture.
- Development standards.
---
Success Criteria

[What must be true for Phase 0 to be considered done — e.g. the platform supports one real account end to end.]
---
Phase 1 — MVP

Objective

[State the core problem(s) this phase must prove the product solves.]

Target users

[The first customer segment named in COMPANY_OS.md.]
---
MVP Core Modules

[List the modules that make up the MVP, one per core domain entity. For each: purpose, capabilities, required information, business rules, acceptance criteria — see PRODUCT/FEATURES.md for the detailed spec format.]
---
MVP Non Goals

Do NOT build:

[List capabilities deliberately excluded from the MVP and why — this protects scope more than any list of what to build.]
---
MVP Success Metrics

The MVP is successful when:

Usage

[Target — e.g. N active accounts.]

Engagement

[What recurring action indicates real use.]

Retention

Users return without being reminded.

Value

Users report saving meaningful time.
---
Phase 2 — Product Market Fit

Objective

Become indispensable for [the target customer].
---
New Capabilities

[What gets added once the MVP is validated — deeper functionality on existing modules, not new verticals.]
---
Phase 2 Success Metrics

Target:

[Numeric target for active accounts/organizations.]

Metrics:

[The 3-5 numbers that indicate the product is becoming indispensable.]
---
Phase 3 — Expansion

Objective

Expand beyond the initial customer segment.
---
New Verticals

[Potential adjacent segments — see COMPANY_OS.md Long-Term Market Vision.]
---
Product Adaptation

The platform should support:

Different terminology.

Different workflows.

Different organization structures.

Without rewriting the core system.
---
Phase 4 — Platform

Objective

Become the operational infrastructure for the category.
---
Possible capabilities:

[Longer-horizon bets — integrations, API, automation, AI features — once the core is proven.]
---
Features Backlog Philosophy

Features are prioritized using:

Customer Pain

How painful is the problem?

Frequency

How often does it happen?

Business Impact

Does it improve retention or revenue?

Implementation Cost

How complex is it?

Priority formula:

Priority =
(Customer Pain × Frequency × Business Impact)
/
Implementation Cost

---
Features That Require Strong Validation

Before building:

- Social features.
- Chat.
- Marketplaces.
- Complex accounting.
- Public communities.
- AI features.
---
Product Metrics

The company tracks:

Acquisition

How organizations discover the product.

Activation

How quickly organizations reach first value.

Retention

Whether organizations continue using the product.

Revenue

Subscription and transaction revenue.

Engagement

Operational usage.
---
North Star Metric

[The single metric that best represents customers achieving real value through the product.]

Supporting metrics:

[2-4 metrics that feed the North Star metric.]
---
Final Product Principle

The roadmap is not a list of features.

It is a sequence of validated problems.

Build the smallest solution that creates undeniable value.
