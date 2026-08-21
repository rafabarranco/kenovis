# Git Policy

Version: 2.6

---

# Purpose

This document defines the Git workflow and version control standards for this project.

Git is not only a backup system.

Git is the complete history of how the product evolved.

Every commit should tell a clear story.

---

# Core Philosophy

A repository should be understandable through its commit history.

A new engineer should be able to answer:

- What changed?
- Why did it change?
- When did it change?
- Who made the decision?

without reading every file.

---

# Golden Rules

Every change should be:

- Atomic
- Reversible
- Reviewable
- Understandable

Never mix unrelated changes.

---

# Branch Strategy

Three long-lived branches, all protected. Work happens on short-lived branches off `development`.

Flow:

```
development

  ↓  branch

feature/XXXX

  ↓  pull request + review

development

  ↓  pull request

preproduction

  ↓  pull request

main
```

Create every working branch from `development`:

```
git fetch origin
git checkout -b feature/XXXX origin/development
```

Never branch from `main`, from `preproduction`, or from another working branch. Doing so guarantees conflicts at pull request time.

Keep working branches short-lived. A branch that lives longer than the code around it stops being mergeable.

---

# Branch Naming

Use descriptive names.

Examples:

feature/<domain-concept>-<capability>

feature/payment-reminders

bugfix/<screen-or-endpoint>-<symptom>

hotfix/login-error

refactor/<module>-<what-changes>

docs/api-reference

release/<version>

release/v0.2.0

Used for release-prep work (version bumps, CHANGELOG cuts) — same flow as `feature/XXXX` (branch from `development`, PR back into it), just a naming specialization so a release-prep branch reads as what it is instead of as a feature.

Avoid:

feature1

test

new

fix

tmp

---

# Commit Philosophy

A commit represents one logical change.

If a commit message contains:

"and"

it probably includes multiple changes.

Split it.

---

# Commit Messages

Prefer imperative mood.

Examples:

```
Add password reset workflow

Fix payment validation bug

Refactor scheduling service

Update onboarding documentation
```

Avoid:

```
changes

fix

update

work

misc

final
```

---

# Commit Size

Prefer small commits.

A reviewer should understand a commit in a few minutes.

Large commits increase review difficulty and merge conflicts.

---

# Pull Requests

Every Pull Request should explain:

- Why the change exists.
- What changed.
- How it was tested.
- Risks.
- Breaking changes.
- Documentation updates.

The code should not need to explain the business reason.

---

# Reviews

No significant change should be merged without review.

Review the:

- Business value.
- Architecture.
- Security.
- Maintainability.
- Documentation.

Not only correctness.

---

# Merge Strategy

Pull requests are merged with **Rebase and Merge**. Always.

Never:

- Merge commits.
- Squash merges.
- Manual merges into a protected branch.

Rationale: a linear history keeps `git bisect` and blame usable, and makes every commit independently revertible.

Resolving conflicts on an open pull request:

```
git rebase origin/development
# resolve
git push --force-with-lease
```

Use `--force-with-lease`, never `--force`.

**When the push target is an explicit HTTPS URL rather than a tracked remote** — the case whenever `origin` is unreachable over SSH, which is this repository's own standing situation (see "Rebasing" below, OF-65) — bare `--force-with-lease` has no remote-tracking ref to compare against and is inert: it can reject a legitimate push with `stale info`, or, worse, pass against a local tracking ref that is itself stale and silently accept a push that overwrites work the lease never actually compared against. Read the remote's current SHA first and name it explicitly:

```
git ls-remote https://github.com/<owner>/<repo>.git refs/heads/<branch>
git push https://github.com/<owner>/<repo>.git HEAD:<branch> --force-with-lease=<branch>:<remote-sha-from-ls-remote>
```

The qualified form is the only one that restores the guarantee `--force-with-lease` is supposed to provide when there is no local tracking ref to fall back on.

---

# Rebasing

Rebase your working branch onto `origin/development` before requesting review, and again whenever the pull request falls behind.

Resolve conflicts carefully.

Rebasing your own unmerged working branch is expected. Rewriting history on a protected branch is never allowed.

Never overwrite another engineer's work without understanding the conflict.

**After a merge, the branch you land on is behind.** Merging a pull request with `--delete-branch` deletes the working branch and returns the checkout to the base branch — a *local* base branch, which does not contain the merge that just landed and which no local command will admit is stale. `git status` compares against the local tracking ref, so until something fetches, it reports "up to date" or a confidently wrong "ahead by N".

So fetch and level up immediately after a merge, before starting anything:

