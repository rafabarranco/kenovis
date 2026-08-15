# Analyze Command

Version: 2.2

---

# Purpose

Investigate, understand, and diagnose technical or product-related situations before taking action.

This command produces knowledge.

It does not produce implementation.

---

# Trigger

Execute when:

- Understanding an existing system.
- Investigating problems.
- Evaluating technical debt.
- Exploring improvements.
- Preparing architectural decisions.

Command:

```
/analyze <topic>
```

Examples:

```
/analyze Authentication architecture

/analyze Why are API responses slow?

/analyze Frontend technical debt
```

---

# Core Principle

Do not fix what you do not understand.

Analysis comes before intervention.

---

# Analysis Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Load:

- Product context.
- Domain.
- Architecture.
- Existing decisions.
- Current implementation.

---

# Step 2 - Identify Analysis Type

Classify the request.

Possible categories:

---

## Product Analysis

Activate:

```
product-manager
```

Analyze:

- User value.
- Market impact.
- Feature opportunity.
- Business risk.

---

## Architecture Analysis

Activate:

```
cto
```

Analyze:

- System design.
- Dependencies.
- Scalability.
- Technical debt.

---

## Code Analysis

Activate:

```
reviewer
```

Analyze:

- Quality.
- Complexity.
- Maintainability.
- Risks.

---

## Performance Analysis

Activate:

```
backend

database

frontend
```

Analyze:

- Bottlenecks.
- Resource usage.
- Query behaviour.
- Rendering issues.

---

## Security Analysis

Activate:

```
security
```

Analyze:

- Attack surface.
- Vulnerabilities.
- Risk exposure.

---

# Step 3 - Gather Evidence

Analyze:

- Documentation.
- Source code.
- Configuration.
- Database schema.
- Logs if available.
- Existing decisions.

Never make conclusions without evidence.

---

# Step 4 - Describe Current State

Document:

## What exists

Current implementation.

---

## How it works

System behaviour.

---

## Why it may exist

Historical context if available.

---

## Current limitations

Known problems.

---

# Step 5 - Identify Problems

Classify findings.

---

## Critical

Immediate risk.

Examples:

- Security vulnerability.
- Data corruption.
- Production instability.

---

## High

Significant impact.

Examples:

- Architectural limitation.
- Performance issue.

---

## Medium

Should improve.

Examples:

- Maintainability problems.
- Missing documentation.

---

## Low

Optimization opportunity.

---

# Step 6 - Analyze Root Cause

Do not only describe symptoms.

Find:

- Why it happens.
- What created the situation.
- What constraints exist.

---

# Step 7 - Generate Recommendations

Recommendations feed the report in Step 9, which says where an analysis leaves a durable residue. They are not written to a file of their own, and never anywhere under `.kenovis/` — see DECISIONS.md DECISION-024.

Note the Cost field below: an unverified cost estimate suppresses an item in every later prioritisation and nothing marks it as a guess. Verify it, or say it is unverified — see `AI/memory/learnings.md`.

For each recommendation include:

## Problem

What should improve.

---

## Proposal

Suggested solution.

---

## Impact

Expected benefit.

---

## Cost

Implementation complexity.

---

## Risk

Possible downsides.

---

# Step 8 - Prioritize Actions

Classify:

## Do Now

High value, low risk.

---

## Plan

Important but requires preparation.

---

## Consider Later

Useful but not urgent.

---

## Avoid

Low value or excessive complexity.

---

# Step 9 - Create Report

The report is delivered to the human in this session; it is not a file to create, and `Analysis Report` below is its shape, not a filename. Never write it, or any produced artifact, anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale — see DECISIONS.md DECISION-024.

An analysis that changes what the product does next has a durable residue, and it belongs where that kind of fact already lives: a scheduled item in `PRODUCT/ROADMAP.md`, a chosen approach in `DECISIONS.md`, a reusable lesson in `AI/memory/learnings.md`. An analysis whose recommendations are recorded nowhere has to be run again.

Structure:

---

## Summary

Short conclusion.

---

## Current Situation

What exists.

---

## Findings

Problems discovered.

---

## Root Causes

Why they exist.

---

## Recommendations

Suggested actions.

---

## Risks

Important considerations.

---

## Next Steps

Possible follow-up actions.

---

# Documentation Updates

Only update documentation if:

- A new decision was made.
- A new pattern was discovered.
- Existing documentation was incorrect.

---

# AI Responsibilities

AI must:

- Separate facts from assumptions.
- Explain uncertainty.
- Use evidence.
- Avoid premature solutions.

AI must not:

- Implement fixes.
- Change code, configuration, or any product document to apply a finding.
- Invent missing requirements.

AI must record, and this is not an exception to the line above — it is the difference between analysis and implementation:

- Every finding this analysis does not fix gets a disposition, per `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected".
- The destinations are the ones Step 9 already names: the findings queue in `PRODUCT/ROADMAP.md`, a chosen approach in `DECISIONS.md`, a reusable lesson in `AI/memory/learnings.md`.
- Do it in the same session. An analysis whose findings are recorded nowhere has to be run again, and in practice is not — it stays in the transcript and dies there.

This command detects and records. It never fixes.

---

# Forbidden Behaviours

Never:

- Jump directly to solutions.
- Analyze without context.
- Recommend technology without justification.
- Ignore existing architecture.
- Hide uncertainty.

---

# Decision Framework

When analyzing:

1. Understand before judging.
2. Separate facts from opinions.
3. Find root causes.
4. Consider trade-offs.
5. Recommend practical improvements.
6. Avoid unnecessary changes.

---

# Final Principle

The best solutions come from understanding the problem deeply before touching the system.