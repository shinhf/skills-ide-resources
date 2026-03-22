# Codebase Analysis Guide

Comprehensive mapping of project artifact types to specific arc42 sections and subsections. Use this guide to systematically extract architectural information from a codebase.

## How to Use This Guide

For each arc42 section, scan the listed artifact types using Glob and Grep. Extract relevant information and map it into the corresponding section template. Not all artifacts will be present in every project -- skip inapplicable mappings.

---

## Section 1: Introduction and Goals

### 1.1 Requirements Overview

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| README.md | `README.md`, `README.rst` | Project purpose, features list, description |
| Package manifest | `package.json`, `*.csproj`, `pyproject.toml`, `Cargo.toml`, `pom.xml`, `build.gradle` | Name, description, keywords |
| Issue tracker config | `.github/ISSUE_TEMPLATE/**` | Issue categories indicate feature areas |
| Changelog | `CHANGELOG.md`, `CHANGES.md`, `HISTORY.md` | Major features and milestones |

### 1.2 Quality Goals

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| CI config | `.github/workflows/*.yml`, `Jenkinsfile`, `.gitlab-ci.yml` | Quality gates (tests, linting, coverage thresholds) |
| Test config | `jest.config.*`, `pytest.ini`, `vitest.config.*` | Coverage targets |
| Performance tests | `**/k6/**`, `**/locust/**`, `**/jmeter/**` | Performance targets |
| SLA/SLO files | `**/sla.*`, `**/slo.*` | Availability/response time targets |

### 1.3 Stakeholders

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Contributing guide | `CONTRIBUTING.md` | Developer community expectations |
| Code owners | `CODEOWNERS`, `.github/CODEOWNERS` | Team structure, ownership areas |
| Maintainers | `MAINTAINERS.md`, `AUTHORS.md` | Key people and roles |

---

## Section 2: Architecture Constraints

### Technical Constraints

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Engine requirements | `package.json` (`engines` field) | Node.js/npm version constraints |
| Runtime config | `.node-version`, `.python-version`, `.ruby-version`, `.tool-versions` | Required runtime versions |
| Docker base images | `Dockerfile*` | Base image constraints |
| Browser support | `.browserslistrc`, `package.json` (`browserslist`) | Browser compatibility requirements |

### Organizational / Political Constraints

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| License | `LICENSE`, `LICENSE.md`, `NOTICE` | Licensing constraints |
| Security policy | `SECURITY.md` | Security reporting requirements |
| Compliance configs | `**/compliance/**`, `**/audit/**` | Regulatory requirements |

### Development Conventions

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Linter configs | `.eslintrc*`, `.prettierrc*`, `.editorconfig`, `ruff.toml`, `.rubocop.yml` | Coding standards |
| Git hooks | `.husky/**`, `.pre-commit-config.yaml` | Commit conventions |
| CI pipelines | `.github/workflows/*.yml` | Build/test/deploy requirements |
| TypeScript config | `tsconfig.json` | Strictness level, target |

---

## Section 3: Context and Scope

### 3.1 Business Context (External Actors and Systems)

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Docker Compose | `docker-compose*.yml` | External service dependencies (databases, caches, queues) |
| API specs | `**/openapi.{yaml,yml,json}`, `**/swagger.{yaml,yml,json}` | API interfaces exposed |
| gRPC definitions | `**/*.proto` | gRPC service interfaces |
| GraphQL schemas | `**/*.graphql`, `**/schema.graphql` | GraphQL API surface |
| Environment variables | `.env.example`, `.env.template`, `.env.sample` | External service URLs and keys |

### 3.2 Technical Context (Protocols and Channels)

| Artifact | Grep Pattern | Extract |
|----------|-------------|---------|
| HTTP clients | `axios`, `fetch`, `HttpClient`, `RestTemplate`, `requests.get` | Outbound HTTP integrations |
| Database drivers | `pg`, `mysql2`, `mongodb`, `sqlalchemy`, `prisma`, `typeorm` | Database protocol/technology |
| Message queues | `amqplib`, `kafkajs`, `bull`, `celery`, `pika` | Messaging protocols |
| Cache clients | `redis`, `memcached`, `ioredis` | Caching infrastructure |

---

## Section 4: Solution Strategy

