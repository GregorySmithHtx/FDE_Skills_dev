# Progress Log

Dated notes on what actually happened — projects touched, skills exercised,
what felt easy/hard, and any updates to the pillar levels in
`SKILLS_ASSESSMENT.md`. Newest entries at the top.

---

### 2026-08-28 (session 15) — first JS/TS roadmap rep: Node/nvm set up, a real closure gotcha found and fixed self-directed

Short, deliberately light session immediately after closing the SQL box —
first work on `LEARNING_ROADMAP.md` Phase 0's JS/TypeScript item, picked up
same-night. No Node/JS runtime existed on this machine at all; installed
`nvm` (user-space, no `sudo` available/needed) and Node v24.20.0 LTS as
setup, then stopped there rather than trying to also cover
arrow-functions/destructuring/promises/modules in one sitting — same
single-concept-per-session discipline as the SQL sessions.

**Real, mostly self-directed rep on the classic `var`-in-a-loop-closure
gotcha.** Given the task (a `for` loop with `var i`, a `setTimeout(...,0)`
callback logging `i`) with only the shape described, not code supplied.
Predicted correctly, unprompted, that the bug was scoping-related before
being asked to explain it. Ran it, got the expected surprising result (five
`5`s printed instead of `0 1 2 3 4`) — same "ran clean, output is wrong"
shape as the SQL fan-out bug earlier the same night. **Fixed it himself
before being asked to** — swapped `var` for `let` and, on his own
initiative, wrote the callback as an arrow function rather than the
`function(){}` he'd been shown, verified the corrected `0 1 2 3 4` output.

**Recalled real, dormant JS knowledge unprompted.** After the `let` fix
landed, asked about the pre-ES6 workaround for this exact problem,
correctly recalling "something with a self-executing function" (an IIFE)
before being told what it was called — accurate partial recall of a
technique he said he used to write "a lot for various purposes," now tied
back to the specific closure-scoping mechanism that made it necessary in
the first place (a fresh function-parameter binding per invocation,
same effect `let`'s per-iteration block binding now gives automatically).

**Pillar 4 note**: this is a genuine from-scratch JS rep, not adapting an
existing file — closer to the "real fundamentals, not guided scaffolding"
shape of the 2026-08-18 Python session than the "extend an existing
template" shape most other pillar-4 entries have had. First evidence this
project has of pre-existing (if rusty) JS knowledge actually surfacing
under light prompting rather than needing to be taught cold.

---

### 2026-08-27/28 (session 14) — SQL box closed for real: aggregate fan-out bug, HAVING, subqueries, and a sharp "don't trust the terminal either" catch

Direct continuation of the unfinished `agg_join.sql` exercise from session 9
(2026-08-23), which had been left mid-bug ("too much at once" — join +
aggregates + `HAVING` combined). This session finished it and closed out
`LEARNING_ROADMAP.md`'s Phase 0 SQL box (joins, aggregates, indexes, real
Postgres queries) — checked off for real, not just attempted.

**Real, self-driven debugging arc on the abandoned query, no code handed
over.** Coaching stayed hints-only throughout — Greg ran every query and
fix himself. First bug: an unmatched paren plus a stray English sentence
left as a placeholder, resolved on his own before the session properly
started. Second: correctly recognized that the AND/OR-parens lesson from
the 2026-08-23 session (`session 9` in this log) *didn't* actually apply to
this query's two `OR`-only clauses — real transfer-learning judgment, not
just pattern-matching "parens = good" onto every query.

**The real find of the session: a genuine, non-obvious SQL correctness
bug — aggregate fan-out from a double join.** The combined join+aggregate
query (`term_relations` → `terms` → `evidence`, all off the same
`term_id`) ran without erroring and produced plausible-looking numbers, but
`evidence_count` was silently wrong: joining two "many" sides to the same
key produces a full R×E cross-product before `COUNT` ever runs, so
`COUNT(evidence.evidence_id)` was counting `relation_count × real_evidence_count`,
not the real evidence count. Caught the same way as the best pillar-9
entries on record: not by accepting a clean-looking result, but by noticing
`evidence_count` was a suspiciously clean multiple of `relation_count`
across every row (1x, 2x, 3x, 6x, 6x), then verifying one term (B.O.T.A.,
term_id 4041) against a direct, ungrouped ground-truth count (real answer:
1, not the 357 the buggy query reported). Root cause reasoned out and fix
applied correctly (`COUNT(DISTINCT evidence.evidence_id)`), no hint needed
once the ratio pattern was pointed out. A real bug class worth having in
hand — this exact fan-out shape shows up constantly in production
reporting queries with more than one child join.

**HAVING and subqueries, both landed as genuine single-concept reps** (per
the "one concept at a time" lesson from 2026-08-23), not copied from an
example:
- `HAVING` vs. `WHERE`: built the "categories with >50 terms" query from
  scratch, self-corrected two real bugs along the way (clause order —
  `HAVING` written before `GROUP BY` — and grouping granularity — grouping
  by `name, term_id, category` instead of `category` alone, which silently
  produced 0 qualifying rows since every group ended up size-1). Answered
  the underlying "why" correctly once asked directly: `WHERE` filters rows
  before `GROUP BY`/aggregation happens, so no aggregate value exists yet
  for it to compare against.
