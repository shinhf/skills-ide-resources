# MDR (Module Decision Record) — Template

Use this template when creating a new MDR in the `Architecture/mdr/` directory.

## Naming Convention

**File name:** `MDR-NNN-kebab-case-title.md`

Examples:
- `MDR-001-paired-runtime-managed-by-runner.md`
- `MDR-002-bidirectional-named-pipe-ipc.md`
- `MDR-007-screenshot-capture-and-transfer-via-filesystem.md`

**Numbering:**
- Use zero-padded three-digit numbers (001, 002, ..., 010, ..., 100)
- Numbers are sequential per module
- Scan existing MDRs to determine next number

---

## Template

```markdown
# MDR-NNN: Descriptive Title

## Status

[Accepted | Proposed | Deprecated | Superseded by MDR-XXX]

## Date

[YYYY-MM-DD]

## Context

[Describe the problem, the forces at play, and why a decision is needed.
Include relevant technical constraints, business requirements, and trade-offs.
This should be 2-5 paragraphs explaining the situation clearly.]

## Decision

[Describe what was decided and how it works.
Be specific about the approach, components involved, and implementation strategy.
Include code patterns, protocols, or data flows when relevant.
This is the most important section — another developer should understand
exactly what was decided by reading this.]

## Consequences

### Positive

- [Benefit 1],
- [Benefit 2],
- [Benefit 3].

### Negative

- [Drawback 1],
- [Drawback 2].

## Related

- [MDR-NNN: Related decision title](MDR-NNN-related-kebab-title.md)
- [MDR-NNN: Another related decision](MDR-NNN-another-kebab-title.md)
```

---

## Extended Template (with Diagrams)

For decisions involving complex flows, include a Mermaid diagram:

```markdown
# MDR-NNN: Descriptive Title

## Status

Accepted

## Date

YYYY-MM-DD

## Context

[Problem description...]

## Decision

[Decision description...]

## [Flow/Sequence] Diagram

\`\`\`mermaid
sequenceDiagram
    participant A as ComponentA
    participant B as ComponentB
    participant C as ExternalSystem

    A->>B: Step 1 description
    B->>C: Step 2 description
    C-->>B: Step 3 response
    B-->>A: Step 4 result
\`\`\`

## Consequences

### Positive

- [Benefits...]

### Negative

- [Drawbacks...]

## Related

- [Links to related MDRs...]
```

---

## Quality Criteria

| Aspect | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Context | States the problem | + Forces and constraints | + Alternative options considered |
| Decision | States what was chosen | + How it works | + Implementation details and diagrams |
| Consequences | Lists positive/negative | + Specific trade-offs | + Mitigation strategies |
| Related | Links exist | Bidirectional links | + Rationale for relationships |

## When NOT to Create an MDR

- Bug fixes that don't change architecture
- Minor refactoring preserving the same patterns
- Test additions or documentation changes
- Dependency version bumps (unless major with breaking changes)
- Configuration changes within established patterns
