# Worked Example — "Call Me Maybe"

> **MENTOR-SIDE REFERENCE.** This file exists so *you* can calibrate the depth, tone and
> shape of a good architecture map. **Do not hand its module list to a trainee who is
> currently doing this task.** If their subject is this one, run the mapping loop on
> *their* statement of it and let them arrive at their own boxes. Its real teaching value
> is the contrast in §4, which generalizes to any task.

---

## 1. The task

A 42-curriculum project on **LLM function calling by constrained decoding**.

Given two JSON files — a set of function definitions (name, description, typed parameters, return type) and a list of natural-language prompts — produce a JSON file of structured function calls with correctly typed arguments.

```
input:  {"prompt": "What is the sum of 2 and 3?"}
output: {"prompt": "What is the sum of 2 and 3?",
         "name": "fn_add_numbers",
         "parameters": {"a": 2.0, "b": 3.0}}
```

**The pedagogical core.** Students get a local, deliberately tiny model (Qwen3-0.6B) behind a provided, read-only `llm_sdk`. Prompting it naively yields valid JSON roughly 30% of the time — it adds commentary, breaks syntax, invents keys. There is no JSON mode to fall back on. Students must implement constrained decoding themselves: at each generation step, work out which tokens the JSON grammar and the function schema permit, push every other token's logit to `-inf`, and take the argmax.

**The single most important fact about the design** is the shape of the provided SDK:

```
get_logits_from_input_ids(input_ids) -> list[float]   # raw next-token logits
get_path_to_vocabulary_json()                         # path to the vocab file
```

There is **no `.generate()`** and **no public tokenizer** (`_encode`/`_decode` are private). Nearly every module in every solution traces back to that one decision. It is an unusually clean instance of *constraint #1 — a dependency hides an API you need*.

Grading is by a provided CLI that executes the produced calls and compares results exactly. Score is the fraction of exact matches; targets are ~90% accuracy and **100% JSON validity**. Stack: Python ≥3.10, `uv`, `flake8` + `mypy --strict` clean.

---

## 2. Provided vs. authored

This task has an unusually clear split, which makes it a good teaching vehicle for Step 2 of the loop:

| Component | Status |
|---|---|
| `llm_sdk/` | **Provided, read-only.** Vendored as a workspace member |
| grader CLI | **Provided.** Instructor tooling; prepares exercises and scores answers |
| `data/input/*.json` | **Provided.** Fixtures — function definitions and test prompts |
| `src/` | **Authored.** The only part the architecture question is about |

Trainees routinely draw all four as if they were design decisions. Three of them are constraints.

---

## 3. The pipeline both solutions implement

Strip away the file boundaries and every published solution is the same linear pipeline:

```
args → load + validate schemas → load vocabulary → encode prompt
     → [ loop: get logits → mask illegal tokens → pick token → update state ]
     → assemble JSON → validate → write
```

The interesting part is that this identical pipeline was cut into **two modules** by one student and **five** by another.

---

## 4. Why the module count differed — the actual lesson

Two real published solutions, same task, same grader.

| | Solution A (~2 modules) | Solution B (5 modules) |
|---|---|---|
| **Shape** | Thin entry point + one large decoder | Layered, one concept per file |
| **Entry point** | Does a lot: CLI, file I/O, data models, cached masks, orchestration, pretty-printing | Thin: parse args, build the encoder, wire the pieces, loop, write |
| **Decoding** | One module holding the whole character-level state machine | A model-wrapper module owning logits and masking |
| **Tokenizer** | None — works on the raw vocabulary dict inline | Its own module, with a trie and byte-level BPE symbol handling |
| **Schema layer** | Models declared inline in the entry point | Its own module, holding both human-readable and pre-tokenized forms |
| **Orchestrator** | (none — it is the entry point) | Its own module |
| **Constraint granularity** | Character-level: compute allowed *characters* at the current JSON position, mask tokens whose text does not fit | Options-level: keep a candidate list, allow only the first tokens of surviving candidates, eliminate as you go |

**The cause is documented, and it is one bug.** Solution B's author hit character-level masking truncating a rare name — `"shrek"` came out as `"shr"`, because the character-level view could not tell that a candidate was still incomplete. Fixing that meant switching to candidate-option decoding. Candidate-option decoding needs to compare *tokens*, which needs a real tokenizer. A real tokenizer re-run against the schemas on every step is O(n²), which needs the schemas pre-tokenized once.

> **One failure mode produced three modules.**

Solution A never hit that wall hard enough to refactor, so it stayed at two files — and it is not wrong. Both solutions pass.

This is the point to make with a trainee, and it generalizes past this task:

> **Module count follows from the pressures you actually hit, not from taste and not from a style guide.** When you cannot name the pressure, you cannot defend the boundary — and when you *can*, the boundary defends itself.

Use it in reverse, too. When a trainee asks "how many files should I have?", the honest answer is: "Fewer than you think, until something forces your hand. Here is a case where something did, and you can see exactly which three files it produced."

---

## 5. The library table, each row traced to a constraint

| Library | What it's for | Traced to |
|---|---|---|
| `llm_sdk` *(provided)* | The only channel to the model. Exposes raw logits, not generation | Imposed boundary (#6) — and the origin of nearly every other box |
| `numpy` | Vectorized masking of a ~150k-entry logit array, once per generated token | Recomputation in a hot loop (#2). A Python loop here dominates runtime |
| `pydantic` | Validates the input function schemas and the output call results | Exact-shape correctness (#3). Grading compares `2.0` against `2`, so coercion is a *scoring* concern |
| `torch`, `transformers` | Load and run the model | **Transitive** — pulled in by `llm_sdk`. Students never import them. A good example of a lockfile entry that is not an architectural choice |
| `argparse`, `json`, `re`, `pathlib` *(stdlib)* | Flags, I/O, deterministic pattern handling | The ten-line rule. No dependency justified |
| terminal-colour library | Pretty-printing results | Cosmetic, one solution only, not load-bearing |

Note the shape of this table: every entry is either *forced by the subject*, *forced by a measured cost*, *forced by how correctness is judged*, or *not a real choice at all*. That is what a defensible dependency list looks like.

---

## 6. A note on sources

The task is widely mirrored across student repositories, so the two-versus-five contrast above is reproducible rather than anecdotal. Beware one name collision: a repository under a `42labs` organization with a matching name is an unrelated 2022 Starknet/Cairo options-protocol hackathon project, not this exercise.
