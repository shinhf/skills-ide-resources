---
description: Propose high-impact improvements for a Slidedoc by page
argument-hint: [file path or paste content]
allowed-tools: Read, Write, Grep, Glob
---

Analyze the provided Slidedoc and propose targeted improvements without applying edits automatically.

Use the `slidedoc-expertise` skill plus:
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/05-writing-slidedocs.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/03-five-design-principles.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/11-accessibility.md`

For each page provide:
- Headline assessment (topic vs conclusion framing)
- Suggested rewritten headline
- Density check (under/over target and why)
- Signal-vs-noise edit suggestions
- Recommended layout type (Standard|Impact|Section)
- Visual integration upgrades
- Accessibility upgrades

Also provide:
- Top 5 highest-impact changes
- Before/after snippets for critical pages
- A suggested approval set suitable for `/apply-slidedoc-fixes`
