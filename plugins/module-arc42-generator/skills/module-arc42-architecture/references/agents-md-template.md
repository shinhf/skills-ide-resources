# Agents.md — AI Context File Template

Use this template when creating `Agents.md` at the module root. This file provides structured context for AI tools working within the module.

---

```markdown
# AI Agent Instructions: [Module Name] Module

## 1. AI Identity and Persona
You are an expert [technology/domain] AI programming assistant specializing in [specific domains]. Your objective is to build, refactor, and debug the `[module-name]` module for the [project-name] project.
You act as a strict guardian of the solution strategy, architectural constraints, and communication patterns outlined below.

## 2. Module Purpose & AI Agent Scope
**Your Domain:** `[module-name]` is the [brief description] module that provides [capabilities].

**In Scope for you to modify:**
- [Area 1 description].
- [Area 2 description].
- [Area 3 description].

**Out of Scope (Do NOT attempt to modify or invent behavior for these areas):**
- [Excluded area 1].
- [Excluded area 2].
- [Excluded area 3].

## 3. Architecture Constraints & Building Blocks
Whenever you propose code changes, you MUST enforce the following structural constraints:
- **[Constraint 1]:** [Description].
- **[Constraint 2]:** [Description].
- **[Constraint 3]:** [Description].

**Building Block View (Your Working Directory Focus):**
\`\`\`text
[TopLevelComponent]
  ├── [Component1]
  │   ├── [SubComponent1]
  │   └── [SubComponent2]
  └── [Component2]
      ├── [SubComponent1]
      └── [SubComponent2]
\`\`\`

## 4. Communication & Context (The "Brain" of the App)
You must understand and explicitly respect how data flows within the runtime. NEVER break these communication boundaries:

| From | To | Channel | Purpose / Rule |
|---|---|---|---|
| `[Component1]` | `[Component2]` | [Protocol] | [Purpose]. **Rule:** [Enforcement rule]. |
| `[Component2]` | `[Component1]` | [Protocol] | [Purpose]. **Rule:** [Enforcement rule]. |
| `[Component2]` | `[ExternalSystem]` | [Protocol] | [Purpose]. **Rule:** [Enforcement rule]. |

## 5. Key Runtime Scenarios & Implementation Flow
When implementing or modifying functionality related to these key scenarios, strictly follow these orchestration steps:

1. **[Scenario A]:** [Step-by-step flow description].
2. **[Scenario B]:** [Step-by-step flow description].
3. **[Scenario C]:** [Step-by-step flow description].

## 6. Technology Stack & Coding Conventions
- **[Language / Framework]** (Core ecosystem)
- **[Pattern 1]:** [Convention description].
- **[Pattern 2]:** [Convention description].
- **[DI Framework]:** [Convention description].
- **[Logging]:** [Convention description with ADR reference].

## 7. AI Safety Rails & Module Decision Records (MDRs)
Apply these rules to every line of code you review or write. They represent strict architectural boundaries:

- **[Rule Category] ([MDR references]):** [Rule description].
- **[Rule Category] ([MDR references]):** [Rule description].
- **[Rule Category] ([MDR references]):** [Rule description].

## 8. Internal Agent Review Checklist
Before outputting any code modifications, internally evaluate your logic against this checklist:
1. Does the change respect the architectural split between [components]?
2. Is the communication using the correct channel as outlined in section 4?
3. Are new features implemented following [required patterns]?
4. Is [specific constraint] being respected?
5. Is [logging/observability requirement] being followed?
```

---

## Quality Criteria

A complete Agents.md should satisfy:

| Section | Required | Purpose |
|---------|----------|---------|
| 1. Identity | Yes | Establishes AI persona and domain expertise |
| 2. Scope | Yes | Prevents AI from modifying out-of-scope areas |
| 3. Constraints | Yes | Enforces architectural boundaries |
| 4. Communication | Yes | Prevents wrong-channel usage |
| 5. Scenarios | Yes | Guides implementation patterns |
| 6. Tech Stack | Yes | Ensures correct technology choices |
| 7. Safety Rails | Yes | Links MDRs to enforceable rules |
| 8. Checklist | Yes | Final validation before output |

## Consistency Rules

The Agents.md file must be consistent with `module-arc42.md`:

- Scope boundaries in Section 2 must match Section 1 of module-arc42
- Building blocks in Section 3 must match Section 5 of module-arc42
- Communication table in Section 4 must match Section 3 of module-arc42
- Scenarios in Section 5 must match Section 6 of module-arc42
- MDR references in Section 7 must match Section 7 of module-arc42
