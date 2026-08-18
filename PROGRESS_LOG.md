# Progress Log

Dated notes on what actually happened — projects touched, skills exercised,
what felt easy/hard, and any updates to the pillar levels in
`SKILLS_ASSESSMENT.md`. Newest entries at the top.

---

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
