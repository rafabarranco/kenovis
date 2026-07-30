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

- **Stay tool-agnostic under `AI/`.** Per [DECISION-010](DECISIONS.md), the AI-OS must be followable by any AI tool, not just Claude Code. Tool-specific mechanisms (Skills, hooks, slash-command syntax) belong in the root `CLAUDE.md` only, never inside `AI/`.
- **Stay domain-agnostic.** Don't bake in assumptions about a specific vertical, stack, or tenancy model. Where a policy needs to reference something product-specific (e.g. a tenant key), it should say "look it up in `ENGINEERING/DATABASE.md`," not assume a name.
- **No secrets, no real business data.** This applies to examples too — use placeholders, not anything resembling a real customer, company, or dataset.
- **Keep the `PROJECT-SPECIFIC` marker convention intact.** If you touch a product-layer file, the marker HTML comment on line 1 must survive.

## Submitting a change

1. Fork the repo and branch from `main`.
2. Make the change, scoped to one concern (one agent, one policy, one fix).
3. If the change affects how agents behave, explain the reasoning in the PR description — this framework runs on documented decisions, not silent preference changes.
4. Open a PR. CI checks markdown links and the `PROJECT-SPECIFIC` marker convention.

## Reporting issues

Use the issue templates under `.github/ISSUE_TEMPLATE/`. For anything unclear about how to structure a contribution, open a discussion first rather than a large PR.

## Code of conduct

Be respectful, be constructive, assume good faith. Disagreements about framework design are welcome — personal attacks are not.
