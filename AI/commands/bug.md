# Bug Command

Version: 2.0

---

# Purpose

Investigate, fix, validate, and prevent software defects.

This command handles bugs from discovery to resolution.

The objective is not only to remove symptoms.

The objective is to eliminate root causes.

---

# Trigger

Execute when:

- A bug is reported.
- A production issue occurs.
- Unexpected behaviour is discovered.
- A regression appears.

Command:

```
/bug <description>
```

Examples:

```
/bug Users cannot confirm attendance

/bug Payment calculation is incorrect
```

---

# Core Principle

Fix the cause, not only the symptom.

A temporary patch without understanding creates future problems.

---

# Bug Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
AI/commands/bootstrap.md
```

Understand:

- Product expectations.
- Domain rules.
- Architecture.
- Current implementation.
- Existing decisions.

---

# Step 2 - Create Bug Report

Use:

```
AI/templates/bug-report.md
```

Capture:

## Summary

What is wrong.

---

## Expected Behaviour

What should happen.

---

## Actual Behaviour

What happens instead.

---

## Impact

Who is affected.

---

## Severity

Classification.

---

# Severity Levels

## Critical

Production is severely affected.

Examples:

- Data loss.
- Security issue.
- Complete service outage.

---

## High

Important functionality broken.

Examples:

- Core workflow unavailable.
- Incorrect business calculation.

---

## Medium

Limited impact.

Examples:

- Incorrect UI state.
- Non-critical workflow issue.

---

## Low

Minor inconvenience.

Examples:

- Visual issues.
- Small usability problems.

---

# Step 3 - Reproduce

Before fixing:

Confirm:

- How to reproduce.
- Conditions required.
- Frequency.
- Affected environments.

If reproduction is impossible:

Document uncertainty.

---

# Step 4 - Activate Agents

Always:

```
reviewer
```

Additional:

Frontend:

```
frontend
```

Backend:

```
backend
```

Database:

```
database
```

Security-related:

```
security
```

Product impact:

```
product-manager
```

---

# Step 5 - Investigate Root Cause

Analyze:

- Code path.
- Data flow.
- Business rules.
- Recent changes.
- Dependencies.

Do not immediately patch.

---

# Step 6 - Determine Fix Strategy

Evaluate:

## Option A

Minimal fix.

---

## Option B

Structural improvement.

---

Choose based on:

- Severity.
- Risk.
- Long-term impact.

---

# Step 7 - Implement Fix

Rules:

- Keep scope focused.
- Avoid unrelated refactoring.
- Follow architecture rules.
- Preserve existing behaviour.

---

# Step 8 - Add Regression Protection

Every important bug should create:

- A test.
- A validation rule.
- A monitoring improvement.

The goal:

This bug should not return.

---

# Step 9 - Validate

Verify:

- Original issue solved.
- Existing functionality preserved.
- Tests pass.
- No new regressions introduced.

---

# Step 10 - Review

Execute:

```
AI/commands/review.md
```

Verify:

- Fix quality.
- Architecture alignment.
- Security.
- Maintainability.

---

# Step 11 - Update Documentation

Update if necessary:

```
DOMAIN/

ENGINEERING/

DECISIONS.md

AI/memory/learnings.md
```

Especially when discovering:

- Hidden business rules.
- Architectural weaknesses.
- New conventions.

---

# Step 12 - Generate Resolution Report

Include:

---

## Problem

What failed.

---

## Impact

Who was affected.

---

## Root Cause

Why it happened.

---

## Solution

What changed.

---

## Prevention

How recurrence is avoided.

---

## Validation

How it was tested.

---

# AI Responsibilities

AI must:

- Investigate before modifying.
- Preserve evidence.
- Identify root causes.
- Add regression protection.
- Communicate uncertainty.

AI must never:

- Hide bugs with superficial fixes.
- Delete failing tests.
- Change business behaviour without approval.
- Perform unrelated refactors.

---

# Forbidden Behaviours

Never:

- Fix without reproducing when possible.
- Ignore severity.
- Skip testing.
- Skip review.
- Close bugs without understanding cause.
- Apply random changes until tests pass.

---

# Decision Framework

When fixing bugs:

1. Stabilize critical issues first.
2. Understand before changing.
3. Prefer root-cause fixes.
4. Minimize regression risk.
5. Add protection against recurrence.
6. Document important discoveries.

---

# Final Principle

A bug fixed once is maintenance.

A bug prevented forever is engineering.