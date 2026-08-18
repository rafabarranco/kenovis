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

This writes the Framework layer into `.kenovis/` and a `CLAUDE.md` stub — never touches your existing `README.md` or code (company-os/DECISIONS.md → DECISION-016, DECISION-017). It inspects your repository first and tells you whether to follow "Starting a new product" (below) or "Adopting an existing product", based on what it actually finds — no flags required.

To pull a newer Framework Release into an Installation later:

```
npx kenovis sync
```

`sync` mirror-replaces `.kenovis/` only. Product-layer files and your own code are never touched. Reversible via your repository's own `git diff` / `git checkout`. See [cli/README.md](cli/README.md) for the full command reference.

## Starting a new product

Read [.kenovis/AI/commands/init-project.md](.kenovis/AI/commands/init-project.md). It lists exactly which files to empty and rewrite, in which order, and what to leave untouched.

Product-layer files carry this marker on their first line:

```
<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->
```

The marker states which layer a file belongs to, and nothing about whether it has been filled in. It is equally true of a template nobody has answered and of a document that has been this company's own for a year — both are Product layer, and `kenovis sync` leaves both alone. A file without the marker is framework, and works unchanged.

Whether a file still holds unanswered questions is a separate fact, carried by a separate marker: `[ANSWER: ...]`. See [company-os/DECISIONS.md](company-os/DECISIONS.md) DECISION-022 and DECISION-023.

## Adopting an existing product

If your repository already contains a real implementation that predates the Kenovis AI-OS — wherever it lives — do not run `/init-project`; it asks you to decide a stack that is already running and does not know how to leave existing implementation alone.

Read [.kenovis/AI/commands/adopt-project.md](.kenovis/AI/commands/adopt-project.md) instead. It audits the existing code first, then asks you to confirm or correct what it found, and derives the product layer from that — rather than deciding it from scratch.

## Working on an existing product

Read in this order, per the Session Initialization Protocol in [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md):

1. [company-os/COMPANY_OS.md](company-os/COMPANY_OS.md) — vision, thesis, principles.
2. [company-os/DECISIONS.md](company-os/DECISIONS.md) — decisions made and why.
3. [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md) — how AI agents operate here.

Then load context relevant to your task: [company-os/PRODUCT/](company-os/PRODUCT/), [company-os/DOMAIN/](company-os/DOMAIN/), [company-os/ENGINEERING/](company-os/ENGINEERING/), [company-os/AUTOMATIONS/](company-os/AUTOMATIONS/).

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
| [company-os/COMPANY_OS.md](company-os/COMPANY_OS.md) | Company vision, thesis, principles — highest-level context |
| [company-os/DECISIONS.md](company-os/DECISIONS.md) | Log of important company/product/engineering decisions |
| [company-os/PRODUCT/](company-os/PRODUCT/) | Features, roadmap, user research |
| [company-os/DOMAIN/](company-os/DOMAIN/) | Business entities and rules |
| [company-os/ENGINEERING/](company-os/ENGINEERING/) | Architecture, database and security design |
| [company-os/AUTOMATIONS/](company-os/AUTOMATIONS/) | Onboarding, release and feedback processes |
| [company-os/AI/memory/](company-os/AI/memory/) | Glossary, conventions and learnings accumulated by this product |
| [cli/](cli/) | Actual product implementation. This product chose a top-level `cli/` directory for it — see [company-os/ENGINEERING/ARCHITECTURE.md](company-os/ENGINEERING/ARCHITECTURE.md) → "Suggested Project Structure". Not a framework requirement: a different product may organize its code anywhere. |

## Source of truth

When information conflicts:

```
company-os/COMPANY_OS.md → company-os/DECISIONS.md → company-os/DOMAIN/ → company-os/PRODUCT/ → company-os/ENGINEERING/ → code
```

Code is never the source of truth.

## Tooling

Primary development interface: **Claude Code** (VS Code extension), which auto-loads the root [CLAUDE.md](CLAUDE.md).

The AI-OS under [.kenovis/AI/](.kenovis/AI/) is intentionally tool-agnostic plain markdown so it can also be followed by other AI tooling. A tool other than Claude Code should load [.kenovis/AI/SYSTEM.md](.kenovis/AI/SYSTEM.md) as its entry point. See [DECISION-010](company-os/DECISIONS.md).
