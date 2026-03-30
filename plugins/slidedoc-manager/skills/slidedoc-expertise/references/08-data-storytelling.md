# Data Storytelling in Slidedocs -- The DataStory Framework

> **Source:** Nancy Duarte's *DataStory* book and the Recommendation Tree framework.
> These principles are critical for data-heavy Slidedocs.

## Why Data Storytelling Matters for Slidedocs

Slidedocs frequently contain data (charts, metrics, analyses). Raw data alone doesn't
persuade or inform effectively. Duarte's research shows:

- **63% of people remember stories** vs. only **5% who recall specific statistics**
- Data needs to be transformed into **narrative** to drive decisions
- The goal is not to show data, but to **show what the data means**

## The Recommendation Tree

Duarte's **Recommendation Tree** is a framework for organizing data observations
into actionable recommendations. It uses a three-act structure:

### Structure
```
               Recommendation
              (What to do)
                    |
         ________________________
        |            |           |
    Insight 1    Insight 2   Insight 3
   (Why this     (Why this   (Why this
    matters)      matters)    matters)
        |            |           |
   Data Points  Data Points  Data Points
   (Evidence)   (Evidence)   (Evidence)
```

### The Three Acts
1. **What** -- the data point or observation (the facts)
2. **Why** -- the insight or interpretation (what it means)
3. **How** -- the recommendation or action (what to do about it)

## The Data Point of View (DataPOV)

The **DataPOV** is the centerpiece of a data-driven Slidedoc:

- It is your **central recommendation**, with all other material supporting it
- It should be **clearly stated** (not buried in charts or text)
- All data, insights, and arguments in the document should **ladder up** to the DataPOV
- It answers the question: "Based on this data, what should we do?"

## Chart Selection Guide

Choose the right chart type based on the story you want to tell:

| Story to Tell | Best Chart Type | Example |
|---------------|----------------|---------|
| **Compare categories** | Bar chart (horizontal or vertical) | Revenue by product line |
| **Show trends over time** | Line chart | Monthly sales over 12 months |
| **Show proportions** | Pie chart (max 5-6 slices) or stacked bar | Market share breakdown |
| **Show distribution** | Histogram or box plot | Customer age distribution |
| **Show relationship** | Scatter plot | Price vs. demand correlation |
| **Show geographic data** | Map/choropleth | Sales by region |
| **Compare precise values** | Table | Quarterly metrics comparison |
| **Show process/flow** | Sankey diagram or flowchart | Customer journey stages |

## Data Visualization Rules for Slidedocs

### Color Strategy
- Use **light neutral colors** (gray) for:
  - Scales and axes
  - Gridlines and tick marks
  - Non-focal data series
  - Background elements
- Use **bright/accent colors** for:
  - The key data point you want to emphasize
  - Trend lines or series that tell the main story
  - Callout values or annotations
- **Never** make every data series a different bright color

### Annotation Strategy
Since Slidedocs have no presenter to explain charts:
- **Title the chart with the conclusion** ("Revenue grew 15%"), not the metric ("Revenue")
- Add **callout annotations** to highlight the most important data points
- Include a **brief text interpretation** near the chart ("This growth was driven by...")
- Label data points **directly on the chart** when possible
- Minimize reliance on **legends** (direct labeling is always clearer)

### Simplification
- Show **conclusions, not raw data dumps**
- Remove chart elements that don't contribute to the story:
  - Unnecessary gridlines
  - Excessive decimal places
  - 3D effects (never use these)
  - Excessive axis labels
- Ask: "What is the ONE thing I want the reader to take from this chart?"

## Building a Data-Driven Slidedoc

### Page Structure for Data Pages

```
+------------------------------------------+
|  Conclusion Headline                      |
|  (What the data means)                    |
+------------------------------------------+
|                    |                       |
|   Chart/Visual     |  Key Takeaways       |
|                    |  - Point 1            |
|                    |  - Point 2            |
|                    |  - Point 3            |
+------------------------------------------+
|  Source: [data source]  |  Context note    |
+------------------------------------------+
```

### Empathy-Based Approach
- Understand **who the decision-makers are** and what they care about
- Know **how they are measured** (what metrics matter to them)
- Present data in terms of **their priorities**, not yours
- Lead with **the recommendation**, then support with evidence

## References

- Duarte, N. *DataStory: Explain Data and Inspire Action Through Story*: https://www.duarte.com/datastory
- The Recommendation Tree: https://www.duarte.com/resources/guides-tools/recommendation-tree/
- "5 Ways to Display Data Effectively in Presentations": https://www.duarte.com/blog/display-data-in-presentations/
- DataStory workshop overview: https://www.duarte.com/resources/guides-tools/duarte-datastory/
