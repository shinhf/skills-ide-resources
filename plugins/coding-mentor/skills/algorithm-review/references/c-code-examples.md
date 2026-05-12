# Reference C Solutions — MENTOR EYES ONLY

> **DO NOT PASTE THIS CODE TO THE STUDENT.**
>
> These solutions exist so the mentor can verify that the student's plan converges to a correct shape, and so the mentor recognizes the common pitfalls. They are not classroom material. If a student is struggling with `union`, do not show the `union` solution — pick a *different* family (e.g., a toy `int`-array dedup) for a snippet, ask Socratic questions, and let the student write their own.

These examples are intentionally written in a school-realistic style (no `<string.h>`, no library shortcuts, manual char-by-char work) so they match what the student will be asked to produce.

---

## Level 1 — `first_word`

```c
#include <unistd.h>

int main(int argc, char **argv)
{
    int i;

    if (argc != 2)
    {
        write(1, "\n", 1);
        return 0;
    }
    i = 0;
    while (argv[1][i] == ' ' || argv[1][i] == '\t')
        i++;
    while (argv[1][i] && argv[1][i] != ' ' && argv[1][i] != '\t')
    {
        write(1, &argv[1][i], 1);
        i++;
    }
    write(1, "\n", 1);
    return 0;
}
```

Mentor watchpoints:
- Students often forget the leading-whitespace skip.
- Students often forget to print a trailing newline on the empty-word case.

---

## Level 1 — `search_and_replace`

```c
#include <unistd.h>

static int strlen_c(char *s)
{
    int n = 0;
    while (s[n])
        n++;
    return n;
}

int main(int argc, char **argv)
{
    int i = 0;

    if (argc != 4 || strlen_c(argv[2]) != 1 || strlen_c(argv[3]) != 1)
    {
        write(1, "\n", 1);
        return 0;
    }
    while (argv[1][i])
    {
        if (argv[1][i] == argv[2][0])
            write(1, &argv[3][0], 1);
        else
            write(1, &argv[1][i], 1);
        i++;
    }
    write(1, "\n", 1);
    return 0;
}
```

Mentor watchpoints:
- Students often forget the length-1 check on argv[2]/argv[3].
- Students sometimes write `strcmp`-style comparisons instead of single-char comparisons.

---

## Level 2 — `do_op`

```c
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    int a, b, r;
    char op;

    if (argc != 4)
    {
        write(1, "\n", 1);
        return 0;
    }
    a = atoi(argv[1]);
    op = argv[2][0];
    b = atoi(argv[3]);
    if (op == '+')      r = a + b;
    else if (op == '-') r = a - b;
    else if (op == '*') r = a * b;
    else if (op == '/') { if (b == 0) { write(1, "\n", 1); return 0; } r = a / b; }
    else if (op == '%') { if (b == 0) { write(1, "\n", 1); return 0; } r = a % b; }
    else { write(1, "\n", 1); return 0; }
    printf("%d\n", r);
    return 0;
}
```

Mentor watchpoints:
- `argv[2][0]` only — many students compare a whole string instead of a single char.
- Division-by-zero guard is defensive but recommended.

---

## Level 2 — `union`

```c
#include <unistd.h>

int main(int argc, char **argv)
{
    int seen[256] = {0};
    int i;
    int a;

    if (argc != 3)
    {
        write(1, "\n", 1);
        return 0;
    }
    a = 1;
    while (a <= 2)
    {
        i = 0;
        while (argv[a][i])
        {
            unsigned char c = (unsigned char)argv[a][i];
            if (!seen[c])
            {
                seen[c] = 1;
                write(1, &argv[a][i], 1);
            }
            i++;
        }
        a++;
    }
    write(1, "\n", 1);
    return 0;
}
```

Mentor watchpoints:
- Casting to `unsigned char` for indexing — the most common bug.
- `int seen[256] = {0};` is the cleanest zero-init.

---

## Level 3 — `ft_atoi_base`

