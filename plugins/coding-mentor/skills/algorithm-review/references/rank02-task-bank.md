# School 42 — Exam Rank 02 Task Bank

The Rank 02 exam draws one random task from each of four levels. The public community pool contains **57 C exercises** distributed **12 + 20 + 15 + 10** across Levels 1–4. The list below is reconstructed from convergent public mirrors and is not an official 42 publication.

Naming note: Level 1 contains a string-output exercise named either `putstr` or `ft_putstr` depending on the mirror. They are the same underlying task — treat as one slot.

---

## Level 1 — 12 tasks (scanning / transforms)

| Task | Brief |
|---|---|
| `first_word` | Print only the first word of the input string. |
| `fizzbuzz` | Print the classic FizzBuzz sequence. |
| `ft_strcpy` | Copy one string into another. |
| `ft_strlen` | Return the length of a string. |
| `putstr` / `ft_putstr` | Output a string to standard output. |
| `ft_swap` | Swap two integers through pointers. |
| `repeat_alpha` | Repeat letters according to alphabet position. |
| `rev_print` | Print a string in reverse order. |
| `rot_13` | Apply ROT13 to alphabetic characters. |
| `rotone` | Shift alphabetic characters by one position. |
| `search_and_replace` | Replace one character in a string with another. |
| `ulstr` | Invert the case of alphabetic characters. |

---

## Level 2 — 20 tasks (dispatch / deduplication / bits)

| Task | Brief |
|---|---|
| `alpha_mirror` | Replace each letter by its opposite in the alphabet. |
| `camel_to_snake` | Convert lowerCamelCase to snake_case. |
| `do_op` | Compute a simple arithmetic operation from three arguments. |
| `ft_atoi` | Convert a numeric string to an integer. |
| `ft_strcmp` | Compare two strings lexicographically. |
| `ft_strcspn` | Return prefix length before any reject character appears. |
| `ft_strdup` | Allocate and duplicate a string. |
| `ft_strpbrk` | Find the first accepted character in a string. |
| `ft_strrev` | Reverse a string. |
| `ft_strspn` | Return prefix length consisting only of accepted characters. |
| `inter` | Print unique characters common to both strings, in first-string order. |
| `is_power_of_2` | Test whether an integer is a power of two. |
| `last_word` | Print only the last word of the input string. |
| `max` | Return the maximum element of an integer array. |
| `print_bits` | Print the binary representation of a byte. |
| `reverse_bits` | Reverse the bit order of a byte. |
| `snake_to_camel` | Convert snake_case to lowerCamelCase. |
| `swap_bits` | Swap the two 4-bit halves of a byte. |
| `union` | Print unique characters appearing in either string, in encounter order. |
| `wdmatch` | Print the first string only if it appears in-order within the second. |

---

## Level 3 — 15 tasks (parsing / numerics / lists)

| Task | Brief |
|---|---|
| `add_prime_sum` | Sum primes up to a given integer and print the result. |
| `epur_str` | Normalize spacing to one space between words. |
| `expand_str` | Normalize spacing to three spaces between words. |
| `ft_atoi_base` | Convert a base-N string to a base-10 integer. |
| `ft_list_size` | Count nodes in a linked list. |
| `ft_range` | Allocate a consecutive integer array from start to end. |
| `ft_rrange` | Allocate a reversed consecutive integer array from end to start. |
| `hidenp` | Test whether the first string is hidden in the second in order. |
| `lcm` | Compute the least common multiple of two integers. |
| `paramsum` | Print the number of command-line parameters. |
| `pgcd` | Compute the greatest common divisor of two integers. |
| `print_hex` | Convert a decimal number to lowercase hexadecimal output. |
| `rstr_capitalizer` | Capitalize the last letter of each word. |
| `str_capitalizer` | Capitalize the first letter of each word. |
| `tab_mult` | Print the multiplication table for a number. |

---

## Level 4 — 10 tasks (allocation / traversal / structures)

| Task | Brief |
|---|---|
| `flood_fill` | Fill a connected orthogonal region in a 2D character grid. |
| `fprime` | Print the prime factorization of a positive integer. |
| `ft_itoa` | Convert an integer to a string. |
| `ft_list_foreach` | Apply a function to every linked-list element. |
| `ft_list_remove_if` | Remove nodes from a linked list based on a predicate. |
| `ft_split` | Split a string into words and return a null-terminated array. |
| `rev_wstr` | Print the words of a string in reverse order. |
| `rostring` | Rotate the first word to the end of the string. |
| `sort_int_tab` | Sort an array of integers. |
| `sort_list` | Sort a linked list using a comparison function. |

---

## Pattern families (for mentor calibration)

When a student names a task, classify it into a family before reviewing:

- **Linear scan / transform** — `first_word`, `last_word`, `rev_print`, `rot_13`, `rotone`, `ulstr`, `ft_strlen`, `repeat_alpha`.
- **One-shot substitution / validation** — `search_and_replace`, `alpha_mirror`, `camel_to_snake`, `snake_to_camel`.
- **Comparison / prefix scans** — `ft_strcmp`, `ft_strspn`, `ft_strcspn`, `ft_strpbrk`, `wdmatch`.
- **Bitwise** — `print_bits`, `reverse_bits`, `swap_bits`, `is_power_of_2`.
- **Dispatch / parsing** — `do_op`, `ft_atoi`, `ft_atoi_base`, `print_hex`.
- **Visitation table / dedup** — `union`, `inter`.
- **Subsequence** — `hidenp`, `wdmatch`.
- **Allocation / list-build** — `ft_strdup`, `ft_range`, `ft_rrange`, `ft_itoa`, `ft_split`.
- **Linked lists** — `ft_list_size`, `ft_list_foreach`, `ft_list_remove_if`, `sort_list`.
- **Numerics** — `pgcd`, `lcm`, `add_prime_sum`, `fprime`, `tab_mult`, `max`, `sort_int_tab`.
- **Grid traversal** — `flood_fill`.
- **Word rotation / spacing** — `rev_wstr`, `rostring`, `epur_str`, `expand_str`, `str_capitalizer`, `rstr_capitalizer`.

Picking the family first lets the mentor pull the right edge-case prompts from `algorithm-playbook.md` without improvising.
