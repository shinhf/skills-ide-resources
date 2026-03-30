---
description: Convert deck, document, notes, or slide artifacts into Slidedoc format
argument-hint: [source file path or content]
allowed-tools: Read, Write, Grep, Glob
---

Convert source material into a Slidedoc using the `slidedoc-expertise` skill.

Load:
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/02-when-to-use-slidedocs.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/10-delivering-slidedocs.md`

Determine source type first:
- `.pptx` deck
- Markdown/document text
- Slide screenshots/images
- Meeting notes/raw text

Use layered ingestion paths:
1. Path A (preferred): If MCP/integration for `.pptx` extraction is available, extract slide titles, body text, notes, and visual cues.
2. Path B (fallback): Use converted artifacts (markdown/text/images) and reconstruct page intent.
3. Path C (manual fallback): Ask user for exports/screenshots when direct parsing is unavailable.

Then:
- Rebuild as read-first Slidedoc pages using the shared page contract.
- Convert presenter-dependent statements into self-contained prose.
- Add document navigation (ToC, page numbering, section dividers).
- Flag assumptions made due to missing source context.

Return:
- Converted Slidedoc pages
- Assumptions and unresolved ambiguities
- Suggested follow-up review with `/review-slidedoc`
