---
description: Generate sprint metrics report from user-provided sprint data
argument-hint: "[sprint-number] [data-source-description]"
allowed-tools: Read, Write, Grep, Glob
---

Generate a Sprint Report for Sprint $1.

Use the **scrum-metrics** skill for metric definitions, calculation methods, and report templates. Reference `${CLAUDE_PLUGIN_ROOT}/skills/scrum-metrics/references/metrics-guide.md` for detailed calculation walkthroughs and advanced reporting templates.

## Data Input

The user's data source context: $2

If the user has not specified where the Sprint data is, ask them to provide:

**Minimum required data:**
- List of planned items for this Sprint (with story points or size)
- Status of each item (Done, Not Done, Carried Over)
- Sprint start and end dates

**Optional data for richer reporting:**
- Historical velocity from previous Sprints
- Item-level start and completion dates (for cycle time)
- Sprint Goal statement
- Retrospective action items
- Team size and any capacity notes

Do not assume any specific tool. Work only with data the user provides. If key data is missing, calculate what is possible and note which metrics could not be computed.

## Report Generation Workflow

1. **Parse Sprint data:**
   - Extract items, their sizes, and statuses from the user-provided data.
   - Categorize items: Completed, Carried Over, Descoped.
   - Calculate totals for each category.

2. **Calculate metrics:**
   - **Velocity:** Sum of story points for completed items.
   - **Throughput:** Count of completed items.
   - **Carry-over rate:** (Carried-over items / Planned items) × 100%.
   - **Sprint Goal status:** Achieved / Partially Achieved / Not Achieved (based on user input).
   - **Cycle time** (if start/completion dates provided): Average and 85th percentile.
   - **Velocity trend** (if historical data provided): Compare against 3-5 Sprint average.

3. **Analyze and interpret:**
   - Compare current Sprint metrics to historical averages (if available).
   - Identify trends: improving, declining, or stable.
   - Flag warning signals:
     - Carry-over rate > 20%
     - Velocity drop > 20% from average
     - Sprint Goal not achieved
   - Identify potential root causes for anomalies.

4. **Generate the report:**

Use this structure:

```
# Sprint [Number] Report

## Sprint Overview
- **Sprint Goal:** [Goal statement]
- **Goal Status:** [Achieved / Partially / Not Achieved]
- **Duration:** [Start date] to [End date]
- **Team Size:** [N] Developers

## Key Metrics
| Metric | This Sprint | Previous | 3-Sprint Avg | Trend |
|--------|-------------|----------|-------------|-------|
| Velocity | [X] pts | [Y] pts | [Z] pts | [↑/↓/→] |
| Throughput | [X] items | [Y] items | [Z] items | [↑/↓/→] |
| Carry-over | [X]% | [Y]% | [Z]% | [↑/↓/→] |
| Cycle time (avg) | [X] days | [Y] days | [Z] days | [↑/↓/→] |

## Completed Items
| Item | Points | Cycle Time |
|------|--------|------------|
[Rows for each completed item]

**Total completed:** [X] items, [Y] points

## Carried Over
| Item | Points | Reason |
|------|--------|--------|
[Rows for carried-over items]

## Observations
- [Key insight 1]
- [Key insight 2]
- [Key insight 3]

## Recommendations
- [Actionable recommendation based on data]

## Forecast (if historical data available)
Based on [N]-Sprint average velocity of [X] points:
- Remaining backlog: [Y] points
- Estimated Sprints to completion: [Z]
```

5. **Save the report:**
   - Ask the user where to save the Sprint Report document.
   - Suggest a filename: `sprint-[number]-report.md`.

## Quality Checks

Before finalizing:
- All calculable metrics are included
- Metrics that could not be calculated are noted with the missing input
- Interpretations are backed by data, not assumptions
- Recommendations are specific and actionable
- Historical comparisons use at least 3 Sprints of data when available
