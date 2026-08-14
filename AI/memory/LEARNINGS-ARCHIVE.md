<!-- PROJECT-SPECIFIC: this product's own recorded knowledge; the rules around it are framework. Authored by /init-project or /adopt-project; kenovis sync never overwrites it. -->

AI Learnings — Archive

Version: 1.0
---
Purpose

This file holds learnings that are closed, kept verbatim.

A learning closes when the rule it argued for has been promoted into the policy that now enforces it, or when the defect it recorded has been fixed and the entry no longer changes anyone's behaviour. What survives in `AI/memory/learnings.md` is one line per closed learning, naming where its rule went.

Nothing here is summarised. The reasoning trail is the value — the same principle that keeps superseded decisions in `DECISIONS.md` rather than deleting them. See `.kenovis/AI/policies/documentation.md` → "Closed Work Is Archived, Not Kept Inline".

This file is never on the session-initialization path. It is read on demand, when someone wants the story behind a rule rather than the rule.
---
How these entries closed

Twenty-two learnings moved here on 2026-08-12, in the first execution of `AI/memory/learnings.md`'s own Review Process (`PRODUCT/ROADMAP.md` Phase 1 item 20). The process had been documented since initialization and had never been run, so every standing rule these entries argued for still lived only here.

Each entry's `Disposition:` line is unchanged from when it was written. The mapping from a learning to the policy section that now carries its rule is in `AI/memory/learnings.md` → "Promoted And Archived", not repeated here, so the two cannot disagree.

Open findings raised by these entries — OF-02, OF-03, OF-04, OF-05, OF-09 — live in `PRODUCT/ROADMAP.md` → "Open Findings" and were queued before this archive was created. No finding's only copy is in this file.
---
Archived Learnings
Example: Process — a command that is forbidden to record cannot close its own loop

## Learning-024

Date:
2026-08-12

Category:
Process

Context:
The founder's observation that the AI-OS detects gaps and then leaves them unresolved: *"está detectándolo pero no está planificándolo, por lo que siempre se queda ahí, muerto, sin resolver."* Investigated with `/analyze`, which turned out to be the clearest instance of the thing being investigated.

Problem:
Measured across the repository: 13 findings parked in `PRODUCT/ROADMAP.md` narrative, 23 `Future action:` entries of which 5 named the roadmap, and the oldest open finding — `sync` never naming the paths it deletes — repeated in four consecutive rounds' closing paragraphs since 2026-08-09 without ever becoming an item.

What happened:
`commands/analyze.md` Step 9 required recording an analysis's durable residue in `PRODUCT/ROADMAP.md`. Sixty lines below, "AI Responsibilities" forbade modifying files. The command whose entire purpose is detection could not record what it detected, and the contradiction had been in place since the command was written.

Root cause:
Two causes, and the second is the one that generalises.

The framework has three sinks for knowledge — `DECISIONS.md` records *why*, `learnings.md` records the *lesson*, `PRODUCT/ROADMAP.md` records *what and when*. Every command routed findings to the first two, and only the third is read to decide what to do next. `review.md` explicitly sent a deferred improvement to `DECISIONS.md`, which is correct for its reasoning and wrong as a queue. A well-documented deferral reads as closed, which is why nobody noticed for three days.

And: a rule that a command is structurally prevented from following is not a weak rule, it is an absent one. `analyze.md`'s Step 9 was correct and unreachable. No amount of care in following it would have helped.

Learning:
When a command instructs an outcome, check that the same command permits the action that produces it. A prohibition written for one purpose ("do not implement") silently swallows a different one ("do not record") when it is phrased by mechanism rather than by intent.

And: knowledge sinks are not interchangeable. Before adding a "record it in X" instruction, ask what reads X and when. A destination nothing reads at decision time is a place to put something down, not a place for it to be picked up.

Future action:
Item 24 remains — the behavioural check that an agent opens a decision body rather than paraphrasing its index. Item 20 remains: 18 of the 23 future actions are standing rules awaiting promotion into policies, which is a rule with no run behind it since DECISION-011.

Disposition: item 20 and item 24, both scheduled in `PRODUCT/ROADMAP.md`.

Edited 2026-08-13 on founder instruction, the one exception to this archive's verbatim rule and recorded so it is visible: both lines named item 25 (`kenovis check`) as scheduled work. It was rejected on 2026-08-12 (DECISION-026) and item 37 carries the gap instead. Nothing else in this entry is altered.

---
Example: Process — a scheduled item's premise was never checked before it was scheduled

## Learning-023

Date:
2026-08-12

Category:
Process

Context:
Executing `PRODUCT/ROADMAP.md` Phase 1 item 18 via `/next` — the first item of the second Immediate Priority block, which exists to bound what a session must read.

Problem:
The item states its own target as a read-instruction change: "`DECISIONS.md` is read as its index only — the index already exists at the head of the file and already carries one line of substance per decision." No index existed. What sits at the head of `DECISIONS.md` is a "Document Layers" paragraph listing the fourteen framework-level decisions by bare title, missing DECISION-013, DECISION-015 and DECISION-020, and carrying no substance about what any of them settled. The Product-layer template ships no index section at all, so no Installation has one either.

The item also says the change "applies to the framework `CLAUDE.md` stub every Installation receives". The stub contains no read-list — it points at `.kenovis/AI/SYSTEM.md` and stops. The Installation-facing mandate lives in `SYSTEM.md` → "Context Loading Rules" and `commands/bootstrap.md`, which is where the customer-facing half of the fix had to land instead.

What happened:
Both errors are cheap to check and neither was checked when the item was written — `grep -n "Index" DECISIONS.md` and reading `claudeStubContent` answer them in seconds. The work the item actually required was authoring seventeen index lines and a CI guard, not editing three read instructions.

Root cause:
The `/analyze` run that produced the block reasoned from measured file sizes, which were right, and from a recalled belief about the files' internal structure, which was not. A measurement in the same paragraph as an assumption lends the assumption its credibility.

This is [[Learning-019]] in the scheduling step rather than the deferral step: there, an unverified cost note in a backlog entry nearly deferred a maximal-Pain fix indefinitely; here, an unverified structural claim in a scheduled item understated its scope. Both are unchecked premises inside a document whose job is to be trusted later, when the person acting on it has less context than the person who wrote it.

Learning:
An item's premise about a file's contents is a claim, not context. Verify it while writing the item — the check is one command — or write it as a claim ("assumed: the index already exists; confirm before scoping"). A scheduled item is read by whoever executes it, and if its premise is wrong, the cost lands on the round that can least afford to re-plan.

Future action:
Items 19-23 of this block carry the same kind of premise: "the 17 DONE items are the bulk of this file's 124.9 KB" (item 19), "the policy has no rule about size, splitting, archiving or retirement" (item 21), "the index already exists at the head" (item 22, inherited from item 18 and now true because item 18 made it so). Check each against the file before scoping that item's work, and correct the item in place when it is wrong, as this round did.

Disposition: OF-04 — verify items 19-23's structural premises at the start of each item rather than as its own round.

---
Example: Process — an exact population, of the wrong question

## Learning-022

Date:
2026-08-10

Category:
Process

Context:
Executing `/review` end to end from a real `npx kenovis@0.11.0` Installation (`PRODUCT/ROADMAP.md` Phase 1 item 16), via `/next`. The fifth post-setup command run this way, following [[Learning-020]]'s and [[Learning-021]]'s future action. The release under test carried the guard built one round earlier so that this defect class would stop shipping.

Problem:
`.kenovis/AI/commands/review.md` Step 12 reads "Generate Review Report", lists the sections the report must contain, and stops. No destination, and — unlike the two sites [[Learning-021]] found — no template citation either. Eight more sites across five other commands and one workflow share the shape.

Reproduced against the published package: the review report, carrying a Critical tenant-isolation finding the review had correctly found and reproduced, was written under `.kenovis/`, committed, and deleted by the next `kenovis sync`, which reported `already up to date` and never named the file it removed. Third release running, third identical reproduction.

What happened:
`check_template_refs.py` passed the whole tree clean while all nine sites were live. It was built in the previous round precisely to end this, and it works: it enumerates every reference to a working template — fifteen — and requires each to state the rule. That population is exact. It is also a population of the wrong question.

Root cause:
"Where does an agent get *sent* to write?" and "where may an agent write *at all*?" are different questions. The first is answered by template references; the second by every instruction that produces an artifact. The second set is larger, and it does not contain the first — an instruction can produce a report while citing no template, which is what all nine surviving sites do. Enumerating the first population exactly says nothing about the second.

