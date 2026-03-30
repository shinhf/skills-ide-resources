---
description: Backlog refinement with story quality review, acceptance criteria, and dependency analysis
argument-hint: "[data-source-description]"
allowed-tools: Read, Write, Grep, Glob
---

Facilitate a Backlog Refinement (grooming) session.

Use the **scrum-fundamentals** skill for INVEST criteria, anti-pattern detection, and backlog management best practices. Reference `${CLAUDE_PLUGIN_ROOT}/skills/scrum-fundamentals/references/best-practices.md` for detailed artifact best practices.

Use the **sprint-events** skill for estimation technique guidance when sizing items. Reference `${CLAUDE_PLUGIN_ROOT}/skills/sprint-events/references/planning-guide.md` for estimation methods.

## Data Input

The user's data source context: $ARGUMENTS

If the user has not specified where the backlog data is, ask them to provide it in one of these forms:
- Paste backlog items inline (text, table, or list)
- Reference a local file or directory containing backlog items
- Provide a CSV or markdown export from their issue tracker
- Describe the items verbally

Do not assume any specific tool. Work only with data the user provides.

## Refinement Workflow

1. **Parse backlog items:**
   - Extract each item with available fields: title, description, acceptance criteria, estimate, priority, dependencies.
   - Note any items with missing fields.

2. **INVEST quality check:**
   For each item, assess against the INVEST criteria:
   - **Independent:** Can this item be completed without depending on other items?
   - **Negotiable:** Is the scope flexible, or is it over-specified?
   - **Valuable:** Does it deliver clear value to the user or business?
   - **Estimable:** Is there enough information to estimate the effort?
   - **Small:** Can it be completed within a single Sprint?
   - **Testable:** Are there clear criteria to verify when it is done?

   Rate each item: Ready / Needs Work / Not Ready.

3. **Acceptance criteria review:**
   For items missing acceptance criteria:
   - Propose acceptance criteria in Given/When/Then format.
   - Ensure criteria are specific, measurable, and testable.
   - Flag subjective criteria ("user-friendly", "fast") for clarification.

4. **Size assessment:**
   For items without estimates:
   - Suggest relative size (S/M/L or story points) based on comparable items if the user provides reference data.
   - Flag items that appear too large (> 8 points or more than a few days of work) and suggest splitting strategies.

5. **Splitting recommendations:**
   For oversized items, suggest splitting strategies:
   - By user workflow step
   - By business rule or validation
   - By data variation (e.g., one data source at a time)
   - By interface (API first, UI second)
   - By operation (CRUD: read first, then write, update, delete)

6. **Dependency mapping:**
   - Identify dependencies between items.
   - Flag external dependencies (other teams, services, approvals).
   - Suggest ordering to minimize blocking.

7. **Priority recommendations:**
   - If the user wants priority advice, assess based on:
     - Business value (ask the user to confirm)
     - Risk reduction (address unknowns early)
     - Dependencies (unblock other items first)
     - Size (quick wins vs. large investments)

8. **Generate refinement output:**

```
# Backlog Refinement Summary

## Items Reviewed: [count]

## Readiness Assessment
| Item | Status | Issues | Estimate |
|------|--------|--------|----------|
[Row per item: Ready / Needs Work / Not Ready]

## Items Needing Work
[For each item that needs work:]
### [Item title]
- **Issues:** [What is missing or unclear]
- **Suggested acceptance criteria:**
  - Given [context], When [action], Then [expected result]
- **Splitting recommendation:** [If too large]
- **Questions for Product Owner:** [Open questions]

## Dependency Map
[List of dependencies between items and external dependencies]

## Recommended Priority Order
[Ordered list with brief justification]

## Summary Statistics
- Ready for Sprint Planning: [X] items
- Need further refinement: [Y] items
- Need Product Owner input: [Z] items
```

9. Ask the user where to save the refinement summary.

## Quality Checks

Before finalizing:
- Every item has been assessed against INVEST criteria
- Missing acceptance criteria are flagged with proposed alternatives
- Large items have splitting recommendations
- Dependencies are explicitly listed
- Any assumptions are clearly stated as questions for the Product Owner
