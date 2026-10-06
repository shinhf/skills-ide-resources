# Mermaid Diagram Templates

Diagram patterns for trainee-facing architecture maps. Each template comes in three forms — **blank**, **annotated** (with `%%` guidance), and **filled**.

Two rules apply to every diagram in this skill:

1. **Provided/read-only components go in their own subgraph**, styled differently from the trainee's own modules.
2. **Edges are labeled with the data that flows**, not with the function being called. `-->|"validated records"|` teaches; `-->|"calls process()"|` does not.

---

## Component Diagram (the main one)

Shows every module as a box and the data moving between them. This is section 3 of `ARCHITECTURE.md` and is mandatory.

### Blank Template

```mermaid
flowchart TD
    subgraph provided["Provided — do not modify"]
        P1["Component Name"]
    end

    subgraph yours["Yours to write"]
        M1["module one"]
        M2["module two"]
        M3["module three"]
    end

    M1 -->|"data"| M2
    M2 -->|"data"| M3
    M2 -->|"request data"| P1
    P1 -->|"response data"| M2

    classDef given fill:#eee,stroke:#999,stroke-dasharray: 4 3,color:#333
    class P1 given
```

### Annotated Template

```mermaid
flowchart TD
    %% Put everything the subject forbids you to edit in the "provided" subgraph.
    %% Trainees who skip this step end up redesigning boxes they do not control.
    subgraph provided["Provided — do not modify"]
        SDK["Vendored SDK"]
        FIX["Test fixtures"]
    end

    %% Respect the module cap stated in SKILL.md. Each box is a RESPONSIBILITY, never a file name,
    %% and each one must have a named pressure behind it (see constraint-to-module.md).
    subgraph yours["Yours to write"]
        ENTRY["entry point<br/>args + wiring"]
        VALID["input validation"]
        CORE["core rules"]
        OUT["output formatting"]
        CHECK["result comparison"]
    end

    %% Label every edge with the DATA that crosses it, not the call.
    %% If you cannot name the data, the boundary is probably wrong.
    ENTRY -->|"raw arguments"| VALID
    VALID -->|"validated input"| CORE
    CORE -->|"result"| OUT
    OUT -->|"produced output"| CHECK
    CORE -->|"request"| SDK
    SDK -->|"response"| CORE
    FIX -.->|"expected outputs"| CHECK

    classDef given fill:#eee,stroke:#999,stroke-dasharray: 4 3,color:#333
    class SDK,FIX given
```

### Filled Example (a word-frequency CLI)

```mermaid
flowchart TD
    subgraph provided["Provided — do not modify"]
        CORPUS["sample corpus files"]
    end

    subgraph yours["Yours to write"]
        CLI["entry point<br/>flags, paths, exit codes"]
        READ["text reader<br/>file → lines"]
        COUNT["frequency counter<br/>lines → counts"]
        REPORT["report writer<br/>counts → table"]
    end

    CLI -->|"file paths, options"| READ
    CORPUS -.->|"raw text"| READ
    READ -->|"lines of text"| COUNT
    COUNT -->|"word → count map"| REPORT
    REPORT -->|"formatted table"| CLI

    classDef given fill:#eee,stroke:#999,stroke-dasharray: 4 3,color:#333
    class CORPUS given
```

---

## Data Flow / Sequence Diagram (optional)

Include **only** when the order of operations is non-obvious — a loop with feedback, a retry, a multi-pass algorithm. For a straight pipeline it adds nothing; skip it.

### Blank Template

```mermaid
sequenceDiagram
    participant A as caller
    participant B as module
    participant C as provided component

    A->>B: input
    B->>C: request
    C-->>B: response
    B-->>A: result
```

### Annotated Template

```mermaid
sequenceDiagram
    %% Use a sequence diagram when SOMETHING REPEATS or SOMETHING COMES BACK.
    %% A loop box is the reason to draw this at all.
    participant Driver as driver
    participant State as state holder
    participant Ext as provided service

    Driver->>State: initial input

    loop until stopping condition
        %% Name the stopping condition in the loop label — this is the
        %% single most useful thing on the diagram for a beginner.
        State->>Ext: current context
        Ext-->>State: next piece
        State->>State: update accumulated result
    end

    State-->>Driver: final result
```

### Filled Example (retrying fetch with backoff)

```mermaid
sequenceDiagram
    participant CLI as entry point
    participant Fetch as fetch adapter
    participant API as remote API

    CLI->>Fetch: url, max attempts

    loop until success or attempts exhausted
        Fetch->>API: HTTP request
        API-->>Fetch: response or error
        Fetch->>Fetch: on error, wait and increment attempt
    end

    Fetch-->>CLI: payload or final failure
```

---

## Module Dependency Graph

Use when the trainee's worry is *coupling* — "can I test this alone?" — rather than data flow. Arrows mean "depends on", so a cycle is a defect you can see.

### Blank Template

```mermaid
flowchart LR
    A["module a"] --> B["module b"]
    A --> C["module c"]
    B --> D["shared model"]
    C --> D
```

### Annotated Template

```mermaid
flowchart LR
    %% An arrow here means "cannot compile/run without". Not "calls sometimes".
    %% Look for two things:
    %%   1. A CYCLE — two modules that depend on each other. Always a design error.
    %%   2. A box everything points at — usually the data model, and that is fine.
    ENTRY["entry point"] --> RULES["core rules"]
    ENTRY --> IO["input/output"]
    RULES --> MODEL["shared model"]
    IO --> MODEL

    %% MODEL depends on nothing. That is what makes it testable in isolation.
```

### Filled Example

```mermaid
flowchart LR
    main["main"] --> parser["parser"]
    main --> reporter["reporter"]
    parser --> record["record model"]
    reporter --> record
```

---

## Layer Diagram

Use when the task genuinely has layers — each layer may call downward only. Do not force it onto a pipeline.

### Blank Template

```mermaid
flowchart TD
    L1["presentation"] --> L2["application logic"]
    L2 --> L3["data access"]
```

### Filled Example

```mermaid
flowchart TD
    UI["terminal output"] --> APP["task rules"]
    APP --> STORE["file storage"]
    APP --> MODEL["domain model"]
    STORE --> MODEL
```

---

## Diagram Best Practices for trainees

- **One screen.** If it needs scrolling, the trainee cannot hold it. Cut boxes, not font size.
- **Respect the module cap in SKILL.md.** Below it you are probably not decomposing; above it you are decomposing by noun rather than by reason to change.
- **Name responsibilities, not files.** `frequency counter` teaches; `utils.py` does not.
- **Label edges with data.** If you cannot name what crosses the boundary, the boundary is in the wrong place.
- **No code in a node label.** No signatures, no types, no pseudocode. A node label that contains `def` has become a solution.
- **Distinguish given from authored.** Always. It is the difference between a constraint and a choice.
- **Dashed arrows for data that is read but not called** — fixtures, config, corpora.
- **Cycles are bugs — in the *dependency* graph.** If module A needs B to compile and B needs A, say so and ask which direction should be broken. A loop in a *data-flow* diagram is fine and often correct: a result traveling back to the entry point to be printed is not a dependency cycle.
- **`<br/>` for a second line** in a node label to add a short qualifier. Keep it to a handful of words.
- **Quote every label containing punctuation.** `A["input (raw)"]` renders; `A[input (raw)]` does not.
