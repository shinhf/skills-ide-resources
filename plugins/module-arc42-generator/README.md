# arc42-architect

A Claude Code plugin for managing **module-level architecture documentation** in the simplified arc42 LITE format.

## What It Does

This plugin supports three documentation artifacts per module:

| Artifact | Purpose |
|----------|---------|
| `module-arc42.md` | 7-section simplified architecture document |
| `Agents.md` | AI context file with tech stack, conventions, and safety rails |
| `mdr/` directory | Module Decision Records (architectural decisions local to a module) |

## Commands

### `/advise-architecture-impact`

**Read-only advisory.** Analyzes a PR/branch/commit and tells you whether architecture docs need updating.

```
/advise-architecture-impact branch --base main
/advise-architecture-impact staged
/advise-architecture-impact commit
```

### `/update-module-architecture`

**PR-driven update.** Analyzes changes, updates `module-arc42.md`, and creates MDRs when warranted.

```
/update-module-architecture branch --base main --module DodemApps/DodemDestkopRuntime
/update-module-architecture staged
```

### `/create-module-arc42`

**Scaffold new module docs.** Generates all three artifacts for a module that doesn't have architecture docs yet.

```
/create-module-arc42 DodemApps/NewModule
```

## Skill

### `module-arc42-architecture`

Provides knowledge of the module-level arc42 LITE format, including:

- 7-section module-arc42 structure
- MDR (Module Decision Record) format
- Agents.md (AI context file) format
- Quality criteria and decision guidelines

## Agent

### `module-architecture-guardian`

Proactive agent that validates architecture documentation quality when docs are being created or modified.

## Relationship to Existing arc42 Tools

This plugin focuses on **module-level** (arc42 LITE) docs. The existing `arc42-documentation` skill and `/arc42-*` workflows handle **system-level** (full 12-section) documentation. They are complementary:

- **System level**: `arc42-documentation` skill → `/arc42-init`, `/arc42-generate`, `/arc42-review`, `/arc42-impact`
- **Module level**: `module-arc42-architecture` skill → `/create-module-arc42`, `/update-module-architecture`, `/advise-architecture-impact`
