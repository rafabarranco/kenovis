# Bug Fix Workflow

Version: 2.0

---

# Purpose

Resolve software defects through a structured investigation, implementation and validation process.

This workflow ensures bugs are fixed correctly without introducing regressions.

The objective is not only to remove an error.

The objective is to understand the root cause and improve system reliability.

---

# Trigger

Execute when:

- A bug is reported.
- A production issue is detected.
- A regression is identified.
- A defect requires investigation.

Command:

```
/bug
```

or:

```
Fix reported bug
```

---

# Core Principle

A bug is not only an error.

A bug is a symptom of unexpected system behavior that requires understanding the root cause before applying a solution.

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

- Product context.
- Domain rules.
- Business requirements.
- Architecture.
- Engineering policies.

---

# Phase 2 - Analyze Bug Report

Review:

```
AI/templates/bug-report.md
```

Identify:

- Problem description.
- Expected behavior.
- Current behavior.
- Steps to reproduce.
- Affected areas.
- Severity.
- Impact.

Do not start implementation without understanding the issue.

---

# Phase 3 - Activate Technical Agents

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

# Phase 4 - Investigation

Analyze:

## Reproduction

Determine:

- How to reproduce the issue.
- Environment where it occurs.
- Conditions required.

---

## Root Cause

Identify:

- Why the problem happens.
- Which component causes the issue.
- Whether the issue is isolated or systemic.

---

## Impact Analysis

Evaluate:

- Affected users.
- Affected features.
- Possible regressions.
- Data integrity risks.

---

# Phase 5 - Solution Design

Define:

- Correct fix approach.
- Required changes.
- Potential risks.
- Testing strategy.

Avoid:

- Quick patches without understanding.
- Unnecessary refactoring.
- Changes unrelated to the issue.

---

# Phase 6 - Architecture Review

If the fix affects architecture:

Execute:

```
AI/commands/architect.md
```

Create ADR using:

```
AI/templates/adr.md
```

when required.

---

# Phase 7 - Implementation

Follow:

```
AI/policies/coding.md
AI/policies/testing.md
```

Rules:

- Keep changes minimal.
- Preserve existing behavior.
- Add regression protection.
- Follow project conventions.

---

# Phase 8 - Testing

Validate:

- Bug reproduction no longer occurs.
- Existing functionality still works.
- Regression tests are added when needed.

Required checks:

- Unit tests.
- Integration tests.
- End-to-end tests when applicable.

---

# Phase 9 - Quality Validation

Execute:

```
AI/commands/review.md
```

Validate:

- Root cause solved.
- Implementation quality.
- Security impact.
- Maintainability.
- Test coverage.

---

# Phase 10 - Documentation Update

Update when required:

```
PRODUCT/

DOMAIN/

ENGINEERING/

AI/memory/learnings.md
```

Document:

- Root cause.
- Solution.
- New prevention rules.
- Lessons learned.

---

# Phase 11 - Bug Completion

Confirm:

- Issue resolved.
- Tests completed.
- Review approved.
- Documentation updated.

Update:

```
AI/templates/bug-report.md
```

with final resolution details.

---

# Decision Rules

Always:

- Investigate before fixing.
- Fix the root cause.
- Protect against regressions.
- Keep changes focused.
- Document important findings.

Never:

- Apply blind fixes.
- Ignore reproduction steps.
- Skip testing.
- Modify unrelated code.
- Hide technical debt.

---

# Final Principle

A bug fix is successful when the problem is solved and the system becomes more reliable.
```