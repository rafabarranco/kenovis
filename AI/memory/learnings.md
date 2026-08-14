<!-- PROJECT-SPECIFIC: this product's own recorded knowledge; the rules around it are framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

AI Learnings

Version: 1.19
---
Scope

The rules in this document are framework-level and reusable.

The learnings recorded by the AI while working on a product are project-specific and must be cleared when starting a new product.
---
Purpose

This document stores accumulated organizational knowledge.

The purpose is to capture:

- Important lessons.
- Repeated mistakes.
- Successful patterns.
- Process improvements.
- Technical discoveries.
- Product insights.

This file represents the experience gained by the organization over time.
---
Learning Philosophy

A learning is not a record of what happened.

A learning explains:

What happened

↓

Why it happened

↓

What was learned

↓

What should change in the future

---
What Should Be Stored

Store learnings about:

- Architecture decisions.
- Development processes.
- Product discovery.
- User behaviour.
- Technical limitations.
- Failed approaches.
- Successful approaches.
---
What Should NOT Be Stored

Do not store:

- Temporary tasks.
- Daily progress updates.
- Completed tickets.
- Meeting notes.
- Personal opinions without evidence.
- Project-specific details that have no future value.
---
Learning Format

Every learning should follow this structure:

## Learning ID

Date:

Category:

Context:

Problem:

What happened:

Root cause:

Learning:

Future action:

