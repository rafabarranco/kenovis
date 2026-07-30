<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# CODE/

## What is this?

This is where the product's actual implementation lives — the software itself, as opposed to the business, product, domain and engineering documentation that lives at the repository root.

Currently empty. The first roadmap phase (see [PRODUCT/ROADMAP.md](../PRODUCT/ROADMAP.md)) has not started yet.

## Structure

The repository topology is a product decision, not a framework rule. Record it in [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) and describe it here.

The example below is one option — a monorepo with several deployables. A single application, a library, or a set of independent services are equally valid, and each produces a different layout.

```
CODE/
├── apps/        Deployable applications
├── packages/    Shared code between apps
└── docs/        Implementation-level docs (local setup, runbooks, migration notes)
```

Whatever the topology, keep `CODE/docs/` for implementation details only (how to run something locally, how to apply a migration). Business rules, product direction and architecture reasoning belong in the root-level [DOMAIN/](../DOMAIN/), [PRODUCT/](../PRODUCT/) and [ENGINEERING/](../ENGINEERING/) folders instead — see [AI/policies/documentation.md](../AI/policies/documentation.md).

## Layering

Code follows the layering defined in [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).

[AI/policies/architecture.md](../AI/policies/architecture.md) requires business logic to be independent of frameworks, transport and storage. How that separation is expressed on disk is this product's choice — the example below is the layered structure the architecture policy describes:

```
src/
├── domain/           Entities, business rules, invariants
├── application/      Use cases, workflows
├── infrastructure/   Database access, external APIs, storage
└── presentation/     User-facing entry points
```

Small products may collapse these into fewer directories. The dependency direction still holds: nothing inside `domain/` may import from the layers around it.

## Before adding anything here

Read [AI/commands/bootstrap.md](../AI/commands/bootstrap.md) first. Do not scaffold anything without understanding [COMPANY_OS.md](../COMPANY_OS.md), [DECISIONS.md](../DECISIONS.md) and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).
