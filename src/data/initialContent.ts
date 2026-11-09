import { SiteContent } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_enterprise_monolith_1794250705462.jpg';
export const SYSTEMS_TOPOLOGY_IMAGE = '/src/assets/images/systems_architecture_topology_1794250705551.jpg';
export const OPERATIONS_ROOM_IMAGE = '/src/assets/images/enterprise_operations_room_1794250706859.jpg';
export const AGENTIC_AI_IMAGE = '/src/assets/images/service_agentic_ai_1794248451242.jpg';
export const CLOUD_ENTERPRISE_IMAGE = '/src/assets/images/service_cloud_enterprise_1794248452208.jpg';
export const PORTFOLIO_IMAGE = '/src/assets/images/portfolio_enterprise_showcase_1794248452133.jpg';
export const APP_DEV_IMAGE = '/src/assets/images/service_app_dev_1794250163197.jpg';
export const SAP_ORACLE_IMAGE = '/src/assets/images/service_sap_oracle_1794250163518.jpg';
export const IDENTITY_SECURITY_IMAGE = '/src/assets/images/service_identity_security_1794250163550.jpg';
export const DATA_ANALYTICS_IMAGE = '/src/assets/images/service_data_analytics_1794250165843.jpg';
export const ABOUT_INNOVATION_IMAGE = '/src/assets/images/about_innovation_center_1794250164517.jpg';

