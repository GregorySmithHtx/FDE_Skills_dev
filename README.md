# FDE Skills Dev

A living tracker for developing the skills needed for a Forward Deployed
Engineer (FDE) role — assessed against Greg's actual background, not a
generic checklist.

- **`SKILLS_ASSESSMENT.md`** — what you already have, what's rusty, what's
  a true gap.
- **`LEARNING_ROADMAP.md`** — a phased plan from fundamentals to an
  FDE-style capstone project.
- **`PROGRESS_LOG.md`** — dated notes on what actually happened.

This repo is meant to be updated as you go, not written once and forgotten.
It's a **private working log first** — raw, for you. Once there's real
accumulated evidence (not day one), a separate public-facing summary can be
distilled from it for FDE applications; this repo itself stays private and
unpolished by design.

## Keeping this connected to your other Claude Code projects

Claude Code loads a `CLAUDE.md` from whatever repo a session is running in,
but that's per-project — it won't automatically follow you into unrelated
projects. To get FDE-aware feedback across *any* project on your machine,
install the mentor skill at the **user level** so it loads everywhere:

```bash
mkdir -p ~/.claude/skills
cp -r claude-skill/fde-mentor ~/.claude/skills/fde-mentor
```

Once it's there, any Claude Code session on your machine can pick it up and
will occasionally connect what you're building back to this roadmap —
lightly, not on every turn. It reads its context from this repo when
available, so keeping this repo up to date keeps the feedback accurate.

To stop, just tell Claude directly ("stop tracking FDE skills," or "I landed
the role") — or delete `~/.claude/skills/fde-mentor` to remove it
everywhere at once.
