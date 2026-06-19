---
name: Founder Content Engine
description: This skill should be used when the user asks to "set up my content engine", build a "founder X content engine", set up a "twitter content engine", or "generate my posting config". It generates the config files, scheduler prompt, and project scaffold for a daily founder-content engine the founder runs themselves.
version: 0.1.0
tools: Read, Write, Glob
---

# Founder Content Engine

Use this skill to GENERATE the config files, the scheduler prompt, and the project scaffold for a daily founder-content engine that the founder runs themselves. This skill is a generator, not an executor.

## What this skill does and does not do

This skill **does not** scrape Twitter/X, call the X API, generate images, or post anything. It writes files. The output is a complete, runnable project the founder opens in their own workspace and runs with their own tooling and credentials.

The X API access, any tweet scraper, and any image generator are the **founder's own tooling**, not bundled dependencies. This plugin ships no MCP servers and no connectors. Mention scraping and posting steps only as things the founder wires to tooling they already have.

When triggered, produce:

- A project folder scaffold (folders + placeholder files).
- The three config files the founder fills in: `streams.md`, `voice.md`, `cadence.md`.
- A `CLAUDE.md` daily-draft engine with ordered steps.
- A scheduler prompt the founder drops into their own scheduled task.

## The three-stream model

A founder does not post about one topic. They post about three, in a fixed ratio, every day. One lane is boring, five is chaos; three lets the feed cluster the account while staying interesting enough to follow.

- **Stream 1 — Domain expertise.** What the founder builds and knows; the company's space. **40 to 50%** of daily drafts. This earns credibility.
- **Stream 2 — Audience-shared / adjacent topic.** What the buyers also care about (for a SaaS founder, "building startups"; for a fintech founder, "macro"). **20 to 30%** of daily drafts. This earns breadth.
- **Stream 3 — Personal interest.** A genuine but non-random interest (a sport, productivity, a book). **20 to 30%** of daily drafts. This earns humanity.

Write the split into `streams.md` once. Every daily run respects it. Target volume is roughly 6 to 9 drafts per day.

## Core principles

Three properties make the engine work; if any is missing it fails.

- **Cadence.** In the feed every day at roughly the same times, inspired or not. Consistency beats sporadic brilliance.
- **Voice consistency.** Every draft sounds like the founder, not like the model and not like the average of the inputs. Enforced by feeding the founder's own recent posts back in as reference before each generation, and by a specific `voice.md`.
- **Review gate.** A human approves every draft before anything goes live, at least for the first stretch. The engine drafts; it does not post on its own until the founder explicitly whitelists draft types.

## Human approval gate and kill-switch

- **Approval gate.** For the first period, every draft needs a human tap before posting. Later, the founder can whitelist specific draft types for auto-post while everything else still needs approval. The daily engine this skill scaffolds delivers drafts for review and does **not** post.
- **Kill switch.** A single mechanism (for example a sentinel `kill-switch` file at the project root) that pauses all scheduled posting instantly. Any posting step the founder later wires must check for it before every post and do nothing if present. Build it in before it is needed.

## Project folder layout

Scaffold the project (default name `x-content-engine`) with this layout:

```
/x-content-engine
├── CLAUDE.md
├── config/
│   ├── streams.md              # 3 streams + ratios + topic pools
│   ├── voice.md                # writer identity, voice rules, never-use words, format rules, examples
│   └── cadence.md              # caps, spacing, posting window, no-post days, whitelist/approval
├── inputs/                     # the founder's own scrape output lands here
│   ├── stream1_raw.json
│   ├── stream2_raw.json
│   ├── stream3_raw.json
│   └── own_profile_raw.json    # dedup reference
├── agents/
│   ├── pattern_extractor.md    # extracts hook/format/tone patterns from scraped tweets
│   ├── duplicate_filter.md     # checks drafts against the founder's own recent tweets
│   ├── draft_writer.md         # writes drafts in the founder's voice per stream
│   └── image_brief.md          # decides which drafts need an image and writes the prompt
├── outputs/
│   └── YYYY-MM-DD_drafts.md     # daily deliverable to review
└── scripts/                    # optional helpers the founder supplies/fills
```

One job per agent keeps the engine auditable when a draft comes out wrong on day 83.

## Generation workflow

1. Confirm the three streams, ratios, voice rules, and cadence with the user. If not supplied, write the templates with clearly marked placeholders.
2. Create the folder layout above. Do not overwrite existing files without confirming.
3. Write `config/streams.md`, `config/voice.md`, and `config/cadence.md` from the reference templates.
4. Write `CLAUDE.md` with the ordered daily-draft steps, and the scheduler prompt, from the reference.
5. Leave `inputs/` with placeholder files and a note that the founder's own scrape tooling writes here.
6. Print a short summary of what was generated, plus a reminder that the engine drafts only and posting is the founder's own gated step.

## Reference

Load this for the full config templates and the daily-engine steps when generating files:

- `${CLAUDE_PLUGIN_ROOT}/skills/founder-content-engine/references/engine-config.md`
