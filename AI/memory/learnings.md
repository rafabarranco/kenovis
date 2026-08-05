<!-- PROJECT-SPECIFIC: accumulates per-product knowledge. Reset the recorded entries when starting a new product, keep the rules. See AI/commands/init-project.md -->

AI Learnings

Version: 1.1
---
Scope

The rules in this document are framework-level and reusable.

The learnings recorded by the AI while working on a product are project-specific and must be cleared when starting a new product.
---
Purpose

This document stores accumulated organizational knowledge.

The purpose is to capture:

- Important lessons.
- Repeated mistakes.
- Successful patterns.
- Process improvements.
- Technical discoveries.
- Product insights.

This file represents the experience gained by the organization over time.
---
Learning Philosophy

A learning is not a record of what happened.

A learning explains:

What happened

↓

Why it happened

↓

What was learned

↓

What should change in the future

---
What Should Be Stored

Store learnings about:

- Architecture decisions.
- Development processes.
- Product discovery.
- User behaviour.
- Technical limitations.
- Failed approaches.
- Successful approaches.
---
What Should NOT Be Stored

Do not store:

- Temporary tasks.
- Daily progress updates.
- Completed tickets.
- Meeting notes.
- Personal opinions without evidence.
- Project-specific details that have no future value.
---
Learning Format

Every learning should follow this structure:

## Learning ID

Date:

Category:

Context:

Problem:

What happened:

Root cause:

Learning:

Future action:

---
Categories

Use one of these categories:

Architecture

Engineering

Product

Business

Security

Process

User Experience

Performance

Operations

---
Learning Examples

Example: Architecture

## Learning-001

Date:
2026-01-01

Category:
Architecture

Context:
Introducing a new external service.

Problem:
The service was integrated directly inside business logic.

What happened:
Changing the provider required modifying multiple modules.

Root cause:
The external dependency was not isolated.

Learning:
External services should be hidden behind interfaces.

Future action:
Use adapters for external integrations.

---
Example: Project — `sync --source` mirrors whatever directory it's pointed at, unfiltered

## Learning-004

Date:
2026-08-05

Category:
Engineering

Context:
End-to-end smoke test of the published `kenovis@0.1.0` package against a scratch external-like repository, verifying `init`/`sync` behave as newly documented in README.md's "Getting started" section.

Problem:
Testing `sync --source <dir>` by pointing it at this repository's own root (instead of a real Framework-only bundle) silently mirrored this repository's own Product-layer content (COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, cli/, .github/, LICENSE, ...) into the target's `.kenovis/` — content that describes Kenovis-the-company, never meant to leave this repository.

What happened:
`runInit`/`runSync` perform a full, unfiltered mirror of whatever `--source` points at; there is no allowlist or validation that the source directory actually contains only Framework-layer content. Default zero-flag usage (`npx kenovis sync`, what README.md documents to real customers) is safe because the published package's bundled `dist/framework-assets/` is already filtered at build time (`bundle-framework-assets.mjs`). The risk is specific to `--source` pointed at an unbundled directory.

Root cause:
`--source` was designed as a local-dev/testing escape hatch (see cli/README.md "Running it locally") and trusts the caller completely — reasonable for that use case, but has no safeguard against accidental misuse.

Learning:
An unvalidated "mirror this directory" flag will faithfully reproduce whatever layer-mixing mistake the caller makes. Default (filtered, bundled) paths and advanced/raw-directory paths need different trust assumptions documented explicitly, not just implied by which flag is used.

Future action:
DECISIONS.md DECISION-017's Phase 2 (this repository migrates its own Framework layer into `.kenovis/` using the CLI's own sync mechanism on itself) must run `sync` against the built `dist/framework-assets/` bundle, never against the raw repo root — otherwise it will self-pollute `.kenovis/` with this repository's own Product-layer content. Consider adding a lightweight source-directory validation (e.g., reject a `--source` whose top level contains recognizably Product-layer names) before Phase 2 executes.

---

