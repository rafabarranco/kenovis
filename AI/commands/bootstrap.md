# Bootstrap Command

Version: 2.0

---

# Purpose

Initialize an AI engineering session.

This command must be executed before making any changes to the repository.

The objective is to load project context, understand current state, and prevent uninformed decisions.

---

# Trigger

Execute when:

- Starting a new AI session.
- Opening a repository for the first time.
- Beginning significant work.
- Context may be outdated.

---

# Core Principle

Never modify code without understanding the system first.

Context before action.

---

# Bootstrap Workflow

Execute the following sequence.

---

# Step 1 - Load AI Constitution

Read:

```
AI/SYSTEM.md
```

Understand:

- AI responsibilities.
- General behaviour.
- Decision principles.
- Collaboration model.

---

# Step 2 - Load Project Context

Read:

```
PRODUCT/
DOMAIN/
ENGINEERING/
```

Understand:

## Product

- Vision.
- Goals.
- Current roadmap.
- User problems.

## Domain

- Business concepts.
- Rules.
- Terminology.

## Engineering

- Architecture.
- Technical decisions.
- Constraints.

---

# Step 3 - Load Active Memory

Read:

```
AI/memory/
```

Specifically:

```
conventions.md

glossary.md

learnings.md
```

Understand:

- Existing conventions.
- Known problems.
- Previous lessons.

---

# Step 4 - Inspect Repository Structure

Analyze:

```
/
apps/
packages/
src/
docs/
```

Identify:

- Applications.
- Shared packages.
- Entry points.
- Technologies.
- Build system.
- Testing setup.

---

# Step 5 - Check Current State

Inspect:

Git status.

Recent commits.

Open branches.

Pending changes.

Determine:

- Current work.
- Unfinished tasks.
- Potential conflicts.

---

# Step 6 - Identify Relevant Agents

Based on the requested task activate only necessary agents.

Examples:

Feature:

```
product-manager

cto

designer

frontend/backend

reviewer
```

Database change:

```
database

backend

security

reviewer
```

Security issue:

```
security

backend

reviewer
```

Do not activate every agent unnecessarily.

---

# Step 7 - Identify Relevant Policies

Load only applicable policies.

Examples:

Frontend change:

```
coding.md

architecture.md

testing.md
```

Database change:

```
database.md

security.md

architecture.md
```

Release:

```
git.md

testing.md

documentation.md
```

---

# Step 8 - Determine Current Objective

Before acting answer:

```
What problem are we solving?

Why now?

What outcome defines success?
```

If unclear:

Ask.

Never invent business requirements.

---

# Step 9 - Create Execution Plan

Before modifying files provide:

## Understanding

What was understood.

## Approach

How it will be solved.

## Agents involved

Which roles are participating.

## Files affected

Which areas may change.

## Risks

Possible problems.

---

# Step 10 - Request Approval When Needed

Approval is required before:

- Architecture changes.
- Database changes.
- New dependencies.
- Large refactors.
- Security-sensitive changes.

---

# Rules

Never:

- Skip bootstrap.
- Modify files before understanding context.
- Ignore existing documentation.
- Replace project conventions with personal preferences.
- Assume missing requirements.

---

# Completion Criteria

Bootstrap is complete when:

✓ AI context loaded.

✓ Product understood.

✓ Domain understood.

✓ Architecture understood.

✓ Current repository state understood.

✓ Relevant agents identified.

✓ Relevant policies loaded.

✓ Execution plan prepared.

---

# Final Principle

A good engineer does not start coding when they receive a task.

A good engineer first understands the system they are changing.