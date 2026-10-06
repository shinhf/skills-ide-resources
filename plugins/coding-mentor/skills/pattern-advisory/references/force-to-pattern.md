# From Force to Pattern

> **MENTOR-SIDE REFERENCE.** This catalogue is here so *you* can recognize a force and ask
> about it. Do not read it out to a trainee — a pattern they were handed teaches nothing,
> and the whole point is that they name the force themselves.

A pattern is never "best practice". It is a **response to a named force**. If the force cannot be named, the pattern cannot be defended — and a trainee who adopts patterns without naming forces is cargo-culting, exactly as a trainee who splits files without naming pressures is.

Use this file in Step 3 of the six-step loop. For every candidate pattern, find its force here. A candidate with no force does not become a row in `PATTERNS.md`. The `#N` handles are stable; cite them in the force table and in conversation ("this is force #4, and only force #4").

Each entry carries a **cheaper answer to rule out first**. Rule it out honestly before the pattern is allowed through: if the cheaper answer works, the verdict is `NOT NEEDED` and the cheap version is the exercise.

---

## The catalogue

### #0. A grader or a lecturer requires a pattern
**Candidate patterns:** whichever the smallest honest one is.

Not a force in the design; a force on the trainee. It is still real, and pretending otherwise wastes their time. Record it in `PATTERNS.md` as force #0 in plain words — *"required by the assignment, not by the code"* — so the trainee can tell the difference between a pattern the program needed and a pattern the marking scheme needed.

- **Cheaper answer to rule out first:** read the requirement again. It often asks for a *named* pattern in a comment or a report, not a restructured program.
- **Falsifiable question:** *"If nobody were grading this, would you still add it — and which of forces #1 to #7 would make you?"*

### #1. Several interchangeable behaviours chosen at runtime
**Candidate patterns:** Strategy, State.

**Shows up as:** three branches of an `if`/`switch` that each do the same *shape* of work with different details — three sort orders, three output formats, three difficulty levels — and the branch is picked from an argument or a config value.

- **Cheaper answer to rule out first:** a dictionary from name to function, or a single function with a parameter. In any language with first-class functions this *is* Strategy, without the vocabulary or the participants.
- **Falsifiable question:** *"How many behaviours exist today, and is the code that picks one in more than one place?"* One behaviour, or one call site, means no pattern.

### #2. An expensive resource that must be created once
**Candidate patterns:** Singleton (Global Object), lazy initialization, object pool.

**Shows up as:** a database handle, a loaded model, a parsed lookup table, an HTTP client — something slow to build that several functions want, and which the trainee is currently rebuilding inside a loop.

- **Cheaper answer to rule out first:** build it once at start-up and **pass it as a parameter**. "Created once" is a lifetime question; Singleton additionally makes it globally reachable, and global reachability is a cost, not the benefit being bought.
- **Falsifiable question:** *"Is the problem that it gets built twice, or that it is awkward to pass around?"* If it is awkwardness, the answer is a parameter, not a pattern.

### #3. A format that will gain a second variant
**Candidate patterns:** Strategy, Adapter, Factory Method.

**Shows up as:** "right now we export CSV, but JSON is coming". A future variant is the single most-claimed and least-real force a beginner brings. **Suspect this one.**

- **Cheaper answer to rule out first:** write the one format you have, with the formatting separated from the rules — which the `ARCHITECTURE.md` module table has probably already done. A named seam costs nothing; a factory costs participants.
- **Falsifiable question:** *"Is the second variant specified, in the subject, with a deadline — or is it a guess?"* A guess is `ADOPT LATER` at best, with "when the second format is actually specified" as the trigger.

### #4. A dependency that must be swapped in tests
**Candidate patterns:** dependency injection, Adapter, Ports and Adapters.

**Shows up as:** a function that reaches out to the network, the clock, the filesystem or `stdin` internally, which therefore cannot be tested without them. This is the beginner force most often *real*.