export const initialSiteContent: SiteContent = {
  hero: {
    badge: "Coledra Enterprise Systems",
    headline: "Autonomous Enterprise Platforms &",
    highlightText: "Agentic AI Infrastructure",
    subheadline: "Coledra Solutions Pvt. Ltd. engineers mission-critical Agentic AI systems, enterprise Oracle Cloud architectures, SAP S/4HANA transformations, and Zero-Trust Identity governance for global industry leaders.",
    ctaPrimary: "Request Technical Briefing",
    ctaSecondary: "View Architecture Matrix"
  },
  contactInfo: {
    email: "info.coledra@gmail.com",
    phone: "+91 9938770010",
    regOffice: "Plot No. 48, Infocity Road, Patia, Bhubaneswar, Odisha 751024, India",
    corpOffice: "Level 7, Cyber Gateway, HITEC City, Hyderabad, Telangana 500081, India",
    businessHours: "Monday - Friday: 9:00 AM - 7:00 PM IST"
  },
  services: [
    {
      id: "agentic-ai",
      title: "Agentic AI Development",
      shortDesc: "Autonomous multi-agent swarms, goal-oriented reasoning, and LLM-driven enterprise workflow orchestration.",
      fullDesc: "We design and deploy production-grade Agentic AI systems where autonomous software agents collaborate to solve complex, multi-step business objectives. Utilizing state-of-the-art foundation models, dynamic tool calling, semantic memory vectors, and deterministic verification gates, Coledra transforms brittle workflows into resilient autonomous pipelines.",
      deliverables: [
        "Multi-Agent Swarm Architectures (Planner, Worker, Critic loops)",
        "Dynamic Tool Calling & Real-Time API Synthesis",
        "Deterministic Enterprise Guardrails & Compliance Auditing",
        "Semantic Vector Memory (Hybrid Pinecone / pgvector / Milvus)"
      ],
      techStack: ["Gemini 2.5 Pro/Flash", "LangGraph", "LlamaIndex", "FastAPI", "Python", "Pinecone"],
      category: "Artificial Intelligence",
      image: AGENTIC_AI_IMAGE
    },
    {
      id: "ai-enabled-business",
      title: "AI Enabled Business & Automation",
      shortDesc: "Cognitive process automation, intelligent document processing, and predictive operational forecasting.",
      fullDesc: "Infuse enterprise intelligence into day-to-day operations. Coledra deploys proprietary cognitive automation that extracts structured data from messy enterprise documents, predicts inventory run-rates, forecasts customer churn, and orchestrates cross-system execution without manual re-keying.",
      deliverables: [
        "Intelligent Document Processing (IDP) for Invoices & Contracts",
        "Predictive Demand, Sales & Churn Analytics",
        "Human-in-the-Loop Operational Exception Triage",
        "ERP & CRM Cognitive Automation Connectors"
      ],
      techStack: ["PyTorch", "TensorFlow", "Databricks", "MLflow", "Hugging Face", "AWS Bedrock"],
      category: "Artificial Intelligence",
      image: DATA_ANALYTICS_IMAGE
    },
    {
      id: "app-development",
      title: "Application Development",
      shortDesc: "Cloud-native web applications, high-performance mobile apps, and distributed microservices.",
      fullDesc: "We engineer resilient digital platforms designed for high transaction volumes, zero-downtime deployments, and intuitive user experiences. From full-scale corporate web portals and consumer mobile apps to high-throughput financial transaction engines, our code is built on clean architectures with rigorous automated testing.",
      deliverables: [
        "Modern React, Next.js & TypeScript Web Portals",
        "Native & Cross-Platform iOS & Android Mobile Engineering",
        "Distributed Event-Driven Microservices (Kafka / RabbitMQ)",
        "Zero-Trust REST & GraphQL API Gateways"
      ],
      techStack: ["React", "TypeScript", "Node.js", "Go", "Kotlin", "Swift", "PostgreSQL", "Docker"],
      category: "Software Engineering",
      image: APP_DEV_IMAGE
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing & Growth Engineering",
      shortDesc: "Data-driven performance marketing, high-intent B2B demand generation, and technical SEO.",
      fullDesc: "Turn your digital channels into predictable revenue generation engines. Coledra merges performance marketing analytics with technical SEO, conversion rate optimization (CRO), interactive brand storytelling, and automated CRM nurture flows tailored for B2B tech and global service enterprises.",
      deliverables: [
        "Omnichannel B2B Demand Generation & Paid Ads (Google / LinkedIn)",
        "Comprehensive Technical SEO & Structured Schema Architecture",
        "Conversion Rate Optimization (CRO) & Funnel Audits",
        "Marketing Automation & Hubspot / Salesforce Sync"
      ],
      techStack: ["Google Analytics 4", "LinkedIn Campaign Manager", "HubSpot", "SEMrush", "Google Tag Manager"],
      category: "Growth & Marketing",
      image: SAP_ORACLE_IMAGE
    },
    {
      id: "oracle-cloud",
      title: "Oracle Cloud Consulting",
      shortDesc: "Oracle Cloud Infrastructure (OCI) migrations, Fusion ERP, HCM, SCM, and Autonomous Database optimizations.",
      fullDesc: "Maximize agility and reduce total cost of ownership with Coledra's certified Oracle Cloud practice. We guide global enterprises through legacy EBS lift-and-shifts to OCI, implement Oracle Fusion Cloud suites (ERP, HCM, SCM), and fine-tune mission-critical Oracle Autonomous Databases with zero business disruption.",
      deliverables: [
        "End-to-End EBS / On-Prem to OCI Migration Strategy",
        "Oracle Fusion ERP, Financials, HCM & SCM Implementation",
        "Oracle Autonomous Database Configuration & Tuning",
        "24/7 Enterprise OCI SLA Monitoring & Disaster Recovery"
      ],
      techStack: ["Oracle Cloud Infrastructure (OCI)", "Oracle Fusion ERP", "Autonomous Database", "GoldenGate", "PL/SQL"],
      category: "Enterprise Systems",
      image: SAP_ORACLE_IMAGE
    },
    {
      id: "sap-services",
      title: "SAP All Services",
      shortDesc: "Greenfield & Brownfield SAP S/4HANA migrations, SAP BTP integrations, and custom Fiori enterprise UX.",
      fullDesc: "Coledra's comprehensive SAP practice empowers enterprises to modernize core business operations. Whether migrating legacy ECC systems to SAP S/4HANA, building extensions on SAP Business Technology Platform (BTP), or rolling out intuitive SAP Fiori mobile-first interfaces, we deliver certified functional and technical excellence.",
      deliverables: [
        "SAP S/4HANA Greenfield & Brownfield Enterprise Migrations",
        "SAP Business Technology Platform (BTP) Integration Suite",
        "Custom SAP Fiori UI5 Design & Role-Based Workspaces",
        "SAP SuccessFactors, Ariba & Third-Party System Harmonization"
      ],
      techStack: ["SAP S/4HANA", "SAP BTP", "SAP Fiori / UI5", "ABAP Cloud", "SAP HANA DB", "CPI"],
      category: "Enterprise Systems",
      image: CLOUD_ENTERPRISE_IMAGE
    },
    {
      id: "identity-management",
      title: "Identity Management (IAM)",
      shortDesc: "Zero-Trust identity governance, privileged access management (PAM), Okta, CyberArk, and SSO.",
      fullDesc: "Eliminate identity-based vulnerabilities across hybrid and multi-cloud environments. Coledra architects robust Identity Governance and Administration (IGA) and Privileged Access Management (PAM) architectures, integrating automated JIT (Just-In-Time) access, biometric MFA, and compliance-driven audit trails.",
      deliverables: [
        "Zero-Trust Identity Architecture & Access Policies",
        "Privileged Access Management (PAM) with CyberArk",
        "Single Sign-On (SSO) & Biometric Adaptive MFA via Okta",
        "Automated Joiner-Mover-Leaver (JML) Identity Lifecycle"
      ],
      techStack: ["Okta", "CyberArk", "Microsoft Entra ID", "Ping Identity", "OAuth2", "SAML 2.0"],
      category: "Cybersecurity",
      image: IDENTITY_SECURITY_IMAGE
    },
    {
      id: "data-driven-services",
      title: "Data Driven Services & Analytics",
      shortDesc: "Modern lakehouses, real-time streaming data pipelines, Snowflake, BigQuery, and Power BI analytics.",
      fullDesc: "Transform raw transactional data into predictive competitive advantages. Coledra designs unified modern data architectures combining real-time streaming ingestion, dbt transformation layers, governance frameworks, and interactive executive dashboards.",
      deliverables: [
        "Enterprise Data Warehouse & Lakehouse Engineering (Snowflake/BigQuery)",
        "Real-Time Stream Processing Pipelines (Apache Kafka / Flink)",
        "dbt-Driven Data Modeling & Automated Testing",
        "Interactive Power BI, Tableau & Executive Analytics Cockpits"
      ],
      techStack: ["Snowflake", "Google BigQuery", "AWS Redshift", "dbt", "Apache Kafka", "Power BI"],
      category: "Data & Analytics",
      image: DATA_ANALYTICS_IMAGE
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions & DevOps",
      shortDesc: "Multi-cloud architecture on AWS, Azure, GCP, Kubernetes orchestration, GitOps, and FinOps governance.",
      fullDesc: "Build and scale on resilient cloud foundations. Coledra constructs immutable Infrastructure as Code (IaC), zero-downtime Kubernetes deployments, automated DevSecOps CI/CD pipelines, and FinOps frameworks that slash unnecessary cloud spend while ensuring 99.99% availability.",
      deliverables: [
        "Multi-Cloud Architecture & Migration (AWS / Azure / GCP)",
        "Enterprise Kubernetes (EKS / AKS / GKE) Cluster Orchestration",
        "Terraform & OpenTofu Automated Infrastructure as Code",
        "FinOps Cloud Economics & Cost Reduction Audits"
      ],
      techStack: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "GitHub Actions", "Docker"],
      category: "Cloud & Infrastructure",
      image: CLOUD_ENTERPRISE_IMAGE
    }
  ],
  caseStudies: [
    {
      id: "cs-1",
      title: "Tier-1 Supply Chain: Global SAP S/4HANA Cloud Transition",
      clientType: "International Logistics & Automotive Conglomerate",
      metrics: "34% Reduction in Order Latency · $3.8M OpEx Saved",
      description: "Successfully unified 14 disparate ECC 6.0 regional systems into a centralized SAP S/4HANA Cloud deployment with custom SAP BTP integration. Handled over 2.4 million daily transaction records with zero unplanned operational downtime.",
      servicesUsed: ["SAP All Services", "Cloud Solutions & DevOps", "Data Driven Services"],
      impact: "Replaced 42 brittle batch jobs with real-time Kafka event streams, cutting inventory reconciliation from 7 hours to under 8 minutes across 82 global logistics hubs.",
      image: SAP_ORACLE_IMAGE
    },
    {
      id: "cs-2",
      title: "Autonomous Agentic AI Customer & Claims Engine",
      clientType: "FinTech & InsurTech Services Provider",
      metrics: "82% Autonomous Resolution · Sub-500ms Execution",
      description: "Engineered a dual-agent workflow with human-in-the-loop escalation to ingest claims documentation, cross-reference policy limits, evaluate historical fraud indicators, and prepare verified settlement disbursements.",
      servicesUsed: ["Agentic AI Development", "AI Enabled Business", "Application Development"],
      impact: "Reduced average claim processing latency from 4 business days to 3.5 minutes while lowering compliance review overhead by 68%.",
      image: AGENTIC_AI_IMAGE
    },
    {
      id: "cs-3",
      title: "Global Financial Services: Zero-Trust IAM & OCI Overhaul",
      clientType: "Multi-National Banking & Wealth Advisory Group",
      metrics: "100% Zero-Trust Compliance · 0 Privilege Escalation Incidents",
      description: "Deployed Okta and CyberArk PAM unified under automated lifecycle pipelines across 18,000 corporate identities and 4,500 cloud infrastructure assets on Oracle Cloud Infrastructure (OCI).",
      servicesUsed: ["Identity Management", "Oracle Cloud Consulting", "Cloud Solutions"],
      impact: "Automated contractor on-boarding and off-boarding from 48 hours to 90 seconds, passing SOC 2 Type II and ISO 27001 with zero findings.",
      image: IDENTITY_SECURITY_IMAGE
    }
  ],
  blogPosts: [
    {
      id: "post-1",
      title: "From Simple Chatbots to Agentic AI: Why Goal-Oriented Multi-Agent Systems Win in 2026",
      excerpt: "Why single-turn prompts fail enterprise SLAs and how self-correcting multi-agent architectures with deterministic guardrails deliver verifiable business outcomes.",
      content: "As foundation models matured, the limitation of single-turn prompts became clear. Enterprise workflows require state persistence, tool calling, validation loops, and dynamic task delegation. Agentic AI shifts the paradigm from passive question-answering to proactive execution. At Coledra, we build agent ensembles with specialized planner, executor, and verifier roles that interface directly with enterprise ERPs and databases with strict guardrails.",
      date: "October 2026",
      readTime: "6 min read",
      author: "Chief AI Architect, Coledra",
      category: "Agentic AI",
      image: AGENTIC_AI_IMAGE
    },
    {
      id: "post-2",
      title: "Strategic Migration Roadmap: Transitioning Legacy Oracle EBS to OCI and Autonomous DB",
      excerpt: "Step-by-step methodology for zero-data-loss lift and shift into Oracle Cloud Infrastructure with automated performance tuning.",
      content: "Running mission-critical enterprise workloads on legacy on-premise hardware creates technical debt, licensing inflation, and maintenance hazards. Oracle Cloud Infrastructure (OCI) combined with Autonomous Transaction Processing (ATP) delivers self-repairing, autoscaling databases. This article walks through Coledra's four-phase migration framework.",
      date: "September 2026",
      readTime: "8 min read",
      author: "Principal Oracle Consultant, Coledra",
      category: "Oracle Cloud",
      image: SAP_ORACLE_IMAGE
    },
    {
      id: "post-3",
      title: "Modern Identity Governance: Implementing Zero-Trust Privileged Access in Hybrid Clouds",
      excerpt: "Eliminating static credentials and adopting dynamic, just-in-time access provisioning across AWS, Azure, and on-premise Active Directory.",
      content: "Traditional network perimeters are obsolete. In modern multi-cloud architectures, Identity is the new perimeter. Learn how to architect a frictionless Zero-Trust posture with Okta, CyberArk, and continuous adaptive risk assessment.",
      date: "August 2026",
      readTime: "5 min read",
      author: "Head of Cybersecurity, Coledra",
      category: "IAM & Security",
      image: IDENTITY_SECURITY_IMAGE
    }
  ]
};