[[Learning-021]] correctly diagnosed "enumerate the population, not the matches" and then enumerated the population its own defects happened to sit in. The upgrade from a verb-set grep to an exact enumeration is real and was the right move; it just does not, by itself, tell you that you enumerated the right thing. An exact population feels like completeness in a way a pattern does not, which is what made it stop the search.

Learning:
Before enumerating, write down the property being protected as a sentence, and check that the population is the set of places that property could be violated — not the set of places the known violations were found. Here the property is "no produced artifact lands where `sync` deletes it"; its population is artifact-producing instructions, and template references were a subset of the symptoms.

A guard should also state which of its parts is exact and which is a heuristic. `check_artifact_destinations.py` has both: the population — every Step/Phase block under `commands/` and `workflows/` — is exact and its size prints on every run; the classifier that decides which blocks produce an artifact is a verb-and-noun list, cannot be complete, and its count prints too. `commands/next.md` Step 15 was fixed in this round and the classifier does not catch it, which is the honest demonstration rather than an embarrassment. A check that hides its own cut invites the next round to treat a clean pass as proof.

Future action:
`/architect` remains unrun from a real published Installation; five for five have surfaced a maximal-Pain defect. `/release` should be added back to that list — [[Learning-021]] dropped it after item 14 fixed its Step 8, but fixing one step is not executing the command. When adding a CI guard, state in the script what population it enumerates and what question that population answers, so the next round can check the question rather than re-verify the answer.

Disposition: OF-02 and OF-03. The guard-writing rule (state the population and the question it answers) is a standing rule, already followed by `check_decision_index.py`; candidate for promotion by item 20.

---
Example: Process — the fix's scope was set by the grep that found the bug

## Learning-021

Date:
2026-08-10

Category:
Process

Context:
Executing `/bug` end to end from a real `npx kenovis@0.10.0` Installation (`PRODUCT/ROADMAP.md` Phase 1 item 14), via `/next`. The fourth post-setup command to be run this way, following [[Learning-020]]'s own future action. The release under test was the one that had just fixed this exact defect class.

Problem:
Two sites survived that fix and shipped: `.kenovis/AI/commands/bug.md` Step 2 ("Create Bug Report / Use: `.kenovis/AI/templates/bug-report.md`") and `.kenovis/AI/commands/release.md` Step 8 ("Generate Release Notes / Use: ..."). Neither names a destination. Worse than before the fix, in one respect: [[Learning-020]]'s round added a line to every template saying "fill it in where the workflow that sent you here says to record the artifact" — and these two commands never say. The template defers to the command, the command is silent, and the only path on offer is the one inside `.kenovis/`.

Reproduced against the published package: a bug report filled in at the template path and committed was deleted by the next `kenovis sync`, which reported `already up to date` and never named the file it reverted. Identical to the reproduction one release earlier, in the workflow that release was supposed to cover.

What happened:
The previous round found its sites with a grep over a verb set — `Generate|Update|Prepare|Create ADR using`, widened to `Create:` and `Before coding create:` when a recount disagreed. It then fixed exactly what the pattern returned. Both survivors say "Use:". The recount that widened the pattern is the detail that matters: it proved the pattern was incomplete and was still treated as the scope, because widening it made the two numbers agree, and agreement reads like completeness.

Root cause:
The set of defects and the set of matches were assumed identical because one was produced from the other. Nothing in that round enumerated the population the defect could live in — every reference to a template path, fifteen of them — and asked of each whether it complied. A pattern derived from known instances can only ever report on instances of that shape, and it never reports the shape it does not have.

This is [[Learning-016]] and [[Learning-018]] in a third position. Both record a *count* whose scope lived in prose rather than in the artifact. Here it is a *fix* whose scope lived in a grep. Same structure: a claim about a corpus, verified against a query that silently redefined the corpus.

Learning:
When fixing a class of defect, enumerate the population, not the matches. Ask "where could this live?" — usually a structural set, like every reference to a path — and check each member against the rule. If that population can be enumerated mechanically, the check is also the guard, and it belongs in CI rather than in a session's scrollback. The distinction to hold onto: a pattern that matches *defects* cannot be complete, because it is built from the ones already found; a pattern that enumerates *sites* can be, because it is built from the structure.

That is the difference from the case [[Learning-015]] settled, where no guard was built and that was right: there, no pattern could separate an unanswered question from a legitimate bracket. Here the population is exact — a path reference — so a guard is possible, and its absence was the actual gap. `.github/scripts/check_template_refs.py` now enumerates all fifteen and requires each to state the rule or cite [[DECISION-024]]; it was confirmed to fail on the pre-fix tree before being kept.

Future action:
Run the remaining post-setup commands — `/review`, `/architect` — from a real published Installation, one per round; four for four have surfaced a maximal-Pain defect. When a round fixes N instances found by a search, state in the change what population was checked and how, not just what was fixed. And when a check can be written, write it in the same round: this defect had a fix, a decision and a learning behind it, and still shipped, because none of the three was executable.

Disposition: OF-02 and OF-03. The counting rule it adds is a standing rule; candidate for promotion by item 20.

---
Example: Process — an instruction was never executed in the place it was written for

## Learning-020

Date:
2026-08-09

Category:
Process

Context:
Executing `/feature` end to end from a real `npx kenovis@0.9.0` Installation for the first time (`PRODUCT/ROADMAP.md` Phase 1 item 12), via `/next`. The setup commands had each been run from a real Installation by then — `/init-project` in item 6, `/adopt-project` in item 8 — and each run found a maximal-Pain defect. No post-setup workflow ever had been.

Problem:
Eleven instructions across five workflows, two commands and one agent named a path under `.kenovis/AI/templates/` as the *output* of an imperative: "Generate: `.kenovis/AI/templates/feature-plan.md`", "Update: `.kenovis/AI/templates/bug-report.md` with final resolution details". Followed literally inside a customer's Installation, the produced artifact lands in the one directory `kenovis sync` mirror-replaces. Reproduced rather than argued: a feature plan written there and committed was deleted by the next `sync`, which restored the pristine template, reported `0.9.0 -> 0.9.0 (already up to date)`, and never mentioned the file it removed. Followed carefully, the same instruction gives no destination at all, so each agent invents a path.

The same run found `/feature` Phase 2 reading a `FEATURE-NNN` spec that nothing in the framework writes before implementation — its own Phase 13 writes it afterwards.

What happened:
Both defects are invisible from inside this repository, and that is the whole finding. Here `.kenovis/AI/` is the product's source, not a synced copy: writing to it is editing the framework, which no `/next` round would ever do by accident, and `sync` never runs against this checkout. The instruction was written by someone for whom "the template" and "the document made from it" were the same file in the same tree. It became destructive only once the framework started being *installed* somewhere — DECISION-017, four releases ago — and nothing re-read the instructions against that new world.

Root cause:
One path doing two jobs: naming the blank form and naming the filled-in document. This is the third instance of exactly that shape in eight days — [[DECISION-022]] separated "unanswered question" from "format specification" in the `[ANSWER:` marker, [[DECISION-023]] separated "which layer" from "what state" in the `PROJECT-SPECIFIC` marker, and now a template path separated from a destination. Each was found by executing something nobody had executed, not by review.

Learning:
A framework that is *installed* has two execution environments, and its own repository is the one where its instructions are least likely to fail. Every instruction that produces a file is a claim about where files may be written in a customer's repository, and that claim cannot be checked by reading — only by following it somewhere the mirror-replace is real. The pattern across items 6, 8 and 12 is now consistent enough to state as a rule: for each framework command or workflow, "has anyone run this from an installed copy?" is a better predictor of latent defects than any review pass. Three for three, each finding maximal-Pain.

Future action:
Run each remaining post-setup workflow — `/bug`, `/review`, `/release`, `/architect` — from a real published Installation, one per round, before assuming it works. When an instruction tells an agent to produce an artifact, name three things separately: what is produced, where its durable residue is recorded, and which form shapes it; never let one path stand for two of them ([[DECISION-024]]). And when a distribution mechanism changes — as `.kenovis/` packaging did — re-read the instructions that write files against it, because that is the class of change that turns correct prose into a destructive command without editing a word of it.

Disposition: OF-02 and OF-03 — `/architect` and `/release` still unrun from a real published Installation. The rest of this future action (name the destination when an instruction produces an artifact) shipped in items 12, 14 and 16 and is now enforced by `check_artifact_destinations.py`.

---
Example: Process — an unverified cost estimate is a decision, and it was made by nobody

## Learning-019

