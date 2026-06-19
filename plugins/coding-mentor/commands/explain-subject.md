---
description: Explains a specific unknown subject or term using real-life examples and simple code snippets.
argument-hint: [concept]
allowed-tools: AskUserQuestion
---

Initiate the `mentor` agent to explain the concept: "$1".

**Step 0 — Clarify missing information:** Before explaining, confirm the concept is present and specific enough. If `$1` is empty, or is too broad to explain usefully in one pass, use the **AskUserQuestion** tool to ask focused, structured questions (e.g. which concept, which aspect or context) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution to any related task. Proceed only when there is a clear concept to explain.
The agent uses the plugin skill `mentor-guidance` to ensure:
- The explanation relies heavily on real-life examples and analogies (e.g. cooking, building a house).
- The answer DOES NOT provide direct solutions to any related tasks.
- The tone is pedagogical and encouraging.
- Simple, unrelated code snippets (toy examples) can be used for demonstration.

Explain the concept to the beginner developer clearly.