### Technology Decisions

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Framework detection | `package.json`, `requirements.txt`, `Gemfile`, `go.mod` | Primary framework (React, Angular, Spring, Django, etc.) |
| Database choice | `docker-compose*.yml`, `**/prisma/schema.prisma`, `**/migrations/**` | Database technology |
| ORM/data layer | `**/entities/**`, `**/models/**`, `**/schema.*` | Data access strategy |
| Auth libraries | Grep for `passport`, `next-auth`, `keycloak`, `oauth`, `jwt` | Authentication approach |

### Decomposition Approach

| Artifact | Observation | Extract |
|----------|------------|---------|
| Monorepo tools | `lerna.json`, `pnpm-workspace.yaml`, `nx.json`, `turbo.json` | Monorepo decomposition strategy |
| Package structure | `packages/`, `apps/`, `libs/`, `services/` directories | Microservices vs monolith vs modular monolith |
| Module boundaries | Top-level `src/` subdirectories | Component decomposition |

---

## Section 5: Building Block View

### Level 1 -- Whitebox Overall System

| Artifact | Observation | Extract |
|----------|------------|---------|
| Top-level directories | `src/*/`, `app/*/`, `lib/*/` | Major building blocks |
| Package manifests (monorepo) | `packages/*/package.json` | Independent packages as building blocks |
| Service directories | `services/*/`, `microservices/*/` | Service-level building blocks |
| Entry points | `src/main.*`, `src/index.*`, `src/app.*` | Application entry and wiring |

### Level 2 -- Module Internals

| Artifact | Observation | Extract |
|----------|------------|---------|
| Subdirectory structure | `src/module-name/*/` | Internal components |
| Exported interfaces | `index.ts`, `__init__.py`, `mod.rs` | Public API surface |
| Import patterns | `import from '../other-module'` | Inter-module dependencies |

### Level 3 -- Component Details

| Artifact | Observation | Extract |
|----------|------------|---------|
| Class/interface files | `*.ts`, `*.java`, `*.py` with class definitions | Component responsibilities |
| Dependency injection | Constructor parameters, `@Inject`, providers | Component wiring |

---

## Section 6: Runtime View

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Controllers/handlers | `**/controllers/**`, `**/handlers/**`, `**/routes/**` | API endpoint scenarios |
| Event handlers | `**/events/**`, `**/listeners/**`, `**/subscribers/**` | Async processing flows |
| Middleware | `**/middleware/**`, `**/interceptors/**`, `**/filters/**` | Request processing pipeline |
| Scheduled tasks | `**/cron/**`, `**/jobs/**`, `**/schedulers/**` | Background processing scenarios |
| WebSocket handlers | `**/ws/**`, `**/socket/**`, `**/gateway.*` | Real-time communication flows |
| Error handlers | `**/errors/**`, `**/exceptions/**` | Error/exception scenarios |

---

## Section 7: Deployment View

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Dockerfile | `Dockerfile*`, `*.dockerfile` | Container topology |
| Docker Compose | `docker-compose*.yml` | Multi-container orchestration |
| Kubernetes manifests | `**/k8s/**`, `**/kubernetes/**`, `**/manifests/**` | K8s deployment structure |
| Helm charts | `**/Chart.yaml`, `**/values.yaml`, `**/templates/**` | Helm-based deployment |
| Terraform/IaC | `**/*.tf`, `**/pulumi/**`, `**/cdk/**`, `**/cloudformation/**` | Cloud infrastructure |
| CI/CD pipelines | `.github/workflows/*.yml`, `Jenkinsfile`, `.gitlab-ci.yml`, `azure-pipelines.yml` | Build and deployment pipeline |
| Reverse proxy | `**/nginx.conf`, `**/Caddyfile`, `**/traefik.*` | Network topology |
| Environment configs | `.env.production`, `.env.staging`, `**/config/environments/**` | Environment-specific settings |

---

## Section 8: Crosscutting Concepts

### Domain Concepts

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Domain models | `**/models/**`, `**/entities/**`, `**/domain/**` | Entity-relationship structure |
| DTOs | `**/dto/**`, `**/types/**`, `**/interfaces/**` | Data transfer patterns |
| Validation | `**/validators/**`, `**/schemas/**` (Zod, Joi, class-validator) | Validation rules |

### Security

