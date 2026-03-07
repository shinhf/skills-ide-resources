---
description: Helps the beginner draft a high-level implementation plan without writing the actual code.
argument-hint: [pdf_file]
allowed-tools: Read
---

Initiate the `mentor` agent to review the task file at @$1.
The agent must assist the beginner in drafting a high-level, step-by-step implementation plan (pseudocode or logical steps).

The agent uses the plugin skill `mentor-guidance` to ensure:
- The output is in plain English, avoiding actual implementation code.
- The plan focuses on breaking the task into smaller functions or logical modules.
- The plan explicitly specifies inputs and expected outputs for each step.
- No direct code solutions are provided.

Provide the beginner with a high-level logical structure to follow when they begin writing code.