```
git fetch origin
git rev-list --count HEAD..origin/development   # must be 0
```

This costs one command. Skipping it costs a whole round of work built on superseded context, which is undetectable from inside that round because everything it reads is internally consistent. See `.kenovis/AI/commands/bootstrap.md` Step 5, which requires the same check at session start.

**Run this immediately after `gh pr merge --delete-branch` too, not only at the next session's own start.** `gh pr merge --delete-branch`'s local housekeeping (checkout base, delete branch, pull) uses the repository's own configured remote, and a remote your session cannot reach (an SSH URL with no key loaded is the common case) fails that housekeeping silently — the merge lands on GitHub, `gh pr view` confirms `MERGED`, and the local checkout is left one commit behind with no git command reporting failure. Anything the round edits next is silently reverted to pre-merge content on disk. Three for three in this repository: `git fetch origin` alone will hit the same unreachable-remote error the merge itself just did, so run the same HTTPS detour used everywhere else in that case:

```
git -c credential.helper='!gh auth git-credential' -c url."https://github.com/".insteadOf="git@github.com:" fetch origin
git rev-list --count HEAD..origin/development   # must be 0
git merge --ff-only origin/development
```

Do not wait to notice reverted files before running this — run it as the very next command after every `gh pr merge --delete-branch`, whether or not the merge printed an error.

**A harness permission classifier can refuse to run the fetch-and-relevel sequence outright — a distinct failure from every case above.** The failures above are all git reporting an error: exit `128`, a credential prompt, a stale-lease rejection. A classifier block looks nothing like that — the command never runs, no git error surfaces, and the response is `Blocked by classifier` from the harness itself, not from git. Treat it as its own case, not a retry target: state plainly that the sync could not run and why, do not re-issue the same command expecting a different result, and do not treat the local checkout as leveled — it is exactly as far behind as the last `git rev-list --count HEAD..origin/development` measured it, uncorrected. The checkout self-heals the next time any session there fetches; the risk is only proceeding as if this fetch already had.

**A `git push` or PR creation can fail with a `403 Permission... denied to <account>` against the wrong authenticated `gh` identity — a different failure class from an unreachable remote (OF-65) or `gh pr merge`'s own local housekeeping (OF-86): the remote is reachable, the command runs, and it is refused by GitHub itself because the *active* `gh` account is not the one this repository expects.** More than one `gh` account can be logged in on the same machine, and which one is "active" is a piece of global CLI state that is not scoped to this repository, this session, or this command — it can differ from what `gh auth status` showed earlier in the same session. Diagnose with `gh auth status` (look for `Active account: true` against the account this repository's remote expects) and fix with:

```
gh auth switch --hostname github.com --user <expected-account>
```

**This is a global, machine-wide state change, not a per-invocation override** — unlike the `-c credential.helper=` detour above, which is scoped to the one command it prefixes. Where multiple sessions can run against the same machine at once (`AI/memory/learnings.md` Learning-054), switching the active account can change which identity a *different* concurrent session's own next push uses. Run it immediately before the push or PR command it is fixing, not preemptively, and expect it may need re-running if another session has switched it back since.

---

# Stacked Pull Requests

A pull request opened from another open pull request's head is stacked. Merging the base with **Rebase and Merge** rewrites its commits onto `development` under new SHAs, so the stacked branch — still built on the old commits — goes `CONFLICTING`/`DIRTY`, carrying its own commits plus copies of the base's, now conflicting with content that already landed. The instinctive recovery, rebase onto the new base and resolve, means resolving conflicts between a branch and an already-merged copy of itself: the most error-prone form of the operation, on the one occasion where a wrong resolution silently drops work that was already merged, and a diff review will not obviously catch it — a plausible-looking file addition reads as fine (Learning-035).

Recover by rebuilding and asserting tree equality, not by reading the diff:

