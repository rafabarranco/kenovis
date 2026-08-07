# Kenovis

## What is this?

Kenovis is an **AI Operating System (AI-OS)**: a framework for running a complete product and engineering organization with AI agents instead of a traditional team.

It gives an AI tool the context, roles, processes and rules it needs to behave like a company — CEO, CTO, product, design, engineering, security, review — rather than like a code generator.

The repository contains **two layers**:

| Layer | What it is | Changes per product? |
|---|---|---|
| **Framework** | The AI-OS itself: [.kenovis/AI/](.kenovis/AI/), plus [CLAUDE.md](CLAUDE.md) and this README | No. Reusable as-is |
| **Product** | The company and product being built with it | Yes. Rewritten every time |

Everything in the product layer is currently a **placeholder** describing an example company. It is there to show the expected shape and depth of each document, not to define your product.

## Getting started

Install the Framework layer into your own repository with the CLI ([`kenovis` on npm](https://www.npmjs.com/package/kenovis)):

```
npx kenovis init
```

This writes the Framework layer into `.kenovis/` and a `CLAUDE.md` stub — never touches your existing `README.md` or code (DECISIONS.md → DECISION-016, DECISION-017). It inspects your repository first and tells you whether to follow "Starting a new product" (below) or "Adopting an existing product", based on what it actually finds — no flags required.

To pull a newer Framework Release into an Installation later:

```
npx kenovis sync
```

`sync` mirror-replaces `.kenovis/` only. Product-layer files and your own code are never touched. Reversible via your repository's own `git diff` / `git checkout`. See [cli/README.md](cli/README.md) for the full command reference.

## Starting a new product

Read [.kenovis/AI/commands/init-project.md](.kenovis/AI/commands/init-project.md). It lists exactly which files to empty and rewrite, in which order, and what to leave untouched.

Product-layer files carry this marker on their first line:

```
<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See .kenovis/AI/commands/init-project.md -->
```

If a file has that marker, it describes the example company and must be replaced. If it does not, it is framework and should work unchanged.

## Adopting an existing product

If your repository already contains a real implementation that predates the Kenovis AI-OS — wherever it lives — do not run `/init-project`; it asks you to decide a stack that is already running and does not know how to leave existing implementation alone.

Read [.kenovis/AI/commands/adopt-project.md](.kenovis/AI/commands/adopt-project.md) instead. It audits the existing code first, then asks you to confirm or correct what it found, and derives the product layer from that — rather than deciding it from scratch.

## Working on an existing product

Read in this order, per the Session Initialization Protocol in [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md):

1. [COMPANY_OS.md](COMPANY_OS.md) — vision, thesis, principles.
2. [DECISIONS.md](DECISIONS.md) — decisions made and why.
3. [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md) — how AI agents operate here.

Then load context relevant to your task: [PRODUCT/](PRODUCT/), [DOMAIN/](DOMAIN/), [ENGINEERING/](ENGINEERING/), [AUTOMATIONS/](AUTOMATIONS/).

Then run [.kenovis/AI/commands/bootstrap.md](.kenovis/AI/commands/bootstrap.md) before touching anything.

Do not modify code or documentation before understanding this context.

## Repository map

Framework layer — reusable:

| Path | Contains |
|---|---|
| [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md) | How the AI-OS operates. Entry point for non-Claude Code tools |
| [.kenovis/AI/agents/](.kenovis/AI/agents/) | 12 specialized roles (CEO, CTO, product, design, frontend, backend, database, security, review, marketing, finance, legal) |
| [.kenovis/AI/workflows/](.kenovis/AI/workflows/) | Execution processes (feature, bugfix, hotfix, architecture, release, review, roadmap, framework-review) |
| [.kenovis/AI/policies/](.kenovis/AI/policies/) | Non-negotiable rules (architecture, coding, database, security, testing, git, documentation) |
| [.kenovis/AI/commands/](.kenovis/AI/commands/) | Entry points (init-project, adopt-project, bootstrap, next, feature, bug, review, release, architect, analyze, explain) |
| [.kenovis/AI/templates/](.kenovis/AI/templates/) | Document templates (ADR, decision, feature plan, bug report, release notes) |
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

The AI-OS under [.kenovis/AI/](.kenovis/AI/) is intentionally tool-agnostic plain markdown so it can also be followed by other AI tooling. A tool other than Claude Code should load [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md) as its entry point. See [DECISION-010](DECISIONS.md).
