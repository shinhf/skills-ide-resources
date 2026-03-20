# Analysis Templates

Structured templates for producing DS/ML documentation analysis reports. Use these templates when generating analysis output in Step 5 and during report generation.

## Template 1: Comprehensive Analysis Report

```markdown
# DS/ML Analysis: [System Name]

**Analysis Date**: [Date]
**Documentation Scope**: [List of files/sections analyzed]
**System Type**: [Agent framework / LLM API / ML platform / Orchestration engine / etc.]

---

## Executive Summary

[2-3 sentences summarizing the system's overall DS/ML capabilities. Include the primary strengths, the total number of identified scenarios, and the top recommendation.]

**Key Findings:**
- Total scenarios identified: [N]
- Direct support: [N] | Composition required: [N] | Extension needed: [N]
- Primary strength: [e.g., "Multi-agent orchestration for complex ML workflows"]
- Critical gap: [e.g., "No built-in evaluation or benchmarking framework"]

---

## System Capability Inventory

| Capability | Description | DS Relevance |
|-----------|-------------|--------------|
| [Capability 1] | [Brief description] | [High/Medium/Low] |
| [Capability 2] | [Brief description] | [High/Medium/Low] |
| ... | ... | ... |

---

## Identified Data Science Scenarios

### [Category 1: e.g., NLP/Text Processing]

#### Scenario: [Scenario Name]
- **Problem Type**: [Classification / Generation / Extraction / etc.]
- **Feasibility**: [Direct / Composition / Extension / Theoretical]
- **Production Readiness**: [Prototype / Production / Enterprise]
- **Documentation Evidence**: [Specific files, sections, or APIs referenced]
- **Implementation Sketch**:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Example Use Case**: [Concrete, actionable example]
- **Key Dependencies**: [Required capabilities or integrations]
- **Estimated Complexity**: [Low / Medium / High]

[Repeat for each scenario in category]

### [Category 2: e.g., RAG/Retrieval]
[Same structure]

### [Category N]
[Same structure]

---

## Problem-Scenario Matrix

| Problem Type | Scenario Count | Feasibility Breakdown | Top Scenario |
|-------------|---------------|----------------------|--------------|
| Classification | [N] | [N] Direct, [N] Composition, [N] Extension | [Best scenario] |
| Generation | [N] | ... | ... |
| Extraction | [N] | ... | ... |
| Retrieval | [N] | ... | ... |
| Reasoning | [N] | ... | ... |
| Orchestration | [N] | ... | ... |
| Evaluation | [N] | ... | ... |

---

## Feasibility Assessment

### Direct Support (Ready to Use)
| Scenario | Evidence | Confidence |
|----------|----------|------------|
| [Scenario] | [Doc reference] | [High/Medium] |

### Composition Required (Assembly Needed)
| Scenario | Components to Combine | Gap |
|----------|----------------------|-----|
| [Scenario] | [Component A + Component B] | [What's missing] |

### Extension Needed (Custom Development)
| Scenario | Available Primitives | Custom Work Required |
|----------|---------------------|---------------------|
| [Scenario] | [What exists] | [What to build] |

---

## Gap Analysis

### Missing Capabilities
| Gap | Impact | Workaround |
|-----|--------|------------|
| [Missing capability] | [Which scenarios affected] | [Possible workaround] |

### Underdocumented Areas
| Area | Current Documentation | What's Needed |
|------|----------------------|---------------|
| [Area] | [What exists] | [What's missing] |

### Missing DS-Specific Guidance
- [ ] No evaluation/benchmarking framework documented
- [ ] No cost optimization guidance for ML workloads
- [ ] No data pipeline patterns documented
- [ ] No model selection guidance
- [ ] No production monitoring patterns
- [ ] [Other gaps]

---

## Recommendations

### Priority 1: Quick Wins (Direct Support)
1. **[Scenario]**: [Why this should be first, expected impact]
2. **[Scenario]**: [Why this should be next]

### Priority 2: High-Value Compositions
1. **[Scenario]**: [What to combine, expected effort, expected impact]
2. **[Scenario]**: [Details]

### Priority 3: Strategic Extensions
1. **[Scenario]**: [What to build, why it's worth the investment]

### Implementation Roadmap
| Phase | Scenarios | Effort | Prerequisites |
|-------|----------|--------|---------------|
| Phase 1 (1-2 weeks) | [Quick wins] | Low | [None/minimal] |
| Phase 2 (2-4 weeks) | [Compositions] | Medium | [Phase 1 complete] |
| Phase 3 (1-2 months) | [Extensions] | High | [Phases 1-2 + custom dev] |
```

