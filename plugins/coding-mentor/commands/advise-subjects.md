---
description: Analyzes the task and lists the key programming concepts/subjects the beginner should study to solve it.
argument-hint: [pdf_file]
allowed-tools: Read
---

Initiate the `mentor` agent to read the task file at @$1.
The agent must analyze the task constraints and objectives, and output a structured list of key programming concepts or subjects the beginner must study to complete the task successfully.

The agent uses the plugin skill `mentor-guidance` to ensure:
- The output is advisory and pedagogical.
- No direct code solutions or implementation steps are provided.
- Brief explanations of *why* each subject is necessary are included.

Help the beginner create a study list before they begin coding.
