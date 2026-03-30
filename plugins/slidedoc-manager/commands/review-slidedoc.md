---
description: Review a Slidedoc and return severity-ranked findings with a /25 score
argument-hint: [file path or paste content]
allowed-tools: Read, Grep, Glob
---

Review the provided Slidedoc content using the `slidedoc-expertise` skill.

Load and apply:
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/07-review-checklist.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/04-glance-test.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/11-accessibility.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/slidedoc-expertise/references/12-anti-patterns.md`

If input is missing:
- Ask for a file path, pasted content, or slide screenshots.

Perform review in this order:
1. Glance Test at page level.
2. Page-level quality (message, hierarchy, density, visual integration).
3. Document-level quality (structure, flow, audience fit, navigation).
4. Accessibility baseline checks.
5. Anti-pattern detection.

Scoring:
- Contrast (1-5)
- Whitespace (1-5)
- Hierarchy (1-5)
- Unity (1-5)
- Flow (1-5)
- Total /25

Output format:
- Overall score and verdict
- Findings ordered by severity: Critical, Major, Minor, Suggestion
- Page-by-page findings
- Top prioritized remediation actions