Date:
2026-08-09

Category:
Process

Context:
Fixing the `PROJECT-SPECIFIC` marker (`PRODUCT/ROADMAP.md` Phase 1 item 10), via `/next`. The work had sat as a backlog note since item 8, carrying its own cost estimate: changing the wording "touches seventeen templates, every authored document and `check_markers.py`", because "the same string is what the Collision Guard matches on (`head -1`)". The note closed with "worth doing deliberately, not as a side effect" — correct-sounding caution.

Problem:
The premise was false. The Collision Guard matches the bare `PROJECT-SPECIFIC` token, not the sentence after it; so does `check_markers.py`; and no `.py`, `.ts` or `.mjs` file in the repository matches any part of that sentence. The change touched no mechanism, required no `check_markers.py` edit, and broke no existing Installation. It was a find-and-replace across 37 files plus three prose sections.

What happened:
Two `/next` rounds ranked this item against alternatives while carrying that estimate as fact, and it lost both times — reasonably, given a cost that high against a defect that sounded cosmetic. Checking the premise took one grep. Had the note said "cost unverified" instead of stating a scope, the same grep would have run two rounds earlier. Meanwhile every session of every Installation opened `COMPANY_OS.md` and read that its contents were placeholder content.

Root cause:
A cost estimate written into a backlog note becomes an input to every future prioritisation decision, but nothing marks it as an estimate. It reads exactly like the findings around it, which were verified. The priority formula in `PRODUCT/ROADMAP.md` divides by Implementation Cost, so a wrong cost does not merely mislead — it deterministically suppresses the item, and the more wrong it is the longer it stays suppressed. This is [[Learning-016]] and [[Learning-018]] in a third position: a number recorded once and never read back against the thing it describes. Here it was not published, it was worse — it was acted on.

Learning:
An unverified claim in a backlog note is a decision made by whoever was tired at the end of the round that wrote it. The asymmetry is what makes it dangerous: over-estimating cost is invisible, because the item simply never comes up again, while under-estimating it surfaces immediately when the work starts. Nothing in the framework distinguishes "I checked" from "I assumed" in a deferred item, and the priority formula treats both as input.

Future action:
When deferring an item, either verify the cost or say it is unverified — and when the note names a specific mechanism as the reason something is expensive ("X matches on this string", "Y depends on this file"), check that claim before writing it, because it is the load-bearing part. When picking up any deferred item, re-derive its cost before ranking it rather than trusting the note; one grep is cheaper than a round of wrong prioritisation. Item 8's original note is left visible in `PRODUCT/ROADMAP.md` with the correction beneath it, rather than rewritten, so the mis-estimate stays legible as the finding.

Disposition: No work implied as a rule, and the specific check it asks for is OF-04 — items 19-23's own premises are verified at the start of each item.

---
Example: Project — a count without its scope is unverifiable, even when it is right

## Learning-018

Date:
2026-08-09

Category:
Process

Context:
Publishing `kenovis@0.8.0` (`PRODUCT/ROADMAP.md` Phase 1 item 9), via `/next`. The release carried item 8's fix for [[Learning-017]] — three templates that shipped this framework's own answers. Item 8's entry, the `CHANGELOG.md` section and the GitHub Release notes all stated "eleven `[ANSWER: ...]` instructions now replace that content across the three files."

Problem:
The release's own smoke test counted `[ANSWER:` markers across the installed template corpus before and after `sync` and got 113 → 126: thirteen, not eleven. On that evidence the published claim was wrong, and [[Learning-016]] — the round that shipped a count nobody counted — had recurred one release later despite being recorded specifically to prevent it.

What happened:
It had not recurred, and the published number was right. Counting the three files individually gives 5 → 9, 6 → 11 and 1 → 3, net +11 exactly. The other two are in the templates' own `README.md` (3 → 5), which gained a section quoting the marker while documenting the convention — prose about questions, not questions. The corpus figure and the per-file figure measure different sets and were never comparable. Ten minutes went into verifying a defect that did not exist, and a correction to a public release was one step from being issued.

Root cause:
"Eleven instructions across the three files" is precise about the number and precise about the scope — but the scope lives in the sentence, not in the artifact. Any later verification has to reconstruct which files were meant before it can count, and the obvious command (`grep -rc` over the whole template directory) silently answers a different question. This is [[Learning-016]]'s inverse: that round shipped a number nobody had measured; this round measured a number against the wrong corpus. Both fail the same way — a count and the thing it counts are recorded separately, so nothing forces them to stay attached.

Learning:
Verifying a count requires reproducing its scope, and a scope stated only in prose does not survive into the verification. The failure is symmetric and the cheap-looking direction is the dangerous one: a false alarm costs an investigation and nearly a public correction, which is worse than the wrong number would have been, because it also spends the credibility of the check. Note that this repository's Product layer is itself a template corpus (the DECISION-020/021 self-referential carve-out), so corpus-wide greps here will keep matching prose that quotes a marker — the same trap [[Learning-015]] hit from the other side.

Future action:
State the command alongside the count, not the scope in words. Write "net +11 across `ENGINEERING/SECURITY.md`, `AUTOMATIONS/release-process.md`, `AUTOMATIONS/user-feedback.md` (5 → 9, 6 → 11, 1 → 3)" rather than "eleven across the three files" — the per-file transitions are self-checking and name their own scope. When a corpus-wide number disagrees with a scoped one, reconcile the difference before treating either as a defect; the difference is usually a file that belongs to one set and not the other. Item 9's roadmap entry records this reconciliation explicitly so the next release does not repeat the investigation.

Disposition: No work implied — a standing rule about stating a count's scope. Candidate for promotion by item 20.

---
Example: Project — a template that was derived by deletion kept the answers nobody deleted

## Learning-017

Date:
2026-08-09

Category:
Process

Context:
Executing `/adopt-project` end to end against a real `npx kenovis@0.7.0` Installation (`PRODUCT/ROADMAP.md` Phase 1 item 8), via `/next`. The brownfield command had never been run — [[Learning-015]]'s round exercised `/init-project` only, and the two share templates but not Steps.

Problem:
Three of the seventeen Product-layer templates contained Kenovis's own answers, unmarked, presented as framework-level prose that every product inherits verbatim. `ENGINEERING/SECURITY.md` told the reader "Authorization Model: not applicable in v1 — no accounts, no shared backend", "Audit System: not applicable in v1 — no backend exists", and described the CLI writing to a customer's filesystem as the product's sensitive operation, citing `RULE-INST-01`/`02` — rule IDs that exist only in this repository's log. `AUTOMATIONS/release-process.md` defined staging as "validate the CLI before publishing" and production as "the published npm package". `AUTOMATIONS/user-feedback.md` named GitHub Issues as the feedback system of record.

What happened:
The adoption fixture was a padel-court booking API with a members table, JWT auth, role checks and a Fly.io deployment. Authoring `ENGINEERING/SECURITY.md` from its template produced a security document stating that authorization did not apply to a product that has an `admin_only` check, and that no audit trail was possible because there was no backend. The Step 12 Verify then passed it: zero `[ANSWER:` matches. A document asserting three false things about the product it governs was reported clean.

Root cause:
The templates were derived from this repository's own completed Product layer by deleting each Kenovis-specific answer and writing the question that produced it. Where a deletion was missed, the answer stayed — and a leftover answer is shaped exactly like the framework-level prose that legitimately survives. Both commands' Verify greps for `[ANSWER:`, which is by construction the one marker a leftover answer does not carry. `AUTOMATIONS/customer-onboarding.md`, derived in the same round, is clean, so this was inconsistent execution of a rule the templates' own `README.md` already stated, not a missing rule.

Learning:
A check that finds *unanswered* questions cannot find *wrongly answered* ones, and the two failures are not symmetric: an unanswered question is visibly incomplete, while an inherited answer looks decided and gets built on. This is [[Learning-015]] and [[Learning-016]] a third time — a claim written once, never read back against the world it ends up in — but with a sharper edge, because here the artifact is the thing shipped to customers rather than prose describing it. Deriving a template by deletion has no completion signal: nothing tells you which deletions you skipped.

Future action:
When deriving a template from a real document, the passing condition is not "the questions are marked" but "no sentence in this file is true of only one product." Read every section that was not rewritten and ask whether it would survive a product with the opposite shape — no database, no users, no published artifact. `.kenovis/AI/templates/product-layer/README.md` → "How a template goes wrong, and how to see it" carries the two questions and a starting grep. Both commands' Verify now say to read back what came over verbatim, and `/adopt-project`'s contrast check extends to `AUTOMATIONS/` — where two of these three were. None of that is a gate; no pattern distinguishes an inherited answer from a legitimate one, which is why the rule is stated as a reading discipline and the limitation is written down rather than papered over.

