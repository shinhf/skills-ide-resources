---
description: Apply approved Slidedoc improvements and produce a revision log
argument-hint: [target file] [optional page or section scope]
allowed-tools: Read, Write, Grep, Glob
---

Apply improvements to an existing Slidedoc only after explicit approval scope.

Steps:
1. Read target content from `$1` (or ask user to provide path/content if missing).
2. Gather improvement input from prior review notes or run a quick improvement pass.
3. Present grouped change plan by page and ask for one approval mode:
   - `apply all`
   - `apply selected pages`
   - `preview only`
4. If `preview only`, stop after showing proposed edits.
5. If approved to apply, edit only approved pages/sections.
6. Preserve existing structure and metadata unless user asks to restructure.

After applying, output a revision log with:
- Changed page/section
- Before and after headline
- Summary of text and visual-guidance edits
- Accessibility updates applied
- Unresolved decisions requiring user input

Run post-apply checks:
- One-idea-per-page
- Conclusion-style headlines
- Density sanity check
- Navigation and accessibility essentials
