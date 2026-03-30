# Sprint Review Facilitation Guide

Detailed guidance for facilitating effective Sprint Reviews, including stakeholder engagement strategies, demo preparation, feedback collection, and common anti-patterns.

---

## Pre-Review Checklist

Before the Sprint Review begins, verify:

- [ ] Sprint Goal status is clear (achieved, partially achieved, not achieved)
- [ ] Done Increment is deployable and demonstrable
- [ ] Stakeholder invitation sent with agenda and Sprint Goal context
- [ ] Demo environment is set up and tested
- [ ] Feedback collection mechanism is ready (board, document, or tool)
- [ ] Product Backlog is accessible for real-time updates
- [ ] Any carried-over or descoped items are documented with reasons

---

## Facilitation Script

### Opening (10 minutes)

1. Welcome attendees. Briefly explain the Sprint Review purpose: inspect the Increment and adapt the Product Backlog.
2. Product Owner states the Sprint Goal and whether it was achieved.
3. Product Owner summarizes key business context or market changes since the last Review.
4. Outline the agenda: demo, feedback, backlog discussion, forward look.

### Increment Demo (20-40 minutes)

1. Developers demonstrate each completed item using working product, not slides.
2. For each item:
   - Show the user-facing behavior or outcome
   - Highlight how it contributes to the Sprint Goal
   - Invite stakeholders to interact ("Would you like to try it?")
3. If an item was partially completed or descoped, briefly explain why and what remains.
4. Keep the demo focused on outcomes and value, not technical implementation details.

### Feedback Collection (15-25 minutes)

1. After each demo segment (or at the end), ask targeted feedback questions:
   - "Does this meet the need you described?"
   - "What would make this more useful?"
   - "Is anything missing from your perspective?"
   - "How does this compare to your expectations?"
2. Capture every feedback item visibly (whiteboard, shared document, or backlog tool).
3. Categorize feedback: enhancement, defect, new idea, clarification needed.
4. Product Owner acknowledges each item and indicates initial priority impression.

### Backlog Update (10-15 minutes)

1. Product Owner reviews captured feedback items with stakeholders.
2. For each item, decide: add to Product Backlog now, investigate further, or defer.
3. Re-examine Product Backlog ordering based on new information.
4. If the Product Goal needs revision based on feedback, note it for further discussion.

### Forward Look (5-10 minutes)

1. Product Owner shares upcoming priorities and direction for the next Sprint(s).
2. Discuss how stakeholder feedback influences the plan.
3. Highlight any decisions or trade-offs that need stakeholder input.
4. Confirm next Sprint Review date and any specific stakeholder attendance needs.

### Closing (5 minutes)

1. Summarize key feedback items and any immediate backlog changes.
2. Thank stakeholders for their time and input.
3. Celebrate team accomplishments.

---

## Stakeholder Engagement Strategies

### Before the Review

- Send a brief agenda 2-3 days in advance including the Sprint Goal and key items to be demonstrated.
- Highlight which stakeholders' feedback is most needed for specific items.
- If attendance has been low, ask stakeholders what format or timing would improve it.

### During the Review

- Direct questions to specific stakeholders based on their domain: "Sarah, this affects the onboarding flow you oversee. What do you think?"
- Allow hands-on interaction with the Increment when possible.
- Acknowledge that silence is not approval -- actively solicit feedback from quiet attendees.
- Keep technical discussions short; offer follow-up sessions for deep dives.

### After the Review

- Share a brief summary of feedback items and resulting backlog changes within 24 hours.
- Follow up on any "investigate further" items before the next Review.
- Track whether feedback was acted on -- stakeholders disengage when they feel unheard.

---

## Demo Preparation Tips

### Environment

- Use a dedicated demo environment that mirrors production as closely as possible.
- Pre-load realistic test data. Avoid "test123" or obviously fake data.
- Test the demo flow end-to-end before the Review. Identify and work around known issues.
- Have a backup plan (screenshots, recorded video) in case of environment issues.

### Flow

- Demo in order of business value or Sprint Goal relevance, not in order of completion.
- Show the user journey, not individual features in isolation.
- Keep each demo segment to 5-10 minutes maximum.
- Prepare talking points but avoid scripted demos -- natural flow feels more authentic and invites questions.

### What Not to Demo

- Work that does not meet the Definition of Done.
- Internal refactoring or technical changes with no user-visible impact (mention these briefly but do not demo).
- Features behind feature flags that are not yet ready for feedback.

---

## Anti-Patterns

### Demo Theater

**Signals:** Only pre-scripted happy-path scenarios shown; stakeholders not invited to interact; no feedback collected or acted upon.

**Impact:** False confidence in the product; stakeholder feedback arrives too late to be useful.

**Fix:**
1. Invite stakeholders to try the Increment hands-on.
2. Prepare specific questions rather than relying on volunteer feedback.
3. Show edge cases and known limitations alongside the happy path.

### Skipping the Review

**Signals:** Review cancelled because "nothing is done"; team conflates Review with internal demo; stakeholders stop attending.

**Impact:** Lost inspection opportunity; Product Backlog diverges from real needs.

**Fix:**
1. Hold the Review even if only partial Increments are available -- partial feedback is better than none.
2. Use the Review to discuss what was learned, not just what was built.
3. Re-engage stakeholders by showing that their feedback influences the next Sprint.

### Internal-Only Review

**Signals:** Only the Scrum Team attends; no external stakeholders; feedback loop is closed.

**Impact:** Product evolves in isolation; misalignment with user and business needs.

**Fix:**
1. Identify 2-3 key stakeholders whose input is essential.
2. Product Owner personally invites them and explains why their input matters.
3. Adapt timing and format to stakeholder availability.

### Slide Deck Review

**Signals:** PowerPoint presented instead of working product; stakeholders see mockups, not real functionality.

**Impact:** No real inspection of the Increment; issues hidden behind slides.

**Fix:**
1. Working software only. If it is not demonstrable, it may not be Done.
2. Use slides only for brief context-setting (Sprint Goal, agenda) -- never for the demo itself.
3. If the Increment is a backend/API change, demonstrate it through a test harness or API client.

### No Backlog Update

**Signals:** Feedback is collected but never enters the Product Backlog; same feedback surfaces repeatedly.

**Impact:** Stakeholders feel ignored; feedback loop breaks down.

**Fix:**
1. Update the Product Backlog during the Review, not after.
2. Assign each feedback item a backlog status before the Review ends.
3. Report back on feedback-item outcomes at the start of the next Review.

---

## Metrics for Sprint Review Health

| Indicator | Healthy | Investigate |
|-----------|---------|-------------|
| Stakeholder attendance | 2+ external stakeholders | 0 external stakeholders |
| Feedback items collected | 3-10 per Review | 0 items (disengagement) |
| Feedback acted upon | > 60% within 2 Sprints | < 30% acted upon |
| Demo coverage | All Done items shown | Selective showing |
| Backlog updated in session | Yes | Deferred to "later" |
| Review duration | Within time-box | Consistently cut short or skipped |
