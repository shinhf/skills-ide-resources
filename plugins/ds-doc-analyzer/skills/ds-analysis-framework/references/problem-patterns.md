# Problem Patterns Catalog

Detailed catalog of ML/DS problem patterns for mapping AI system capabilities to concrete, solvable problems. Use this reference during Step 4 (Problem Identification) of the analysis process.

## Pattern Structure

Each pattern includes:
- **Definition**: What this problem pattern involves
- **Implementation approach**: How to implement using typical AI/ML system capabilities
- **Evaluation strategy**: How to measure success
- **Common pitfalls**: What to watch for
- **Complexity indicators**: How to assess implementation difficulty

---

## 1. Classification Patterns

### 1.1 Zero-Shot Classification
- **Definition**: Classify inputs without task-specific training data
- **Implementation**: System prompt with category definitions + structured output
- **Evaluation**: Compare against labeled test set; measure accuracy, F1 per class
- **Pitfalls**: Inconsistent label boundaries, hallucinated categories, sensitivity to prompt phrasing
- **Complexity**: Low (direct use of chat API with structured output)
- **Documentation evidence needed**: Structured output support, system prompts, temperature control

### 1.2 Few-Shot Classification
- **Definition**: Classify using a small number of labeled examples in context
- **Implementation**: Include examples in system/user messages + enforce output schema
- **Evaluation**: Compare with increasing shot counts; measure marginal improvement
- **Pitfalls**: Example selection bias, context window limits, example ordering effects
- **Complexity**: Low-Medium (requires example curation and context management)
- **Documentation evidence needed**: Message history support, context window size, structured output

### 1.3 Multi-Label Classification
- **Definition**: Assign multiple labels to a single input
- **Implementation**: Structured output with array-type label field + confidence scores
- **Evaluation**: Hamming loss, subset accuracy, per-label F1
- **Pitfalls**: Label correlation ignored, threshold sensitivity, imbalanced label distribution
- **Complexity**: Medium (requires calibrated confidence thresholds)
- **Documentation evidence needed**: JSON/structured output, confidence/logprob access

### 1.4 Hierarchical Classification
- **Definition**: Classify into nested category structures
- **Implementation**: Multi-step classification (broad → specific) or single-pass with hierarchy encoding
- **Evaluation**: Hierarchical F1, per-level accuracy, consistency across levels
- **Pitfalls**: Error propagation in cascaded approaches, inconsistent hierarchical predictions
- **Complexity**: Medium-High (requires multi-step orchestration or careful prompt design)
- **Documentation evidence needed**: Multi-turn support, agent/workflow capabilities

## 2. Generation Patterns

### 2.1 Constrained Generation
- **Definition**: Generate content adhering to specific format, style, or content constraints
- **Implementation**: System prompt with constraints + output validation + retry logic
- **Evaluation**: Constraint satisfaction rate, content quality, diversity
- **Pitfalls**: Over-constraining reduces quality, under-constraining produces invalid output
- **Complexity**: Medium (requires validation loop)
- **Documentation evidence needed**: System prompts, structured output, retry/loop patterns

### 2.2 Iterative Refinement
- **Definition**: Generate initial output then refine through multiple passes
- **Implementation**: Multi-turn conversation with self-critique or separate reviewer agent
- **Evaluation**: Quality improvement per iteration, convergence speed, final quality
- **Pitfalls**: Diminishing returns, drift from original intent, increased latency/cost
- **Complexity**: Medium (requires multi-turn state management)
- **Documentation evidence needed**: Thread/conversation management, multi-turn support, agent patterns

### 2.3 Template-Based Generation
- **Definition**: Generate content by filling templates with contextual information
- **Implementation**: Template + extraction step + generation step
- **Evaluation**: Template adherence, content accuracy, completeness
- **Pitfalls**: Rigid templates limit quality, template selection errors
- **Complexity**: Low-Medium (template design + extraction)
- **Documentation evidence needed**: System prompts, structured output, variable interpolation

### 2.4 Synthetic Data Generation
- **Definition**: Generate training or evaluation data that mimics real-world distributions
- **Implementation**: Controlled generation with diversity constraints + quality filtering
- **Evaluation**: Downstream task improvement, distribution similarity, diversity metrics
- **Pitfalls**: Mode collapse, bias amplification, distribution mismatch
- **Complexity**: High (requires careful distribution control and validation)
- **Documentation evidence needed**: Batch processing, temperature/sampling control, structured output

## 3. Extraction Patterns

### 3.1 Schema-Driven Extraction
- **Definition**: Extract structured data matching a predefined schema
- **Implementation**: Schema definition + system prompt + JSON output mode
- **Evaluation**: Field-level precision/recall, schema compliance rate
- **Pitfalls**: Hallucinated fields, missing optional fields, type errors
- **Complexity**: Low-Medium (depends on schema complexity)
- **Documentation evidence needed**: Structured/JSON output, schema definitions, function calling

### 3.2 Relation Extraction
- **Definition**: Identify relationships between entities in text
- **Implementation**: Entity extraction first, then relation classification per pair
- **Evaluation**: Relation-level F1, entity-boundary accuracy
- **Pitfalls**: Entity boundary errors cascade, long-range relations missed
- **Complexity**: Medium-High (multi-step pipeline)
- **Documentation evidence needed**: Multi-step processing, structured output, context management

### 3.3 Event Extraction
- **Definition**: Identify events, their participants, and temporal relationships
- **Implementation**: Event trigger detection + argument role filling + temporal ordering
- **Evaluation**: Event F1, argument F1, temporal ordering accuracy
- **Pitfalls**: Complex event structures, nested events, implicit temporal relations
- **Complexity**: High (complex schema, multi-step)
- **Documentation evidence needed**: Structured output, multi-step orchestration, complex schemas

