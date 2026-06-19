---
name: Outreach Writer
description: This skill should be used when the user asks to "write outreach", "draft a cold email to [investor]", "LinkedIn DM for [investor]", "warm intro path", "write an investor email", "draft a phone opener", or needs investor outreach copy that references one real, specific signal per investor and sounds written by the founder, not by AI.
version: 0.1.0
tools: Read, Write
---

# Outreach Writer

Use this skill to write investor outreach copy that references one real, specific signal per investor, so messages read as written by the founder. Feed it one enriched investor and the one-line raise; it returns ready-to-approve openers.

## When To Use

Apply this skill when the founder wants to write outreach to a specific investor: a cold email, a LinkedIn DM, a phone opener, or to map a warm-intro path. It works one investor at a time, off real signals about that person.

## Inputs

- One enriched investor: name, fund, and at least one specific, real signal (a deal they recently led, something they posted about, a podcast they were on).
- The founder's one-line raise.
- Voice, tone, and rules, read from `raise-brief.md`. Read this first so every message sounds like the founder and respects their stated rules.

## What It Produces

From one enriched investor plus the one-line raise, produce three openers:

- **Email under 90 words.**
- **LinkedIn DM under 300 characters.**
- **One-sentence phone opener.**

Each one must reference one specific, real thing about that investor. The same generic line sent to everyone defeats the point.

## Rules

- One real, specific reference per message. No invented details: only signals actually present in the enriched investor.
- No flattery. No "hope this finds you well." No vision essay.
- Proof early: a number, a logo, or traction in the first lines, not buried.
- One clear ask per message.
- No big claims without numbers behind them.
- Look like a founder with priorities, not someone begging for attention.

## Warm Intro First

Always prefer a warm-intro path over a cold message. If a warm-intro vector exists for this investor, surface it and draft the intro-request copy first; treat cold email and DM as the fallback for when no warm path is available.

## Approval And Sending

The founder approves every message before it is sent. This plugin never sends anything: it has no outreach connectors and does not push messages anywhere. It drafts; the founder reviews, edits, and sends through their own tools.

## Reference

For the reusable LinkedIn sequence templates (opener, day-3 follow-up, day-7 final ping, each with MAIN and FALLBACK variants) and the full outreach rules, load:

`${CLAUDE_PLUGIN_ROOT}/skills/outreach-writer/references/message-templates.md`

Use the templates as a starting structure, then tailor each message with the one real signal for the specific investor.