- Subqueries: given the task ("categories above the average term count per
  category") with no worked example, reached for a **window function**
  (`AVG(COUNT(*)) OVER ()`) rather than the classic nested-`SELECT`
  form — a more advanced tool than what was hinted at, applied correctly
  on the first real attempt. Self-corrected the follow-on bug (`HAVING`
  with no `GROUP BY`, which collapses the whole result to one group and
  breaks non-aggregated `SELECT` columns) by reasoning to `WHERE` being the
  right clause once it was pointed out that `avg_count` was already a
  resolved per-row scalar by that point, nothing left to aggregate.

**Second real catch, arguably sharper than the SQL bug itself: distrusting
his own terminal output, not just AI output or a heuristic tool.** After
getting the subquery working, noticed unprompted that the result set looked
short — 8 categories shown, with a gap between the average (~60.6) and the
smallest reported row (162) that didn't look right for 114 total
categories. Flagged it as a direct question rather than accepting the
output. Turned out to be real: every one of his pasted results all session
had been silently truncated by psql's pager (`less`), showing one screenful
and cutting off before the true row count — the SQL had been correct the
whole time (25 categories >50, 23 above the true average), verified by
re-running without a pager and cross-checking against a full,
unfiltered category-count listing. Same underlying skill as the
2026-08-19 "a tool's 'ok' label is an approximation" catch and the
2026-08-21 orphaned-`evidence.term_id` catch — extended here to a new
target: **the terminal/display layer itself**, not a heuristic script or an
AI suggestion. Worth naming as its own instance of the pillar-9 pattern:
verification discipline applied to literally everything in the chain,
including the tool used to look at the results.

**Roadmap status**: `LEARNING_ROADMAP.md` Phase 0 SQL box now checked off.
Remaining Phase 0 items: JS/TypeScript and Python refresh.

---

### 2026-08-25 (session 13) — symbol_constellation: sixth same-shaped pillar-9 rep, plus a real fix-root-cause-and-remediate-existing-damage move

**Pillar 9, the established pattern on a new problem shape.** Claude reported
that superseded terms still carrying their own `evidence` rows was fine — "by
design," per the project's own "never delete evidence" rule. Greg didn't
accept that at face value: "The evidence wouldn't need to be deleted if their
term_a_id or term_b_id was updated to the active term, did they move to the
active term?" That question — sharper than "is this OK?" — is what actually
surfaced the bug: the evidence hadn't moved, it had been *copied*, and
checking showed this was systemic (23 of 49 superseded terms, several
duplicated three ways: the dead term's original row, plus a fresh copy on the
new term, plus another fresh copy on the connecting relation). Same shape as
every prior pillar-9 entry this project has produced (2026-08-17 loop-scoping
bug, 2026-08-19 tool-heuristic trust, 2026-08-23 governance-at-scale,
2026-08-24 x2 base-term-creation gaps) — refuse the reassuring answer, ask the
question that actually tests it, then demand the systemic cause rather than a
one-off patch. Sixth dated instance of this exact move, across six different
problem shapes (scoping, tooling, governance, schema-gap x2, now data
integrity) — worth treating as an established habit rather than a developing
one; see the SKILLS_ASSESSMENT.md note below.

**The fix itself, once root-caused, is a genuine production-engineering
pattern: fix forward AND remediate backward, don't just patch the symptom.**
Root cause was a specific instruction-file ambiguity in `synthesist.md` —
"never delete evidence" had been read as "never move it either." Fixed at
two levels in the same session: (1) the instruction file itself, so future
work can't reproduce it (`UPDATE`-based repoint now explicit in both
relevant tasks, plus a specific carve-out Greg's own question implied —
the repoint step is always the calling agent's job, never a
delegated-to agent's, since the delegate has no visibility into the row
being replaced); (2) the existing damage — 22 duplicate rows identified by
cross-referencing each superseded term's own definition text against a live
fuzzy match (not a blind pattern), backed up first, cleaned up by hand, with
3 edge cases deliberately left alone and named rather than force-resolved.
Verified with `PRAGMA integrity_check` and the schema's own exactly-one-subject
CHECK constraint before considering it done, not just "ran without erroring."

**Smaller, same session: a real resource-management call once given real
data.** After Claude flagged the cost of spawning multiple agent batches (per
standing instruction) and ran a scoped 18-term pilot to get real numbers
(~12k tokens/term, 44% of terms needing a new-term delegation), Greg chose to
drive the same already-running agent directly via Remote Control for the
remaining ~330 terms rather than have Claude keep re-spawning it — avoiding
the fixed per-spawn cold-start overhead that pilot had just quantified. Not a
big architectural call, but a concrete instance of using measured cost data
to change an execution strategy rather than defaulting to the original plan.

Full session detail (paren backlog closing to zero, the evidence-duplication
bug): `symbol_constellation/log/2026-08-24.md`, "Session 3."

---

### 2026-08-24 (session 12) — symbol_constellation: repeated the 2026-08-23 pillar-9 pattern on a new bug, plus continued (not-yet-hands-on) pillar-8 exposure at greater orchestration complexity

**Pillar 9, same move as 2026-08-23, now a demonstrated pattern rather than
a one-off.** Directed a Synthesist pass building 10 new geometry-primitive
base terms (Point, Line, Plane, Solid, Sphere, Cube, Cone, Torus, Pyramid,
Circle) and the relations between them. Mid-task, the agent needed a base
Circle term to complete an assigned relation set (neither existing Circle
term was the plain generic sense) and correctly built one on its own
initiative — but the *same task* also found `Triangle` has only a
category-specific sense, no base sense, the identical structural gap, and
declined to build one, flagging it "out of scope" instead. Greg's response
was the exact 2026-08-23 move again: "It's a genuine miss that it came to
this conclusion and didn't create a base... Where do we need another base
creation entry point?" — refusing to treat it as an isolated inconsistency
and demanding the systemic cause. Root cause, once traced: the
"build-a-base-term" trigger had only ever been written into one task's
instructions (Task 1), never generalized to the rules that apply across
every task, so the agent had no standing permission to act on the same gap
found via different work. Fixed at the instruction-file level (a new
Standing Practices rule), not the one-off case — the second time this
exact discipline has been applied to two different subagent bugs eight
days apart, which is closer to a demonstrated habit than a single rep.

**Also, smaller: reviewed a flagged relation-type ambiguity on its own
merits rather than deferring to the agent's framing.** A subagent flagged
uncertainty between `instance_of` and `derivation_of` for a base-to-base
link (an architectural "pyramid" term connected to the new geometric
"Pyramid" primitive) and offered both readings with reasoning for each.
Greg considered the tradeoff and made the call (`instance_of`, the
shape-instance reading) rather than taking either the agent's suggestion
or Claude's framing as the default answer.

**Pillar 8: session 11's rating was corrected upward after review** (see
that entry, corrected in place below) — the original write-up only
credited the `synthesist.md` half of a coordinated two-file instruction
edit, and had drawn a line excluding prompt/instruction authorship from
counting toward this pillar, which doesn't match the pillar's own stated
definition ("prompting, tool use/agents"). Moved from "Early" to
"Developing." This session's own contribution was orchestration-direction
volume, not authorship: directing 15+ parallel `Agent` dispatches across
dependency-ordered waves (base primitives had to land before the solids
that reference them, to avoid a glossarist agent racing against a
not-yet-created FK target), diagnosing a stalled agent's actual cause (an
external process — `sqlitebrowser` — holding the database locked, not an
agent-side bug), and resuming a blocked agent mid-task via message-passing
once the lock cleared, rather than restarting it from scratch. This part
stays direction/review, same as session 10 — the level move came from
session 11's authorship being properly credited, not from today's
orchestration work.

---

### 2026-08-24 (session 11) — symbol_constellation: confirmed the pillar-9 fix worked, then a new kind of rep — hand-editing an agent's own instruction file

**Confirmed the queued test from session 10.** Dispatched Synthesist against
the actual Circle/Square/Triangle/Pentagram/Hexagram/Pentagon/Circle terms;
it correctly applied the corrected instructions, connecting all 8 to the
Geometry base term without demanding passage-level citation for a plain
taxonomic fact — the exact fix from the prior session's debugging rep,
verified working on the real case rather than just theorized.

