---
description: Create a historical MDR from existing code and user input
argument-hint: "[module-path] [decision description...]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git:*)
---

Create a **historical Module Decision Record (MDR)** — a decision that is already embodied in a module's existing code but was never written down. Reconstruct the Context, Decision, and Consequences from the current code plus the user's description, then write a properly numbered MDR and cross-link it into the module's docs.

This command is for **backfilling** decisions already present in the code (no diff required). For change-driven MDRs derived from a PR/branch/commit diff, use `/update-module-architecture` instead.

Use the **module-arc42-architecture** skill for format knowledge and templates. Reference templates at:
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/mdr-template.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/module-arc42-template.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/agents-md-template.md`

## Arguments

Parse `$ARGUMENTS` for:

- **Module path** (first positional argument, required): Path to the module directory relative to the repository root (e.g., `DodemApps/DodemDestkopRuntime`).
- **Decision description** (remaining text, optional): A free-text description of the decision to document (e.g., "we use a named pipe for runner↔runtime IPC").

## Process

### Step 1: Resolve module and decision input

1. If no module path is provided, ask the user for it.
2. Verify `[module-path]/Architecture/module-arc42.md` exists. If it does NOT, report this and suggest running `/create-module-arc42 [module-path]` first, then stop.
3. If the decision description is missing or too vague to identify a single decision, use **AskUserQuestion** to ask:
   - What architectural decision should be documented?
   - Which components, files, or directories embody this decision? (optional)

A historical MDR documents exactly one decision. If the user describes several, document the most significant one and offer to repeat for the others.

### Step 2: Gather evidence from existing code

Reconstruct *why* the code looks the way it does:

- Read the README, project/dependency files, and any files or components the user named.
- Use Grep/Glob to find the code that implements the decision (the relevant pattern, channel, component, or library usage).
- Identify the forces at play: constraints, alternatives the code rules out, and trade-offs visible in the implementation.

**Recover the historical date and rationale** (this is what makes the MDR "historical"):
- `git log --follow --diff-filter=A -- <key-file>` to find when the decision first entered the code.
- `git log --oneline -- <key-files>` / `git blame` on the key lines to recover commit messages explaining the original rationale.
- Use the earliest relevant commit date as the MDR Date when one can be determined; otherwise ask the user for the approximate date.

### Step 3: Determine the next MDR number

Scan `[module-path]/Architecture/mdr/` for existing `MDR-NNN-*.md` files. Take the highest number, increment by one, and zero-pad to three digits (per the naming convention in `mdr-template.md`). If the directory does not exist yet, start at `MDR-001`.

### Step 4: Draft the MDR

Fill the template from `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/mdr-template.md`:

- **Status** — `Accepted` (the decision is already live in the code), unless the user indicates it is deprecated or superseded.
- **Date** — From git history (Step 2) when available; otherwise the date the user provides.
- **Context** — The problem and forces reconstructed from the code and git history.
- **Decision** — What was decided and how it works, described from the actual implementation. Be specific about components, protocols, and data flows.
- **Consequences** — Positive and Negative, based on the trade-offs visible in the code.
- **Related** — Links to any existing MDRs in the module that touch the same area.

Use the **extended (Mermaid) template** when the decision involves a flow or sequence.

Name the file `MDR-NNN-kebab-case-title.md`.

### Step 5: Confirm before writing

Present the drafted MDR to the user for review:

```
## Proposed historical MDR for [module-name]

**File:** Architecture/mdr/MDR-NNN-kebab-title.md
**Status:** Accepted   **Date:** YYYY-MM-DD (from git history of <file>)

[Full drafted MDR content]

### Cross-links to be added:
- module-arc42.md Section 7: link to MDR-NNN
- Agents.md Section 7 (Safety Rails): reference MDR-NNN

Proceed? [Waiting for confirmation]
```

### Step 6: Write and cross-link

After confirmation:

1. **Write** the MDR to `[module-path]/Architecture/mdr/MDR-NNN-kebab-title.md` (create the `mdr/` directory if needed).
2. **Edit** `[module-path]/Architecture/module-arc42.md` — add the link to **Section 7 (Module-level MDRs)**:
   `- [MDR-NNN: Title](mdr/MDR-NNN-kebab-title.md)`
3. **Edit** `[module-path]/Agents.md` — add a reference to the MDR under **Section 7 (AI Safety Rails & MDRs)**, keeping it consistent with `module-arc42.md`.

Edit only the affected sections; preserve all other content.

### Step 7: Report

```
## Historical MDR Created

- Created: Architecture/mdr/MDR-NNN-kebab-title.md (Status: Accepted, Date: YYYY-MM-DD)
- module-arc42.md Section 7: added link to MDR-NNN
- Agents.md Section 7: added safety-rail reference to MDR-NNN

### Verification
- MDR follows the template structure ✓
- Section 7 link resolves to the new file ✓
- Agents.md is consistent with module-arc42.md ✓

### Next Steps
- Run `/create-mdr [module-path] [another decision]` to document additional historical decisions.
```
