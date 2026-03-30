---
description: Run sprint retrospective with selectable format and action item tracking
argument-hint: "[format] [data-source-description]"
allowed-tools: Read, Write
---

Facilitate a Sprint Retrospective using the **$1** format.

Use the **sprint-events** skill for retrospective facilitation guidance. Reference `${CLAUDE_PLUGIN_ROOT}/skills/sprint-events/references/retro-formats.md` for the complete template and step-by-step facilitation instructions for the selected format.

Use the **scrum-fundamentals** skill to identify anti-patterns in team feedback.

## Format Selection

If the user specified a format ($1), use it. Supported formats:
- `start-stop-continue` -- General-purpose, quick
- `4ls` -- Balanced emotional/analytical (Liked, Learned, Lacked, Longed For)
- `mad-sad-glad` -- Emotional check-in after difficult Sprints
- `sailboat` -- Forward-looking planning
- `timeline` -- Incident or event-heavy Sprints
- `starfish` -- Nuanced feedback (More Of, Less Of, Keep, Start, Stop)

If no format is specified, recommend one based on context:
- Ask the user about the Sprint: "Was this Sprint typical, difficult, or event-heavy?"
- Suggest an appropriate format based on their answer.
- Refer to the format selection guide in `references/retro-formats.md`.

## Data Input

The user's data source context: $2

If the user has Sprint outcome data (completed items, missed items, incidents), incorporate it into the retrospective. If not, facilitate a purely discussion-based retrospective.

## Retrospective Workflow

1. **Set the stage:**
   - If previous retrospective action items are provided, review their completion status.
   - State the purpose and ground rules: "Regardless of what we discover, we understand that everyone did their best given what they knew at the time."

2. **Generate the template:**
   - Create the appropriate template based on the selected format.
   - Include all sections defined in the format reference.
   - Pre-populate with any Sprint data the user provided.

3. **Facilitate data collection:**
   - Guide the user through each section of the template.
   - Ask targeted questions to draw out insights:
     - "What surprised you this Sprint?"
     - "What would you do differently?"
     - "What should we celebrate?"

4. **Analyze themes:**
   - Group related feedback items.
   - Identify recurring themes across sections.
   - Cross-reference with common anti-patterns from the scrum-fundamentals skill.

5. **Define action items:**
   - For each major theme, propose a concrete action item.
   - Each action item must have:
     - Clear description of what to change
     - Owner (ask the user to assign)
     - Target Sprint for completion
   - Limit to 1-3 action items maximum.

6. **Generate retrospective document:**
   - Write the complete retrospective output including:
     - Format used
     - All collected feedback organized by section
     - Identified themes
     - Action items with owners and targets
     - Previous action item status (if provided)
   - Ask the user where to save the document.

## Quality Checks

Before closing, verify:
- All sections of the chosen format are covered
- Action items are specific and actionable (not vague like "improve communication")
- Each action item has an owner and target Sprint
- The retrospective ends on a positive note
