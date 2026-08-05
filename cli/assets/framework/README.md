# Kenovis AI-OS — Framework Layer

This directory is the Kenovis AI-OS Framework layer: a reusable, product-agnostic
system of agents, workflows, policies, commands, and templates for AI-assisted
engineering. It was installed here by the `kenovis` CLI and is meant to be synced,
not hand-edited — think of it the way you'd think of `node_modules/` or `.venv/`:
tool-owned, not yours to maintain by hand.

## What lives where

- `AI/SYSTEM.md` — the entry point. Read this first; it explains how AI agents
  should operate in this repository.
- `AI/agents/` — specialized role definitions (CTO, product manager, designer,
  frontend, backend, database, security, reviewer, and more).
- `AI/workflows/` — repeatable processes (feature, bugfix, release, architecture, review).
- `AI/policies/` — non-negotiable engineering rules (architecture, coding, security, testing).
- `AI/commands/` — entry points your AI tool triggers (`/next`, `/feature`, `/bug`, ...).
- `AI/templates/` — document skeletons (ADR, decision, feature plan, bug report).

## What does NOT live here

Your product's own context — company vision, decisions, domain model, roadmap,
architecture, and your own code — lives at your repository's root, fully visible,
never inside `.kenovis/`. That separation is deliberate: this directory is Kenovis's
infrastructure; your repository root is yours.

## Updating

Once the `kenovis sync` command exists, it updates this directory to a newer
Framework Release without ever touching anything outside `.kenovis/` or your
repository root's `CLAUDE.md` stub. Until then, treat this directory as installed
by `kenovis init` — re-run that command with `--force` to update manually.

## Tool compatibility

Everything under `AI/` is plain, tool-agnostic markdown — readable by any AI coding
tool, not just the one that installed it. `CLAUDE.md` at your repository root is a
small stub specific to Claude Code; other tools should load `AI/SYSTEM.md` directly
as their entry point instead.
