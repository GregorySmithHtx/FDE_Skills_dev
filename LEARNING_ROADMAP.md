# FDE Learning Roadmap

Companion to `SKILLS_ASSESSMENT.md`. Phased, from fundamentals up to an
FDE-style capstone. Paces are suggestions, not deadlines — adjust freely.
Check items off as you go; `PROGRESS_LOG.md` is for dated notes on what you
actually did and learned, not just checkbox status.

## Phase 0 — Fundamentals refresh (2–3 weeks)

Goal: get the rust off before building anything real.

- [x] Git: branching, rebase vs. merge, resolving a real conflict, PR workflow
- [x] Command line fluency: shell basics, piping, editing files without an IDE
- [ ] Modern JS/TypeScript: `let`/`const`, arrow functions, destructuring,
      promises/async-await, modules, then TypeScript's type system
- [ ] Python refresh: virtual envs (`uv` or `venv`), type hints, f-strings,
      packaging basics
- [x] SQL: joins, aggregates, indexes, writing queries directly against a
      real Postgres database (not through a platform data-source builder)

## Phase 1 — Full-stack rebuild (4–6 weeks)

Goal: build one real full-stack app by hand, deployed.

- [ ] React + TypeScript frontend
- [ ] Python FastAPI backend (or Node/Express if you'd rather stay in one
      language) with a real REST API
- [ ] Postgres for storage, with a schema you designed yourself
- [ ] Basic auth (JWT or session-based) implemented by hand at least once
- [ ] Deploy it somewhere real (Render/Fly.io/AWS) — not just running locally

## Phase 2 — Data engineering & modeling (3–4 weeks)

Goal: work with data that isn't already shaped like a Salesforce object.

- [ ] Ingest a messy public dataset (CSV/JSON/API) with missing/inconsistent
      fields
- [ ] Build a small ETL/ELT pipeline: extract → clean/transform → load
- [ ] Design a schema/data model for a domain from scratch, with no
      platform imposing structure on you
- [ ] Integrate with at least one external API with real auth (OAuth2)

## Phase 3 — Engineering rigor (2–3 weeks)

Goal: the practices that separate a demo from something a client would trust
in production.

- [ ] Automated tests (unit + at least one integration test) for the Phase 1
      app
- [ ] CI pipeline (GitHub Actions) that runs tests on every push
- [ ] Docker: containerize the app
- [ ] Security basics: input validation, secrets management, least-privilege
      API design — applied to your own code, not a platform's settings panel

## Phase 4 — AI/LLM application basics (2–3 weeks, optional but recommended)

Goal: fluency with the tooling increasingly expected of FDE-adjacent roles
in 2026.

- [ ] Build something with the Claude API directly (not just chat UI usage)
- [ ] Basic RAG: embeddings + retrieval over a small document set
- [ ] Tool use / a simple agent loop

## Phase 5 — FDE simulation capstone (ongoing)

Goal: practice the actual job, not just the skills.

- [ ] Pick a fictional "client" scenario with a messy, real-world problem
- [ ] Build a production-quality solution end-to-end under a real time box
      (a week, not a month)
- [ ] Practice explaining your architecture and tradeoffs out loud, as if
      presenting to a client — this is the pillar you already have; use it
      to pressure-test the pillars you're building

## How this stays current

This roadmap and the assessment it's based on are meant to evolve as you
learn. Update `SKILLS_ASSESSMENT.md`'s pillar table and this file's
checkboxes as things change, and log what actually happened in
`PROGRESS_LOG.md`. See `README.md` for how to keep this connected to your
other Claude Code projects.
