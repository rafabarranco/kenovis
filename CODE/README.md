# CODE/

## What is this?

This is where the product's actual implementation lives — the software itself, as opposed to the business, product, domain and engineering documentation that lives at the repository root.

Currently empty. The first roadmap phase (see [PRODUCT/ROADMAP.md](../PRODUCT/ROADMAP.md)) has not started yet.

## Structure

```
CODE/
├── apps/        Deployable applications (web, mobile, and/or api)
├── packages/    Shared code between apps (domain logic, UI kit, types, config)
└── docs/        Implementation-level docs (local setup, runbooks, migration notes)
```

`CODE/docs/` is for implementation details only (how to run something locally, how to apply a migration). Business rules, product direction and architecture reasoning belong in the root-level [DOMAIN/](../DOMAIN/), [PRODUCT/](../PRODUCT/) and [ENGINEERING/](../ENGINEERING/) folders instead — see [AI/policies/documentation.md](../AI/policies/documentation.md).

## Layering

Within each app or package under `apps/`/`packages/`, code should follow the layering defined in [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md):

```
src/
├── domain/          Entities, business rules, invariants
├── application/      Use cases, workflows
├── infrastructure/   Database access, external APIs, storage
└── presentation/      Screens, components, hooks
```

## Before adding anything here

Read [AI/commands/bootstrap.md](../AI/commands/bootstrap.md) first. Do not scaffold apps or packages without understanding [COMPANY_OS.md](../COMPANY_OS.md), [DECISIONS.md](../DECISIONS.md) and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).
