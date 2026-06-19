---
description: Produce a pre-call brief on a fund and the partner you are meeting
argument-hint: [fund name and/or partner name]
allowed-tools: WebSearch, WebFetch, Read
---

Produce a pre-call investor brief using the `investor-research` skill.

Load and apply:
- `${CLAUDE_PLUGIN_ROOT}/skills/investor-research/SKILL.md`

Context:
- If `raise-brief.md` exists in the project root, read it first so the brief is framed around the founder's company and the questions it will draw.

Research with built-in `WebSearch` and `WebFetch` only (this plugin uses no external connectors or MCP servers).

If the fund or partner is missing:
- Ask which fund the founder is meeting and, if known, the specific partner on the call.

Return a brief that covers:
1. The fund's stated thesis.
2. The stage and check size they actually write (not just what they claim).
3. Their most relevant recent investments.
4. The partner on the call and what they have personally backed.
5. The two questions they are most likely to lead with, given the founder's company.

Cite the sources used for each non-obvious claim.
