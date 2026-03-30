# Scrum Metrics Detailed Guide

In-depth definitions, calculation walkthroughs, benchmark tables, and advanced reporting templates for scrum metrics.

---

## Velocity Deep Dive

### Calculation Walkthrough

Given Sprint data:

| Story | Points | Status |
|-------|--------|--------|
| User login redesign | 5 | Done |
| Password reset flow | 3 | Done |
| Email notifications | 8 | Done |
| Profile settings page | 5 | Not Done (carried over) |
| Admin dashboard | 13 | Not Done (descoped) |

**Sprint Velocity = 5 + 3 + 8 = 16 points** (only items meeting DoD count).

### Rolling Average

Track velocity over multiple Sprints for reliable planning:

| Sprint | Velocity |
|--------|----------|
| Sprint 18 | 21 |
| Sprint 19 | 18 |
| Sprint 20 | 24 |
| Sprint 21 | 16 |
| Sprint 22 | 22 |

**5-Sprint Average = (21 + 18 + 24 + 16 + 22) / 5 = 20.2 points**

Use this average (not the best or latest Sprint) for capacity planning.

### Velocity Variance

**Standard deviation** indicates predictability:
- Low variance (< 15% of mean): Team is predictable. Stakeholders can trust forecasts.
- High variance (> 30% of mean): Investigate causes -- team changes, estimation inconsistency, external dependencies.

### Common Velocity Distortions

| Distortion | Cause | Fix |
|------------|-------|-----|
| Gradual inflation | Teams unconsciously increase point values | Re-calibrate with reference stories quarterly |
| Sprint-end cramming | Items marked Done on the last day | Check if DoD is being maintained |
| Partial credit | Half-done items counted | Only count fully Done items |
| Changed team size | Additions/departures skew velocity | Track per-person velocity as a secondary metric during transitions |

---

## Burndown Charts

### Sprint Burndown Construction

**X-axis:** Sprint days (1 through N).
**Y-axis:** Remaining story points (or tasks/hours).

**Data points:**
- Day 0: Total planned story points.
- Each subsequent day: Sum of remaining points for all items not yet Done.

### Burndown Patterns and Diagnosis

**Ideal burndown:** Roughly linear decline from planned total to zero.

**Late-start pattern:** Flat at the top for several days, then steep decline.
- Diagnosis: Team spends early Sprint on refinement/analysis rather than execution, or tasks are not decomposed into trackable units.
- Action: Improve Sprint Planning to include task decomposition; track tasks, not just stories.

**Scope-change pattern:** Line goes up before going down.
- Diagnosis: Work added mid-Sprint.
- Action: Review Sprint boundary discipline. Any addition should remove equivalent effort.

**Never-reaches-zero pattern:** Burndown flattens above zero.
- Diagnosis: Over-commitment; blocked items; external dependencies.
- Action: Reduce Sprint scope; address blocking patterns; improve dependency management.

**Cliff pattern:** Flat for most of the Sprint, sharp drop at the end.
- Diagnosis: Items are not being completed incrementally; or items are not tracked at a granular level.
- Action: Break stories into smaller tasks; encourage daily board updates.

### Sprint Burnup Alternative

A burnup chart tracks both total scope and completed work:
- **Scope line:** Total planned points (rises if scope is added).
- **Done line:** Cumulative completed points (always rises or stays flat).

Advantage over burndown: scope changes are visible as movements in the scope line rather than confusing the remaining-work line.

---

## Cycle Time Analysis

### Calculation Example

| Item | Work Started | Done Date | Cycle Time |
|------|-------------|-----------|------------|
| Login redesign | Mar 1 | Mar 4 | 3 days |
| Password reset | Mar 2 | Mar 3 | 1 day |
| Email notifications | Mar 3 | Mar 8 | 5 days |
| Admin dashboard | Mar 5 | Mar 12 | 7 days |
| Profile settings | Mar 7 | Mar 9 | 2 days |

**Average cycle time:** (3 + 1 + 5 + 7 + 2) / 5 = 3.6 days
**85th percentile:** 7 days (use this for setting expectations with stakeholders)

### Cycle Time Distribution

Plot cycle times as a histogram. A healthy distribution:
- Clusters around a low average (1-3 days for well-sized stories).
- Has a thin right tail (few outliers).

A concerning distribution:
- Wide spread (items range from 1 day to 15 days).
- Fat right tail (many items take much longer than average).

**Root causes of long cycle time:**
- Items too large (split them)
- Frequent context-switching (limit WIP)
- External dependencies (identify and manage earlier)
- Review/approval bottlenecks (streamline the process)

---

## Cumulative Flow Diagram (CFD)

### What It Shows

A stacked area chart where:
- X-axis: Time (days or Sprints).
- Y-axis: Number of items.
- Bands: One for each workflow state (e.g., To Do, In Progress, In Review, Done).

### Reading the CFD

- **Band width = WIP** for that state. Widening bands mean accumulation (bottleneck).
- **Horizontal distance between bands = lead time** through those states.
- **Slope of the Done band = throughput**.
- **Flat Done band** = nothing is being completed (problem).
- **Widening "In Review" band** = review is a bottleneck.

### Using CFD for Diagnosis

