# Scrum Anti-Patterns Catalog

A comprehensive catalog of common scrum anti-patterns organized by category. For each anti-pattern: detection signals, impact on the team, and step-by-step remediation.

---

## Sprint Planning Anti-Patterns

### Over-Commitment

**Detection signals:**
- Team consistently fails to complete all Sprint Backlog items
- Velocity fluctuates wildly Sprint to Sprint
- Carry-over items exceed 20% of planned work

**Impact:** Erodes stakeholder trust, demoralizes the team, makes forecasting unreliable.

**Remediation:**
1. Track actual velocity over 3-5 Sprints to establish a reliable baseline
2. Plan to 70-80% of average velocity to build in buffer
3. Distinguish stretch goals from committed items
4. Review estimates in retrospective -- are stories consistently larger than expected?

### Vague Sprint Goal

**Detection signals:**
- Sprint Goal is a list of stories rather than a coherent objective
- Team cannot articulate the Sprint Goal mid-Sprint
- Sprint Review focuses on individual items, not the goal

**Impact:** No focus; team cannot make trade-off decisions when impediments arise.

**Remediation:**
1. Formulate the Sprint Goal as a single sentence answering "Why is this Sprint valuable?"
2. Each selected item should clearly contribute to the goal
3. Use the Sprint Goal to decide what to drop if capacity shrinks mid-Sprint

### No Refinement Before Planning

**Detection signals:**
- Stories are discussed for the first time in Sprint Planning
- Planning sessions consistently exceed time-box
- Acceptance criteria are written during planning

**Impact:** Poor estimates, missing dependencies, incomplete understanding of requirements.

**Remediation:**
1. Schedule recurring refinement sessions (1-2 hours per week)
2. Items entering Sprint Planning should already have acceptance criteria and initial size estimate
3. Apply a "ready" checklist: clear description, acceptance criteria, estimated, no unresolved dependencies

---

## Daily Scrum Anti-Patterns

### Status Report to Scrum Master

**Detection signals:**
- Team members address the Scrum Master rather than each other
- Scrum Master asks each person for an update in turn
- No peer-to-peer collaboration emerges from the meeting

**Impact:** The Daily Scrum becomes a reporting event instead of a planning event. Self-management atrophies.

**Remediation:**
1. Scrum Master steps back physically and verbally
2. Reframe the meeting: "What do we need to coordinate today to hit our Sprint Goal?"
3. Rotate facilitation among Developers
4. If needed, Scrum Master leaves the room for a few Sprints to break the pattern

### Long-Running Daily Scrum

**Detection signals:**
- Meeting regularly exceeds 15 minutes
- Discussions dive into problem-solving or design
- People disengage or multitask

**Impact:** Time waste; team starts skipping or dreading the event.

**Remediation:**
1. Use a "parking lot" for topics that need more than 30 seconds
2. Schedule follow-up conversations immediately after for parking-lot items
3. Focus strictly on coordination toward the Sprint Goal, not detailed status

### Absent Team Members

**Detection signals:**
- One or more Developers regularly skip the Daily Scrum
- Updates are posted asynchronously without coordination
- Blockers surface late because they were not communicated

**Impact:** Loss of transparency; impediments fester.

**Remediation:**
1. Discuss the purpose and value of attendance in the retrospective
2. For distributed teams, find a time-zone-friendly slot even if it means rotating
3. If async is necessary, require explicit blocker flagging with a response SLA

---

## Sprint Review Anti-Patterns

### Demo Theater

**Detection signals:**
- Only pre-scripted happy-path scenarios are shown
- Stakeholders are not invited to interact with the Increment
- No feedback is collected or acted upon

**Impact:** False confidence in the product; stakeholder feedback arrives too late.

**Remediation:**
1. Invite stakeholders to try the Increment hands-on
2. Prepare questions for stakeholders: "Does this meet the need?"
3. Capture feedback items and add them to the Product Backlog immediately

### Skipping the Review

**Detection signals:**
- Review is cancelled because "nothing is done"
- Team conflates Review with internal demo
- Stakeholders stop attending

**Impact:** Lost inspection opportunity; Product Backlog diverges from real needs.

**Remediation:**
1. Hold the Review even if only partial Increments are available -- partial feedback is better than none
2. Use the Review to discuss what was learned, not just what was built
3. Re-engage stakeholders by showing that their feedback influences the next Sprint

---

