# Bootstrap Command

Version: 2.1

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

# Precondition - Product Layer Must Be Real

Before bootstrapping, confirm the product layer describes an actual product.

Product-layer files (COMPANY_OS.md, DECISIONS.md, PRODUCT/, DOMAIN/, ENGINEERING/, AUTOMATIONS/, AI/memory/) carry a `PROJECT-SPECIFIC` marker on the first line.

If they still contain example content from a previous or sample company:

Stop.

Execute:

```
AI/commands/init-project.md
```

Bootstrapping into someone else's context produces confident wrong work.

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

If `graphify-out/graph.json` exists and is not stale (no code/doc changes since last build):

Query the graph before reading raw files:

```
graphify query "<topic>"
graphify explain "<concept>"
```

Read a file in full only when the graph is absent, stale, or the query result is insufficient.

Otherwise, read:

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

If the graph is available: query it first (`graphify query "<topic>"`, `graphify explain "<concept>"`). Fall back to a full read only if the graph is absent, stale, or insufficient.

Otherwise, read:

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

Product and platform implementation lives under `CODE/`.

Read `CODE/README.md` first. It describes the topology this product actually uses. Do not assume a monorepo, a single app, or any particular directory layout.

If `graphify-out/graph.json` exists and is not stale, query it before walking the tree:

```
graphify query "<topic>"
graphify explain "<concept>"
graphify god-nodes
```

Fall back to walking `CODE/` on disk only when the graph is absent, stale, or the query result is insufficient.

Identify:

- Deployable units.
- Shared code.
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