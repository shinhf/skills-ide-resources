# Mermaid Diagram Templates

Mermaid diagram patterns for all diagram types needed in arc42 documentation. Each template includes a blank version, an annotated version with guidance, and a filled example.

---

## Business Context Diagram (Section 3.1)

Shows the system as a central node with external actors and systems.

### Blank Template

```mermaid
flowchart TD
    Actor1["Actor Name"]
    System["**System Name**"]
    ExtSys1["External System 1"]

    Actor1 -->|"input"| System
    System -->|"output"| Actor1
    System <-->|"protocol"| ExtSys1
```

### Annotated Template

```mermaid
flowchart TD
    %% Place the system under design in the center
    %% Surround it with all external actors (users, roles) and systems
    %% Label edges with the domain-level data exchanged, not technical protocols

    User["End User"]
    Admin["Administrator"]
    System["**My Application**"]
    AuthProvider["Identity Provider"]
    PaymentGW["Payment Gateway"]
    EmailSvc["Email Service"]
    DB["Database"]

    User -->|"requests, uploads"| System
    System -->|"responses, notifications"| User
    Admin -->|"configuration"| System
    System <-->|"authentication tokens"| AuthProvider
    System -->|"payment requests"| PaymentGW
    PaymentGW -->|"payment confirmations"| System
    System -->|"transactional emails"| EmailSvc
    System <-->|"read/write data"| DB
```

### Filled Example (E-Commerce)

```mermaid
flowchart TD
    Customer["Customer"]
    Merchant["Merchant"]
    Shop["**E-Commerce Platform**"]
    Stripe["Stripe"]
    SendGrid["SendGrid"]
    PostgreSQL["PostgreSQL"]
    S3["AWS S3"]

    Customer -->|"browse, order, pay"| Shop
    Shop -->|"confirmations, invoices"| Customer
    Merchant -->|"product catalog, pricing"| Shop
    Shop -->|"payment intents"| Stripe
    Stripe -->|"payment confirmations"| Shop
    Shop -->|"order emails"| SendGrid
    Shop <-->|"product/order data"| PostgreSQL
    Shop -->|"product images"| S3
```

---

## Technical Context Diagram (Section 3.2)

Shows protocols, channels, and infrastructure elements.

### Blank Template

```mermaid
flowchart LR
    subgraph boundary ["System Boundary"]
        App["Application"]
    end
    Client["Client"] -->|"HTTPS"| App
    App -->|"TCP"| DB["Database"]
```

### Filled Example

```mermaid
flowchart LR
    subgraph boundary ["System Boundary"]
        API["REST API"]
        Worker["Background Worker"]
    end
    Browser["Browser SPA"] -->|"HTTPS/443 JSON"| API
    Mobile["Mobile App"] -->|"HTTPS/443 JSON"| API
    API -->|"TCP/5432"| PG["PostgreSQL"]
    API -->|"TCP/6379"| Redis["Redis"]
    API -->|"AMQP/5672"| RabbitMQ["RabbitMQ"]
    RabbitMQ -->|"AMQP"| Worker
    Worker -->|"SMTP/587"| SMTP["SMTP Server"]
    Worker -->|"TCP/5432"| PG
```

---

## Building Block View Level 1 (Section 5.1)

Top-level decomposition of the system.

### Blank Template

```mermaid
flowchart TB
    subgraph system ["System Name"]
        ModA["Module A"]
        ModB["Module B"]
        ModC["Module C"]
    end
    ModA --> ModB
    ModB --> ModC
```

### Filled Example (Web Application)

```mermaid
flowchart TB
    subgraph app ["E-Commerce Platform"]
        Gateway["API Gateway"]
        Products["Product Service"]
        Orders["Order Service"]
        Payments["Payment Service"]
        Notifications["Notification Service"]
        Auth["Auth Module"]
    end
    Gateway --> Auth
    Gateway --> Products
    Gateway --> Orders
    Gateway --> Payments
    Orders --> Payments
    Orders --> Notifications
    Payments --> Notifications
```

---

## Building Block View Level 2+ (Section 5.2+)

Decompose a Level 1 block into its internal components.

### Blank Template

```mermaid
flowchart TB
    subgraph module ["Module Name (White Box)"]
        Comp1["Component 1"]
        Comp2["Component 2"]
        Comp3["Component 3"]
    end
    ExtIn["External Input"] --> Comp1
    Comp1 --> Comp2
    Comp2 --> Comp3
    Comp3 --> ExtOut["External Output"]
```

### Filled Example (Order Service)

```mermaid
flowchart TB
    subgraph orderSvc ["Order Service (White Box)"]
        Controller["Order Controller"]
        Validator["Order Validator"]
        Processor["Order Processor"]
        Repository["Order Repository"]
        EventPub["Event Publisher"]
    end
    API["API Gateway"] --> Controller
    Controller --> Validator
    Validator --> Processor
    Processor --> Repository
    Processor --> EventPub
    Repository --> DB["Database"]
    EventPub --> MQ["Message Queue"]
```

---

## Runtime Sequence Diagram (Section 6)

Show building blocks interacting for a specific scenario.

### Blank Template

```mermaid
sequenceDiagram
    actor User
    participant A as Component A
    participant B as Component B
    participant C as Component C

    User->>A: Action
    A->>B: Request
    B->>C: Query
    C-->>B: Result
    B-->>A: Response
    A-->>User: Result
```

