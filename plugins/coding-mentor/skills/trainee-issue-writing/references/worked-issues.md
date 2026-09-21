# Worked Trainee Issues

> **MENTOR-SIDE REFERENCE.** These bodies exist so *you* can calibrate the depth, tone
> and size of a good trainee issue. **Do not hand this file to a trainee**, and do not
> publish these bodies as their tasks. If a trainee's real work happens to resemble one
> of them, run the loop on *their* task and let the sections come out of their subject.

Three worked issues at increasing difficulty. The subjects are **deliberately unrelated to any real curriculum project** — per `mentor-guidance` §4, a worked example must not map onto the trainee's actual task. Each one shows the title, the full eight-section body, and a note on why it is sized and scoped the way it is.

Example 2 is shown **before and after a split**, to demonstrate the "an 'and' in the goal sentence" tripwire.

---

## 1. Easy — the largest file in a directory

### Title

```
Report the largest file in a given directory
```

### Body

````markdown
## Goal

Given a directory path, print the name and size of the largest regular file directly inside it.

## Why this task exists

This is the first step of the build order: it is the smallest program that has to touch
the filesystem, so it de-risks the unfamiliar part before any of the reporting work is
built on top of it.

## Done when

- [ ] Run on the `samples/mixed/` directory, the program prints the same filename that
      `ls -S samples/mixed | head -1` prints.
- [ ] Run on an empty directory, the program prints a message and exits without an error.
- [ ] Run on a path that does not exist, the program says so and exits non-zero.

## What you already have

- `samples/mixed/` — six files of known, different sizes, and one empty subdirectory.
- `samples/empty/` — an empty directory, for the second check.
- Nothing else. This is the first task; there is no earlier issue to build on.

## Concepts you may need

- directory listing — run `/explain-subject "directory listing"`
- file metadata — run `/explain-subject "file metadata"`

## Constraints from the subject

- Standard library only — no third-party packages.
- The path comes from a command-line argument, not from input typed at a prompt.
- Print exactly one line on success: the filename, a space, the size in bytes.
- Exit code 0 on success, non-zero on any error.

## Out of scope

- Recursing into subdirectories — see #2.
- Human-readable sizes such as `1.4 MB` — see #5.
- Symbolic links, sockets and anything that is not a regular file. Skip them silently
  for now; the policy for them is decided in #2.

## Questions to answer before you start

1. What should happen if two files are exactly the same size?
2. Is a directory a file for the purposes of "largest"? What does the subject say?
3. How would you prove your program is right without trusting `ls`?
````

### Mentor note

One sitting, comfortably. It is sized by its single primary check — a filename printed that can be compared against a tool the trainee already has — and scoped by an "Out of scope" section three lines long, which is doing most of the work. Recursion is the obvious next thought a beginner has, and the obvious next thought is exactly what has to be fenced off, by reference, or the first task becomes a directory-walker with a broken base case.

Two concepts, both nameable. The third question is the one worth having: it asks for a verification strategy, which is what turns a "Done when" into a habit rather than a hoop.

---

## 2. Medium — a CSV-to-JSON converter with a malformed-row policy

### Before the split — do not publish this

````markdown
## Goal

Convert a CSV file to a JSON array of objects and handle malformed rows according to a
policy chosen on the command line.
````

The goal sentence contains "and". That is the tripwire, and it is not a style point: the two halves have different "done when" checks, need different fixtures, and fail for different reasons. A trainee handed this issue writes the happy path, discovers the policy question halfway through, and rewrites the happy path. Two issues:

### After the split — first issue

```
Convert a well-formed CSV file to a JSON array
```

````markdown
## Goal

Turn a CSV file whose rows all have the expected number of columns into a JSON array of
objects keyed by the header row.

## Why this task exists

The subject grades the output format separately from the parsing rules, so the two have
to be able to change without disturbing each other. Settling that on clean input first
means the malformed-row work in #4 lands in one place rather than three.

## Done when

- [ ] Run on `samples/clean.csv`, the output parses as JSON and contains one object per
      data row, with the header names as keys.
- [ ] Run on a CSV with only a header row, the output is an empty JSON array.

## What you already have

- `samples/clean.csv` — 12 rows, 4 columns, no quoting oddities, no missing values.
- `samples/header-only.csv` — for the second check.
- `samples/clean.expected.json` — the exact output expected for the first check.

## Concepts you may need

- delimiter-separated values — run `/explain-subject "delimiter-separated values"`
- JSON serialization — run `/explain-subject "JSON serialization"`

## Constraints from the subject

- Standard library only.
- Input path and output path are both command-line arguments.
- Output is a single JSON array, UTF-8, with a trailing newline.
- Values stay strings. No type inference in this issue.

## Out of scope

- Malformed rows of any kind — see #4. `samples/clean.csv` has none.
- Quoted fields containing the delimiter — see #6.
- Type inference, so that `"3"` becomes `3` — see #7, and only if the subject asks.

## Questions to answer before you start

1. What is the smallest CSV file that is still valid input?
2. What has to be true between reading and writing for the input format and the output
   format to change independently?
3. If the header row had a duplicate name, what would your output do?
````

### After the split — second issue

```
Apply a chosen policy to malformed CSV rows
```

````markdown
## Goal

Given a row whose column count does not match the header, apply the policy named by a
command-line flag: skip it, or stop with an error.

