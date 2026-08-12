<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

ARCHITECTURE.md

Software Architecture

Version: 1.6
---
Purpose

This document defines the technical architecture principles of the platform.

The objective is to create a system that is:

- Maintainable.
- Scalable.
- Secure.
- Simple to evolve.
- Suitable for AI-assisted development.
---
Architecture Philosophy

The architecture follows these principles:

Simple first.

Scalable when necessary.

Business logic protected.

The system should avoid premature complexity.

We optimize for:

1. Fast iteration.
2. Clean domain boundaries.
3. Long-term maintainability.
---
High-Level Architecture

The platform follows a modular architecture:

Client Applications

        |

        |

Application Services

        |

        |

Domain Logic

        |

        |

Infrastructure

        |

        |

External Services

---
Technology Stack

Per DECISIONS.md DECISION-013: no backend, no database, no hosted service in v1. The product is the Framework layer itself, distributed as a CLI.

- Frontend (web / mobile): none. No UI in v1 — CLI only.
- CLI/tooling layer: Node.js + TypeScript, distributed as an npm package, invoked via `npx` — an assumption carried over from this initialization, not yet independently confirmed; revisit if it doesn't hold.
- Backend / API layer: none. No server component in v1.
- Database engine: none. Installation state lives entirely inside the customer's own repository (framework version marker, Product-layer files) — never in a Kenovis-operated database. See ENGINEERING/DATABASE.md.
- Authentication approach: none. No accounts, no login. Distribution auth is the npm registry / GitHub, not an application-level identity system.
- Deployment target: npm registry (public package) plus GitHub (source, releases, CHANGELOG.md).
---
Static Analysis

Type checker: `npm run typecheck` (`tsc -p tsconfig.json --noEmit`), strict mode on. Run from `cli/`.

