# Changelog

All notable changes to the Kenovis AI-OS **framework layer** are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This log tracks the reusable framework (`AI/`, `CLAUDE.md`, `README.md`, `cli/README.md`) — not product-layer content, which is scaffolding meant to be rewritten per product via [AI/commands/init-project.md](AI/commands/init-project.md).

## [Unreleased]

### Added

- `README.md` → "Getting started" section: documents `npx kenovis init` / `npx kenovis sync` as the actual installation path, ahead of "Starting a new product" / "Adopting an existing product". Closes a gap where the root README never mentioned the published CLI at all, blocking PRODUCT/ROADMAP.md Phase 1 MVP Success Criteria ("a team outside Kenovis can install the CLI... without help") and `AI/policies/documentation.md`'s README requirement to answer "How do I start?".
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
- `AI/commands/adopt-project.md` — brownfield counterpart to `init-project.md`. Audits `cli/` first (stack, DB, auth, tenancy, real domain entities, confidence-tagged with file/line citations) before touching any product-layer document; never empties or rewrites `cli/` beyond its README; verifies completion by contrast against the code instead of by absence of example terms. See [DECISION-014](DECISIONS.md).
- `.claude/commands/adopt-project.md` — Claude Code slash-command wrapper for `/adopt-project`, same pattern as the existing `/init-project` wrapper.
- `cli/README.md` — documents the new `sync` command (`kenovis sync <targetDir> [--source <dir>]`): mirror-replaces an existing Installation's `.kenovis/` and rewrites the `CLAUDE.md` stub, deleting files retired in a newer Framework Release rather than leaving them stale, while never touching Product-layer files or the target repository's own code. Reversibility (RULE-INST-02) comes from the target's own git-tracked `.kenovis/`, not a CLI-side diff engine — that ergonomic layer stays scoped to PRODUCT/ROADMAP.md Phase 2.
- `cli/README.md` → "Cutting a release" — documents the tag/GitHub-Release steps that trigger `.github/workflows/publish.yml`'s `npm publish --provenance` from CI.

### Changed

- `cli/README.md` — Phase 0 item 3 marked done (was "in progress"); NPM_TOKEN paragraph corrected to state `kenovis@0.1.0` is live on npm instead of "not yet configured as of this writing", which was stale since the DONE (2026-08-05) publish entry landed in PRODUCT/ROADMAP.md.
- `ENGINEERING/ARCHITECTURE.md` (1.0 → 1.1) → "Hard Rules": the CLI must write the Framework layer under `.kenovis/` in the target repository (hidden, dot-directory convention), never at repo root — except `CLAUDE.md` (stub) and `.claude/`, forced there by Claude Code autoload. The CLI must never touch a target repository's own existing `README.md`; Kenovis's explanatory README lives at `.kenovis/README.md` instead. See [DECISION-017](DECISIONS.md), the ADR that unblocks PRODUCT/ROADMAP.md Phase 0 item 3 (the CLI build).
- No framework-mandated directory name for any Installation's code. `AI/commands/bootstrap.md` (2.1 → 2.4), `AI/commands/adopt-project.md` (1.0 → 1.3), `AI/commands/init-project.md` (1.2 → 1.4), `AI/SYSTEM.md` (1.1 → 1.3), `AI/workflows/architecture.md` (2.0 → 2.1), `AI/workflows/roadmap.md` (2.0 → 2.1), `AI/workflows/feature.md` (3.1 → 3.2), `AI/workflows/bugfix.md` (2.1 → 2.2), `AI/workflows/review.md` (2.1 → 2.2), `AI/policies/coding.md` (2.1 → 2.2), `AI/policies/documentation.md` (2.1 → 2.2), `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `DOMAIN/DOMAIN_MODEL.md` (1.0 → 1.2), `DOMAIN/BUSINESS_RULES.md` (1.0 → 1.1) — removed a latent self-contradiction (`bootstrap.md` stated implementation "lives under a dedicated directory" as a hard rule while also saying "do not assume any particular directory layout") and retired a dedicated per-implementation `README.md` as a framework-referenced concept in favor of the single existing pointer, `ENGINEERING/ARCHITECTURE.md` → "Suggested Project Structure". Adoption never relocates a customer's existing implementation, and no Installation is required to have a directory with any specific name. See [DECISION-016](DECISIONS.md) (supersedes DECISION-015, same day).
- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/glossary.md`) reset from a fleshed-out example business to instructional placeholder scaffolding, ahead of the framework's first public release.
- `AI/commands/init-project.md` — `PRODUCT/COMPETITIVE_LANDSCAPE.md` added to the reset/emptied list; Step 8 (Reset AI Memory) now requires promoting reusable Critical/Important learnings to `AI/policies/` or `conventions.md` before deleting `AI/memory/learnings.md` and `conventions.md`. See [DECISION-011](DECISIONS.md).
- `AI/agents/designer.md` — added "Adapt To Product Context", explicit WCAG 2.1 AA compliance target, "Design Rigor By Stage", metrics thinking, and backend-collaboration notes.
- `README.md` — repository map updated to list the `framework-review` workflow.
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist items for the CHANGELOG/DECISIONS discipline above.
- `AI/commands/bootstrap.md` (2.0 → 2.1) — Steps 2-4 query the `graphify` knowledge graph before reading `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AI/memory/*`, `cli/` in full; full read is now the fallback, not the default. See [DECISION-012](DECISIONS.md).
- `AI/workflows/feature.md` (3.0 → 3.1), `AI/workflows/bugfix.md` (2.0 → 2.1), `AI/workflows/review.md` (2.0 → 2.1) — Phase 1 re-queries the graph instead of re-running a full bootstrap read when one already ran this session; `graphify affected`/`graphify explain` referenced for technical analysis, root-cause tracing, and change-scope review once `cli/` has content.
- `CONTRIBUTING.md` — tool-agnostic rule now documents the scoped `graphify` exception ([DECISION-012](DECISIONS.md)); added a "Knowledge graph (graphify)" setup section.
- `.gitignore` — `graphify-out/` (regenerate locally, never versioned; can exceed the tool's 512MiB `graph.json` cap on large repos).
- `AI/commands/init-project.md` (1.1 → 1.2) — Trigger section now routes repositories where `cli/` already holds a real implementation to `AI/commands/adopt-project.md` instead. See [DECISION-014](DECISIONS.md).
- `AI/SYSTEM.md` (1.0 → 1.1) — Commands example list now includes `/adopt-project` alongside `/init-project` as one of the two possible first commands in a repository.
- `README.md` — new "Adopting an existing product" section; repository map lists `adopt-project`.
- `PRODUCT/ROADMAP.md` (1.0 → 1.1) — Phase 0 CLI install command scoped to detect greenfield vs. brownfield target repositories and route to `/init-project` or `AI/commands/adopt-project.md` accordingly; Phase 0 Success Criteria updated to match.

## How to add an entry

When a framework-layer change lands:

1. Add a bullet under `[Unreleased]`, in `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security` as appropriate.
2. On release, rename `[Unreleased]` to `[x.y.z] - YYYY-MM-DD` and start a fresh empty `[Unreleased]` above it.

Product-layer changes (a specific team's `DECISIONS.md`, `DOMAIN/`, etc.) belong in that product's own history — not here.