**New rep category: hand-editing TWO coordinated agents'
`.claude/agents/*.md` instruction files himself, not application code —
under-credited in the first write-up of this entry, corrected here.**
Prompted by finding two proper-noun term rows (Orpheus, Cornelius Agrippa)
with no traceable provenance, Greg drove a long, multi-turn structural
rewrite of `synthesist.md` — relocating a misplaced rule (a
content-word/proper-name boundary defined three steps after the step that
needed it), catching his own broken design mid-draft (a `SELECT
relation_id FROM term_relations WHERE term_a_id=? OR term_b_id=?`
existence-check that referenced a term_id that wouldn't exist yet, since
the base term hadn't been created), and building an entirely new task
(Task 3, "base term usage search") to close a gap the earlier fix hadn't
actually solved — a broad sibling-sweep the original step sequence
structurally couldn't do. **He then closed the loop across a second file**:
edited `glossarist.md`'s own Reporting section so that any new
`category='base'` term it creates explicitly flags that a Task 3 sweep is
owed against it — necessary because Glossarist has no `Agent` tool and
can't trigger the sweep itself, and because Glossarist gets invoked two
different ways (via Synthesist mid-task, or directly by a human), so the
flag had to originate from Glossarist's own output to cover both paths.
That's real cross-agent system design, not a local fix to one file. Two
full renumbering passes on `synthesist.md` surfaced several stale internal
cross-references, self-caught on review. Claude's role throughout was
review/flag-only; only did the final doc-consistency polish (numbering,
"two tasks" → "three tasks") once explicitly told to go ahead — the commit
that landed reflects Claude's formatting pass, not raw authorship, but the
design and content decisions in both files were his. Same "write it
yourself, get reviewed" shape as his Python tool-writing reps
(`find_person_duplicates.py` etc.), applied to agent/prompt authorship
instead of app code. **Validated working in production the very next
session** (2026-08-24, session 12): Task 3 confirmed correct across 10 new
base terms and ~43 relations, and the Glossarist-flags-Task-3-is-owed loop
he built fired correctly on every one of those creations.

**Also produced a real architecture-planning session, not yet built:**
proposed making `LEARNING_ROADMAP.md`'s Phase 5 capstone real —
symbol_constellation's typed-entity-objects/Historian-agent/timeline work
becomes the actual vehicle, other phases mapped onto it, with an explicit
build triage (Historian agent, `timeline_item` schema DDL, a
date-extraction ETL, first table(s) of a SQLite→Postgres migration,
Dockerizing, and tests/CI are his; routine/mechanical work stays Claude's).
Real, non-manufactured justification surfaced for the Postgres migration
specifically: symbol_constellation now routinely runs 5-7 parallel
background agent batches against the same SQLite file, exactly the access
pattern its file-locking handles worst. **Historian agent build itself is
blocked** on the `timeline_item` schema not existing yet (his own note,
this session) — no action possible there until that's designed, so today's
contribution to that thread is the plan, not the build. Full detail:
symbol_constellation's `log/2026-08-24.md`.

---

### 2026-08-24 (session 10) — symbol_constellation: a debugging-not-designing pillar-9 rep, a self-caught bug in Claude's own answer, and a first real pillar-8 data point

**Pillar 9, distinct shape from 2026-08-23's entry.** That session was about
*designing* agent governance from scratch (narrow single-purpose agents
instead of fallible memory recall). Today was about *debugging* an
already-built agent's flawed reasoning after the fact. Asked Synthesist to
connect a new "Geometry" base term to existing Circle/Square/Triangle/
Pentagram terms; it declined all of them, reasoning no source passage
explicitly asserted the connection. Greg's response refused the easy path
twice: first rejected the answer outright ("if the synthesist can't make
this leap we are in bad shape"), then — critically — refused Claude's offer
to just patch the specific instance ("I don't want you to fix them, we have
to fix the Synthesist. What would preclude the agent from being able to
make this connection. Is synthesist not doing any definition searches,
also?"). That's the harder, more valuable move: demanding the actual
mechanism be found (a rule meant to block invented passage-specific claims
was mis-firing on plain dictionary facts) and fixed at the instruction-file
level, not accepting a one-off correction that would leave the same bug
live for the next term. Root cause, once traced, also directly answered his
own diagnostic question: the agent had no dictionary-verification step for
*taxonomic* facts, only for a base term's own definition — confirming his
suspicion was the right one before Claude had it fully diagnosed.

**A second, smaller pillar-9 rep the same session, this time catching
Claude's own answer, not a subagent's.** Asked why several `SUPERSEDED`
terms kept resurfacing in searches; Claude explained the convention (kept
for audit trail, never deleted). Greg kept pushing past the first
reasonable-sounding answer — "why not just delete them once folded in" —
until it surfaced a real, previously-unnoticed bug: two terms superseded
the day before still had a *live* structural relation from an active term,
not just a stale name match. Specified the actual safety check unprompted
("if it has zero relations and zero evidence then yes") rather than
accepting "seems safe" — that criterion caught the real bug precisely.

**First real pillar-8 data point** (table previously said "Unknown / not
assessed yet"). Today's work was, mechanically, directing a multi-agent LLM
pipeline in production: dispatching parallel background agents, relaying
live mid-task guidance into a running agent via message-passing, and
diagnosing/fixing a subagent's system-prompt reasoning gap. Not yet
hands-on building (Claude wrote every agent definition and orchestration
call), but real, substantive exposure to how an agent system actually
behaves and fails in practice — worth a first mark on this pillar even
before he writes one himself.

**Pillars 5/6, incremental, same pattern as prior entries**: continued
directing large-scale data-quality passes (paren/naming backlog across
several hundred terms, multiple parallel batches) and made one real
data-lifecycle architecture call — proposing a `status`/`superseded_by`
column plus a periodic reviewed-deletion pass, after Claude surfaced (on
request) that `PRAGMA foreign_keys` is off with no cascade rules, so a
naive delete would silently orphan rows. Same standing caveat as every
prior pillar-6 entry: directed and reviewed, not yet hand-built.

---

### 2026-08-23 (session 9) — SQL box continued (Postgres, real bugs caught), plus the sharpest pillar-9 rep yet on symbol_constellation

**Mentoring track: Postgres set up, SQL box actively worked, two real bugs
self-caught.** No Postgres locally before this session -- installed it,
created a practice DB, loaded real symbol_constellation data as fixtures
(which itself surfaced two genuine data-integrity gaps in the live project,
not staged for the exercise: 35 real duplicate `terms` rows, several
dangling foreign-key references -- both left visible via Postgres `NOT
VALID` constraints rather than hidden). First exercise handed over
combined join + two aggregates + `HAVING` all at once; self-identified this
as too much at once ("you picked all of the things I said I need a
refresher on in a single step") -- rebuilt as single-concept steps
(aggregate alone -> join alone -> join+aggregate -> `OR`-across-two-columns
-> disambiguating two same-named "Saturn" terms by category). Caught,
independently, before being told: (1) `AND`/`OR` mixed without parens
silently returning wrong rows (a classic, dangerous-because-quiet bug --
proved empirically by rerunning and seeing Hercules/Jupiter/Apollo show up
in a query that should've been Saturn-only), (2) `table.count(*)` -- tried
to put a table prefix on an aggregate function call, correctly diagnosed
once shown it parses as a schema-qualified function reference, not a
column. `LEARNING_ROADMAP.md` SQL box still not fully checked -- HAVING/
subqueries not reached this session, real joins+aggregates now are.

**symbol_constellation, unprompted: sharpest pillar-9 rep on record, one
level more abstract than anything logged so far.** Not catching a single
wrong AI suggestion or a single tool's blind spot (both already logged) --
this time, diagnosing a *systemic* failure mode of AI-assisted work itself.
Trigger: a parallel session had let 1,556 of 2,586 drafted terms violate a
rule that was fully documented in Claude's own memory system. Greg's own
framing, unprompted: "I do think we need to build out the Synthecist...
what I'd really like [is] to deploy the agents that have very specific
tasks and don't need to be caught up from memory on what they do and how."
That's a correct, non-obvious diagnosis of *why* memory-based governance
fails at scale (a general session's context-recall is probabilistic per
decision, not a hard constraint; a narrow agent's fixed system prompt is
loaded in full every time, no recall required) -- arrived at independently,
before Claude had framed it that way. Followed by real architecture
judgment: proposing a two-tier discovery/dispatch (a periodic "spider"
agent that finds problems and delegates) + narrow single-purpose worker
design, then correctly weighing (when asked) whether to split "term-
breaking" and "chain-building" into two agents or one with two tasks --
landed on accepting the one-agent-two-tasks argument once shown it matches
an already-working precedent (the Researcher agent) rather than defending
the original two-agent instinct for its own sake. This is pillar 9 exactly
as the assessment defines it ("architecture calls under uncertainty,"
"tool/process skepticism") but at the level of *how AI agents themselves
should be structured and governed*, not just judging one AI output. Worth
citing as the concrete example if pillar 9 comes up in an interview --
stronger than the prior two entries, not just another instance of the same
thing.

**Caveat, honestly logged**: the actual POC build (a new `synthesist` agent
definition, a schema migration, a real decomposition run against live data)
was Claude's implementation work, directed by Greg -- strong pillar 6
(architecture) and pillar 9 evidence, not new pillar-4 hands-on-coding
evidence. Consistent with the standing note on pillar 6: he directs and
reviews this class of work at a high level, doesn't yet hand-write it
himself. That gap is unchanged by today.

---

### 2026-08-21 (session 8) — first dedicated Roadmap/Mentoring-track session: Git fluency box checked for real

First session run under the new two-track split (Project vs. Mentoring,
chosen via a SessionStart hook set up earlier the same day) that actually
worked a `LEARNING_ROADMAP.md` Phase 0 item directly, rather than picking
up incidental reps from `symbol_constellation` work. Coaching model held:
Claude built the practice fixtures and reviewed, Greg ran every git
command himself.

**Branching + merge conflict.** Built a throwaway sandbox repo
(`~/experiments/git-fluency-practice`) with two branches deliberately
diverged on the same YAML field. First conflict (`timeout_seconds`,
master vs. `feature/raise-timeout`): resolved correctly and for the right
reason — kept the branch whose commit message actually stated a rationale
("handle slow upstream calls") over the one that didn't ("bump timeout
slightly"). Also self-caught an empty-commit-message block on the first
attempt and understood why it happened (`git commit` with no `-m` opens
an editor; empty message aborts on purpose).

**Rebase vs. merge, and the "ours/theirs" trap.** Second divergence
(`max_connections`, `trunk` vs. `feature/pool-tuning`) via
`git rebase trunk`. Genuinely useful confusion mid-exercise: believed
staying checked out on `feature/pool-tuning` meant that branch's values
would win, which is backwards during a rebase (the branch named as the
rebase target is "ours"; your own branch's commit is "theirs," replayed
on top). The conflict resolution actually landed on trunk's value by
accident first (editor/VS Code silently picked "theirs" before he'd
looked), caught on review, fixed via `git commit --amend` rather than
redoing the rebase — correct instinct, no unnecessary history rewrites.
Iterated the amended commit message twice more: once to describe both
changed fields instead of just one, once to fix an actual factual error
(message said "550" when the file said "250" — caught immediately, not
just a style nit).

**Real PR workflow against `symbol_constellation`.** Rather than fake
this in the sandbox, used genuinely completed same-day project work
(the `close-session` skill, `start_queue.sh`, archived finder scripts,
today's log entry) as real PR material — correctly excluded two
unrelated junk files (`constellation.db.bak-*`, `.sqbpro`) from the
commit without being told which ones. Branch created, committed, pushed,
PR opened (`GregorySmithHtx/symbol-constellation#5`) — first pass had an
empty PR body, caught and fixed unprompted-content-wise (body now
explains the *why* for all four pieces of the change, not just the diff).

**Pillar 4 update-worthy**: this is the first roadmap evidence that isn't
filtered through symbol_constellation's own problem shape — a genuine,
scoped git-fluency rep, self-directed within the exercise (VS Code
terminal pager confusion self-resolved after one hint, branch-naming
research self-directed via `git log --merges` after being told where to
look, not handed the answer).

**Same session, second box: Command line / piping.** Short (~15-message)
exercise, real data (`batch_run.log`), no fixture repo needed. Built a
3-stage pipeline (`grep -oE` extraction, `sort -u` dedup, `wc -l` count)
from scratch, asked for regex background honestly rather than faking
familiarity ("I'm not conversant in regex, that's why I asked about
wildcards" -- good self-awareness, not a gap to paper over), then caught
a real gotcha unprompted: `sort`'s default lexicographic-not-numeric
ordering, and independently reasoned out afterward that it was moot once
piped into `wc -l` (order is invisible to a line-count) without being
told. Final answer: 27 distinct jobs processed. **Greg flagged this
specific thread as worth expanding scope on** -- piping/shell fluency is
landing as more immediately useful than expected; worth treating as its
own deeper block next time rather than the few-minutes version, not just
ticking the roadmap checkbox and moving on.

**Third box, Command line "editing without an IDE": real nano reps** --
search/cut/paste/insert/save-and-exit, all landed correctly. Also
diagnosed a genuine environment bug along the way (VS Code eating
`Ctrl+K` as a chord-prefix before it reached the terminal) rather than
assuming nano itself was broken -- isolated it correctly via nano's own
`Ctrl+G` help screen before escalating.

**Fourth box, SQL indexes -- and a sharp pillar-9 catch mid-exercise.**
Built a real `SCAN`→`SEARCH USING INDEX` before/after on `evidence.term_id`
(6766 rows, previously unindexed). When told the column was safe to index
because it was "insert-only" (verified by grep of committed .py files),
**Greg pushed back on the spot**: "we combined many terms, the term_id
should have been updated?" -- correctly reasoning from what he already
knew about this project's merge workflow, not from the SQL itself. That
catch was right: the grep-based claim was true but incomplete (merges in
this project are explicitly done by hand, never scripted, so a real
merge's `UPDATE evidence` would never appear in any committed file).
Checking the live DB instead of the code surfaced **29 real orphaned
`evidence.term_id` rows** — a genuine, previously-unknown data-integrity
gap, not a hypothetical, now logged in
`project_schema_remediation_plan.md` for later triage. This is Pillar 9
exactly as defined: not catching a wrong line of code, but catching that
a *verification method itself* (grep-the-code) couldn't see a whole
category of real-world change (hand-run DB commands) — same shape as the
2026-08-19 `paren_triage.py`-heuristic catch already on record, now a
second independent instance of the same skill.

### 2026-08-21 (session 7) — symbol_constellation: another self-written finder script, and a real data-loss catch during review of Claude's transform logic

Shorter, focused session: cleaning "per this source" boilerplate out of
`evidence.excerpt` text (a separate instance of the same phrase already
partly cleaned from `terms.definition` in an earlier session).

**Pillar 4/5 — another finder script written himself.** Same pattern as
`find_person_duplicates.py` and the paren-cleanup finders from prior
sessions: wrote `find_per_this_source_in_evidence.py` (parameterized SQL
query against `constellation.db`, argparse CLI, matching the project's
established finder-script convention) before bringing it into this
session. I adapted the same pattern for four more finder scripts covering
the other punctuation shapes of the same phrase; those four were mine, not
his.

**Pillar 6 — a real correctness catch during review, not just
encouragement-worthy participation.** I proposed a mechanical rule for
removing the `'s`-suffixed bucket (55 rows): delete everything after
"per this source's" as boilerplate. He pushed back — correctly — that some
of that trailing text wasn't boilerplate at all (a named cosmological
scheme, a specific cited text, a list of archangel/patriarch pairings) and
would be a real, silent data loss for a reader who isn't already expert in
the source material. That's the same shape of catch as the `reshuffle_queue.py`
and pipeline-bug catches logged in prior sessions: not accepting the first
plausible-looking rule, actually thinking about who reads the output and
what they'd lose. This one specifically is closer to a data-quality/product
review skill than hands-on coding, worth tracking as its own thread if it
keeps recurring.

**Honest gap noted directly to Greg**: this session's actual transform code
(the removal/reattachment logic across all four completed buckets) was
written and iterated by Claude, with Greg in the review/correction seat —
not a coding rep on his part beyond the initial finder script. Flagging
this distinction explicitly rather than crediting the whole session as
hands-on ETL practice.

---

### 2026-08-20 (session 6) — symbol_constellation: found and fixed a real pipeline bug, a design correction on a new tool, copyright/data-governance reasoning, and a first LLM-agent build (untested)

Long session mixing new-source acquisition, tooling, and a genuine architecture tangent (custom subagent personas). Several concrete, evidenced pieces:

**Pillar 4/5 — found and fixed a real production bug in the extraction pipeline, with actual verification discipline.** `run_queue.py`/`local_draft.py` had a latent bug: a job whose EPUB couldn't be resolved (missing file, or a failed download) looped forever, since the failure path never changed `status` or `skipped`, and the runner's selection query just kept re-picking the same job. This surfaced live — the queue runner was launched, caught spinning on job 89 within seconds via the log, killed before real waste accumulated. The fix (a `skipped` 0->1->2 counter with one retry pass) wasn't just written and trusted: it was verified with a direct two-call repro (`python3 local_draft.py 89` run twice, confirming the exact 0->1->2 transition) *before* relaunching the real batch runner. That verify-before-trusting-your-own-fix step is the actual skill here, not the fix itself.

**Pillar 4/5 — a real "design for the actual requirement" correction on a self-written tool.** First version of a new `reshuffle_queue.py` (sorts the extraction queue shortest-source-first) measured length by downloading full EPUBs for anything not already local — worked, but pulled 13GB of unplanned downloads including most of an unrelated pre-existing backlog. Caught directly ("you shouldn't have to download to check size"), redesigned to use metadata-only signals (local file `stat()`, or archive.org's own reported file size from its metadata endpoint) — same coarse-ordering value, zero download cost. A clean instance of "the cheap signal was available the whole time, first pass just reached for the convenient one instead."

**Pillar 6/9 — real data-governance/copyright reasoning under actual constraints**, not abstract policy: worked through a genuine fair-use distinction (facts/terminology aren't copyrightable, only expression is) to define what "reading a copyrighted source safely" actually means for this project (human-only reading, definitions sourced elsewhere, never exhaustive) — then caught my own over-engineering when a new `copyright_status='active_copyright'` value got proposed and consolidated back into the existing `murky` status on the reasoning that one gate beats two for the same practical effect. Real design restraint, not just accepting the first idea.

**Pillar 9 — first LLM-agent build, honestly still unvalidated.** Built a custom Claude Code subagent (`.claude/agents/classicist.md`) — a translation/research specialist scoped to read-only tools (no DB/file-write access), with explicit anti-plagiarism instructions (produce an independent translation, don't paraphrase an existing copyrighted one). Real agent-design thinking (tool scoping for safety, not just capability). But it's untested — Claude Code loads custom agents at session start, so it wasn't recognized mid-session, and the actual Philolaus-fragment test is queued for the next session. Flagging this explicitly as designed-not-demonstrated rather than claiming a win before it's earned.

---

### 2026-08-19 (session 5) — symbol_constellation paren-cleanup mega-session: another self-written tool, the sharpest pillar-9 catch yet, and real pillar-6 pipeline-architecture judgment

A long, dense session pushing the parenthetical-name backlog from 760 down
to 442 terms (`paren_triage.py`), with a lot of real ground covered. Logging
precisely, same discipline as every other entry here.

**Pillar 4/5 — another tool written himself, `find_existing_term_in_parens.py`.**
Same coding-challenge pattern as `find_own_category_in_parens.py` and
`find_person_duplicates.py`: built a script that finds terms whose
parenthetical content matches an existing term's name, surfacing "210 easy
remaps." Caveat on this one specifically: unlike the earlier two tools, I
didn't see the build/debug process — he opened it already substantially
complete and reported the result ("I have another one that has 210 easy
remaps"). Real evidence he's now doing this kind of tool-writing as a matter
of course rather than needing it framed as an exercise, but a thinner
observation than the fully-witnessed `find_person_duplicates.py` reps.

**Pillar 9 — the sharpest catch logged yet, and a new kind of catch.**
Every prior pillar-9 entry is about catching wrong *code*. This one is about
catching wrong *trust in a verification tool*: `paren_triage.py`'s own
`collision_ok` bucket had labeled 34+ term pairs "no action needed," and
several turned out to be real duplicate-fork bugs (same King Ahab, same
King David, same prophet Isaiah, each accidentally split into two rows)
that the bucket's heuristic couldn't actually distinguish from genuine
name collisions. His correction, verbatim: *"I am the tool... if there are
rules that get in the way of progress, we can't program around them and
end up in this kind of situation again... I don't get to be clever and you
don't get to be clever either, no hiding the clothes under the bed instead
of cleaning our room."* That's a durable, transferable principle stated
precisely — a tool's "ok" label is an approximation, not a verified answer,
and treating it as final is how real problems hide behind a clean-looking
report. This is pillar 9's definition exactly (tool/process skepticism),
one level more sophisticated than catching a bug in a single suggestion.

**Pillar 6 — real architecture judgment, a new facet (pipeline/process, not
data-schema this time).** Floated a staged-promotion ingestion pipeline for
future source extraction (motivated by a possible future Torah/Old
Testament source, whose density would stress-test exactly tonight's
failure modes), illustrated with a full enterprise-style multi-environment
release pipeline as a (his own words, after the fact) hyperbolic comparison
point. When I pushed back that the full version is more ceremony than a
two-person project needs, he agreed immediately and reframed it correctly
himself: "worst case," contingent on whether other people ever chip in, and
for now "minimal, near best, with expected hiccoughs." That's the right
instinct — scope infrastructure to actual team size and risk, not to what a
textbook enterprise pipeline looks like, and recognize your own
illustrative exaggeration as exaggeration rather than let it calcify into
the plan. Adds breadth to the already-"Strong" pillar 6 rating
(process/pipeline architecture, distinct from the Deck/Card data-schema
evidence already logged) rather than being new evidence on its own.

**Honest caveat, same shape as every prior entry of this kind:** the actual
execution — many hundreds of SQL writes across merges, relation additions,
and renames — was Claude's, start to finish, under his direction and
correction (he caught a batch of newly-introduced name collisions I'd
missed, and flagged a specific bad match — term 735 — that I'd have
otherwise auto-processed incorrectly). Real pillar 6/9 evidence; not new
pillar 4 hands-on-coding evidence beyond the `find_existing_term_in_parens.py`
note above.

### 2026-08-19 (session 4) — same-session continuation: real duplicate-review + data-quality work, directed end-to-end, honest pillar-6-not-4 caveat

Immediately after session 3's CLI rep, the conversation continued into using
`find_person_duplicates.py` for its actual purpose: reviewing real candidate
pairs from the live graph. Substantial, real work came out of it, but it's
worth logging precisely for the same reason as the 2026-08-19 "(later)"
entry below -- the session's shape determines which pillar it counts for.

**What happened:** merged four confirmed duplicate/near-duplicate person
terms (Serenus Samonicus/Sammonicus, Octavius/Octavius Augustus, William of
Paris's unnamed anecdote-woman folded back into William of Paris, a
Herodotus fragment folded into the main Herodotus term), each requiring a
real conflict check against `term_relations`' UNIQUE constraint before
remapping. Separately, caught and fixed a systemic data-quality pattern:
93 `represents` relations were being used as a generic connector outside
its documented "genuine symbolic meaning" scope (traceable to old
orphan-remediation-pass work), and 2706 term definitions carried a
redundant "per this source" hedge traced to the local Ollama drafting
prompt's phrasing, which got fixed at the source.

**Real, unprompted judgment calls (pillar 6), several sharper than what I
generated first:**
- Corrected my own initial framing that `represents` should be tarot-only
  scoped ("shouldn't be only for tarot, but for any instance of symbolic
  meaning") -- a real catch of an AI-drawn boundary that was too narrow,
  not just too loose.
- Articulated a crisp three-way boundary between `represents` (symbolic
  meaning), `discusses` (an actual discussion/citing), and `associated_with`
  (deliberately loose, no dedicated type yet) that I hadn't drawn that
  cleanly myself.
- Independently noticed the "per this source" cliché as noise across many
  terms -- an editorial/data-quality catch nobody had flagged before,
  traced to root cause (the Ollama prompt) rather than just patched at the
  DB level.
- Made real merge-direction calls (which spelling/name survives, which
  becomes an alias) and flagged a likely factual mix-up in a source
  definition (Loudun vs. the Girard/Cadière affair, two different
  centuries) without being asked to.

**Honest caveat, same shape as the "(later)" entry below:** every SQL
statement, every conflict check, every write was Claude's, start to finish.
This is pillar 6 (and touches pillar 9, correcting AI framing), not pillar
4 -- the session's real shape was direction and review of an AI executing
under his authority. Consistent with the pattern he named himself in
session 3: real, valuable evidence, just not the "write it yourself" reps
pillar 4 still needs.

### 2026-08-19 (session 3) — find_person_duplicates.py: another pillar-9 rep, and Greg named the underlying pattern himself

Turned the old `reference_duplicate_finder.py` scratch script into a real
`find_person_duplicates.py` tool. The actual work was CLI wiring, dead-code
cleanup, and a docstring rewrite — pillar-9 evidence: caught a docstring
pointing at a superseded write-tool convention, a leftover dead-code line,
and a fabricated "Phase 2b" citation inherited from another file's own
docstring. Also made a real correction on Claude's end: parenthetical names
aren't just a readability nit, they're a direct mechanism that breaks
`get_or_create_term()`'s exact-match dedup — a connection Claude hadn't
fully made either.

**The pattern he named himself, unprompted — worth logging as its own
signal.** After the above, he asked directly whether he keeps building on
already-strong pillars (1/3/6/9 — review, judgment, direction) at the
expense of the weak ones (4/5/7/8 — hands-on writing). Checked against
`SKILLS_ASSESSMENT.md`: this matches a caveat already on record from
2026-08-18 ("this session moves pillar 6, not pillar 4 ... much closer to
what his actual day job already is ... than to the 'write it yourself' reps
pillar 4 still needs"). Today's session repeats that shape exactly — the
one place there was room for a real pillar-4/5 rep (writing the actual
grouping/matching logic himself) went untouched in favor of CLI wiring and
directing Claude to gather/write context. Noticing the pattern himself,
across separate sessions, without being told, is itself a real instance of
pillar 9's process/tool skepticism — just aimed at his own practice instead
of at generated code.

**Correction, added after the fact (2026-08-19): the pillar-4 gap noted
above did NOT stay untouched.** Later in this same continued session, Greg
wrote the `--first` flag himself: extended `find_surname_groups` into
`find_name_groups` with a shared `position_flag` parameter (his own design
call on how to reuse the fetch/tokenize/group-filter logic across both
directions rather than duplicating it), wired the `argparse` flag, and
self-corrected two real bugs across three review passes with hints only,
no code from me -- a stray `from torch import full` (IDE-autocomplete
artifact, not his to begin with, but his to clean up) and converting a
`nargs="?", const="first"` flag to the more correct `action="store_true"`.
Verified by actually running the script in both modes against the live DB.
This is real, hands-on pillar-4 evidence -- see `SKILLS_ASSESSMENT.md`,
third dated rep added to that row.

**Concrete next step, not just a note.** Pillar 4's own 2026-08-17
calibration says coaching should start from a working example to modify,
not a blank editor. `find_person_duplicates.py` already has two ready-made
candidates for that: adding a first-name-token grouping pass, or a
fuzzy/Levenshtein match alongside the exact-token one. Either is a genuine
algorithm-writing rep on an existing template — the kind of task this
pattern keeps skipping past in favor of framing/docs work.

---

### 2026-08-19 (later) — symbol_constellation: long data-modeling/dedup session, directed end-to-end, real pillar-6 evidence with an honest caveat

A long, dense session on symbol_constellation: fixing author/translator/editor
attribution across ~86 sources (new `translated`/`edited`/`illustrated`
relation_types), deduping fragmented person-terms across the graph, and a
schema/display fix for Hebrew final-form letters. Worth logging precisely,
since the session's actual shape matters for which pillar it counts toward.

**Real, unprompted architectural judgment (pillar 6):**
- Rejected reusing the existing `member_of` relation for "this term is a
  topic discussed in this book," specifically because he could see in
  advance it would blur three already-distinct uses of that relation
  (organizational membership, taxonomic membership, pantheon membership) —
  a real "resist a convenient but wrong reuse" catch, the same shape as the
  2026-08-17 Deck/Card schema catch, not a one-off repeat of it.
- Flagged, before any verification either way, that a merged "Thomas
  Aquinas" term could collide with the biblical apostle Thomas already in
  the graph. Turned out already handled correctly elsewhere — but the
  instinct to check for exactly that class of collision before it became a
  real problem is the actual signal, not the specific outcome.
- The session's clearest moment: after a data-quality bug got found and
  fixed (Hebrew final-form letters carrying disambiguating text in a
  parenthetical with zero real relation behind it), he specified the
  general fix himself, unprompted — strip the stored text, and reconstruct
  it in the display layer from the relation, only when the relation isn't
  blank. That's a real, transferable software principle (derive display
  state from structure at render time, don't store it redundantly) stated
  as a concrete instruction, not something that needed explaining to him.

**Honest caveat, stated plainly since the instruction says to**: this
session moves pillar 6, not pillar 4. Every SQL statement and the one
Python/HTML fix (`build_report.py`) were Claude's, start to finish — he
didn't type or run code himself at any point. The session's real shape was
requirements-direction, architectural judgment, and review of an AI
executing under his authority, which is much closer to what his actual day
job already is (leading implementation without hand-authoring it) than to
the "write it yourself" reps pillar 4 still needs. Real, valuable evidence
— just not evidence for the specific gap this project was originally meant
to help close. Also thin on new pillar-9 evidence specifically (catching
wrong AI output) — nothing meaningfully wrong needed catching this session;
the value was in correct direction, which pillar 6 already covers.

### 2026-08-19 — corrected two stale caveats in this log

Both flagged directly by Greg, verified against git/DB before writing anything down (per his stated preference — see [[project_practice]]'s tool-first rule):

- **Pillar 4**: the 2026-08-18 entry's "left unfinished and still buggy" note on `--bucketXsource`/`--sourceXbucket` was stale. Git shows it was fixed and merged shortly after (`b139d74`, PR #1 `fix/paren-triage-cross-filters`), with a further `--verify-source` addition since (`37826f7`).
- **Pillar 6**: the 2026-08-18 entry's "none of it is built or tested yet" caveat on the Deck/Card schema is also stale. `38fddba` built and populated it for real: `Deck`/`Card`/`MajorArcanaCard`/`SuitCard`/`ExtraCard` tables live in `constellation.db`, verified by direct query — 7 decks, 210 `Card` rows (154 Major Arcana across all 7, plus Golden Dawn's 56 pip/court cards via `SuitCard`). `term_id` linking (0/210) and Minor Arcana for the other 6 decks remain open, per `TAROT_DECK_DESIGN.md`.

Both corrections came from Greg catching a stale mentor claim before it stood uncorrected, not from re-reading his own work — worth noting since it's adjacent to the pillar-9 pattern (catching wrong output, whether it's AI-authored code or an AI-authored status claim).

### 2026-08-18 — Tarot/Deck architecture design (pillar 6, real upgrade) + Python fundamentals continued (pillar 4), with honest caveats on both

Two more sessions. Neither is an unqualified win — logging what's actually
solid and what isn't, per explicit request not to just log the good parts.

**Pillar 6 — a real upgrade from a single catch to sustained design work.**
The earlier entry (2026-08-17) was one unprompted catch on a proposal
Claude made. This session was different in kind: working out a typed
`Deck`/`Card` schema for symbol_constellation's Tarot data, Greg
independently recognized the hierarchy he'd first sketched was missing a
base object ("this is not a deck"), used five real physical decks to
stress-test the model rather than reasoning abstractly (which is what
surfaced a genuinely hard case — a French deck using 1-indexing, no clean
Major/Minor Arcana boundary, and a court-rank system with no clean
mapping to standard playing cards), and caught his own design smell —
an early version would have piled every division's fields onto one
`Card` table — correcting it into normalized subtype tables without
Claude driving that specific call. Real, sustained, multi-turn
architectural reasoning, not a one-off. **Caveat, stated plainly: none of
it is built or tested yet.** This is design reasoning, not implementation
— genuine evidence for architectural judgment, not yet evidence for
seeing a design through to working code. Worth moving pillar 6 up from
"Partial," but "Strong" should probably wait for an actual build.

**Pillar 4 — a different, arguably more honest kind of rep than the
first one.** Where the 2026-08-17 entry was guided coding with a lot of
Claude-provided scaffolding, this session was closer to real fundamentals
work: dict vs. list vs. tuple, why dict iteration gives keys and not
values (the actual root cause of a real crash Greg hit), first real use
of the VS Code debugger and Debug Console instead of print-statement
debugging, list comprehensions, `any()`. Recognizing a half-remembered
term ("that list comprehension trick is kind of what I was fumbling
around for") is a real, different signal from learning something cold.
**Caveat**: still guided — Claude pointed out most of the bugs rather
than Greg finding them independently, and the feature being debugged
(`--bucketXsource`/`--sourceXbucket` filters on `paren_triage.py`) was
left **unfinished and still buggy** at session end (missing a `type=int`
on one CLI flag, an unused variable, leftover debug prints) — logged
honestly as incomplete work, not glossed over. Blank-page writing itself
still hasn't been tested in isolation; every rep so far has started from
an existing pattern to modify.

### 2026-08-17 (even later) — caught a real, subtle bug in Claude's own suggested code

Follow-up to the `--source` filter entry below. Claude reviewed the
finished code unprompted and suggested a small polish: print the
filtered source's title via `sources[source_id]['title']` instead of the
raw numeric ID. Greg didn't apply it as given — he changed `source_id` to
`source_filter` and flagged that the swap "makes a key difference."

He was right, and it's a real bug, not a style preference: the print
statement sits *after* the nested `for bucket in buckets.values(): for
tid, name, category, source_id, why in bucket:` loop. Python doesn't
scope loop variables to the loop body, so by the time
execution reaches the print line, `source_id` just holds whatever it was
last set to on the final iteration of the whole double loop — no
guaranteed relationship to the actual filter requested. It wouldn't have
crashed; it would have silently printed the wrong source's title next to
a correct match count. `source_filter` (the function parameter) is the
value that's actually stable and correct throughout.

This is stronger pillar-9 evidence than anything logged so far: not
catching his own mistake by running code and reading a traceback (last
entry), but catching a subtly-wrong suggestion *from the AI* before ever
applying it, by reasoning correctly about Python's loop-variable-leakage
scoping rule — a real, general, transferable piece of language knowledge,
not a one-off fix. Exactly the pillar-9 definition: "catching subtly-wrong
AI output," not just wrong output in general.

### 2026-08-17 (later) — paren_triage.py `--source` filter: first from-scratch-adjacent Python rep, guided

The concrete next step flagged in the entry below got done tonight: Greg
wrote a new `--source` filter for `paren_triage.py` himself (extending a
tool he'd previously directed but not written), with Claude pointing at
bugs rather than writing the fix. Real debugging arc across ~5 passes, not
one clean shot — recording the process precisely since that's the actual
value, not the ~15 final lines:

- Wired the CLI flag and threaded it through function signatures correctly
  on the first attempt — real, if partial, grasp of the existing code's
  shape.
- Then worked through a real sequence of bugs, each one a genuine and
  common class of mistake, not a fluke: querying the wrong data structure
  entirely (`sources`, a metadata dict, instead of `buckets`, which holds
  the actual terms), a type mismatch between a CLI string argument and an
  integer DB key (self-diagnosed correctly once pointed at it), dict-key
  access attempted on a plain tuple, a missing inner loop needed to unpack
  individual tuples out of a bucket's list, and a print-before-populate
  ordering bug.
- The notable moment: on the last bug, instead of asking for another hint,
  said *"I'll run the code before asking for too many hints, the error
  gave me what I needed."* That's a direct, dated instance of the exact
  trust-calibration gap named in the 2026-08-16 entry below ("corrections
  tend to land late... concrete gap to practice: catching wrong output
  sooner") actually closing, not just being flagged as a plan.
- Final version runs clean, verified against the live DB (`--source 1`
  correctly returned 8 real terms spanning multiple buckets).

Pillar 4 evidence in `SKILLS_ASSESSMENT.md` updated to reflect this as a
completed first rep, not just an intended next step.

### 2026-08-17 — symbol_constellation: a real pillar-6 catch, plus a concrete calibration on where "rusty" actually sits

Long symbol_constellation session (parenthetical-naming audit, a local
triage script, a schema-design discussion). Two things worth logging:

- **Pillar 6 (systems/architecture design) — a real, unprompted catch, not
  hypothetical.** Claude proposed a typed side-table (`tarot_cards` with a
  `major_arcana_number` column) as a schema improvement. Greg caught that
  this would silently regress a core design principle (the graph never
  picks a winner between disagreeing sources) by collapsing a
  per-source-varying fact onto one column. The fix he proposed instead —
  model "deck" as its own first-class object holding an *ordered set of
  foreign keys*, so each source's ordering is its own row rather than a
  shared column — is genuine relational-modeling instinct: normalize the
  *relationship*, not the entity. This is one real data point, not enough
  to move pillar 6 to "Strong," but it's the clearest unprompted
  architecture-judgment moment logged so far — keep it as the concrete
  example if this pillar comes up in an interview.
- **Self-reported calibration on pillar 4 ("rusty"), worth recording
  precisely rather than leaving as a vague "10 years stale":** Greg can
  read and understand code, and has adapted/modified existing code
  recently — but hasn't written Python from scratch in ~10 years and
  described real blank-page paralysis ("may not know what to write in the
  first line without a template"). This changes how Phase 0/1 of
  `LEARNING_ROADMAP.md` should actually run: start from a working template
  and modify it in small, guided steps, not a blank editor and a spec.
  Plans to use VS Code (already installed) for the next hands-on attempt.
  **Concrete next step, not yet done:** have Greg write the next small
  iteration of an existing tool himself (a real candidate: extending
  `symbol_constellation`'s `paren_triage.py`, which he directed but did not
  write) with review rather than delegation, to get the first real
  from-scratch-adjacent rep logged.

### 2026-08-16 (later) — symbol_constellation cross-pollination; pillar 9 added

During a platform-wide Claude outage, continued the "what is FDE_Skills_dev
for" discussion locally in VS Code / Claude Code, inside the
`symbol_constellation` repo (a personal project extracting data from
historical texts into a graph database, with report UI and audit tooling).
That conversation produced real, evidenced skill-relevant material, folded
into `SKILLS_ASSESSMENT.md` as a new pillar 9 (AI-assisted engineering
judgment):

- **Trust calibration with AI-generated output is still tuning** (first
  week using Claude Code). Corrections tend to land late — after a bad
  pattern has already run for a while — rather than on first repeat.
  Concrete gap to practice: catching wrong output sooner.
- **Verification/audit tooling isn't automatically trustworthy.** Needs the
  same scrutiny as anything else, not a pass just because it exists and
  runs. Directly relevant to pillar 7/9 — process rigor includes
  questioning the rigor tooling itself.
- **Triage discipline for deferred work.** Several low-value/one-off
  threads (needing manual/human-in-the-loop work with no real payoff) were
  moved out of active memory into a `SOMEDAY.md` file, specifically so they
  stop resurfacing as unprompted suggestions while a real work queue is in
  progress. A concrete, reusable pattern: park explicitly, re-surface only
  when the real queue drains or on direct request.
- **Git discipline recovery.** A parallel local session had drifted 77
  commits ahead of `origin/master`, unpushed — an old "commit after each
  checkpoint" discipline had lapsed. Caught and resolved: pushed and
  synced, checkpoint pattern resumed (a per-chapter scratch script, not
  relying on git to capture the large generated `constellation.db`, which
  stays gitignored — real data safety is a separate encrypted-snapshot
  script).

**Resolved (same session):** `FDE_Skills_dev` is a private working log
first — raw, for internal use. Once real evidence accumulates (not day
one), a separate public-facing summary gets distilled from it for
applications; this repo stays private and unpolished by design. Reflected
in `CLAUDE.md` and `README.md`.

### 2026-08-16 — Assessment created

Initial skills assessment and roadmap written based on background:
10 years as Solutions Engineer/Architect (Skuid/Nintex Apps, Salesforce
ecosystem), project lead on production Fortune 500/DOD engagements,
JS/Python-Django experience ~10 years stale. Exploring FDE fit, not yet
committed. Starting point: Phase 0 of `LEARNING_ROADMAP.md`.
