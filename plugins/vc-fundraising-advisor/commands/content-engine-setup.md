---
description: Generate a runnable founder-content config (streams.md, voice.md, cadence.md) plus a scheduler prompt for the founder to run themselves
argument-hint: [optional: topics, voice notes, posting cadence]
allowed-tools: Read, Write, Glob
---

Generate a runnable founder content engine using the `founder-content-engine` skill.

Load and apply:
- `${CLAUDE_PLUGIN_ROOT}/skills/founder-content-engine/SKILL.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/founder-content-engine/references/engine-config.md`

Context:
- If `raise-brief.md` exists in the project root, read it first so the content streams and voice align with the founder's stage, sector, and tone rules.

Important: this command GENERATES the config and scheduler prompt for the founder to run with their own tooling. It does NOT publish, post, or schedule anything, and this plugin ships with no connectors or MCP servers.

Generate, into a folder the founder names (default: `content-engine/`):
1. **streams.md** — the recurring content streams (topics, angles, formats) the founder will post against.
2. **voice.md** — the founder's voice: tone, phrasing, what to avoid, examples to imitate.
3. **cadence.md** — the posting cadence per channel and the weekly rhythm.
4. **A scheduler prompt** — the prompt the founder runs on their own schedule to draft the next batch of posts from streams.md and voice.md.

If voice samples, topics, or cadence are missing, ask before generating.
