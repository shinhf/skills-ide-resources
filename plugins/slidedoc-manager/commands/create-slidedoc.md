---
description: Create a new Slidedoc outline and page content from a topic or brief
argument-hint: [topic or brief description]
allowed-tools: Read, Write, Grep, Glob
---

Create a Slidedoc from `$ARGUMENTS` or from user-provided notes/files.

Use the `slidedoc-expertise` skill and follow its shared page contract.

First:
- Identify audience, decision context, and expected reading scenario.
- If key inputs are missing, ask concise clarifying questions before drafting.

Then generate:
- Cover page
- Table of contents
- Executive summary
- Main sections
- Recommendations
- Optional appendix

For each page, output:
- `## Page N: [Conclusion Headline]`
- `Layout: Standard|Impact|Section`
- `Objective: ...`
- `Body: ...`
- `Visuals: ...`
- `Accessibility: ...`

Quality gates:
- One primary idea per page
- Action-oriented/conclusion headline
- Reader-sufficient prose (not presenter-dependent)
- Content-heavy pages near 150-200 words when appropriate
