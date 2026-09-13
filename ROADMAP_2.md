# Roadmap 2 — hybrid: real project, deliberate skills

Successor to `LEARNING_ROADMAP.md`, which closed out 2026-09-13 with Phases
0 and 1 complete. Horizon: **2026-09-13 → mid-December 2026**, roughly three
months.

Companion to `SKILLS_ASSESSMENT.md`. Log what actually happens in
`PROGRESS_LOG.md`, same as before.

---

## What's different, and why

Roadmap 1 was a curriculum: a list of things to build, in order. It worked —
four weeks against a 6–9 week estimate. But it ended with **all five Phase 1
boxes ticked and pillar 4 still "weak / rusty,"** because the boxes asked
*does the app have auth* and never asked *who wrote it*.

So this roadmap inverts the unit of progress. **Items are evidence, not
tasks.** Each pillar states what would actually justify calling it Strong,
in terms specific enough to be wrong about. Building something is how you
generate the evidence; it is not itself the evidence.

Two consequences worth stating plainly:

- **Work Claude writes does not move pillars 4 or 7.** It can move 2, 6 and
  9 — deciding, architecting, and catching bad output are real skills, and
  they are three of your strongest. But "I directed a good implementation"
  is not "I can build this," and conflating them is exactly how roadmap 1
  ended up overstating things.
- **The real project is the point half the time.** `symbol_constellation`
  has been paused since 2026-09-02 and has a genuine backlog. This roadmap
  is built so that getting back to it *is* the plan, not a distraction from
  it.

---

## The cadence: alternating

Sessions are one of two kinds, named at the start:

**Project sessions** — `symbol_constellation` (or theutus) work, done however
is most effective. Delegate freely. The goal is the graph, not the rep.
Pillar 9 accrues here whether you aim at it or not.

**Skill sessions** — a named pillar target, and **you write the code**.
Claude reviews, explains, and unblocks; it does not implement. Slower by
design. If a skill session turns into Claude writing the thing, it was a
project session — relabel it honestly in the log rather than claiming the
rep.

Roughly alternate. Don't enforce a ratio — enforce the *labelling*, because
the failure mode is skill sessions quietly becoming project sessions, and
that is only visible if the log says which was intended.

---

## Stage 0 — close out roadmap 1 (do this first, ~3 sessions)

Phase 3's remaining items, done **on theutus**, which is finished, deployed,
and not moving — which is exactly what makes it a good test subject. All
three are skill sessions.

- [ ] **Pydantic request models** on the write endpoints. They currently take
      `body: dict` and validate nothing. Closes the input-validation third of
      Phase 3's "security basics" (secrets management and least-privilege
      were done 2026-09-13).
- [ ] **pytest suite**: unit tests for `security.py` (hash/verify, token
      round-trip, expiry, tampering) and integration tests hitting the API
      with `TestClient` against a throwaway database. The auth smoke tests
      Claude ran ad hoc on 2026-09-13 are the shape — make them permanent
      and yours.
- [ ] **GitHub Actions**: run the suite on every push. Was considered on
      09-13 purely to dodge a $23/mo server, then dropped when EU pricing
      made it unnecessary — do it now for the actual reason.

When these land, roadmap 1 is closed with two items consciously carried:
Phase 2's OAuth2 (no real integration wants it yet) and Phases 4–5 (folded
in below).

---

## Pillar 7 — Engineering rigor: **Weak/unknown → Strong**

The biggest gap, and the one that most separates "I built a demo" from
"I'd put this in front of a client." `symbol_constellation` has 171 commits
since August and no test suite at all.

**What would make this Strong:**

- [ ] A test suite you wrote, running in CI, on **both** repos.
- [ ] At least one test that **caught a real regression before you shipped
      it** — logged in `PROGRESS_LOG.md` with what it caught. This is the
      item that actually proves the pillar; the rest is scaffolding.
- [ ] Tests over the data-quality tooling (`paren_triage.py`,
      `find_person_duplicates.py`, the evidence scripts). These are
      pure-function-shaped and the easiest place to start.
- [ ] A documented restore drill on symbol_constellation's backups, matching
      the one done for theutus on 2026-09-13. `cleanup_backups.py` keeps 30
      snapshots that have never been restored from.
- [ ] Secrets and least-privilege reviewed across both repos, not just the
      one deployed on 09-13.

**Explicitly not required:** coverage percentages. A coverage number is not
evidence of judgment about what's worth testing.

---

## Pillar 4 — Full-stack, hand-written: **Weak/rusty → Strong**

This needs *volume*, and the calibration from `feedback_new_tool_vs_blank_page`
says how to get it: extend something that already runs, in a language you
know. Not blank files, not new frameworks.

**What would make this Strong:**

- [ ] **Ten sessions** where you wrote the substantive code and Claude only
      reviewed. Count them in the log. Ten is arbitrary but it is a real
      number, and roadmap 1 produced roughly four in a month.
- [ ] One non-trivial feature in `symbol_constellation` built end to end by
      you — schema change, tooling, and report UI.
- [ ] One instance of you reading unfamiliar code in this repo and changing
      it correctly **without** asking Claude to explain it first.
- [ ] The theutus `__init__.py` refactor: the FastAPI app living in the
      package `__init__` is a real structural wart that bit twice on
      2026-09-13. ~600 lines to split. Mechanical enough to be safe, large
      enough to be a real rep.

