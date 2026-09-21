# From Constraint to Module

> **MENTOR-SIDE REFERENCE.** This catalog is here so *you* can recognize a pressure and
> ask about it. Do not read it out to a trainee — a boundary they were handed teaches
> nothing, and the whole point is that they name the pressure themselves.

A module boundary is never "good practice". It is a **response to a named pressure**. If you cannot name the pressure, you cannot defend the boundary — and a trainee who splits files without naming pressures is cargo-culting.

Use this file in Step 4 of the mapping loop. For every proposed box, find its row here. A box with no row does not go in the diagram.

---

## The catalog

### 1. A dependency hides an API you need
**Boundary produced:** a wrapper / adapter module.

You are given a library or SDK that exposes less than you need — a private tokenizer, a client with no retry, a parser that only reads files when you have a string. You write a thin module that turns their surface into the one your program wants.

- **Symptom of ignoring it:** the same three lines of awkward setup appear at four call sites, and every one of them breaks when the dependency version moves.
- **Merge test:** delete the wrapper and the rest of the program has to know the dependency's quirks. It breaks.
- **Trainee question:** *"If they released a v2 tomorrow, how many of your files would you have to open?"*

### 2. The same work is recomputed in a loop
**Boundary produced:** a precomputed-state / index module.

Something expensive is being derived over and over from data that never changes. You compute it once at start-up and hand out the prepared form.

- **Symptom of ignoring it:** the program is correct and unusably slow; profiling shows one function at 90%.
- **Merge test:** inline it and the cost moves back inside the hot loop. It breaks.
- **Trainee question:** *"How many times does this get computed, and how many times does its answer actually change?"*

### 3. Correctness is judged on exact shape or type
**Boundary produced:** a validation boundary at the edges.

When something outside your program decides whether you are right — a grader, an API contract, a file format — the conversion and checking of types is a **scoring concern**, not a style concern. It gets its own place, at the entry and exit of the program.

- **Symptom of ignoring it:** you pass your own tests and fail theirs, over `2` vs `2.0`, or a missing key.
- **Merge test:** scatter validation and there is no single place that guarantees the output is well-formed. It breaks.
- **Trainee question:** *"Where, exactly, is the one line that guarantees your output matches the required shape?"*

### 4. Two things change for different reasons
**Boundary produced:** a plain split.

The classic seam. Display changes when someone dislikes the wording; rules change when the spec changes. They have different reasons to change, so they are different modules.

- **Symptom of ignoring it:** a cosmetic change to output forces you to re-test the logic.
- **Merge test:** merge them and one kind of change now risks the other. It breaks.
- **Trainee question:** *"If the customer asked for different wording, which lines would you touch — and would you be nervous?"*

### 5. The same decision is made in three places
**Boundary produced:** a policy / rules module.

A threshold, a mapping, a precedence order appears in several branches. Each copy is a chance for the copies to disagree.

- **Symptom of ignoring it:** you fix a bug and it recurs somewhere else next week.
- **Merge test:** inline the policy and the copies drift. It breaks.
- **Trainee question:** *"If this rule changed, how many places would you have to remember?"*

### 6. A boundary is imposed from outside
**Boundary produced:** a module you did not choose.

The subject says "the SDK is read-only", "output must go to this file", "the grader calls this entry point". These boundaries are not yours to argue with; they are constraints to draw accurately.

- **Symptom of ignoring it:** you modify provided code, and the grading environment reverts or rejects it.
- **Merge test:** not applicable — you are not permitted to merge it.
- **Trainee question:** *"Which of these boxes would the subject forbid you to edit?"*

### 7. You need to test one part without the rest
**Boundary produced:** a seam with a narrow interface.

The expensive, slow, or non-deterministic part (network, model, clock, randomness) is isolated so everything else can be exercised without it.

- **Symptom of ignoring it:** every test run takes minutes, or gives different results, so you stop running them.
- **Merge test:** merge and the fast parts can no longer be tested alone. It breaks.
- **Trainee question:** *"Which part is slow or unpredictable — and what would you have to fake to test around it?"*

---

## Pressures that do **not** justify a module

- **"The file is getting long."** Length is a smell, not a reason. Find which of the seven pressures the length is hiding; split on that. Splitting purely by line count produces modules that must be read together, which is worse than one long file.
- **"Every project has a `utils.py`."** `utils` is the name you give a module when you could not name the pressure. Everything in it belongs beside the thing that needed it, or in a module named after what it actually owns.
- **"One function per file is cleaner."** It is not; it is a directory listing pretending to be a design. A module owns a *responsibility*, which is usually several functions.
- **"The reference solution did it."** They hit a pressure you may not have hit yet. Find out which one, then decide.

---

## Using this with a trainee

Do not read the catalog at them. Ask for the pressure first:

> *"You want a separate file for this. What goes wrong if you don't have one?"*

If they answer with a real failure mode, they have found their row and earned the box. If they answer "it's cleaner", the box is not justified yet — and that is the whole lesson.
