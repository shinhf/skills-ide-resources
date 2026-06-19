---
name: Investor List Builder
description: This skill should be used when the user asks to "build an investor list", set up an "investor list pipeline", "set up investor scraping", or wants "thesis-fit scoring setup" for a fundraise. It generates a runnable project scaffold, agent prompts, and a CLAUDE.md for a build to enrich to qualify investor pipeline the founder runs in their own environment.
version: 0.1.0
tools: Read, Write, Glob
---

# Investor List Builder

Use this skill to GENERATE the project scaffold, prompts, and configuration for an investor-list pipeline that a founder runs themselves. This skill is a generator, not an executor.

## What this skill does and does not do

This skill **does not** scrape anyone, call any API, run any actor, or hit any service. It writes files. The output is a complete, runnable project the founder opens in their own Claude Code workspace and executes with their own tooling and credentials.

When triggered, produce:

- A project folder scaffold (folders + placeholder files).
- A `thesis.md` template the founder fills with inputs and company context.
- One single-purpose agent prompt per pipeline job.
- A `CLAUDE.md` that drives the ordered build to enrich to qualify run.
- An empty `outputs/` target and a `scripts/` slot for the merge/score step.

The founder supplies the data layer. Sourcing and enrichment tooling (for example an Apify-style scraper chain, a Clay-style enrichment waterfall, SEC Form D, Crunchbase) are **options the founder brings**, not bundled dependencies of this skill. This plugin ships no MCP servers and no connectors. Reference them only as "your own tooling" the founder may already have.

## The three-layer architecture

The pipeline is three layers, each cheaper per row but running on fewer rows, so the founder never pays to process rows that already failed an earlier gate.

1. **Source.** Pull raw investor-*person* records that match the inputs. The person, not the fund, is the unit.
2. **Enrich.** Add contact data, fund context, and investment history to the survivors of layer 1.
3. **Qualify.** Hand the enriched rows to Claude to dedup, verify roles, filter by recency, and score against the thesis.

Layer 1 and layer 2 run in the founder's own tooling. Layer 3 is the Claude Code project this skill scaffolds.

## The five inputs

Every run is defined up front by five inputs. The more specific they are, the cleaner and cheaper everything downstream gets. Capture them in `thesis.md`.

1. **Investment region.** For example Europe, US East Coast, MENA, Global. Used to filter at the source and to weight thesis match.
2. **Stage.** Pre-seed, Seed, Series A, Series B. One or two at most; broader than that produces noise.
3. **Investor type.** Angels only, VCs only, or both. (Family offices, LPs, real estate/infra capital, and strategics are distinct pools with their own chains and are out of scope for the default build.)
4. **Role filter.** Investor-only roles such as Partner, General Partner, Principal, Venture Partner, Investor, Angel. This kills the "coaches, agents, and LinkedIn gurus with Investor in their bio" problem before it starts.
5. **Fields to enrich.** For example LinkedIn URL, work email, fund URL, last 3 portfolio companies, last investment date, check size range. Pick only what is needed.

The project does NOT, by design: import existing LinkedIn connections, treat an uploaded spreadsheet as source of truth, trust fund websites, or scrape anyone without a verifiable current investor role. The founder describes the list they want; the pipeline builds it.

## Project folder layout

Scaffold the project (default name `investor-list`) with this layout:

```
/investor-list
├── CLAUDE.md                 # the ordered analyst instructions
├── thesis.md                 # the five inputs + company description, stage, check size, differentiators
├── inputs/                   # raw rows from the founder's own source + enrich tooling
│   ├── source_raw.csv
│   ├── recency_raw.csv
│   └── enrichment_raw.csv
├── agents/
│   ├── dedup.md              # dedup + GP-to-fund resolver
│   ├── role_verify.md        # kills fake "investors"
│   ├── recency.md            # drops rows with no recent priced-round activity
│   ├── thesis_match.md       # scores fit against thesis.md
│   └── outreach_writer.md    # personalized first-touch copy per investor
├── outputs/
│   └── qualified_list.csv
└── scripts/
    └── merge_and_score.py    # optional helper the founder supplies/fills
```

One job per agent is not a style preference. It is what makes the pipeline debuggable when something goes wrong at row 2,847.

## Generation workflow

1. Collect or confirm the five inputs and the company context. If the user has not supplied them, write the templates with clearly marked placeholders.
2. Create the folder layout above. Do not overwrite existing files without confirming.
3. Write `thesis.md` with the five inputs plus a one-paragraph company description, stage, check-size target, geography, and differentiators.
4. Write `CLAUDE.md` and the five agent prompts by adapting the templates in the pipeline playbook reference.
5. Write the scoring rubric expectations into `thesis_match.md` from the scoring rubric reference.
6. Leave `inputs/` with placeholder CSVs and a short note telling the founder where their own source/enrich tooling should write.
7. Print a short summary of what was generated and the exact run order the founder follows.

## References

Load these for the runnable detail when generating files:

- `${CLAUDE_PLUGIN_ROOT}/skills/investor-list-builder/references/pipeline-playbook.md` — the CLAUDE.md template, per-agent prompt specs, dedup/GP-resolution logic, and output CSV columns.
- `${CLAUDE_PLUGIN_ROOT}/skills/investor-list-builder/references/scoring-rubric.md` — the 1 to 10 thesis-fit rubric and tiers.

Load a reference only when the active step needs it rather than loading both by default.
