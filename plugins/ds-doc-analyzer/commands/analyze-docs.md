---
description: Analyze AI/ML system documentation from a Data Science perspective to identify scenarios, problems, and use cases
argument-hint: [path-to-docs-directory-or-file]
allowed-tools: Read, Grep, Glob, Write
---

Analyze the documentation at the specified path from a Data Science and Machine Learning practitioner's perspective. Use the **ds-analysis-framework** skill to guide the analysis methodology.

## Analysis Workflow

### 1. Documentation Discovery

Scan `$ARGUMENTS` to find all documentation files:
- Look for `.md`, `.txt`, `.rst`, `.yaml`, `.json` files
- Include README files, API references, skill files (SKILL.md), and configuration docs
- Build a complete inventory of available documentation

### 2. Systematic Reading

Read each documentation file and extract:
- System capabilities and features
- APIs, abstractions, and interfaces
- Integration points (model providers, data sources, external services)
- Configuration options and parameters
- Code examples and usage patterns
- Architectural patterns (agent-based, pipeline, workflow, etc.)

### 3. Apply DS Analysis Framework

For each identified capability, apply the analysis framework:
- Map to data science scenario categories (NLP, RAG, Agents, Multi-Agent, Multimodal, Evaluation, Data Engineering, MLOps)
- Classify the ML problem type (Classification, Generation, Extraction, Retrieval, Ranking, Reasoning, Orchestration)
- Assess feasibility (Direct support, Composition required, Extension needed, Theoretical)
- Rate production readiness (Prototype, Production, Enterprise)

### 4. Problem Identification

For each scenario, identify concrete problems:
- Data problems (collection, labeling, augmentation, quality)
- Model problems (selection, training, fine-tuning, evaluation)
- System problems (latency, throughput, cost, reliability)
- Evaluation problems (metrics, benchmarking, A/B testing)
- Deployment problems (serving, monitoring, versioning)

### 5. Gap Analysis

Identify what the documentation does NOT cover:
- Missing DS scenarios the system could support
- Undocumented integration possibilities
- Absent evaluation/benchmarking guidance
- Missing production deployment patterns

### 6. Output

Produce a **Comprehensive Analysis Report** using the template from the ds-analysis-framework skill's `references/analysis-templates.md`. The report must include:

1. **Executive Summary** with key findings
2. **System Capability Inventory** table
3. **Identified Scenarios** organized by category with feasibility ratings
4. **Problem-Scenario Matrix** showing coverage
5. **Gap Analysis** with missing capabilities and underdocumented areas
6. **Recommendations** prioritized as Quick Wins, High-Value Compositions, and Strategic Extensions

Ground every finding in specific documentation evidence with file paths and section references.

Present the complete analysis report directly in the conversation. If the report is very large, offer to save it as a markdown file.