---

## Template 2: Quick Scan Report

For rapid assessment when full analysis is not needed:

```markdown
# Quick DS Scan: [System Name]

## What This System Does (DS Perspective)
[1 paragraph summary]

## Top 5 DS Scenarios
1. **[Scenario]** - [Feasibility] - [One-line description]
2. **[Scenario]** - [Feasibility] - [One-line description]
3. **[Scenario]** - [Feasibility] - [One-line description]
4. **[Scenario]** - [Feasibility] - [One-line description]
5. **[Scenario]** - [Feasibility] - [One-line description]

## Top 3 Gaps
1. [Gap and impact]
2. [Gap and impact]
3. [Gap and impact]

## Verdict
[One-paragraph assessment: Should a DS team invest in this system? For what?]
```

---

## Template 3: Scenario Deep-Dive

For detailed analysis of a single scenario:

```markdown
# Scenario Deep-Dive: [Scenario Name]

## Overview
- **Category**: [NLP / RAG / Agent / Multi-Agent / Multimodal / Eval / Data Eng / MLOps]
- **Problem Type**: [Classification / Generation / etc.]
- **Feasibility**: [Direct / Composition / Extension]
- **Confidence**: [High / Medium / Low]

## Documentation Evidence
| Source | Section | Relevance |
|--------|---------|-----------|
| [File] | [Section] | [What it tells us] |

## Implementation Architecture
```
[ASCII diagram or description of the implementation flow]
```

## Step-by-Step Implementation
1. **[Step]**: [Details + code/config references from docs]
2. **[Step]**: [Details]
3. **[Step]**: [Details]

## Data Requirements
- **Input format**: [What data is needed]
- **Volume considerations**: [Scaling concerns]
- **Quality requirements**: [Data quality needs]

## Evaluation Plan
| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| [Metric] | [Target value] | [How to measure] |

## Risks and Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk] | [H/M/L] | [H/M/L] | [Strategy] |

## Estimated Effort
- **Prototype**: [Time estimate]
- **Production**: [Time estimate]
- **Team skills needed**: [Required expertise]
```

---

## Template 4: Comparison Matrix

For comparing multiple systems across DS scenarios:

```markdown
# DS Capability Comparison

| Scenario | [System A] | [System B] | [System C] |
|----------|-----------|-----------|-----------|
| Text Classification | Direct | Composition | Direct |
| RAG | Direct | Direct | Extension |
| Multi-Agent Orchestration | Extension | Direct | Direct |
| Evaluation Framework | N/A | Direct | Composition |
| ... | ... | ... | ... |

## Legend
- **Direct**: Built-in support with documentation
- **Composition**: Achievable by combining features
- **Extension**: Requires custom development
- **N/A**: Not supported

## Recommendation
[Which system for which use case]
```

---

## Usage Notes

- Select the template that matches the analysis depth requested
- Template 1 (Comprehensive) is the default for full analysis
- Template 2 (Quick Scan) for rapid assessment or initial triage
- Template 3 (Deep-Dive) for investigating specific promising scenarios
- Template 4 (Comparison) when evaluating multiple systems
- Adapt section depth based on documentation completeness
- Always ground findings in specific documentation evidence
- Include file paths and section references for traceability
