#!/usr/bin/env python3
"""Verify every relative markdown link in the repo resolves to a real file.

Framework-layer home: none. A broken relative link is a filesystem fact with no
judgement in it, and "do not write links that do not resolve" is not a rule an
agent needs told — it fails the DECISION-026 test the opposite way a written
rule would: there is no instruction to place, only a fact to check. Confirmed
2026-08-16 (PRODUCT/ROADMAP.md item 37, last of the ten, as ordered).

Since DECISION-039, this repository's own `.kenovis/` is generated and
gitignored — absent on a fresh checkout and in this CI job, which is
Python-only and never runs the build. Prose in README.md, CHANGELOG.md,
CONTRIBUTING.md and cli/README.md correctly links to `.kenovis/AI/...` paths
anyway, because that is what a customer receives; those links are checked
against `framework/` instead, which is what `.kenovis/AI/...` always mirrors
1:1 in this repository. This is the one guard that reads Product-layer prose
describing the customer-facing shape, not framework source directly, so it is
the one guard that needs this alias.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
SKIP_DIRS = {".git", "node_modules"}
KENOVIS_AI_PREFIX = ".kenovis/AI/"
FRAMEWORK_ALIAS = "framework/"


def iter_markdown_files():
    for path in ROOT.rglob("*.md"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        yield path


def is_external(target: str) -> bool:
    return target.startswith(("http://", "https://", "mailto:", "#"))


def main() -> int:
    errors = []

    for md_file in iter_markdown_files():
        text = md_file.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(text):
            target = match.group(1).strip()
            if not target or is_external(target):
                continue

            target_path, _, _anchor = target.partition("#")
            if not target_path:
                continue

            resolved = (md_file.parent / target_path).resolve()
            if not resolved.exists() and KENOVIS_AI_PREFIX in target_path:
                aliased = target_path.replace(KENOVIS_AI_PREFIX, FRAMEWORK_ALIAS, 1)
                resolved = (md_file.parent / aliased).resolve()
            if not resolved.exists():
                errors.append(f"{md_file.relative_to(ROOT)}: broken link -> {target}")

    if errors:
        print("Broken relative links found:\n")
        for error in errors:
            print(f"  {error}")
        return 1

    print("All relative markdown links resolve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
