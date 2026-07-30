# Feature Development Workflow

Version: 2.0

---

# Purpose

Transform a product requirement into a complete feature implementation following the product and engineering process.

This workflow converts a feature idea into a structured development process.

The objective is not to only write code.

The objective is to deliver a valuable, maintainable and validated product capability.

---

# Trigger

Execute when:

- Developing a new feature.
- Implementing a planned product capability.
- Starting work from a feature request.
- Continuing development from the roadmap.

Command:

```
/feature
```

or:

```
Implement feature
```

---

# Core Principle

A feature is not a development task.

A feature is a product capability that requires understanding, planning, design, implementation and validation.

---

# Workflow

Follow these phases.

---

# Phase 1 - Bootstrap Project Context

Execute:

```
AI/commands/bootstrap.md
```

Load:

- Product vision.
- Roadmap.
- Features.
- Domain model.
- Business rules.
- Architecture.
- Engineering policies.

---

# Phase 2 - Understand Feature Definition

Review:

```
PRODUCT/FEATURES.md
```

Identify:

- Feature objective.
- User problem.
- Business value.
- User value.
- Acceptance criteria.
- Dependencies.

Do not start implementation without a clear understanding of the feature.

---

# Phase 3 - Activate Product Agents

Activate:

```
product-manager
cto
```

Optional depending on feature scope:

```
designer
frontend
backend
database
security
```

---

# Phase 4 - Product Analysis

Product Manager evaluates:

## User Problem

Define:

- What problem are we solving?
- Who has this problem?
- Why does this matter?

---

## User Value

Define:

- Expected user benefit.
- User experience improvement.
- Success criteria.

---

## Business Value

Define:

- Why the product needs this feature.
- Expected business impact.
- Strategic alignment.

---

# Phase 5 - Technical Analysis

CTO evaluates:

- Architecture impact.
- Complexity.
- Dependencies.
- Risks.
- Required technical decisions.

Review:

```
ENGINEERING/ARCHITECTURE.md
ENGINEERING/DATABASE.md
ENGINEERING/SECURITY.md
```

---

# Phase 6 - Create Feature Plan

Generate:

```
AI/templates/feature-plan.md
```

Include:

- Objective.
- User problem.
- Scope.
- Out of scope.
- User stories.
- Technical approach.
- Implementation steps.
- Risks.
- Acceptance criteria.

---

# Phase 7 - Architecture Decisions

If required:

Execute:

```
AI/commands/architect.md
```

Create ADR using:

```
AI/templates/adr.md
```

Document:

- Context.
- Decision.
- Alternatives.
- Consequences.

---

# Phase 8 - Implementation Preparation

Define:

Affected areas:

```
apps/

packages/

src/

DATABASE

API

DOCUMENTATION
```

Identify:

- Files to modify.
- New components.
- New services.
- Database changes.
- API changes.
- Testing requirements.

---

# Phase 9 - Execute Implementation

Follow:

```
AI/policies/coding.md
AI/policies/testing.md
AI/policies/documentation.md
```

Implementation order:

```
Database

Backend

Frontend

Integration

Tests
```

Rules:

- Follow existing conventions.
- Keep changes focused.
- Avoid unnecessary refactoring.
- Preserve system stability.

---

# Phase 10 - Quality Validation

Execute:

```
AI/commands/review.md
```

Validate:

- Requirements completed.
- Tests passing.
- Architecture consistency.
- Security considerations.
- Code quality.
- Maintainability.

---

# Phase 11 - Documentation Update

Update:

```
PRODUCT/

DOMAIN/

ENGINEERING/

AI/memory/learnings.md
```

when knowledge changes.

Document:

- New capabilities.
- New rules.
- Technical decisions.
- Lessons learned.

---

# Phase 12 - Feature Completion

Confirm:

- Feature implemented.
- Acceptance criteria satisfied.
- Tests completed.
- Review approved.
- Documentation updated.

Update:

```
PRODUCT/FEATURES.md
```

---

# Decision Rules

Always:

- Understand the problem before implementing.
- Validate user value.
- Respect architecture.
- Follow engineering policies.
- Keep documentation synchronized.

Never:

- Implement unclear requirements.
- Skip product analysis.
- Ignore business rules.
- Introduce undocumented behavior.
- Modify architecture casually.

---

# Final Principle

A feature is complete when the user value is delivered.

Code is only one part of the solution.
```