## 4. Retrieval Patterns

### 4.1 Simple RAG
- **Definition**: Retrieve relevant documents and generate grounded responses
- **Implementation**: Embed query → search vector store → include context → generate
- **Evaluation**: Answer accuracy, faithfulness, context relevance, latency
- **Pitfalls**: Poor chunking, irrelevant retrieval, hallucination despite context
- **Complexity**: Medium (requires embedding + vector store + generation pipeline)
- **Documentation evidence needed**: Embedding API, vector store integration, retrieval pipeline

### 4.2 Advanced RAG (Multi-Step)
- **Definition**: Iteratively retrieve and reason over multiple sources
- **Implementation**: Query decomposition → multiple retrieval rounds → synthesis
- **Evaluation**: Multi-hop accuracy, source diversity, answer completeness
- **Pitfalls**: Query decomposition errors, redundant retrieval, synthesis hallucination
- **Complexity**: High (requires agent-like orchestration)
- **Documentation evidence needed**: Agent framework, tool use, state management, multi-turn

### 4.3 Hybrid Search
- **Definition**: Combine keyword and semantic search for better retrieval
- **Implementation**: Parallel BM25 + dense retrieval → fusion/re-ranking
- **Evaluation**: MRR, NDCG improvement over single method, latency overhead
- **Pitfalls**: Fusion weight tuning, latency increase, index synchronization
- **Complexity**: Medium-High (requires multiple retrieval systems)
- **Documentation evidence needed**: Multiple retrieval integrations, re-ranking support

## 5. Orchestration Patterns

### 5.1 Sequential Pipeline
- **Definition**: Chain multiple processing steps where each feeds the next
- **Implementation**: Workflow graph with sequential node execution
- **Evaluation**: End-to-end task success, per-step accuracy, total latency
- **Pitfalls**: Error propagation, no feedback loops, rigid ordering
- **Complexity**: Medium (workflow definition + error handling)
- **Documentation evidence needed**: Workflow engine, state passing between steps, error handling

### 5.2 Map-Reduce
- **Definition**: Process items in parallel then aggregate results
- **Implementation**: Fan-out to parallel agents/calls → collect → aggregate
- **Evaluation**: Aggregation quality, speedup factor, cost efficiency
- **Pitfalls**: Inconsistent parallel outputs, aggregation information loss
- **Complexity**: Medium-High (parallel execution + aggregation logic)
- **Documentation evidence needed**: Parallel/concurrent execution, result aggregation, workflow support

### 5.3 Router Pattern
- **Definition**: Route inputs to specialized handlers based on classification
- **Implementation**: Classifier agent → route to specialist → return result
- **Evaluation**: Routing accuracy, specialist quality, fallback handling
- **Pitfalls**: Misrouting, missing catch-all, inconsistent specialist interfaces
- **Complexity**: Medium (classification + routing logic)
- **Documentation evidence needed**: Agent composition, conditional logic, handoff patterns

### 5.4 Evaluator-Optimizer Loop
- **Definition**: Generate output, evaluate, and iterate until quality threshold met
- **Implementation**: Generator → evaluator → feedback → generator (loop)
- **Evaluation**: Final output quality, iterations to converge, cost
- **Pitfalls**: Non-convergence, evaluator-generator collusion, excessive iterations
- **Complexity**: High (requires robust evaluation and termination criteria)
- **Documentation evidence needed**: Multi-agent support, loop/iteration patterns, quality metrics

## 6. Evaluation Patterns

### 6.1 LLM-as-Judge
- **Definition**: Use an LLM to evaluate outputs of another LLM
- **Implementation**: Evaluation prompt with rubric + structured scoring output
- **Evaluation**: Correlation with human judgment, inter-rater agreement
- **Pitfalls**: Position bias, verbosity bias, self-preference bias
- **Complexity**: Medium (requires careful rubric design and bias mitigation)
- **Documentation evidence needed**: Structured output, system prompts, multi-model access

### 6.2 Comparative Evaluation
- **Definition**: Compare two or more outputs to determine which is better
- **Implementation**: Present outputs side-by-side to evaluator model + structured preference
- **Evaluation**: Agreement with human preferences, consistency
- **Pitfalls**: Position bias, length bias, style over substance
- **Complexity**: Medium (requires controlled comparison setup)
- **Documentation evidence needed**: Structured output, randomization support

### 6.3 Automated Test Suite
- **Definition**: Run models against curated test cases with automated scoring
- **Implementation**: Test case library + batch inference + metric computation
- **Evaluation**: Coverage, metric stability, runtime
- **Pitfalls**: Overfitting to test set, stale test cases, narrow coverage
- **Complexity**: Medium-High (requires test infrastructure)
- **Documentation evidence needed**: Batch processing, programmatic API access, metric computation

## Cross-Cutting Concerns

These apply across all patterns:

### Cost Management
- Token usage tracking and budgeting
- Model tier selection (expensive vs. cheap for different subtasks)
- Caching frequently repeated computations
- Batch processing for throughput optimization

### Latency Optimization
- Streaming for perceived responsiveness
- Parallel execution for independent subtasks
- Caching for repeated queries
- Model selection based on latency requirements

### Reliability
- Retry logic with exponential backoff
- Fallback models/strategies
- Input/output validation
- Graceful degradation

### Safety and Governance
- Content filtering at input and output
- PII detection and redaction
- Audit logging of all model interactions
- Bias monitoring and mitigation