export const TESTIMONIALS = [
  {
    quote: "Coledra's team transitioned our legacy logistics core to SAP S/4HANA with zero customer disruption. Their deep expertise in SAP BTP and cloud integration saved us months of downtime.",
    author: "Vikramaditya Sharma",
    title: "Chief Information Officer",
    company: "Apex Global Logistics",
    metric: "34% Faster Order Dispatch"
  },
  {
    quote: "The Agentic AI claim verification system Coledra engineered has redefined our operational efficiency. We are handling triple our transaction volume with better compliance verification.",
    author: "Elena Rostova",
    title: "VP of Digital Innovation",
    company: "Vanguard Financial Services",
    metric: "82% Autonomous Resolution"
  },
  {
    quote: "Deploying Zero-Trust IAM across 18,000 corporate identities was a massive challenge. Coledra delivered on time, perfectly aligned with our ISO 27001 and banking regulatory standards.",
    author: "Siddharth Nair",
    title: "Chief Information Security Officer",
    company: "Trans-Continental Capital",
    metric: "Zero Security Escalations"
  }
];

export const SOCIAL_UPDATES = [
  {
    platform: "LinkedIn",
    handle: "@coledra-solutions",
    date: "November 2026",
    content: "Proud to announce the deployment of our enterprise Agentic AI framework for autonomous supply-chain reconciliation. Human-in-the-loop governance meets sub-second execution.",
    tag: "Enterprise AI"
  },
  {
    platform: "X / Twitter",
    handle: "@ColedraTech",
    date: "October 2026",
    content: "Migrating from Oracle EBS to OCI? Check out our latest architectural whitepaper detailing zero-downtime database cutovers and Autonomous DB scaling.",
    tag: "Cloud Infrastructure"
  },
  {
    platform: "GitHub",
    handle: "coledra-labs",
    date: "September 2026",
    content: "Released open-source reference benchmarks for multi-agent LLM evaluation suites and deterministic enterprise tool-calling harnesses.",
    tag: "Open Source"
  }
];
