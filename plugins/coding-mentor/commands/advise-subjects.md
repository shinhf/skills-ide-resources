---
description: Analyzes the task and lists the key programming concepts/subjects the beginner should study to solve it.
argument-hint: [pdf_file]
allowed-tools: Read, AskUserQuestion
---

Initiate the `mentor` agent to read the task file at @$1.
The agent must analyze the task constraints and objectives, and output a structured list of key programming concepts or subjects the beginner must study to complete the task successfully.

**Step 0 — Clarify missing information:** Before producing the subject list, confirm the required input is present and unambiguous. If `$1` is empty, the file cannot be read, the file contains several distinct tasks, or the language/School-42 rank is unstated when it changes which subjects matter, use the **AskUserQuestion** tool to ask focused, structured questions and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when the target task is clear.

The agent uses the plugin skill `mentor-guidance` to ensure:
- The output is advisory and pedagogical.
- No direct code solutions or implementation steps are provided.
- Brief explanations of *why* each subject is necessary are included.

Help the beginner create a study list before they begin coding.
