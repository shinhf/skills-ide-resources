# DS Doc Analyzer

A Claude Code plugin that analyzes documentation of LLM/AI/ML systems from a Data Science and Machine Learning perspective. It identifies actionable data science scenarios, maps capabilities to ML problem types, performs gap analysis, and produces structured analysis reports.

## Features

- **Systematic analysis** of AI/ML system documentation using a structured DS/ML taxonomy
- **Scenario identification** across 8 DS domains: NLP, RAG, Agents, Multi-Agent, Multimodal, Evaluation, Data Engineering, MLOps
- **Problem classification** mapping to canonical ML problem types (classification, generation, extraction, retrieval, reasoning, orchestration)
- **Feasibility assessment** with evidence-based ratings (Direct, Composition, Extension, Theoretical)
- **Gap analysis** identifying missing capabilities and underdocumented areas
- **Structured reports** with executive summaries, matrices, and prioritized recommendations

## Components

### Skill: `ds-analysis-framework`
Core analysis methodology and taxonomy. Automatically activates when analyzing documentation from a DS perspective. Includes reference files for:
- Complete scenario taxonomy (8 domains, 24+ subcategories)
- Problem pattern catalog (25+ implementation patterns)
- Report templates (4 formats: comprehensive, quick scan, deep-dive, comparison)

### Command: `/analyze-docs [path]`
Main entry point. Point it at a documentation directory or file to get a comprehensive DS/ML analysis.

### Command: `/generate-ds-report [output-path] [type]`
Generate a formatted report file. Supports four report types: `comprehensive`, `quick`, `deep-dive`, `comparison`.

### Agent: `ds-doc-analyzer`
Autonomous analysis agent triggered by natural language requests like "analyze this documentation from a data science perspective" or "what ML problems can this system solve."

## Usage

```
# Analyze documentation
/analyze-docs ./docs

# Generate a report file
/generate-ds-report analysis-report.md comprehensive

# Or ask naturally
"What data science scenarios does this framework support? Look at the docs/ folder."
```

## Installation

```bash
# Test locally
cc --plugin-dir /path/to/ds-doc-analyzer
```

## Analysis Output

The plugin produces structured reports containing:

1. **Executive Summary** -- Key findings and capability overview
2. **Capability Inventory** -- Table of system features with DS relevance ratings
3. **Identified Scenarios** -- Categorized scenarios with feasibility and production readiness
4. **Problem-Scenario Matrix** -- Coverage map across ML problem types
5. **Gap Analysis** -- Missing capabilities and underdocumented areas
6. **Recommendations** -- Prioritized as Quick Wins, Compositions, and Extensions