```c
static int digit_value(char c)
{
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return 10 + c - 'a';
    if (c >= 'A' && c <= 'F') return 10 + c - 'A';
    return -1;
}

int ft_atoi_base(const char *str, int str_base)
{
    int i = 0;
    int sign = 1;
    int result = 0;
    int d;

    if (str_base < 2 || str_base > 16)
        return 0;
    if (str[0] == '-')
    {
        sign = -1;
        i++;
    }
    while (str[i])
    {
        d = digit_value(str[i]);
        if (d < 0 || d >= str_base)
            break;
        result = result * str_base + d;
        i++;
    }
    return sign * result;
}
```

Mentor watchpoints:
- Helper `digit_value` returning `-1` cleanly separates validation from accumulation.
- Stop on invalid char, don't error — that is the spec.

---

## Level 3 — `hidenp`

```c
#include <unistd.h>

int main(int argc, char **argv)
{
    int i = 0;
    int j = 0;

    if (argc != 3)
    {
        write(1, "\n", 1);
        return 0;
    }
    while (argv[1][i] && argv[2][j])
    {
        if (argv[1][i] == argv[2][j])
            i++;
        j++;
    }
    if (argv[1][i] == '\0')
        write(1, "1", 1);
    else
        write(1, "0", 1);
    write(1, "\n", 1);
    return 0;
}
```

Mentor watchpoints:
- `j` advances unconditionally; `i` advances only on match.
- The post-condition test on `argv[1][i]` is what makes this work.

---

## Level 4 — `ft_split`

```c
#include <stdlib.h>

static int is_delim(char c)
{
    return (c == ' ' || c == '\t' || c == '\n');
}

static int count_words(char *s)
{
    int i = 0, n = 0;
    while (s[i])
    {
        while (s[i] && is_delim(s[i])) i++;
        if (s[i]) { n++; while (s[i] && !is_delim(s[i])) i++; }
    }
    return n;
}

static char *copy_word(char *src, int start, int end)
{
    int len = end - start;
    char *w = malloc(len + 1);
    if (!w) return NULL;
    for (int k = 0; k < len; k++) w[k] = src[start + k];
    w[len] = '\0';
    return w;
}

static void free_all(char **arr, int upto)
{
    for (int k = 0; k < upto; k++) free(arr[k]);
    free(arr);
}

char **ft_split(char *str)
{
    int count = count_words(str);
    char **arr = malloc(sizeof(char *) * (count + 1));
    if (!arr) return NULL;

    int i = 0, w = 0;
    while (str[i])
    {
        while (str[i] && is_delim(str[i])) i++;
        if (!str[i]) break;
        int start = i;
        while (str[i] && !is_delim(str[i])) i++;
        arr[w] = copy_word(str, start, i);
        if (!arr[w]) { free_all(arr, w); return NULL; }
        w++;
    }
    arr[w] = NULL;
    return arr;
}
```

Mentor watchpoints:
- Two-pass strategy is the cleanest.
- Allocation-failure cleanup is mandatory — most student solutions leak.
- `arr[count] = NULL` terminator is the contract.

---

## Level 4 — `flood_fill`

```c
typedef struct s_point { int x; int y; } t_point;

static void fill(char **tab, int W, int H, int x, int y, char target)
{
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    if (tab[y][x] != target) return;
    tab[y][x] = 'F';
    fill(tab, W, H, x + 1, y, target);
    fill(tab, W, H, x - 1, y, target);
    fill(tab, W, H, x, y + 1, target);
    fill(tab, W, H, x, y - 1, target);
}

void flood_fill(char **tab, t_point size, t_point begin)
{
    if (begin.x < 0 || begin.y < 0 || begin.x >= size.x || begin.y >= size.y)
        return;
    char target = tab[begin.y][begin.x];
    if (target == 'F') return;
    fill(tab, size.x, size.y, begin.x, begin.y, target);
}
```

Mentor watchpoints:
- Short-circuit when `target == 'F'` — otherwise infinite recursion.
- Bounds-check on entry to `fill` makes the recursion safe.
- Four-direction recursion only — no diagonals.

---

## Final mentor reminder

If the student says "just show me the code", do **not** open this file in front of them. Open `algorithm-playbook.md` instead and pick one Socratic prompt that targets the part of their plan that is closest to a working algorithm. Their job is to write the C, not yours.
