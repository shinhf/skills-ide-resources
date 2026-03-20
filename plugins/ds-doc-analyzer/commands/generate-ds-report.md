---
description: Generate a formatted DS analysis report and save it as a markdown file
argument-hint: [output-file-path] [report-type: comprehensive|quick|deep-dive|comparison]
allowed-tools: Read, Write, Grep, Glob
---

Generate a formatted Data Science analysis report and save it to a file. Use the **ds-analysis-framework** skill for report templates and analysis methodology.

## Parameters

- `$1` - Output file path (e.g., `ds-analysis-report.md`)
- `$2` - Report type (default: `comprehensive`)
  - `comprehensive` - Full analysis with all sections
  - `quick` - Quick scan with top scenarios and gaps
  - `deep-dive` - Deep analysis of a specific scenario
  - `comparison` - Compare multiple systems

## Workflow

### Step 1: Gather Context

Examine the current conversation context for any prior documentation analysis. If no prior analysis exists, ask the user to either:
- Run `/analyze-docs [path]` first to generate analysis data
- Specify documentation paths to analyze now

### Step 2: Select Report Template

Load the appropriate template from the ds-analysis-framework skill's `references/analysis-templates.md`:
- **comprehensive** → Template 1: Comprehensive Analysis Report
- **quick** → Template 2: Quick Scan Report
- **deep-dive** → Template 3: Scenario Deep-Dive
- **comparison** → Template 4: Comparison Matrix

### Step 3: Generate Report

Fill in the selected template with analysis findings:
- Ground every finding in specific documentation evidence
- Include file paths and section references
- Provide concrete implementation sketches for top scenarios
- Include evaluation metrics and success criteria
- Add prioritized recommendations with effort estimates

### Step 4: Save Report

Write the completed report to `$1`. If no output path is specified, save to `ds-analysis-report.md` in the current working directory.

Confirm the file was saved and provide a summary of what the report contains:
- Total scenarios identified
- Feasibility breakdown
- Top recommendations
- Report length and sections