---

## Pillar 8 — AI/LLM application fluency: **Developing → Strong**

Absorbs roadmap 1's Phase 4. You already author prompts and agent
definitions on a working system; what's missing is the **orchestration
code** underneath.

**Local models only — decided 2026-09-13.** The metered API is out: too
expensive, and a bug in an agent loop is unbounded spend with no natural
stop. That objection is strongest precisely for the code this pillar asks
you to write. Everything below runs on what this project already has —
Ollama (`.ollama/`, `./start_ollama.sh`, `qwen2.5:7b-instruct`) and
`sentence-transformers`/`all-MiniLM-L6-v2` in `local_pipeline_venv/`, on a
12 GB RTX 3060.

This is not a downgrade. The orchestration skill — tool definitions, the
dispatch loop, retries, context management — is identical against any
endpoint. And working against a 7B model forces a question the API lets you
buy your way past: **is a weaker model good enough for this step?**
`local_draft.py` already lives that tradeoff. Being able to answer it with
evidence is more FDE-relevant than having called a frontier model.

**What would make this Strong:**

- [ ] **RAG over the 96-source backlog** on `/mnt/data/Books` (46 epubs, 45
      PDFs, mostly pre-1930 and therefore PD). Chunking, embeddings,
      retrieval, and an honest evaluation of whether retrieval actually
      returns the right passage — the evaluation is the part that matters,
      and the embedding stack is already installed.
- [ ] An agent loop you implemented against Ollama: tool definitions, the
      dispatch loop, error handling, and a hard iteration cap. The existing
      agents (Researcher, Synthesist, Glossarist) are prompt-authored; this
      is the layer below them.
- [ ] **A documented capability boundary for `qwen2.5:7b`**: which pipeline
      steps it handles acceptably and which it does not, with examples. You
      have real data for this already — the "per this source" hedging that
      2706 terms picked up from `local_draft.py` is exactly such a finding,
      and it was diagnosed from output, not assumed.
- [ ] A written comparison of where the agent pattern beat a plain script
      and where it didn't.

---

## Pillar 5 — Data engineering: **Partial → resolve the level**

Flagged 2026-09-11 as **contested and still unapplied**: the "Partial"
justification says "not hands-on ETL code-writing by him," but session 25
has you hand-writing a Wikibase API client and sessions 25–27 shipped a
full ETL pipeline.

- [ ] **Re-read the evidence and set the level.** This is a ten-minute task
      that has been open for two days. Either the justification is stale and
      it moves, or it needs a specific missing piece named.
- [ ] If a gap remains, the honest candidate is **ingest you built**: the 96
      sources are messy real-world input (OCR noise, inconsistent structure)
      and would be a real pipeline rep.

---

## Pillar 9 — AI-assisted judgment: **Early → Strong**

Accrues on its own; the discipline is *recording* it. Eight dated reps as
of the last assessment; 2026-09-13 added at least two (refusing a quoted
server price until it was measured, catching a blank page whose only symptom
was a JSON syntax error).

- [ ] Keep logging reps with the specific wrong output and how it was
      caught. The pattern is more valuable than the count.
- [ ] **Reps where you caught it before Claude did** are worth marking
      separately — that distinction is the actual skill.

---

## The project backlog (project sessions draw from here)

Verified state as of 2026-09-13, not memory:

**symbol_constellation** (paused since 09-02 — this roadmap unpauses it)
- 58 extraction jobs sitting at `content_type='unclassified'`, needing
  triage before the queue can do anything with them
- 5 `prose` jobs at `skipped=2` — need a human look at the Queue page
- ~484 short-paren terms still outstanding from the schema remediation plan
- 74-term evidence backfill debt from job94 batches 24–27
- Golden Dawn Vols II–IV: ~223k words, confirmed PD on 09-11, not yet ingested

**theutus**
- ~65 unregistered relation types blocking ~544 legacy relations
- No nav shell; `LogoutButton` exists but is placed nowhere
- Off-box backup copies (dumps currently share a disk with the database)

---

## How a pillar level actually changes

Not by finishing items here. By writing in `PROGRESS_LOG.md` what the
evidence was, then editing `SKILLS_ASSESSMENT.md` — and if you can't state
the evidence in a sentence that could be wrong, the level doesn't move.

The 2026-09-13 session is the worked example of what to avoid: five Phase 1
boxes ticked, and the honest entry had to say that the hands-on writing was
one model and two migrations, and that the rest was pillar 2.

---

## Non-goals

- **No interview deadline.** Stated 2026-09-13. This buys depth over
  velocity; use it.
- **No new side projects.** Two repos is already one more than ideal.
- **Not every roadmap-1 item needs closing.** OAuth2 stays open until
  something real wants it.
- **No metered LLM API.** Stated 2026-09-13: too expensive, and no
  guardrails on a runaway loop. Local models cover every item here. Revisit
  only if something genuinely cannot be done locally — and say what, rather
  than drifting back to it.
- **Not 2am.** Four weeks in, the pace has been ~20 working days out of 28
  with sessions ending past 2am. That pace produced roadmap 1 ahead of
  schedule and is not the constraint worth optimising next. Skill sessions
  in particular are the wrong work to do tired — they are the ones where
  you're supposed to be slow and thinking.
