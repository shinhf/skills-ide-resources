# Library Rationale

How to answer "what is this library *for*?" in a way a trainee learns from. Used in Step 5 of the mapping loop.

The failure mode this file exists to prevent: a trainee installs four packages because a tutorial did, and can defend none of them.

---

## The three-question test

Every library in the table must survive all three:

1. **What does it do?** In one sentence, in terms of the task — not "it's a HTTP library" but "it retries failed downloads for us".
2. **What would you write by hand instead?** Be concrete and honest: "about 15 lines and a retry loop" or "a correct URL parser, which is genuinely hard".
3. **Is the standard library enough?** Default to yes.

**The ten-line rule:** if the honest answer to (2) is "about ten lines", the answer to (3) is yes. Recommend the standard library and let the trainee write those ten lines — that is the exercise.

**The inverse rule:** if the honest answer to (2) is "a correct implementation of something with a specification" (dates, TLS, Unicode, floating-point formatting, a real parser), take the library. Reimplementing a spec is not the exercise, and getting it subtly wrong teaches the wrong lesson.

---

## Categories, and what they buy

| Category | What it removes | Usually worth it? |
|---|---|---|
| Argument parsing | Manual `argv` walking, help text, type coercion | Only past ~3 flags. Stdlib is fine. |
| Data validation / modelling | Hand-written type checks at every boundary | **Yes** when correctness is graded on exact shape |
| HTTP clients | Connection handling, redirects, retries, encoding | **Yes.** Do not hand-roll HTTP |
| Numeric arrays | Python-level loops over large arrays | **Yes** when the array is large and touched per-iteration |
| Date/time | Timezone and calendar arithmetic | **Yes**, always. This is harder than it looks |
| Testing | A runner, assertions, fixtures | **Yes**, and it is usually already there |
| Pretty output / colour | Table alignment, ANSI codes | Cosmetic. Never load-bearing. Last thing to add |
| Logging | Levels, formatting, destinations | Stdlib is fine and already installed |
| Serialization (JSON/CSV/YAML) | Format edge cases, escaping | Stdlib covers JSON and CSV. YAML needs a library |

---

## Transitive vs. direct — a distinction trainees miss

A dependency that arrives *through* something else is not one you chose, and often not one you should call directly.

- **Direct:** you import it, you must justify it, it goes in the table.
- **Transitive:** a provided SDK pulls it in. It appears in the lockfile. You typically never import it yourself.

Ask: *"Do you `import` this, or does it just show up in your lockfile?"* Listing a transitive dependency as one of your architectural choices is a sign the trainee has not looked at what they actually call.

---

## Per-stack shortlists

Each entry: **what problem it removes**. Not an endorsement — the trainee still has to pass the three-question test.

### Python
| Library | Removes |
|---|---|
| `argparse` *(stdlib)* | Manual `sys.argv` handling and help text |
| `pathlib`, `json`, `csv`, `re` *(stdlib)* | Almost every file/format/pattern need at this level |
| `pydantic` | Hand-written validation and type coercion at program boundaries |
| `numpy` | Per-element Python loops over large numeric arrays |
| `requests` / `httpx` | HTTP correctness: redirects, encodings, connection reuse |
| `pytest` | Test discovery, assertions, fixtures |
| `rich` | Terminal tables and colour — cosmetic only |

### JavaScript / TypeScript
| Library | Removes |
|---|---|
| `node:fs`, `node:path`, `fetch` *(built-in)* | Files, paths, HTTP. Reach for these first |
| `zod` | Runtime validation of data the type system cannot check |
| `commander` / `yargs` | Flag parsing and help output past a few options |
| `vitest` / `node:test` | Test running |
| `chalk` | Terminal colour — cosmetic only |

### C
| Library | Removes |
|---|---|
| *(nothing)* | **The default in C, and especially in school tasks, is no dependencies.** Writing it yourself is the exercise |
| `<string.h>`, `<stdlib.h>`, `<unistd.h>` | Baseline — and often restricted by the subject. Check the allowed-functions list first |

### .NET
| Library | Removes |
|---|---|
| `System.Text.Json` *(BCL)* | JSON handling. Already there |
| `System.CommandLine` | Flag parsing, help, tab completion |
| `xUnit` / `NUnit` | Test running |
| `Serilog` | Structured logging beyond what `ILogger` gives |

### Go
| Library | Removes |
|---|---|
| `flag`, `encoding/json`, `net/http` *(stdlib)* | Nearly everything at this level. Go's stdlib is unusually complete |
| `cobra` | Subcommand trees, not plain flags |
| `testify` | Assertion boilerplate in tests |

---

## The strongest answer is often "none"

For a school task with a fixed subject, a restricted allowed-functions list, and a grader, **zero dependencies is frequently the correct architecture.** Say so plainly when it is true. A trainee who learns that "no dependencies" is a legitimate, defensible answer has learned more than one who learns five package names.

Check before recommending anything:
- Does the subject **restrict** which functions or packages are allowed?
- Will the grading environment have network access to install them?
- Is the dependency in the provided scaffold already, or is the trainee adding it?

---

## Writing the table

The output column headings are fixed:

`| Library | What it's for | What you'd write by hand instead | Is the stdlib enough? |`

Rules for filling it:
- **"What it's for"** is phrased in terms of *this task*, not the library's own marketing.
- **"What you'd write by hand instead"** must be an estimate a trainee can sanity-check — a line count or a named hard problem.
- **"Is the stdlib enough?"** is `yes` / `no` plus three words of reason. When it is `yes`, the recommendation is the stdlib, and the row stays in the table so the trainee can see the decision was made deliberately.
- Mark transitive dependencies as such, and do not pad the table with them.
