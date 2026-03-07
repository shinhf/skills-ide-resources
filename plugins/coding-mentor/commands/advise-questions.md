---
description: Provides a list of guiding questions the beginner should ask themselves to figure out the logic of the task.
argument-hint: [pdf_file]
allowed-tools: Read
---

Initiate the `mentor` agent to review the task file at @$1.
The agent must generate a list of Socratic, guiding questions designed to help the beginner figure out the logical steps needed to solve the task.

The agent uses the plugin skill `mentor-guidance` to ensure:
- The questions break the problem down into smaller logical chunks.
- The questions do not contain the answer, but rather prompt the user to find the answer themselves.
- The tone is inquisitive and pedagogical.

Provide the beginner with a set of questions to spark their problem-solving process.
