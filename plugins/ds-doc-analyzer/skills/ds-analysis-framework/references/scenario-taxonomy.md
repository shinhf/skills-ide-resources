# Data Science Scenario Taxonomy

Complete taxonomy for mapping AI/ML system capabilities to data science scenarios. Use this reference when performing Step 3 (Scenario Mapping) of the analysis process.

## 1. Natural Language Processing (NLP)

### 1.1 Text Classification
- **Problem**: Assign predefined labels to text inputs
- **Subcategories**: Sentiment analysis, intent detection, topic classification, content moderation, spam detection, language identification
- **Documentation signals**: "classify", "label", "category", "sentiment", "intent", "moderate"
- **Evaluation metrics**: Accuracy, F1-score, precision, recall, confusion matrix
- **Feasibility indicators**: Chat completion API, system prompts, structured output support
- **Example scenario**: Build a customer feedback classifier using the system's chat API with structured JSON output

### 1.2 Text Generation
- **Problem**: Generate coherent text based on prompts or context
- **Subcategories**: Creative writing, report generation, email drafting, code generation, data augmentation via synthetic text
- **Documentation signals**: "generate", "completion", "prompt", "temperature", "sampling", "stream"
- **Evaluation metrics**: BLEU, ROUGE, perplexity, human evaluation, factual accuracy
- **Feasibility indicators**: Streaming support, temperature control, system instructions, token limits
- **Example scenario**: Generate synthetic training data for downstream classifiers using controlled generation

### 1.3 Summarization
- **Problem**: Condense long documents into shorter representations
- **Subcategories**: Extractive, abstractive, query-focused, multi-document, incremental
- **Documentation signals**: "summarize", "condense", "abstract", "extract key", "tl;dr"
- **Evaluation metrics**: ROUGE-1/2/L, BERTScore, faithfulness, compression ratio
- **Feasibility indicators**: Long context windows, document input support, multi-turn conversations
- **Example scenario**: Summarize research papers into structured abstracts with key findings

### 1.4 Question Answering
- **Problem**: Answer questions given context or knowledge
- **Subcategories**: Extractive QA, generative QA, open-domain, closed-domain, conversational QA, multi-hop QA
- **Documentation signals**: "question", "answer", "context", "retrieve", "knowledge"
- **Evaluation metrics**: Exact match, F1, answer relevance, faithfulness to context
- **Feasibility indicators**: RAG support, retrieval integration, context window size, tool use
- **Example scenario**: Build domain-specific QA system with RAG over technical documentation

### 1.5 Named Entity Recognition / Information Extraction
- **Problem**: Extract structured information from unstructured text
- **Subcategories**: NER, relation extraction, event extraction, schema mapping, key-value extraction
- **Documentation signals**: "extract", "entity", "structured output", "JSON", "schema", "parse"
- **Evaluation metrics**: Entity-level F1, exact match, partial match
- **Feasibility indicators**: Structured/JSON output mode, function calling, schema definitions
- **Example scenario**: Extract product attributes from customer reviews into structured database records

### 1.6 Translation and Conversion
- **Problem**: Convert text between languages or formats
- **Subcategories**: Language translation, code translation, format conversion, style transfer, paraphrasing
- **Documentation signals**: "translate", "convert", "transform", "language", "format"
- **Evaluation metrics**: BLEU, chrF, human evaluation, format accuracy
- **Feasibility indicators**: Multilingual model support, system instructions, structured I/O
- **Example scenario**: Translate API documentation between programming languages

## 2. Retrieval-Augmented Generation (RAG)

### 2.1 Knowledge-Grounded Generation
- **Problem**: Generate responses grounded in specific knowledge sources
- **Subcategories**: Document-grounded QA, citation-backed generation, fact-checked responses
- **Documentation signals**: "retrieval", "embedding", "vector store", "knowledge base", "grounding"
- **Evaluation metrics**: Faithfulness, answer relevance, context precision, context recall
- **Feasibility indicators**: Embedding API, vector store integration, retrieval pipeline support
- **Example scenario**: Build a customer support bot grounded in product documentation

### 2.2 Semantic Search
- **Problem**: Find relevant documents based on meaning rather than keywords
- **Subcategories**: Dense retrieval, hybrid search, re-ranking, multi-modal search
- **Documentation signals**: "embedding", "similarity", "search", "vector", "index", "cosine"
- **Evaluation metrics**: MRR, NDCG, recall@k, precision@k
- **Feasibility indicators**: Embedding model access, vector store connectors, index management
- **Example scenario**: Implement semantic search over internal knowledge base for research discovery

### 2.3 Document Processing Pipelines
- **Problem**: Process and index large document collections for retrieval
- **Subcategories**: Chunking strategies, metadata extraction, hierarchical indexing, incremental updates
- **Documentation signals**: "chunk", "split", "index", "document", "loader", "pipeline"
- **Evaluation metrics**: Retrieval quality, indexing throughput, freshness
- **Feasibility indicators**: Document loaders, chunking utilities, batch processing support
- **Example scenario**: Build ingestion pipeline for regulatory documents with metadata-enriched chunks