Disposition: No work implied — a standing rule about deriving templates. Candidate for promotion by item 20.

---
Example: Project — the round that fixed an unexecuted check shipped an uncounted count

## Learning-016

Date:
2026-08-09

Category:
Process

Context:
Publishing `kenovis@0.7.0` (`PRODUCT/ROADMAP.md` Phase 1 item 7), via `/next`. The release carried item 6's fix for a Verify step that had never been executed — the failure [[Learning-015]] records. Item 6's own entry, the `CHANGELOG.md` section, the PR body and the GitHub Release notes all stated the same figure: "110 instructions across 15 templates."

Problem:
The instruction count was exact — the smoke test against the published package found precisely 110 unanswered questions in a copied-in Product layer. The file count was not. Thirteen templates changed, plus the templates' own `README.md`, which documents the marker convention rather than being a template. Nobody had run `git show --stat` against the commit the sentence describes.

What happened:
The wrong number reached the npm registry and a public GitHub Release before anything contradicted it, and what finally did was the release's own smoke test — counting changed paths for an unrelated reason (confirming what a customer's `sync` actually touches) and getting 17 where the prose implied 19.

Root cause:
The claim was written in the same breath as the work, from the author's memory of what had just been edited, and then copied forward verbatim into four more documents. Every later reader — review, CI, the release cut — was reading a restatement, not the artifact. `check_changelog.py` verifies that a changelog entry *exists*; nothing verifies that what it says is true, and nothing can.

Learning:
This is [[Learning-015]] one round later in a different costume. There the unverified thing was a check; here it is a count. The shared shape is a factual claim about an artifact, written next to the artifact, never read back off it. Prose in `CHANGELOG.md`, `DECISIONS.md` and `PRODUCT/ROADMAP.md` is this framework's product — DECISION-009 makes documentation the company memory — so a number in it carries the same obligation as a number in code, with none of the tooling.

Future action:
Any count in a changelog, decision or roadmap entry (files touched, instructions converted, tests added) gets read off the artifact with the command that produces it, in the same round, and that command goes in the entry: `git show --stat <commit> -- <path>`, `grep -rc`, the test runner's own total. If the number is not worth one command, do not state it — "several templates" is honest and costs nothing. When a published number turns out wrong, correct it where it was published (including the GitHub Release notes) and say it was corrected, per DECISION-009's discipline: the trail is the point, the same way DECISION-015 → DECISION-016 was kept rather than rewritten.

Disposition: No work implied — a standing rule about counts. Candidate for promotion by item 20.

---
Example: Project — a verification step that has never been run against a passing case

## Learning-015

Date:
2026-08-09

Category:
Process

Context:
Executing `/init-project` end to end against a real `npx kenovis@0.6.0` Installation (`PRODUCT/ROADMAP.md` Phase 1 item 6), via `/next`. The seventeen Product-layer templates had shipped two days earlier and had been validated for *delivery* — the smoke test confirmed the files land on disk — but never for *execution*.

Problem:
Both commands' Verify step used `grep -rn "^\["` and told the reader "Every match is a question that was never answered." Run against this repository's own completed Product layer it returned 29 matches, every one of them content that is supposed to survive: format specifications, illustrative examples, markdown `[ ]` checkboxes, and the deliberate "nothing recorded yet" statements the commands themselves prescribe. It simultaneously missed 8 real questions that sat mid-line — including the entire domain-entity block, the layer the same command calls the one where a guess does the most damage.

What happened:
The Completion Criterion the check backs ("No bracketed template instruction survives in any product-layer file") was unsatisfiable from the day it was written. The one document set that could have proved it — this repository's own Product layer, the framework's own dogfooded Installation — was never run through it.

Root cause:
The check was written at the same time as the templates, by reasoning about what a template looks like, and was reviewed the same way. Nobody executed it. A grep is not code: no test imports it, no CI job runs it, and reading it is indistinguishable from running it right up until the moment the two disagree. It was correct *about the failing case* it was designed against, and nobody ever pointed it at a passing one.

Learning:
A verification step needs its passing case exercised at least as much as its failing case. A check that only ever gets reasoned about will encode the author's mental model of "what a bad document looks like" and will silently misclassify everything that model did not contain. The cheapest possible test — run the check against a document already known to be correct, and require zero matches — would have caught this before the templates shipped, and it costs one command.

Future action:
When a framework command introduces a mechanical check, run it against this repository's own Product layer in the same round and record the result in the change. Zero matches on a known-good corpus is the acceptance criterion; anything else means the check is measuring something other than what its prose claims — and if the framework's own documentation of the check is itself inside the scanned corpus, say so explicitly rather than quietly reporting a number that excludes it. That happened here: this repository's Product layer matches ten times on prose describing the marker, which is the Learning-009 self-referential case again, not a defect. This applies to any grep, marker convention or CI script the framework asks an agent to run — see [[DECISION-022]] for the case that produced this rule, and Learning-014 for the adjacent failure mode (a document, rather than a check, that was never re-read against the world it now runs in).

Disposition: No work implied — a standing rule about mechanical checks. Candidate for promotion into `.kenovis/AI/policies/documentation.md` by item 20.

---
Example: Project — a command written for the old distribution mechanism keeps passing review because nobody re-reads it against the new one

## Learning-014

Date:
2026-08-08

Category:
Process

Context:
Giving an Installation its Product layer (`PRODUCT/ROADMAP.md` Phase 1 item 4), via `/next`. Choosing the next roadmap item surfaced that `.kenovis/AI/commands/init-project.md` — the command Phase 0's own Success Criteria are written around — could not execute in a repository created by `kenovis init`.

Problem:
The command's Trigger said "a fresh clone of this repository." Its Core Principle was "the example content is not a suggestion to follow. It is a shape to replace." Its pre-flight verification was `grep -rl "PROJECT-SPECIFIC" .`, and Steps 2-8 said things like "Keep the section structure. Replace every sentence about the example company." All of that was literally true when the only way to adopt Kenovis was to clone or fork this repository. After the CLI shipped, an Installation contains `.kenovis/`, a `CLAUDE.md` stub, and no Product-layer file at all — so the grep matched nothing and twelve Steps instructed an agent to rewrite files that did not exist. `AI/memory/` was not distributed either, though roughly twenty framework files reference the framework-level rules inside it.

What happened:
DECISION-017 and DECISION-018 replaced the distribution mechanism. Neither revisited the two commands that consume it. Both commands stayed internally coherent — they read correctly start to finish, and the reasoning inside each Step is still sound — which is why five releases of review never caught it. Nothing was self-contradictory; the contradiction was between the command and a world that had changed underneath it.

Root cause:
`/init-project` and `/adopt-project` are the only parts of this system whose correctness depends on the state of a repository the framework does not control, and that state is set by a different part of the system (the CLI). No test can reach them — they are markdown, executed by a human plus an LLM — and no CI check compares what the CLI writes against what the commands assume is present. The assumption was made once, in prose, and then became invisible.

Learning:
When a change replaces how an artifact reaches its consumer, the artifact's own instructions are inside the blast radius even when they never mention the mechanism. The question to ask is not "does this document contradict itself" but "does this document still describe the situation its reader will actually be in." A document written against a superseded mechanism reads perfectly and is wrong.

Future action:
When a decision changes the set of paths the CLI writes into a target repository — or stops writing one — walk `init-project.md` and `adopt-project.md` end to end against the resulting layout as part of that decision's own implementation, not as a follow-up. Concretely: after any change to `runInit`/`runAdd`/`runSync`'s written paths, re-read both commands' pre-flight checks, Steps and Completion Criteria and ask which of them assume a file the CLI no longer creates, or never did.

Disposition: No work implied — a standing rule about CLI path changes. Candidate for promotion by item 20.

Example: Project — ship the fact inside the artifact instead of tracking it alongside

## Learning-013

Date:
2026-08-07

Category:
Architecture

Context:
Giving an Installation a record of which Framework Release it tracks (`PRODUCT/ROADMAP.md` Phase 1 item 3), via `/next`. `DOMAIN/DOMAIN_MODEL.md` had claimed since initialization that "an Installation tracks one Framework Release"; the code had no notion of a version at all.

