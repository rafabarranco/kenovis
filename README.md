# Kenovis

## What is this?

Kenovis is an **AI Operating System (AI-OS)**: a framework for running a complete product and engineering organization with AI agents instead of a traditional team.

It gives an AI tool the context, roles, processes and rules it needs to behave like a company — CEO, CTO, product, design, engineering, security, review — rather than like a code generator.

The repository contains **two layers**:

| Layer | What it is | Changes per product? |
|---|---|---|
| **Framework** | The AI-OS itself: [AI/](AI/) except `memory/`, plus [CLAUDE.md](CLAUDE.md) and this README | No. Reusable as-is |
| **Product** | The company and product being built with it | Yes. Rewritten every time |

Everything in the product layer is currently a **placeholder** describing an example company. It is there to show the expected shape and depth of each document, not to define your product.

## Starting a new product

Read [AI/commands/init-project.md](AI/commands/init-project.md). It lists exactly which files to empty and rewrite, in which order, and what to leave untouched.

Product-layer files carry this marker on their first line:

```
<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->
```

If a file has that marker, it describes the example company and must be replaced. If it does not, it is framework and should work unchanged.

## Adopting an existing product

If your repository already contains a real implementation that predates the Kenovis AI-OS — wherever it lives — do not run `/init-project`; it asks you to decide a stack that is already running and does not know how to leave existing implementation alone.

Read [AI/commands/adopt-project.md](AI/commands/adopt-project.md) instead. It audits the existing code first, then asks you to confirm or correct what it found, and derives the product layer from that — rather than deciding it from scratch.

## Working on an existing product

Read in this order, per the Session Initialization Protocol in [AI/SYSTEM.md](AI/SYSTEM.md):

1. [COMPANY_OS.md](COMPANY_OS.md) — vision, thesis, principles.
2. [DECISIONS.md](DECISIONS.md) — decisions made and why.
3. [AI/SYSTEM.md](AI/SYSTEM.md) — how AI agents operate here.

Then load context relevant to your task: [PRODUCT/](PRODUCT/), [DOMAIN/](DOMAIN/), [ENGINEERING/](ENGINEERING/), [AUTOMATIONS/](AUTOMATIONS/).

Then run [AI/commands/bootstrap.md](AI/commands/bootstrap.md) before touching anything.

Do not modify code or documentation before understanding this context.

## Repository map

Framework layer — reusable:

| Path | Contains |
|---|---|
| [AI/SYSTEM.md](AI/SYSTEM.md) | How the AI-OS operates. Entry point for non-Claude Code tools |
| [AI/agents/](AI/agents/) | 12 specialized roles (CEO, CTO, product, design, frontend, backend, database, security, review, marketing, finance, legal) |
| [AI/workflows/](AI/workflows/) | Execution processes (feature, bugfix, hotfix, architecture, release, review, roadmap, framework-review) |
| [AI/policies/](AI/policies/) | Non-negotiable rules (architecture, coding, database, security, testing, git, documentation) |
| [AI/commands/](AI/commands/) | Entry points (init-project, adopt-project, bootstrap, next, feature, bug, review, release, architect, analyze, explain) |
| [AI/templates/](AI/templates/) | Document templates (ADR, decision, feature plan, bug report, release notes) |
| [CLAUDE.md](CLAUDE.md) | Constitution auto-loaded by Claude Code |

Product layer — rewritten per product:

| Path | Contains |
|---|---|
| [COMPANY_OS.md](COMPANY_OS.md) | Company vision, thesis, principles — highest-level context |
| [DECISIONS.md](DECISIONS.md) | Log of important company/product/engineering decisions |
| [PRODUCT/](PRODUCT/) | Features, roadmap, user research |
| [DOMAIN/](DOMAIN/) | Business entities and rules |
| [ENGINEERING/](ENGINEERING/) | Architecture, database and security design |
| [AUTOMATIONS/](AUTOMATIONS/) | Onboarding, release and feedback processes |
| [AI/memory/](AI/memory/) | Glossary, conventions and learnings accumulated by this product |
| [cli/](cli/) | Actual product implementation. This product chose a top-level `cli/` directory for it — see [ENGINEERING/ARCHITECTURE.md](ENGINEERING/ARCHITECTURE.md) → "Suggested Project Structure". Not a framework requirement: a different product may organize its code anywhere. |

## Source of truth

When information conflicts:

```
COMPANY_OS.md → DECISIONS.md → DOMAIN/ → PRODUCT/ → ENGINEERING/ → code
```

Code is never the source of truth.

## Tooling

Primary development interface: **Claude Code** (VS Code extension), which auto-loads the root [CLAUDE.md](CLAUDE.md).

The AI-OS under [AI/](AI/) is intentionally tool-agnostic plain markdown so it can also be followed by other AI tooling. A tool other than Claude Code should load [AI/SYSTEM.md](AI/SYSTEM.md) as its entry point. See [DECISION-010](DECISIONS.md).
