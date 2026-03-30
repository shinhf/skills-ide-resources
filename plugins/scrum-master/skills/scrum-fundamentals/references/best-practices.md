# Scrum Best Practices

Comprehensive best practices organized by scrum dimension. Apply these as coaching guidance, adapting recommendations to the team's maturity and context.

---

## Product Owner Best Practices

### Backlog Management

- Maintain a single, ordered Product Backlog -- never split across tools or spreadsheets.
- Keep the top 2-3 Sprints worth of items refined: clear descriptions, acceptance criteria, estimated size.
- Review and reorder the backlog at least weekly. Market conditions and stakeholder priorities shift.
- Archive items untouched for 3+ months. If they matter, they will resurface.
- Use story mapping to visualize the product as user journeys, not a flat list.

### Stakeholder Communication

- Share the Product Goal and roadmap openly. Stakeholders who understand the direction provide better feedback.
- Invite stakeholders to every Sprint Review. If attendance drops, ask why and adapt the format.
- Translate technical work into business impact when communicating upward.
- Say "no" explicitly to low-priority requests rather than letting them languish in the backlog.

### Sprint Planning Preparation

- Enter Sprint Planning with a clear recommendation for the Sprint Goal.
- Pre-prioritize candidate items so the team can focus on estimation and planning, not ordering.
- Be available during planning to answer questions and make trade-off decisions in real time.

---

## Scrum Master Best Practices

### Facilitation

- Facilitate, do not direct. Ask questions rather than provide answers.
- Ensure every team member has a voice in events. Watch for dominant personalities and create space for quieter members.
- Time-box rigorously. Events that run over erode trust in the process.
- Vary retrospective formats every 2-3 Sprints to prevent fatigue.

### Impediment Removal

- Maintain a visible impediment board. Track each impediment from identification to resolution.
- Distinguish team-solvable impediments from organizational ones. Escalate the latter immediately.
- Follow up on escalated impediments with a regular cadence; do not let them disappear into management queues.
- Celebrate resolved impediments to reinforce the value of raising them.

### Coaching

- Coach toward self-management: the goal is a team that does not need the Scrum Master for daily decisions.
- Use powerful questions: "What would happen if...?", "What have we tried before?", "What does the data tell us?"
- Introduce practices incrementally. One improvement per Sprint is sustainable; five is overwhelming.
- Model vulnerability and learning. Admit when a facilitation technique did not work and try something different.

### Organizational Advocacy

- Educate management on the Scrum framework and why its constraints exist.
- Protect the team from mid-Sprint scope changes by redirecting requests to the Product Owner.
- Advocate for sustainable pace. Track overtime and burnout indicators.
- Build a community of practice with other Scrum Masters in the organization.

---

## Developer Best Practices

### Sprint Execution

- Break Sprint Backlog items into tasks of 4 hours or less for better daily visibility.
- Swarm on one item at a time rather than starting everything in parallel. Finishing items is more valuable than starting them.
- Update the Sprint Backlog daily. Stale boards erode transparency.
- Raise impediments immediately, not at the next Daily Scrum.

### Technical Excellence

- Maintain a strong Definition of Done and resist pressure to weaken it for velocity.
- Write automated tests for every Increment. Manual-only testing creates a growing verification burden.
- Refactor continuously. Dedicated "tech debt Sprints" are a sign the DoD is too weak.
- Conduct code reviews or pair programming to spread knowledge and catch defects early.

### Collaboration

- Developers own the Sprint Backlog. Push back if the Product Owner or Scrum Master tries to assign tasks.
- Cross-train deliberately. Pair on unfamiliar areas to reduce knowledge silos.
- Communicate openly about progress, risks, and blockers. Surprises at Sprint Review are a failure of transparency.

---

## Sprint Event Best Practices

### Sprint Planning

- Start with the Sprint Goal, then select items that serve it. Avoid selecting items first and reverse-engineering a goal.
- Use historical velocity as a planning input, not a commitment target.
- Include capacity adjustments for holidays, on-call, and known distractions.
- End planning with a clear answer to: "Can we articulate the Sprint Goal? Do we have a plan to achieve it?"

### Daily Scrum

- Focus on coordination, not status. Question to answer: "Are we on track for the Sprint Goal? What needs to change?"
- Keep it to 15 minutes. Use a parking lot for deeper discussions.
- Developers run the meeting. Scrum Master attends only if coaching is needed.
- For distributed teams, consider async standup with synchronous follow-up for flagged items.

### Sprint Review

- Demonstrate working software, not slides. Stakeholders need to see and interact with the Increment.
- Collect feedback actively. Prepare specific questions for stakeholders.
- Update the Product Backlog based on feedback before the session ends.
- Celebrate accomplishments. Recognition fuels motivation.

### Sprint Retrospective

- Start by reviewing action items from the previous retrospective. Accountability drives improvement.
- Limit new action items to 1-3 with clear owners and target dates.
- Rotate formats to keep engagement high (Start/Stop/Continue, 4Ls, Sailboat, Mad/Sad/Glad, Timeline).
- Create psychological safety: what is said in the retro stays in the retro unless the team agrees otherwise.
- End with at least one positive observation to maintain morale.

---

## Artifact Best Practices

### Product Backlog

- Apply INVEST criteria to every item: Independent, Negotiable, Valuable, Estimable, Small, Testable.
- Use relative estimation (story points or T-shirt sizes) rather than hours for backlog items.
- Maintain a Product Goal that provides long-term direction beyond any single Sprint.
- Refine continuously; do not batch all refinement into a single session.

### Sprint Backlog

- The Sprint Backlog belongs to the Developers. It is their plan, not the Product Owner's mandate.
- Make the Sprint Backlog visible to all stakeholders for transparency.
- Update it daily during or after the Daily Scrum.
- Track remaining work to detect deviations from the plan early.

### Increment

- Every Sprint must produce a Done Increment, even if it is small.
- The Increment must be usable -- it is not a pile of partially complete features.
- Integrate continuously. Waiting until Sprint end to integrate increases risk.
- The Definition of Done applies uniformly to all items; no exceptions.

---

## Scaling Considerations

When operating with multiple Scrum Teams on a single product:

- Maintain a single Product Backlog managed by one Product Owner (possibly with delegates).
- Coordinate through Scrum of Scrums, shared refinement sessions, or frameworks like Nexus or LeSS.
- Align on a shared Definition of Done across teams to ensure Increment compatibility.
- Avoid component teams; prefer feature teams that can deliver end-to-end value.
- Minimize inter-team dependencies through architecture and backlog ordering.

---

## Metrics for Health Assessment

Use these metrics as diagnostic indicators, not targets:

| Metric | Healthy Signal | Warning Signal |
|--------|---------------|----------------|
| Velocity trend | Stable or gradually increasing | Erratic or declining |
| Sprint Goal success | Achieved most Sprints | Frequently missed |
| Carry-over rate | < 10% of planned items | > 20% carry-over |
| Cycle time | Consistent, within Sprint | Items frequently span Sprints |
| Retro action completion | > 80% completed on time | < 50% completed |
| Team happiness | Stable or improving | Declining trend |
| Escaped defects | Low and decreasing | Rising or spiking |
