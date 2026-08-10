# Hotfix Workflow

Version: 2.2

---

# Purpose

Resolve critical production issues through a fast and controlled emergency process.

This workflow ensures urgent problems are fixed while minimizing risk to the system.

The objective is not only to restore functionality.

The objective is to recover system stability safely.

---

# Trigger

Execute when:

- A critical production issue occurs.
- Users are blocked by a severe defect.
- A security issue requires immediate action.
- A production failure requires urgent correction.

Command:

```
/hotfix
```

or:

```
Execute hotfix
```

---

# Core Principle

A hotfix prioritizes system recovery without sacrificing engineering discipline.

Speed is important.

Correctness is mandatory.

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

- Product context.
- Domain rules.
- Architecture.
- Current production state.
- Engineering policies.

---

# Phase 2 - Incident Analysis

Identify:

- Production impact.
- Affected users.
- Severity.
- Reproduction steps.
- Current system behavior.

Define:

- Immediate objective.
- Expected recovery outcome.

Do not start fixing without understanding the impact.

---

# Phase 3 - Activate Emergency Agents

Activate:

```
cto
reviewer
```

Depending on affected area:

```
frontend
backend
database
security
```

---

# Phase 4 - Root Cause Investigation

Analyze:

## Technical Cause

Identify:

- Failing component.
- Trigger condition.
- Why the issue happened.

---

## Business Impact

Evaluate:

- User impact.
- Data impact.
- Operational impact.

---

## Risk Assessment

Determine:

- Fix complexity.
- Deployment risk.
- Rollback requirements.

---

# Phase 5 - Define Hotfix Solution

Create:

- Minimal safe solution.
- Required code changes.
- Validation strategy.
- Rollback plan.

Rules:

- Avoid unrelated improvements.
- Avoid large refactors.
- Prioritize stability.

---

# Phase 6 - Implementation

Follow:

```
.kenovis/AI/policies/coding.md
.kenovis/AI/policies/testing.md
```

Implementation rules:

- Keep changes minimal.
- Maintain existing behavior.
- Add regression protection.
- Document emergency decisions.

---

# Phase 7 - Validation

Execute:

```
.kenovis/AI/commands/review.md
```

Validate:

- Issue resolved.
- No new regressions.
- Critical flows working.
- Security impact reviewed.

---

# Phase 8 - Deployment

Verify:

- Deployment process.
- Configuration.
- Database changes.
- Rollback strategy.

Deploy only after validation.

---

# Phase 9 - Post Hotfix Review

Analyze:

- Root cause.
- Prevention measures.
- Process improvements.

If required:

Record the decision in:

```
DECISIONS.md
```

Shaped by:

```
.kenovis/AI/templates/decision.md
```

`DECISIONS.md` is the destination; the path above is the form that shapes what goes there. See DECISIONS.md DECISION-024.

Document:

- What happened.
- Why it happened.
- What changes prevent recurrence.

---

# Phase 10 - Documentation Update

Update:

```
PRODUCT/

ENGINEERING/

AI/memory/learnings.md
```

Document:

- Incident.
- Resolution.
- Prevention actions.
- Technical lessons.

---

# Decision Rules

Always:

- Prioritize user impact.
- Understand the root cause.
- Keep fixes minimal.
- Validate before deployment.
- Document emergency changes.

Never:

- Deploy untested fixes.
- Hide production issues.
- Introduce unnecessary changes.
- Skip post-incident learning.

---

# Final Principle

A hotfix restores stability today.

The follow-up improvements prevent the same problem tomorrow.
