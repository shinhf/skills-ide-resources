# ARCHITECTURE.md Template

The literal skeleton to emit. Keep the section order and the table headings exactly as written, so every run produces a document the trainee already knows how to read.

Replace everything in `<angle brackets>`. Delete section 5 when the order of operations is obvious.

---

## Skeleton

````markdown
# Architecture — <task name>

<One sentence: what this program must do, in plain language.>

> This is a map of the **structure**, not the solution. It says which parts exist and
> why. What goes inside each part is yours to work out.

## The contract

- **Input:** <what arrives, in what shape, with what guarantees>
- **Must do:** <what is produced in the normal case>
- **Must handle:** <bad input, missing files, wrong argument count, empty input>

## Components

```mermaid
flowchart TD
    subgraph provided["Provided — do not modify"]
        %% If there are no provided components, delete THREE THINGS TOGETHER:
        %% this subgraph, the classDef given line, and the class ... given line.
        %% An empty subgraph renders as a labeled empty box and implies a lie.
        <provided nodes>
    end

    subgraph yours["Yours to write"]
        <4-7 nodes, each a responsibility>
    end

    <edges, each labeled with the data that crosses it>

    classDef given fill:#eee,stroke:#999,stroke-dasharray: 4 3,color:#333
    class <provided node ids> given
```

## Modules

| Module | Responsibility | Which constraint forced it | What breaks if you merge it |
|---|---|---|---|
| <name> | <one sentence, a responsibility not a file> | <the named pressure> | <the concrete failure> |

## Data flow

<Delete this whole section unless something repeats or comes back.>

```mermaid
sequenceDiagram
    <participants and messages; name the stopping condition in the loop label>
```

## Libraries

| Library | What it's for | What you'd write by hand instead | Is the stdlib enough? |
|---|---|---|---|
| <name> | <in terms of this task> | <line estimate, or the named hard problem> | <yes/no + three words> |

<When the answer is no dependencies, say so in one line and keep the table showing
the decisions you considered.>

## Build order

1. **<step>** — done when: <a check the trainee can run themselves>
2. **<step>** — done when: <check>
3. **<step>** — done when: <check>

<Start with whatever de-risks the most — usually the unfamiliar provided component,
never the "easy" CLI.>

## Questions to answer before you write code

1. <question>
2. <question>
3. <question>
````

---

## Rules for filling it in

- **Restatement, not transcription.** Section 1's sentence should be shorter than the subject and in different words. If it reads like a copy-paste, the task was not understood.
- **Every module row needs all four columns.** A blank "which constraint forced it" means the box is unjustified — remove the box, not the column.
- **"What breaks if you merge it" must be a concrete failure**, not "it would be messy". `"a format change would force you to re-test the rules"` is a failure; `"poor separation of concerns"` is not.
- **No angle-bracket placeholder may survive inside a `mermaid` fence.** Before emitting, re-read the diagram and confirm every node id is a real identifier and every edge names real nodes. A leftover `<...>` is a hard parse error, not a cosmetic one — the trainee sees a broken diagram, not a map.
- **No code anywhere.** No signatures, no types, no pseudocode, no `def`/`function`/`int main`. Not in node labels, not in table cells, not in the build order.
- **The build order names deliverables, not activities.** `"reader turns a file into a list of lines"` beats `"start working on parsing"`.
- **Every "done when" must be runnable by the trainee** without you. `"printing the line count of the sample file matches wc -l"` is checkable; `"the parser works"` is not.
- **The closing questions are Socratic** (per `mentor-guidance` §3): they should be answerable by the trainee after thinking, and none of them should be answered anywhere else in the document.
- **Cap the whole file at roughly two screens.** A long architecture document for a beginner task is itself a design error.
