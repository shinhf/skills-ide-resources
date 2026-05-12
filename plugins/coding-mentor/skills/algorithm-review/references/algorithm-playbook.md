# Algorithm Playbook — 8 Representative Tasks

For each task: the algorithm in plain steps, complexity, edge cases, and **Socratic prompts** the mentor can use during review. Algorithms are language-agnostic; the canonical Rank 02 pool is C-oriented.

Notation: `n` = length of one input string, `m` = length of a second input string, `k` = number of words, `W × H` = grid size.

---

## Level 1

### `first_word` — print the first word

**Algorithm**
1. Check exactly one user-supplied string. If not, print newline and stop.
2. `i = 0`. Skip spaces and tabs.
3. If end of string, print newline and stop.
4. While not end and not space/tab: output `str[i]`; `i++`.
5. Print final newline.

**Complexity:** time O(n), space O(1).

**Edge cases**
- Empty string.
- String of only spaces/tabs.
- Leading whitespace before the word.
- Single-word string (no trailing whitespace).
- Punctuation inside the word — treated as word content.

**Socratic prompts**
- "What does your algorithm do if the user passes zero arguments?"
- "If the string starts with three spaces, where does the print start?"
- "What is the exact stopping condition for the print loop?"

---

### `search_and_replace` — single-char substitution

**Algorithm**
1. Check exactly three user arguments.
2. Check argv[2] length == 1 and argv[3] length == 1.
3. If any check fails, print newline and stop.
4. Read `old_char`, `new_char`.
5. Scan string left-to-right; emit `new_char` if char == `old_char`, else emit original.
6. Print newline.

**Complexity:** time O(n), space O(1).

**Edge cases**
- Two-character search argument (`"ab"`) → must be rejected.
- Search char doesn't appear → output equals input.
- Search and replace identical → output equals input.
- Empty input string.

**Socratic prompts**
- "How do you tell the difference between a one-character argument and a two-character argument?"
- "What happens if the user types `./a.out hello l L`? What about `./a.out hello ll L`?"

---

## Level 2

### `do_op` — three-arg arithmetic

**Algorithm**
1. Check exactly three user arguments.
2. Parse argv[1] → `a`, read argv[2] → `op`, parse argv[3] → `b`.
3. Validate `op` ∈ {`+`, `-`, `*`, `/`, `%`}.
4. Dispatch and compute.
5. Print result + newline.

**Complexity:** time O(total input length), space O(1).

**Edge cases**
- Wrong argc → newline only.
- Negative operands.
- Division/modulo by zero (subject says input is valid — but defensively guard).
- Unknown operator string ("plus", "++", "/x").
- Multi-character operator argument.

**Socratic prompts**
- "What does your code do when `op` is `++` instead of `+`?"
- "If the subject says input is valid, does that mean you trust it or that you assume it?"
- "What is the simplest way to dispatch on a single character — `switch`, `if`-chain, or a table?"

---

### `union` — encounter-order deduplication

**Algorithm**
1. Check exactly two user arguments.
2. Create `bool seen[256]` initialized to false.
3. Scan string 1: for each char `c`, if `!seen[(unsigned char)c]`, output `c` and set `seen[...] = true`.
4. Scan string 2: same logic.
5. Print newline.

**Complexity:** time O(n+m), space O(1) (fixed 256-byte table).

**Edge cases**
- Repeated character within one string.
- Character appears in both strings.
- Empty strings.
- Signed `char` indexing — must cast to `unsigned char`.

**Socratic prompts**
- "Why is the size of `seen` exactly 256, and not the length of the input?"
- "What happens if `char` is signed and you index `seen[c]` with a negative value?"
- "How is encounter order preserved without sorting?"

---

## Level 3

### `ft_atoi_base` — base-N to base-10

**Algorithm**
1. If `str_base < 2` or `> 16`, return 0.
2. `i = 0`, `sign = 1`, `result = 0`.
3. If `str[0] == '-'`: `sign = -1`; `i++`.
4. While `str[i] != '\0'`:
   - Map char to digit (`0-9 → 0-9`, `a-f`/`A-F → 10-15`).
   - If invalid char OR digit ≥ base → stop scan.
   - `result = result * base + digit`.
   - `i++`.
