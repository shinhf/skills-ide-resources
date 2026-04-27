---
description: Analyze changes and update module-arc42.md, Agents.md, and create MDRs when warranted
argument-hint: "[commit|branch|staged] [--base main] [--module path/to/module]"
allowed-tools: Read, Write, Glob, Grep, Bash(git:*)
---

Analyze code changes (PR, branch, commit) and update module-level architecture documentation. This command updates `module-arc42.md`, `Agents.md`, and creates new MDRs when the changes warrant architectural decisions.

Use the **module-arc42-architecture** skill for format knowledge and templates. Reference templates at:
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/module-arc42-template.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/agents-md-template.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/mdr-template.md`

## Arguments

Parse `$ARGUMENTS` for:

- **Change scope** (first positional argument, default: `branch`):
  - `commit` — Analyze the most recent commit
  - `branch` — Analyze all commits on the current branch vs base
  - `staged` — Analyze currently staged changes
- **`--base <branch>`** — Override the comparison base branch (default: `main`)
- **`--module <path>`** — Limit to a specific module (default: auto-detect from changed files)

## Update Process

### Step 1: Determine changes and affected modules

Run git diff commands to get the change set (same as `/advise-architecture-impact` Step 1-2).

Locate modules with existing `Architecture/module-arc42.md` files. Map changed files to modules.

If `--module` is specified, limit to that module. If no architecture docs exist for the module, suggest running `/create-module-arc42` first and stop.

### Step 2: Read existing architecture docs

For each affected module, read:
1. `Architecture/module-arc42.md` — Full content
2. `Agents.md` — Full content (at module root)
3. `Architecture/mdr/` — List all existing MDR files and read their titles/status

### Step 3: Analyze diff against each section

Read the actual diff content for the affected module. Map changes to module-arc42 sections:

**Section 1 (Purpose & Scope):**
- Check if module responsibility has expanded or contracted
- Look for new In Scope or Out of Scope areas

**Section 2 (Constraints):**
- Check for new technology dependencies
- Look for new platform or compatibility requirements

**Section 3 (Context):**
- Look for new HTTP endpoints, SignalR hubs, IPC channels
- Check for new external system integrations
- Verify existing channels are still accurate

**Section 4 (Solution Strategy):**
- Check for new architectural patterns (e.g., new use of CQRS, event sourcing)
- Look for new design decisions

**Section 5 (Building Block View):**
- Check for new projects, assemblies, or major components
- Look for restructured directory layouts
- Verify the tree structure matches current code

**Section 6 (Key Runtime Scenarios):**
- Check for new user-facing flows
- Look for changed orchestration patterns

**Section 7 (MDRs):**
- Will be updated if new MDRs are created in this run

### Step 4: Determine if MDRs are needed

A new MDR is warranted when the diff introduces:
- A new architectural pattern or approach
- A new communication channel or protocol
- A new structural component (layer, project, service)
- A technology decision (framework, library choice)
- A significant constraint or trade-off

For each warranted MDR:
1. Scan existing `Architecture/mdr/` to determine the next MDR number
2. Generate the MDR file using the template from `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/mdr-template.md`
3. Use the naming convention: `MDR-NNN-kebab-case-title.md`
4. Fill in Context from the diff and commit messages
5. Fill in Decision from the implementation approach visible in the code

### Step 5: Apply updates

Present all proposed changes to the user before applying:

```
## Proposed Architecture Updates for [module-name]

### module-arc42.md changes:
- Section 3 (Context): Add new row for [new channel]
- Section 5 (Building Blocks): Add [new component] to tree

### New MDR:
- MDR-009: [Title] — [brief description]

### Agents.md changes:
- Section 4 (Communication): Add new channel rule
- Section 7 (Safety Rails): Reference MDR-009

Proceed with updates? [Waiting for confirmation]
```

After user confirmation:

1. **Update `module-arc42.md`** — Edit only the affected sections, preserving all other content
2. **Create new MDR files** — Write to `Architecture/mdr/` with proper naming
3. **Update MDR links** — Add new MDR links to Section 7 of module-arc42.md
4. **Update `Agents.md`** — Sync changed sections to maintain consistency:
   - Communication table (Section 4) must match Context table (Section 3 of arc42)
   - Building blocks (Section 3) must match Section 5 of arc42
   - Safety rails (Section 7) must reference new MDRs

### Step 6: Report changes

Summarize what was done:

```
## Architecture Update Complete

### module-arc42.md
- Section 3: Added [channel description]
- Section 5: Updated building block tree

### New MDRs Created
- MDR-009: [Title] (Architecture/mdr/MDR-009-kebab-title.md)

### Agents.md
- Section 4: Added communication rule for [channel]
- Section 7: Added safety rail referencing MDR-009

### Verification
- All MDR links in section 7 are valid ✓
- Agents.md is consistent with module-arc42.md ✓
```