## Retrospective Anti-Patterns

### Blame Game

**Detection signals:**
- Discussion focuses on individuals rather than process
- Team members become defensive
- Action items target people ("Bob should work harder")

**Impact:** Psychological safety collapses; honest reflection stops.

**Remediation:**
1. Establish ground rules: "Regardless of what we discover, we understand that everyone did their best"
2. Redirect person-focused feedback to process: "What about our process made this outcome likely?"
3. Use anonymous input collection before discussion
4. Facilitator actively redirects blame language

### No Action Items

**Detection signals:**
- Retrospective produces discussion but no concrete commitments
- Previous Sprint's action items are never reviewed
- Team feels retrospectives are pointless

**Impact:** Process never improves; retro becomes event theater.

**Remediation:**
1. Limit to 1-3 action items per retrospective
2. Each action item must have an owner and a target Sprint
3. Start next retrospective by reviewing previous action items
4. Track completion rate of retro action items as a meta-metric

### Same Format Every Time

**Detection signals:**
- Team uses Start/Stop/Continue every Sprint without variation
- Participation drops; responses become superficial
- New insights stop emerging

**Impact:** Diminishing returns; team disengages from the retrospective.

**Remediation:**
1. Rotate formats: 4Ls, Sailboat, Mad/Sad/Glad, Timeline, Starfish
2. Match format to situation (e.g., Sailboat for forward-looking, Timeline for incident analysis)
3. Occasionally invite an external facilitator for fresh perspective

---

## Backlog Anti-Patterns

### Epic Monoliths

**Detection signals:**
- Backlog items span multiple Sprints
- Stories have 10+ acceptance criteria
- Estimation is consistently inaccurate for large items

**Impact:** Unpredictable delivery, hidden complexity, difficulty measuring progress.

**Remediation:**
1. Apply INVEST criteria: Independent, Negotiable, Valuable, Estimable, Small, Testable
2. Split by user workflow, business rule, or data variation
3. Target stories completable within 1-3 days of team effort
4. Use story mapping to find natural vertical slices

### Missing Acceptance Criteria

**Detection signals:**
- Stories have only a title or a one-line description
- Developers ask frequent clarification questions mid-Sprint
- Definition of "done" varies per story

**Impact:** Rework, disagreements about completeness, unpredictable velocity.

**Remediation:**
1. Require acceptance criteria before a story enters Sprint Planning
2. Use Given/When/Then format for testable criteria
3. Product Owner and Developers review criteria together during refinement

### Backlog as a Dumping Ground

**Detection signals:**
- Product Backlog has 200+ items
- Bottom-half items have no updates in months
- Team loses confidence in backlog ordering

**Impact:** Signal-to-noise ratio drops; planning becomes overwhelming.

**Remediation:**
1. Regularly prune items older than 3-6 months without activity
2. Archive rather than delete -- items can return if demand resurfaces
3. Limit actively refined backlog to 2-3 Sprints worth of items
4. Product Owner reviews and reorders at least weekly

---

## Organizational Anti-Patterns

### Scrum Master as Project Manager

**Detection signals:**
- Scrum Master assigns tasks to individuals
- Scrum Master reports status to management on behalf of the team
- Team defers decisions to the Scrum Master

**Impact:** Self-management never develops; single point of failure.

**Remediation:**
1. Scrum Master coaches the team to self-assign during Sprint Planning
2. Team members present their own work in Sprint Review
3. Scrum Master facilitates rather than directs

### Part-Time Product Owner

**Detection signals:**
- PO is unavailable for refinement or questions during the Sprint
- Proxy POs make conflicting decisions
- Backlog ordering is stale

**Impact:** Slow decision-making, rework from misunderstood requirements, team idle time.

**Remediation:**
1. Escalate to management: PO role requires dedicated time
2. If part-time is unavoidable, establish clear decision-making authority and response SLA
3. PO prepares well-refined stories in advance to reduce real-time dependency

### Hero Culture

**Detection signals:**
- One person consistently takes on the hardest or most critical work
- Knowledge is siloed; bus-factor of one
- Other team members are unable to contribute to certain areas

**Impact:** Burnout for the hero; team fragility; slower overall delivery.

**Remediation:**
1. Pair programming or mob programming to spread knowledge
2. Rotate who works on different areas each Sprint
3. Explicitly track knowledge distribution as a team health metric
4. Celebrate collaboration over individual heroics