Example: Project — sync's reversibility comes from the target's own git, not the CLI

## Learning-003

Date:
2026-08-05

Category:
Architecture

Context:
Building the `sync` command (PRODUCT/ROADMAP.md Phase 0 item 3, slice 4) to satisfy DOMAIN/BUSINESS_RULES.md RULE-INST-02 ("a sync must never perform an in-place, non-version-controlled rewrite").

Problem:
Read literally, "never perform an in-place rewrite" could be misread as requiring the CLI itself to compute and present a diff before touching disk — a much bigger feature than this slice needed.

What happened:
Re-reading RULE-INST-02's own text closely: "the customer's own git history and PR review are the rollback mechanism." `.kenovis/` is git-tracked inside the customer's repository from the `init` commit onward. `runSync` mirror-replaces `.kenovis/` in place (`removeTree` + `copyTree`); the customer's `git diff`/`git checkout` then IS the review-and-revert mechanism the rule requires. No CLI-side diff engine was needed for RULE-INST-02 to be satisfied — that ergonomic improvement is separately, explicitly scoped to Phase 2 ("richer CLI update ergonomics — diff preview before sync") in PRODUCT/ROADMAP.md, confirming this reading.

Root cause:
"Reversible" and "diff-previewed-by-the-tool-itself" are not the same requirement; the business rule only demands the former for v1.

Learning:
When a business rule's own prose names the actual rollback mechanism (here: the customer's git), build against that mechanism instead of assuming the CLI must reimplement it. Check PRODUCT/ROADMAP.md for whether a fancier version of the same capability is already deliberately deferred — that's a strong signal the leaner reading is correct.

Future action:
When Phase 2's diff-preview work starts, treat it as a UX/ergonomics layer on top of the existing mirror-replace `runSync`, not a rewrite of its core reversibility guarantee.

---
Example: Product

## Learning-002

Date:
2026-01-01

Category:
Product

Context:
Testing a new workflow.

Problem:
Users ignored a complex configuration screen.

What happened:
The feature adoption was lower than expected.

Root cause:
The workflow required too much setup before providing value.

Learning:
Users should reach the first valuable action as quickly as possible.

Future action:
Prioritize simple onboarding flows.

---
Learning Validation

Before adding a learning, verify:

✓ Is this based on a real experience?

✓ Does this change future behaviour?

✓ Can another project benefit from this?

✓ Is this more than a simple observation?

If the answer is no, do not store it.
---
Priority Levels

Each learning can have a priority:

Critical

Important

Useful

---
Critical

Must influence future decisions.

Examples:

- Security failures.
- Data loss prevention.
- Architecture mistakes.
---
Important

Should be considered regularly.

Examples:

- Development patterns.
- Product lessons.
---
Useful

Helpful but not mandatory.

Examples:

- Minor improvements.
- Optimizations.
---
Review Process

Periodically review learnings.

The AI should identify:

- Repeated problems.
- Patterns.
- Opportunities to improve policies.

If a learning becomes a permanent rule:

Move it to:

AI/policies/

If a learning becomes a naming rule:

Move it to:

AI/memory/conventions.md

If a learning becomes domain knowledge:

Move it to:

DOMAIN/

---
Evolution Rules

The AI should improve the organization over time.

When a recurring problem appears:

Do not only fix the issue.

Improve the system that allowed the issue.

Example:

Bad:

Fix bug.

Good:

Fix bug.

Understand why it happened.

Update policy.

Prevent future repetition.

---
Cross-Project Knowledge

The AI-OS may be reused across different products.

Therefore:

Store only reusable knowledge.

Avoid:

This product uses React.

Prefer:

Technology choices should be documented explicitly per project.

---
Relationship With Other Memory Files

conventions.md

Stores:

"What rules do we follow?"
---
glossary.md

Stores:

"What do concepts mean?"
---
learnings.md

Stores:

"What have we learned?"
---
Final Principle

A strong organization does not only accumulate code.

It accumulates experience.

This document is the mechanism through which the AI organization becomes better over time.