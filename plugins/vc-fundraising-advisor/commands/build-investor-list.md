---
description: Generate a runnable investor-list-building playbook (thesis.md, agent prompts, CLAUDE.md) for the founder to run themselves
argument-hint: [optional: raise details / target stage and sector]
allowed-tools: Read, Write, Glob
---

Generate a runnable investor-list-building playbook using the `investor-list-builder` skill.

Load and apply:
- `${CLAUDE_PLUGIN_ROOT}/skills/investor-list-builder/SKILL.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/investor-list-builder/references/pipeline-playbook.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/investor-list-builder/references/scoring-rubric.md`

Context:
- If `raise-brief.md` exists in the project root, read it first so the generated thesis and scoring rubric match the founder's stage, sector, and check size.

Important: this command GENERATES the playbook for the founder to run with their own tooling. It does NOT execute any scraping, enrichment, or outreach, and this plugin ships with no connectors or MCP servers.

Generate, into a folder the founder names (default: `investor-list/`):
1. **thesis.md** — the founder's raise expressed as concrete search and filter criteria (stage, sector, geography, roles, recency).
2. **Agent prompts** — the discover, filter-and-score, and warm-path prompts the founder runs against their own data sources and tooling.
3. **scoring-rubric.md** — the 0-100 fit rubric, derived from the reference rubric and tuned to this raise.
4. **CLAUDE.md** — instructions that tie the playbook together so the founder can run it in their own session.

If key inputs (stage, sector, geography) are missing, ask before generating.
