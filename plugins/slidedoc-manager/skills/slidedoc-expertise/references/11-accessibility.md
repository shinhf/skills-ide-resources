# Accessibility in Slidedocs

> **Source:** Duarte Slidedocs templates (accessibility guidelines embedded in Theme 1),
> Microsoft PowerPoint accessibility documentation, and WCAG principles.

## Why Accessibility Matters for Slidedocs

Slidedocs are designed for **asynchronous, independent reading** -- they travel through
organizations without a presenter to fill in gaps. This makes accessibility not optional
but essential: if a reader using assistive technology cannot navigate or understand the
document, the Slidedoc fails at its core purpose.

Duarte's own Slidedoc templates include explicit accessibility guidance, treating it
as part of the slidedoc standard, not an afterthought.

## Core Accessibility Requirements

### 1. Unique Slide Titles on Every Page

Every Slidedoc page must have a **unique, descriptive title** in the designated title
placeholder. This is the single most important accessibility requirement because:

- Screen readers use slide titles as the **primary navigation mechanism**
- Titles create the document outline that assistive technology presents to users
- Duplicate or missing titles make it impossible to navigate by structure

**Rule:** No two pages should share the same title. Each title should describe the
page's specific content, not just the section name.

| Bad | Good |
|-----|------|
| "Overview" (on 3 pages) | "Q3 Revenue Overview", "Market Share Overview", "Team Overview" |
| (empty title placeholder) | "Executive Summary: Key Recommendations" |
| "Slide 4" | "Customer Satisfaction Declined 8% in Q3" |

### 2. Alt Text for Informational Graphics

Every image, chart, diagram, or icon that conveys information must have **alternative
text** (alt text) that describes its meaning or content.

**What needs alt text:**
- Charts and data visualizations (describe the conclusion, not every data point)
- Diagrams and process flows (describe the structure and key relationships)
- Photographs that convey specific information
- Icons used to communicate meaning (not purely decorative ones)

**What should be marked as decorative:**
- Background patterns and textures
- Purely ornamental divider lines
- Decorative stock photos that don't add informational content
- Brand logos in repeated header/footer positions

**Alt text guidelines:**
- Describe the **meaning**, not the appearance ("Revenue grew 15% in Q3" not "bar chart with blue bars")
- Keep alt text **concise** (1-2 sentences for most elements)
- For complex charts, provide a **brief summary** in alt text and **detailed data** in adjacent text or an appendix
- Don't start with "Image of..." or "Chart showing..." -- screen readers already announce the element type

### 3. Reading Order

The **reading order** (also called tab order) determines the sequence in which a screen
reader processes elements on each page. In PowerPoint, this is set via the Selection
Pane and is independent of the visual layout.

**Common problems:**
- Elements added out of visual sequence (e.g., a callout box added last appears first in reading order)
- Grouped elements where sub-elements read in unexpected order
- Decorative elements interspersed with content elements

**How to verify:** Use PowerPoint's Selection Pane (Home > Arrange > Selection Pane)
to view and reorder elements. The reading order runs **bottom to top** in the pane.

### 4. Color Contrast

Text and meaningful visual elements must have sufficient **contrast** against their
background to be readable by people with low vision or color vision deficiencies.

**Minimum contrast ratios (WCAG 2.1 AA):**
- **Normal text** (below 18pt or 14pt bold): 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): 3:1 contrast ratio
- **Non-text elements** (chart bars, icons, borders): 3:1 contrast ratio

**Practical guidelines:**
- Avoid light gray text on white backgrounds
- Don't rely on color alone to convey meaning (add labels, patterns, or icons)
- Test charts in grayscale to verify they remain distinguishable
- Use a contrast checker tool (e.g., WebAIM Contrast Checker) for uncertain combinations

### 5. Table Structure

When Slidedocs contain data tables:

- Use **simple table structures** (avoid merged cells, split cells, or nested tables)
- Include **header rows** that clearly label each column
- Keep tables **small enough** to be comprehensible when read cell-by-cell
- Provide a **text summary** of the table's key conclusion nearby

### 6. Font and Text Accessibility

- Use **sans-serif fonts** for body text (easier screen reading)
- Maintain a **minimum body text size** of 10-11pt
- Avoid **all-caps blocks** for body text (harder to read; screen readers may spell out each letter)
- Use **real text** rather than text embedded in images
- Ensure **sufficient line spacing** (1.2-1.5x the font size)

## PowerPoint Accessibility Checker

PowerPoint includes a built-in Accessibility Checker that detects many common issues
automatically. Duarte's templates recommend running it as part of the review process.

**How to use:** Review > Check Accessibility

**What it catches:**
- Missing alt text
- Missing slide titles
- Duplicate slide titles
- Low contrast (in newer versions)
- Reading order issues
- Missing table headers
- Merged cells in tables

**What it misses (manual review needed):**
- Whether alt text is actually meaningful (vs. placeholder text)
- Whether reading order matches the intended visual flow
- Whether color is used as the only means of conveying information
- Whether the document makes sense when read linearly by a screen reader

## Accessibility Checklist for Slidedoc Review

- [ ] Every page has a **unique, descriptive title** in the title placeholder
- [ ] All informational graphics have **meaningful alt text**
- [ ] Decorative graphics are **marked as decorative**
- [ ] **Reading order** matches the intended visual flow on every page
- [ ] Text meets **minimum contrast ratios** (4.5:1 normal, 3:1 large)
- [ ] Color is **not the only means** of conveying information
- [ ] Tables have **header rows** and simple structure
- [ ] Body text is **real text** (not embedded in images)
- [ ] Font sizes are **readable** (minimum 10-11pt body text)
- [ ] PowerPoint's **Accessibility Checker** reports no errors
- [ ] Document has been **tested with a screen reader** (for high-stakes documents)

## References

- Duarte Slidedocs templates (Theme 1 accessibility guidance): https://www.duarte.com/resources/guides-tools/slidedocs-templates/
- Microsoft: "Make your PowerPoint presentations accessible": https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2f33-4bd2-8ca7-dae3b2b3ef25
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- WCAG 2.1 Guidelines: https://www.w3.org/TR/WCAG21/
