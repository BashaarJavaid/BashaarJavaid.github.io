export interface ProjectSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  client?: string;
  tags: string[];
  blurb: string;
  cover: string;
  metrics: { value: string; label: string }[];
  sections: ProjectSection[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: 'prodrescue',
    title: 'ProdRescue',
    year: '2026',
    role: 'Creator · Open Source',
    tags: ['LangGraph', 'FastAPI', 'Docker', 'MCP', 'pgvector'],
    blurb:
      'A self-healing SRE agent — an autonomous multi-agent pipeline that ingests production crash logs, diagnoses root cause, writes and validates a code fix in an isolated Docker harness, and opens a GitHub Pull Request.',
    cover: '/covers/prodrescue.svg',
    metrics: [
      { value: '~75%', label: 'patch success across attempts' },
      { value: '30–60s', label: 'typical time-to-PR (CPU-only inference)' },
      { value: '5', label: 'merged AI-authored PRs on a public repo' },
      { value: '55+', label: 'unit & integration tests, ~68% coverage' },
    ],
    sections: [
      {
        heading: 'The pipeline',
        body: 'A LangGraph state machine, checkpointed in Postgres, drives every incident from crash to pull request — with a self-correcting retry loop when QA fails.',
        bullets: [
          'Ingest — POST /ingest embeds the crash message and stores it in pgvector (TimescaleDB) for semantic similarity search; a Celery worker is enqueued',
          'Triage — an LLM agent reads the stacktrace plus similar historical incidents and produces a structured root-cause analysis and a harness reproduction spec',
          'Dev — fetches source via scoped MCP and generates a complete patched file (full-file patching, not fragile unified diffs)',
          'QA — spins up an isolated Docker stack (network_mode: none, cap-drop, memory/CPU/PID limits) and runs pytest with a coverage gate',
          'Self-heal — on QA failure, failure telemetry is fed back to Dev; retries up to a configurable budget',
          'PR — pushes a branch and opens a draft GitHub PR with the diff, root cause, and harness results',
        ],
      },
      {
        heading: 'Architecture & design',
        bullets: [
          'LangGraph orchestration with AsyncPostgresSaver checkpointing — a worker restart resumes mid-incident',
          'MCP (Model Context Protocol) least-privilege tool scoping per agent: Triage gets logs DB search, Dev gets GitHub read, QA gets the Docker harness, PR gets GitHub write',
          'Provider-agnostic LLM via Instructor and an OpenAI-compatible client — swap models via env',
          'Semantic incident memory — pgvector cosine similarity over TimescaleDB hypertables (BAAI/bge-small-en-v1.5, 384-dim)',
          'Production guardrails — API-key auth, Redis-backed concurrency cap, crash deduplication, idempotent draft PRs, diff-scope guard, fail-loud GitHub writes, LLM/MCP call timeouts, readiness probes',
        ],
      },
      {
        heading: 'Observability',
        bullets: [
          '5 Prometheus metrics (patch success rate, retries per incident, time-to-PR, coverage delta, active pipelines) feeding an auto-provisioned Grafana dashboard',
          'LangSmith tracing of every agent run — including a public trace of an incident where the first two patches fail QA and the third self-heals and ships',
          '5 distinct bug types diagnosed and merged: NoneType, KeyError, ZeroDivisionError, TypeError, IndexError',
        ],
      },
      {
        heading: 'Stack',
        body: 'LangGraph, Instructor, MCP streamable-HTTP servers, FastAPI, Celery, RabbitMQ, Redis, PostgreSQL, TimescaleDB, pgvector, Docker Compose per-incident harnesses, pytest, Prometheus, Grafana, LangSmith. IaC written and validated for EKS/RDS/ElastiCache/ECR with Terraform, Kubernetes HPA on queue depth, and a gated GitHub Actions CI pipeline.',
      },
    ],
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/BashaarJavaid/ProdRescue' },
      {
        label: '5 merged AI-authored PRs',
        url: 'https://github.com/BashaarJavaid/prodrescue-target-app/pulls?q=is%3Apr+is%3Amerged',
      },
      {
        label: 'Public LangSmith trace',
        url: 'https://smith.langchain.com/public/e16ba235-3e26-4f13-85aa-da0b9534c117/r',
      },
    ],
  },
  {
    slug: 'issm-ai-pipeline',
    title: 'ISSM.AI Pipeline',
    year: '2024',
    role: 'ML Intern · ISSM.AI',
    client: 'ISSM.AI',
    tags: ['LangGraph', 'Docker', 'AWS ECS', 'Langfuse'],
    blurb:
      'An agentic document-processing framework for fire code classification that cut SDS processing time by 78% across 317,000+ documents, generating $26,000+ in cost savings.',
    cover: '/covers/issm.svg',
    metrics: [
      { value: '317K+', label: 'documents processed' },
      { value: '78%', label: 'processing time reduction' },
      { value: '$26K+', label: 'cost savings delivered' },
      { value: '24/7', label: 'agent observability' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: 'Safety Data Sheet (SDS) documents needed fire code classification at a scale no manual process could handle. The pipeline had to be accurate, cheap, and observable in production.',
      },
      {
        heading: 'What I built',
        bullets: [
          'Implemented an agentic framework that reduced SDS document processing time by 78% for fire code classification',
          'Delivered a 317,000+ document processing solution generating $26,000+ in cost savings',
          'Built a containerized architecture with Docker, deployed across AWS (EC2, S3, Lambda, ECS) and Azure',
          'Built 24/7 system observability using Langfuse, Redis Insight, CloudWatch, and OpenTelemetry for agent monitoring',
        ],
      },
      {
        heading: 'Recognition',
        body: 'Recognized as a Top 3 Intern at ISSM.AI for the 2024/25 award cycle.',
      },
    ],
    links: [],
  },
  {
    slug: 'ubl-rag',
    title: 'UBL RAG System',
    year: '2023',
    role: 'SWE Intern · United Bank Limited',
    client: 'United Bank Limited',
    tags: ['Neo4j', 'pgvector', 'ChromaDB', 'LLM fine-tuning'],
    blurb:
      'Knowledge-graph + LLM retrieval at one of Pakistan’s largest banks — 3x faster knowledge retrieval, 52% fewer irrelevant responses, 67% faster response times.',
    cover: '/covers/ubl.svg',
    metrics: [
      { value: '3x', label: 'faster knowledge retrieval' },
      { value: '52%', label: 'fewer irrelevant responses' },
      { value: '67%', label: 'response time improvement' },
    ],
    sections: [
      {
        heading: 'What I built',
        bullets: [
          'Implemented 3x faster knowledge retrieval through Neo4j knowledge graphs and fine-tuned open-source LLMs',
          'Reduced irrelevant responses by 52% through custom RAG pipelines with pgvector and ChromaDB',
          'Improved response time by 67% through automated content extraction and domain-specific knowledge base chunking',
        ],
      },
      {
        heading: 'Why it mattered',
        body: 'Banking knowledge bases are dense, regulated, and constantly queried. Pairing a Neo4j knowledge graph with vector retrieval gave the system both structural and semantic recall — retrieval that understands relationships, not just similarity.',
      },
    ],
    links: [],
  },
  {
    slug: 'legalsphere',
    title: 'LegalSphere',
    year: '2025',
    role: 'Creator · Open Source',
    tags: ['LangGraph', 'Neo4j', 'Streamlit'],
    blurb:
      'A multi-agent AI framework automating international trade law research — 72% accuracy on trade law queries and 70% faster research through graph-based knowledge representation.',
    cover: '/covers/legalsphere.svg',
    metrics: [
      { value: '72%', label: 'accuracy on trade law queries' },
      { value: '70%', label: 'research time reduction' },
    ],
    sections: [
      {
        heading: 'What I built',
        bullets: [
          'Built a multi-agent AI framework automating international trade law research with 72% accuracy',
          'Integrated graph-based knowledge representation reducing research time by 70%',
          'Developed a Streamlit UI with real-time query visualization and document uploads',
        ],
      },
      {
        heading: 'Approach',
        body: 'Trade law questions rarely have single-document answers. LegalSphere decomposes queries across specialized agents and grounds them in a Neo4j knowledge graph, so answers come with traceable, relationship-aware citations.',
      },
    ],
    links: [{ label: 'GitHub Repo', url: 'https://github.com/BashaarJavaid/legalsphere' }],
  },
  {
    slug: 'calderon-forecasting',
    title: 'Textile Demand Forecasting',
    year: '2025',
    role: 'ML Intern · Calderon Textiles',
    client: 'Calderon Textiles',
    tags: ['Forecasting', 'ML pipelines', 'Python'],
    blurb:
      'ML models forecasting cruise ship textile needs — towels, bedsheets, linens — with continuous-update pipelines for cost-driven inventory planning.',
    cover: '/covers/calderon.svg',
    metrics: [],
    sections: [
      {
        heading: 'What I built',
        bullets: [
          'Developed ML models to forecast cruise ship textile needs (towels, bedsheets, linens)',
          'Implemented pipelines for continuous model updates with new data',
          'Optimized model performance for forecasting precision, scalability, and cost-driven inventory planning',
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'stock-predictor',
    title: 'Stock Market Predictor',
    year: '2024',
    role: 'Personal Project',
    tags: ['Random Forest', 'XGBoost', 'LSTM', 'REST API'],
    blurb:
      'An ML application forecasting stock prices with Random Forest, XGBoost, and LSTM — interactive visualizations and a REST API for programmatic access.',
    cover: '/covers/stock.svg',
    metrics: [],
    sections: [
      {
        heading: 'What I built',
        bullets: [
          'ML application forecasting stock prices using Random Forest, XGBoost, and LSTM',
          'Interactive UI with historical data visualizations',
          'REST API for programmatic access',
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'library-system',
    title: 'Library Management System',
    year: '2024',
    role: 'Personal Project',
    tags: ['Java', 'SQLite'],
    blurb:
      'A Java-based library system with a 5-table relational SQLite schema managing 1000+ book entries and 15+ core features including advanced multi-parameter search.',
    cover: '/covers/library.svg',
    metrics: [],
    sections: [
      {
        heading: 'What I built',
        bullets: [
          'Engineered a Java-based library system with an SQLite backend and 5-table relational schema (1000+ book entries)',
          'Implemented 15+ core features including advanced multi-parameter search',
        ],
      },
    ],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}
