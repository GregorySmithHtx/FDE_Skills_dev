# FDE Skills Assessment — Greg Smith

Last updated: 2026-08-16

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
| 4 | Full-stack software engineering (hand-written, no low-code scaffold) | **Weak / rusty** | JS + Python/Django are ~10 years stale; day-to-day work is low-code, so coding reps are low |
| 5 | Data engineering & integration (ETL, APIs, messy real data) | **Partial** | Some exposure via Salesforce integrations; not deep pipeline/ETL/data-wrangling work |
| 6 | Systems & architecture design for arbitrary domains | **Partial** | Architects within a bounded low-code platform; hasn't designed a system from a blank canvas recently |
| 7 | Engineering rigor (git, testing, CI/CD, security-by-construction) | **Weak / unknown** | Low-code platforms absorb most of this; needs a direct check |
| 8 | Modern AI/LLM application fluency (building with LLMs — RAG, tool use, agents) | **Unknown / opportunity** | Not assessed yet |
| 9 | AI-assisted engineering judgment — catching wrong AI output, architecture-under-uncertainty, tool/process skepticism | **Early / in active practice** | `symbol_constellation` project (see below) is generating real, non-hypothetical reps of this |

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
