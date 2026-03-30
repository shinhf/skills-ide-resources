---
name: Sprint Events
description: This skill should be used when the user asks to "run sprint planning", "facilitate standup", "run retrospective", "sprint review", "sprint demo", "facilitate an event", "plan a sprint", "daily scrum format", "retro template", "standup format", "sprint review agenda", "stakeholder feedback session", "capacity planning", "estimation workshop", "planning poker", "retro facilitation", "inspect increment", "time-box scrum events", or needs guidance on facilitating any scrum event, choosing event formats, creating event templates, or structuring facilitation scripts.
version: 0.1.0
---

# Sprint Events

## Overview

Guide the facilitation of the four formal Scrum events -- Sprint Planning, Daily Scrum, Sprint Review, and Sprint Retrospective -- each held within the Sprint container. Each event serves a specific inspect-and-adapt purpose. Choosing the right format and facilitation approach depends on team maturity, Sprint length, and the specific challenges the team faces.

## Event Summary

The Sprint is a fixed-length container (1-4 weeks, consistent) that holds all other events and produces a Done Increment. Within each Sprint, four time-boxed events occur:

| Event | Time-box (4-week Sprint) | Key Output | Participants |
|-------|--------------------------|------------|--------------|
| Sprint Planning | 8 hours max | Sprint Goal + Sprint Backlog | Entire Scrum Team |
| Daily Scrum | 15 minutes | Updated plan for the day | Developers |
| Sprint Review | 4 hours max | Updated Product Backlog | Scrum Team + Stakeholders |
| Sprint Retrospective | 3 hours max | Improvement action items | Entire Scrum Team |

Scale time-boxes proportionally for shorter Sprints (e.g., 2-week Sprint = half the listed time-box).

## Sprint Planning

### Structure

Sprint Planning answers three questions:

1. **Why is this Sprint valuable?** -- The Product Owner proposes a Sprint Goal. The team refines it.
2. **What can be Done this Sprint?** -- Developers select Product Backlog items that serve the Sprint Goal, informed by velocity and capacity.
3. **How will the chosen work get done?** -- Developers decompose selected items into tasks (typically <= 4 hours each).

### Facilitation Tips

- Open with the Product Owner presenting the recommended Sprint Goal and top-priority items.
- Allow Developers to challenge and negotiate scope. The Sprint Backlog belongs to the Developers.
- Use planning poker, T-shirt sizing, or affinity estimation for items not yet estimated.
- Close by confirming: the team can articulate the Sprint Goal, and every selected item has at least a high-level plan.

For detailed planning facilitation including estimation techniques and capacity planning formulas, consult `references/planning-guide.md`.

## Daily Scrum

### Purpose

A 15-minute planning event for Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog for the upcoming day. Not a status report.

### Formats

**Walk the Board** -- Review the Sprint board from right to left (closest to Done first). Discuss each in-progress item: what is needed to move it forward? Advantages: focuses on finishing over starting.

**Round Robin** -- Each Developer shares: what they did, what they plan to do, any blockers. Simple but can degrade into status reporting.

**Focus Question** -- Single question: "What needs to happen today to stay on track for the Sprint Goal?" Free-form discussion follows. Best for mature teams.

### Key Principles

- Developers own the meeting. Scrum Master attends only when coaching is needed.
- Time-box to 15 minutes. Use a parking lot for deeper topics.
- Identify blockers; do not solve them during the Daily Scrum.
- Update the Sprint Backlog during or immediately after.

For detailed standup formats, anti-patterns, and async standup templates, consult `references/standup-guide.md`.

## Sprint Review

### Purpose

Inspect the Increment and adapt the Product Backlog based on stakeholder feedback. The Sprint Review is a working session, not a presentation.

### Structure

1. **Product Owner** opens with Sprint Goal status and key business context.
2. **Developers** demonstrate the Done Increment. Use working software, not slides.
3. **Stakeholders** interact with the Increment and provide feedback.
4. **Product Owner** captures feedback and adjusts the Product Backlog on the spot.
5. **Forward look** -- discuss upcoming direction and how feedback influences it.

### Facilitation Tips

- Invite stakeholders actively; send agendas in advance.
- Prepare specific feedback questions rather than open-ended "what do you think?"
- Track all feedback items visibly. Prioritize them into the Product Backlog before closing.
- Celebrate accomplishments genuinely. Recognition fuels engagement.

For detailed Sprint Review facilitation including stakeholder engagement strategies, demo preparation, and common anti-patterns, consult `references/sprint-review-guide.md`.

## Sprint Retrospective

### Purpose

Inspect the Sprint with respect to people, relationships, process, and tools. Create an actionable improvement plan.

### Common Formats

| Format | Best For | Structure |
|--------|----------|-----------|
| Start/Stop/Continue | General-purpose, quick | Three columns: what to start, stop, continue |
| 4Ls | Balanced emotional/analytical | Liked, Learned, Lacked, Longed For |
| Mad/Sad/Glad | Emotional check-in | How did the Sprint make you feel? |
| Sailboat | Forward-looking planning | Wind (helps), Anchor (slows), Rocks (risks), Island (goal) |
| Timeline | Incident or event-heavy Sprints | Chronological walk-through of the Sprint |
| Starfish | Nuanced feedback | More of, Less of, Keep, Start, Stop |

### Facilitation Tips

- Start by reviewing action items from the previous retrospective to establish accountability.
- Rotate formats every 2-3 Sprints to prevent fatigue and surface different insights.
- Collect input silently (sticky notes, anonymous forms) before group discussion to reduce groupthink.
- Limit to 1-3 action items with clear owners and target Sprints.
- Close with something positive to maintain team morale.

For detailed retro format templates with step-by-step facilitation instructions, consult `references/retro-formats.md`.

## Choosing the Right Format

When recommending an event format, consider:

- **Team maturity** -- New teams benefit from structured formats (Start/Stop/Continue, Round Robin). Mature teams thrive with open formats (Focus Question, Sailboat).
- **Sprint context** -- After a difficult Sprint, use emotion-oriented formats (Mad/Sad/Glad). After a normal Sprint, use analytical formats (4Ls).
- **Specific problems** -- If the team has a known issue (e.g., too much WIP), choose a format that naturally surfaces it (Walk the Board for Daily Scrum, Timeline for Retro).

## Additional Resources

Open these reference files when deeper facilitation detail is needed:

- **`references/planning-guide.md`** -- Full planning facilitation script with estimation techniques and capacity planning
- **`references/standup-guide.md`** -- Standup formats, anti-patterns, and async standup templates
- **`references/sprint-review-guide.md`** -- Sprint Review facilitation, stakeholder engagement, demo preparation, and anti-patterns
- **`references/retro-formats.md`** -- Complete retro format templates with step-by-step facilitation instructions