## Why this task exists

The subject makes malformed input a graded behaviour rather than an accident, so the
decision about what to do with a bad row belongs in one named place instead of being
spread through the reader.

## Done when

- [ ] Run on `samples/ragged.csv` with the skip policy, the output contains exactly the
      four well-formed rows and a count of skipped rows on stderr.
- [ ] Run on the same file with the strict policy, the program exits non-zero and names
      the line number of the first bad row.

## What you already have

- The converter from #3, which already turns clean input into a JSON array.
- `samples/ragged.csv` — 6 rows: four well-formed, one short, one long.

## Concepts you may need

- input validation — run `/explain-subject "input validation"`
- exit codes and standard error — run `/explain-subject "exit codes"`

## Constraints from the subject

- Standard library only.
- The policy flag has exactly two accepted values, and any other value is itself an error.
- Counts and diagnostics go to stderr; the JSON array is the only thing on stdout.
- Line numbers in messages are 1-based and count the header row.

## Out of scope

- Repairing a malformed row by padding or truncating it. Not a policy the subject offers.
- Quoted fields containing the delimiter — see #6. A field like `"a,b"` is well-formed
  input this issue is not yet expected to survive.

## Questions to answer before you start

1. Is a row with the right column count but an empty value malformed?
2. Which of the two policies should be the default, and what in the subject decides that?
3. Where in your program does a row stop being text and start being a record — and which
   side of that line does this check belong on?
````

### Mentor note

The split is clean because the fixtures split with it: `clean.csv` for one issue, `ragged.csv` for the other. When a split leaves both halves needing the same fixture and the same check, it was a bad split.

Note what the second issue's "Out of scope" does. A beginner reading "malformed rows" reasonably assumes a quoted comma counts as malformed; the fence says it does not, and points at the issue that owns it. Without that line, the trainee either over-builds or fails a grader for the wrong reason. Note too that neither body says where the policy lives or what shape the record is — the third question in the second issue deliberately asks the trainee to decide that.

---

## 3. Harder — a retry wrapper around a flaky local endpoint

### Title

```
Retry failed requests to the sample endpoint within a rate limit
```

### Body

````markdown
## Goal

Wrap calls to the provided local endpoint so that failed requests are retried without
ever exceeding the endpoint's stated request rate.

## Why this task exists

The provided client has no retry and no throttle, and the endpoint fails about one call in
three. Every later task in the build order calls through this wrapper, so the retry
decision is made once, here, rather than at each call site.

## Done when

- [ ] Run against `flaky-server` for 60 seconds, every one of the 40 requested items is
      eventually returned, and the server's own log reports no rate-limit rejections.
- [ ] With the server stopped, a call gives up after the configured number of attempts and
      reports which attempt failed, instead of hanging or looping forever.

## What you already have

- `flaky-server` — a local server, read-only, which fails ~33% of requests with a 503,
  rejects anything above 5 requests per second with a 429, and logs every rejection.
- `client.py` — the provided single-request client. Read-only. It has no retry and no
  rate limiting; that absence is the reason this issue exists.
- The architecture map from `ARCHITECTURE.md`, which places this wrapper between your
  code and `client.py`.

## Concepts you may need

- idempotency — run `/explain-subject "idempotency"`
- exponential backoff — run `/explain-subject "exponential backoff"`
- rate limiting — run `/explain-subject "rate limiting"`

## Constraints from the subject

- Python 3.10+, standard library only. `client.py` is the only permitted transport.
- Never exceed 5 requests per second, measured over any one-second window.
- Maximum attempts per item is configurable and defaults to 4.
- `mypy --strict` and `flake8` clean.
- Do not modify `client.py` or `flaky-server`.

## Out of scope

- Concurrency. One request at a time is enough to pass both checks — see #9.
- Caching successful responses — see #11.
- Distinguishing the 503 and 429 responses in your retry policy — see #10. Treat any
  failure the same way for now.

## Questions to answer before you start

1. Which failures are safe to retry, and how do you know that from the subject?
2. A retry and the rate limit pull in opposite directions. Which one wins, and what does
   the loser do while it waits?
3. How would you prove the 5-per-second limit was never breached, using only the server's
   log?
````

### Mentor note

This is the ceiling for a single trainee issue, and it is at the ceiling for the right reason: three concepts, the maximum the sizing rule allows. A fourth — say, jitter — would have to move to its own issue.

It stays one sitting despite the difficulty because the fence is aggressive. Concurrency, caching, and per-status-code policy are all natural next thoughts, all referenced out. What remains is a single loop with a delay, which a beginner can finish. The body never says *how* the delay is computed, never names a data structure for the timestamps, and never mentions a library: "exponential backoff" appears only as a concept name, with an `/explain-subject` invitation attached.

The second question is the whole task in one line — it names the tension and refuses to resolve it. That is the shape to aim for in section 8.

---

## What the three have in common

- The primary "Done when" is checked against something the trainee already has: a shell tool, an expected-output fixture, or the server's own log. Never against a test that does not exist yet.
- "Out of scope" grows as the task gets harder. The hardest issue has the longest fence, not the longest goal.
- The concept list is the size governor. Two, two, three — and the third issue is explicitly at the limit.
- Not one body contains a signature, a type, a data-structure choice or a named library.
- Every "Why this task exists" points at something outside the issue: a build-order step, a module boundary, a gap in a provided component.
