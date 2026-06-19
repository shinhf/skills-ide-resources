---
description: Read the task PDF from @python and provide a beginner-friendly overview, explaining the main goal without giving the solution.
argument-hint: [pdf_file]
allowed-tools: Read, AskUserQuestion
---

Initiate the `mentor` agent to read the task file at @$1.
The agent must provide a beginner-friendly overview of the goal without providing the solution code.

**Step 0 — Clarify missing information:** Before producing the overview, confirm the required input is present and unambiguous. If `$1` is empty, the file cannot be read, or the file contains several distinct tasks and it is unclear which one to summarize, use the **AskUserQuestion** tool to ask focused, structured questions (e.g. which file, which task) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when the target task is clear.

The agent uses the plugin skill `mentor-guidance` to ensure:
- The explanation is strictly a summary of the goals and constraints.
- No direct code solutions are provided.
- Analogy-driven explanations are used if the goal is abstract or complex.

Provide the beginner with a clear, high-level summary of what they need to accomplish.
