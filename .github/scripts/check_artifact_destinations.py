#!/usr/bin/env python3
"""Verify every instruction that produces an artifact says where it goes.

DECISION-024 separated "the form that shapes an artifact" from "the place the
artifact is recorded". `check_template_refs.py` enforces the first half: a
template path may never stand where a destination belongs. This check enforces
the second half, whose population is larger and does not overlap — an
instruction can tell an agent to produce a report without citing any template at
all, and then no destination is named anywhere.

That is what shipped in `kenovis@0.11.0`. `/review` Step 12 said "Generate
Review Report" and stopped. Executing it from a real Installation
(PRODUCT/ROADMAP.md Phase 1 item 16), the report carrying a Critical
tenant-isolation finding was written under `.kenovis/`, because nothing in that
command said not to and everything else Kenovis owns lives there. The next
`kenovis sync` deleted it, reported `already up to date`, and never named the
file it removed.

WHAT THIS CHECK CAN AND CANNOT DO, stated because the previous two sweeps did
not state it and both under-reported as a result (AI/memory/learnings.md
Learning-021):

  - The POPULATION is exact: every `# Step N - ...` / `# Phase N - ...` block in
    `.kenovis/AI/commands/` and `.kenovis/AI/workflows/`. Nothing structural is
    missed, and the block count is printed on every run so a change in the
    corpus is visible rather than silent.

  - The CLASSIFIER is a heuristic: a block counts as artifact-producing when it
    pairs a producing verb with an artifact noun. That word list cannot be
    complete — it is built from the instances found so far, which is exactly the
    property that let "Use:" survive DECISION-024's first sweep. A new
    instruction phrased outside this vocabulary will not be caught. The count of
    classified blocks is printed for the same reason: so the cut is reviewable
    instead of assumed.

Adding a producing verb or artifact noun here when a new phrasing appears is
expected maintenance, not a workaround.

Framework-layer home: `.kenovis/AI/policies/documentation.md` -> "An Instruction
That Produces An Artifact Names Where It Goes, And A Template Is Never Where",
first half -- including the part this script cannot see, that "delivered in
session, no file" is itself a destination and silence is not. Same gap as
`check_template_refs.py` had: the destinations were present at ~20 sites and
the rule requiring them was written nowhere an agent loads. Verified
2026-08-13 (PRODUCT/ROADMAP.md item 37).
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FRAMEWORK = ROOT / "framework"
SEARCHED = ("commands", "workflows")

BLOCK_HEADING = re.compile(r"^#+ *(?:Step|Phase) +\d+\b.*$", re.MULTILINE)

PRODUCING_VERB = r"(?:generate|create|produce|write|draft|prepare|publish|output|record|deliver)"
ARTIFACT_NOUN = r"(?:report|result|summary|plan|notes|options|recommendations|spec|specification|adr|record|document)"
PRODUCES = re.compile(rf"\b{PRODUCING_VERB}\b[^.\n]{{0,60}}\b{ARTIFACT_NOUN}\b", re.IGNORECASE)

# A produced artifact is accounted for when the block either names a Product-layer
# destination, or says plainly that the artifact lives in the session and does not
# become a file. Both are correct answers to "where does this go?"; what is not
# acceptable is neither.
DESTINATION = re.compile(
    r"DECISIONS\.md|PRODUCT/|DOMAIN/|ENGINEERING/|AUTOMATIONS/|AI/memory/|CHANGELOG\.md",
)
SESSION_ONLY = re.compile(
    r"not a file to create|delivered to the human in this session|"
    r"presented to the human in this session|shapes this session",
    re.IGNORECASE,
)

# Writing a produced artifact anywhere under `.kenovis/` is the failure this
# whole check exists to prevent, so a block that names such a path as an output
# fails regardless of what else it says.
KENOVIS_PATH = re.compile(r"`?\.kenovis/[^\s`)]+")


def blocks(text: str):
    """Split a document into (heading, body) pairs. The heading list is the population."""
    matches = list(BLOCK_HEADING.finditer(text))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        yield match.group(0).strip(), text[match.start():end]


def main() -> int:
    total_blocks = 0
    producing_blocks = 0
    errors = []

    paths = sorted(
        path
        for directory in SEARCHED
        for path in (FRAMEWORK / directory).rglob("*.md")
    )
    if not paths:
        print(f"No framework documents found under {FRAMEWORK.relative_to(ROOT)}.")
        return 1

    for path in paths:
        rel = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8")
        for heading, body in blocks(text):
            total_blocks += 1
            if not PRODUCES.search(body):
                continue
            producing_blocks += 1
            if DESTINATION.search(body) or SESSION_ONLY.search(body):
                continue
            errors.append(
                f"{rel}: {heading} — produces an artifact without naming where it goes"
            )

    if errors:
        print("An instruction produces an artifact and names no destination:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nSay one of two things: the Product-layer document that records the "
            "artifact's durable residue, or that it is delivered in the session and "
            "is not a file to create. Never a path under `.kenovis/` — "
            "`kenovis sync` replaces that directory wholesale (DECISION-024)."
        )
        return 1

    print(
        f"Artifact destinations hold: {producing_blocks} artifact-producing blocks "
        f"of {total_blocks} Step/Phase blocks, each naming a destination or stating "
        f"it is session-only."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