- **Cheaper answer to rule out first:** make it an argument. Passing the file object, the clock function or the reader in **is** dependency injection — the pattern is the parameter, not a container and not an interface hierarchy.
- **Falsifiable question:** *"Which test do you want to write that you currently cannot?"* If no such test is named, the force is not present yet.

### #5. An unstable third-party API you do not control
**Candidate patterns:** Adapter, Facade, wrapper module.

**Shows up as:** a provided SDK or library whose awkward setup is copy-pasted at four call sites, each of which breaks when the dependency moves. This is the same pressure the `architecture-mapping` skill catalogues as constraint #1 — which means the boundary may already exist in `ARCHITECTURE.md`, and the "pattern" is just its name.

- **Cheaper answer to rule out first:** one small module of ordinary functions that call the dependency. That is an Adapter. It does not need a class, an interface or the word.
- **Falsifiable question:** *"If they released a v2 tomorrow, how many of your files would you have to open?"* One file means the force is already answered — verdict `ALREADY PRESENT (unnamed)`.

### #6. State that must not be mutated by two owners
**Candidate patterns:** immutable value object, Observer (for notification), Memento (for snapshots).

**Shows up as:** two functions holding the same list, one of them sorting it in place, and a bug that appears only in a particular call order. In a language with ownership rules, the compiler has already refused this.

- **Cheaper answer to rule out first:** stop sharing. Copy on the way in, return a new value instead of editing in place, or freeze the structure with the language's own facility.
- **Falsifiable question:** *"Who is allowed to change this, and what have you got that stops anyone else?"* If the answer is "only one function changes it", there is no force.

### #7. An operation that must be retried or undone
**Candidate patterns:** Command (for undo), Memento (for snapshots), a retry wrapper.

**Shows up as:** a network call that fails intermittently, or an editor-style feature where the last action must be reversible. Retry and undo feel like one force and are two: retry needs the *call* repeatable, undo needs the *previous state* recoverable.

- **Cheaper answer to rule out first:** for retry, a loop with an attempt counter and a delay — often a few lines, and in several stacks already provided by the HTTP library. For undo of one step, keep the previous value in a variable.
- **Falsifiable question:** *"Is one level of undo enough, and is the retry policy anything more than 'three times, then give up'?"* Two yeses mean no pattern.

---

## Forces beginners think they have

Check these before accepting any candidate. Each is a confidently described pressure that is usually absent.

- **"We'll need to support many formats later."** The most common false force (#3). Almost always one format ships, and the factory outlives the requirement. Ask for the specification of the second one.
- **"I have two classes, so I need a Factory."** Two classes need two constructor calls. A factory answers *"the caller must not know which one it gets"* — ask whether the caller genuinely must not know.
- **"There's only one of it, so it's a Singleton."** "One of it" is a fact, not a force. One module-level value is one of it. Singleton buys *global reachability*, which is a cost the trainee has not asked to pay (#2).
- **"Senior developers use dependency injection."** Passing a parameter is dependency injection. A container is a deployment convenience for large applications. Ask which test needs it (#4).
- **"The UI must update when the data changes, so I need Observer."** With one thing watching, the answer is a direct call. Observer starts earning its place at several independent watchers registered at runtime (#6).
- **"Inheritance will save me duplication."** Ask what is actually duplicated. It is usually three lines of data, not behaviour, and belongs in a shared value or a shared function.
- **"My file is getting long, so it needs a pattern."** Length is a smell, not a force — the `architecture-mapping` skill says the same about modules. Find which of #1 to #7 the length is hiding, and if it hides none, the file is merely long.
- **"This is how the tutorial did it."** They hit a force the trainee may not have hit. Find out which one, then decide.

---

## Using this with a trainee

Do not read the catalogue at them. Ask for the force first:

> *"You want a factory here. What goes wrong today if you don't have one?"*

If they answer with a real failure happening now, they have found their handle and earned the candidate. If they answer "it's cleaner", the candidate is not justified — and that is the whole lesson.

Then close with the horizon test every time, because it is falsifiable and they can run it themselves:

> *"What future change becomes cheap if you adopt this — and is that change actually on your horizon?"*
