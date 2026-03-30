# Daily Scrum / Standup Guide

Detailed formats, facilitation guidance, anti-pattern detection, and async standup templates for the Daily Scrum.

---

## Format Details

### Walk the Board

**Setup:** Display the Sprint board (physical or digital) with columns visible to all.

**Procedure:**
1. Start from the rightmost column (closest to Done) and move left.
2. For each in-progress item, the person working on it answers:
   - "What is needed to move this item forward today?"
   - "Is anything blocking progress?"
3. Once all in-progress items are covered, briefly note any items not yet started that should begin today.

**Duration:** 10-15 minutes depending on team size and WIP count.

**Advantages:**
- Naturally limits WIP by focusing on finishing over starting
- Ensures blocked items get attention first
- Visual board keeps discussion concrete

**When to use:** Teams with WIP problems, visual thinkers, teams that drift into status reporting with other formats.

### Round Robin

**Procedure:**
Each Developer takes a turn answering three questions:
1. What did I do since the last Daily Scrum?
2. What will I do before the next Daily Scrum?
3. Are there any impediments in my way?

**Duration:** ~2 minutes per person.

**Advantages:**
- Simple, easy to learn for new teams
- Ensures everyone speaks

**Risks:**
- Can degrade into status reporting to the Scrum Master
- People tune out when others speak
- Scales poorly beyond 7-8 people

**When to use:** New teams, teams learning Scrum basics.

### Focus Question

**Procedure:**
1. Facilitator poses one question: "What needs to happen today for us to stay on track for the Sprint Goal?"
2. Open discussion follows. Anyone can speak.
3. Close with a quick blocker check: "Any impediments not yet mentioned?"

**Duration:** 10-15 minutes.

**Advantages:**
- Keeps focus on the Sprint Goal
- Encourages peer-to-peer coordination
- Naturally avoids status-report mode

**Risks:**
- Quiet team members may not speak up
- Requires mature team with strong facilitation habits

**When to use:** Experienced teams, teams that have outgrown Round Robin.

---

## Async Standup Template

For distributed or timezone-challenged teams, async standups can supplement or replace synchronous meetings.

### Daily Async Post Template

```markdown
## Daily Update - [Name] - [Date]

### Sprint Goal Progress
- [Item X]: [Status - on track / blocked / completed]
- [Item Y]: [Status]

### Today's Focus
- [ ] [Planned task 1]
- [ ] [Planned task 2]

### Blockers / Needs
- [Blocker description] → Need help from: [Person/Team]
- None

### FYI
- [Optional: anything the team should know]
```

### Async Standup Rules

1. Post by a consistent daily deadline (e.g., 10:00 AM local time).
2. Read all teammates' posts before noon.
3. Reply to any post where you can help unblock.
4. If a blocker needs synchronous discussion, schedule a 15-minute call same day.
5. Scrum Master reviews all posts and ensures no blocker goes unaddressed for > 24 hours.

### When Async Works

- Team spans 3+ time zones with no overlapping work hours
- Work is largely independent with few daily coordination needs
- Team is disciplined about reading and responding

### When Async Does Not Work

- High inter-dependency between tasks requires real-time coordination
- Team has a pattern of ignoring async posts
- Critical blockers need immediate escalation

---

## Anti-Patterns

### Meeting Runs Long

**Signals:** Regularly exceeds 15 minutes; deep dives into problem-solving; people lose focus.

**Fix:**
- Strict parking lot: "That topic goes to a follow-up. Who needs to be there?"
- Timer visible to all.
- Facilitator interrupts after 2 minutes per person in Round Robin.

### Attendance Drops

**Signals:** 1+ Developers regularly absent; blockers surface late; team coordination degrades.

**Fix:**
- Discuss value of attendance in the retrospective.
- For distributed teams, rotate meeting time to share timezone burden.
- If absence is chronic, address it as an impediment.

### Scrum Master Dominates

**Signals:** SM asks each person for updates; Developers address SM, not each other; SM assigns work based on updates.

**Fix:**
- SM physically steps back (stands behind the team, not at the board).
- Rotate facilitation among Developers.
- SM stays silent for entire meeting; intervenes only if a blocker needs organizational escalation.

### No Sprint Goal Reference

**Signals:** Discussion is about tasks in isolation; no one mentions the Sprint Goal; meeting feels disconnected from purpose.

**Fix:**
- Start every Daily Scrum by reading the Sprint Goal aloud.
- Use Walk the Board format to keep discussion tied to Sprint Backlog items.
- At the end, ask: "Based on today's plan, are we still on track for the Sprint Goal?"

---

## Metrics for Daily Scrum Health

| Indicator | Healthy | Investigate |
|-----------|---------|-------------|
| Duration | < 15 minutes | > 15 minutes regularly |
| Attendance | 100% of Developers | < 80% attendance |
| Blockers raised | 1-3 per week | 0 for multiple weeks (hidden issues) |
| Blocker resolution | < 24 hours | > 48 hours |
| Follow-up meetings | Scheduled same day | Deferred or forgotten |
