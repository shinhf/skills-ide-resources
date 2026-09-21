---
description: Analyze a programming task and produce an ARCHITECTURE.md with a Mermaid component diagram, a module table explaining why each module exists, and a library table explaining what each dependency is for — no solution code.
argument-hint: [task-file-or-description]
allowed-tools: Read, Write, Glob, AskUserQuestion
---

Initiate the `mentor` agent to map the architecture of the programming task described in: "$1".

If "$1" looks like a path (contains `/` or ends with a known extension), read the file at @$1 first; otherwise treat "$1" as the inline task description to map.

**Step 0 — Clarify missing information:** Before mapping anything, confirm the required input is present and unambiguous. If `$1` is empty, looks like a path but the file cannot be read, or describes a task too vague to decompose (no stated input, no stated output, no stated success condition), use the **AskUserQuestion** tool to ask focused, structured questions (e.g. paste the subject, or which file, or what the program must print) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when there is a concrete task to map.

**Step 0b — Detect the stack:** Use **Glob** in the current directory for `package.json`, `pyproject.toml`, `requirements.txt`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`, `*.c`. If exactly one stack is indicated, use it and say so in one line. If none or several are found, use **AskUserQuestion** to ask which language the trainee is writing this in, offering the candidates you found. Never name libraries before the stack is settled.

The agent uses the plugin skill `architecture-mapping` and inherits the `mentor-guidance` rules. Enforce:
- Do NOT write function bodies, algorithms, pseudocode, or function signatures. This command designs the container, never the contents.
- Do NOT create or stub the source files. The trainee builds them.
- Name every module by its **responsibility**, and name the constraint that forced the boundary. A box with no constraint behind it does not go in the diagram.
- Separate what is **provided and read-only** (scaffold, SDK, fixtures, grader) from what the trainee **authors**. Put them in different subgraphs.
- Every library needs a "what you would write by hand instead" answer. If the honest answer is ten lines, recommend the standard library instead.
- Cap the diagram at 4–7 authored modules. A beginner cannot hold more than that at once.
- Follow the output contract in the `architecture-mapping` skill exactly.

Write the result to `ARCHITECTURE.md` in the current directory. If that file already exists, use **AskUserQuestion** to confirm overwriting before writing.

Return a three-line summary to the beginner developer: where the file was written, how many modules it proposes, and which single question they should answer before writing any code.
