---
description: Run a blunt, partner-grade teardown of a pitch deck with the missing slides, weak metrics, and hardest questions
argument-hint: [deck file path or pasted slides]
allowed-tools: Read
---

Run a full pitch-deck teardown using the `pre-seed-deck-teardown` skill.

Load and apply:
- `${CLAUDE_PLUGIN_ROOT}/skills/pre-seed-deck-teardown/SKILL.md`

Context:
- If `raise-brief.md` exists in the project root, read it first so the teardown is judged against the founder's actual stage, sector, round size, and traction.

If the deck is missing:
- Ask the founder to attach a file, paste the slide text, or share screenshots of each slide before proceeding.

Perform the teardown in this order:
1. Read the deck the way a partner at the founder's target stage and sector would.
2. Flag what is missing (the slide that should be there and is not).
3. Flag the weakest slide and the weakest metric, with a concrete reason.
4. List the 10 hardest questions each claim will draw, with a tight, honest answer for each.
5. List the data-room documents the founder needs ready to back the claims.

Be blunt. Prioritize the issues that would actually lose the room over cosmetic ones.
