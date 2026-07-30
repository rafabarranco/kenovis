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

### Changed

- Product-layer files (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/glossary.md`) reset from a fleshed-out example business to instructional placeholder scaffolding, ahead of the framework's first public release.

## How to add an entry

When a framework-layer change lands:

1. Add a bullet under `[Unreleased]`, in `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security` as appropriate.
2. On release, rename `[Unreleased]` to `[x.y.z] - YYYY-MM-DD` and start a fresh empty `[Unreleased]` above it.

Product-layer changes (a specific team's `DECISIONS.md`, `DOMAIN/`, etc.) belong in that product's own history — not here.
