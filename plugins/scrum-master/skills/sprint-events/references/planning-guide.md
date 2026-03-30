# Sprint Planning Facilitation Guide

Detailed guidance for facilitating effective Sprint Planning sessions, including estimation techniques, capacity planning, and common pitfalls.

---

## Pre-Planning Checklist

Before Sprint Planning begins, verify:

- [ ] Product Backlog is refined: top items have descriptions, acceptance criteria, and initial estimates
- [ ] Product Owner has a recommended Sprint Goal prepared
- [ ] Team capacity is known (vacations, on-call, meetings, other commitments)
- [ ] Previous Sprint's velocity is available as a planning input
- [ ] Sprint board is clean: all items from the previous Sprint are resolved or explicitly carried over

---

## Facilitation Script

### Opening (10 minutes)

1. Welcome and state the purpose: "We are here to define what we will accomplish this Sprint and how."
2. Product Owner presents the recommended Sprint Goal and the top-priority Product Backlog items.
3. Share team capacity for the Sprint.

### Sprint Goal Discussion (15-20 minutes)

1. Product Owner explains why the proposed goal is valuable.
2. Developers ask clarifying questions.
3. Team refines the Sprint Goal into a single, clear statement.
4. Confirm consensus: "Can everyone commit to this Sprint Goal?"

### Item Selection (30-60 minutes)

1. Review each candidate item starting from the top of the Product Backlog.
2. For each item:
   - Product Owner clarifies intent and acceptance criteria
   - Developers estimate if not already done (see Estimation Techniques below)
   - Team decides: include, defer, or split
3. Track cumulative effort against capacity. Stop when capacity is reached.
4. Review the selected set: "Does every item contribute to the Sprint Goal?"

### Task Decomposition (30-60 minutes)

1. For each selected item, Developers break it into tasks.
2. Target task size: 4 hours or less.
3. Identify dependencies between tasks and sequence them.
4. Flag any items that need external input or coordination.

### Closing (10 minutes)

1. Read back the Sprint Goal.
2. Confirm the Sprint Backlog.
3. Identify any immediate risks or open questions.
4. Set the time and format for the first Daily Scrum.

---

## Estimation Techniques

### Planning Poker

**How it works:**
1. Each Developer holds a set of cards with Fibonacci-like values (1, 2, 3, 5, 8, 13, 20, 40, 100).
2. Product Owner describes the item.
3. Developers privately select a card representing their estimate.
4. All cards are revealed simultaneously.
5. Highest and lowest estimators explain their reasoning.
6. Team discusses and re-estimates until convergence (usually 2-3 rounds).

**When to use:** Items that need careful estimation; teams new to relative sizing.

**Tips:**
- Use a reference story (a well-understood item rated "3" or "5") as a baseline.
- If estimates diverge by more than 3x, the item likely needs splitting or further refinement.

### T-Shirt Sizing

**How it works:**
1. Label items as XS, S, M, L, XL.
2. Start by sorting 5-10 items into sizes as a calibration exercise.
3. Size remaining items by comparison.

**When to use:** Large backlogs needing quick rough estimates; roadmap planning.

**Conversion:** Map sizes to story-point ranges for Sprint planning (e.g., S = 2-3, M = 5, L = 8-13).

### Affinity Estimation

**How it works:**
1. Write each item on a card or sticky note.
2. Silently place items on a wall in a rough small-to-large order.
3. Discuss and adjust placements.
4. Draw lines to create size buckets.

**When to use:** New teams, large refinement sessions, items that are hard to compare.

---

## Capacity Planning

### Formula

```
Sprint Capacity = Team Size × Sprint Days × Focus Factor - Known Absences
```

**Focus Factor** accounts for meetings, support, and overhead. Typical values:
- New team: 0.5-0.6
- Established team: 0.7-0.8
- Highly focused team: 0.8-0.85

### Example

- Team: 5 Developers
- Sprint: 10 working days
- Focus factor: 0.7
- Known absences: 3 person-days (1 person on vacation for 3 days)

```
Capacity = (5 × 10 × 0.7) - 3 = 35 - 3 = 32 ideal person-days
```

### Velocity Cross-Check

Compare capacity-based plan against historical velocity:
- If planned work exceeds average velocity by > 15%, reduce scope.
- If planned work is < 70% of average velocity, investigate whether the team is being too conservative.

---

## Common Pitfalls

### Pitfall: Planning Without the Product Owner

**Problem:** Developers select items and guess at priority.
**Fix:** Product Owner must attend Sprint Planning. If unavailable, reschedule rather than proceed without them.

### Pitfall: Skipping Task Decomposition

**Problem:** Team commits to stories without understanding the work involved.
**Fix:** At minimum, identify 2-3 tasks per story and flag unknowns. Full decomposition can happen in the first day of the Sprint if time is tight.

### Pitfall: Ignoring Dependencies

**Problem:** Mid-Sprint discovery that an item requires input from another team or system.
**Fix:** During item selection, explicitly ask: "Does this item depend on anything outside our control?"

### Pitfall: Committing to a Stretch Goal as the Plan

**Problem:** Team treats best-case scenario as the commitment. Any disruption causes Sprint Goal failure.
**Fix:** Plan to 70-80% of capacity. Stretch items are explicitly labeled "if time permits."