Tests: `npm test` (`node --test`, Node's built-in test runner — no test framework dependency added; revisit if assertions/mocking needs outgrow `node:assert/strict`).

No linter or formatter yet. Not an oversight: the codebase is currently 8 small files with `strict` TypeScript already catching the errors a linter would add the most value on. Add one (justified, not by default) once the codebase grows past what code review alone keeps consistent — see .kenovis/AI/policies/architecture.md → "Reuse" and "Simplicity First" before adding it preemptively.
---
Hard Rules (No Exceptions)

- The CLI must never create a Product-layer file in a target repository at all — not even a placeholder. `init`/`add`/`sync` write `.kenovis/`, the root `CLAUDE.md` stub and its hash sidecar, and nothing else. The Product layer's shape ships as templates inside the bundle (`.kenovis/AI/templates/product-layer/`) and is authored by `/init-project` or `/adopt-project`, which can ask the human before writing to a path; a non-interactive CLI cannot. See DECISIONS.md DECISION-021.
- The CLI must never write to a target repository's Product-layer files if they already contain real (non-placeholder) content, without explicit confirmation — see DOMAIN/BUSINESS_RULES.md RULE-INST-01.
- The CLI must never require network access to a Kenovis-operated server — there is none. Install/sync only touch the npm registry and the local filesystem.
- The CLI must never execute code found inside the target repository it is installing into.
- The CLI must write the Framework layer under `.kenovis/` in the target repository (`.kenovis/AI/`, `.kenovis/README.md`), never at repo root — except `CLAUDE.md` (stub loading `.kenovis/AI/SYSTEM.md`) and `.claude/`, which stay at repo root because Claude Code requires it. The CLI must never overwrite, append to, or otherwise touch the target repository's own existing `README.md`, and must never fabricate one if none exists. See DECISIONS.md DECISION-017.
- The CLI must never shell out to an AI tool's binary (`claude` or otherwise) to auto-run `/init-project` or `/adopt-project`. Auto-triggering those commands is achieved only through the `CLAUDE.md` stub's content (parametrized by pending/steady-state) and the `.kenovis/.setup-pending` marker file — both plain, tool-agnostic filesystem artifacts, never a spawned external process. See DECISIONS.md DECISION-018.
- Exception to the rule above: this repository's own root `README.md` and root `CLAUDE.md` are never written or overwritten by `kenovis init`/`add`/`sync`, even if one of those commands is ever run against this repository's own working tree. Both stay hand-authored at repo root — this repository is the Framework layer's origin and its own dogfooded product simultaneously, not a generic Installation, and its root README/CLAUDE.md carry real content (public landing page; repo-specific Role/Layers/Source-Of-Truth/graphify prose) a generated stub would discard. Only `.kenovis/AI/agents/`, `.kenovis/AI/workflows/`, `.kenovis/AI/policies/`, `.kenovis/AI/commands/`, `.kenovis/AI/templates/`, `.kenovis/AI/SYSTEM.md` relocate to `.kenovis/AI/` for this repository. See DECISIONS.md DECISION-020.
---
CI Guards Are A Local Net, And Each One Names Its Framework-Layer Home

`ls .github/scripts/check_*.py | wc -l` → **10** (2026-08-13). Guards a customer Installation runs: **0**. `cli/scripts/bundle-framework-assets.mjs` ships `.kenovis/AI/` and the customer README; `.github/` is not in the bundle, verified in PRODUCT/ROADMAP.md Phase 1 item 17.

That split is correct and is not a gap to close by shipping the scripts. Per DECISIONS.md DECISION-026 and `.kenovis/AI/policies/testing.md` → "A Guard Belongs Where The Work Is Loaded", the rule is what travels: it lives in the policy, command, workflow, agent or template the AI loads to do the work, and `sync` delivers it. The script is this repository's own net over its own dogfooding.

**Where a disposition lives: the guard's own module docstring**, on a `Framework-layer home:` line naming the policy section, command step or template that carries the rule — or recording that the rule has no Framework-layer form, and why. One location, read at the moment the guard is edited. A separate register would be a second copy of the same fact and would drift from the scripts within a round or two.

A guard whose line reads `not yet dispositioned` is outstanding work under PRODUCT/ROADMAP.md item 37, which works them one at a time rather than as a sweep.

Adding a guard without that line is the failure this section exists to stop: it is enforcement that ends at this repository's edge while reading as if it did not.
---
Database

None in v1 — see ENGINEERING/DATABASE.md. No database engine is chosen until a hosted layer is designed (PRODUCT/ROADMAP.md Phase 4).
---
Authentication

Authentication is handled through a dedicated identity system.

Requirements:

- Secure login.
- Password management.
- Session handling.
- Access control scoped to the tenancy model chosen below.

Authentication is separate from authorization.
---
Authorization Model

Not applicable in v1 — there are no accounts and no shared backend to authorize against. Each Installation runs entirely inside the customer's own repository, under the customer's own filesystem/git permissions.
---
Tenancy Model

Not applicable in v1. Every Installation is single-tenant by construction — it is a customer's own repository, not a row in a shared database. There is no tenant key because there is no shared backend to key against. Revisit only if/when a hosted layer is built (PRODUCT/ROADMAP.md Phase 4); .kenovis/AI/policies/database.md and .kenovis/AI/agents/database.md must keep treating this product as tenantless until this section is explicitly updated.
---
Domain Architecture

The codebase should separate:

Domain

Application

Infrastructure

Presentation

---
Domain Layer

Contains:

- Entities.
- Value objects.
- Business rules.
- Domain validations.

Should not depend on:

- Database.
- UI.
- External services.
---
Application Layer

Contains:

- Use cases.
- Workflows.
- Commands.
- Queries.
---
Infrastructure Layer

Contains:

- Database access.
- External APIs.
- File storage.
- Notifications.
---
Presentation Layer

Contains:

- Screens.
- Components.
- User interaction.

Should not contain business rules.
---
Suggested Project Structure

This structure lives inside cli/src/ (see cli/README.md). Adapted for a CLI product: no database or API infrastructure, and "presentation" is the CLI command surface, not a UI.

src/

├── domain/

│   ├── installation/         Installation, Framework Release concepts

│   └── vertical/              Vertical, Agent Roster concepts


├── application/

│   ├── commands/               install, sync, init use cases

│   └── services/


├── infrastructure/

│   ├── filesystem/             reading/writing the target repo

│   └── registry/                npm registry / version checks


└── cli/

    └── bin/                     CLI entry point

---
Feature-Based Organization

As the application grows, prefer feature boundaries over huge shared folders, mirroring the core entities in DOMAIN/DOMAIN_MODEL.md.
---
Database Architecture

The database should represent business concepts.

Avoid:

- Generic tables.
- Over-normalization.
- Ambiguous fields.

Prefer:

Clear tables.

Clear relationships.

Clear ownership.
---
API Philosophy

APIs should represent business actions.

Prefer:

POST /[resources]

POST /[resources]/{id}/[sub-resource]

over:

POST /updateThing

---
Error Handling

Errors must be meaningful.

Avoid:

Something went wrong

Prefer:

[SPECIFIC_ERROR_CODE]

[Human-readable explanation of what constraint was violated.]

---
Validation Strategy

Validation happens at multiple levels:

Client

Improve user experience.

Application

Protect workflows.

Database

Protect data integrity.
---
State Management

State should be simple.

Avoid unnecessary global state.

Prefer:

- Local state.
- Server state.
- Clear data ownership.
---
File Organization Rules

Each file should have one clear responsibility.

Avoid:

- Giant files.
- Mixed concerns.
- Utility dumping grounds.
---
Dependency Rules

Dependencies must justify their existence.

Before adding a library:

Ask:

- Does it solve a real problem?
- Is maintenance reliable?
- Does it increase complexity?
---
Testing Architecture

Testing priority:

1. Domain Tests

Highest value. Cover core business calculations and rules.
---
2. Integration Tests

Verify:

- Database behavior.
- Authentication.
- Workflows.
---
3. UI Tests

Cover critical user flows.
---
Deployment Philosophy

Initial deployment should prioritize:

- Reliability.
- Simplicity.
- Low operational cost.

Avoid unnecessary infrastructure.
---
Observability

The system should eventually support:

- Error tracking.
- Performance monitoring.
- Usage analytics.
---
Security Architecture

Security principles:

- Least privilege.
- Server-side validation.
- Tenant isolation, if the product is multi-tenant.
- Auditability.
---
Scalability Strategy

The expected evolution:

Phase 1:

Single application.

Phase 2:

Modular services.

Phase 3:

Independent scalable components.

Do not start with microservices.
---
AI Development Considerations

The architecture must be understandable by AI agents.

Prefer:

- Explicit naming.
- Predictable structures.
- Clear boundaries.
- Documented decisions.

Avoid:

- Clever patterns.
- Hidden behavior.
- Excessive abstraction.
---
Architecture Decision Process

Any significant technical decision requires:

1. Problem definition.
2. Alternatives considered.
3. Decision.
4. Reason.
5. Consequences.

Document in:

DECISIONS.md

---
Final Architecture Principle

The best architecture is not the most advanced one.

It is the simplest architecture that allows the company to win.
