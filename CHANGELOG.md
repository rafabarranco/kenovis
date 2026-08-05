# Changelog

All notable changes to the Kenovis AI-OS **framework layer** are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This log tracks the reusable framework (`AI/`, `CLAUDE.md`, `README.md`, `CODE/README.md`) — not product-layer content, which is scaffolding meant to be rewritten per product via [AI/commands/init-project.md](AI/commands/init-project.md).

## [Unreleased]

### Added

- `LICENSE` (Apache 2.0).
- `CONTRIBUTING.md` — contribution scope and rules for the two-layer repo.
- `.github/ISSUE_TEMPLATE/` (bug report, feature request) and `.github/PULL_REQUEST_TEMPLATE.md`.
- `.github/workflows/ci.yml` — checks relative markdown links resolve and the `PROJECT-SPECIFIC` marker convention holds.
- This changelog.
- `AI/policies/code-quality.md` — language-agnostic mechanical quality checklist (12 categories: correctness, reliability, security vulnerabilities, security hotspots, maintainability, complexity, accessibility, testing hygiene, API/contract design, concurrency & data integrity, dependency hygiene, observability/logging). Wired into `backend`, `frontend`, `database`, `security`, `reviewer`, and `AI/policies/coding.md`'s new "Definition of Done — Mechanical Gate".
- `AI/templates/design-spec.md` and a "Phase 5 - Design Analysis" step in `AI/workflows/feature.md`, for features with a user-facing surface.
- `PRODUCT/COMPETITIVE_LANDSCAPE.md` — shared competitive research doc, with dimension ownership split across `ceo`, `product-manager`, `designer`, `finance`, and `marketing`.
- `AI/policies/coding.md` → "Reuse Before Creation" — mandatory search for existing code before writing new components/services/utilities, referenced from `backend` and `frontend`.
- `AI/policies/documentation.md` → "README Sync — In-Task, Not Post-Hoc".
- `.github/scripts/check_changelog.py` and a CI step enforcing that PRs touching `AI/**`, `CLAUDE.md`, or `README.md` also update this file, with a `[skip changelog]` escape for wording-only changes.
- `AI/workflows/framework-review.md` — human-triggered periodic audit of the framework layer for stale cross-references and contradictions.
- `CONTRIBUTING.md` → "Framework Definition of Done" and "Versioning framework files". See [DECISION-011](DECISIONS.md).

### Changed

- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/glossary.md`) reset from a fleshed-out example business to instructional placeholder scaffolding, ahead of the framework's first public release.
- `AI/commands/init-project.md` — `PRODUCT/COMPETITIVE_LANDSCAPE.md` added to the reset/emptied list; Step 8 (Reset AI Memory) now requires promoting reusable Critical/Important learnings to `AI/policies/` or `conventions.md` before deleting `AI/memory/learnings.md` and `conventions.md`. See [DECISION-011](DECISIONS.md).
- `AI/agents/designer.md` — added "Adapt To Product Context", explicit WCAG 2.1 AA compliance target, "Design Rigor By Stage", metrics thinking, and backend-collaboration notes.
- `README.md` — repository map updated to list the `framework-review` workflow.
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist items for the CHANGELOG/DECISIONS discipline above.

## How to add an entry

When a framework-layer change lands:

1. Add a bullet under `[Unreleased]`, in `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security` as appropriate.
2. On release, rename `[Unreleased]` to `[x.y.z] - YYYY-MM-DD` and start a fresh empty `[Unreleased]` above it.

Product-layer changes (a specific team's `DECISIONS.md`, `DOMAIN/`, etc.) belong in that product's own history — not here.
