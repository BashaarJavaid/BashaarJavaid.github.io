export const profile = {
  name: 'Malik Bashaar Javaid',
  shortName: 'Bashaar Javaid',
  wordmark: 'BASHAAR JAVAID',
  tagline: 'ML / AI ENGINEER',
  subTagline: 'Multi-agent systems · RAG pipelines · Cloud infra',
  summary:
    'Computer Science student (May 2026) with production experience in agentic AI, RAG pipelines, and ML systems. Built multi-agent document processing at scale (317K+ docs, 78% time reduction), knowledge-graph + LLM retrieval at a major bank, and forecasting ML pipelines in industry. Strong in Python, PyTorch, LangChain/LangGraph, AWS/Azure, and observability.',
  location: 'Boston, MA',
  email: 'bashaarjavaid@gmail.com',
  phone: '857-241-8584',
  github: 'https://github.com/BashaarJavaid',
  linkedin: 'https://www.linkedin.com/in/malik-bashaar-javaid',
  portfolio: 'https://bashaarjavaid.github.io',
  openTo: 'ML Engineer · AI Engineer · Backend AI Engineer roles',
};

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Calderon Textiles',
    role: 'Machine Learning Intern',
    location: 'Remote · Indianapolis, IN',
    period: 'Aug 2025 — Dec 2025',
    bullets: [
      'Developed ML models to forecast cruise ship textile needs (towels, bedsheets, linens)',
      'Implemented pipelines for continuous model updates with new data',
      'Optimized model performance for forecasting precision, scalability, and cost-driven inventory planning',
    ],
  },
  {
    company: 'ISSM.AI',
    role: 'Machine Learning Intern',
    location: 'Islamabad, Pakistan',
    period: 'May 2024 — Aug 2024',
    bullets: [
      'Implemented agentic framework reducing SDS document processing time by 78% for fire code classification',
      'Delivered 317,000+ document processing solution generating $26,000+ cost savings',
      'Built containerized architecture with Docker, AWS (EC2, S3, Lambda, ECS), and Azure deployment',
      'Built 24/7 system observability using Langfuse, Redis Insight, CloudWatch, and OpenTelemetry',
    ],
  },
  {
    company: 'United Bank Limited',
    role: 'Software Engineering Intern',
    location: 'Islamabad, Pakistan',
    period: 'May 2023 — Aug 2023',
    bullets: [
      'Implemented 3x faster knowledge retrieval through Neo4j knowledge graphs and fine-tuned open-source LLMs',
      'Reduced irrelevant responses by 52% through custom RAG pipelines with pgvector and ChromaDB',
      'Improved response time by 67% through automated content extraction and domain-specific knowledge base chunking',
    ],
  },
];

export interface LeadershipItem {
  org: string;
  role: string;
  period: string;
  bullets: string[];
}

export const leadership: LeadershipItem[] = [
  {
    org: 'Orson',
    role: 'Team Lead',
    period: 'Jun 2025 — Jul 2025',
    bullets: [
      'Led 5-person team performing market entry research across retail, law, and restaurant sectors',
      'Assessed adoption potential of AI-driven training solutions for soft and technical skills',
    ],
  },
  {
    org: 'Dye Capital & Company',
    role: 'Team Lead',
    period: 'Jul 2025 — Aug 2025',
    bullets: [
      'Directed 5-member team on market research for floor plan financing in luxury car dealerships',
      'Evaluated financing and growth opportunities with data-driven recommendations',
    ],
  },
  {
    org: 'Google Developer Student Clubs',
    role: 'Event Coordinator',
    period: 'Jan 2024 — May 2024',
    bullets: [
      'Organized technical workshops on Agentic AI and modern development practices',
      'Mentored 5+ students in AI and cloud computing fundamentals',
    ],
  },
];

export const education = {
  school: 'DePauw University',
  location: 'Greencastle, IN',
  degree: 'Bachelor of Science, Computer Science',
  graduation: 'May 2026',
  notes: [
    'Computer Science GPA: 3.3 · Data Science GPA: 3.84',
    'Recognized as Top 3 Intern at ISSM.AI (2024/25)',
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'Java', 'C++', 'R', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    group: 'ML / AI',
    items: [
      'PyTorch',
      'TensorFlow',
      'LangChain',
      'LangGraph',
      'AutoGen',
      'Letta',
      'RAG',
      'Fine-tuning',
      'Multi-agent systems',
      'Instructor',
      'MCP',
      'LangSmith',
    ],
  },
  {
    group: 'Cloud & Infra',
    items: [
      'AWS (EC2, S3, Lambda, ECS)',
      'Azure',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Kafka',
      'RabbitMQ',
      'Redis',
    ],
  },
  {
    group: 'Data & Tools',
    items: [
      'Neo4j',
      'pgvector',
      'ChromaDB',
      'TimescaleDB',
      'Langfuse',
      'OpenTelemetry',
      'FastAPI',
      'Django',
      'Flask',
      'Streamlit',
      'Celery',
      'Prometheus',
      'Grafana',
    ],
  },
];
