#!/usr/bin/env python3
"""Verify the PROJECT-SPECIFIC marker convention holds.

Every file listed below must start with a PROJECT-SPECIFIC marker comment
on or near its first line. This is a guard against the marker silently
disappearing during edits, not a claim that these are the only such files
(README.md and .gitignore carry the marker inside a section/comment, not
as the first line, and are checked separately).
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MARKER = "PROJECT-SPECIFIC"

FULL_FILE_MARKER_REQUIRED = [
    "COMPANY_OS.md",
    "DECISIONS.md",
    "PRODUCT/ROADMAP.md",
    "PRODUCT/FEATURES.md",
    "PRODUCT/USER_RESEARCH.md",
    "DOMAIN/DOMAIN_MODEL.md",
    "DOMAIN/BUSINESS_RULES.md",
    "ENGINEERING/ARCHITECTURE.md",
    "ENGINEERING/DATABASE.md",
    "ENGINEERING/SECURITY.md",
    "AUTOMATIONS/customer-onboarding.md",
    "AUTOMATIONS/release-process.md",
    "AUTOMATIONS/user-feedback.md",
    "AI/memory/glossary.md",
    "AI/memory/conventions.md",
    "AI/memory/learnings.md",
]

ANYWHERE_MARKER_REQUIRED = [
    "README.md",
    ".gitignore",
]


def main() -> int:
    errors = []

    for rel_path in FULL_FILE_MARKER_REQUIRED:
        path = ROOT / rel_path
        if not path.exists():
            errors.append(f"{rel_path}: file missing entirely")
            continue
        head = path.read_text(encoding="utf-8").splitlines()[:3]
        if not any(MARKER in line for line in head):
            errors.append(f"{rel_path}: missing PROJECT-SPECIFIC marker near top of file")

    for rel_path in ANYWHERE_MARKER_REQUIRED:
        path = ROOT / rel_path
        if not path.exists():
            errors.append(f"{rel_path}: file missing entirely")
            continue
        if MARKER not in path.read_text(encoding="utf-8"):
            errors.append(f"{rel_path}: missing PROJECT-SPECIFIC marker")

    if errors:
        print("PROJECT-SPECIFIC marker convention broken:\n")
        for error in errors:
            print(f"  {error}")
        return 1

    print("PROJECT-SPECIFIC marker convention holds.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
