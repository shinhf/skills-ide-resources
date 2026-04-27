---
description: Scaffold new module architecture documentation (module-arc42.md, Agents.md, mdr/ directory)
argument-hint: "[module-path]"
allowed-tools: Read, Write, Glob, Grep, Bash(find:*, dir:*, git:*)
---

Generate a complete set of module-level architecture documentation for a module that does not yet have architecture docs. Creates three artifacts: `module-arc42.md`, `Agents.md`, and an empty `mdr/` directory.

Use the **module-arc42-architecture** skill for format knowledge and templates at:
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/module-arc42-template.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/agents-md-template.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/mdr-template.md`

## Arguments

Parse `$ARGUMENTS` for:

- **Module path** (first positional argument, required): Path to the module directory relative to the repository root (e.g., `DodemApps/DodemDestkopRuntime` or `DodemApps/WebFrontend`)

If no argument is provided, ask the user for the module path.

## Scaffolding Process

### Step 1: Validate module path

Check that the module path exists and does not already have architecture docs:
- If `Architecture/module-arc42.md` already exists, report this and suggest using `/update-module-architecture` instead
- If the path doesn't exist, report the error

### Step 2: Discover module characteristics

Scan the module directory to gather context:

**Project identity:**
- Read `README.md` if present
- Scan for project files (`*.csproj`, `package.json`, `pyproject.toml`, `Cargo.toml`, `*.sln`)
- Extract module name, description, and technology from project files

**Tech stack:**
- Identify languages and frameworks from project/dependency files
- Note testing frameworks
- Identify DI containers, logging frameworks, ORM tools

**Building blocks:**
- Map top-level directories as components
- Identify sub-components from second-level directories
- Note any layer patterns (Domain/, Application/, Infrastructure/, Api/)

**Communication patterns:**
- Search for API controllers, endpoints, hubs
- Look for IPC mechanisms (named pipes, gRPC, message queues)
- Scan for HTTP clients, SignalR connections
- Check for external service URLs in configuration files

**Dependencies on other modules:**
- Scan imports and project references
- Identify shared contracts or common libraries

**Existing decisions:**
- Check for any `adr/`, `mdr/`, or `decisions/` directories
- Look for architectural comments in code

### Step 3: Generate module-arc42.md

Read the template from `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/module-arc42-template.md`.

Fill in all 7 sections based on discovered information:

1. **Purpose & Scope** — From README and project files. Ask user to confirm In/Out of Scope if not clear.
2. **Constraints** — From project files, platform requirements, and detected dependencies.
3. **Context** — From discovered communication patterns. Build the From/To/Channel/Purpose table.
4. **Solution Strategy** — From detected patterns (DI, reactive, MVVM, etc.).
5. **Building Block View** — From directory structure analysis. Format as ASCII tree.
6. **Key Runtime Scenarios** — Infer 2-3 primary flows from controllers/handlers. Mark as draft if uncertain.
7. **MDRs** — Empty section (no MDRs yet).

Write to `[module-path]/Architecture/module-arc42.md`.

### Step 4: Generate Agents.md

Read the template from `${CLAUDE_PLUGIN_ROOT}/skills/module-arc42-architecture/references/agents-md-template.md`.

Fill in all 8 sections, ensuring consistency with module-arc42.md:

1. **AI Identity** — Based on detected tech stack and domain.
2. **Module Purpose & Scope** — Mirror Section 1 of module-arc42.md.
3. **Architecture Constraints & Building Blocks** — Mirror Sections 2 and 5 of module-arc42.md.
4. **Communication & Context** — Mirror Section 3 of module-arc42.md, adding enforcement rules.
5. **Key Runtime Scenarios** — Mirror Section 6 of module-arc42.md.
6. **Technology Stack & Conventions** — From detected tech stack and configuration files.
7. **Safety Rails & MDRs** — Empty until MDRs are created.
8. **Review Checklist** — Generate based on the module's specific constraints and patterns.

Write to `[module-path]/Agents.md`.

### Step 5: Create mdr/ directory

Create the `[module-path]/Architecture/mdr/` directory (empty, ready for future decision records).

### Step 6: Update Architecture README if it exists

Check if `[module-path]/Architecture/README.md` exists. If so, add a link to the new module. If not, create one with:

```markdown
# [Module Name] Architecture

## Modules

- [module-name](module-arc42.md)

## Notes

- Each module contains:
  - `module-arc42.md`
  - `Agents.md`
  - `mdr/`
```

### Step 7: Report and request review

Present a summary of what was created:

```
## Module Architecture Scaffolded

### Created Files:
1. `[module-path]/Architecture/module-arc42.md` — 7 sections populated
2. `[module-path]/Agents.md` — 8 sections populated
3. `[module-path]/Architecture/mdr/` — Empty directory

### Auto-detected:
- Tech stack: [detected technologies]
- Components: [N] top-level, [M] sub-components
- Communication channels: [N] detected
- Patterns: [detected patterns]

### Needs Manual Review:
- [ ] Section 1 (Purpose & Scope): Verify scope boundaries
- [ ] Section 3 (Context): Verify all communication channels
- [ ] Section 6 (Scenarios): Confirm key runtime flows
- [ ] Agents.md Section 7 (Safety Rails): Add specific rules

### Next Steps:
- Review and refine the generated documentation
- Create initial MDRs for key architectural decisions with `/create-mdr`
- Run `/review-architecture` to check completeness
```