1. **Before the base merges**, capture the stacked branch's own tree hash: `git rev-parse HEAD^{tree}`.
2. After the base lands and `development` is leveled (see "Rebasing" above), rebuild the stacked branch on the new base — `git rebase origin/development` — resolving whatever conflicts appear.
3. **Assert, do not eyeball:** `git rev-parse HEAD^{tree}` must equal the hash captured in step 1. The stacked branch's own net content does not change when its base merges — only the commits underneath it move — so any difference means the rebuild dropped or altered something the base merge did not touch.
4. If the hashes differ, stop and investigate before pushing. Do not stage with `git add -A` during the rebuild — it stages by working-tree state, including untracked files that are deliberately untracked (Learning-035's own instance staged `claude-info.md`, rejected by OF-45b), which silently widens the very tree the assertion checks.
5. Only once the hashes match, push with `--force-with-lease` (or its URL-qualified form above, if applicable).

---

# Protected Branches

`development`, `preproduction` and `main` are protected.

Never push directly to any of them. Every change enters through a pull request.

`development`

Integration branch. Where working branches land. Always buildable.

`preproduction`

Release candidate. Mirrors what is about to ship. Always deployable and tested.

`main`

Production. Always deployable, stable, tested and documented.

Never merge experimental work into a protected branch.

Automatic backmerges between protected branches carry `[skip ci]` in the commit message.

---

# Promotion Chains And Content Sync

A promotion chain of protected branches merged with rebase only cannot stay history-aligned once any step introduces a commit the upstream branch will never contain. A content-sync commit on the downstream branch is exactly such a commit — so applying that fix guarantees the next promotion needs it again.

That is a steady state, not a repair, and it is an acceptable one: what matters is that the branches are byte-identical after every promotion, not that their histories match. What is not acceptable is rediscovering it every release and spending the investigation again. (`company-os/AI/memory/LEARNINGS-ARCHIVE.md` Learning-012.)

A repository in that state promotes like this, every release:

1. Verify the downstream branch is a strict older snapshot — `git diff origin/<downstream> <last-release-cut-commit>` is empty, and nothing unique sits downstream except previous sync commits.
2. Branch `sync/<downstream>-<version>` from the downstream branch.
3. `git read-tree -u --reset origin/<upstream>`. This is the correct primitive: `git checkout <ref> -- .` does not delete files removed upstream, which matters on any release that moves or retires paths.
4. Confirm `git diff origin/<upstream> HEAD` is empty before opening the pull request.
5. Open the pull request and rebase-merge it.

Record which mode the repository is in — true fast-forward or permanent content-sync — where the release process is documented, so no release has to re-derive it.

---

# Hotfixes

A hotfix is the only case where a branch does not start from `development`.

```
git fetch origin
git checkout -b hotfix/XXXX origin/main
```

It merges to `main` through a pull request, then is backmerged into `preproduction` and `development` so the fix is never lost on the next release.

Hotfixes should:

- Solve one production issue.
- Be minimal.
- Be reviewed after deployment.
- Be documented.

Never introduce unrelated improvements during a hotfix.

---

# Rollback

Every deployment should have a rollback strategy.

Before merging ask:

Can this change be safely reverted?

If not, document why.

---

# Breaking Changes

Breaking changes require:

- Explicit documentation.
- Migration strategy.
- Version update when applicable.
- Communication plan.

Never surprise consumers.

---

# Versioning

Prefer Semantic Versioning:

MAJOR

Breaking changes.

MINOR

Backward-compatible features.

PATCH

Bug fixes.

---

# Generated Files

Avoid committing generated artifacts unless they are required.

Examples:

Do not commit:

- Temporary files
- Local caches
- Build outputs
- Editor-specific files

unless intentionally versioned.

---

# Secrets

Never commit:

- API keys
- Tokens
- Passwords
- Certificates
- Private keys

Even temporarily.

Use environment variables or secret management systems.

---

# AI Responsibilities

AI should:

- Create focused commits.
- Avoid unrelated formatting changes.
- Branch from `development`, never from a protected branch other than for a hotfix.
- Never push to `development`, `preproduction` or `main`.
- Never rewrite Git history unless explicitly requested.
- Never force-push shared branches. On its own working branch, use `--force-with-lease`.
- Commit or push only when the human asks.

---

# Git Review Checklist

Before merging:

✓ Branch started from `development` (or from `main` if it is a hotfix).

✓ Branch name is meaningful.

✓ Pull request targets the correct branch.

✓ Merge method is Rebase and Merge.

✓ Commit history is clean.

✓ Changes are atomic.

✓ Documentation is updated.

✓ Tests pass.

✓ No secrets are committed.

✓ Rollback is possible.

✓ Breaking changes are documented.

---

# Forbidden Behaviours

Never:

- Commit unrelated work together.
- Push directly to `development`, `preproduction` or `main`.
- Branch a feature from anything other than `development`.
- Merge a pull request with a merge commit or a squash.
- Create a merge commit manually.
- Force-push shared history.
- Rewrite history without agreement.
- Commit secrets.
- Merge code that has not been reviewed.
- Leave the repository in a broken state.

---

# Final Principle

Git is the permanent memory of the engineering team.

Every commit should make the project's history easier to understand, not harder.