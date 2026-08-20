# FDE Skills Assessment — Greg Smith

Last updated: 2026-08-19

## Context

"FDE" here means Forward Deployed Engineer in the general sense used across
Palantir, Anduril, Applied Intuition, OpenAI Solutions/Forward Deployed teams,
and similar orgs: an engineer embedded with a client who builds real,
production-grade software against messy real-world data and systems,
end-to-end, under ambiguity, with heavy client interaction.

**Background this assessment is based on:** 10 years as a customer-facing
Solutions Engineer/Architect on Skuid/Nintex Apps (low-code, Salesforce
ecosystem). Project lead on production engagements — not POCs — for
Fortune 500, DOD, and other orgs, often with global teams. Prior to that,
front-end (JS) and Python/Django experience, now ~10 years stale.
Currently exploring whether FDE is the right fit, not actively applying.

## The 9 FDE competency pillars

| # | Pillar | Level | Evidence |
|---|--------|-------|----------|
| 1 | Client engagement & requirements discovery | **Strong** | 10 years doing this professionally, at the project-lead level |
| 2 | Ownership & navigating ambiguity to production | **Strong** | Ships production systems, not demos, for Fortune 500/DOD |
| 3 | Enterprise domain & data literacy | **Strong** | Deep Salesforce data-model fluency; exposure to DOD/enterprise compliance constraints |
| 4 | Full-stack software engineering (hand-written, no low-code scaffold) | **Weak / rusty, real progress** | JS + Python/Django are ~10 years stale; day-to-day work is low-code, so coding reps are low. Calibrated 2026-08-17: can read/understand and adapt existing code, but hasn't written from scratch in ~10 years and reports real blank-page paralysis without a template — coaching should start from a working example to modify, not a blank editor. First guided rep 2026-08-17: extended `paren_triage.py`'s CLI (a `--source` filter) from the existing `--bucket` pattern as a template, plus a real debugging-loop improvement mid-session (chose to run the code and read the traceback rather than request another hint). Second rep 2026-08-18, genuine fundamentals this time: dict/list/tuple distinctions, dict iteration semantics, first real VS Code debugger + Debug Console use, list comprehensions, `any()`. That session's `--bucketXsource`/`--sourceXbucket` filters were left buggy/unfinished at the time, but **were finished and merged shortly after** (`b139d74`, PR #1), with `--verify-source` added on top since (`37826f7`) — the "unfinished" note was stale as of 2026-08-20, corrected here. Third rep 2026-08-19 (`find_person_duplicates.py`, `26e37e8`): extended a working template again (`find_surname_groups` → `find_name_groups`), but this time the design call was his own -- a shared function parameterized by which name-token index to group on, rather than duplicating the fetch/tokenize/group-filter logic per direction -- and he self-caught two real bugs across coached review passes (a stray unused `torch` import, an overcomplicated `argparse` flag simplified to `action="store_true"`) with hints only, no code supplied. Verified working by actually running it against the live DB in both modes |
| 5 | Data engineering & integration (ETL, APIs, messy real data) | **Partial, real data point added** | Some exposure via Salesforce integrations; not deep pipeline/ETL/data-wrangling work. 2026-08-19: directed a long real data-quality-pipeline problem on symbol_constellation (batch dedup, collision detection, orphan/verification checks across hundreds of writes on messy extracted text data) and, from it, correctly specified what a real ingestion pipeline needs — a staging area gated by automated checks before promotion to production — while also right-sizing it down from an illustrative full-enterprise-pipeline comparison (his own framing, later flagged as hyperbole) to what a two-person project actually needs. Real pipeline-architecture judgment; still not hands-on ETL code-writing by him, so not yet moving off Partial |
| 6 | Systems & architecture design for arbitrary domains | **Strong, one specific gap left** | Architects within a bounded low-code platform; hasn't designed a system from a blank canvas recently. 2026-08-17: real unprompted catch on symbol_constellation — flagged that a proposed typed schema table would regress a core multi-source design principle, and proposed the fix (model "deck" as a first-class object with an ordered FK sequence rather than a column). 2026-08-18: a full multi-turn design session for the same idea — independently spotted a missing base object in his own hierarchy sketch, used real physical decks to stress-test the model (surfacing a genuinely hard edge case, not a convenient one), and self-corrected an over-loaded table design into normalized subtype tables. 2026-08-19: the Deck/Card/MajorArcanaCard/SuitCard/ExtraCard schema (`38fddba`) is confirmed live and populated (7 decks, 210 `Card` rows) — no longer design-only. Same session, separately: rejected reusing `member_of` for a new relationship because he could see in advance it would blur three already-distinct uses of it, and specified unprompted that a data-quality fix belonged in the display layer (derive state from structure at render time, don't store it redundantly) rather than the data layer. **Raising to Strong** — repeated, independent, correct architectural judgment across multiple sessions and problem shapes is the actual bar. 2026-08-19 (later session): a new facet of the same pillar — pipeline/process architecture rather than data-schema — floated a staged-promotion ingestion design for a future hard source, illustrated it with a full enterprise-style release pipeline, then correctly scoped that comparison down to what a two-person project's actual risk profile needs (and named his own illustration as hyperbole rather than let it stick as the plan) rather than defaulting to enterprise ceremony. What's still missing before this is unqualified: he directs and reviews this work, he doesn't yet build it hands-on — see pillar 4, which this doesn't move |
| 7 | Engineering rigor (git, testing, CI/CD, security-by-construction) | **Weak / unknown** | Low-code platforms absorb most of this; needs a direct check |
| 8 | Modern AI/LLM application fluency (building with LLMs — RAG, tool use, agents) | **Unknown / opportunity** | Not assessed yet |
| 9 | AI-assisted engineering judgment — catching wrong AI output, architecture-under-uncertainty, tool/process skepticism | **Early / in active practice, sharpest rep yet** | `symbol_constellation` project (see below) is generating real, non-hypothetical reps of this. 2026-08-17: caught a real, subtle bug in Claude's own suggested one-line fix (a Python loop-variable-scoping leak that would have silently printed the wrong value, no crash) before applying it, by correctly reasoning through the scoping rule rather than pasting the suggestion as-is. 2026-08-19: a more sophisticated version of the same skill — not catching wrong code, but catching that a *verification tool's own heuristic* (`paren_triage.py`'s `collision_ok` bucket) was being trusted as a final answer when it couldn't actually distinguish the case it claimed to resolve, letting real duplicate-fork bugs hide behind a clean-looking report. Named the general principle himself, unprompted: a tool's "ok" label is an approximation, not a verified answer — don't program around a rule's limits and call it handled, surface the gap and decide for real. This is tool/process skepticism exactly as pillar 9 defines it, one level more abstract than catching a single bad suggestion |

### Why pillar 9 exists

As of 2026, most literal code-writing on FDE-style work gets delegated to
AI. That shifts where the actual skill lives: it's not "can you write the
code," it's domain judgment — catching subtly-wrong AI output, making
architecture calls under uncertainty, and closing the gap between what's
asked for, what's meant, and what actually gets built. This is arguably
becoming the *central* FDE skill, not a side one. It's distinct from pillar
8 (building LLM-powered apps) — this is about working correctly alongside
an AI collaborator on any codebase, which is now true of nearly all FDE
work regardless of stack.

## What you already have (don't relearn this)

- **Client trust and requirements translation.** The hardest part of FDE work
  for most engineers — turning an ambiguous stakeholder ask into a scoped
  build — is already a professional strength.
- **Production accountability.** You own outcomes for Fortune 500 and DOD
  clients, including the political/organizational complexity of global
  teams. Most engineers learning to code have never carried this.
- **Enterprise data/security intuition.** Working inside Salesforce and DOD
  constraints has given you real instincts about data governance, access
  control, and integration boundaries — this transfers directly.

## Where you need improvement (rust, not gaps)

- **Modern JavaScript/TypeScript.** ES6+, async patterns, a modern framework
  (React is the default choice for FDE-style rapid UI work).
- **Python, current tooling.** Virtual environments/`uv` or `poetry`,
  type hints, a modern web framework (FastAPI over Django for FDE-style
  fast, API-first builds).
- **Git fluency.** Branching, rebasing, resolving conflicts, PR workflow —
  worth a direct honest check since low-code tools often hide this.
- **SQL beyond a platform's abstraction layer.** Writing and reasoning about
  queries directly, not through a data-source builder.

## What's a true gap — learn from the basics

- **Data engineering.** Ingesting messy, real-world (non-Salesforce-shaped)
  data; ETL/ELT patterns; schema design for a domain that doesn't already
  have Salesforce's object model imposed on it.
- **Systems design from a blank canvas.** Architecting a full-stack app's
  layers (frontend, API, data store, auth) yourself, including the tradeoffs
  a low-code platform normally makes for you.
- **Engineering rigor as a practice.** Automated tests, CI/CD, containerized
  deploys, basic cloud hosting (AWS/GCP/Azure) — these are rarely required
  inside a low-code platform and are core to FDE credibility.
- **Security fundamentals for code you write**, as opposed to configuring a
  platform's built-in security model (auth flows, secrets handling, input
  validation, least-privilege API design).
- **Modern AI/LLM application building** — prompting, tool use/agents, RAG
  basics. Not traditionally "FDE," but increasingly load-bearing at the
  companies hiring for this role today.

## Active practice: symbol_constellation

A separate personal project (extracting/structuring data from historical
texts into a graph database, with report UI and audit tooling) is
currently the live vehicle for pillar 9 and parts of 5–7. Concrete, dated
evidence from this project belongs in `PROGRESS_LOG.md` as it accumulates.
First entry: 2026-08-16, see log for specifics (trust-calibration patterns
with AI-generated code, git-discipline recovery across parallel sessions,
triage discipline for deferred work).

## Bottom line

The client-facing and ownership pillars — usually the bottleneck for people
trying to break into FDE roles — are already there. The gap is concentrated
and known: hands-on, hand-written software engineering outside a low-code
platform's guardrails. That's a tractable, well-scoped relearning project,
not a career pivot from zero. See `LEARNING_ROADMAP.md` for the plan.