## 3. Agent-Based Systems

### 3.1 Tool-Augmented Reasoning
- **Problem**: Extend model capabilities through external tool use
- **Subcategories**: API calling, database querying, code execution, web browsing, calculator
- **Documentation signals**: "tool", "function", "plugin", "action", "execute", "call"
- **Evaluation metrics**: Task completion rate, tool selection accuracy, execution success rate
- **Feasibility indicators**: Function calling API, tool definitions, execution sandboxes
- **Example scenario**: Build data analysis agent that queries databases and generates visualizations

### 3.2 Autonomous Planning and Execution
- **Problem**: Decompose complex tasks into steps and execute them
- **Subcategories**: Task decomposition, plan generation, self-correction, iterative refinement
- **Documentation signals**: "agent", "plan", "step", "chain", "reason", "loop"
- **Evaluation metrics**: Task success rate, step efficiency, error recovery rate
- **Feasibility indicators**: Multi-turn support, memory/state management, self-reflection patterns
- **Example scenario**: Create autonomous research agent that plans and executes multi-step investigations

### 3.3 Code Generation and Execution
- **Problem**: Generate, test, and refine code programmatically
- **Subcategories**: Code synthesis, bug fixing, refactoring, test generation, documentation generation
- **Documentation signals**: "code", "execute", "sandbox", "interpreter", "compile", "test"
- **Evaluation metrics**: Pass@k, functional correctness, code quality metrics
- **Feasibility indicators**: Code execution environment, syntax-aware generation, test harness integration
- **Example scenario**: Build automated ML pipeline generator that writes and tests training scripts

## 4. Multi-Agent Systems

### 4.1 Orchestrated Workflows
- **Problem**: Coordinate multiple specialized agents for complex tasks
- **Subcategories**: Sequential pipelines, parallel execution, conditional branching, feedback loops
- **Documentation signals**: "workflow", "orchestrate", "pipeline", "graph", "DAG", "state machine"
- **Evaluation metrics**: End-to-end task completion, latency, cost efficiency
- **Feasibility indicators**: Workflow engine, agent composition API, state management
- **Example scenario**: Build ML experiment pipeline with separate agents for data prep, model selection, training, and evaluation

### 4.2 Collaborative Multi-Agent
- **Problem**: Multiple agents working together through discussion or debate
- **Subcategories**: Group chat, debate, consensus, peer review, brainstorming
- **Documentation signals**: "group chat", "multi-agent", "collaboration", "debate", "consensus"
- **Evaluation metrics**: Solution quality, convergence speed, diversity of perspectives
- **Feasibility indicators**: Multi-agent orchestration, message routing, termination conditions
- **Example scenario**: Multi-agent code review with specialized agents for security, performance, and style

### 4.3 Delegation and Handoff
- **Problem**: Route tasks to specialized agents based on capabilities
- **Subcategories**: Skill-based routing, escalation, load balancing, expertise matching
- **Documentation signals**: "handoff", "delegate", "route", "transfer", "specialize"
- **Evaluation metrics**: Routing accuracy, resolution rate, latency
- **Feasibility indicators**: Agent registry, capability descriptions, handoff protocols
- **Example scenario**: Build tiered support system that escalates data quality issues to specialized agents

## 5. Multimodal AI

### 5.1 Vision-Language Tasks
- **Problem**: Process and reason about images alongside text
- **Subcategories**: Image captioning, visual QA, document understanding, chart reading, diagram analysis
- **Documentation signals**: "image", "vision", "visual", "multimodal", "picture", "screenshot"
- **Evaluation metrics**: Task-specific accuracy, description quality, OCR accuracy
- **Feasibility indicators**: Vision model support, image input API, multi-modal message types
- **Example scenario**: Extract data from charts and tables in research papers for automated literature review

### 5.2 Audio Processing
- **Problem**: Process speech and audio data
- **Subcategories**: Speech-to-text, text-to-speech, audio classification, speaker diarization
- **Documentation signals**: "audio", "speech", "voice", "transcribe", "tts", "stt"
- **Evaluation metrics**: WER, speaker accuracy, latency
- **Feasibility indicators**: Audio input/output support, streaming audio, voice model access
- **Example scenario**: Build meeting analysis pipeline that transcribes, summarizes, and extracts action items

### 5.3 Document Understanding
- **Problem**: Extract structured information from document layouts
- **Subcategories**: Table extraction, form processing, PDF analysis, invoice processing
- **Documentation signals**: "document", "PDF", "table", "form", "OCR", "layout"
- **Evaluation metrics**: Extraction accuracy, structure preservation, field-level F1
- **Feasibility indicators**: Document input support, structured output, vision capabilities
- **Example scenario**: Automate data extraction from financial reports into structured datasets