`Future action:` either cites the id of a scheduled item or queued finding in `PRODUCT/ROADMAP.md`, or states that no work is implied. A future action naming work that exists nowhere else is a finding with no disposition wearing a different field name — see `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected".

---
Categories

Use one of these categories:

Architecture

Engineering

Product

Business

Security

Process

User Experience

Performance

Operations

---
Recorded Learnings

Example: Process — a process with no exit half runs zero times and reports nothing

## Learning-025

Date:
2026-08-12

Category:
Process

Context:
Executing this file's own Review Process for the first time (`PRODUCT/ROADMAP.md` Phase 1 item 20), via `/next`. The process had been documented since initialization and had a checkpoint pointing at it inside `.kenovis/AI/commands/init-project.md`. It had never run once, over 24 recorded learnings and 76 KB.

Problem:
Eighteen of the 24 entries carried a `Disposition:` line ending in "candidate for promotion by item 20" — written by the rounds that recorded them, each correctly identifying that its learning was a standing rule belonging in a policy. Every one of those rounds stopped at identifying it. No rule ever moved.

What happened:
The Review Process said what to look for ("repeated problems, patterns, opportunities to improve policies") and where a rule goes ("move it to `.kenovis/AI/policies/`"). It never said what happens to the entry afterwards. So "move" had no completion state: a round could write the rule into a policy and leave the learning in place, and nothing in the process would call that wrong — the rule would then live in two documents, one loaded per task and one loaded at session start.

Facing that ambiguity, every round did the cheaper half — noted the candidacy in the disposition line and moved on. The note reads like a step in a process. It is a step in no process.

Root cause:
An instruction with no defined finished state is not a weak instruction, it is an optional one, and what makes it optional is invisible: each individual round's decision to defer looks reasonable, because the alternative was undefined. This is [[Learning-024]] in the same file it was recorded in — there, a command could not perform the action its own step required; here, a process could not tell anyone when its action was complete. Both produce the same artifact: a rule that reads perfectly and executes never.

The multiplier is that the deferral was *recorded*. "Candidate for promotion by item 20" is a well-documented deferral, and a well-documented deferral reads as handled — the same mechanism [[Learning-024]] found routing findings into sinks nothing consults at decision time.

Learning:
A process that moves something between documents states its completion condition in terms of both ends: what the destination gains, and what the source loses. "Move it to X" is half an instruction; the half that gets skipped is always the removal, because the addition is the part that feels like progress.

And a recurring "candidate for" note is data, not bookkeeping. Eighteen entries independently reaching the same conclusion and none acting on it is evidence that the action was not available, not that eighteen rounds were careless.

Future action:
`.kenovis/AI/policies/documentation.md` and both learnings templates now state the completion condition — rule into the policy, policy cites the learning id, entry archived verbatim, one line left behind. `.github/scripts/check_learning_promotions.py` enforces the pointer half in this repository's CI; it found a real gap on its first run (a rule promoted into `coding.md` that never cited Learning-010). It cannot check that a policy section contains the rule it claims, only that the section and the citation exist.

Disposition: No work implied — the process gap is closed by item 20 itself. The customer-facing half of the enforcement was item 25, **which was rejected on 2026-08-12** (DECISION-026: an on-demand CLI subcommand is a linter beside the AI-OS, not the AI-OS). It is carried by item 37 — each guard's rule gets a Framework-layer home in `.kenovis/AI/`, delivered by `sync`, in force on the next task with nothing to invoke. Corrected 2026-08-13; the stale citation is `PRODUCT/ROADMAP.md` OF-59 and its class is OF-22.

---

## Learning-026

Date:
2026-08-13

Category:
Process

Context:
Item 39, written to make the findings rule reach every session. The plan named this repository's root `CLAUDE.md` as the destination for the rule's most important half, on the reasoning that `CLAUDE.md` is autoloaded in every session with no command required. That reasoning is correct about this repository and false about every Installation.

Problem:
An Installation's root `CLAUDE.md` is generated by the CLI — `claudeStubContent` in `cli/src/domain/installation.ts` — as a minimal stub that points at `.kenovis/AI/SYSTEM.md`. It shares a filename with this repository's constitution and no content. Writing the rule into `CLAUDE.md` would have shipped it to exactly zero customers, in an item whose stated purpose was reach, satisfying every reviewer who checked that the rule was written where it was planned.

What happened:
Caught only because the item's own scope note asked which file a customer actually receives, and the answer required reading the CLI rather than the framework. Nothing in the plan would have surfaced it — the destination existed, the write succeeded, and the file is genuinely autoloaded here.

Root cause:
Two files sharing a name and a role are assumed to share content, and the assumption is never phrased as a claim, so it is never checked. DECISION-020 exempted both root files from the `.kenovis/` migration and thereby created the divergence, correctly, for reasons that had nothing to do with rule distribution.

This is [[Learning-009]] one layer in — there, a rule reasoned about "the customer" was checked against the origin repository; here, a rule reasoned about "the file every session loads" was checked against the origin repository's copy of a file the customer receives differently.

Learning:
Before writing a rule into a file, establish what the customer's copy of that file contains — by reading the code that produces it, not by reading the file in front of you. "It is autoloaded" is a property of a path in one repository, not of a document.

The general form: when a framework and its installations both have a file at path P, `P` is two documents. Any instruction that says "put it in P" is ambiguous until someone says which one, and the ambiguity resolves silently toward the one the author can see.

Future action: `PRODUCT/ROADMAP.md` → OF-27 carries the work — deciding which of the two files is authoritative, and whether the stub should be generated from the constitution's framework-level sections. Not scheduled as an item yet; it re-opens a boundary DECISION-020 set.

Disposition: Open — rule not yet promoted to a policy. Candidate destination is `.kenovis/AI/policies/architecture.md` → "Distribution Is Part Of The Architecture", which already holds Learning-009 and is where this belongs if OF-27 confirms the class rather than the instance.

---

## Learning-027

Date:
2026-08-13

Category:
Process

Context:
A `/analyze` run on the founder's question of whether this AI-OS had lost the purpose it was built for. The purpose is stated as: an operating system that acts as a complete software development team, observing continuously, routing each discovery to the role that owns it, refining it into planned work, so the founder never has to ask whether something was noticed.

Problem:
The capture half of that model is built, enforced and shipped. The processing half is not, and nothing had said so. Counted off the tree the same day: `grep -rin "refine"` across commands, workflows, policies and agents → **2**, both in `designer.md` and both about visual design. `grep -rn "Open Findings\|disposition" .kenovis/AI/agents/*.md` → **0**. Meanwhile ten CI guards, 1198 lines, enforce the capture half, and 18 of 30 queued findings are about that machinery rather than about what the product does for a team.

What happened:
Every round was honest and every round drifted the same way. `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" made byte counts, grep counts and guard exit codes verifiable, and rounds honoured it. The mission had no such form — no round could show it had moved the product toward replacing a development team — so rounds closed on what they could demonstrate. Four consecutive rounds recorded the drift as a caveat and widened it, which item 37 already stated before this analysis found the reason.

Root cause:
An operating system optimises what it can verify about itself. Where a purpose has no checkable form and its instrumentation has ten, the instrumentation wins every round on merit, and each individual decision is defensible. The drift is therefore invisible from inside a round and fully visible in the aggregate — which is why it took a human reading eleven rounds at once to name it, the twelfth time in this document that a structural miss was found by asking rather than by the system.

The amplifier is a ranking error. `commands/next.md` Step 3 applies one priority formula — `Pain × Frequency × Business Impact / Cost` — to two populations that do not share an axis: findings whose pain is a customer's, and findings whose pain is the framework's own. The second have low, exactly-known Cost; the first have Cost that is unknown or needs an external party. The formula does not fail, it resolves correctly toward the wrong population, every time.

This is [[Learning-025]] at company scale. There, an instruction with no defined finished state became an optional one and every round did the cheaper half. Here, an objective with no defined verifiable state became an unrankable one, and every round did the measurable half.

Learning:
A rule that makes claims checkable will, on its own, bend the work toward whatever is cheapest to check. It is not a neutral discipline — it is a selection pressure, and it needs a counterweight written in the same verifiable form, or the mission loses to its own instrumentation while every round's record stays clean.

The general form: when a system can prove it recorded something and cannot prove it advanced, it will record. State the objective as a question a closing round has to answer, or it is not in force no matter how prominently it is written.

And when two kinds of work share a queue, check that they share the axis the queue ranks on before trusting the ordering. Two populations under one formula is not a prioritisation, it is a filter.

Future action:
`PRODUCT/ROADMAP.md` item 40 carries the work — the objective in checkable form, the queue's two populations separated, and a founder-set constraint on how many rounds may close on instrumentation before external validation runs again. OF-31, OF-32, OF-33 and OF-35 carry the four operating-model steps the framework does not implement.

Disposition: Open — rule not yet promoted to a policy, and deliberately so. The candidate destination is `.kenovis/AI/policies/documentation.md` → "A Claim Is Read Back Off The Artifact", which is the section this learning is about; adding the counterweight there before item 40 settles what the objective's checkable form *is* would write a rule with nothing behind it, which is the shape [[Learning-024]] records.

---

## Learning-028

Date:
2026-08-13

Category:
Process

Context:
A second `/analyze` the same day as [[Learning-027]], on the same founder question. This one had an input the first did not: the founder pasted the actual document — 17 sections defining Kenovis's operating model, its absolute priority, its discovery chain, its role routing and its core invariant — in order to ask whether the system had lost it.

Problem:
That document is not in the repository, and never was. Measured the same day: `grep -ril "Core Operating Model\|NOTHING DISCOVERED MAY BE LOST\|Non-Negotiable Rules"` over the Product layer → **0**; `"without requiring a conventional human development team"` → **1**, a partial quote inside the roadmap item written about this same gap; `"institutional memory"` → **0**. `COMPANY_OS.md` holds vision, thesis, market, principles. `DOMAIN/BUSINESS_RULES.md` holds five rules, none of which governs how the AI-OS itself must behave.

What happened:
Item 40 had already found that the mission has no checkable form, and read that as a drafting gap — something to be written later, once the objective was settled. It was not unsettled. It was authored, complete, and held by the founder outside the system, so every round measured itself against the criteria that were on disk, which were all instrumentation.

Root cause:
A memory system that does not contain its own specification cannot detect its own drift, because the criterion it would measure against is the thing that is missing. Every mechanism this framework built to stop knowledge dying in a thread — the routing table, the dispositions, the queue, the declaration line, ten guards — was aimed at findings produced *during* work. None of them apply to the document that says what the work is for, because that document never enters through a round; it enters through the founder, once, and if it is not written down at that moment there is no later moment.

This is [[Learning-024]]'s sink problem inverted. There, a fact was written to a destination nothing reads. Here, the highest-value fact was never given a destination at all, and its absence is silent in a way a wrong destination is not: nothing is missing from any file, because no file was ever expected to hold it.

Learning:
The first thing a product's context layer must contain is the statement of what the product is for, in the words of whoever decides it. Not paraphrased into a vision line — the operating rules themselves, at the altitude they were stated, in the documents that already exist to hold non-negotiables.

The general form: **when a human has to paste something in order to ask whether it was lost, it was lost.** The paste is the evidence, not the remedy — and the same is true of every founder answer given in conversation during setup, which is the moment `/init-project` and `/adopt-project` own and the only moment this class of knowledge arrives.

Second half, recorded because it happened inside this entry's own round and is the sharper form of the lesson: **the round that found this filed a queue row asking that the document be written down, while holding the document.** It did not write it. The founder answered with three words and the file exists now — `PRODUCT/OPERATING_MODEL.md`, verbatim, provenance included.

Why that happened, and it is not carelessness: `/analyze` is forbidden from implementing, and "write the founder's document into the Product layer" was classified as implementing. It is not — it is recording, which that command's own text says is the difference between analysis and implementation, in a sentence added by item 26 for this exact reason. [[Learning-024]] one turn later, in the command where [[Learning-024]] was already applied.

The distinction the framework does not draw: **a finding is something the work discovered; a supplied artifact is something a human handed over.** The first gets a disposition. The second gets written down, immediately, and giving it a disposition instead is how it leaves with the thread. Collapsing the two also inverts the founder/AI split — it returns the founder's own text to the founder as a question to answer.

Future action:
`PRODUCT/ROADMAP.md` → **OF-40** carries the supplied-versus-found distinction. **OF-36** is half fixed (the document is on disk); its reconciliation with `COMPANY_OS.md` and `DOMAIN/BUSINESS_RULES.md` stays Open and is item 40 part 1's now-available input. **OF-39** carries what that reconciliation runs into — two Source Of Truth Hierarchies that disagree, neither ranking the operating model. **OF-37** and **OF-38** are the two other structural findings from the same run.

Disposition: Open — rule not yet promoted to a policy. Two candidate destinations, and they are different rules: the supplied-versus-found clause belongs in `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected", and asking for the founder's own statement of purpose belongs in `/init-project` and `/adopt-project`, which are where it either lands on disk or does not and where neither asks for it today. Deliberately not written before OF-36's reconciliation half settles which documents receive which sections, per the reasoning in [[Learning-027]]'s own disposition.

---

## Learning-029

Date:
2026-08-13

Category:
Process

Context:
A third `/analyze` the same day as [[Learning-027]] and [[Learning-028]], on the same founder question — whether this AI-OS still serves its stated purpose. The operating model was already on disk from the previous round, so this round's only new input was one sentence of founder framing about the repository's own layers.

Problem:
`PRODUCT/ROADMAP.md` item 40 is the item that diagnoses the drift, and it measures it as `wc -l .github/scripts/*.py` → **1198** against `find cli/src -name '*.ts' | xargs wc -l` → **2604**, concluding "repository-only infrastructure is 46% the size of the shipped product". The shipped product is not `cli/src`. `cli/scripts/bundle-framework-assets.mjs` copies `.kenovis/AI/` verbatim into the published bundle — **64 files, 419,098 bytes** — and the TypeScript is the delivery mechanism for it. Same item, same paragraph: 19 of the last 30 commits touched `.kenovis/AI/policies`, counted as instrumentation, when DECISION-026 defines exactly that directory as where an improvement lands *because that is the product*.

What happened:
The round that was diagnosing "every round optimises the instrumentation because only the instrumentation is measurable" reached for the measurable thing — lines of code — and thereby defined the product as its code. The finding was correct and its own evidence enacted the error it describes.

Root cause:
A ratio is an argument, and its denominator is a claim about what the product is. When the product is markdown that an agent loads, `wc -l` over `src/` is not a smaller measurement of it — it is a measurement of something else. The failure is specific to products whose deliverable is not code, which is this one, and it is invisible because every instinct for "measure the product" reaches for the source tree.

Second half, and it is the same error from the other end: the founder described `.kenovis/` as "an example of a build" in the same session. It is the product's source. Both parties were reading the repository as *a CLI with some docs beside it*, when it is *an AI-OS with a CLI that ships it*. The tree says so — `ENGINEERING/ARCHITECTURE.md` line 97, DECISION-020, the bundle script's own header — and being written down did not make either reader hold it.

Learning:
**Before measuring the product, state what the artifact a customer receives actually is, and check the denominator against that.** For this product it is `.kenovis/AI/` plus the CLI that delivers it, not `cli/src`.

The general form: **a measurement that has to define the product in order to divide by it is making a product decision, and should say so.** When a round's conclusion turns on a ratio, the denominator is the part to verify first — it is the half nobody checks, because it looks like arithmetic rather than judgement.

And the corollary this round adds to [[Learning-028]]: a fact being on disk, correct, in three places, is not the same as it being held. Three documents recorded the layering and both the founder and the analysing round still worked from a different one. `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read" asks what reads a destination; this asks the harder version — whether what read it came away with the fact.

Future action:
`PRODUCT/ROADMAP.md` → **item 41** is where all of this now sits: the founder flagged 1:1 conformance to `PRODUCT/OPERATING_MODEL.md` as maximum priority in the same session, and the item carries a section-by-section conformance table — five `Present`, nine `Partial`, three `Absent`. **OF-41** carries the re-count, and it must be settled before item 40 part 3, which is a founder decision on a standing constraint that would otherwise be set against the wrong figures. **OF-42** carries founder/repository model divergence and should be decided with OF-35, which asks the same honest question about whether detection is achievable at all. **OF-43** carries the cost this keeps producing — three full analyses in one day because no document holds the answer.

Disposition: Open — rule not yet promoted to a policy. The candidate destination is `.kenovis/AI/policies/documentation.md` → "A Claim Is Read Back Off The Artifact", which already requires a claim to be read off the artifact and does not yet require the artifact to be the right one. Deliberately not written before OF-41 settles the figures, for the reason [[Learning-027]]'s disposition gives: a counterweight added before its own input exists is a rule with nothing behind it.

---

## Learning-030

Date:
2026-08-13

Category:
Process

Context:
A fourth `/analyze` the same day, this one auditing the product against the now-recorded operating model, with a second supplied artifact in the input: the founder's usage model — one thread per `/next`, `/next` + `/analyze` + `/explain` as the three commands that actually run, the loop ending when the roadmap empties.

Problem:
Two things, and the second is the one worth keeping.

First: `git status --short` → `?? PRODUCT/OPERATING_MODEL.md`. The document written the previous round to close OF-36 — the founder's specification, ranked by `PRODUCT/ROADMAP.md` item 41 above every other Product-layer file — was **untracked**. Written, correct, verified byte-identical to the founder's paste, and one `git clean` from gone. Neither the round that wrote it nor the round that scheduled a maximum-priority item around it noticed.

Second: knowing the *cadence* changed which defects mattered, and it did so without any new code being read. `commands/next.md` Step 15 writes a "Next" pointer and says the next run reads it; Step 3 names two inputs and not that one. That has been true for every version of the file and read as a minor redundancy — until "one thread per item" made the pointer the *only* carrier of ordering rationale across threads, at which point it became the defect that costs most. Same for the 131 KB roadmap: a slow leak against unbounded sessions, a fixed toll per step under a known cadence.

What happened:
Every mechanism the framework has for durability ends at "write it to a Product-layer file". `policies/documentation.md` routes findings to files. `policies/git.md` governs commit scope and branch flow. Nothing joins them, so a file can satisfy the disposition rule completely and still not exist tomorrow.

Root cause:
**The framework's definition of "recorded" is a filesystem write, and the repository's definition is a commit.** In every other respect this AI-OS is careful about the difference between saying something and persisting it — that is the whole product. It carried the same gap one level down, between persisting and committing, and the gap was invisible because a written file *looks* durable in exactly the way a thread does not.

Learning:
**A finding is not recorded until it is committed.** The disposition rule's destinations are files in a git repository, and an uncommitted file is a working-tree artifact with roughly the durability of the thread that produced it.

And the general form of the second half: **a workflow's cadence is part of its specification, and defects rank differently under different cadences.** The same file, unchanged, held a minor redundancy and a first-order defect depending only on whether threads inherit context. Before ranking work against a workflow, know how the workflow is actually run — and if that is not written down, it is missing input, not a detail.

Corollary that held up and is worth stating because it worked: the founder supplied the cadence in a prompt, and it went to disk verbatim as `PRODUCT/OPERATING_MODEL.md` → Addendum A in the same round, rather than becoming a queue row asking someone to write it. That is [[Learning-028]]'s supplied-versus-found distinction applied on its second occasion, one day after it cost a document.

Future action:
`PRODUCT/ROADMAP.md` → **OF-45** carries the untracked specification and the rule behind it; it is step 0 of the current Next and is the founder's to close. **Item 42** carries the cadence work — the archive pass (OF-51/OF-23), `/next` reading its own pointer (OF-46), `/next` handling a human-only item (OF-47), `/explain`'s contradicting instruction (OF-48) and the eleven files that may share its shape (OF-52), and the empty-roadmap terminal state (OF-49). **OF-50** puts the specification on the session-initialization path and sequences with item 41 step 1.

Disposition: Open — rule not yet promoted to a policy. The commit clause belongs in `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" and touches `policies/git.md`, which is the seam it falls through; the cadence clause belongs wherever item 41 step 2 puts the conformance criterion. Deliberately not written before OF-45 is decided, since the instance and the rule are one round's work and splitting them is how the instance gets fixed and the rule does not.

---

## Learning-031

Date:
2026-08-13

Category:
Process

Context:
`PRODUCT/ROADMAP.md` item 42 part 1 — the third archive pass, scheduled as the cheapest change on the board with a written procedure that had already been run twice.

Problem:
The pass ran, and running it broke CI. `check_item_findings.py` failed with "No closed items with a narrative — nothing to check, which is not a pass", on a repository that had just done precisely what `policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline" requires.

What happened:
Two rules, each correct in isolation. The archive rule says closed items move out and leave one line. The findings guard says every closed item declares what it left behind, and treats an empty population as a corpus that was never written. Archive the last inline narrative and the guard's population is zero — so the archive rule, run to completion, makes the findings rule unenforceable and then unsatisfiable.

Nothing had detected it because the two had never been in the same state at the same time: every previous pass left some inline narratives behind, not by design but because there were always more items than the pass moved.

Root cause:
**A rule that constrains a population never says what happens when the population empties, and another rule is usually what empties it.** The findings guard's author reasoned about a corpus that grows. The archive rule's author reasoned about a corpus that sheds. Neither reasoned about the corpus reaching zero, which is the state the two rules jointly produce and which each one reads as an error in the other's direction.

Learning:
**Two lifecycle rules can be individually correct and jointly unsatisfiable, and the collision only appears when one of them is run to completion.** Partial compliance hides it indefinitely — which means the collision surfaces on the day someone finally does the thing properly, and looks like their change broke something.

Second half, and it is the one with teeth: **a rule written before a section exists does not cover that section by implication.** The archive rule was written in item 21 and named a document's "entries"; the findings queue arrived in item 28. For two archive passes the queue was simply outside the rule, and it reached 44% of the document with a clean guard, because nothing anywhere said the rule did not apply to it. Absence of an exclusion read as inclusion, and no measurement contradicted it because the guard the queue was invisible to was passing.

Future action:
`PRODUCT/ROADMAP.md` → **OF-61** carries the residue: the guard is now permanently inert in a fully-archived roadmap, and the fix makes that inertness pass silently. It is OF-21's question from the other side and is deliberately not resolved before item 37 completes (DECISION-026 forbids an eleventh guard). **OF-62** carries the other consequence — the archive rule has no lever left on a 129 KB document whose remaining weight is all live. The rule half of this learning is already promoted: `policies/documentation.md` 3.4 states that a closed entry is not only a numbered item, and names the queue, superseded planning prose and rejected entries explicitly.

Disposition: Open — the second half is promoted, the first is not, and it now has an id: `PRODUCT/ROADMAP.md` → **OF-63**. The unpromoted rule is "check what empties this population, and what that other rule then reads"; the plausible home is `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run", widened from "run the failing case" to "run the empty case". Not written in the same round because it is a policy section and that round already added two, and OF-24's rule against restating a sibling policy's section applies here as much as anywhere. **The id was added afterwards, and the gap is worth naming:** the deferral was originally recorded in this field with a reason and no id, which reads as handled and is not — [[Learning-025]]'s exact shape, in the file that records it. `check_future_actions.py` reads `Future action:` and not `Disposition:`, so it passed.

---

## Learning-032

Date:
2026-08-13

Category:
Process

Context:
A session that invoked no command, in which the founder instructed that every analysis, execution, learning, decision and finding be checked against `PRODUCT/ROADMAP.md` and planned there if absent.

Problem:
The framework already required a finding to be recorded (DECISION-025) and recorded in-session (DECISION-027). It required neither of the two things that turn a record into a plan: comparing the finding against what is already scheduled, and writing it in a form the ranking can compare.

What happened:
Measured before writing anything: `grep -rni "already scheduled\|already covered\|duplicate finding\|existing item covers" .kenovis/AI/` → **0**, and `grep -rn "Pain" .kenovis/AI/policies/ .kenovis/AI/commands/` → **0**. Yet 41 of this repository's 47 `Open` rows already carried Pain, Frequency and Cost. The practice was near-universal and written nowhere an agent loads — the ranking formula lives at `.kenovis/AI/templates/product-layer/PRODUCT/ROADMAP.md:246`, a Product-layer template the customer owns.

Root cause:
**A practice that forty rounds performed correctly generates no evidence that it is unwritten.** Compliance and a rule look identical from inside the repository that has the habit; they diverge only in an Installation that has no rounds behind it, and no Installation reports back (OF-12). So the gap was invisible to every mechanism here and visible immediately to the founder, who was reasoning about what a *fresh* thread would do.

Learning:
**Recording is not planning.** A finding on disk and absent from the roadmap has been remembered, not scheduled — and remembering is precisely what a thread already does badly. This is the same distinction [[Learning-024]] draws between knowledge sinks: only `PRODUCT/ROADMAP.md` is read to decide what happens next, so a disposition that does not reach it is a well-documented deferral in the wrong place.

Second half: **the strongest habits are the likeliest to be unwritten**, because nothing ever fails to prompt the writing. Look for rules in what a repository always does and never states, not only in what it gets wrong.

Future action:
`PRODUCT/ROADMAP.md` → **OF-66** (six `Open` rows predate the rule and do not meet it), **OF-67** (the policy now requires terms whose definition ships only in a customer-owned template), **OF-68** (`DECISIONS.md` restates index facts in prose and they go stale on every added decision). The rule half is promoted: `policies/documentation.md` 3.5, recorded as DECISION-029.

Disposition: Fixed as a rule — `policies/documentation.md` 3.5, DECISION-029 — with three residues queued as **OF-66**, **OF-67** and **OF-68**. No unpromoted half. The ids are repeated here rather than only in `Future action:` above because [[Learning-031]]'s disposition failed exactly that way, and `check_future_actions.py` caught this entry doing it again on first run.

---

## Learning-033

Date:
2026-08-13

Category:
Process

Context:
Item 42 parts 2-3, closing OF-46 and OF-47 — both defects in `commands/next.md` Step 3, the step that chooses what a round works on.

Problem:
Step 15 had been writing a `Next` pointer into `PRODUCT/ROADMAP.md` since 2.4, stating in its own text that the following run reads it. Step 3 named two inputs and never the pointer. Every round wrote the ordering rationale and every round threw it away.

What happened:
The two halves were written eleven versions apart, in the same file, by rounds that each verified their own half. Nothing in either half is wrong. The defect exists only in the relationship between them, and no reader of either step is positioned to see it — Step 15's author is finishing a round and Step 3's author is starting one.

Root cause:
**A producer and its consumer are written by different rounds in different states of mind, and only the producer feels like a deliverable.** Writing the pointer is the satisfying half: it closes a round. Reading it is the half that has to be *required*, because a fresh round always has the option of deriving the answer itself and that option looks like diligence rather than waste.

Learning:
When an instruction says "so the next run reads it", that sentence is a claim about a **different file, step or session** than the one being edited, and it is the half least likely to be true. Verify the reader exists, by name, in the same round that writes the producer. [[Learning-024]]'s "before writing *record it in X*, ask what reads X and when" is the same rule; this is its inverse case — there the sink had no reader, here the reader existed and was never told the sink did.

Second half, and it is what makes the pair worth one entry: **the branch a command lacks is the branch for the case it cannot handle**, and that case is invisible precisely because nothing records reaching it. `/next` had no behaviour for an objective only a human can execute, and the observable symptom of that gap is a round doing something *else* — which reads as a productive round. A gap whose symptom is plausible output is not found by reading output.

Future action:
`PRODUCT/ROADMAP.md` → **OF-70** (the pointer is now load-bearing and no round is held to writing one — this round's fix re-opened OF-46's failure through its own fallback clause) and **OF-71** (the new stop-branch names a file to record in and no section of it). Both created by this round's own change and queued in it. The rule half is shipped: `commands/next.md` 2.6 Step 3, DECISION-030.

Disposition: Fixed as a rule — `commands/next.md` 2.6, DECISION-030 — with two residues queued as **OF-70** and **OF-71**. One half of the work is deliberately unvalidated and said so rather than claimed: the stop-branch fires on the next round, which reaches a founder call, and no round can validate its own behavioural change ([[Learning-031]], OF-30).

---

## Learning-034

Date:
2026-08-14

Category:
Process

Context:
Item 41 step 1 — reconciling the two Source Of Truth Hierarchies (OF-39) and putting the specification on the session-initialization path (OF-50), after `/next` stopped on it as a founder call and the founder answered in the same session.

Problem:
OF-39 was written as "two hierarchies, and they disagree". Closing it required reading `COMPANY_OS.md` in full during bootstrap, and that turned up a **third** ordering — `COMPANY_OS.md` → "Knowledge Hierarchy" — which inverts DOMAIN/ and PRODUCT/ relative to the one just settled and omits `DECISIONS.md` entirely. `grep -c "Knowledge Hierarchy"` over the roadmap and its archive returned **0 and 0**.

What happened:
The analysis that raised OF-39 grepped the two documents it already suspected — the two loaded as authoritative — and found them. It never asked how many orderings existed, because the question it was answering was "do these two agree". A finding scoped to a suspected pair cannot report a population.

Root cause:
**A duplicate is found by comparing two things you already have in hand, and a population is found by enumerating.** These are different acts, and the first one feels like the second when it succeeds: OF-39 read as a complete account of the problem for two days, and the fix derived from it corrected two of three copies. Nothing in the framework enumerates rules-restated-elsewhere, which is OF-24's still-open detection half, and this is what that gap costs.

Learning:
When a finding is "X is duplicated", the finding is incomplete until someone has asked **how many copies exist**, by a method that could have returned a number the author did not expect. Fixing the known copies of an unenumerated duplicate leaves the survivors looking authoritative *and* now inconsistent with a rule that claims to be the only one.

Second half, and it is about where the survivor was: the third copy sits in a **Product-layer** document. The fix that landed touches framework files, which `sync` delivers; a Product-layer contradiction is per-Installation and no sync will ever reach it. **A rule with one framework home can still have as many product-layer contradictions as there are customers**, and the framework has no view of any of them.

Future action:
`PRODUCT/ROADMAP.md` → **OF-73** carries the third ordering, sequenced into item 41 step 3 which reconciles `COMPANY_OS.md` anyway. **OF-72** carries the other residue of this round — the shipped hierarchy's rank 1 names a document no Installation has. The enumeration half belongs to OF-24's open detection question and is not re-raised here.

Disposition: Fixed as a rule — one hierarchy, `SYSTEM.md` 1.8, DECISION-031 — with **OF-72** and **OF-73** queued. The rule this learning states is not promoted to a policy: it is a heuristic about how to scope a finding, and `policies/documentation.md` already carries the duplication rule it would sit beside ("Single Source of Truth"), so promoting it would restate a sibling section — which is the thing OF-24 added that section to forbid.

---

## Learning-035

Date:
2026-08-14

Category:
Engineering

Context:
Merging two open pull requests where the second was cut from the first's head, on the founder's instruction to merge everything open **without losing any change**.

Problem:
Merging the base PR with `gh pr merge --rebase` rewrote its commits onto `development`. The stacked PR went `CONFLICTING/DIRTY` carrying three commits — its own, plus two whose content had just landed under different SHAs. The prescribed recovery, rebase and resolve, means resolving conflicts between a branch and an already-merged copy of itself, and a wrong resolution there silently drops work that was already merged.

What happened:
The branch was rebuilt on the new base instead of rebased, and verified by **asserting tree equality against a hash captured before any merge ran** — `git rev-parse <head>^{tree}` recorded up front, compared to `git write-tree` after the rebuild.

The first attempt failed the assertion. `git add -A` had staged `claude-info.md`, an untracked file whose commit is explicitly rejected (OF-45b: it would put a second copy of the specification outside the Product layer). Unstaging it produced a byte-identical tree, and the same hash then appeared on `development` after the merge.

Root cause:
**A diff review answers "do these changes look right"; a tree hash answers "is this the same state".** Only the second question has a mechanical answer, and it is the one being asked during a recovery. A reviewer reading that diff would have seen a file addition with a plausible name and no reason to reject it — the assertion had no opinion and was right.

Learning:
Before an operation that rewrites history, **capture the tree hash of the state that must survive.** Afterwards, assert equality rather than reading the result. It costs one command, it is exact, and it is the only check that distinguishes "nothing lost" from "nothing I noticed lost".

Second half: **`git add -A` is not safe inside a reconstruction.** It stages by working-tree state, which includes untracked files that are deliberately untracked, so it silently widens the very tree being asserted. Stage from the source commit, or assert.

Future action:
`PRODUCT/ROADMAP.md` → **OF-75** carries the missing rule (nothing in `policies/git.md` covers a stacked PR; `grep -cin "stacked\|dependent branch"` → 0) and **OF-74** carries the other half found by the same merge — `--force-with-lease` is inert when the push target is a URL rather than a tracked remote, which is this repository's only path because of OF-65.

Disposition: Open — no rule promoted yet. The technique belongs in `policies/git.md` beside "Rebasing", and it is queued as OF-75 rather than written here because both git findings should land as one section rather than two, and because this round's mandate was to merge the open PRs, not to change the git policy while doing it.

---

## Learning-039

Date:
2026-08-14

Category:
Process

Context:
Bootstrapping a `/next` round to close OF-53, on a repository where `development` requires one approving review to merge a pull request.

Problem:
`policies/git.md` requires every round to branch fresh from `development`. `git rev-list --count origin/development..origin/feature/item-42-parts-4-5-findings-cadence` → **1**: the previous round's entire output was sitting in an open, unreviewed PR, one commit ahead of `development`. A branch cut from `development` at that moment would have started from a `Next` pointer one round stale and duplicated work already done.

What happened:
The gap was created by a fix landing correctly. OF-80 changed `/next`'s completion criterion from the work being merged to the work having "reached a branch" — deliberately, because requiring a merge every round was the wrong bar for a solo maintainer waiting on their own review. That fix removed the pressure to merge before a thread ends, so a PR can now sit open indefinitely, and the very next round to bootstrap is the first place that gap is visible — not as a defect in OF-80's fix, but as a precondition `policies/git.md`'s branch-from-`development` rule was never checked against.

Root cause:
**Two rules can each be correct about the file they govern and still leave a gap at the seam between them**, discoverable only by a round that has to satisfy both at once. `policies/git.md` was written assuming the previous round's work reaches `development` promptly; `commands/next.md`'s completion criterion stopped guaranteeing that, correctly, for a different reason. Neither document names the other's assumption, so the collision is invisible to a reader of either one. This is [[Learning-031]]'s shape one layer over — there, an archive rule and a findings-population rule jointly emptied a corpus neither author had reasoned about; here, a completion-criterion rule and a branch-source rule jointly stall a bootstrap neither author had reasoned about.

Learning:
When a rule changes what "a round is over" means, re-check every other rule that assumed the old finish line — not just the one the change was written for. The other rule does not need to be wrong; it needs to be re-verified against the new state the first rule now permits.

Resolved live rather than reasoned about: the previous round's PR (#114) was self-reviewed against its own CI-passing diff and merged with `gh pr merge --rebase --admin --delete-branch` — the same command `PRODUCT/ROADMAP.md` OF-19 already names as this repository's standard practice — with the founder's explicit confirmation sought and given in this session rather than assumed from precedent alone.

Future action:
`PRODUCT/ROADMAP.md` → **OF-19** carries the standing question this reuses: whether a solo maintainer should keep a review requirement that only `--admin` satisfies, or drop it. No new id — this is a second instance added to OF-19's own row, per DECISION-029.

Disposition: Open — the instance is resolved for this round; the rule (should `/next` check branch currency against an *unmerged* PR, not only a stale local ref, before bootstrapping — extending `commands/bootstrap.md` Step 5 / OF-60's fix) is not written and is part of whatever OF-19 settles.

---

## Learning-040

Date:
2026-08-14

Category:
Process

Context:
Refining `PRODUCT/ROADMAP.md` OF-02 as the first live instance of DECISION-036's new mechanism — every round refines the lowest-id `Open` queue row, per Learning-023's discipline of checking a premise against the tree before writing.

Problem:
The Learning-023 check was scoped to OF-02's own premise (`/architect` still unrun end to end). It surfaced a second, unrelated stale row instead: `git status --short PRODUCT/OPERATING_MODEL.md` was run in the same pass to confirm an unrelated fact, and came back empty — OF-45 claimed that file was untracked, and it had been committed (`72deb8b`) since OF-45 was written.

What happened:
OF-45 was not the row being refined. It was found because refining one row means re-reading the tree around it, and the tree does not know which finding a check was run for — a `git status` run to answer OF-02's neighbour question answered OF-45's question for free.

Root cause:
**A premise check's cost is mostly fixed (open the tree, run the command) and its yield is not limited to the row that motivated it.** Learning-023 was written to stop one item shipping on a stale figure; it does not say the check only counts toward that item. Treating it as scoped to the row being refined would have meant closing OF-45 a second time, later, at full cost, having already paid to discover it was stale.

Learning:
When a round's own premise-check work turns up a second stale row, disposition it in the same pass rather than filing it to revisit — the discovery cost is already spent, and only the write-up remains.

Future action:
None — OF-45 is dispositioned in this round's own change (`PRODUCT/ROADMAP.md`, Fixed).

Disposition: Fixed as a rule — `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected"'s trigger is already "the moment of discovery, not a session boundary" (OF-38), which already covers this; this entry records the instance rather than a new rule.

---

---
Learning Examples

The two entries below are the format examples every Installation receives in its template (see `.kenovis/AI/commands/init-project.md` Step 8). They are not learnings this product recorded.

Example: Architecture

## Learning-001

Date:
2026-01-01

Category:
Architecture

Context:
Introducing a new external service.

Problem:
The service was integrated directly inside business logic.

What happened:
Changing the provider required modifying multiple modules.

Root cause:
The external dependency was not isolated.

Learning:
External services should be hidden behind interfaces.

Future action:
Use adapters for external integrations.

Disposition: No work implied — this is the template's format example, not a learning this product recorded. Item 20 kept it here for that reason rather than promoting it.

---
Example: Product

## Learning-002

Date:
2026-01-01

Category:
Product

Context:
Testing a new workflow.

Problem:
Users ignored a complex configuration screen.

What happened:
The feature adoption was lower than expected.

Root cause:
The workflow required too much setup before providing value.

Learning:
Users should reach the first valuable action as quickly as possible.

Future action:
Prioritize simple onboarding flows.

Disposition: No work implied — this is the template's format example, not a learning this product recorded. Item 20 kept it here for that reason rather than promoting it.

---
Promoted And Archived

The Review Process below ran for the first time on 2026-08-12 (`PRODUCT/ROADMAP.md` Phase 1 item 20). Twenty-two recorded learnings closed: each argued for a standing rule, that rule now lives in the policy that enforces it, and the entry moved verbatim to `AI/memory/LEARNINGS-ARCHIVE.md`.

One line each stays here, naming where the rule went. That is the pointer a session needs; the story behind it is one file away and is read on demand.

A learning is listed as closed only when its rule is findable in the destination named beside it. Where an entry recorded a defect rather than a rule, the closure names what fixed it.

| Learning | What it established | Now carried by |
|---|---|---|
| Learning-038 | A keyword proxy for "does this file carry rule X" measures a phrasing, not a rule; measure a rule's reach by the exact title of the section that states it | Instance-fixed — `PRODUCT/ROADMAP.md` item 42 parts 4-5's progress block corrects the count where it was published. Not yet a policy rule — that promotion is OF-82's own first output |
| Learning-037 | A rule that constrains a later session is tested by "which file does that session load, and is this in it", not by "is it written down" | Instance-fixed — `commands/next.md` 2.8 Step 13 carries the population instruction DECISION-033 moved there. The general failure mode this instance is one of was already promoted by Learning-036; deliberately not restated as a fourth mode |
| Learning-036 | A rule over a population ships whatever creates that population, and states what an empty one means | `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read" |
| Learning-024 | A command that instructs an outcome must permit the action producing it; knowledge sinks are not interchangeable | `policies/documentation.md` → "An Instruction Is Reachable, And Its Sink Is Read" |
| Learning-023 | An item's premise about a file's contents is a claim; verify it while writing the item | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-022 | Enumerate the population the protected property could be violated in, not the population the known defects sat in; a guard states which of its parts is exact and which is a heuristic | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-021 | When fixing a class of defect, enumerate the population, not the matches; if the population is mechanical, the check belongs in CI | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-020 | "Has anyone run this from an installed copy?" predicts latent defects better than any review pass | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-019 | An unverified cost estimate in a deferred item is a decision made by nobody; verify it or mark it unverified | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-018 | State the command that produces a count, not its scope in words | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-017 | A template's passing condition is "no sentence here is true of only one product", not "the questions are marked" | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-016 | Any count in a changelog, decision or roadmap entry is read off the artifact with the command that produces it | `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" |
| Learning-015 | A mechanical check is run against a known-good corpus in the round that introduces it | `policies/testing.md` → "A Check Is Not Verified Until It Has Been Run" |
| Learning-014 | When a change replaces how an artifact reaches its consumer, that artifact's own instructions are inside the blast radius | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |
| Learning-013 | Before adding to a registry of special cases, ask whether the fact belongs inside the artifact being copied | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-012 | A protected-branch promotion chain that ever takes a downstream-only commit is permanently in content-sync mode; that is the standard procedure, not a repair | `policies/git.md` → "Promotion Chains And Content Sync" |
| Learning-011 | A recorded-state guard must enumerate every writer of the guarded file, framework markdown commands included | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-010 | State the CLI writes inside a mirror-replaced directory needs an explicit preserve-or-recompute rule | Fixed — Phase 1 item 1 (`INSTALL_TIME_OWNED_ENTRIES`); rule in `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-009 | A rule reasoned about "the customer" is checked against the tool's own origin repository, which may be a customer of it | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |
| Learning-008 | A recorded-state guard's reference point is a fact recorded at write time, never the current code's output | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-007 | A prefix/marker check proves "we wrote the beginning", not "this content is entirely ours" | Fixed — Phase 1 item 7 (hash sidecar); rule in `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-006 | "This tool may own this file" and "this tool may discard what is in it" are different guarantees; two code paths solving one problem are cross-checked for parity | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-005 | A catch-all dispatch needs the invocations that must not reach it enumerated before the fallback is wired | `policies/coding.md` → "Guards, Recorded State, And Permissive Paths" |
| Learning-004 | An unvalidated "mirror this directory" input reproduces whatever mistake the caller makes; default and escape-hatch paths carry different trust | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |
| Learning-003 | When a business rule names its own rollback mechanism, build against that mechanism instead of reimplementing it | `policies/architecture.md` → "Distribution Is Part Of The Architecture" |

Learning-001 and Learning-002 above are not this product's recorded learnings. They are the format examples every Installation receives in its template (`.kenovis/AI/commands/init-project.md` Step 8 says so), and they stay here as examples of the shape, not as knowledge this company earned.
---
Learning Validation

Before adding a learning, verify:

✓ Is this based on a real experience?

✓ Does this change future behaviour?

✓ Can another project benefit from this?

✓ Is this more than a simple observation?

If the answer is no, do not store it.
---
Priority Levels

Each learning can have a priority:

Critical

Important

Useful

---
Critical

Must influence future decisions.

Examples:

- Security failures.
- Data loss prevention.
- Architecture mistakes.
---
Important

Should be considered regularly.

Examples:

- Development patterns.
- Product lessons.
---
Useful

Helpful but not mandatory.

Examples:

- Minor improvements.
- Optimizations.
---
Review Process

Periodically review learnings.

The AI should identify:

- Repeated problems.
- Patterns.
- Opportunities to improve policies.

If a learning becomes a permanent rule:

Move it to:

.kenovis/AI/policies/

If a learning becomes a naming rule:

Move it to:

AI/memory/conventions.md

If a learning becomes domain knowledge:

Move it to:

DOMAIN/

---
What "Move It" Means

"Move" is the whole instruction, and the half that was missing until 2026-08-12 is what happens to the entry afterwards.

A promotion is not done when the rule appears in a policy. It is done when the rule appears in the policy **and** the learning stops being the place that rule lives. Otherwise the same rule sits in two documents, one of which is loaded per task and one of which is loaded at session start, and the second keeps growing.

So a promoted learning closes:

1. The rule is written into the policy that enforces it, in that policy's own voice — a rule, not a story. The policy cites the learning id, so the reasoning is one hop away.
2. The entry moves verbatim to `AI/memory/LEARNINGS-ARCHIVE.md`.
3. One line stays in this file, naming what the learning established and which policy section now carries it — see "Promoted And Archived" above.
4. Any finding the entry raised already has a disposition in `PRODUCT/ROADMAP.md` before the move. An entry whose only copy of an unresolved finding is in its own text is not archived yet.

Run this process when this file crosses the size threshold in `.kenovis/AI/policies/documentation.md` → "Document Lifecycle", and at every `/init-project` in a repurposed repository, before the previous product's learnings are deleted.

A learning that has not become a rule stays here. Most do not, and that is the normal outcome.

---
Evolution Rules

The AI should improve the organization over time.

When a recurring problem appears:

Do not only fix the issue.

Improve the system that allowed the issue.

Example:

Bad:

Fix bug.

Good:

Fix bug.

Understand why it happened.

Update policy.

Prevent future repetition.

---
Cross-Project Knowledge

The AI-OS may be reused across different products.

Therefore:

Store only reusable knowledge.

Avoid:

This product uses React.

Prefer:

Technology choices should be documented explicitly per project.

---
Relationship With Other Memory Files

conventions.md

Stores:

"What rules do we follow?"
---
glossary.md

Stores:

"What do concepts mean?"
---
learnings.md

Stores:

"What have we learned?"
---
Final Principle

A strong organization does not only accumulate code.

It accumulates experience.

This document is the mechanism through which the AI organization becomes better over time.