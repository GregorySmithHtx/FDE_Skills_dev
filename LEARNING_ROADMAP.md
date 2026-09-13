# FDE Learning Roadmap

Companion to `SKILLS_ASSESSMENT.md`. Phased, from fundamentals up to an
FDE-style capstone. Paces are suggestions, not deadlines — adjust freely.
Check items off as you go; `PROGRESS_LOG.md` is for dated notes on what you
actually did and learned, not just checkbox status.

## Phase 0 — Fundamentals refresh (2–3 weeks)

Goal: get the rust off before building anything real.

- [x] Git: branching, rebase vs. merge, resolving a real conflict, PR workflow
- [x] Command line fluency: shell basics, piping, editing files without an IDE
- [x] Modern JS/TypeScript: `let`/`const`, arrow functions, destructuring,
      promises/async-await, modules, then TypeScript's type system
- [x] Python refresh: virtual envs (`uv` or `venv`), type hints, f-strings,
      packaging basics
- [x] SQL: joins, aggregates, indexes, writing queries directly against a
      real Postgres database (not through a platform data-source builder)

## Phase 1 — Full-stack rebuild (4–6 weeks)

Goal: build one real full-stack app by hand, deployed.

- [x] React + TypeScript frontend
- [x] Python FastAPI backend (or Node/Express if you'd rather stay in one
      language) with a real REST API
- [x] Postgres for storage, with a schema you designed yourself
- [x] Basic auth (JWT or session-based) implemented by hand at least once
- [x] Deploy it somewhere real (Render/Fly.io/AWS) — not just running locally

## Phase 2 — Data engineering & modeling (3–4 weeks)

Goal: work with data that isn't already shaped like a Salesforce object.

- [x] Ingest a messy public dataset (CSV/JSON/API) with missing/inconsistent
      fields
- [x] Build a small ETL/ELT pipeline: extract → clean/transform → load
- [x] Design a schema/data model for a domain from scratch, with no
      platform imposing structure on you
- [ ] Integrate with at least one external API with real auth (OAuth2)
      — **carried forward to `ROADMAP_2.md` (2026-09-13).** Deliberately not
      forced: theutus integrates Wikidata/FactGrid, but those need no auth at
      all, and inventing an OAuth2 requirement to tick a box would teach
      nothing. Do it when a real integration wants it.

## Phase 3 — Engineering rigor (2–3 weeks)

Goal: the practices that separate a demo from something a client would trust
in production.

- [ ] Automated tests (unit + at least one integration test) for the Phase 1
      app
- [ ] CI pipeline (GitHub Actions) that runs tests on every push
- [x] Docker: containerize the app
- [ ] Security basics: input validation, secrets management, least-privilege
      API design — applied to your own code, not a platform's settings panel

## Phase 4 — AI/LLM application basics (2–3 weeks, optional but recommended)

**Superseded 2026-09-13 — folded into `ROADMAP_2.md`.** Not skipped: doing
these as standalone exercises would be strictly worse than doing them in
`symbol_constellation`, which already *is* an LLM application (extraction
pipeline, prompt authorship, agent definitions) and has a 96-source document
backlog on `/mnt/data/Books` waiting to be a real RAG target.

Goal: fluency with the tooling increasingly expected of FDE-adjacent roles
in 2026.

- [ ] Build something with the Claude API directly (not just chat UI usage)
- [ ] Basic RAG: embeddings + retrieval over a small document set
- [ ] Tool use / a simple agent loop

## Phase 5 — FDE simulation capstone (ongoing)

**Superseded 2026-09-13 — folded into `ROADMAP_2.md`.** `symbol_constellation`
is already a capstone-shaped project (messy real-world sources, a domain no
platform structures for you, a real user). What it lacks is the time box and
the out-loud architecture defence — both carried forward rather than
restarted as fiction.

Goal: practice the actual job, not just the skills.

- [ ] Pick a fictional "client" scenario with a messy, real-world problem
- [ ] Build a production-quality solution end-to-end under a real time box
      (a week, not a month)
- [ ] Practice explaining your architecture and tradeoffs out loud, as if
      presenting to a client — this is the pillar you already have; use it
      to pressure-test the pillars you're building

## Status — closed out 2026-09-13

Phases 0 and 1 complete. Phase 2 is 3 of 4 (the OAuth2 item carried forward).
Phase 3 is 1 of 4 — **tests, CI and input validation are the live closeout
work**, to be done on theutus, which is finished and deployed and therefore
an ideal test subject. Phases 4 and 5 fold into `ROADMAP_2.md`.

Elapsed: 2026-08-16 to 2026-09-13, four weeks, against a 6–9 week estimate
for Phases 0–1 alone.

The honest lesson this roadmap taught, and the reason `ROADMAP_2.md` is
shaped differently: **checking a box is not the same as moving a pillar.**
Phase 1 finished with all five items ticked while pillar 4 stayed "weak /
rusty," because the boxes measure whether the app has a feature, not who
wrote it.

## How this stays current

This roadmap and the assessment it's based on are meant to evolve as you
learn. Update `SKILLS_ASSESSMENT.md`'s pillar table and this file's
checkboxes as things change, and log what actually happened in
`PROGRESS_LOG.md`. See `README.md` for how to keep this connected to your
other Claude Code projects.
