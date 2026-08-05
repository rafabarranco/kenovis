<!-- PROJECT-SPECIFIC: placeholder content. Rewrite when starting a new product. See AI/commands/init-project.md -->

# cli/

## What is this?

This is where Kenovis's own implementation lives: the CLI that installs and syncs the Kenovis AI-OS (this repository's Framework layer) into a customer's repository. See [DECISIONS.md](../DECISIONS.md) DECISION-013 and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) for why this product has no backend or database.

[PRODUCT/ROADMAP.md](../PRODUCT/ROADMAP.md) Phase 0 item 3 (build the CLI installer/sync tool) is in progress. Shipped so far: the `init` command's install engine, bundling this repository's real Framework layer content into the package at build time — `kenovis init <targetDir>` now works with zero required flags — greenfield/brownfield auto-detection (`init` inspects the target directory before installing and suggests `/init-project` or `/adopt-project` with the actual evidence found), and the `sync` command (updates an existing `.kenovis/` in place to a newer Framework Release — mirror-replaces `.kenovis/` and rewrites the `CLAUDE.md` stub, never touches Product-layer files or the customer's own code; reversible via the customer's own `git diff`/`git checkout`, per RULE-INST-02). Per [DECISIONS.md](../DECISIONS.md) DECISION-016 and DECISION-017.

npm publishing is now wired up (`.github/workflows/publish.yml`): pushing a GitHub Release triggers CI to build, test, typecheck and `npm publish --provenance --access public` the package — never from a developer's local machine, per [ENGINEERING/SECURITY.md](../ENGINEERING/SECURITY.md) → Supply-Chain Security. Requires an `NPM_TOKEN` repository secret (npm automation token for the `kenovis` package/org) to exist before the first release is cut — not yet configured as of this writing.

## Cutting a release

1. Bump `version` in `cli/package.json` (semver) and commit it.
2. Push a git tag matching the version, e.g. `git tag v0.2.0 && git push origin v0.2.0`.
3. Publish a GitHub Release from that tag (Release notes, `gh release create v0.2.0 --generate-notes` or the GitHub UI).
4. CI's `publish` workflow runs automatically, verifies `cli/package.json`'s version matches the release tag, then publishes.

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
├── domain/installation.ts                       .kenovis/ naming, CLAUDE.md stub content, AlreadyInstalledError/NotInstalledError, greenfield/brownfield detection
├── application/commands/
│   ├── init.ts                                   install use case: orchestrates the domain rules against a FileSystemPort
│   └── sync.ts                                   update use case: mirror-replaces .kenovis/ and the CLAUDE.md stub, nothing else
├── infrastructure/filesystem/
│   ├── FileSystemPort.ts                         port every layer above depends on, never node:fs directly
│   ├── NodeFileSystem.ts                          real implementation
│   └── InMemoryFileSystem.ts                      test double used by application-layer unit tests
└── cli/bin.ts                                     argv parsing, default --source resolution, calls the init/sync use cases
```

The dependency direction holds: `domain/` imports nothing from the layers around it; `application/` depends on the `FileSystemPort` interface, never on `NodeFileSystem` directly. Anything under `infrastructure/filesystem/` that writes to a target repository must respect [DOMAIN/BUSINESS_RULES.md](../DOMAIN/BUSINESS_RULES.md) RULE-INST-01 and RULE-INST-02 — never touch a customer's own README.md, never write outside version control's reach. `src/application/commands/init.test.ts` asserts this directly against `InMemoryFileSystem`; `src/infrastructure/filesystem/NodeFileSystem.integration.test.ts` asserts it against a real filesystem in a temp directory.

## Running it locally

```
npm install
npm run build      # bundles Framework layer assets, then compiles TypeScript
npm test           # 33 tests: domain, application (in-memory), infrastructure (real fs, temp dirs), cli parsing
npm run typecheck
node bin/kenovis.js init <targetDir>                                    # uses the bundled Framework layer
node bin/kenovis.js init <targetDir> --source <customFrameworkDir>      # or install something else instead
node bin/kenovis.js sync <targetDir>                                    # update an existing .kenovis/ in place
```

## Before adding anything here

Read [AI/commands/bootstrap.md](../AI/commands/bootstrap.md) first. Do not scaffold anything without understanding [COMPANY_OS.md](../COMPANY_OS.md), [DECISIONS.md](../DECISIONS.md) and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).
