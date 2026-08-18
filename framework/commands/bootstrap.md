# Bootstrap Command

Version: 2.9

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

Product-layer files (company-os/COMPANY_OS.md, company-os/DECISIONS.md, company-os/PRODUCT/, company-os/DOMAIN/, company-os/ENGINEERING/, company-os/AUTOMATIONS/, company-os/AI/memory/) carry a `PROJECT-SPECIFIC` marker on the first line.

If they still contain example content from a previous or sample company:

Stop.

Execute:

```
.kenovis/AI/commands/init-project.md
```

Bootstrapping into someone else's context produces confident wrong work.

---

# Bootstrap Workflow

Execute the following sequence.

---

# Step 1 - Load AI Constitution

Read:

```
.kenovis/AI/SYSTEM.md
```

Understand:

- AI responsibilities.
- General behaviour.
- Decision principles.
- Collaboration model.

---

# Step 2 - Load Project Context

Read `company-os/PRODUCT/OPERATING_MODEL.md` in full first — rank 1 of the Source Of Truth Hierarchy (`.kenovis/AI/SYSTEM.md`). Not as one file inside `company-os/PRODUCT/`, which is how it was reached before and meant it was loaded by accident or not at all. Setup authors it in every repository (`/init-project` Step 2, `/adopt-project` Step 3); a repository predating that requirement may not have one, and there the gap is work to raise with the owner, not a state to bootstrap around.

Read `company-os/COMPANY_OS.md` in full.

Read `company-os/DECISIONS.md` as its Decision Index only — the section at the head of that file, one line per decision. Not the bodies. A decision log is append-only and grows without bound, so a session that loads it whole pays more every week to consult none of it.

Open a decision's body when it becomes relevant, and open it before citing it: the index says what a decision settled, never why. See `.kenovis/AI/SYSTEM.md` → "Context Loading Rules".

Then load the rest of the project context.

If `graphify-out/graph.json` exists and is not stale (no code/doc changes since last build):

Query the graph before reading raw files:

```
graphify query "<topic>"
graphify explain "<concept>"
```

Read a file in full only when the graph is absent, stale, or the query result is insufficient.

Otherwise, read:

```
company-os/PRODUCT/
company-os/DOMAIN/
company-os/ENGINEERING/
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
company-os/AI/memory/
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

`company-os/ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure" documents where this product's implementation actually lives. There is no framework-mandated directory for it — a literal top-level directory is a layout some products choose (this repository's own product uses `cli/`, for its own reasons — see its `company-os/ENGINEERING/ARCHITECTURE.md`), never a requirement every Installation must follow.

For an Installation scaffolded from scratch by `/init-project` (greenfield), Step 6 decides and records this layout explicitly in `company-os/ENGINEERING/ARCHITECTURE.md`.

For an Installation adopted from an existing repository by `/adopt-project` (brownfield), the implementation stays exactly where it already lives — root, `src/`, a monorepo package, anywhere. Adoption never relocates it to fit a Kenovis-chosen layout.

Read `company-os/ENGINEERING/ARCHITECTURE.md` first. Do not assume a monorepo, a single app, or any particular directory layout.

If `graphify-out/graph.json` exists and is not stale, query it before walking the tree:

```
graphify query "<topic>"
graphify explain "<concept>"
graphify god-nodes
```

Fall back to walking the repository on disk only when the graph is absent, stale, or the query result is insufficient.

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

**First verify the current branch is level with its remote, because nothing else in this step can tell you it is not.**

```
git fetch origin
git rev-list --count HEAD..origin/<current-branch>
```

Local state is internally consistent whether the branch is current or three merges behind, so every other signal in this step passes on a stale branch. `git status` reports against the local tracking ref, which is itself only as fresh as the last fetch — it will report "up to date", or a confident and wrong "ahead by N", without ever contacting the remote.

The common way to arrive here stale is ordinary: merging a pull request with `--delete-branch` returns the checkout to the base branch, which is by definition behind the merge that just landed.

A session that bootstraps on a stale branch reads an outdated product layer and an outdated roadmap, and every conclusion it draws is coherent. Nothing downstream detects it. If the branch is behind, bring it level before any work — a rebuilt context is cheap, a round of reasoning against superseded context is not.

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

The plan is presented to the human in this session; it is not a file to create, and never anywhere under `.kenovis/`, which `kenovis sync` replaces wholesale — see company-os/DECISIONS.md DECISION-024. The workflow that follows bootstrap names what its own work records durably.

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