# Architecture Decision Workflow

Version: 2.3

---

# Purpose

Define and validate technical architecture decisions before implementing changes that affect the system design.

This workflow ensures architectural decisions are intentional, documented and aligned with the product and engineering strategy.

The objective is not only to solve the current technical problem.

The objective is to maintain a scalable and consistent system.

---

# Trigger

Execute when:

- Introducing a new technical approach.
- Changing existing architecture.
- Adding a new system capability.
- Making decisions with long-term impact.

Command:

```
/architect
```

or:

```
Review architecture decision
```

---

# Core Principle

Architecture decisions are product decisions.

Every technical choice affects scalability, maintainability, cost and future development speed.

---

# Workflow

Follow these phases.

---

# Phase 1 - Bootstrap Project Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Load:

- Product vision.
- Domain model.
- Business rules.
- Current architecture.
- Engineering policies.

---

# Phase 2 - Identify Architecture Problem

Review:

```
company-os/ENGINEERING/ARCHITECTURE.md
```

Define:

- Current situation.
- Existing limitations.
- Technical problem.
- Expected outcome.

Do not propose solutions before understanding the problem.

---

# Phase 3 - Activate Architecture Agents

Activate:

```
cto
database
security
```

Optional depending on scope:

```
frontend
backend
```

---

# Phase 4 - Analyze Requirements

Evaluate:

## Business Impact

Determine:

- Why this decision is needed.
- Product impact.
- User impact.

---

## Technical Impact

Analyze:

- System components affected.
- Dependencies.
- Complexity.
- Maintenance impact.

---

## Constraints

Identify:

- Existing limitations.
- Infrastructure constraints.
- Security requirements.
- Performance requirements.

---

# Phase 5 - Evaluate Solutions

Compare possible approaches.

For each option analyze:

- Advantages.
- Disadvantages.
- Complexity.
- Risks.
- Long-term impact.

Select the solution that best balances:

- Business needs.
- Technical quality.
- Future scalability.

---

# Phase 6 - Create Architecture Decision Record

Record the ADR in:

```
company-os/DECISIONS.md
```

Shaped by:

```
.kenovis/AI/templates/adr.md
```

`company-os/DECISIONS.md` is the destination; the path above is the form that shapes what goes there. See company-os/DECISIONS.md DECISION-024.

Include:

- Context.
- Problem.
- Decision.
- Alternatives considered.
- Consequences.
- Implementation notes.

---

# Phase 7 - Update Architecture Documentation

Update:

```
company-os/ENGINEERING/ARCHITECTURE.md
```

when the decision changes:

- System structure.
- Technical patterns.
- Development conventions.
- Infrastructure.

---

# Phase 8 - Implementation Preparation

Define:

Affected areas:

```
CODE (the units listed in company-os/ENGINEERING/ARCHITECTURE.md)

DATABASE

API

INFRASTRUCTURE

DOCUMENTATION
```

Identify:

- Required changes.
- Migration strategy.
- Risks.
- Validation strategy.

---

# Phase 9 - Implementation Review

After implementation:

Execute:

```
.kenovis/AI/commands/review.md
```

Validate:

- Architecture consistency.
- Technical decision correctness.
- Security.
- Maintainability.

---

# Phase 10 - Knowledge Update

Update:

```
company-os/AI/memory/learnings.md
```

when new architectural knowledge is created.

Document:

- New patterns.
- Important decisions.
- Future considerations.

---

# Decision Rules

Always:

- Understand the problem before choosing a solution.
- Consider long-term impact.
- Document important decisions.
- Prefer simple and maintainable solutions.

Never:

- Introduce architecture changes without analysis.
- Choose solutions only for short-term convenience.
- Ignore existing system constraints.
- Leave architectural decisions undocumented.

---

# Final Principle

Good architecture enables future product growth.

Every decision should make the system stronger, clearer and easier to evolve.
