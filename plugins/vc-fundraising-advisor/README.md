# vc-fundraising-advisor

Advises founders through a pre-seed/seed raise. It gives blunt, partner-grade pitch-deck teardowns, pre-call investor research, outreach copy that does not sound like AI, and runnable playbooks for building an investor list and a founder content engine.

The plugin starts every session from a short `raise-brief.md` in your project root, so each command works from your actual raise instead of a blank page.

## Skills

- **pre-seed-deck-teardown** — Reads your deck the way a partner would: the missing slide, the weakest slide and metric, the 10 hardest questions each claim will draw with honest answers, and the data-room documents to back them.
- **investor-research** — Produces a pre-call brief on a fund and the partner: their real thesis, the stage and check they actually write, relevant recent investments, the partner's track record, and the two questions they will likely lead with. Uses built-in WebSearch/WebFetch.
- **outreach-writer** — Writes a custom email, LinkedIn DM, and phone opener from one investor's details, each referencing one real, specific thing. You approve every message before it sends.
- **investor-list-builder** (generator) — Generates a runnable playbook (thesis.md, agent prompts, scoring rubric, CLAUDE.md) for building and scoring your target list, for you to run with your own tooling.
- **founder-content-engine** (generator) — Generates a content config (streams.md, voice.md, cadence.md) plus a scheduler prompt for posting during the raise, for you to run with your own tooling.

## Commands

- `/teardown-deck` — Full deck teardown on an attached or pasted deck.
- `/research-investor` — Pre-call fund + partner brief.
- `/draft-outreach` — Email, LinkedIn DM, and phone opener for one investor.
- `/raise-brief` — Interview you and write/update `raise-brief.md` (the file auto-loaded each session).
- `/weekly-report` — Weekly raise report: who is in each stage, who moved, who went cold, the next 3 priorities.
- `/build-investor-list` — Generate the runnable investor-list-building playbook.
- `/content-engine-setup` — Generate the founder content engine config and scheduler prompt.

## Auto-loaded raise brief

A `SessionStart` hook runs `hooks/load-raise-brief.mjs`, which looks for `raise-brief.md` in your project root and loads it into context at the start of every session. If the file does not exist, the hook does nothing. Create or update the brief any time with `/raise-brief`.

## A note on tooling

This plugin uses no MCP servers or external connectors. The `investor-research` skill reaches the web through Claude Code's built-in WebSearch and WebFetch only. The two generator skills (`investor-list-builder` and `founder-content-engine`) emit runnable playbooks and configs — they do not scrape, enrich, send, or schedule anything themselves. You run the generated output with your own tooling, and you approve every outbound message.
