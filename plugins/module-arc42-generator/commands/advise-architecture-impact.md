---
description: Analyze a PR/branch/commit and advise whether module architecture docs need updating
argument-hint: "[commit|branch|staged] [--base main] [--module path/to/module]"
allowed-tools: Read, Glob, Grep, Bash(git:*), AskUserQuestion
---

Analyze code changes and produce a **read-only advisory** on whether module-level architecture documentation needs updating. Do NOT modify any files.

Use the **module-arc42-architecture** skill for the module-arc42 format and change-to-section mapping rules. Reference `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/SKILL.md` for the impact assessment table.

## Arguments

Parse `$ARGUMENTS` for:

- **Change scope** (first positional argument, default: `branch`):
  - `commit` — Analyze the most recent commit
  - `branch` — Analyze all commits on the current branch vs base
  - `staged` — Analyze currently staged changes
- **`--base <branch>`** — Override the comparison base branch (default: `main`)
- **`--module <path>`** — Limit analysis to a specific module (default: auto-detect from changed files)

## Analysis Process

### Step 0: Clarify missing information

Before analyzing, confirm the required inputs are present and unambiguous. If any required input is missing, ambiguous, or contradictory -- for example, the comparison base is unclear (no `main` and no `--base`), the selected scope contains no changes, or no module in the repository has architecture docs to advise on -- use the **AskUserQuestion** tool to ask focused, structured questions (e.g. which base, which scope, which module) and wait for the answers before continuing. Do not guess a required input or silently apply a default when the choice materially changes the output; when you apply a documented default (scope `branch`, base `main`), state the assumption. Skip this step when all required information is already clear.

### Step 1: Determine the change set

Based on the scope argument, run the appropriate git command:

- **`commit`**: `git diff HEAD~1..HEAD --name-status` and `git diff HEAD~1..HEAD --stat`
- **`branch`**: `git diff <base>...HEAD --name-status` and `git diff <base>...HEAD --stat` (replace `<base>` with `--base` value). Also run `git log <base>...HEAD --oneline` to get commit count.
- **`staged`**: `git diff --cached --name-status` and `git diff --cached --stat`

Capture the list of changed files with their change type (Added/Modified/Deleted/Renamed) and the change magnitude per file.

### Step 2: Identify affected modules

Locate all modules that have architecture documentation by searching for `Architecture/module-arc42.md` files using Glob. Map each changed file to its parent module based on directory structure.

If `--module` is specified, limit analysis to that module only.

### Step 3: For each affected module, assess impact

Read the module's existing `module-arc42.md`, `Agents.md`, and list files in `mdr/` directory.

Map changed files to module-arc42 sections using the impact table from the skill:

| Change Type | Impacted Section(s) | MDR Needed? |
|-------------|-------------------|-------------|
| New API controller/endpoint | Section 3 (Context), Section 6 (Scenarios) | No |
| New project/assembly/package | Section 5 (Building Blocks) | Maybe |
| New communication channel | Section 3 (Context) | Yes |
| New architectural pattern | Section 4 (Strategy) | Yes |
| Changed scope/responsibility | Section 1 (Purpose & Scope) | No |
| New technology/framework | Section 2 (Constraints), Section 4 (Strategy) | Yes |
| New runtime flow | Section 6 (Scenarios) | No |
| Structural refactoring | Section 5 (Building Blocks) | Maybe |

For files that don't clearly map, read a sample of the diff content to determine relevance.

### Step 4: Classify by urgency

For each affected module, assign one of three verdicts:

- 🔴 **Requires update** — Structural changes that make existing docs incorrect or incomplete. New architectural patterns, new communication channels, new components.
- 🟡 **Consider update** — Significant changes that existing docs should reflect. Refactoring, changed contracts, new endpoints.
- 🟢 **No update needed** — Bug fixes, minor tweaks, test changes, documentation changes.

### Step 5: Cross-reference with existing docs

If existing architecture docs are found for the module:

1. Read the impacted sections
2. Provide specific guidance by comparing current content with changes. For example:
   - "Section 3 (Context) lists 4 communication channels but your changes add a new WebSocket endpoint"
   - "Section 5 (Building Blocks) does not include the new `Dodem.Analytics` project added in this branch"
   - "A new MDR is recommended for the caching strategy introduced in `CacheManager.cs`"

If no existing architecture docs are found for the module, note this and suggest running `/create-module-arc42` first.

### Step 6: Produce advisory report

Generate a structured report:

```
## Architecture Impact Advisory

**Change scope**: [commit/branch/staged] — [N commits, M files changed]

### Module: [module-name]
[🔴 Requires update | 🟡 Consider update | 🟢 No update needed]

**Impacted sections:**
| Section | Impact | Changed Files | Suggested Action |
|---------|--------|---------------|-----------------|
| ... | ... | ... | ... |

**New MDR recommended:**
- [MDR title suggestion and brief rationale]

### Module: [module-name-2]
🟢 No architecture update needed (test changes only)

---

### Quick Actions
- Run `/update-module-architecture [scope] --module [path]` to apply updates
- Run `/create-module-arc42 [path]` if no architecture docs exist
```

If no modules are impacted, report that no architecture documentation updates are needed.