## 6. Evaluation and Benchmarking

### 6.1 Model Evaluation
- **Problem**: Assess model quality for specific tasks
- **Subcategories**: Accuracy benchmarking, bias detection, robustness testing, capability profiling
- **Documentation signals**: "eval", "benchmark", "metric", "score", "assess", "test"
- **Evaluation metrics**: Meta-metrics (correlation with human judgment)
- **Feasibility indicators**: Evaluation framework, metric computation, batch inference
- **Example scenario**: Build automated evaluation suite for comparing prompt strategies

### 6.2 Prompt Engineering and Optimization
- **Problem**: Systematically optimize prompts for specific tasks
- **Subcategories**: Prompt templates, few-shot selection, chain-of-thought, prompt tuning
- **Documentation signals**: "prompt", "template", "system message", "few-shot", "instruction"
- **Evaluation metrics**: Task performance improvement, consistency, robustness
- **Feasibility indicators**: System prompt configuration, message history control, sampling parameters
- **Example scenario**: Optimize classification prompts through systematic A/B testing across prompt variants

### 6.3 Cost and Latency Optimization
- **Problem**: Optimize inference cost and response time
- **Subcategories**: Model selection, caching, batching, routing, cascading
- **Documentation signals**: "token", "cost", "latency", "cache", "batch", "model selection"
- **Evaluation metrics**: Cost per request, p50/p95 latency, quality-cost tradeoff
- **Feasibility indicators**: Multiple model tiers, caching support, batch API, usage tracking
- **Example scenario**: Implement smart model routing that uses smaller models for easy queries

## 7. Data Engineering for ML

### 7.1 Synthetic Data Generation
- **Problem**: Generate training/evaluation data using LLMs
- **Subcategories**: Training data augmentation, evaluation set creation, edge case generation, annotation assistance
- **Documentation signals**: "generate", "synthetic", "augment", "create data", "examples"
- **Evaluation metrics**: Downstream task improvement, diversity, fidelity
- **Feasibility indicators**: Controlled generation, structured output, batch processing
- **Example scenario**: Generate diverse question-answer pairs for training a domain-specific QA model

### 7.2 Data Labeling and Annotation
- **Problem**: Use LLMs to label or annotate data at scale
- **Subcategories**: Zero-shot labeling, few-shot labeling, label verification, active learning
- **Documentation signals**: "label", "annotate", "classify", "tag", "categorize"
- **Evaluation metrics**: Agreement with human labels, inter-annotator agreement, cost per label
- **Feasibility indicators**: Structured output, confidence scores, batch processing
- **Example scenario**: Use LLM-as-judge to label sentiment in customer reviews with confidence scores

### 7.3 Data Quality and Cleaning
- **Problem**: Detect and resolve data quality issues
- **Subcategories**: Deduplication, anomaly detection, format normalization, missing value handling
- **Documentation signals**: "quality", "clean", "validate", "normalize", "deduplicate"
- **Evaluation metrics**: Data quality scores, error detection rate, false positive rate
- **Feasibility indicators**: Structured I/O, function calling for data operations, context window for data inspection
- **Example scenario**: Build LLM-powered data validation pipeline that flags anomalies in tabular datasets

## 8. MLOps and Production

### 8.1 Model Serving and Deployment
- **Problem**: Deploy and serve ML models in production
- **Subcategories**: API endpoints, batch inference, edge deployment, A/B testing
- **Documentation signals**: "deploy", "serve", "endpoint", "API", "host", "production"
- **Evaluation metrics**: Latency, throughput, availability, cost
- **Feasibility indicators**: Hosting options, scaling configuration, health monitoring
- **Example scenario**: Deploy RAG-based support agent with auto-scaling and health checks

### 8.2 Monitoring and Observability
- **Problem**: Track model behavior and system health in production
- **Subcategories**: Performance monitoring, drift detection, error tracking, usage analytics
- **Documentation signals**: "monitor", "observe", "telemetry", "log", "trace", "metric"
- **Evaluation metrics**: Detection latency, false alarm rate, coverage
- **Feasibility indicators**: Telemetry integration, logging framework, dashboard support
- **Example scenario**: Implement response quality monitoring with automated drift alerts

### 8.3 Governance and Compliance
- **Problem**: Ensure AI systems meet regulatory and ethical standards
- **Subcategories**: Content filtering, PII detection, audit trails, bias monitoring, safety guardrails
- **Documentation signals**: "filter", "safety", "guard", "policy", "audit", "comply", "PII"
- **Evaluation metrics**: Compliance rate, false positive/negative rates, audit completeness
- **Feasibility indicators**: Content filtering, middleware/hooks, policy enforcement, logging
- **Example scenario**: Build content governance pipeline with PII detection and content safety scoring