Problem:
The obvious implementation was the one this codebase had already reached for twice: have the CLI write the version into `.kenovis/` at install time and add it to `INSTALL_TIME_OWNED_ENTRIES` — the registry of files `sync`'s mirror-replace must explicitly preserve or rewrite. That registry exists *because* two earlier files (`.setup-pending`, `.claude-md.sha256`) were written by one mechanism and silently invalidated by another (Learning-010, Learning-011).

What happened:
The version is a property of the Framework bundle, not of the act of installing it. Stamping it at build time — inside the bundle — means the mirror-replace that already copies the bundle installs and updates it for free. Nothing to preserve, nothing to rewrite, nothing to keep in sync. The CLI only reads it back. The entry that would have been the third member of `INSTALL_TIME_OWNED_ENTRIES` never needed to exist.

Root cause of the near-miss:
`INSTALL_TIME_OWNED_ENTRIES` is a good registry, and having it made adding a third entry feel like the correct, well-trodden path. But a registry of exceptions quietly invites more exceptions: the question it answers ("how does this file survive the mirror?") assumes the file must be written outside the mirror in the first place.

Learning:
Before adding to a registry of special cases, ask whether the new fact belongs to the artifact being copied rather than to the copier. A fact that ships inside a distributed artifact needs no synchronization rule, because it has exactly one writer — the build that produced it. This is the structural fix for the failure mode Learning-010 and Learning-011 each described after the fact: not better bookkeeping, but no second copy to keep books on.

