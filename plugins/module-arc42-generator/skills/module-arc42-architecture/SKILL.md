---
name: Module Arc42 Architecture
description: This skill should be used when the user asks to "create module architecture", "module-arc42", "arc42 lite", "module decision record", "create MDR", "update module architecture", "Agents.md", "AI context file", "building block view for module", "module architecture template", "simplified arc42", or needs guidance on creating, updating, or reviewing module-level architecture documentation in the arc42 LITE format with MDRs and Agents.md files.
version: 0.1.0
---

# Module-Level Arc42 Architecture Documentation

Manage module-level architecture documentation using the simplified arc42 LITE format. This format is designed for individual modules within a modular monolith or multi-module repository, as opposed to the full 12-section system-level arc42.

## Hub & Spoke Documentation Model

Architecture documentation follows a two-level hierarchy:

- **Hub (System)** — One system-level arc42 document describing the entire product (full 12 sections). Managed by the `arc42-documentation` skill and `/arc42-*` workflows.
- **Spoke (Module)** — A simplified document per module plus supporting files. Managed by **this** skill.

Each module produces three artifacts:

| Artifact | Location | Purpose |
|----------|----------|---------|
| `module-arc42.md` | `Architecture/module-arc42.md` | 7-section simplified architecture doc |
| `Agents.md` | Module root (e.g., `ModuleName/Agents.md`) | AI agent context file |
| `mdr/` directory | `Architecture/mdr/` | Module Decision Records |

## Module Arc42 LITE — 7 Sections

### Section 1: Module Purpose & Scope

Document what the module does, what business problem it solves, and explicit scope boundaries.

**Required elements:**
- Purpose statement (1-3 sentences)
- In Scope list (what the module covers)
- Out of Scope list (what it explicitly does NOT cover)

### Section 2: Constraints

Document technical, regulatory, and organizational constraints.

**Required elements:**
- Technology constraints (platform, framework, runtime)
- Dependencies on other modules
- Cross-platform or compatibility requirements

### Section 3: Context

Document communication paths as a table with columns: From, To, Channel, Purpose.

**Required elements:**
- All inter-module communication channels
- All external system integrations
- Protocol/transport for each channel (HTTP, SignalR, Named Pipes, etc.)

### Section 4: Solution Strategy

Document the key architectural patterns and decisions driving the module.

**Required elements:**
- Primary patterns (e.g., MVVM, CQRS, Event-driven)
- Responsibility boundaries
- Key design decisions (brief)

### Section 5: Building Block View

Document the module's internal structure as an ASCII tree or Mermaid diagram.

**Required elements:**
- Top-level components/projects
- Key sub-components within each
- Layer/folder structure

### Section 6: Key Runtime Scenarios

Document 2-4 of the most architecturally significant flows.

**Required elements:**
- Numbered step-by-step flows
- Which components participate in each step
- Communication channels used

### Section 7: Module-level MDRs

Link all Module Decision Records with descriptive titles.

**Format:** `- [MDR-NNN: Title](mdr/MDR-NNN-kebab-title.md)`

## MDR (Module Decision Record) Format

Each MDR follows this structure:

1. **Title** — `# MDR-NNN: Descriptive Title`
2. **Status** — Accepted | Proposed | Deprecated | Superseded
3. **Date** — ISO date (YYYY-MM-DD)
4. **Context** — Problem description and forces at play
5. **Decision** — What was decided and how it works
6. **Consequences** — Positive and Negative subsections
7. **Related** — Links to related MDRs

**Naming convention:** `MDR-NNN-kebab-case-title.md` (e.g., `MDR-001-paired-runtime-managed-by-runner.md`)

### When to Create an MDR

Create a new MDR when a code change introduces:
- A new architectural pattern or approach
- A new communication channel or protocol
- A new structural component (layer, project, service)
- A technology decision (framework, library choice)
- A significant constraint or trade-off

Do NOT create an MDR for:
- Bug fixes
- Minor refactoring that preserves architecture
- Test additions
- Documentation-only changes

## Agents.md Format

The AI context file provides structured context for AI tools working within the module.

**Required sections:**
1. AI Identity and Persona
2. Module Purpose & AI Agent Scope (In Scope / Out of Scope)
3. Architecture Constraints & Building Blocks
4. Communication & Context (channel table with rules)
5. Key Runtime Scenarios & Implementation Flow
6. Technology Stack & Coding Conventions
7. AI Safety Rails & Module Decision Records (MDRs)
8. Internal Agent Review Checklist

## Assessing Architecture Impact of Code Changes

To determine whether a code change requires architecture documentation updates, map changed files to module-arc42 sections:

| Change Type | Impacted Section(s) |
|-------------|-------------------|
| New API controller/endpoint | Section 3 (Context), Section 6 (Scenarios) |
| New project/assembly/package | Section 5 (Building Blocks) |
| New communication channel | Section 3 (Context), needs MDR |
| New architectural pattern | Section 4 (Strategy), needs MDR |
| Changed scope/responsibility | Section 1 (Purpose & Scope) |
| New technology/framework | Section 2 (Constraints), Section 4 (Strategy), needs MDR |
| New runtime flow | Section 6 (Scenarios) |
| Structural refactoring | Section 5 (Building Blocks), may need MDR |

## Additional Resources

### Reference Files

For concrete templates based on real Dodem module examples, consult:

- **`references/module-arc42-template.md`** — Full 7-section template with placeholder guidance
- **`references/agents-md-template.md`** — Complete Agents.md template with all sections
- **`references/mdr-template.md`** — MDR template with format and naming conventions
