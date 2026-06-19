---
description: Helps the beginner draft a high-level implementation plan without writing the actual code.
argument-hint: [pdf_file]
allowed-tools: Read, AskUserQuestion
---

Initiate the `mentor` agent to review the task file at @$1.
The agent must assist the beginner in drafting a high-level, step-by-step implementation plan (pseudocode or logical steps).

**Step 0 — Clarify missing information:** Before helping draft the plan, confirm the required input is present and unambiguous. If `$1` is empty, the file cannot be read, or the file contains several distinct tasks and it is unclear which one to plan for, use the **AskUserQuestion** tool to ask focused, structured questions and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when the target task is clear.

The agent uses the plugin skill `mentor-guidance` to ensure:
- The output is in plain English, avoiding actual implementation code.
- The plan focuses on breaking the task into smaller functions or logical modules.
- The plan explicitly specifies inputs and expected outputs for each step.
- No direct code solutions are provided.

Provide the beginner with a high-level logical structure to follow when they begin writing code.