Future action:
When a new file must exist inside a mirrored/replaced directory, first try to make the bundle ship it. Only when the value genuinely cannot be known at build time (it depends on the target, like `.setup-pending`'s greenfield/brownfield result, or on what was written, like `.claude-md.sha256`) does it belong in `INSTALL_TIME_OWNED_ENTRIES`. Record the reasoning at the constant itself, so the next contributor sees why a given file is or is not a member.

Disposition: No work implied — a standing rule about bundle-shipped facts. Candidate for promotion by item 20.

---
Example: Project — the fix for branch drift is itself a source of branch drift

## Learning-012

Date:
2026-08-07

Category:
Process

Context:
Promoting `development` → `preproduction` → `main` for the `kenovis@0.5.0` release (`PRODUCT/ROADMAP.md` Phase 1 item 2), via `/next`.

Problem:
The promotion chain had drifted again — `preproduction` and `main` each held commits `development` did not, so a rebase-merge would replay `development`'s 26 commits against content those branches already had under different hashes. The identical situation was hit and fixed during `kenovis@0.2.0` (PRs #23/#24) and again during `0.4.0` (PRs #33/#34), each time believed to be a one-off cleanup of historical drift.

What happened:
Both downstream branches were verified as strict, older snapshots: `git diff origin/main dceece7` (the 0.4.0 cut) was empty, and the same held for `preproduction`. No content divergence at all. The only unique commits on each were the synthetic "Sync X content with Y" commits produced by the previous promotion's own fix.

Root cause:
The content-sync fix creates one commit on the *downstream* branch that the upstream branch will never contain. That commit is precisely what makes the next promotion's rebase-replay diverge. Each application of the fix guarantees the next release needs it again — it is a steady state, not a cleanup. Calling it "a deliberate one-time trade" (as the 0.2.0 round did) was wrong: the trade recurs every release.

Learning:
A promotion chain of protected branches merged with "Rebase and Merge" only cannot stay history-aligned if any step ever introduces a downstream-only commit. Either every promotion is a true fast-forward, or the chain is permanently in content-sync mode. Kenovis is in the second mode, and that is fine — the branches are byte-identical after every promotion, which is the property that actually matters. What is not fine is rediscovering this each release and spending the investigation again.

Future action:
Treat the content-sync branch as the *standard* promotion procedure for this repository, not an exceptional repair. Each release: verify the downstream tree is a strict older snapshot (`git diff origin/<downstream> <last-release-cut-commit>` empty, nothing unique downstream), then `git read-tree -u --reset origin/<upstream>` on a `sync/<downstream>-to-<upstream>-<version>` branch, confirm `git diff origin/<upstream> HEAD` is empty, PR and rebase-merge. `read-tree --reset` is the correct primitive — `git checkout <ref> -- .` does not delete files removed upstream, which matters whenever a release moves or retires paths (as the `.kenovis/` migration did).

Disposition: No work implied — the content-sync promotion is now this repository's documented standard procedure, followed by every release since `0.5.0`. Candidate for promotion into `.kenovis/AI/policies/git.md` by item 20.

---
Example: Project — a guard's own bookkeeping outlives the state it described

## Learning-011

Date:
2026-08-07

Category:
Technical

Context:
Fixing Learning-010 (`sync` must preserve `.setup-pending` and the pending stub) via `/next`, `PRODUCT/ROADMAP.md` Phase 1 item 1.

Problem:
Tracing the pending → steady-state transition end to end surfaced a second, unreported defect: after `/init-project` or `/adopt-project` completed correctly, the very next `kenovis sync` refused with `ExistingClaudeMdError` on a `CLAUDE.md` those commands had just legitimately rewritten.

What happened:
Every install/sync records `.kenovis/.claude-md.sha256` — the hash of the stub the CLI wrote, i.e. the *pending* one. The commands' completion step deletes `.setup-pending` and reverts the stub to steady state, but never touched that sidecar, so the recorded hash described a file that no longer existed. `isClaudeMdSafeToOverwrite` correctly saw a mismatch and correctly refused — on a change Kenovis's own instructions had made.

Root cause:
The hash sidecar (Phase 0 item 7, closing Learning-007) was designed against "the customer edited CLAUDE.md" and never revisited against "a Kenovis command edited CLAUDE.md." Two mechanisms wrote the same file; only one of them maintained the record of what was written.

Learning:
A guard that compares against recorded state has two obligations, not one: detect foreign changes, and stay accurate across every *sanctioned* change. Any other actor allowed to modify the guarded file — including the framework's own markdown commands, which no compiler or test reaches — must update or invalidate that record in the same step. This is the same class of defect as Learning-010: state written by one part of the system, invisibly invalidated by another.

Future action:
When adding a recorded-state guard, enumerate every writer of the guarded file, framework commands included, and give each an explicit update-or-invalidate step. Cheapest correct option is usually invalidate (delete the record) and let the next CLI run re-record it, rather than teaching a markdown command to compute a hash.

Disposition: No work implied — a standing rule about recorded-state guards. Candidate for promotion by item 20.

---
Example: Project — `sync` silently disarms the first-session auto-trigger it never installed

## Learning-010

Date:
2026-08-07

Category:
Process

Context:
Smoke-testing the `.kenovis/` self-migration (DECISION-020, ROADMAP Phase 0 item 8) against a scratch brownfield repository: `kenovis add` → commit → `kenovis sync`, expecting an empty diff to confirm the relocated Framework layer bundles identically.

Problem:
The diff was not empty. `sync` deleted `.kenovis/.setup-pending` and rewrote `CLAUDE.md` from the pending stub back to the steady-state stub — silently disarming DECISION-018's first-session auto-trigger on an Installation that had never run `/adopt-project` yet.

What happened:
`runSync` mirror-replaces `.kenovis/` from the bundle, which correctly never contains `.setup-pending` (that marker is written by `runInit`, not shipped), then writes the stub unconditionally in its steady-state form. Neither step asks whether setup is still pending. A customer who installs and syncs before their first AI session loses the auto-trigger and is back to needing a manual `/init-project`/`/adopt-project` — the exact friction DECISION-018 existed to remove.

Root cause:
DECISION-018 designed the pending state as an `init`/`add`-time artifact and reasoned about the commands that *set* it. `sync` predates that marker and was never revisited against it — it treats `.kenovis/` as fully bundle-derived, which is true for every file except the two pieces of local state (`.setup-pending`, `.claude-md.sha256`) that install-time writes.

Learning:
Pre-existing, not a regression from this round — but it means "mirror-replace" and "local state living inside the mirrored directory" are in direct conflict. Any state the CLI writes into `.kenovis/` that is *not* part of the bundle needs an explicit preserve-or-recompute rule in `sync`, or the next sync erases it. `.claude-md.sha256` survives only because `sync` rewrites it after the mirror; `.setup-pending` has no such step.

Future action:
Backlog item, not fixed here (out of this migration's scope): `runSync` should preserve `.setup-pending` when it exists, and write the pending-form stub in that case, so syncing never advances an Installation past a setup it hasn't done. Verify against the smoke-test sequence above.

Disposition: No work implied — closed by Phase 1 item 1.

Closed 2026-08-07 via `/next` (ROADMAP Phase 1 item 1): `runSync` now does exactly that, and `INSTALL_TIME_OWNED_ENTRIES` (`cli/src/domain/installation.ts`) makes the general rule explicit — every CLI-written file inside `.kenovis/` is tagged `preserved` or `rewritten`, so the next one is not a third coincidence. Fixing it surfaced Learning-011, the same failure mode one layer up.

---
Example: Project — a packaging rule designed for "customer vs. framework" breaks on the one Installation where they're the same thing

## Learning-009

Date:
2026-08-06

Category:
Architecture

Context:
Starting DECISION-017's own deferred Phase 2 (this repository migrates its own Framework layer into `.kenovis/`, using the packaging rule already decided for every customer Installation) via `/next`.

Problem:
DECISION-017's B1 resolution — Kenovis's own explanatory README moves to `.kenovis/README.md`; the customer's own pre-existing root README is never touched — silently assumed those are always two different documents. Applied literally to this repository, it would hide this project's own GitHub/npm-facing landing page inside a directory GitHub doesn't auto-render, and replace this repository's hand-authored root `CLAUDE.md` (Role, Layers, Source Of Truth, graphify wiring) with the generic customer stub.

What happened:
This repository is the one Installation where "Kenovis's own explanation" and "the Installation's pre-existing content" are the same document — it is simultaneously the framework's origin and its own dogfooded product (DECISION-013). A packaging rule written for the general case (any two Installations have unrelated README/CLAUDE.md content) doesn't have a case for the specific Installation that authored the rule.

Root cause:
DECISION-017 was scoped and reasoned entirely from the perspective of a third-party customer's repository. It never asked "what happens when this rule is applied to the repository that IS the framework" — a blind spot that only surfaces when the self-referential case is actually attempted, not when the rule is merely described.

Learning:
When a packaging/distribution rule is designed by reasoning about "the customer," explicitly check whether the tool's own origin repository is itself a customer of that rule (true here, per DECISION-013's maximal-dogfooding stance) — and if so, walk the rule through that specific case before considering the design complete. A rule that's correct for every *other* Installation can still be wrong for the one that's self-referential.

Future action:
See DECISIONS.md DECISION-020 — root `README.md`/`CLAUDE.md` are now a documented, standing exception for this repository specifically. When designing a future rule that treats "the framework" and "an Installation" as distinct parties, add a checklist item: does this repository's own dual nature (framework origin + dogfooded product) break the assumption?

Disposition: No work implied — a standing rule about framework/Installation asymmetry. Candidate for promotion by item 20.

---
Example: Project — a startsWith check only proves "not a foreign file," not "nothing appended"

## Learning-007

Date:
2026-08-06

Category:
Engineering

Context:
End-to-end smoke test of the real v0.1.0/v0.2.0 → dev-build upgrade path (PRODUCT/ROADMAP.md Phase 0 item 6): installed a real published `kenovis@0.2.0` into a scratch repository, then ran `kenovis sync` — first with the CLAUDE.md stub untouched (should pass), then again after appending a line of "customer" content below the stub's existing marker line (should now be caught by the new `ExistingClaudeMdError` guard just added to `sync`).

Problem:
The append case was not caught. `sync` silently overwrote the CLAUDE.md and discarded the appended line, even though the new guard (this same round of work) was built specifically to stop `sync` from silently discarding customer content.

What happened:
`isKenovisManagedClaudeStub` (`cli/src/domain/installation.ts`) checks `content.startsWith(CLAUDE_STUB_MARKER)` — true for "this file's first line is Kenovis's own," which is also true for "Kenovis's stub plus anything appended after it." The check answers "did Kenovis originate this file," not "is everything currently in this file Kenovis's own content." `init`/`add` have carried this same gap since Learning-006 introduced the check; `sync` just inherited it by reusing the identical function, so the smoke test exposed a pre-existing limitation, not a new regression from this round's change.

Root cause:
A prefix check is the right tool for "was this file ever touched by us at all" but the wrong tool for "is this file's current content entirely ours" — those are different questions, and the guard was written to answer the first while being relied on (by this session, in cli/README.md's first draft of the Upgrading section) to answer the second.

Learning:
When a "did we write this" check is a prefix/marker match rather than a full-content hash or diff, its guarantee stops at "we wrote the beginning" — appended content downstream of the marker is invisible to it. Before documenting a guard's coverage (e.g. "sync won't lose your notes"), test the specific case of *appending* to an otherwise-recognized file, not just replacing it outright — the two produce different, easily-conflated results against a prefix check.

Future action:
Closing this gap properly (e.g. hashing/diffing the stub's own known content against what's on disk, or requiring customer notes to live in a separate file) is scoped as a real backlog item, not silently fixed inside this round's work — see PRODUCT/ROADMAP.md Phase 0 item 6 follow-up. Until then, `cli/README.md` documents the limitation explicitly instead of overstating the guard's coverage.

Disposition: No work implied — closed by Phase 1 item 7 (hash sidecar).

Closed by Learning-008: a recorded content hash replaces the prefix check as the primary signal.

---
Example: Project — a prefix check and a full-content hash answer different questions; know which one a guard actually needs

## Learning-008

Date:
2026-08-06

Category:
Engineering

Context:
Closing the backlog item Learning-007 scoped: replace the `isKenovisManagedClaudeStub` prefix check with something that also catches content appended below an otherwise-untouched CLAUDE.md stub, without breaking the normal upgrade path (a customer syncing across Framework Releases whose stub *wording itself* has changed between versions — DECISION-018 already changed it once).

Problem:
A full-content hash of the *current* version's `claudeStubContent()` output would have made every cross-version upgrade fail the guard — an Installation's on-disk CLAUDE.md was written by whatever version wrote it last, not necessarily the version now running `sync`, so its exact text can legitimately differ from what the current code would generate. Comparing "what's on disk" to "what we'd write today" conflates two different questions.

What was built:
`hashClaudeMdContent` hashes content (SHA-256) as a pure function; `isClaudeMdSafeToOverwrite(existingContent, recordedHash)` compares the on-disk file against a hash *recorded at the time it was written*, not against the current code's output. Every `init`/`add`/`sync` writes `.kenovis/.claude-md.sha256` alongside the CLAUDE.md stub, capturing exactly what that run wrote. The next run reads that sidecar (if present) and requires an exact match — byte-identical, so append is caught — before treating the existing file as safe to overwrite. No sidecar (an Installation from before this fix) falls back to the old prefix check, unchanged from today's behavior, until that Installation's next successful install/sync records one.

Root cause of the near-miss:
The initial instinct — "compare against what the current stub template generates" — reused the same shape of mistake the prefix check itself made: matching against a fixed reference is invisible to legitimate drift the reference itself doesn't yet know about (there, appended content after the marker; here, a stub written by an older code version). A hash *recorded at write time* rather than *computed from current code* sidesteps this because it never claims to know what content should look like — only whether today's file matches what was actually left there last.

Learning:
When replacing a weak "did we write this" check, ask what the new check's reference point is: the *current* code's output (breaks the moment that output legitimately changes across versions) or a *fact recorded at the time of the original write* (survives that same evolution because it never re-derives the expectation, it stores it). The second is more code (a sidecar to write and read) but is the only one that's actually correct across releases — the extra state was the point, not overhead to trim.

Future action:
None — this closes Learning-007. The remaining, explicitly accepted gap: an Installation that has never run install/sync under this fix has no recorded hash yet, so its very next sync still relies on the prefix check for that one transition, same limitation as before. Documented in `cli/README.md`'s Upgrading section rather than silently assumed away.

Disposition: OF-05 (Deferred) — the accepted residual gap: an Installation with no recorded hash relies on the prefix check for one transition, and self-heals on its first sync.

---
Example: Project — a "forced" file-write path was never audited against a file the CLI doesn't fully own

## Learning-006

Date:
2026-08-06

Category:
Architecture

Context:
`/analyze` immediately after DECISION-018 shipped (auto-trigger `init-project`/`adopt-project` via a `.kenovis/.setup-pending` marker and a parametrized `CLAUDE.md` stub), asking specifically whether `kenovis init --force` on an existing project would overwrite the customer's own files.

Problem:
`runInit` always wrote the root `CLAUDE.md` stub via an unconditional `writeFile`, with no check for whether a file already existed there — and if it did, whether it was Kenovis's own. `kenovis add`, the *correct, documented, non-force* command for an existing project, silently discarded a customer's own pre-existing `CLAUDE.md` on every normal run.

What happened:
DECISION-017 established `CLAUDE.md` as "the one file Kenovis is forced to write at repo root" (Claude Code's autoload requirement) and reasoned carefully about never touching the customer's `README.md` — but never asked the symmetric question about `CLAUDE.md` itself: what if the customer already has one, unrelated to Kenovis? COMPANY_OS.md's own Ideal Customer Profile — developers "already fluent in agentic tooling" — makes a pre-existing `CLAUDE.md` a realistic case, not a hypothetical one. Separately, the same audit found `init --force` re-installing over an existing `.kenovis/` merged instead of mirror-replaced (Node's `fs.cp` defaults to overwrite-in-place, not wipe-then-copy) — `sync` already did this correctly (`removeTree` then `copyTree`) but `init`'s `--force` path never reused that pattern.

Root cause:
A file being "forced"/owned by the tool (CLAUDE.md) was treated as equivalent to "safe to always overwrite," collapsing two different questions: *whose file is the CLI allowed to write to* (yes, CLAUDE.md, by design) vs. *whose content is currently sitting there* (unknown, never checked). The `--force` reinstall path was implemented by a different code path than `sync`'s mirror-replace, so the two silently drifted even though they solve the same problem.

Learning:
"This tool is allowed to own this file" and "this tool may discard whatever's already in this file" are different guarantees — the first doesn't imply the second. When a file is forced to a fixed path for tooling reasons (autoload, convention, etc.), still check what's already there before overwriting, the same way an already-established pattern (README.md protection) already does elsewhere in the same codebase. Also: when two code paths solve the same underlying problem (`sync`'s mirror-replace, `init --force`'s reinstall), a divergence between them is itself a bug waiting to be found, even if neither path is wrong in isolation.

Future action:
When adding a new "CLI writes to a fixed, tool-owned path" pattern in the future, explicitly design the "what if something is already there and it isn't ours" case up front — do not let it wait for a follow-up `/analyze`. Cross-check new `--force`/overwrite code paths against existing ones (`sync`) for behavioral parity before shipping.

Disposition: No work implied — a standing rule about fixed tool-owned paths. Candidate for promotion by item 20.

---
Example: Project — an unrecognized CLI flag silently fell through to a real install against cwd

## Learning-005

Date:
2026-08-06

Category:
Engineering

Context:
Manual end-to-end smoke test of the `kenovis add` / bare-autodetect mechanism built for DECISIONS.md DECISION-018 (auto-trigger `init-project`/`adopt-project` without a manual slash command), run per that decision's own Phase 3 verification step, before considering the CLI implementation done.

Problem:
Testing `kenovis --help` (a plausible first thing a real user tries) actually ran a full install against the current working directory instead of printing usage.

What happened:
`--help` isn't `init`/`add`/`sync`, so `parseArgs` treated it as a bare invocation (DECISION-018's autodetect dispatch, which "never refuses" by design). Its own arg-parsing loop then skipped `--help` because it starts with `--`, leaving `targetDir` at its default of `.` — so the bare path ran a real `runAdd`/`runInit` against the shell's cwd, which happened to be this repository's own `cli/` directory during testing, writing a stray `.kenovis/` and `CLAUDE.md` into a real, git-tracked source tree.

Root cause:
The bare-dispatch design (any invocation without a recognized subcommand + a chosen target, "never refuses") was correct for its intended case (`kenovis <targetDir>`) but had no reserved space for flag-only invocations that aren't asking for an install at all.

Learning:
A catch-all "no subcommand means bare mode" dispatch needs its flag/help handling checked *before* it, not folded into the same fallback path — otherwise every not-yet-implemented flag silently becomes "install here." Same root shape as Learning-004's `--source` footgun: an intentionally permissive path (mirror whatever `--source` says / install wherever bare mode is pointed) has no safeguard against a caller who didn't mean to trigger it at all.

Future action:
When adding new bare-dispatch or mirror-whatever-you're-given CLI paths in the future, explicitly enumerate what should NOT reach that path (here: `--help`/`-h`) before wiring the fallback, rather than discovering the gap via smoke testing after the fact. `cli/src/cli/bin.ts`'s `main()` now checks `--help`/`-h` first, unconditionally.

Disposition: No work implied — a standing CLI rule. Candidate for promotion into `.kenovis/AI/policies/coding.md` by item 20.

---
Example: Project — `sync --source` mirrors whatever directory it's pointed at, unfiltered

## Learning-004

Date:
2026-08-05

Category:
Engineering

Context:
End-to-end smoke test of the published `kenovis@0.1.0` package against a scratch external-like repository, verifying `init`/`sync` behave as newly documented in README.md's "Getting started" section.

Problem:
Testing `sync --source <dir>` by pointing it at this repository's own root (instead of a real Framework-only bundle) silently mirrored this repository's own Product-layer content (COMPANY_OS.md, DECISIONS.md, DOMAIN/, PRODUCT/, ENGINEERING/, cli/, .github/, LICENSE, ...) into the target's `.kenovis/` — content that describes Kenovis-the-company, never meant to leave this repository.

What happened:
`runInit`/`runSync` perform a full, unfiltered mirror of whatever `--source` points at; there is no allowlist or validation that the source directory actually contains only Framework-layer content. Default zero-flag usage (`npx kenovis sync`, what README.md documents to real customers) is safe because the published package's bundled `dist/framework-assets/` is already filtered at build time (`bundle-framework-assets.mjs`). The risk is specific to `--source` pointed at an unbundled directory.

Root cause:
`--source` was designed as a local-dev/testing escape hatch (see cli/README.md "Running it locally") and trusts the caller completely — reasonable for that use case, but has no safeguard against accidental misuse.

Learning:
An unvalidated "mirror this directory" flag will faithfully reproduce whatever layer-mixing mistake the caller makes. Default (filtered, bundled) paths and advanced/raw-directory paths need different trust assumptions documented explicitly, not just implied by which flag is used.

Future action:
DECISIONS.md DECISION-017's Phase 2 (this repository migrates its own Framework layer into `.kenovis/` using the CLI's own sync mechanism on itself) must run `sync` against the built `dist/framework-assets/` bundle, never against the raw repo root — otherwise it will self-pollute `.kenovis/` with this repository's own Product-layer content. Consider adding a lightweight source-directory validation (e.g., reject a `--source` whose top level contains recognizably Product-layer names) before Phase 2 executes.

