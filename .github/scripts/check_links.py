#!/usr/bin/env python3
"""Verify every relative markdown link in the repo resolves to a real file."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
SKIP_DIRS = {".git", "node_modules"}


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
