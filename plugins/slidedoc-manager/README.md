# slidedoc-manager

A Claude Code plugin for creating, reviewing, improving, converting, and managing Slidedocs based on the Slidedoc guidance in this repository.

## What It Provides

- One skill: `slidedoc-expertise`
- Five commands:
  - `/create-slidedoc`
  - `/review-slidedoc`
  - `/improve-slidedoc`
  - `/convert-to-slidedoc`
  - `/apply-slidedoc-fixes`
- Two agents:
  - `slidedoc-reviewer`
  - `slidedoc-creator`

## Scope

Supports:
- Markdown Slidedoc content
- Slide screenshots/images
- Deck conversion workflows via layered ingestion:
  - MCP/integration extraction when available
  - Converted text/image artifacts as fallback
  - Manual export fallback

## Install

Run Claude Code with this plugin directory:

```bash
cc --plugin-dir /path/to/slidedoc-manager
```

## Command Intent

- `/create-slidedoc`: generate a complete Slidedoc structure and page content.
- `/review-slidedoc`: run structured quality review with severity and /25 score.
- `/improve-slidedoc`: propose high-impact page-level improvements.
- `/convert-to-slidedoc`: transform deck/doc/raw inputs into read-first Slidedoc pages.
- `/apply-slidedoc-fixes`: apply approved changes and return revision log.

## Skill References

`skills/slidedoc-expertise/references/` contains the Slidedoc knowledge base used by commands and agents.

## Validation Checklist

- Plugin manifest exists at `.claude-plugin/plugin.json`
- Commands and agents are auto-discovered from their directories
- Skill includes trigger-rich frontmatter and reference pointers
- Review output includes severity and /25 scoring
- Apply workflow uses explicit approval modes before writes
