---
name: DS Analysis Framework
description: This skill should be used when the user asks to "analyze documentation from data science perspective", "identify data science scenarios", "find ML problems in docs", "evaluate AI system capabilities", "what DS use cases does this support", "map documentation to ML problems", "data science evaluation", "extract ML scenarios from docs", or needs guidance on systematically analyzing LLM/AI/ML system documentation to identify data science scenarios, machine learning problem types, and practical use cases.
version: 0.1.0
---

# DS Analysis Framework

This skill provides a structured methodology for analyzing documentation of LLM/AI/ML systems through the lens of Data Science and Machine Learning. Apply this framework to any AI/ML system documentation to extract actionable data science scenarios, identify solvable ML problems, and evaluate practical utility for DS/ML practitioners.

## Analysis Process

### Step 1: Documentation Inventory

Scan the documentation to build an inventory of system capabilities:

1. Read all available documentation files (SKILL.md, references/, README, API docs)
2. Catalog every capability, API, abstraction, and feature mentioned
3. Note integration points (model providers, data sources, external services)
4. Identify the system's architecture pattern (agent-based, pipeline, orchestration, etc.)

### Step 2: Capability Extraction

For each documented capability, extract:

- **What it does**: Core functionality in plain terms
- **Input/Output types**: Data formats, modalities (text, image, audio, structured)
- **Configuration surface**: What parameters are tunable
- **Composability**: How it combines with other capabilities
- **Constraints**: Limitations, requirements, dependencies

### Step 3: Scenario Mapping

Map extracted capabilities to data science scenarios using the taxonomy in `references/scenario-taxonomy.md`. For each scenario:

1. Identify the **DS domain** (NLP, Computer Vision, Tabular, Time-Series, Multimodal, Multi-Agent)
2. Classify the **problem type** (see `references/problem-patterns.md`)
3. Assess **implementation feasibility** (direct support, requires composition, needs extension)
4. Rate **production readiness** (prototype-only, production-ready, enterprise-grade)

### Step 4: Problem Identification

For each mapped scenario, identify concrete ML/DS problems:

- **Data problems**: Data collection, labeling, augmentation, quality
- **Model problems**: Selection, training, fine-tuning, evaluation
- **System problems**: Latency, throughput, cost, reliability
- **Evaluation problems**: Metrics, benchmarking, A/B testing
- **Deployment problems**: Serving, monitoring, versioning, rollback

### Step 5: Gap Analysis

Identify what the documentation does NOT cover:

- Missing DS scenarios the system could theoretically support
- Undocumented integration possibilities
- Absent evaluation/benchmarking guidance
- Missing production deployment patterns
- Overlooked domain applications

## Scenario Categories

| Category | Subcategories | Key Signals in Docs |
|----------|--------------|---------------------|
| **NLP/Text** | Classification, Generation, Summarization, QA, Translation, NER, Sentiment | "chat", "completion", "prompt", "text", "token" |
| **RAG/Retrieval** | Knowledge retrieval, Semantic search, Document QA, Hybrid search | "embedding", "vector", "search", "retrieval", "index" |
| **Agents/Reasoning** | Tool use, Planning, Multi-step reasoning, Code generation | "agent", "tool", "function call", "reasoning", "plan" |
| **Multi-Agent** | Orchestration, Collaboration, Delegation, Debate | "workflow", "orchestration", "handoff", "group", "swarm" |
| **Multimodal** | Vision-language, Audio processing, Document understanding | "image", "audio", "multimodal", "vision", "document" |
| **Evaluation** | Model eval, Prompt testing, Benchmark suites, Quality metrics | "eval", "metric", "benchmark", "score", "quality" |
| **Data Engineering** | ETL for ML, Feature engineering, Data pipelines | "pipeline", "data", "transform", "feature", "preprocess" |
| **MLOps** | Deployment, Monitoring, Versioning, A/B testing | "deploy", "monitor", "version", "serve", "endpoint" |

## Problem Classification

Each identified scenario maps to one or more canonical ML problem types:

| Problem Type | Description | Example in LLM Context |
|-------------|-------------|----------------------|
| **Classification** | Assign labels to inputs | Sentiment analysis, intent detection, content moderation |
| **Generation** | Produce new content | Text generation, code synthesis, report writing |
| **Extraction** | Pull structured data from unstructured input | NER, relation extraction, schema mapping |
| **Retrieval** | Find relevant information | RAG, semantic search, knowledge retrieval |
| **Ranking** | Order items by relevance | Search result ranking, recommendation |
| **Clustering** | Group similar items | Topic modeling, document clustering |
| **Translation** | Convert between representations | Language translation, code translation, format conversion |
| **Summarization** | Condense information | Document summarization, meeting notes, changelog |
| **Reasoning** | Multi-step logical inference | Chain-of-thought, planning, mathematical problem-solving |
| **Orchestration** | Coordinate multiple models/agents | Multi-agent workflows, ensemble methods, pipelines |

## Output Structure

Produce analysis results in this structure:

```
## Executive Summary
[2-3 sentence overview of system's DS capabilities]

## Identified Scenarios
### [Category Name]
- **Scenario**: [Name]
  - Problem Type: [Classification/Generation/etc.]
  - Feasibility: [Direct/Composition/Extension]
  - Documentation Evidence: [Specific doc references]
  - Example Use Case: [Concrete example]

## Problem-Scenario Matrix
[Table mapping problems to scenarios]

## Gap Analysis
[What's missing or underdocumented]

## Recommendations
[Prioritized list of DS applications]
```

## Feasibility Ratings

| Rating | Meaning | Criteria |
|--------|---------|----------|
| **Direct** | System provides explicit support | Documented API, working examples, clear guidance |
| **Composition** | Achievable by combining documented features | Features exist but require assembly; no explicit guide |
| **Extension** | Requires custom development beyond documentation | System provides primitives but scenario needs custom code |
| **Theoretical** | Architecturally possible but undocumented | System design allows it, but no documentation or examples |

## Additional Resources

### Reference Files

For detailed analysis taxonomies and patterns, consult:

- **`references/scenario-taxonomy.md`** -- Complete taxonomy of DS/ML scenarios with subcategories, signals, and evaluation criteria for each domain
- **`references/problem-patterns.md`** -- Detailed problem pattern catalog with implementation patterns, evaluation metrics, and common pitfalls
- **`references/analysis-templates.md`** -- Report templates, structured output formats, and example analyses
