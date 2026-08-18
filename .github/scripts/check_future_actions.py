#!/usr/bin/env python3
"""Verify every learning's future action has a disposition.

A round finds more than it fixes. `.kenovis/AI/policies/documentation.md` ->
"A Finding Is Fixed, Scheduled, Or Rejected" says each of those findings gets
one of three dispositions, and that being described in prose is not one of
them. Most of that rule cannot be checked by a machine -- detecting "a finding"
inside narrative prose has no pattern, which is why item 6 correctly refused to
build a check for the equivalent problem in the Product-layer templates.

This is the part that can. `AI/memory/learnings.md` has a fixed structure, so
"a future action naming work that exists nowhere else" is mechanically visible:
every `Future action:` must be followed by a `Disposition:` line that either
cites a queue id / roadmap item, or states that no work is implied.

Measured before this check existed: 23 future actions, 5 naming the roadmap,
and the oldest open one -- `/architect` never run from a real Installation --
repeated in four rounds' closing paragraphs without ever becoming an item.

WHAT THIS CHECK CAN AND CANNOT DO, per AI/memory/learnings.md Learning-021 and
Learning-022:

  - The POPULATION is exact: every `Future action:` inside a `## Learning-NNN`
    block, in the active learnings file AND in its archive. The per-file counts
    print on every run. The archive is in the population deliberately: item 20
    moved 22 of 24 learnings there, and a corpus that silently shrank from 24 to
    2 while still reporting a pass is the exact failure this guard exists to
    catch, one level up.

  - The CLASSIFIER is trivial and honest about being shallow: a disposition
    counts when it cites an id (`OF-NN`, `item N`) or contains the explicit
    no-work phrase. It cannot tell a correct disposition from a plausible one
    -- citing the wrong item passes.

  - It does NOT cover findings parked in `PRODUCT/ROADMAP.md` prose, which is
    the larger half of the same leak and has no mechanical form. Item 29's
    sweep is the manual counterpart, and it has to be repeated by hand.

Framework-layer home: `.kenovis/AI/policies/documentation.md` -> "A Finding Is
Fixed, Scheduled, Or Rejected" states the rule (its closing `Future action:`
clause); `.kenovis/AI/templates/product-layer/AI/memory/learnings.md` ->
"Learning Format" carries it inside the document the rule governs, so an
Installation meets it while writing its first learning rather than by having
read a policy first. Verified 2026-08-13 (PRODUCT/ROADMAP.md item 37).

Scope: this repository's CI only. The bundle ships `.kenovis/AI/`, not
`.github/`, so a customer Installation runs this script never and carries the
rule always. That is the intended split, not a gap -- the rule is what travels
and this file is a local net over this repository's own dogfooding
(DECISIONS.md DECISION-026). An earlier version of this paragraph said the gap
closed "until `kenovis check` ships (PRODUCT/ROADMAP.md item 25)"; item 25 is
rejected and `kenovis check` will not ship.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LEARNINGS = [
    ROOT / "company-os" / "AI" / "memory" / "learnings.md",
    ROOT / "company-os" / "AI" / "memory" / "LEARNINGS-ARCHIVE.md",
]

LEARNING_HEADING = re.compile(r"^## (Learning-\d{3})\s*$", re.MULTILINE)
FUTURE_ACTION = re.compile(r"^Future action:\s*$", re.MULTILINE)
DISPOSITION = re.compile(r"^Disposition:(.*)$", re.MULTILINE)

CITES_ID = re.compile(r"\bOF-\d{2}\b|\bitem \d+\b", re.IGNORECASE)
NO_WORK = re.compile(r"no work implied", re.IGNORECASE)


def learning_blocks(text: str):
    """(id, body) per learning. The heading list is the population."""
    matches = list(LEARNING_HEADING.finditer(text))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        yield match.group(1), text[match.end():end]


def main() -> int:
    total = 0
    errors = []

    for path in LEARNINGS:
        if not path.exists():
            print(f"{path.relative_to(ROOT)} not found.")
            return 1

        text = path.read_text(encoding="utf-8")
        in_file = 0

        for learning_id, body in learning_blocks(text):
            if not FUTURE_ACTION.search(body):
                continue
            in_file += 1
            where = f"{path.name} {learning_id}"
            disposition = DISPOSITION.search(body)
            if not disposition:
                errors.append(
                    f"{where}: future action with no `Disposition:` line — "
                    f"the work it names exists nowhere else"
                )
                continue
            stated = disposition.group(1)
            if not (CITES_ID.search(stated) or NO_WORK.search(stated)):
                errors.append(
                    f"{where}: `Disposition:` neither cites an id (OF-NN, item N) "
                    f"nor states that no work is implied"
                )

        print(f"  {path.relative_to(ROOT)}: {in_file} future actions")
        total += in_file

    if not total:
        print("No future actions found — the corpus is empty, which is not a pass.")
        return 1

    if errors:
        print("A future action names work with no disposition:\n")
        for error in errors:
            print(f"  {error}")
        print(
            "\nEvery future action either cites a queued finding / scheduled item in "
            "`PRODUCT/ROADMAP.md`, or states that no work is implied — see "
            '`.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, '
            'Scheduled, Or Rejected".'
        )
        return 1

    print(f"Future actions hold: {total} future actions, each carrying a disposition.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
