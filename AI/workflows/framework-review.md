# Framework Review Workflow

Version: 1.0

---

# Purpose

Periodically audit the framework layer itself (`AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, `AI/templates/`, plus `CLAUDE.md`, `README.md`, `CONTRIBUTING.md`) for internal contradictions and stale cross-references.

This workflow does not touch the product layer. It exists because the framework grows by cross-referencing itself — an agent pointing at a policy, a policy pointing at another policy's category, a workflow phase invoking a command. Every new reference is a place drift can hide.

---

# Trigger

Execute when a human explicitly requests it. This is not triggered automatically by `/feature`, `/next`, or any per-change workflow — those stay scoped to their own change.

Reasonable moments to run it:

- Before cutting a framework release (moving `[Unreleased]` to a version in `CHANGELOG.md`).
- After a batch of framework PRs has landed since the last review.
- When a new agent, workflow, or policy is added — the framework just grew a new set of things to reference and be referenced by.

Command:

```
Run AI/workflows/framework-review.md
```

---

# Core Principle

The framework tells every product it governs to keep documentation honest, avoid contradictions, and never let quality checks become optional out of fatigue.

It is not exempt from its own standard. A framework whose own cross-references silently rot is asking products to hold a bar it does not hold itself.

---

# Workflow

---

# Phase 1 - Bootstrap Framework Context

Read:

```
AI/SYSTEM.md
README.md
CONTRIBUTING.md
CHANGELOG.md
DECISIONS.md (framework-level entries only — DECISION-001, 009, 010, and any later ones marked framework-level)
```

Do not load product-layer content (`COMPANY_OS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`) — it is out of scope for this workflow.

---

# Phase 2 - Inventory Cross-References

Grep every file under `AI/` for references to other files under `AI/` (file paths, category names like "Category 9", phase names like "Phase 5", agent names).

Build a map: for each framework file, what does it reference, and what references it back.

---

# Phase 3 - Detect Stale References

For every reference found in Phase 2, verify:

- The target file still exists.
- If the reference names a specific section (a category, a phase, a heading), that section still exists under that name in the target.

A reference to something renamed or removed is a finding, regardless of how small.

---

# Phase 4 - Detect Contradictions

Compare policies pairwise for conflicting mandates on the same concern (e.g., two different thresholds for the same kind of limit, two different owners assigned for the same responsibility).

Compare agent definitions for:

- Two agents both claiming exclusive ownership of the same document or decision.
- A responsibility implied by a workflow phase that no agent actually owns.

---

# Phase 5 - Detect Drift From README And CONTRIBUTING

Confirm `README.md`'s repository map (agent list, workflow list, policy list, command list) matches what actually exists on disk under `AI/`.

Confirm `CONTRIBUTING.md`'s description of "what a good framework contribution looks like" still matches the categories that actually exist.

---

# Phase 6 - Detect Documentation Debt

Confirm recent framework-layer changes (per `git log` on `AI/`, `CLAUDE.md`, `README.md`) are reflected in `CHANGELOG.md` under `[Unreleased]` or a released version, per `CONTRIBUTING.md` → "Framework Definition of Done".

Confirm changes that altered agent responsibilities, workflow phases, or policy mechanics have a corresponding `DECISIONS.md` entry.

---

# Phase 7 - Report Findings

Classify each finding, same severity model as `AI/commands/analyze.md`:

## Critical

Active contradiction that would produce wrong agent behavior right now.

---

## High

Stale reference or ownership gap likely to mislead the next contributor or session.

---

## Medium

README/CONTRIBUTING drift, minor inconsistency.

---

## Low

Cosmetic (versioning convention not followed, wording drift).

For each finding: file, exact location, what is wrong, why it matters.

---

# Phase 8 - Propose Fixes

For each finding, propose the minimal fix. Do not apply it as part of this workflow — file edits for framework-layer content still go through `CONTRIBUTING.md` → "Framework Definition of Done" (CHANGELOG entry, DECISIONS entry when applicable) like any other framework PR.

---

# Phase 9 - Record Outcome

If fixes are applied as a result of this review, they are framework-layer changes like any other — follow `AI/policies/documentation.md` and `CONTRIBUTING.md` normally. This workflow's own execution is not itself a change worth logging; only the fixes it leads to are.

---

# Decision Rules

Always:

- Treat a stale reference as a finding, not a rounding error — the framework is small enough right now that every one is cheap to fix and expensive to compound.
- Distinguish "this file is out of date" from "this file is wrong" — the fix is different (update a reference vs. resolve an actual contradiction).

Never:

- Modify product-layer files as part of this workflow.
- Apply fixes silently without going through the same Framework Definition of Done every other framework change follows.
- Run this as a substitute for the mechanical CI checks (links, markers, changelog) — it complements them, it does not replace them.

---

# Final Principle

A framework that reviews everyone else's work but never its own accumulates exactly the kind of debt it warns products against.

This workflow exists so that growth in the number of agents, policies, and workflows does not silently become growth in the number of things quietly contradicting each other.
