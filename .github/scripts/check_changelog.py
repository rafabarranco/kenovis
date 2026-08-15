#!/usr/bin/env python3
"""Verify framework-layer PRs update CHANGELOG.md.

Per CONTRIBUTING.md -> "Framework Definition of Done": a PR that touches
framework/, CLAUDE.md, or README.md must also touch CHANGELOG.md, unless the PR
title/description contains "[skip changelog]" (reserved for wording/typo
edits that don't change behavior). Only runs on pull_request events — a
push to a protected branch has already been through this check on its PR.

Watches framework/, this repository's real Framework-layer source since
DECISION-039, not the generated .kenovis/ mirror — a PR never touches the
latter, since it is gitignored.

Framework-layer home: not yet dispositioned, and expected to end as "no
Framework-layer form" — the rule is about this repository's own contribution
process, and pull requests are a hosting platform's concept rather than
anything an AI-OS operates on. PRODUCT/ROADMAP.md item 37 orders this guard
last for that reason and records the outcome either way.
"""

import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKIP_MARKER = "[skip changelog]"
WATCHED_PREFIXES = ("framework/", "CLAUDE.md", "README.md")


def touches_watched_path(path: str) -> bool:
    return any(path == prefix or path.startswith(prefix) for prefix in WATCHED_PREFIXES)


def changed_files(base_sha: str, head_sha: str) -> list[str]:
    result = subprocess.run(
        ["git", "diff", "--name-only", f"{base_sha}...{head_sha}"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return [line for line in result.stdout.splitlines() if line]


def pr_event() -> dict | None:
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    if not event_path or not Path(event_path).exists():
        return None
    event = json.loads(Path(event_path).read_text(encoding="utf-8"))
    return event.get("pull_request")


def main() -> int:
    pr = pr_event()
    if not pr:
        print("Not a pull_request event — skipping changelog check.")
        return 0

    base_sha = pr["base"]["sha"]
    head_sha = pr["head"]["sha"]
    files = changed_files(base_sha, head_sha)

    if not files:
        print("No changed files detected — skipping changelog check.")
        return 0

    watched = [f for f in files if touches_watched_path(f)]
    if not watched:
        print("No framework-layer files (framework/, CLAUDE.md, README.md) changed. OK.")
        return 0

    if "CHANGELOG.md" in files:
        print("CHANGELOG.md updated alongside framework-layer changes. OK.")
        return 0

    text = f"{pr.get('title', '')}\n{pr.get('body') or ''}"
    if SKIP_MARKER in text:
        print(f"'{SKIP_MARKER}' present in PR title/description — check skipped.")
        return 0

    print("Framework-layer files changed without a CHANGELOG.md update:\n")
    for f in watched:
        print(f"  {f}")
    print(
        "\nAdd a bullet under [Unreleased] in CHANGELOG.md, or include "
        f"'{SKIP_MARKER}' in the PR title/description if this change doesn't "
        "alter behavior (typo/wording only). See CONTRIBUTING.md -> "
        "\"Framework Definition of Done\"."
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
