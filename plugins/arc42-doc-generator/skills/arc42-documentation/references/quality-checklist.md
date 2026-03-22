# Quality Checklist

Per-section completeness criteria organized by documentation profile (Essential / Lean / Thorough). Use this checklist when reviewing arc42 documentation or validating generated content.

## Rating Scale

| Rating | Description |
|--------|-------------|
| **Empty** | Section file exists but has no meaningful content |
| **Stub** | Headings and structure present, minimal or placeholder content |
| **Draft** | Substantive content but incomplete, may have gaps |
| **Adequate** | Covers required subsections with reasonable depth |
| **Thorough** | Comprehensive coverage with diagrams, examples, and cross-references |
| **Exemplary** | Publication-quality with complete diagrams, concrete scenarios, and maintained accuracy |

---

## Section 1: Introduction and Goals

**Required in:** Essential, Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| 1.1 Requirements overview present | Required | Required | Required |
| At least 3 functional requirements listed | -- | Required | Required |
| Requirements linked to external docs | -- | -- | Required |
| 1.2 Quality goals table present | Required | Required | Required |
| At least 3 quality goals with scenarios | Required | Required | Required |
| Quality goals ordered by priority | -- | Required | Required |
| 1.3 Stakeholders table present | -- | Required | Required |
| At least 3 stakeholder roles | -- | Required | Required |
| Contact information populated | -- | -- | Required |
| **Cross-reference**: Quality goals match Section 10 | -- | -- | Required |

---

## Section 2: Architecture Constraints

**Required in:** Lean, Thorough (may be omitted if no external constraints exist)

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| Section present (or explicitly omitted with reason) | -- | Required | Required |
| Technical constraints table | -- | Required | Required |
| Organizational constraints documented | -- | -- | Required |
| Development conventions listed | -- | Required | Required |
| **Staleness check**: Runtime versions match actual project files | -- | Required | Required |

---

## Section 3: Context and Scope

**Required in:** Essential, Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| 3.1 Business context present | Required | Required | Required |
| Business context diagram (Mermaid) | Required | Required | Required |
| All external actors/systems labeled | Required | Required | Required |
| Communication partner table with I/O | -- | Required | Required |
| 3.2 Technical context present | -- | Required | Required |
| Technical context diagram (Mermaid) | -- | Required | Required |
| Protocols and channels documented | -- | Required | Required |
| Interface table with formats | -- | -- | Required |
| **Staleness check**: External dependencies match docker-compose / env vars | Required | Required | Required |

---

## Section 4: Solution Strategy

**Required in:** Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| Technology decisions table | -- | Required | Required |
| At least 3 technology decisions | -- | Required | Required |
| Rationale for each decision | -- | Required | Required |
| Quality goal -> approach mapping | -- | -- | Required |
| Organizational decisions | -- | -- | Required |
| **Staleness check**: Tech stack matches actual dependency files | -- | Required | Required |

---

## Section 5: Building Block View

**Required in:** Essential, Lean, Thorough (most important section)

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| 5.1 Level 1 whitebox diagram (Mermaid) | Required | Required | Required |
| Building blocks table (name, responsibility) | Required | Required | Required |
| Code location for each building block | -- | Required | Required |
| All top-level modules represented | Required | Required | Required |
| 5.2 Level 2 for important blocks | -- | -- | Required |
| Level 2 diagrams for decomposed blocks | -- | -- | Required |
| Interface descriptions | -- | -- | Required |
| **Staleness check**: Modules match actual directory structure | Required | Required | Required |
| **Cross-reference**: Building blocks appear in Section 7 mapping | -- | Required | Required |

---

## Section 6: Runtime View

**Required in:** Thorough (recommended for Lean)

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| At least 1 runtime scenario | -- | Recommended | Required |
| At least 3 runtime scenarios | -- | -- | Required |
| Sequence diagrams (Mermaid) | -- | Recommended | Required |
| Step-by-step descriptions | -- | Recommended | Required |
| Error/exception scenarios | -- | -- | Required |
| Scenarios are architecturally relevant (not trivial CRUD) | -- | Required | Required |

---

## Section 7: Deployment View

**Required in:** Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| Infrastructure Level 1 diagram (Mermaid) | -- | Required | Required |
| Building block to infrastructure mapping table | -- | Required | Required |
| Environment overview (dev/staging/prod) | -- | Required | Required |
| Infrastructure Level 2 details | -- | -- | Required |
| Network topology documented | -- | -- | Required |
| **Staleness check**: Matches Dockerfile / K8s manifests / docker-compose | -- | Required | Required |

