---
description: Draft cold outreach (email, LinkedIn DM, phone opener) that references one real, specific thing and does not sound like AI
argument-hint: [investor details / enriched row]
allowed-tools: Read, Write
---

Draft investor outreach using the `outreach-writer` skill.

Load and apply:
- `${CLAUDE_PLUGIN_ROOT}/skills/outreach-writer/SKILL.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/outreach-writer/references/message-templates.md`

Context:
- If `raise-brief.md` exists in the project root, read it first so the messages carry the founder's one-line raise, tone rules, and traction.

If investor details are missing:
- Ask for the investor's name, fund, and at least one specific, real signal to reference (a recent post, a podcast, a deal they led).

Write three openers from one investor's details:
1. An email under 90 words.
2. A LinkedIn DM under 300 characters.
3. A one-sentence phone opener.

Rules:
- Each message must reference one specific, real thing about the investor.
- No flattery, no "hope this finds you well," no generic AI phrasing.
- The founder approves every message before it is sent; never claim to send.

If asked, save the drafts to a file the founder names.
