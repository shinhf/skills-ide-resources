# Module Arc42 LITE — Template

Use this template when creating `Architecture/module-arc42.md` for a new module. Replace all `[PLACEHOLDER]` values with module-specific content.

---

```markdown
# [MODULE-NAME] module - docs Arc42 LITE

## 1. Module Purpose & Scope

### Purpose

`[module-name]` is the [brief description] module composed of:

- `[Component1]` ([technology/role]),
- `[Component2]` ([technology/role]),
- `[Component3]` ([technology/role]).

Together they provide [high-level capability description].

### In Scope

- [capability 1],
- [capability 2],
- [capability 3],
- [capability 4].

### Out of Scope

- [explicitly excluded area 1],
- [explicitly excluded area 2],
- [explicitly excluded area 3].

## 2. Constraints

- `[Component1]` must [constraint description].
- [Future-proofing constraint].
- `[Component2]` is [platform constraint] and must [operational constraint].
- [Communication/integration constraint].

## 3. Context

| From | To | Channel | Purpose |
|---|---|---|---|
| `[Component1]` | `[Component2]` | [Protocol] (`[endpoint]`) | [Purpose] |
| `[Component2]` | `[Component1]` | [Protocol] | [Purpose] |
| `[Component2]` | `[ExternalSystem]` | [Protocol] | [Purpose] |
| `[Supervisor]` | [Components] | [Mechanism] | [Purpose] |

## 4. Solution Strategy

- [Strategy 1: e.g., Split UI and orchestration responsibilities].
- [Strategy 2: e.g., Keep transport hidden behind factories].
- [Strategy 3: e.g., Use reactive streams for state propagation].
- [Strategy 4: e.g., Use supervisor for lifecycle coupling].

## 5. Building Block View

\`\`\`text
[TopLevelComponent]
  ├── [Component1] ([Technology])
  │   ├── [SubComponent1]
  │   ├── [SubComponent2]
  │   └── [SubComponent3]
  └── [Component2] ([Technology])
      ├── [SubComponent1]
      ├── [SubComponent2]
      └── [SubComponent3]
\`\`\`

## 6. Key Runtime Scenarios

### A) [Scenario Name]

1. [Step 1 description].
2. [Step 2 description].
3. [Step 3 description].

### B) [Scenario Name]

1. [Step 1 description].
2. [Step 2 description].
3. [Step 3 description].
4. [Step 4 description].
5. [Step 5 description].

### C) [Scenario Name]

1. [Step 1 description].
2. [Step 2 description].
3. [Step 3 description].

### D) [Scenario Name]

1. [Step 1 description].
2. [Step 2 description].
3. [Step 3 description].
4. [Step 4 description].

## 7. Module-level MDRs

- [MDR-001: Descriptive title](mdr/MDR-001-kebab-case-title.md)
- [MDR-002: Descriptive title](mdr/MDR-002-kebab-case-title.md)
```

---

## Quality Criteria

A complete module-arc42 should satisfy:

| Section | Minimum | Good | Excellent |
|---------|---------|------|-----------|
| 1. Purpose & Scope | Purpose + In Scope | + Out of Scope | + Team/owner |
| 2. Constraints | 1-2 constraints | 3+ constraints | + future-proofing |
| 3. Context | 2+ channels | All channels with protocols | + purpose per channel |
| 4. Strategy | 1-2 strategies | 3+ patterns | + rationale per strategy |
| 5. Building Blocks | Top-level tree | 2-level tree | + technology annotations |
| 6. Scenarios | 1 scenario | 2-3 scenarios | 4+ with component mapping |
| 7. MDRs | Links exist | Descriptive titles | All decisions documented |
