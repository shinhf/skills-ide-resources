# Slidedoc Anti-Patterns -- Common Mistakes and How to Fix Them

> **Source:** Nancy Duarte's *Slidedocs* ebook, Indezine interview with Nancy Duarte,
> Duarte blog posts, and Duarte template guidelines.

## Why Anti-Patterns Matter

Nancy Duarte created the Slidedoc concept specifically because she observed recurring
failures in how organizations use presentation software. Understanding these anti-patterns
helps both creators and reviewers catch problems early.

---

## Anti-Pattern 1: Presenting a Slidedoc as Projected Slides

### The Problem

A dense, text-heavy Slidedoc is loaded into a projector, and the presenter **reads the
content aloud** to the audience. This is the most common and most destructive misuse.

Nancy Duarte describes this as the scenario that "bored people silly" for years and
was the primary motivation for defining Slidedocs as a distinct format.

> Nancy Duarte (Indezine interview): "Dense slides aren't bad" -- the problem is
> **presenting them**, not the density itself. A Slidedoc should never be projected
> and narrated.

### Detection Signals

- High word density (150-200+ words/page) combined with **no pre-read/leave-behind markers** (no table of contents, no page numbers, no internal links)
- Document metadata or context indicates "for presentation" rather than "for reading"
- Slide builds and animations present on text-heavy pages (animations are for projection, not reading)

### The Fix

- **Label the document clearly** as a Slidedoc / pre-read / leave-behind
- Remove animations and builds (these serve a presenter, not a reader)
- Add book-like navigation (table of contents, page numbers, section dividers)
- Distribute for reading **before** the meeting; use meeting time for discussion, not reading aloud

---

## Anti-Pattern 2: The "One Deck for Everything" Approach

### The Problem

An organization creates a single slide deck and uses it for **both** projecting in
meetings and distributing as a standalone document. The result is a compromise that
fails at both tasks: too dense for projection, too sparse for standalone reading.

> Nancy Duarte compares this to using a toothbrush to comb your hair "just because
> it has bristles like your hairbrush."

### Detection Signals

- The same file alternates between **minimal-text visual slides** and **dense information slides** without clear section separation
- Slide notes contain critical context that should be on the slide itself (the notes were meant as speaker notes, not reader context)
- The document has cinematic transitions/animations on some slides but dense body text on others

### The Fix

- **Create two separate decks**: a cinematic presentation for projection and a Slidedoc for reading
- Use the **Notes View conversion method** (see document 10) to produce the leave-behind version
- If maintaining two versions is impractical, default to the Slidedoc and present it in discussion mode (silent reading + conversation) rather than projection mode

---

## Anti-Pattern 3: Dense Content Without Visual Hierarchy

### The Problem

A Slidedoc contains substantial, well-researched content but presents it as **walls of
text** with no typographic hierarchy, no callouts, no visual structure. Every element
on the page looks equally important, making the document impossible to skim.

Duarte emphasizes that "skimmable" is a core Slidedoc characteristic. A Slidedoc
without hierarchy forces the reader to process everything sequentially, losing the
format's primary advantage over a Word document.

### Detection Signals

- No visible **heading hierarchy** (all text is the same size, weight, and color)
- Absence of **callout boxes**, highlighted takeaways, or visual emphasis
- **No images, charts, or diagrams** -- pure text filling the slide area
- Very high **content coverage** (text fills >70% of the page area with no breathing room)
- Headlines are **topic labels** ("Revenue") rather than **conclusions** ("Revenue Exceeded Targets by 12%")

### The Fix

- Establish a **clear typographic hierarchy**: title > section header > body > caption > callout
- Add **callout boxes** for key takeaways on each page
- Break dense text into **bullet points, numbered lists, or short paragraphs** (3-5 sentences max)
- Replace descriptive text with **diagrams, charts, or icons** where possible
- Ensure each page passes the **Glance Test** (see document 04): the main message is identifiable in 3 seconds
- Maintain adequate **whitespace** (target 40-60% content, 40-60% whitespace)

---

## Anti-Pattern 4: Missing Book-Like Navigation

### The Problem

A Slidedoc of 10+ pages has **no table of contents, no page numbers, no section dividers,
and no internal links**. The reader cannot skim the document structure, jump to a specific
section, or orient themselves within the document.

Duarte's templates and guidelines treat book-like navigation as fundamental to the Slidedoc
format. A Slidedoc without navigation structure is just a collection of loosely connected
slides, not a coherent document.

### Detection Signals

- **No table of contents** (or a ToC that exists but has no hyperlinks to sections)
- **No page numbers** visible on content pages
- **No section divider pages** between major topics
- **No internal hyperlinks** allowing the reader to jump between sections
- Reader cannot determine the document's structure without scrolling through every page

### The Fix

- Add a **table of contents** on page 2 (after the cover) with **hyperlinked** section titles
- Include **page numbers** on all content pages (consistent position, typically bottom-right or bottom-center)
- Insert **section divider pages** between major topics (minimal content: section title + optional description)
- Add **internal navigation links** (e.g., "Back to Table of Contents" on section pages)
- For long documents, consider a **running header or footer** showing the current section name

---

## Anti-Pattern Summary Table

| Anti-Pattern | Core Problem | Key Signal | Primary Fix |
|-------------|-------------|------------|-------------|
| **Projecting a Slidedoc** | Reading dense text aloud from a projector | High word density + no pre-read markers | Distribute for reading; use meeting time for discussion |
| **One Deck for Everything** | Same slides for projection and standalone reading | Mix of cinematic and dense slides in one file | Create two separate decks |
| **Dense Without Hierarchy** | Content exists but cannot be skimmed | No heading differentiation; walls of text | Add typographic hierarchy, callouts, whitespace |
| **Missing Navigation** | Reader cannot find or orient within content | No ToC, no page numbers, no section dividers | Add ToC, page numbers, section dividers, hyperlinks |

## References

- Duarte, N. *Slidedocs: Spread Ideas with Effective Visual Documents*: https://www.duarte.com/resources/guides-tools/slidedocs-ebook/
- Nancy Duarte interview (Indezine): https://www.indezine.com/products/powerpoint/learn/slidedocs/nancy-duarte-slidedocs-interview.html
- "The Slides You Deliver vs. the Slidedoc You Leave Behind": https://www.duarte.com/presentation-skills-resources/the-slides-you-deliver-versus-the-slidedoc-you-leave-behind/
- Duarte Slidedocs templates: https://www.duarte.com/resources/guides-tools/slidedocs-templates/
