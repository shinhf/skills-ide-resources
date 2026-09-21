---
description: Advise which design or programming pattern — if any — a module actually needs and produce a PATTERNS.md recording the forces present, at most three candidates with one verdict each, and which patterns the language already provides as a built-in feature — no pattern implementation and no solution code.
argument-hint: [module-or-task]
allowed-tools: Read, Write, Glob, WebSearch, WebFetch, AskUserQuestion
---

Initiate the `mentor` agent to advise which pattern — if any — the module or task described in: "$1" actually needs. The default answer is **none**, and it remains the default until a pressure is named out loud.

If "$1" looks like a path (contains `/` or ends with a known extension), read the file at @$1 first; otherwise treat "$1" as the inline module or task description to advise on.

**Step 0 — Clarify missing information:** Before advising anything, confirm the required input is present and unambiguous. If `$1` is empty, looks like a path but the file cannot be read, or names no concrete module and no responsibility for it — nothing that could be under pressure — use the **AskUserQuestion** tool to ask focused, structured questions (e.g. which module is under review, what it is responsible for, what is about to change around it) and wait for the answer before continuing. Keep these questions strictly clarifying — they must never reveal or hint at the solution. Proceed only when there is a concrete module to advise on.

**Step 0b — Detect the stack:** Use **Glob** in the current directory for `pyproject.toml`, `package.json`, `*.csproj`, `go.mod`, `Cargo.toml`, `Makefile`, `*.c`, `requirements.txt`. If exactly one stack is indicated, use it and say so in one line. If none or several are found, use **AskUserQuestion** to ask which language the trainee is writing this in, offering the candidates that were found. Never name a pattern before the stack is settled — pattern advice is language-specific, a large part of the classic catalogue is already a built-in feature in some languages, and guessing produces confident nonsense.

**Step 0c — Load the existing design:** Read `ARCHITECTURE.md` in the current directory if it exists. It carries the module table — including the constraint that forced each boundary — and the library table. Those constraints are the raw material for the force table, and a candidate pattern that answers none of them is unjustified. If `ARCHITECTURE.md` does not exist, say in one line that `/map-architecture` should usually run first, and continue only if the trainee names a concrete module and its responsibility.

**Step 1 — Research the catalogue for that language first:** Use **WebSearch** and **WebFetch** to establish the pattern vocabulary *for the detected stack* before advising — which patterns that community genuinely uses, and, more importantly, which classic patterns the language has absorbed into a built-in feature, so that they are not patterns there at all. Research precedes the shortlist; never shortlist from memory.

**Step 2 — Shortlist at most three candidates:** Only then analyse the task, the architecture, the modules, the libraries and the other components, and name **at most three** candidate patterns. Three is a cap, not a target — one candidate, or none, is a better answer than three padded ones.

**Step 3 — Justify or reject each candidate:** For every candidate, research a real-world usage example on the web *and* double-check whether the pattern is genuinely needed here. The default verdict is that it is not. A candidate survives only when its force is named, present today, and more expensive to answer without the pattern than with it.

The agent uses the plugin skill `pattern-advisory` and inherits the `mentor-guidance` rules. Enforce:
- Do NOT write the pattern's implementation — no class skeletons, no interfaces, no method signatures, no pseudocode. Naming the pattern and the role each participant plays is advice; writing the participants is the solution.
- Do NOT recommend a pattern the trainee cannot name a pressure for. "It's cleaner", "it's more professional" and "it scales better" are rejected, exactly as the `architecture-mapping` skill rejects them for module boundaries.
- Do NOT recommend a pattern the language already provides as a feature — name the feature that replaces it instead.
- Cap the review at three candidates evaluated, give each exactly one verdict from the fixed vocabulary in the `pattern-advisory` skill, and expect most verdicts to be negative.
- Follow the output contract in the `pattern-advisory` skill exactly.
- Cite the sources used for each non-obvious claim.

Write the result to `PATTERNS.md` in the current directory. If that file already exists, use **AskUserQuestion** to confirm overwriting before writing.

Return a three-line summary to the beginner developer: where the file was written, the single verdict that matters, and the one question they should answer before applying anything.