Disposition: No work implied — closed by Phase 1 item 8, which ran the migration against the built bundle exactly as this says.

Closed by `kenovis@0.2.0`: `invalidFrameworkSourceEntries`/`InvalidFrameworkSourceError` (`cli/src/domain/installation.ts`) validate `--source` before `init`/`sync` touch anything. Built as an allowlist of the known Framework-bundle shape (`AI/`, `README.md`) rather than the blocklist of Product-layer names suggested above — a blocklist would have been a name-based rule, and no name-based rule may ever apply to a target repository, which may legitimately contain any name at all (DECISION-016). Noted here because the closure was never recorded when it shipped.

---

Example: Project — sync's reversibility comes from the target's own git, not the CLI

## Learning-003

Date:
2026-08-05

Category:
Architecture

Context:
Building the `sync` command (PRODUCT/ROADMAP.md Phase 0 item 3, slice 4) to satisfy DOMAIN/BUSINESS_RULES.md RULE-INST-02 ("a sync must never perform an in-place, non-version-controlled rewrite").

Problem:
Read literally, "never perform an in-place rewrite" could be misread as requiring the CLI itself to compute and present a diff before touching disk — a much bigger feature than this slice needed.

What happened:
Re-reading RULE-INST-02's own text closely: "the customer's own git history and PR review are the rollback mechanism." `.kenovis/` is git-tracked inside the customer's repository from the `init` commit onward. `runSync` mirror-replaces `.kenovis/` in place (`removeTree` + `copyTree`); the customer's `git diff`/`git checkout` then IS the review-and-revert mechanism the rule requires. No CLI-side diff engine was needed for RULE-INST-02 to be satisfied — that ergonomic improvement is separately, explicitly scoped to Phase 2 ("richer CLI update ergonomics — diff preview before sync") in PRODUCT/ROADMAP.md, confirming this reading.

Root cause:
"Reversible" and "diff-previewed-by-the-tool-itself" are not the same requirement; the business rule only demands the former for v1.

Learning:
When a business rule's own prose names the actual rollback mechanism (here: the customer's git), build against that mechanism instead of assuming the CLI must reimplement it. Check PRODUCT/ROADMAP.md for whether a fancier version of the same capability is already deliberately deferred — that's a strong signal the leaner reading is correct.

