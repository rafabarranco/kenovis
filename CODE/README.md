<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# CODE/

## What is this?

This is where Kenovis's own implementation lives: the CLI that installs and syncs the Kenovis AI-OS (this repository's Framework layer) into a customer's repository. See [DECISIONS.md](../DECISIONS.md) DECISION-013 and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) for why this product has no backend or database.

Currently empty. [PRODUCT/ROADMAP.md](../PRODUCT/ROADMAP.md) Phase 0 (build the CLI installer/sync tool) has not started yet — do not scaffold ahead of that phase.

## Structure

A single Node.js/TypeScript npm package — no monorepo needed for a CLI-only product in v1.

```
CODE/
├── src/         CLI implementation (see Layering below)
├── bin/         CLI entry point (the `kenovis` executable)
└── docs/        Implementation-level docs (local setup, publish runbook)
```

Keep `CODE/docs/` for implementation details only (how to run the CLI locally, how to publish a release). Business rules, product direction and architecture reasoning belong in the root-level [DOMAIN/](../DOMAIN/), [PRODUCT/](../PRODUCT/) and [ENGINEERING/](../ENGINEERING/) folders instead — see [AI/policies/documentation.md](../AI/policies/documentation.md).

## Layering

Code follows the layering defined in [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) → Suggested Project Structure, adapted for a CLI with no database or UI:

```
src/
├── domain/           Installation, Framework Release, Vertical, Agent Roster concepts
├── application/      install / sync / init command use cases
├── infrastructure/   Filesystem access to the target repo, npm registry checks
└── cli/              CLI entry point and argument parsing
```

The dependency direction still holds: nothing inside `domain/` may import from the layers around it. Anything under `infrastructure/filesystem/` that writes to a target repository must respect [DOMAIN/BUSINESS_RULES.md](../DOMAIN/BUSINESS_RULES.md) RULE-INST-01 and RULE-INST-02 — never overwrite a customer's real Product-layer content, never write outside version control's reach.

## Before adding anything here

Read [AI/commands/bootstrap.md](../AI/commands/bootstrap.md) first. Do not scaffold anything without understanding [COMPANY_OS.md](../COMPANY_OS.md), [DECISIONS.md](../DECISIONS.md) and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).
