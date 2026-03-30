---
description: Generate daily standup summary from user-provided status inputs
argument-hint: "[date] [data-source-description]"
allowed-tools: Read, Write, Grep, Glob
---

Generate a Daily Scrum summary for $1.

Use the **sprint-events** skill for standup facilitation guidance. Reference `${CLAUDE_PLUGIN_ROOT}/skills/sprint-events/references/standup-guide.md` for standup formats, anti-patterns, and async templates.

## Data Input

The user's data source context: $2

If the user has not specified where the standup data is, ask them to provide it in one of these forms:
- Paste team member updates inline
- Reference a file containing standup notes or status updates
- Describe the current Sprint status and any blockers verbally

Do not assume any specific tool or format. Work only with data the user provides.

## Standup Workflow

1. **Gather status data:**
   - Collect updates from user-provided data. For each team member (or work item), identify:
     - What was accomplished since the last standup
     - What is planned for today
     - Any blockers or impediments

2. **Analyze against Sprint Goal:**
   - If the user provides the Sprint Goal or Sprint Backlog, assess progress:
     - Items on track vs. at risk
     - Sprint burndown status (if data available)
     - Days remaining in the Sprint vs. remaining work

3. **Identify blockers and risks:**
   - List all blockers explicitly mentioned.
   - Flag potential risks: items with no progress, items approaching the Sprint boundary, dependencies.
   - Suggest escalation paths for blockers older than 24 hours.

4. **Generate standup summary:**

```
# Daily Scrum Summary - [Date]

## Sprint Goal
[Sprint Goal if provided]

## Progress Overview
- Items completed since last standup: [count]
- Items in progress: [count]
- Items blocked: [count]

## Team Updates
[For each person/item: status, today's plan, blockers]

## Blockers & Impediments
| Blocker | Owner | Age | Suggested Action |
|---------|-------|-----|-----------------|
[Blocker rows]

## Sprint Health
- Days remaining: [X]
- Items remaining: [Y]
- Risk level: [Low / Medium / High]
- Notes: [Any concerns about Sprint Goal achievement]
```

5. **Recommendations:**
   - Suggest follow-up conversations for parking-lot topics.
   - Flag if the team should consider scope adjustment.
   - Note if any team member appears overloaded or idle based on the data.

Ask the user where to save the standup summary if they want it persisted.
