#!/usr/bin/env python3
"""Verify every decision in DECISIONS.md has exactly one Decision Index line.

The session-initialization protocol reads the index instead of the whole log
(`CLAUDE.md` -> "Session Initialization Protocol", `.kenovis/AI/SYSTEM.md` ->
"Context Loading Rules", `.kenovis/AI/commands/bootstrap.md` Step 2). That is
only safe while the index is complete. A decision body with no index line is
invisible to every session that follows it -- the reasoning is on disk and
nothing points at it, which is worse than not recording it at all.

The reverse direction fails too: an index line naming a decision that has no
body sends a reader to nothing, and the protocol says citing a decision requires
opening its body.

WHAT THIS CHECK CAN AND CANNOT DO, stated per AI/memory/learnings.md
Learning-021 and Learning-022, because three previous sweeps under-reported by
leaving the distinction implicit:

  - The POPULATION is exact: every `# DECISION-NNN` heading in `DECISIONS.md`,
    and every `- **DECISION-NNN**` line inside the `# Decision Index` section.
    Both counts print on every run, so a change in the corpus is visible rather
    than silent.

  - The SUBSTANCE test is a heuristic: an index line must carry at least
    MIN_SUBSTANCE characters after the decision title's first sentence break, on
    the theory that a bare title cannot answer "do I need to open this one?".
    Length is a proxy for substance and nothing more -- a long line that says
    nothing passes. The count of lines near the threshold is not printed because
    there is nothing useful to review in it; what is reviewable is the rule in
    `.kenovis/AI/policies/documentation.md`.

Framework-layer home: not yet dispositioned. PRODUCT/ROADMAP.md item 37 works
the guards one at a time and this one is outstanding. Until it names a home or
records that its rule has no Framework-layer form, this check protects this
repository only.

Scope, stated so it is not mistaken for wider coverage than it has: this runs in
this repository's CI only. The bundler ships `.kenovis/AI/` and the customer
README, not `.github/` (PRODUCT/ROADMAP.md Phase 1 item 17), so a customer
Installation carries the rule as a written instruction with no mechanical guard
behind it.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DECISIONS = ROOT / "DECISIONS.md"

INDEX_HEADING = re.compile(r"^# Decision Index\s*$", re.MULTILINE)
NEXT_HEADING = re.compile(r"^# ", re.MULTILINE)
INDEX_LINE = re.compile(r"^- \*\*DECISION-(\d{3})\*\*(.*)$", re.MULTILINE)
BODY_HEADING = re.compile(r"^# DECISION-(\d{3})\s*$", re.MULTILINE)

MIN_SUBSTANCE = 40


def index_section(text: str) -> str | None:
    """The `# Decision Index` section, up to the next top-level heading."""
    start = INDEX_HEADING.search(text)
    if not start:
        return None
    rest = text[start.end():]
    end = NEXT_HEADING.search(rest)
    return rest[: end.start()] if end else rest


def main() -> int:
    if not DECISIONS.exists():
        print(f"{DECISIONS.relative_to(ROOT)} not found.")
        return 1

    text = DECISIONS.read_text(encoding="utf-8")
    section = index_section(text)
    if section is None:
        print(
            "DECISIONS.md has no `# Decision Index` section.\n\n"
            "The session-initialization protocol reads that section instead of the "
            "decision bodies. Without it, every session loads the whole log."
        )
        return 1

    indexed: dict[str, str] = {}
    duplicates = []
    for match in INDEX_LINE.finditer(section):
        decision_id, remainder = match.group(1), match.group(2)
        if decision_id in indexed:
            duplicates.append(decision_id)
        indexed[decision_id] = remainder

    bodies = [match.group(1) for match in BODY_HEADING.finditer(text)]
    body_ids = set(bodies)

    errors = []

    for decision_id in sorted(body_ids - set(indexed)):
        errors.append(
            f"DECISION-{decision_id} has a body and no Decision Index line — "
            f"no session that reads the index will ever see it"
        )

    for decision_id in sorted(set(indexed) - body_ids):
        errors.append(
            f"DECISION-{decision_id} has a Decision Index line and no body — "
            f"citing it requires opening a body that does not exist"
        )

    for decision_id in sorted(duplicates):
        errors.append(f"DECISION-{decision_id} appears more than once in the Decision Index")

    for decision_id in sorted(body_ids & set(indexed)):
        # Everything after the em dash that follows the ID is the substance; a
        # line that is only a title cannot answer "do I need to open this one?".
        remainder = indexed[decision_id]
        substance = remainder.split("—", 1)[-1] if "—" in remainder else ""
        if len(substance.strip()) < MIN_SUBSTANCE:
            errors.append(
                f"DECISION-{decision_id}'s Decision Index line states a title and "
                f"little else — say what the decision settled"
            )

    if errors:
        print("The Decision Index does not match the decisions recorded below it:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nWriting a decision body and writing its index line are one change, "
            "never two — see `.kenovis/AI/policies/documentation.md` → "
            '"A Decision Is Not Recorded Until Its Index Line Exists".'
        )
        return 1

    print(
        f"Decision Index holds: {len(bodies)} decision bodies, "
        f"{len(indexed)} index lines, each side accounted for on the other."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
