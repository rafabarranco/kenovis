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
- [DECISION-012](DECISIONS.md) — scoped exception to DECISION-010's tool-agnosticism for `graphify` (knowledge-graph CLI), to cut per-session token cost of `AI/commands/bootstrap.md`'s full-tree reads. `graphify` installed project-scoped (`.claude/skills/graphify/`, `.claude/settings.json` PreToolUse hooks in strict mode, `## graphify` section in `CLAUDE.md`); `graphify-out/` gitignored, regenerated locally. `CONTRIBUTING.md` → "Knowledge graph (graphify)" setup section.
- `AI/commands/adopt-project.md` — brownfield counterpart to `init-project.md`. Audits `CODE/` first (stack, DB, auth, tenancy, real domain entities, confidence-tagged with file/line citations) before touching any product-layer document; never empties or rewrites `CODE/` beyond its README; verifies completion by contrast against the code instead of by absence of example terms. See [DECISION-014](DECISIONS.md).
- `.claude/commands/adopt-project.md` — Claude Code slash-command wrapper for `/adopt-project`, same pattern as the existing `/init-project` wrapper.

### Changed

- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/glossary.md`) reset from a fleshed-out example business to instructional placeholder scaffolding, ahead of the framework's first public release.
- `AI/commands/init-project.md` — `PRODUCT/COMPETITIVE_LANDSCAPE.md` added to the reset/emptied list; Step 8 (Reset AI Memory) now requires promoting reusable Critical/Important learnings to `AI/policies/` or `conventions.md` before deleting `AI/memory/learnings.md` and `conventions.md`. See [DECISION-011](DECISIONS.md).
- `AI/agents/designer.md` — added "Adapt To Product Context", explicit WCAG 2.1 AA compliance target, "Design Rigor By Stage", metrics thinking, and backend-collaboration notes.
- `README.md` — repository map updated to list the `framework-review` workflow.
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist items for the CHANGELOG/DECISIONS discipline above.
- `AI/commands/bootstrap.md` (2.0 → 2.1) — Steps 2-4 query the `graphify` knowledge graph before reading `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AI/memory/*`, `CODE/` in full; full read is now the fallback, not the default. See [DECISION-012](DECISIONS.md).
- `AI/workflows/feature.md` (3.0 → 3.1), `AI/workflows/bugfix.md` (2.0 → 2.1), `AI/workflows/review.md` (2.0 → 2.1) — Phase 1 re-queries the graph instead of re-running a full bootstrap read when one already ran this session; `graphify affected`/`graphify explain` referenced for technical analysis, root-cause tracing, and change-scope review once `CODE/` has content.
- `CONTRIBUTING.md` — tool-agnostic rule now documents the scoped `graphify` exception ([DECISION-012](DECISIONS.md)); added a "Knowledge graph (graphify)" setup section.
- `.gitignore` — `graphify-out/` (regenerate locally, never versioned; can exceed the tool's 512MiB `graph.json` cap on large repos).
- `AI/commands/init-project.md` (1.1 → 1.2) — Trigger section now routes repositories where `CODE/` already holds a real implementation to `AI/commands/adopt-project.md` instead. See [DECISION-014](DECISIONS.md).
- `AI/SYSTEM.md` (1.0 → 1.1) — Commands example list now includes `/adopt-project` alongside `/init-project` as one of the two possible first commands in a repository.
- `README.md` — new "Adopting an existing product" section; repository map lists `adopt-project`.
- `PRODUCT/ROADMAP.md` (1.0 → 1.1) — Phase 0 CLI install command scoped to detect greenfield vs. brownfield target repositories and route to `/init-project` or `AI/commands/adopt-project.md` accordingly; Phase 0 Success Criteria updated to match.

## How to add an entry

When a framework-layer change lands:

1. Add a bullet under `[Unreleased]`, in `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security` as appropriate.
2. On release, rename `[Unreleased]` to `[x.y.z] - YYYY-MM-DD` and start a fresh empty `[Unreleased]` above it.

Product-layer changes (a specific team's `DECISIONS.md`, `DOMAIN/`, etc.) belong in that product's own history — not here.
