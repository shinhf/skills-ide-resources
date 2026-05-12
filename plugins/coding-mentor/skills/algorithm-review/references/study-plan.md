# Rank 02 Preparation — Study Plan & Drill Template

This is the study scaffold the mentor recommends when a student says "I want to prepare for Rank 02." Use it to set expectations and to pick which task family to drill next; do not hand it to the student as a worksheet they passively follow.

---

## Why "algorithm-first" is the right frame for this exam

Strengths:
- Forces problem decomposition before syntax interferes.
- Exposes edge cases earlier (parsing and traversal tasks especially).
- Encourages the "find your own solution" behavior 42 explicitly values.
- Supports peer discussion at the level of logic, not characters.

Risks (warn the student about these):
- Creates false confidence if the algorithm is never compiled.
- Tempts over-documentation on trivial Level 1 tasks.
- Does not train C-specific hazards: pointer mistakes, signed-char indexing, alloc cleanup, output formatting.
- Becomes rote if the same pseudocode template is reused without testing.

**Bottom line for the student:** algorithms are the first pass, not the final pass. Every algorithm note must end with a translation checkpoint.

---

## Two-week preparation cycle

| Days | Focus | Representative tasks | Output |
|---|---|---|---|
| 1–3 | Level 1 — scanning & transforms | `first_word`, `last_word`, `search_and_replace`, `rev_print`, `ulstr` | 1-page algorithm + immediate code translation |
| 4–6 | Level 2 — dispatch & dedup | `do_op`, `union`, `inter`, `alpha_mirror`, `swap_bits`, `print_bits` | 20-minute coding drills from own pseudocode |
| 7–10 | Level 3 — parsing & structural reasoning | `ft_atoi_base`, `hidenp`, `ft_range`, `pgcd`, `print_hex`, `str_capitalizer` | "Algorithm first, code second, test third" loops |
| 11–14 | Level 4 — allocation & traversal | `ft_split`, `rev_wstr`, `rostring`, `sort_list`, `fprime`, `flood_fill` | Full mock sequences + self/peer review |

---

## Daily drill template

The student should run this loop on **one** task per day:

1. **Read the subject** and rewrite it as a three-line contract:
   - Input.
   - Required behavior.
   - Failure / edge behavior.
2. **Write 6–12 lines** of pseudocode or a compact flowchart.
3. **Predict** time/space complexity; list **at least three** edge cases.
4. **Hide the subject** and implement from the algorithm only.
5. **Test** on subject examples + own edge cases.
6. **Compare failures** to the algorithm: was the logic wrong, or was translation wrong?

Step 6 is the most important — it routes the student back into the correct study mode (re-think vs. re-translate).

---

## Translation exercise types

When a student plateaus, rotate exercises:

- **Reverse engineering** — take a known solution and reconstruct the algorithm it must be implementing.
- **Forward translation** — given only pseudocode, implement without rereading the subject.
- **Constraint compression** — rewrite the subject as five invariants/rules.
- **Edge-case generation** — invent one empty-input case, one malformed-input case, one boundary case.
- **Representation swaps** — solve once with indices, once with pointers; once recursively, once iteratively (where applicable).
- **Peer defense** — explain why each branch exists. Branches that cannot be justified are usually accidental.

---

## The one principle to optimize for

> Every algorithm note must end with a **translation checkpoint**:
> what variables exist, what loop invariant is maintained, and what exactly is printed or returned.

That checkpoint prevents algorithm-first study from drifting into abstraction and turns it into exam-ready coding behavior.

---

## How the mentor uses this file during review

- Diagnose where the student is in the 2-week cycle (which level dominates their pain).
- Recommend **one** task family for tomorrow, not five.
- If the student skipped step 6 yesterday, that is the lesson — make them name whether their last failure was logical or translational.
- Don't hand them the table. Talk them into the next task; let them write the schedule themselves.
