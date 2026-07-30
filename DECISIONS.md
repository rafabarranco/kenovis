# DECISIONS.md

Company Decision Log

Version: 2.0

Last updated: 2026

---

# Purpose

This document records important decisions that shape Kenovis.

The objective is to preserve:

- Context.
- Reasoning.
- Alternatives considered.
- Trade-offs.
- Consequences.

Future decisions should consider previous decisions.

A decision without context is just a preference.

A documented decision becomes organizational knowledge.

---

# Decision Format

Every decision should follow this structure:

---

## DECISION-ID

## Title

Date:

YYYY-MM-DD

Status:

Proposed | Accepted | Deprecated | Superseded | Rejected

Owner:

Person or role responsible for the decision.

Review Date:

When this decision should be reconsidered.

---

## Context

Why this decision was necessary.

What problem or opportunity existed.

---

## Options Considered

Alternative approaches evaluated.

---

## Decision

The chosen approach.

---

## Reason

Why this option was selected.

---

## Consequences

Positive:

Expected benefits.

Negative:

Expected trade-offs or risks.

---

# Decision Status

## Proposed

Under evaluation.

Not yet adopted.

---

## Accepted

Currently active.

---

## Deprecated

No longer recommended.

---

## Superseded

Replaced by another decision.

---

## Rejected

Considered but intentionally discarded.

---

# Strategic Decisions

Company-level decisions that affect Kenovis direction.

---

# DECISION-001

# AI-Native Company Operating Model

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

Kenovis starts with a very small human team.

Building a traditional software company would require significant investment in:

- Engineering.
- Product.
- Design.
- Operations.

The company wants to maximize execution speed while maintaining quality.

---

## Options Considered

### Option A

Build a traditional team immediately.

Advantages:

- More human expertise.
- Established processes.

Disadvantages:

- Higher cost.
- Slower initial execution.
- Larger operational requirements.

---

### Option B

Operate with an AI-native model.

Advantages:

- Lower initial cost.
- Faster experimentation.
- High execution leverage.
- Smaller initial team.

Disadvantages:

- Requires stronger review processes.
- Requires disciplined documentation.
- Requires human strategic ownership.

---

## Decision

Operate using an AI-native company model.

AI agents support:

- Software development.
- Product analysis.
- Documentation.
- Research.
- Marketing.
- Internal operations.

Strategic decisions remain human-controlled.

---

## Reason

The initial company stage requires:

- Speed.
- Validation.
- Low operational cost.
- Maximum learning.

AI provides leverage without replacing business judgment.

---

## Consequences

Positive:

- Faster iteration.
- Lower initial costs.
- Greater execution capacity.

Negative:

- Requires strong quality controls.
- Requires structured knowledge management.

---

# DECISION-002

# Initial Market Entry: Music Bands

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The company vision covers many organizations.

However, initial focus is required.

---

## Options Considered

### Option A

Build a generic organization management platform.

Advantages:

- Larger theoretical market.

Disadvantages:

- Weak positioning.
- Harder customer acquisition.
- Less domain understanding.

---

### Option B

Start with music bands.

Advantages:

- Clear operational problems.
- Direct access to users.
- Existing trust network.
- Faster validation.

Disadvantages:

- Smaller initial market.

---

## Decision

Start with music bands as the first vertical.

---

## Reason

Music bands contain the core operational pattern:

- Members.
- Groups.
- Events.
- Attendance.
- Financial workflows.

This provides a focused entry point while preserving future expansion.

---

## Consequences

Positive:

- Faster customer discovery.
- Better initial product understanding.

Negative:

- Requires future vertical expansion strategy.

---

# DECISION-003

# Operational Platform Positioning

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The initial customer problem appears to be attendance management.

However, attendance alone does not represent the full operational problem.

---

## Options Considered

### Option A

Build attendance-only software.

Advantages:

- Smaller MVP.
- Faster implementation.

Disadvantages:

- Limited differentiation.
- Lower perceived value.

---

### Option B

Build an operational management platform.

Including:

- Members.
- Groups.
- Events.
- Attendance.
- Financial workflows.

Advantages:

- Solves deeper problems.
- Higher business value.

Disadvantages:

- Larger scope.

---

## Decision

Position the product as an operational platform.

Not an attendance application.

---

## Reason

The real customer problem is operational chaos.

Attendance is only one workflow inside the larger problem.

