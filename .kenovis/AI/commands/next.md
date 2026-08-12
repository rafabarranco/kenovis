# Next Command

Version: 2.4

---

# Purpose

Execute the next highest-value development action according to the current product roadmap.

This command transforms product direction into concrete engineering execution.

The objective is not to write code immediately.

The objective is to identify, plan, validate, implement, review, and document the next meaningful improvement.

---

# Trigger

Execute when:

- Starting new development work.
- Completing the previous roadmap item.
- Asking what should be done next.
- Continuing autonomous development.

Command:

```
/next
```

---

# Core Principle

Always maximize product value before maximizing technical output.

The next action should be the one that creates the highest business impact with acceptable technical risk.

---

# Execution Workflow

Follow this sequence.

---

# Step 1 - Bootstrap Context

Execute:

```
.kenovis/AI/commands/bootstrap.md
```

Before doing anything else.

Load:

- Product context.
- Domain knowledge.
- Architecture.
- Engineering rules.
- Current repository state.

---

# Step 2 - Read Product Roadmap

Read:

```
PRODUCT/ROADMAP.md
```

Understand:

- Current phase.
- Completed work.
- Pending objectives.
- Priority order.

---

# Step 3 - Identify Next Objective

Read both inputs, not one: the scheduled items, and `PRODUCT/ROADMAP.md` → "Open Findings", the queue of findings earlier rounds did not fix. A finding carrying `Open` competes here on the same priority formula as a scheduled item — that is the whole reason the queue exists, and skipping it is how a known problem stays unresolved for months while rounds pick from the items that happen to be written up.

Determine:

```
What is the next valuable outcome?
```

Not:

"What file should we edit?"

---

Evaluate:

- User impact.
- Business value.
- Technical dependencies.
- Risk.
- Effort.

---

# Step 4 - Activate Product Agent

Call:

```
product-manager
```

Responsibilities:

- Validate user problem.
- Confirm expected value.
- Define success criteria.

Questions:

- Who benefits?
- Why does this matter?
- How will we know it worked?

---

# Step 5 - Activate CTO Agent

Call:

```
cto
```

Responsibilities:

- Evaluate architecture impact.
- Identify technical approach.
- Detect risks.

Review:

- Existing architecture.
- Scalability.
- Complexity.

---

# Step 6 - Select Engineering Agents

Activate only necessary specialists.

Examples:

## Frontend Feature

```
frontend

designer

reviewer
```

---

## Backend Feature

```
backend

database

security

reviewer
```

---

## Full Product Feature

```
product-manager

designer

frontend

backend

database

security

reviewer
```

---

# Step 7 - Select Policies

Load relevant policies.

Always:

```
architecture.md

coding.md

testing.md

documentation.md
```

Additional:

Database changes:

```
database.md
```

Security changes:

```
security.md
```

Release changes:

```
git.md
```

---

# Step 8 - Create Execution Plan

The plan is presented to the human in this session; it is not a file to create, and never anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale — see DECISIONS.md DECISION-024. What survives is written in Step 13 (`PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `DECISIONS.md`) and Step 14 (`AI/memory/learnings.md`).

Before coding generate:

## Objective

What will be achieved.

## User Value

Why users need it.

## Technical Approach

How it will be implemented.

## Affected Areas

Files and systems involved.

## Risks

Possible problems.

## Validation

How success will be measured.

---

# Step 9 - Check Dependencies

Verify:

- Previous roadmap items completed.
- Required architecture exists.
- Necessary decisions documented.

If dependencies are missing:

Do not continue blindly.

Update plan.

---

# Step 10 - Implement

During implementation:

Follow:

- Architecture policy.
- Coding policy.
- Security policy.
- Testing policy.

Prefer:

Small incremental changes.

Avoid:

Large uncontrolled rewrites.

---

# Step 11 - Validate

Run:

- Tests.
- Type checks.
- Linting.
- Build process.

Verify:

- Business requirements.
- Security.
- Performance.

---

# Step 12 - Review

Activate:

```
reviewer
```

The reviewer checks:

- Architecture.
- Code quality.
- Tests.
- Documentation.
- Technical debt.

Possible outcomes:

```
Approved

Approved with suggestions

Changes requested

Rejected
```

---

# Step 13 - Update Documentation

After successful implementation update:

Product:

```
PRODUCT/
```

Domain:

```
DOMAIN/
```

Engineering:

```
ENGINEERING/
```

Decisions:

```
DECISIONS.md
```

when required.

---

# Step 14 - Update AI Memory

Record important learnings:

```
AI/memory/learnings.md
```

Examples:

- New conventions.
- Important discoveries.
- Patterns established.

---

# Step 15 - Prepare Next Step

The summary is delivered to the human in this session; it is not a file to create, and never anywhere under `.kenovis/` — see DECISIONS.md DECISION-024. The recommended next action belongs in `PRODUCT/ROADMAP.md`, written in Step 13, so the next `/next` run reads it instead of re-deriving it.

The same applies to everything this round found and did not fix. A round finds more than it fixes; each of those findings is scheduled with an id in `PRODUCT/ROADMAP.md` or rejected with a reason, in Step 13, before this summary is written. Describing a finding in this summary, or in the narrative of the item just closed, is not a disposition — see `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected". The summary below then states the disposition of each, which is only possible because they already have one.

Ordering alone has already failed, twice, so it is no longer the only defence. The closed item carries a line — `Findings this item did not fix:` — naming the queued ids or stating none. Write it in Step 13, before this step exists. A round that found nothing writes "none"; a round that found something and skipped the queue now has to write "none" and be wrong on the record, instead of simply saying nothing. This is the one part of the rule a machine can hold you to, and it does.

After completion:

Summarize:

## Completed

What changed.

## Decisions

Important choices.

## Risks

Remaining concerns.

## Next Recommended Action

What should happen next.

---

# Autonomous Mode

When explicitly enabled:

Claude may continue through multiple roadmap items.

However, confirmation is required before:

- Architecture changes.
- Security changes.
- Database migrations.
- Large refactors.
- External costs.

---

# Forbidden Behaviours

Never:

- Start coding before understanding the objective.
- Ignore the roadmap.
- Implement features without user value.
- Skip review.
- Skip documentation.
- Add unnecessary complexity.
- Modify unrelated areas.

---

# Completion Criteria

The command is complete when:

✓ The roadmap item is understood.

✓ The correct agents participated.

✓ Relevant policies were applied.

✓ Implementation is complete.

✓ Tests pass.

✓ Review is approved.

✓ Documentation is updated.

✓ Memory contains relevant learnings.

---

# Final Principle

The purpose of /next is not to write more code.

The purpose of /next is to continuously move the company forward.