| Artifact | Grep Pattern | Extract |
|----------|-------------|---------|
| Auth middleware | `authenticate`, `authorize`, `guard`, `@UseGuards` | Auth mechanism |
| JWT handling | `jsonwebtoken`, `jose`, `jwt`, `token` | Token-based auth |
| RBAC/ABAC | `roles`, `permissions`, `policies`, `@Roles` | Authorization model |
| Encryption | `crypto`, `bcrypt`, `argon2`, `encrypt` | Data protection |

### Development Concepts

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| Test setup | `jest.config.*`, `vitest.config.*`, `pytest.ini`, `*.test.*`, `*.spec.*` | Testing strategy |
| CI workflows | `.github/workflows/*.yml` | Build/test/deploy pipeline |
| Code generation | `**/codegen.*`, `**/generated/**` | Code generation tools |
| Migration files | `**/migrations/**`, `**/migrate/**` | Database migration strategy |

### Operational Concepts

| Artifact | Glob Pattern / Grep Pattern | Extract |
|----------|---------------------------|---------|
| Logging | `winston`, `pino`, `log4j`, `serilog`, `logging.config` | Logging framework |
| Monitoring | `prometheus`, `datadog`, `newrelic`, `opentelemetry` | Monitoring approach |
| Health checks | `**/health.*`, `/health`, `/readiness`, `/liveness` | Health check endpoints |
| Feature flags | `launchdarkly`, `unleash`, `flagsmith`, `**/features/**` | Feature management |

---

## Section 9: Architecture Decisions

| Artifact | Glob Pattern | Extract |
|----------|-------------|---------|
| ADR directories | `docs/adr/**`, `docs/decisions/**`, `doc/architecture/decisions/**`, `adr/**` | Existing architecture decision records |
| Changelog | `CHANGELOG.md` | Historical decisions and their timing |
| Decision comments | Grep for `@decision`, `@rationale`, `DECISION:` | Inline decision records |
| RFC/proposal docs | `docs/rfcs/**`, `docs/proposals/**` | Formal decision proposals |

---

## Section 10: Quality Requirements

| Artifact | Glob Pattern / Grep Pattern | Extract |
|----------|---------------------------|---------|
| Coverage config | `jest --coverage`, `pytest-cov`, `coverage` in CI | Coverage targets |
| Performance tests | `**/k6/**`, `**/locust/**`, `**/jmeter/**`, `**/artillery/**` | Performance scenarios |
| E2E tests | `**/e2e/**`, `**/cypress/**`, `**/playwright/**` | E2E quality scenarios |
| Linter strictness | ESLint `extends`, `strict` mode in tsconfig | Code quality enforcement |
| Accessibility | `**/a11y/**`, `axe`, `pa11y` | Accessibility requirements |

---

## Section 11: Risks and Technical Debt

| Artifact | Grep Pattern | Extract |
|----------|-------------|---------|
| TODO comments | `TODO`, `FIXME`, `HACK`, `XXX`, `WORKAROUND` | Technical debt items |
| Deprecated code | `@deprecated`, `#[deprecated]`, `@Deprecated` | Planned removals |
| Outdated dependencies | `npm outdated`, `pip list --outdated` (command) | Dependency staleness |
| Known issues | `KNOWN_ISSUES.md`, `BUGS.md` | Documented known problems |
| Security advisories | `.github/dependabot.yml`, `snyk`, `npm audit` | Vulnerability management |

---

## Section 12: Glossary

| Artifact | Observation | Extract |
|----------|------------|---------|
| Domain model classes | Class/interface names in `models/`, `entities/`, `domain/` | Core domain terms |
| API resource names | URL path segments, controller names | Technical terms |
| Enum types | Enum definitions across codebase | Domain value sets |
| Config keys | Environment variable names, config property names | System-specific terminology |
| README glossary | Existing glossary sections in docs | Pre-defined terms |

---

## Analysis Workflow Summary

For efficient analysis, process artifacts in this order:

1. **Project root scan**: README, package manifests, license, contributing guide
2. **Directory structure**: Top-level layout, module boundaries, monorepo detection
3. **Dependency scan**: External services, databases, APIs, libraries
4. **Configuration scan**: Environment files, CI/CD, Docker, K8s
5. **Code patterns scan**: Auth, logging, error handling, testing
6. **Documentation scan**: ADRs, API specs, changelogs, inline docs
7. **Debt scan**: TODOs, deprecated markers, outdated dependencies