---

## Consequences

Positive:

- Higher customer value.
- More monetization opportunities.

Negative:

- Requires disciplined scope control.

---

# DECISION-004

# Domain Neutral Architecture

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The initial market is music bands.

However, the long-term vision includes multiple organization types.

---

## Options Considered

### Option A

Build using music-specific concepts.

Examples:

- Musician.
- Band.
- Rehearsal.
- Concert.

Advantages:

- Faster initial development.

Disadvantages:

- Limits expansion.

---

### Option B

Use domain-neutral concepts.

Examples:

- Member.
- Organization.
- Group.
- Event.
- Attendance.

Advantages:

- Supports multiple industries.

Disadvantages:

- Requires stronger modelling discipline.

---

## Decision

Build the core domain using generic operational concepts.

---

## Reason

The company is solving operational problems, not music problems.

---

## Consequences

Positive:

- Easier future vertical expansion.
- Cleaner domain model.

Negative:

- Requires avoiding premature abstractions.

---

# DECISION-005

# Multi-Tenant Platform Model

Date:

2026-01-01

Status:

Accepted

Owner:

CTO

Review Date:

2027-01-01

---

## Context

The product serves independent organizations.

Each organization owns isolated operational data.

---

## Decision

Design the platform as multi-tenant from the beginning.

Every organization operates as an independent tenant.

---

## Reason

The business model requires supporting multiple customer organizations.

---

## Consequences

Positive:

- Scalable SaaS foundation.
- Clear customer boundaries.

Negative:

- Additional security and architecture complexity.

---

# Product Decisions

Product decisions that affect what Kenovis builds.

---

# DECISION-006

# Mobile Experience Priority

Date:

2026-01-01

Status:

Accepted

Owner:

Product

Review Date:

2027-01-01

---

## Context

Users interact with organizations during real activities:

- Events.
- Meetings.
- Activities.
- Daily coordination.

---

## Decision

Prioritize mobile user experience.

---

## Reason

Users need fast access in operational moments, not only desktop administration.

---

## Consequences

Positive:

- Lower user friction.
- Better adoption.

Negative:

- Desktop workflows require additional consideration.

---

# DECISION-007

# Revenue Model Exploration

Date:

2026-01-01

Status:

Proposed

Owner:

Founder

Review Date:

2027-01-01

---

## Context

Different organizations may perceive value differently.

The product includes workflows connected to operational value.

---

## Options Considered

### Option A

Subscription model.

---

### Option B

Transaction-based revenue.

---

### Option C

Hybrid model.

---

## Decision

Explore a hybrid model:

- Subscription.
- Premium features.
- Potential transaction-based revenue.

---

## Reason

Revenue should align with customer value creation.

---

## Consequences

Positive:

- Flexible monetization.

Negative:

- Requires validation.
- Requires legal analysis.

---

# DECISION-008

# Financial Workflow Boundary

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

The platform may manage money-related workflows.

Handling customer funds introduces additional complexity.

---

## Decision

Initially focus on:

- Calculations.
- Transparency.
- Financial records.

Avoid holding or moving customer funds.

---

## Reason

Holding money introduces:

- Legal complexity.
- Compliance requirements.
- Operational risk.

---

## Consequences

Positive:

- Faster launch.
- Lower risk.

Negative:

- Less control over financial workflows.

---

# Operating Decisions

Decisions about how the company operates.

---

# DECISION-009

# Documentation As Company Memory

Date:

2026-01-01

Status:

Accepted

Owner:

Founder

Review Date:

2027-01-01

---

## Context

AI agents require structured knowledge to operate consistently.

Company knowledge cannot exist only in conversations.

---

## Decision

Maintain a structured documentation system:

- COMPANY_OS.md.
- DECISIONS.md.
- PRODUCT/.
- DOMAIN/.
- ENGINEERING/.
- AI/.

---

## Reason

Documentation becomes the long-term memory of the company.

---

## Consequences

Positive:

- Better AI collaboration.
- Easier onboarding.
- More consistent decisions.

Negative:

- Requires maintenance discipline.

---

# Future Decisions

Future important decisions should be added here.

Examples:

- Technology choices.
- Pricing changes.
- Market expansion.
- Architecture changes.
- Business model changes.
- Partnership decisions.

---

# Final Principle

A decision without context is a preference.

A documented decision becomes company knowledge.