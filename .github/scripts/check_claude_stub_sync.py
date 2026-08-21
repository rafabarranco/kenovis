#!/usr/bin/env python3
"""Verify this repository's own root CLAUDE.md names the same routing table,
in the same order, as the generated stub every customer Installation gets.

Root `CLAUDE.md` is hand-authored and exempt from the CLI's stub generation
(DECISIONS.md DECISION-020) -- this repository dogfoods the product, so its
own root CLAUDE.md carries real, repo-specific prose a generated stub would
discard. `policies/documentation.md` -> "A Finding Is Fixed, Scheduled, Or
Rejected" itself cites "CLAUDE.md -> 'Nothing Stays In The Thread'" as the
canonical home of the finding-routing table, and that table is meant to say
the same thing everywhere it appears: here, and in the stub `kenovis
init`/`add`/`sync` writes into a customer's own root CLAUDE.md
(`claudeStubContent`, `cli/src/domain/installation.ts`).

Those are two independently hand-maintained copies of the same six-row table,
with nothing keeping them in sync -- exactly the risk `policies/documentation.md`
-> "Single Source of Truth" already names for the policies themselves ("two
copies of a rule do not stay identical: each is edited by whoever is looking
at that file, neither reader opens the other"). `PRODUCT/ROADMAP.md` OF-27
found the general case (a framework-level rule written into root CLAUDE.md
reaches zero customers unless something else carries it there); this table is
the one rule that *was* carried there, by hand, which is its own drift risk
rather than evidence the general problem is solved.

This check does not compare prose -- wording legitimately differs (a markdown
table here, a bullet list in the generated stub). It compares the one thing
that has to match exactly: the ordered list of `company-os/...` destination
paths each source's routing table names. A future edit that adds, removes,
reorders or retargets a finding kind in one place and not the other fails
here immediately, instead of silently diverging until someone reads both side
by side.

Framework-layer home: none. This is a fact about two files specific to this
one dogfooded repository (root CLAUDE.md's DECISION-020 exemption only exists
here; every other Installation's CLAUDE.md *is* the generated stub, so the
two can never diverge there) -- there is no framework-layer instruction to
place, only a structural comparison to run, the same bar `check_links.py` and
`check_github_citations.py` already apply to their own single-fact checks.

Scope: this repository's CI only. `PRODUCT/ROADMAP.md` OF-27, DECISION-053.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CLAUDE_MD = ROOT / "CLAUDE.md"
INSTALLATION_TS = ROOT / "cli" / "src" / "domain" / "installation.ts"

CLAUDE_SECTION = re.compile(
    r"## Nothing [Ss]tays [Ii]n [Tt]he [Tt]hread\n\n(.*?)\n\n---", re.DOTALL
)
CLAUDE_PATH = re.compile(r"`(company-os/[^`]*)`")

TS_ROUTING_BLOCK = re.compile(r": `- Improvement.*?what they need`;", re.DOTALL)
TS_PATH = re.compile(r"→ \\`(company-os/[^\\]*)\\`")


def main() -> int:
    missing = [p for p in (CLAUDE_MD, INSTALLATION_TS) if not p.exists()]
    if missing:
        for path in missing:
            print(f"{path.relative_to(ROOT)} not found.")
        return 1

    claude_text = CLAUDE_MD.read_text(encoding="utf-8")
    ts_text = INSTALLATION_TS.read_text(encoding="utf-8")

    claude_section = CLAUDE_SECTION.search(claude_text)
    if not claude_section:
        print(
            "CLAUDE.md: no \"## Nothing stays in the thread\" section found — "
            "has the heading been renamed or removed?"
        )
        return 1
    claude_paths = CLAUDE_PATH.findall(claude_section.group(1))

    ts_block = TS_ROUTING_BLOCK.search(ts_text)
    if not ts_block:
        print(
            f"{INSTALLATION_TS.relative_to(ROOT)}: the non-pending routing block "
            "(claudeStubContent) was not found in its expected form — has it moved or "
            "been reworded?"
        )
        return 1
    ts_paths = TS_PATH.findall(ts_block.group(0))

    print(f"  CLAUDE.md: {len(claude_paths)} routed destinations")
    print(f"  {INSTALLATION_TS.relative_to(ROOT)}: {len(ts_paths)} routed destinations")

    if claude_paths != ts_paths:
        print(
            "\nCLAUDE.md's own routing table and the generated customer stub's routing "
            "table have drifted:\n"
        )
        print(f"  CLAUDE.md:        {claude_paths}")
        print(f"  installation.ts:  {ts_paths}")
        print(
            "\nBoth must route the same six finding kinds to the same destinations, in the "
            "same order — see this script's own docstring and "
            '`framework/policies/documentation.md` → "Single Source of Truth".'
        )
        return 1

    print(f"\nCLAUDE.md and the generated customer stub route all {len(claude_paths)} "
          "destinations identically.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
