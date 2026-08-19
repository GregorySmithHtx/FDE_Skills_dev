# Progress Log

Dated notes on what actually happened — projects touched, skills exercised,
what felt easy/hard, and any updates to the pillar levels in
`SKILLS_ASSESSMENT.md`. Newest entries at the top.

---

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
