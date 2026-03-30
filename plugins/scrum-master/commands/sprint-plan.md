---
description: Facilitate sprint planning with backlog analysis, estimation, and goal setting
argument-hint: "[sprint-number] [team-size] [data-source-description]"
allowed-tools: Read, Write, Grep, Glob
---

Facilitate a Sprint Planning session for Sprint $1 with a team of $2 Developers.

Use the **sprint-events** skill for facilitation structure. Reference `${CLAUDE_PLUGIN_ROOT}/skills/sprint-events/references/planning-guide.md` for the detailed planning facilitation script, estimation techniques, and capacity planning formulas.

Use the **scrum-fundamentals** skill for framework context when needed.

## Data Input

The user's data source context: $3

If the user has not specified where the backlog data is, ask them to provide it in one of these forms:
- Paste the backlog items inline (text or table)
- Reference a local file or directory containing backlog items
- Provide a CSV or markdown export from their issue tracker

Do not assume Jira, Azure DevOps, or any specific tool. Work only with data the user provides.

## Planning Workflow

1. **Gather inputs:**
   - Confirm the Product Backlog items available for this Sprint (from user-provided data).
   - Determine team capacity: $2 Developers × Sprint length × focus factor. Ask the user for Sprint length and any known absences if not provided.

2. **Sprint Goal:**
   - Review the top-priority backlog items.
   - Propose a Sprint Goal as a single sentence answering "Why is this Sprint valuable?"
   - Discuss and refine with the user.

3. **Item selection:**
   - For each candidate item, review description and acceptance criteria.
   - Flag items missing acceptance criteria or that are too large (> 8 story points as a guideline).
   - Recommend splitting large items using INVEST criteria.
   - Track cumulative effort against capacity. Stop when capacity is reached.

4. **Estimation support:**
   - If items lack estimates, facilitate estimation using relative sizing.
   - Suggest a reference story for calibration if the user provides historical data.
   - Flag items where uncertainty is high and recommend refinement before commitment.

5. **Task decomposition:**
   - For each selected item, suggest breaking it into tasks of 4 hours or less.
   - Identify dependencies between tasks and flag external dependencies.

6. **Sprint Plan output:**
   - Write a Sprint Plan document containing:
     - Sprint number and dates (if provided)
     - Sprint Goal
     - Selected items with estimates
     - Capacity calculation
     - Known risks and dependencies
   - Ask the user where to save the Sprint Plan document.

## Quality Checks

Before finalizing, verify:
- Every selected item has acceptance criteria
- Cumulative estimate does not exceed 80% of capacity
- Sprint Goal is a coherent objective, not a list of stories
- Dependencies are identified and mitigation noted