| CFD Pattern | Interpretation | Action |
|-------------|---------------|--------|
| Parallel bands, even spacing | Healthy flow | Continue current practices |
| Widening "In Progress" band | Too much WIP | Reduce WIP limits |
| Widening "In Review" band | Review bottleneck | Add review capacity or streamline |
| Gap between bands | Wait states | Investigate handoff inefficiencies |
| "To Do" band shrinking faster than "Done" grows | Items started but not finished | Focus on finishing over starting |

---

## Benchmarks

**Important:** The numbers below are illustrative coaching heuristics, not industry standards or KPI targets. Story points are not comparable across teams or even across time without a stable calibration baseline. Always establish a team-specific baseline from 3-5 Sprints of actual data before using any benchmark for diagnosis. Never use these to compare teams or set performance targets.

### By Team Size (5-9 Developers, 2-week Sprint)

These ranges assume a fictional calibration scale. Replace them with team-specific baselines as soon as actual data is available.

| Metric | Below Average | Average | Above Average |
|--------|---------------|---------|---------------|
| Velocity | < 20 pts | 20-40 pts | > 40 pts |
| Throughput | < 5 items | 5-10 items | > 10 items |
| Cycle time (avg) | > 5 days | 2-5 days | < 2 days |
| Carry-over rate | > 20% | 10-20% | < 10% |
| Sprint Goal success | < 60% | 60-80% | > 80% |

**Note on cycle time:** The "start" trigger must be defined consistently across items (e.g., moved to "In Progress" vs. first commit). Align the team on this definition before tracking.

### Maturity-Based Expectations

Heuristic ranges for coaching conversations only -- do not use as KPI targets. Each team's trajectory is different.

| Team Maturity | Velocity Variance | Carry-Over | Retro Action Completion |
|---------------|-------------------|------------|------------------------|
| Forming (< 3 Sprints) | > 30% | > 25% | < 50% |
| Storming (3-8 Sprints) | 20-30% | 15-25% | 50-70% |
| Norming (8-15 Sprints) | 10-20% | 10-15% | 70-85% |
| Performing (15+ Sprints) | < 10% | < 10% | > 85% |

---

## Advanced Reporting Templates

### Trend Report (Multi-Sprint)

```
# Sprint Trend Report: Sprints [X] through [Y]

## Velocity Trend
| Sprint | Velocity | Delta | Trend |
|--------|----------|-------|-------|
| [N-4] | [pts] | — | — |
| [N-3] | [pts] | [+/-] | [↑/↓/→] |
| [N-2] | [pts] | [+/-] | [↑/↓/→] |
| [N-1] | [pts] | [+/-] | [↑/↓/→] |
| [N] | [pts] | [+/-] | [↑/↓/→] |

5-Sprint Average: [X] pts
Variance: [X]%

## Throughput Trend
[Same table structure as velocity]

## Cycle Time Trend
| Sprint | Average | 85th Percentile | Items Measured |
|--------|---------|-----------------|----------------|
[Data rows]

## Carry-Over Analysis
| Sprint | Planned | Completed | Carried Over | Rate |
|--------|---------|-----------|-------------|------|
[Data rows]

## Health Indicators
| Indicator | Status | Notes |
|-----------|--------|-------|
| Velocity stability | [Green/Yellow/Red] | [Context] |
| Sprint Goal achievement | [Green/Yellow/Red] | [Context] |
| Carry-over trend | [Green/Yellow/Red] | [Context] |
| Cycle time trend | [Green/Yellow/Red] | [Context] |
| Retro action completion | [Green/Yellow/Red] | [Context] |

## Observations
[Key insights from the data]

## Recommendations
[Suggested actions based on trends]
```

### Stakeholder Dashboard

```
# Sprint [N] Dashboard

## Sprint Goal: [Goal statement]
Status: [Achieved / Partially Achieved / Not Achieved]

## Delivery Summary
- Completed: [X] of [Y] planned items ([Z]%)
- Story points delivered: [X] of [Y] planned
- Items carried to next Sprint: [list]

## Forecast
Based on 5-Sprint average velocity of [X] points:
- Remaining backlog: [Y] points
- Estimated Sprints to completion: [Y/X] = [Z] Sprints
- Projected completion: Sprint [N+Z] ([date range])

## Risks & Impediments
[Active risks and their mitigation status]

## Next Sprint Preview
Sprint Goal: [Proposed goal]
Key items: [Top 3-5 items]
```

---

## Forecasting Techniques

### Velocity-Based Forecasting

Simplest approach. Divide remaining backlog points by average velocity.

**Formula:** Remaining Sprints = Remaining Points / Average Velocity

**Limitation:** Assumes constant velocity and complete backlog estimation.

### Monte Carlo Simulation

Uses historical throughput data to generate probabilistic forecasts.

**Input:** Throughput per Sprint for the last 10-20 Sprints.
**Output:** Probability distribution of completion dates.

**Example:**
- 50% confidence: Done by Sprint 28
- 85% confidence: Done by Sprint 31
- 95% confidence: Done by Sprint 34

**When to use:** When stakeholders need date commitments with confidence levels. More reliable than single-point estimates, especially for larger scopes.

**How to run manually:**
1. Collect throughput data (items completed per Sprint) for 10-20 Sprints.
2. For each simulation run: randomly sample from the throughput data to "simulate" future Sprints until remaining items reach zero.
3. Repeat 1,000+ times.
4. Plot the distribution of completion Sprints.
5. Read off percentiles for stakeholder communication.
