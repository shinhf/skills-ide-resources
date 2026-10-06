# Decomposition Patterns

> **MENTOR-SIDE REFERENCE.** These tables are here so *you* know which questions to
> ask. Handing a trainee the pattern block for their task shape is the same failure as
> handing them the code. Name the seam they should look for; let them fill the table in.

Recurring shapes for the kind of task a trainee is given. Match the task to a shape in Step 3 of the mapping loop before inventing a structure. Each shape lists its **seams** (where to cut), its **module set**, and the **pressure** behind each cut — cross-reference `constraint-to-module.md`.

None of these are laws. They are starting points that have survived contact with beginner-sized problems.

---

## 1. CLI filter (input → transform → output)

*Reads arguments and/or stdin, produces stdout. Most school tasks are this.*

**Seams:** argument boundary · the rule · the rendering

| Module | Responsibility | Pressure |
|---|---|---|
| entry point | Parse args, wire things together, exit codes | Imposed boundary (#6) — the shell decides how you are called |
| validation | Reject bad input before anything else runs | Exact-shape correctness (#3) |
| core rule | The actual transformation | Different reason to change (#4) |
| rendering | Turn the result into the exact required text | Different reason to change (#4) |

**Smallest honest version:** entry point + core rule. Add the others only when the pressure appears. A two-argument calculator does not need four files.

---

## 2. File transformer (read → parse → model → write)

*Takes files in a format, produces files in a format.*

**Seams:** format boundary in · the in-memory model · format boundary out

| Module | Responsibility | Pressure |
|---|---|---|
| reader/parser | Format → in-memory model | Different reason to change (#4) — the format changes independently of the rules |
| model | The typed shape the rest of the program works with | Exact-shape correctness (#3) |
| transform | Model → model | — the core |
| writer/serializer | Model → format, exactly as specified | Exact-shape correctness (#3) |

**The lesson to draw out:** the model in the middle is what lets the input format and the output format change without touching each other. Ask: *"If they switched the input from JSON to CSV, which boxes survive?"*

---

## 3. Client of an external service (or a provided SDK)

*Your program is mostly a conversation with something you did not write.*

**Seams:** the wrapper around their API · your orchestration · your data model

| Module | Responsibility | Pressure |
|---|---|---|
| **(provided)** the SDK/service | Not yours. Draw it, do not design it | Imposed boundary (#6) |
| adapter | Turn their surface into the one you want | Hidden API (#1) |
| orchestrator | Decide what to ask for, in what order, and what to do with answers | — the core |
| model | Typed request/response shapes | Exact-shape correctness (#3) |
| prepared state | Anything derived once from their data and reused | Recomputation (#2) |

**The lesson:** the adapter exists *because* the SDK gave you less than you needed. Make the trainee name the missing piece before they accept the box.

---

## 4. Interactive loop (REPL, game, prompt)

*Runs until told to stop, holds state between turns.*

**Seams:** the loop shell · the state · the command dispatch · the display

| Module | Responsibility | Pressure |
|---|---|---|
| loop/shell | Read, dispatch, repeat, quit | Imposed boundary (#6) |
| state | What is true right now, and the only legal ways to change it | Policy in three places (#5) |
| commands | One decision: which action does this input mean? | Policy (#5) |
| display | Render state for a human | Different reason to change (#4) |

**Anti-pattern to name out loud:** mutating state directly inside the loop body. Ask: *"If a rule about legal moves changed, how many places would you edit?"*

---

## 5. State machine / protocol

*Behavior depends on where you are, not just what arrived.*

**Seams:** the state definition · the transition table · the driver

| Module | Responsibility | Pressure |
|---|---|---|
| states | The enumerated positions you can be in | Policy (#5) |
| transitions | For each (state, input) → next state and action | Policy (#5) |
| driver | Feed input, apply transitions, emit output | — |

**The lesson:** once transitions are data in one table, "does it handle this edge case?" becomes a question you can *look up* instead of trace.

**Scope warning.** The boxes are architecture; *what goes in the transition table* is the trainee's algorithm. Name the table, never fill it in for them.

---

## 6. Parser / tokenizer

*Text in, structure out. The hardest shape at this level, and the one most likely to grow modules under pressure.*

**Seams:** the alphabet · the scanner · the grammar · the tree

| Module | Responsibility | Pressure |
|---|---|---|
| alphabet/vocabulary | What symbols exist and how they map | Recomputation (#2) — build the lookup once |
| scanner/tokenizer | Characters → tokens | Testability (#7) |
| grammar/parser | Tokens → structure | Different reason to change (#4) |
| structure | The result type | Exact-shape correctness (#3) |

**Scope warning.** This shape sits closest to the algorithm of any pattern here. Name the boxes and the data crossing between them; how the scanner decides where a token ends is the trainee's work, not yours.

**Where trainees go wrong:** doing character-level work inline everywhere, then discovering that one awkward case (a symbol that spans tokens, an escape sequence) needs the whole thing restructured. That restructuring *is* where the extra modules come from — see the worked example.

---

## Anti-patterns to name explicitly

- **One giant `main`.** Everything is reachable from everywhere, so nothing can be tested or reasoned about alone. The fix is not "split it in half"; it is to find the first real seam (usually the input boundary) and cut there.
- **A module per function.** A directory listing pretending to be a design. If two files must always be opened together, they are one module.
- **`utils` / `helpers` / `common`.** The name you use when you cannot name the pressure. Everything inside belongs somewhere specific.
- **Layers with nothing in them.** A "service layer" that only forwards calls to the layer below adds a file and removes nothing. Delete it and see if anything breaks.
- **Designing for change that will never come.** A school task with a fixed subject does not need a plugin architecture. Ask: *"Is that change actually going to happen before you submit?"*

---

## Picking the number of boxes

Start from the smallest honest version — usually two or three modules — and add a box only when a pressure from `constraint-to-module.md` forces it. Stop at the cap stated in SKILL.md.

If the trainee wants more than the cap, they are usually decomposing by *noun* (one file per concept) rather than by *reason to change*. Ask them to apply the merge test to the two smallest boxes and watch what happens.