5. Return `sign * result`.

**Complexity:** time O(n), space O(1).

**Edge cases**
- Uppercase vs lowercase hex digits.
- Leading minus sign only at index 0.
- Empty string.
- Digit out of range for the base (e.g., `'9'` in base 5).
- Invalid character mid-string — stop, don't error.
- No leading `+` in subject — don't invent it.

**Socratic prompts**
- "Walk me through what `result` holds after reading `1A` in base 16."
- "If your loop hits a `Z` mid-string, should it stop or skip?"
- "Where do you map `'a'` to 10 — and does `'A'` use the same code path?"

---

### `hidenp` — subsequence test

**Algorithm**
1. Check exactly two user arguments.
2. `i = 0`, `j = 0`.
3. While `s1[i] != '\0'` AND `s2[j] != '\0'`:
   - If `s1[i] == s2[j]`: `i++`.
   - `j++` always.
4. If `s1[i] == '\0'` print `1`, else print `0`.
5. Print newline.

**Complexity:** time O(n+m), space O(1).

**Edge cases**
- Empty `s1` → `1` (empty is hidden in anything).
- Empty `s2` and non-empty `s1` → `0`.
- Repeated letters in `s1`.
- `s1` longer than `s2` → must be `0`.

**Socratic prompts**
- "Which pointer always advances, and which only sometimes advances?"
- "How does your loop know `s1` is fully matched — what is the post-condition?"
- "If `s1 = ""` and `s2 = "abc"`, what does your loop do on the first iteration?"

---

## Level 4

### `ft_split` — tokenize with allocation

**Algorithm**
1. Define `is_delim(c)` returning true for space, tab, newline.
2. **Pass 1:** count words by skipping delimiters then skipping a word, repeat.
3. Allocate `char **arr` of size `count + 1`.
4. **Pass 2:** for each word:
   - Skip delimiters.
   - Record `start`; advance to next delimiter; `len = i - start`.
   - Allocate `len + 1` chars.
   - Copy `len` chars; write `'\0'`.
   - Store pointer in `arr`; increment word index.
5. `arr[count] = NULL`.
6. Return `arr`.
7. On any allocation failure: free everything allocated so far, return NULL.

**Complexity:** time O(n), space O(n + k).

**Edge cases**
- Empty string → return array with one NULL element.
- All-delimiter string.
- Leading and trailing delimiters.
- Consecutive delimiters.
- Single word, no delimiters.
- Allocation failure mid-loop.

**Socratic prompts**
- "Why two passes? What would change if you tried a single-pass realloc strategy?"
- "Who owns the memory of each word, and who frees it?"
- "If `malloc` fails on word 4 of 10, what must happen to words 0–3?"
- "What does your function return when the input is `"   "` (three spaces)?"

---

### `flood_fill` — connected-region fill

**Algorithm**
1. Validate `begin.x`, `begin.y` are in `[0, W) × [0, H)`.
2. Read `target = tab[begin.y][begin.x]`. If `target == 'F'`, stop.
3. Recursive helper `fill(x, y)`:
   - If `x` or `y` out of bounds, return.
   - If `tab[y][x] != target`, return.
   - Set `tab[y][x] = 'F'`.
   - Recurse on `(x+1,y)`, `(x-1,y)`, `(x,y+1)`, `(x,y-1)`.
4. Call `fill(begin.x, begin.y)`.

**Complexity:** time O(A) where A = filled cells; worst case O(W·H). Space O(A) for stack/queue.

**Edge cases**
- Start on grid border.
- Single-cell region.
- Whole grid is one region.
- Target already equals fill char — must short-circuit or infinite-loop.
- Deep recursion on large grid → stack overflow risk; iterative DFS/BFS safer.

**Socratic prompts**
- "What happens if the fill character equals the target character — does your recursion terminate?"
- "Why exactly four recursive calls, and not eight?"
- "If the connected region has 1 million cells, what limits your recursion?"

---

## Reading the prompts

Every "Socratic prompts" block is a menu, not a script. Pick **one or two** prompts that target the weakest part of the student's plan. Never read the whole list out loud — that turns the review into a checklist instead of a conversation.
