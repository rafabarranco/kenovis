<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# cli/

## What is this?

This is where Kenovis's own implementation lives: the CLI that installs and syncs the Kenovis AI-OS (this repository's Framework layer) into a customer's repository. See [DECISIONS.md](../DECISIONS.md) DECISION-013 and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) for why this product has no backend or database.

[PRODUCT/ROADMAP.md](../PRODUCT/ROADMAP.md) Phase 0 item 3 (build the CLI installer/sync tool) is in progress. Shipped so far: the `init` command's install engine, bundling this repository's real Framework layer content into the package at build time — `kenovis init <targetDir>` now works with zero required flags — and greenfield/brownfield auto-detection (`init` inspects the target directory before installing and suggests `/init-project` or `/adopt-project` with the actual evidence found). Per [DECISIONS.md](../DECISIONS.md) DECISION-016 and DECISION-017.

Not yet built: the `sync` command and npm publishing.

## Structure

A single Node.js/TypeScript npm package — no monorepo needed for a CLI-only product in v1.

```
cli/
├── src/                       CLI implementation (see Layering below)
├── scripts/                   build-time tooling — not part of the layering below
│   └── bundle-framework-assets.mjs   copies ../AI (minus memory/) + assets/framework/README.md into dist/framework-assets/
├── assets/framework/README.md  hand-authored customer-facing README — lands at a customer's .kenovis/README.md
├── bin/kenovis.js             CLI entry point (the `kenovis` executable, requires dist/ built)
├── package.json               npm scripts: bundle, build, test, typecheck
└── tsconfig.json
```

Business rules, product direction and architecture reasoning belong in the root-level [DOMAIN/](../DOMAIN/), [PRODUCT/](../PRODUCT/) and [ENGINEERING/](../ENGINEERING/) folders instead — see [AI/policies/documentation.md](../AI/policies/documentation.md).

## Layering

Code follows the layering defined in [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) → Suggested Project Structure, adapted for a CLI with no database or UI:

```
src/
├── domain/installation.ts                       .kenovis/ naming, CLAUDE.md stub content, AlreadyInstalledError, greenfield/brownfield detection
├── application/commands/init.ts                  install use case: orchestrates the domain rules against a FileSystemPort
├── infrastructure/filesystem/
│   ├── FileSystemPort.ts                         port every layer above depends on, never node:fs directly
│   ├── NodeFileSystem.ts                          real implementation
│   └── InMemoryFileSystem.ts                      test double used by application-layer unit tests
└── cli/bin.ts                                     argv parsing, default --source resolution, calls the init use case
```

The dependency direction holds: `domain/` imports nothing from the layers around it; `application/` depends on the `FileSystemPort` interface, never on `NodeFileSystem` directly. Anything under `infrastructure/filesystem/` that writes to a target repository must respect [DOMAIN/BUSINESS_RULES.md](../DOMAIN/BUSINESS_RULES.md) RULE-INST-01 and RULE-INST-02 — never touch a customer's own README.md, never write outside version control's reach. `src/application/commands/init.test.ts` asserts this directly against `InMemoryFileSystem`; `src/infrastructure/filesystem/NodeFileSystem.integration.test.ts` asserts it against a real filesystem in a temp directory.

## Running it locally

```
npm install
npm run build      # bundles Framework layer assets, then compiles TypeScript
npm test           # 23 tests: domain, application (in-memory), infrastructure (real fs, temp dirs), cli parsing
npm run typecheck
node bin/kenovis.js init <targetDir>                                    # uses the bundled Framework layer
node bin/kenovis.js init <targetDir> --source <customFrameworkDir>      # or install something else instead
```

## Before adding anything here

Read [AI/commands/bootstrap.md](../AI/commands/bootstrap.md) first. Do not scaffold anything without understanding [COMPANY_OS.md](../COMPANY_OS.md), [DECISIONS.md](../DECISIONS.md) and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).
