---
description: Read the task PDF from @python and provide a beginner-friendly overview, explaining the main goal without giving the solution.
argument-hint: [pdf_file]
allowed-tools: Read
---

Initiate the `mentor` agent to read the task file at @$1.
The agent must provide a beginner-friendly overview of the goal without providing the solution code.

The agent uses the plugin skill `mentor-guidance` to ensure:
- The explanation is strictly a summary of the goals and constraints.
- No direct code solutions are provided.
- Analogy-driven explanations are used if the goal is abstract or complex.

Provide the beginner with a clear, high-level summary of what they need to accomplish.
