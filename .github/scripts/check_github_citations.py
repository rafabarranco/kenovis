#!/usr/bin/env python3
"""Verify the framework layer names no repository-local script as where a rule is enforced.

`sync` delivers `.kenovis/AI/` to every Installation and never touches anything
outside it (RULE-INST-01) -- a repository-local CI check, wherever an
Installation keeps one, reaches only that one repository. The framework layer
citing such a script as the mechanism enforcing a rule tells every other
Installation something protects them that does not. A live instance of this
in `policies/documentation.md` was found and fixed in `PRODUCT/ROADMAP.md`
item 37 round 2 (2026-08-13).

Framework-layer home: `framework/policies/documentation.md` -> "The Framework
Layer Never Names A Repository-Local Script As Where A Rule Holds". Confirmed
2026-08-16 (`PRODUCT/ROADMAP.md` OF-25), once item 37 finished dispositioning
this repository's own ten checks and the citation this rule mirrors from the
other side was stable enough to check for good.

Scope: `framework/` is the tracked source (DECISION-039); `.kenovis/` is
generated and gitignored, absent in this CI job the same way `check_links.py`
already documents. A single literal substring is the entire check -- no
classifier, per this row's own text.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FRAMEWORK = ROOT / "framework"
NEEDLE = ".github/"


def main() -> int:
    errors = []

    for path in sorted(FRAMEWORK.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        for lineno, line in enumerate(text.splitlines(), start=1):
            if NEEDLE in line:
                errors.append(f"{path.relative_to(ROOT)}:{lineno}: {line.strip()}")

    if errors:
        print(f'The framework layer cites "{NEEDLE}" -- a repository-local path no Installation ships:\n')
        for error in errors:
            print(f"  {error}")
        return 1

    print(f'No framework-layer file names "{NEEDLE}" as an enforcement mechanism.')
    return 0


if __name__ == "__main__":
    sys.exit(main())
