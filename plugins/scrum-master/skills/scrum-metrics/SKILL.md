---
name: Scrum Metrics
description: This skill should be used when the user asks about "sprint velocity", "burndown chart", "burnup chart", "cycle time", "scrum metrics", "sprint report", "team velocity", "lead time", "throughput", "sprint burndown", "cumulative flow", "CFD", "WIP limits", "escaped defects", "carry-over rate", "Monte Carlo forecast", "velocity forecast", "sprint goal achievement", "retrospective action completion", "flow metrics", "predictability", "velocity variance", or needs guidance on measuring, interpreting, reporting, or forecasting scrum team performance.
version: 0.1.0
---

# Scrum Metrics

## Overview

Guide the selection, calculation, interpretation, and reporting of scrum metrics. Metrics serve as diagnostic tools for team health and process improvement -- never as performance targets. When asked about metrics, always clarify the user's intent (diagnosis, forecasting, or reporting) and work only from data the user provides.

## Data Input Principle

This skill is tool-independent. All metrics are calculated from data the user provides directly (inline text, pasted tables, markdown files, CSV snippets, issue tracker exports, or referenced local files). Never assume a specific project management tool. If required data is missing, prompt the user for the minimum additional information needed.

## Core Metrics

### Velocity

**What it measures:** Amount of work completed per Sprint, expressed in story points (or other consistent unit).

**Calculation:** Sum of story points for all items meeting the Definition of Done at Sprint end.

**Interpretation:**
- Use the average of 3-5 recent Sprints for planning input.
- Velocity is a planning tool, not a performance metric. Do not compare velocity across teams.
- A declining trend may indicate: growing tech debt, team changes, unclear requirements, or burnout.
- An erratic trend may indicate: inconsistent estimation, scope changes, or unstable team composition.

### Sprint Burndown

**What it measures:** Remaining work in the Sprint Backlog over time.

**Interpretation:**
- Ideal: a roughly linear decline from total planned work to zero.
- Flat sections indicate blocked work or items not being decomposed into tasks.
- Upward spikes indicate scope added mid-Sprint.
- Steep drops late in the Sprint indicate batched completion (often means items were not truly "in progress").

### Cycle Time

**What it measures:** Elapsed time from when work begins on an item to when it meets the Definition of Done.

**Calculation:** Done Date - Start Date (in working days).

**Interpretation:**
- Lower cycle time = faster feedback loops.
- High variance indicates unpredictable item sizes or frequent blocking.
- Track the 85th percentile, not just the average, for realistic delivery expectations.

### Lead Time

**What it measures:** Elapsed time from when an item enters the Product Backlog to when it is Done.

**Interpretation:**
- Lead time includes wait time in the backlog, which is often the largest component.
- Useful for stakeholder communication: "From request to delivery typically takes X days."
- Reducing lead time often requires backlog management improvements, not just execution speed.

### Throughput

**What it measures:** Number of items completed per time period (typically per Sprint).

**Interpretation:**
- Useful complement to velocity when story-point estimation is unreliable.
- Track alongside velocity. If throughput rises but velocity drops, items may be getting smaller.
- Monte Carlo simulations use throughput for probabilistic forecasting.

### Carry-Over Rate

**What it measures:** Percentage of planned Sprint Backlog items not completed by Sprint end.

**Calculation:** (Items Not Done / Items Planned) x 100.

**Interpretation:**
- Healthy: < 10%.
- Warning: 10-20% consistently.
- Critical: > 20% regularly -- indicates systemic planning or execution problems.

## Diagnostic Metrics

### Escaped Defects

**What it measures:** Defects found after the Increment is released (not caught by the team's DoD).

**Interpretation:** Rising escaped defects suggest the Definition of Done needs strengthening or test coverage is insufficient.

### Retrospective Action Completion Rate

**What it measures:** Percentage of retro action items completed by their target date.

**Interpretation:**
- Healthy: > 80%.
- Below 50%: Team is not following through on improvement commitments. Investigate root cause.

### Team Happiness / Morale Index

**What it measures:** Subjective team satisfaction, typically collected via anonymous survey.

**Interpretation:** Treat as a leading indicator. Declining morale often precedes declining velocity and quality. Act before the lag metrics move.

## Using Metrics Responsibly

### Do

- Use metrics for self-improvement and team coaching.
- Track trends over time (3-5 Sprints minimum).
- Discuss metrics openly with the team.
- Combine multiple metrics for a holistic view.
- Let the team choose which metrics to track.

### Do Not

- Use metrics to compare teams (different contexts, different scales).
- Set velocity targets (incentivizes point inflation).
- Punish based on metrics (destroys psychological safety).
- Track too many metrics at once (3-5 core metrics is sufficient).
- Report metrics without context (always include narrative explanation).

## Report Templates

When generating a sprint report, structure it as follows:

### Sprint Summary Template

```
# Sprint [Number] Report

## Sprint Goal
[State the Sprint Goal and whether it was achieved]

## Key Metrics
| Metric | This Sprint | Previous Sprint | 3-Sprint Average |
|--------|-------------|-----------------|------------------|
| Velocity | [X] pts | [Y] pts | [Z] pts |
| Throughput | [X] items | [Y] items | [Z] items |
| Carry-over rate | [X]% | [Y]% | [Z]% |
| Cycle time (avg) | [X] days | [Y] days | [Z] days |

## Completed Items
[List of completed items with story points]

## Carried Over
[List of incomplete items with reason]

## Key Observations
[2-3 bullet points on trends, risks, or achievements]

## Improvement Actions
[Actions from retrospective]
```

## Additional Resources

Open the reference file when deeper detail is needed:

- **`references/metrics-guide.md`** -- Open when the user needs: calculation walkthroughs with worked examples, burndown/burnup pattern diagnosis, cumulative flow diagram (CFD) reading, benchmark heuristics, multi-Sprint trend reports, stakeholder dashboards, or Monte Carlo forecasting steps