---

## Section 8: Crosscutting Concepts

**Required in:** Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| At least 2 concept categories covered | -- | Required | Required |
| Security/authentication documented | -- | Required | Required |
| Development concepts (build/test/deploy) | -- | -- | Required |
| Operational concepts (logging, monitoring) | -- | -- | Required |
| Domain model documented | -- | -- | Required |
| Architecture patterns explained | -- | -- | Required |

---

## Section 9: Architecture Decisions

**Required in:** Essential, Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| At least 1 documented decision | Required | Required | Required |
| At least 3 documented decisions | -- | Required | Required |
| ADR format (context, decision, consequences) | Required | Required | Required |
| Status field present (accepted/deprecated/superseded) | -- | Required | Required |
| Existing project ADRs incorporated | Required | Required | Required |
| Decisions linked to quality goals | -- | -- | Required |

---

## Section 10: Quality Requirements

**Required in:** Thorough (recommended for Lean)

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| 10.1 Quality tree diagram (Mermaid mindmap) | -- | -- | Required |
| 10.2 Quality scenarios table | -- | Recommended | Required |
| At least 3 quality scenarios | -- | -- | Required |
| Measurable metrics/targets | -- | -- | Required |
| **Cross-reference**: Links back to Section 1.2 quality goals | -- | -- | Required |

---

## Section 11: Risks and Technical Debt

**Required in:** Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| At least 1 risk or debt item | -- | Required | Required |
| Priority ordering | -- | Required | Required |
| Impact assessment | -- | -- | Required |
| Mitigation/remediation plans | -- | Required | Required |
| TODO/FIXME scan results incorporated | -- | Required | Required |
| **Staleness check**: Deprecated items still present in codebase | -- | Required | Required |

---

## Section 12: Glossary

**Required in:** Essential, Lean, Thorough

| Criterion | Essential | Lean | Thorough |
|-----------|-----------|------|----------|
| At least 5 domain terms | Required | Required | Required |
| At least 10 terms | -- | Required | Required |
| Definitions are concrete (not vague) | Required | Required | Required |
| Domain model terms included | -- | Required | Required |
| API resource terms included | -- | -- | Required |
| Terms sorted alphabetically | -- | Required | Required |

---

## Cross-Section Consistency Checks

These checks apply across multiple sections:

| Check | Sections Involved | Criterion |
|-------|------------------|-----------|
| Quality goals consistency | 1.2 <-> 10 | Every quality goal in Section 1.2 has a corresponding scenario in Section 10 |
| Building block completeness | 5 <-> 7 | Every building block in Section 5 appears in the deployment mapping in Section 7 |
| Tech stack accuracy | 4 <-> actual deps | Technology decisions in Section 4 match actual dependency files |
| Context completeness | 3 <-> docker-compose | All services in docker-compose appear in the context diagram |
| Decision traceability | 4 <-> 9 | Major technology decisions in Section 4 have corresponding ADRs in Section 9 |
| Constraint accuracy | 2 <-> actual configs | Constraints in Section 2 match actual linter/CI/runtime configs |
| Glossary coverage | 12 <-> 5, 8 | Key terms from building blocks and domain model appear in glossary |

---

## Review Report Template

Use this format when producing a review report:

```markdown
## Arc42 Documentation Review Report

### Overall Score: X/100

### Profile Evaluated: [Essential | Lean | Thorough]

### Section Ratings

| # | Section | Completeness | Quality | Accuracy | Rating |
|---|---------|-------------|---------|----------|--------|
| 1 | Introduction and Goals | X% | [Good/Fair/Poor] | [Current/Stale] | [Rating] |
| ... | ... | ... | ... | ... | ... |

### Top Issues (ordered by priority)

1. [STALE] ...
2. [INCOMPLETE] ...
3. [INACCURATE] ...
4. [MISSING] ...

### Recommendations

1. ...
2. ...

### Cross-Section Issues

1. ...
```

## Scoring Guidelines

- **Completeness** (0-100%): Percentage of required criteria met for the evaluated profile
- **Quality**: Good (concrete, specific, useful), Fair (present but vague), Poor (placeholder or buzzwordy)
- **Accuracy**: Current (matches codebase), Stale (codebase has changed), Inaccurate (contradicts codebase)
- **Overall Score**: Weighted average -- Section 5 counts double, Sections 1 and 3 count 1.5x, others count 1x
