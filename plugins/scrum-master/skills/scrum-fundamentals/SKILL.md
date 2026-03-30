---
name: Scrum Fundamentals
description: This skill should be used when the user asks about "scrum best practices", "agile principles", "scrum anti-patterns", "improve scrum process", "scrum roles", "scrum artifacts", "scrum events", "product owner responsibilities", "scrum master role", "development team structure", "Product Goal", "Sprint Goal", "Definition of Done", "Product Backlog refinement", "self-managing team", "Increment", "empirical process control", "time-box", or needs guidance on core scrum framework concepts, role definitions, process improvement, or identifying where a team's process diverges from the Scrum Guide.
version: 0.1.0
---

# Scrum Fundamentals

## Overview

Provide guidance on the Scrum framework as defined in the Scrum Guide (2020), covering roles, events, artifacts, commitments, and the principles that bind them together. Coach teams on framework questions, diagnose process problems, and identify where a team's implementation diverges from effective scrum practice.

## Core Framework

### Scrum Pillars

Scrum rests on three pillars of empirical process control:

1. **Transparency** -- All significant aspects of the process are visible to those responsible for the outcome. Artifacts, progress, and impediments are shared openly.
2. **Inspection** -- Scrum users frequently inspect artifacts and progress toward a Sprint Goal to detect undesirable variances. Inspection should not be so frequent that it gets in the way of work.
3. **Adaptation** -- When inspection reveals that aspects of the process deviate outside acceptable limits, adjustments are made as soon as possible to minimize further deviation.

### Scrum Values

Five values support the pillars: **Commitment**, **Courage**, **Focus**, **Openness**, and **Respect**. When diagnosing process problems, check whether one or more values have eroded before prescribing mechanical fixes.

## The Scrum Team

A Scrum Team is a small, cross-functional, self-managing unit with no sub-teams or hierarchies. It consists of exactly one Product Owner, one Scrum Master, and Developers. The team is accountable for all product-related activities: stakeholder collaboration, verification, maintenance, operation, experimentation, research, and development.

Recommended team size: 10 or fewer people total. Smaller teams communicate better and are more productive. If the team grows too large, consider reorganizing into multiple cohesive Scrum Teams sharing the same Product Backlog and Product Goal.

### Product Owner

- Maximizes the value of the product and the work of the Developers.
- Sole person responsible for managing the Product Backlog: ordering items, ensuring clarity, and making trade-off decisions.
- One person, not a committee. Decisions are respected by the organization.

### Scrum Master

- Serves the team by facilitating Scrum events, removing impediments, and coaching on self-management.
- Serves the Product Owner by helping with backlog management techniques and stakeholder collaboration.
- Serves the organization by leading agile adoption and removing barriers between stakeholders and the Scrum Team.

### Developers

- Cross-functional professionals who create the Increment each Sprint.
- Self-managing: they decide internally who does what, when, and how.
- Accountable for creating a plan for the Sprint (the Sprint Backlog), adhering to a Definition of Done, and adapting the plan daily.

## Artifacts and Commitments

Each artifact contains a commitment that provides focus and a measurable target:

| Artifact | Purpose | Commitment |
|----------|---------|------------|
| Product Backlog | Ordered list of everything needed in the product | Product Goal |
| Sprint Backlog | Set of items selected for the Sprint + plan for delivering them | Sprint Goal |
| Increment | Sum of all completed backlog items that meet the Definition of Done | Definition of Done |

### Product Goal

The Product Goal describes a future state of the product. It provides long-term direction for the Scrum Team. The Product Backlog emerges from and serves the Product Goal. A Scrum Team must work toward one Product Goal at a time.

### Sprint Goal

The Sprint Goal is a single objective for the Sprint. It provides coherence and focus, enabling the team to make trade-off decisions when scope or approach needs to change mid-Sprint. The Sprint Goal is created during Sprint Planning and added to the Sprint Backlog.

### Definition of Done

The Definition of Done is a formal description of the state of the Increment when it meets quality measures. It creates transparency and a shared understanding of what "complete" means. The DoD applies uniformly to all backlog items -- no exceptions.

If the organization does not have a standard DoD, the Scrum Team must create one appropriate for the product. The DoD is context-dependent. For example, a software team's DoD might include code review, automated tests passing, and documentation updates, while a hardware team's DoD would look entirely different.

When assessing a team's DoD, verify it:
- Exists as a written, shared document
- Is applied consistently to every backlog item
- Includes quality checks appropriate for the product domain
- Is reviewed and strengthened over time as the team matures

## Events

All Scrum events are time-boxed. Each event is a formal opportunity to inspect and adapt Scrum artifacts.

| Event | Time-box | Purpose |
|-------|----------|---------|
| Sprint | 1-4 weeks (consistent) | Container for all other events; produces a Done Increment |
| Sprint Planning | 8 hours (for 1-month Sprint) | Define Sprint Goal, select items, create plan |
| Daily Scrum | 15 minutes | Inspect progress toward Sprint Goal, adapt Sprint Backlog |
| Sprint Review | 4 hours (for 1-month Sprint) | Inspect Increment, adapt Product Backlog |
| Sprint Retrospective | 3 hours (for 1-month Sprint) | Inspect the Sprint, create improvement plan |

Scale time-boxes proportionally for shorter Sprints.

## Product Backlog Refinement

Refinement is the ongoing activity of adding detail, estimates, and order to Product Backlog items. It is not a formal Scrum event but is essential for effective Sprint Planning.

Key refinement practices:
- Break large items into smaller, more precise items.
- Add acceptance criteria and clarify descriptions.
- Estimate effort using relative sizing (story points, T-shirt sizes).
- Identify dependencies and risks early.
- Target the top 2-3 Sprints of backlog items to be "ready" for Sprint Planning.

Items entering Sprint Planning should have clear descriptions, acceptance criteria, and initial size estimates. Apply the INVEST criteria: Independent, Negotiable, Valuable, Estimable, Small, Testable.

## Anti-Pattern Detection

When analyzing a team's scrum implementation, watch for these common anti-patterns:

- **Absent Product Owner** -- PO is unavailable for refinement or Sprint Planning; team makes assumptions.
- **Scope Creep** -- Work added mid-Sprint without removing equivalent effort.
- **Zombie Stories** -- Items that carry over Sprint after Sprint without being re-estimated or split.
- **No Definition of Done** -- Quality varies between items because there is no shared standard.
- **Event Theater** -- Events happen but produce no actionable outcomes.
- **Hero Culture** -- One person carries the Sprint; bus-factor of one.

For the full anti-pattern catalog with detection techniques and remediation strategies, consult `references/anti-patterns.md`.

## Process Improvement Approach

When coaching a team on process improvement:

1. **Observe first** -- Gather data from retrospectives, sprint reports, and daily standups before recommending changes.
2. **Identify root causes** -- Use techniques like 5 Whys or fishbone diagrams. Surface symptoms often mask deeper issues.
3. **Recommend one change at a time** -- Overloading a team with process changes reduces adoption.
4. **Measure impact** -- Define how to measure whether the change helped before implementing it.
5. **Iterate** -- Revisit the change in the next retrospective and adjust.

For comprehensive best practices across all scrum dimensions, consult `references/best-practices.md`.

## Additional Resources

Open these reference files when deeper detail is needed:

- **`references/anti-patterns.md`** -- When diagnosing specific process problems: complete anti-pattern catalog with detection signals, impact analysis, and step-by-step remediation
- **`references/best-practices.md`** -- When coaching or assessing a team: comprehensive best practices for each scrum role, event, and artifact, including scaling considerations and health metrics