### Filled Example (Place Order)

```mermaid
sequenceDiagram
    actor Customer
    participant GW as API Gateway
    participant Auth as Auth Module
    participant OS as Order Service
    participant PS as Payment Service
    participant NS as Notification Service
    participant DB as Database

    Customer->>GW: POST /orders
    GW->>Auth: Validate token
    Auth-->>GW: Valid
    GW->>OS: Create order
    OS->>DB: Save order (status: pending)
    OS->>PS: Process payment
    PS-->>OS: Payment confirmed
    OS->>DB: Update order (status: confirmed)
    OS->>NS: Send confirmation
    NS-->>Customer: Email notification
    OS-->>GW: Order created
    GW-->>Customer: 201 Created
```

### Error Scenario Example

```mermaid
sequenceDiagram
    actor Customer
    participant GW as API Gateway
    participant OS as Order Service
    participant PS as Payment Service
    participant DB as Database

    Customer->>GW: POST /orders
    GW->>OS: Create order
    OS->>DB: Save order (status: pending)
    OS->>PS: Process payment
    PS-->>OS: Payment failed
    OS->>DB: Update order (status: failed)
    OS-->>GW: 402 Payment Required
    GW-->>Customer: Payment failed
```

---

## Deployment Diagram (Section 7)

Show infrastructure elements and building block mapping.

### Blank Template

```mermaid
flowchart TB
    subgraph cloud ["Cloud Provider"]
        subgraph cluster ["Kubernetes Cluster"]
            PodA["Pod A"]
            PodB["Pod B"]
        end
        DB["Database"]
        Storage["Object Storage"]
    end
    LB["Load Balancer"] --> cluster
    PodA --> DB
    PodB --> Storage
```

### Filled Example

```mermaid
flowchart TB
    subgraph aws ["AWS eu-west-1"]
        ALB["Application Load Balancer"]
        subgraph eks ["EKS Cluster"]
            subgraph ns ["app namespace"]
                API1["API Pod x3"]
                Worker1["Worker Pod x2"]
            end
        end
        RDS["RDS PostgreSQL"]
        ElastiCache["ElastiCache Redis"]
        SQS["SQS Queue"]
        S3["S3 Bucket"]
    end
    CDN["CloudFront CDN"] --> ALB
    ALB --> API1
    API1 --> RDS
    API1 --> ElastiCache
    API1 --> SQS
    SQS --> Worker1
    Worker1 --> RDS
    Worker1 --> S3
```

---

## Quality Tree (Section 10.1)

Mind-map showing quality attribute refinement.

### Blank Template

```mermaid
mindmap
  root((Quality))
    Category1
      Attribute1a
      Attribute1b
    Category2
      Attribute2a
      Attribute2b
```

### Filled Example

```mermaid
mindmap
  root((Quality))
    Performance
      Response under 200ms for API calls
      Support 1000 concurrent users
      Page load under 3s
    Reliability
      99.9% uptime SLA
      Graceful degradation
      Automated failover
    Security
      OAuth 2.0 authentication
      Data encryption at rest
      OWASP Top 10 compliance
    Maintainability
      80% test coverage
      Modular architecture
      Automated CI/CD
    Usability
      Mobile responsive
      WCAG 2.1 AA compliance
```

---

## C4 Model Integration

Arc42 sections map naturally to C4 views. Use these mappings when the project follows C4 conventions:

| C4 Level | Arc42 Section | Diagram Type |
|----------|--------------|-------------|
| **Context** (Level 1) | Section 3 -- Context and Scope | Business/Technical context diagrams |
| **Container** (Level 2) | Section 5.1 -- Building Block View Level 1 | System decomposition into deployable units |
| **Component** (Level 3) | Section 5.2 -- Building Block View Level 2 | Internal structure of containers |
| **Code** (Level 4) | Section 5.3 -- Building Block View Level 3 | Class/module level detail (rarely needed) |

### C4 Context Diagram as Arc42 Business Context

```mermaid
flowchart TD
    User["Person: End User\n(Uses the system daily)"]
    Admin["Person: Admin\n(Manages configuration)"]
    System["Software System:\n**My Application**\n(Provides core functionality)"]
    ExtAPI["Software System:\nExternal API\n(Third-party service)"]
    DB["Software System:\nDatabase\n(Stores application data)"]

    User -->|"Uses"| System
    Admin -->|"Configures"| System
    System -->|"Calls API"| ExtAPI
    System -->|"Reads/writes"| DB
```

---

## Diagram Best Practices

1. **Keep diagrams focused** -- One concept per diagram. Split complex views into multiple diagrams rather than cramming everything into one.
2. **Label all edges** -- Every arrow should describe what flows along it (data, events, commands).
3. **Use consistent naming** -- Building block names in diagrams must match names in tables and text.
4. **Prefer flowchart for static views** -- Use `flowchart` for context, building blocks, and deployment. Use `sequenceDiagram` for runtime views.
5. **Use subgraphs for boundaries** -- System boundaries, network zones, and deployment environments are natural subgraph candidates.
6. **Limit nesting** -- Maximum 2 levels of subgraph nesting for readability.
7. **No styling** -- Do not add colors, fills, or custom CSS. Let the rendering theme handle appearance.
