# Bug Fix Workflow

Version: 2.4

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
.kenovis/AI/commands/bootstrap.md
```

If bootstrap already ran earlier this session and `graphify-out/graph.json` is still fresh, re-query the graph (`graphify query "<topic>"`) instead of re-reading the full context tree.

Load:

- Product context.
- Domain rules.
- Business requirements.
- Architecture.
- Engineering policies.

---

# Phase 2 - Analyze Bug Report

Review the reported bug — from the human, an issue tracker, or a failing test. Where the report is incomplete, use this form to name what is missing and ask for it:

```
.kenovis/AI/templates/bug-report.md
```

That path is a form, not a destination — never write into it, and never write any produced artifact anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale. See DECISIONS.md DECISION-024.

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

Once the repository has real implementation content: use `graphify affected "<component>"` and `graphify explain "<concept>"` to trace impacted nodes before grepping the tree cold.

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
.kenovis/AI/commands/architect.md
```

Record the ADR in:

```
DECISIONS.md
```

Shaped by:

```
.kenovis/AI/templates/adr.md
```

`DECISIONS.md` is the destination; the path above is the form that shapes what goes there. See DECISIONS.md DECISION-024.

when required.

---

# Phase 7 - Implementation

Follow:

```
.kenovis/AI/policies/coding.md
.kenovis/AI/policies/testing.md
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
.kenovis/AI/commands/review.md
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

Record the resolution where it will still be readable after this session:

```
AI/memory/learnings.md
```

when the bug taught something reusable — a root cause that will recur, a convention that would have prevented it. The regression test added in Phase 8 is the other half of that record, and the more durable one.

The bug-report form is not a file to update: it shaped the conversation, and `kenovis sync` replaces the directory it lives in. See DECISIONS.md DECISION-024.

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