Future action:
When Phase 2's diff-preview work starts, treat it as a UX/ergonomics layer on top of the existing mirror-replace `runSync`, not a rewrite of its core reversibility guarantee.

Disposition: OF-09 (Deferred) — `sync` diff preview belongs to Phase 2 ergonomics. The rule about treating it as a layer over `runSync` is a standing rule; candidate for item 20.

---

---
## Learning-038

Date:
2026-08-14

Category:
Process

Context:
Item 42 part 4 — running OF-52's audit, which was scoped from a count: "twelve of nineteen commands and workflows still route a finding nowhere", measured as `grep -ci "Open Findings\|disposition\|Findings this"` per file.

Problem:
The count was wrong in both directions and the audit's first act was discovering that. `commands/architect.md`, `commands/feature.md` and `workflows/hotfix.md` all scored **0** while all three carry the findings rule correctly, by citing `.kenovis/AI/policies/documentation.md` → "A Finding Is Fixed, Scheduled, Or Rejected" by its exact title. The row also counted six remaining workflows where there are seven. True silent population: **11**, not 12.

What happened:
The proxy was three keywords drawn from how the rule had been *phrased* in the files that already carried it at the time the finding was written. Files that adopted the rule afterwards adopted the correct form — a citation of the policy section — which shares no keyword with the proxy. So the metric degraded as the thing it measured improved, and it degraded silently, because a grep that returns a number always looks like a measurement.

Root cause:
**A keyword proxy for "does this file carry rule X" measures a phrasing, not a rule.** This framework enforces itself in prose, so it asks that question constantly, and every round improvises the keyword. `policies/documentation.md` → "A Claim Is Read Back Off The Artifact" already requires the command to be stated — which is why this was catchable at all — but a stated command that answers a *nearby* question is more persuasive than no command, not less. The number was carried into a shipped queue row and into the `Next` pointer's ranking argument before anyone re-ran it.

Learning:
**Measure a rule's reach by the one string that cannot be paraphrased: the exact title of the section that states it.** `grep -rl "A Finding Is Fixed, Scheduled, Or Rejected"` answers the question the improvised keyword only resembled. This works in the other direction too, and that is the durable half: when writing a cross-reference into a framework file, cite the target section by its full title rather than describing it, and the reach of every rule becomes greppable by construction rather than by whoever next guesses a keyword.

Related but distinct: [[Learning-023]] says verify an item's premise about a file's contents before scoping it. That was followed here — the premise was checked, which is how the miscount surfaced. What Learning-023 does not cover is a premise that was verified *with the wrong command* on the day it was written. A measurement is a claim about what a command asked, not only about what it returned.

Future action:
`PRODUCT/ROADMAP.md` → **OF-82** carries the class: whether citing a policy section by its exact title becomes a stated convention for framework cross-references. **OF-81** carries the other output of the same audit, `workflows/roadmap.md` selecting work with a model four rounds out of date.

Disposition: Fixed as an instance — OF-52's count is corrected in item 42 parts 4-5's progress block, in the document that published it, per "A published number that turns out wrong is corrected where it was published". **The rule half is deliberately not promoted to a policy section yet**, and that is OF-82's first output rather than this round's: making it a convention obliges every framework cross-reference to carry a full section title, which is a real cost on every file, and one instance is not enough to spend it. This is the same restraint [[Learning-037]] applied to its own corollary.

---
## Learning-037

Date:
2026-08-14

Category:
Process

Context:
Closing item 41 step 2's residue — OF-76, OF-77's declaration half and OF-70 — in a fresh thread with no conversational inheritance from the round that created all three.

Problem:
The population instruction OF-76 says is missing was not missing. `init-project.md` line 190 said the conformance table is *"filled the first time a round reads the document end to end against the framework"*, and the template said it again. Two correct statements of the requirement, and zero rounds executing it, because a setup command is read once by the session that runs setup and never again by any round it describes.

What happened:
The finding was scoped as "write the missing instruction" and the first premise check found the instruction already written, twice. The work changed from authoring a rule to moving one — same words, different file, and the different file is the entire fix.

Root cause:
**An instruction addressed to a future actor was written in the document the current actor had open.** Setup was writing about what rounds do, so it wrote it where setup lives. Nothing about the sentence is wrong; nothing about its location can work. This is [[Learning-036]]'s third failure mode with a specific and easily repeated sink: *a command that a different command's executor does not load*. Commands feel like a shared namespace because they sit in one directory and cite each other freely, and they are not — each is loaded only when invoked.

Learning:
When a rule constrains what a **later** session will do, the test is not "is it written down" but **"which file does that session load, and is this in it?"** For a `/next` round the answer is short and worth naming: `CLAUDE.md`, `PRODUCT/OPERATING_MODEL.md`, `COMPANY_OS.md`, `.kenovis/AI/SYSTEM.md`, `DECISIONS.md`'s index, `PRODUCT/ROADMAP.md`, and the command being run. A rule for rounds that lives anywhere else has been recorded, not shipped — and the copy in the wrong place is worse than nothing, because it makes the requirement look handled to anyone who greps for it.

Corollary, from the same round: when the instruction turns out to already exist somewhere unreachable, **move it, do not add a second copy**. Two copies of a rule is DECISION-031's failure at a smaller scale, and the reachable copy is the only one that ever runs.

Future action:
`PRODUCT/ROADMAP.md` → **OF-79** carries the staleness half this round deliberately did not fix, and **OF-80** carries the round-ends-uncommitted gap found on entry. Both are dimensioned rows in the queue, not future actions parked here.

Disposition: Fixed as an instance — DECISION-033 moves the population requirement into `commands/next.md` 2.8 Step 13 and leaves the template pointing at it. **The rule half is deliberately not promoted to a policy section:** `policies/documentation.md` 3.6 → "An Instruction Is Reachable, And Its Sink Is Read" already states the failure mode in general terms, and what this learning adds is a concrete checklist for one command's load set — which belongs in the learning, not restated as a fourth failure mode (OF-24, "Single Source of Truth"). If a second command's load set has to be written down, that is the point the general rule needs a table and not before.

---
## Learning-036

Date:
2026-08-14

Category:
Process

Context:
Item 41 step 2 — moving the conformance table into `PRODUCT/OPERATING_MODEL.md` and shipping the standing criterion that keeps it alive: a closing round names the operating-model section its work served and updates that row.

Problem:
The criterion works in this repository and is inert in every other one. This repository has a seventeen-row conformance table because a round built it by hand, in prose, before any rule existed. An Installation receives the table as a one-row form — deliberately, since filling it during setup would record states nobody measured — and no instruction anywhere builds the remaining rows. "Update the row for the section you served" resolves to nothing when there are no rows.

What happened:
The gap was not visible while writing the rule. The table was on screen, seventeen rows of it, in the file the rule was being written about. Every test of the instruction passed because the population it operates on was sitting right there.

Root cause:
**A rule over a population is written by someone who has the population in front of them.** That is the condition under which the rule is being drafted, and it is the one condition in which the question "what creates this population" cannot occur to anyone. The rule reads complete because, where it is written, it is.

Learning:
Two questions before a rule that operates over rows, entries, items or destinations ships: **what creates the population, and what does an empty one mean?** "Nothing to do" and "nothing is set up" are different answers and only one of them is a pass.

Three instances now, which is what makes this a rule rather than an observation: item 39 shipped a routing rule naming five Product-layer destinations that do not exist until setup completes (OF-28); this round shipped a table whose rows exist in one repository only (OF-76); and `check_item_findings.py` went permanently inert when its population emptied as the intended effect of the archive rule, then was fixed so the inertness passes silently (OF-61). [[Learning-033]]'s producer/consumer rule is the neighbouring case and not the same one — there the consumer was never told the sink existed; here the consumer exists and the thing it consumes does not.

Future action:
`PRODUCT/ROADMAP.md` → **OF-76** carries the instance created by this round, and **OF-77** the enforcement half of the same criterion. **OF-61** is the third instance and stays open on its own question, which is OF-21's.

Disposition: Fixed as a rule — `.kenovis/AI/policies/documentation.md` 3.5 → 3.6, → "An Instruction Is Reachable, And Its Sink Is Read", now three failure modes rather than two. It went into that section rather than a new one because the section's whole subject is a correctly written instruction that produces nothing, and a fourth section restating it is what OF-24 added "Single Source of Truth" to forbid. This also closes **OF-63**, which had parked the same rule in a `Disposition:` field with no id and named `policies/testing.md` as its plausible home; the home turned out to be documentation, and the reason to write it now rather than defer again is that OF-63's own defect was deferring it.
