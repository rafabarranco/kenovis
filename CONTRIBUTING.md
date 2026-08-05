# Contributing to Kenovis AI-OS

Thanks for considering a contribution.

## Two layers, one rule

This repository has two layers — see [README.md](README.md) and [CLAUDE.md](CLAUDE.md):

| Layer | Path | Accepts contributions? |
|---|---|---|
| **Framework** | `AI/`, `CLAUDE.md`, `README.md`, `CODE/README.md` | Yes — this is what the project is |
| **Product** | `COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, `DOMAIN/`, `ENGINEERING/`, `AUTOMATIONS/`, `AI/memory/`, `CODE/` | No — this is placeholder content showing the expected shape for someone starting their own product |

PRs that fill in the product layer with a real or fictional business will be closed. That layer is meant to stay empty scaffolding — see [AI/commands/init-project.md](AI/commands/init-project.md).

## What a good framework contribution looks like

- **Agents** (`AI/agents/`): a specialized role, tool-agnostic, reusable across any product built on this framework.
- **Workflows** (`AI/workflows/`): a repeatable process (feature, bugfix, release, etc.) that doesn't assume a specific tech stack or domain.
- **Policies** (`AI/policies/`): non-negotiable rules that hold regardless of product — e.g. "never trust the client," not "always use PostgreSQL."
- **Commands** (`AI/commands/`): entry points that orchestrate agents/workflows.
- **Templates** (`AI/templates/`): document skeletons (ADR, decision, feature plan, etc.).

Before adding a new agent, workflow, policy, or command, check whether an existing one already covers it. Prefer extending over duplicating.

## Rules

- **Stay tool-agnostic under `AI/`.** Per [DECISION-010](DECISIONS.md), the AI-OS must be followable by any AI tool, not just Claude Code. Tool-specific mechanisms (Skills, hooks, slash-command syntax) belong in the root `CLAUDE.md` only, never inside `AI/`. **Exception:** [DECISION-012](DECISIONS.md) carves out the `graphify` knowledge-graph CLI — `AI/commands/bootstrap.md` and `AI/workflows/*.md` reference `graphify query`/`explain`/`affected`/`god-nodes` directly. This is scoped to that one tool; don't use it as precedent for adding other tool-specific mechanisms inside `AI/`.
- **Stay domain-agnostic.** Don't bake in assumptions about a specific vertical, stack, or tenancy model. Where a policy needs to reference something product-specific (e.g. a tenant key), it should say "look it up in `ENGINEERING/DATABASE.md`," not assume a name.
- **No secrets, no real business data.** This applies to examples too — use placeholders, not anything resembling a real customer, company, or dataset.
- **Keep the `PROJECT-SPECIFIC` marker convention intact.** If you touch a product-layer file, the marker HTML comment on line 1 must survive.

## Framework Definition of Done

The framework asks products to keep a changelog and a decision log (`AI/policies/documentation.md`, `AI/memory/learnings.md`). It must hold itself to the same standard — a framework that only documents other people's decisions is not practicing what it enforces.

Before a framework-layer PR (touching `AI/`, `CLAUDE.md`, or `README.md`) is considered done:

- **CHANGELOG.md** — add a bullet under `[Unreleased]` describing what changed. CI checks this automatically for any PR touching `AI/**`, `CLAUDE.md`, or `README.md`. If the change is wording/typo-only and doesn't alter behavior, include `[skip changelog]` in the PR title or description instead.
- **DECISIONS.md** — add an entry when the change alters an agent's responsibilities, a workflow's phases, or a policy's mechanics (not for wording clarity or typo fixes). This is a judgment call, not CI-enforced — explain the reasoning in the PR description either way, per the rule below.

## Versioning framework files

Files under `AI/agents/`, `AI/workflows/`, `AI/policies/`, `AI/commands/`, and `AI/templates/` carry a `Version: X.Y` header. Keep it honest:

- Bump the **minor** version when the file's content changes in a way that also earns a `CHANGELOG.md` bullet.
- Bump the **major** version on a breaking restructure of the file — a full rewrite, a renumbered set of phases/sections, or a change that invalidates how other files reference it.
- Leave it unchanged for typo/wording-only edits (the same cases that qualify for `[skip changelog]`).

A stale version number next to heavily edited content is worse than no version number — it tells the next reader "unchanged" when it isn't.

## Knowledge graph (graphify)

This repo uses [graphify](https://graphify.net/) to keep context loading (bootstrap, feature/bugfix/review workflows) cheap in tokens — agents query a graph instead of reading the full doc/code tree every session. See [DECISION-012](DECISIONS.md).

Setup, once per clone:

```
pip install graphifyy   # or: uv tool install graphifyy / pipx install graphifyy
graphify install --project --strict --platform claude
graphify extract .      # first build; needs an LLM backend for .md/.pdf/.image files —
                         # running inside Claude Code reuses your IDE session, no API key needed.
                         # Headless/CI: set one of GEMINI_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY, etc.,
                         # or pass --code-only to skip semantic extraction entirely (AST only, no key).
```

After changing code: `graphify update .` (AST-only, no LLM cost, keeps the graph current). `graphify-out/` is gitignored — regenerate locally, never commit it.

## Submitting a change

1. Fork the repo and branch from `main`.
2. Make the change, scoped to one concern (one agent, one policy, one fix).
3. If the change affects how agents behave, explain the reasoning in the PR description — this framework runs on documented decisions, not silent preference changes.
4. Open a PR. CI checks markdown links, the `PROJECT-SPECIFIC` marker convention, and (for framework-layer PRs) that `CHANGELOG.md` was updated.

## Reporting issues

Use the issue templates under `.github/ISSUE_TEMPLATE/`. For anything unclear about how to structure a contribution, open a discussion first rather than a large PR.

## Code of conduct

Be respectful, be constructive, assume good faith. Disagreements about framework design are welcome — personal attacks are not.
