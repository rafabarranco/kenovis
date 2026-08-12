<!-- PROJECT-SPECIFIC: this product's own context, not framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

# cli/

## What is this?

This is where Kenovis's own implementation lives: the CLI that installs and syncs the Kenovis AI-OS (this repository's Framework layer) into a customer's repository. See [DECISIONS.md](../DECISIONS.md) DECISION-013 and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) for why this product has no backend or database.

[PRODUCT/ROADMAP.md](../PRODUCT/ROADMAP.md) Phase 0 item 3 (build the CLI installer/sync tool) is done. Shipped: the `init` command's install engine, bundling this repository's real Framework layer content into the package at build time — `kenovis init <targetDir>` now works with zero required flags — greenfield/brownfield auto-detection, and the `sync` command (updates an existing `.kenovis/` in place to a newer Framework Release — mirror-replaces `.kenovis/` and rewrites the `CLAUDE.md` stub, never touches Product-layer files or the customer's own code; reversible via the customer's own `git diff`/`git checkout`, per RULE-INST-02). Per [DECISIONS.md](../DECISIONS.md) DECISION-016 and DECISION-017.

Phase 0 item 4 (auto-trigger `init-project`/`adopt-project`, per [DECISIONS.md](../DECISIONS.md) DECISION-018) is also done: `init` now *refuses* on a detected-brownfield target (points at the new `kenovis add` instead, bypassable with `--force`), and `add` refuses symmetrically on a detected-greenfield target. Either command writes a `.kenovis/.setup-pending` marker naming the right AI command and a `CLAUDE.md` stub carrying a first-session directive to run it — so the very next AI session runs `init-project`/`adopt-project` automatically, no manual slash command required. `init-project.md`/`adopt-project.md` delete the marker and revert the stub to its passive form on their own completion. A bare `kenovis <targetDir>` (no subcommand) detects the target itself and dispatches to `init` or `add` internally — it never refuses.

npm publishing is wired up (`.github/workflows/publish.yml`): pushing a GitHub Release triggers CI to build, test, typecheck and `npm publish --provenance --access public` the package — never from a developer's local machine, per [ENGINEERING/SECURITY.md](../ENGINEERING/SECURITY.md) → Supply-Chain Security. Latest publish: [`kenovis@0.2.0`](https://www.npmjs.com/package/kenovis) shipped from the `v0.2.0` GitHub Release, with provenance — closes the `--source` footgun found during Learning-004 smoke testing (`init`/`sync` now validate `--source` before touching anything). `npx kenovis init` now works against any external repository with no local setup.

## Upgrading

Which Framework Release an Installation currently tracks is recorded in its `.kenovis/.framework-version`, stamped into the bundle at build time and installed with it — `cat .kenovis/.framework-version` answers "what am I on?" offline. `init`, `add` and `sync` all print it; `sync` prints the transition (`0.3.0 -> 0.5.0`, or `unknown -> 0.5.0` for an Installation predating the stamp, which that same sync fixes). `kenovis --version` prints the CLI's own version, which is the Framework Release it bundles.

