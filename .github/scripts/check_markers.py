#!/usr/bin/env python3
"""Verify the PROJECT-SPECIFIC marker convention holds.

Every file listed below must start with a PROJECT-SPECIFIC marker comment
on or near its first line. This is a guard against the marker silently
disappearing during edits, not a claim that these are the only such files
(README.md and .gitignore carry the marker inside a section/comment, not
as the first line, and are checked separately).

Framework-layer home: `.kenovis/AI/policies/architecture.md` -> "Distribution
Is Part Of The Architecture" carries the rule for the case that was missing --
a new Product-layer document carries the marker when it is created, and the
marker states layer and never completion state. The setup path was already
covered: `.kenovis/AI/SYSTEM.md` -> "Project Context",
`.kenovis/AI/commands/init-project.md`, `.kenovis/AI/commands/adopt-project.md`,
`.kenovis/AI/templates/product-layer/README.md`, and line 1 of all 18
product-layer templates. Verified 2026-08-13 (PRODUCT/ROADMAP.md item 37).

What the framework half could not cover, and why this script still exists here:
the marker disappearing from a file that already has one. That is an editing
accident with no instruction to attach to -- nobody decides to delete it -- so
it is a genuine local-net case rather than a missing rule.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MARKER = "PROJECT-SPECIFIC"

FULL_FILE_MARKER_REQUIRED = [
    "company-os/COMPANY_OS.md",
    "company-os/DECISIONS.md",
    "company-os/PRODUCT/ROADMAP.md",
    "company-os/PRODUCT/ROADMAP-ARCHIVE.md",
    "company-os/PRODUCT/FEATURES.md",
    "company-os/PRODUCT/USER_RESEARCH.md",
    "company-os/DOMAIN/DOMAIN_MODEL.md",
    "company-os/DOMAIN/BUSINESS_RULES.md",
    "company-os/ENGINEERING/ARCHITECTURE.md",
    "company-os/ENGINEERING/DATABASE.md",
    "company-os/ENGINEERING/SECURITY.md",
    "company-os/AUTOMATIONS/customer-onboarding.md",
    "company-os/AUTOMATIONS/release-process.md",
    "company-os/AUTOMATIONS/user-feedback.md",
    "company-os/AI/memory/glossary.md",
    "company-os/AI/memory/conventions.md",
    "company-os/AI/memory/learnings.md",
    "company-os/AI/memory/LEARNINGS-ARCHIVE.md",
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