An existing Installation does not auto-detect a newer Framework Release today (PRODUCT/ROADMAP.md Phase 2 — an active version-check is deferred, low priority against ~1 external team's data so far; the stamp above is the local half of that gap, with no network dependency). To upgrade by hand:

1. Reinstall the CLI: `npx kenovis@latest <targetDir>` doesn't upgrade in place — instead run `npm i -g kenovis@latest` (or just let `npx kenovis@latest ...` resolve the latest each time).
2. Run `kenovis sync <targetDir>` — mirror-replaces `.kenovis/` and rewrites the `CLAUDE.md` stub to the new Framework Release, same as any other sync.
3. Review the change with `git diff` before committing (RULE-INST-02) — this is the same review step any sync needs, not upgrade-specific.

Syncing before you have run `/init-project` or `/adopt-project` is safe: `sync` keeps `.kenovis/.setup-pending` and the pending form of the `CLAUDE.md` stub, so the next AI session still runs that command automatically (DECISION-018).

A sync's `git diff` includes updates to `.kenovis/AI/templates/product-layer/` — the templates `/init-project` and `/adopt-project` author your Product-layer documents from (DECISION-021). Those are Framework-layer files, so sync owns them; the documents you authored at your repository root are untouched, and always are (RULE-INST-01).

If your root `CLAUDE.md` was never written by this CLI at all (predates adopting Kenovis, or you replaced its content), or if you've added your own notes below Kenovis's own stub content, `init --force`/`add --force`/`sync` refuse to overwrite it unless `--force` is passed — a recorded content hash (`.kenovis/.claude-md.sha256`) catches both cases, not just the first (closes the gap `AI/memory/learnings.md` Learning-007 documented; see Learning-008 for the fix). An Installation that predates this fix falls back to the older, weaker first-line check until its next successful install/sync records a hash.

## Cutting a release

1. Bump `version` in `cli/package.json` (semver) and commit it.
2. Push a git tag matching the version, e.g. `git tag v0.2.0 && git push origin v0.2.0`.
3. Publish a GitHub Release from that tag (Release notes, `gh release create v0.2.0 --generate-notes` or the GitHub UI).
4. CI's `publish` workflow runs automatically, verifies `cli/package.json`'s version matches the release tag, then publishes.
5. Trim `CHANGELOG.md`: any released section below the two most recent moves verbatim to `CHANGELOG-ARCHIVE.md`, leaving one row in "Earlier releases". See `.kenovis/AI/policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline".

## Structure

A single Node.js/TypeScript npm package — no monorepo needed for a CLI-only product in v1.

```
cli/
├── src/                       CLI implementation (see Layering below)
├── scripts/                   build-time tooling — not part of the layering below
│   └── bundle-framework-assets.mjs   copies ../.kenovis/AI + assets/framework/README.md into
│                                     dist/framework-assets/, stamped with .framework-version
├── assets/framework/README.md  hand-authored customer-facing README — lands at a customer's .kenovis/README.md
├── bin/kenovis.js             CLI entry point (the `kenovis` executable, requires dist/ built)
├── package.json               npm scripts: bundle, build, test, typecheck
└── tsconfig.json
```

Business rules, product direction and architecture reasoning belong in the root-level [DOMAIN/](../DOMAIN/), [PRODUCT/](../PRODUCT/) and [ENGINEERING/](../ENGINEERING/) folders instead — see [.kenovis/AI/policies/documentation.md](../.kenovis/AI/policies/documentation.md).

## Layering

Code follows the layering defined in [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md) → Suggested Project Structure, adapted for a CLI with no database or UI:

```
src/
├── domain/installation.ts                       .kenovis/ naming, CLAUDE.md stub content (pending/steady-state), .setup-pending naming, AlreadyInstalledError/NotInstalledError/InvalidFrameworkSourceError/BrownfieldDetectedError/GreenfieldDetectedError/ExistingClaudeMdError, greenfield/brownfield detection, isKenovisManagedClaudeStub/isClaudeMdSafeToOverwrite/hashClaudeMdContent
├── application/commands/
│   ├── init.ts                                   install use case: orchestrates the domain rules against a FileSystemPort, refuses on a detected-brownfield target unless invoked as "add" or given --force
│   ├── add.ts                                     thin wrapper reusing init.ts's runInit with invokedAs: "add" — refuses symmetrically on a detected-greenfield target
│   └── sync.ts                                   update use case: mirror-replaces .kenovis/ and the CLAUDE.md stub, nothing else
├── infrastructure/filesystem/
│   ├── FileSystemPort.ts                         port every layer above depends on, never node:fs directly
│   ├── NodeFileSystem.ts                          real implementation
│   └── InMemoryFileSystem.ts                      test double used by application-layer unit tests
└── cli/bin.ts                                     argv parsing, default --source resolution, calls the init/add/sync use cases, bare-invocation autodetect dispatch
```

The dependency direction holds: `domain/` imports nothing from the layers around it; `application/` depends on the `FileSystemPort` interface, never on `NodeFileSystem` directly. Anything under `infrastructure/filesystem/` that writes to a target repository must respect [DOMAIN/BUSINESS_RULES.md](../DOMAIN/BUSINESS_RULES.md) RULE-INST-01 and RULE-INST-02 — never touch a customer's own README.md, never write outside version control's reach. The same protection extends to a customer's own pre-existing root `CLAUDE.md`: `init`/`add`/`sync` all refuse to overwrite one that isn't safe to overwrite unless `--force` is passed (`ExistingClaudeMdError`) — a real risk given the target segment already uses agentic tooling (COMPANY_OS.md), so a pre-Kenovis or hand-edited `CLAUDE.md` is a realistic case, not an edge case. `isClaudeMdSafeToOverwrite` compares against a recorded content hash (`.kenovis/.claude-md.sha256`, written by the prior install/sync) when one exists, so content appended below an otherwise-intact stub is caught too, not just a file that was never Kenovis's — falls back to the older `isKenovisManagedClaudeStub` marker-prefix check for an Installation with no recorded hash yet. `sync`'s guard was added later than `init`/`add`'s — see `AI/memory/learnings.md` Learning-006/007/008 for the gaps found and closed. `src/application/commands/init.test.ts`/`sync.test.ts` assert this directly against `InMemoryFileSystem`; `src/infrastructure/filesystem/NodeFileSystem.integration.test.ts` asserts it against a real filesystem in a temp directory.

A `--force` re-install always mirror-replaces `.kenovis/` (`removeTree` then `copyTree`), the same semantics `sync` already used — never a merge that could leave a file retired from an older Framework Release behind.

Both `init` and `sync` also validate `--source` itself before touching anything: its top level must contain only `AI/` and `README.md` (the shape `scripts/bundle-framework-assets.mjs` produces), or they throw `InvalidFrameworkSourceError` instead of copying. This guards a real footgun found by end-to-end testing — pointing `--source` at a full product repository checkout (e.g. this one) silently mirrored its Product-layer content (`COMPANY_OS.md`, `DECISIONS.md`, `PRODUCT/`, ...) into the target's `.kenovis/`. The check only ever inspects the local, operator-supplied `--source` path — never the target repository, which may legitimately contain a directory or file with any name at all (DECISION-016).

## Running it locally

```
npm install
npm run build      # bundles Framework layer assets, then compiles TypeScript
npm test           # domain, application (in-memory), infrastructure (real fs, temp dirs), cli parsing
npm run typecheck
node bin/kenovis.js init <targetDir>                                    # uses the bundled Framework layer
node bin/kenovis.js init <targetDir> --source <customFrameworkDir>      # or install something else instead
node bin/kenovis.js sync <targetDir>                                    # update an existing .kenovis/ in place
```

## Before adding anything here

Read [.kenovis/AI/commands/bootstrap.md](../.kenovis/AI/commands/bootstrap.md) first. Do not scaffold anything without understanding [COMPANY_OS.md](../COMPANY_OS.md), [DECISIONS.md](../DECISIONS.md) and [ENGINEERING/ARCHITECTURE.md](../ENGINEERING/ARCHITECTURE.md).
