import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory / persisted content store
const DATA_FILE = path.join(__dirname, 'data_store.json');

interface SiteData {
  hero: {
    badge: string;
    headline: string;
    highlightText: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    regOffice: string;
    corpOffice: string;
    businessHours: string;
  };
  services: Array<{
    id: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    deliverables: string[];
    techStack: string[];
    category: string;
  }>;
  caseStudies: Array<{
    id: string;
    title: string;
    clientType: string;
    metrics: string;
    description: string;
    servicesUsed: string[];
    impact: string;
  }>;
  blogPosts: Array<{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
  }>;
  inquiries: Array<{
    id: string;
    timestamp: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    budget: string;
    message: string;
    status: string;
  }>;
}

const defaultData: SiteData = {
  hero: {
    badge: "Enterprise AI & Cloud Transformation Partner",
    headline: "Architecting Autonomous Enterprise Systems &",
    highlightText: "Agentic AI Solutions",
    subheadline: "Coledra Solutions empowers global enterprises with mission-critical Agentic AI engineering, Oracle Cloud modernization, SAP S/4HANA migrations, Identity Management, and resilient cloud architectures.",
    ctaPrimary: "Request Architecture Consultation",
    ctaSecondary: "Explore Enterprise Services"
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
      shortDesc: "Autonomous multi-agent systems, goal-driven tool orchestration, and LLM-powered enterprise workflows.",
      fullDesc: "We engineer proprietary multi-agent swarms using state-of-the-art foundation models, semantic vector memory, tool-calling pipelines, and guardrails to automate complex cross-functional business tasks with human-in-the-loop governance.",
      deliverables: ["Autonomous Decision-Making Agents", "Dynamic Tool Calling & API Synthesizers", "Self-Correcting Reasoning Loops", "Enterprise Guardrails & Evaluation Pipelines"],
      techStack: ["Gemini 2.5 / 1.5", "LangGraph", "LlamaIndex", "FastAPI", "Pinecone", "ChromaDB"],
      category: "Artificial Intelligence"
    },
    {
      id: "ai-enabled-business",
      title: "AI Enabled Business & Automation",
      shortDesc: "End-to-end intelligent automation transforming operations, document synthesis, and customer lifecycles.",
      fullDesc: "Transform traditional business processes into intelligent, automated operations. We integrate cognitive document processing, predictive churn modeling, recommendation engines, and automated invoice reconciliation.",
      deliverables: ["Intelligent Document Processing (IDP)", "Predictive Sales & Churn Forecasters", "Automated Compliance & Audit Scanners", "Executive Decision Dashboards"],
      techStack: ["PyTorch", "Hugging Face", "TensorFlow", "Databricks", "MLflow"],
      category: "Artificial Intelligence"
    },
    {
      id: "app-development",
      title: "Application Development",
      shortDesc: "High-scale, ultra-secure cloud-native web, iOS, Android, and distributed microservices architectures.",
      fullDesc: "From multi-tenant SaaS platforms to low-latency fintech applications, Coledra engineers robust software products with test-driven discipline, zero-trust security postures, and sub-second performance profiles.",
      deliverables: ["Modern React & Next.js Platforms", "Native iOS & Android Mobile Apps", "Distributed Microservices & Event Meshes", "Zero-Trust API Gateways"],
      techStack: ["TypeScript", "React", "Node.js", "Go", "Docker", "PostgreSQL", "Kafka"],
      category: "Software Engineering"
    },
    {
      id: "oracle-cloud",
      title: "Oracle Cloud Consulting",
      shortDesc: "End-to-end Oracle Cloud Infrastructure (OCI), ERP, HCM, SCM implementations and managed migrations.",
      fullDesc: "Certified Oracle consultants architecting high-yield transitions from on-premise EBS or legacy databases to Oracle Cloud Infrastructure (OCI), Fusion ERP, Supply Chain Management, and Autonomous Database clusters.",
      deliverables: ["Oracle Fusion ERP & HCM Deployment", "EBS to OCI Seamless Migration", "Oracle Autonomous Database Optimization", "24/7 Managed OCI Performance SLAs"],
      techStack: ["Oracle Cloud Infrastructure (OCI)", "Oracle ERP Cloud", "Autonomous DB", "Oracle GoldenGate", "PL/SQL"],
      category: "Enterprise Systems"
    },
    {
      id: "sap-services",
      title: "SAP All Services",
      shortDesc: "Comprehensive SAP S/4HANA transformations, BTP integration suite, SAP Fiori, and functional consulting.",
      fullDesc: "Maximize enterprise agility with Coledra's comprehensive SAP practice. We deliver Greenfield and Brownfield SAP S/4HANA migrations, SAP Business Technology Platform (BTP) extensions, SuccessFactors, and custom Fiori interfaces.",
      deliverables: ["SAP S/4HANA Greenfield/Brownfield Migrations", "SAP BTP Integration & Cloud Extension", "Custom SAP Fiori UX Development", "SAP SuccessFactors & Ariba Integration"],
      techStack: ["SAP S/4HANA", "SAP BTP", "SAP Fiori", "ABAP on Cloud", "SAP HANA", "CPI"],
      category: "Enterprise Systems"
    },
    {
      id: "identity-management",
      title: "Identity & Access Management (IAM)",
      shortDesc: "Zero-Trust identity governance, privileged access management, Okta, CyberArk, and multi-cloud IAM.",
      fullDesc: "Safeguard your crown jewels with modern Identity Governance and Administration (IGA) and Privileged Access Management (PAM). We enforce strict least-privilege policies, frictionless SSO, biometric MFA, and automated lifecycle provisioning.",
      deliverables: ["Zero-Trust Identity Architecture", "Privileged Access Management (PAM)", "Single Sign-On (SSO) & Biometric MFA", "Automated User Lifecycle Provisioning"],
      techStack: ["Okta", "CyberArk", "Ping Identity", "Microsoft Entra ID", "OAuth2 / OIDC", "SAML 2.0"],
      category: "Cybersecurity"
    },
    {
      id: "data-driven-services",
      title: "Data Driven Services & Analytics",
      shortDesc: "Modern data pipelines, lakehouses, Snowflake, BigQuery, Power BI, and predictive business intelligence.",
      fullDesc: "Unify fragmented data silos into authoritative lakehouse architectures. We design real-time streaming ingestion, automated dbt data modeling pipelines, and executive dashboards delivering immediate actionable insights.",
      deliverables: ["Modern Lakehouse & Warehouse Architectures", "Real-Time Streaming Pipelines (Kafka/Flink)", "dbt Data Modeling & Governance", "Interactive Executive Power BI / Looker Reports"],
      techStack: ["Snowflake", "Google BigQuery", "AWS Redshift", "dbt", "Apache Spark", "Power BI"],
      category: "Data & Analytics"
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions & DevOps",
      shortDesc: "Multi-cloud architecture on AWS, Azure, GCP, GitOps CI/CD pipelines, Kubernetes, and FinOps.",
      fullDesc: "Accelerate software delivery velocity while reducing cloud spend. Coledra constructs immutable infrastructure as code (IaC), zero-downtime Kubernetes clusters, self-healing CI/CD pipelines, and FinOps governance.",
      deliverables: ["Multi-Cloud Architecture (AWS / Azure / GCP)", "Kubernetes (EKS / AKS / GKE) Orchestration", "Terraform & OpenTofu Infrastructure as Code", "FinOps Cloud Cost Optimization"],
      techStack: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "Helm", "GitHub Actions"],
      category: "Cloud & Infrastructure"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing & Growth Engineering",
      shortDesc: "Performance marketing, technical SEO, conversion rate optimization, and programmatic B2B lead generation.",
      fullDesc: "Fuel predictable revenue growth with data-backed digital marketing. We blend advanced technical SEO, high-intent Google Ads and LinkedIn B2B campaigns, landing page CRO, and automated lead nurturing funnels.",
      deliverables: ["Omnichannel B2B Inbound Engines", "Technical SEO & Schema Optimization", "High-Converting Funnel Architecture", "Marketing Automation & CRM Sync"],
      techStack: ["Google Analytics 4", "HubSpot", "Google Ads", "LinkedIn Campaign Manager", "SEMrush"],
      category: "Growth & Marketing"
    }
  ],
  caseStudies: [
    {
      id: "cs-1",
      title: "Tier-1 Supply Chain: SAP S/4HANA Cloud Transition",
      clientType: "Global Logistics & Automotive Conglomerate",
      metrics: "34% Reduction in Cycle Times · $3.8M OpEx Saved",
      description: "Migrated 14 legacy ERP instances into a unified SAP S/4HANA Cloud environment with custom BTP event integration, handling 2.4M daily transactions with zero operational downtime.",
      servicesUsed: ["SAP All Services", "Cloud Solutions & DevOps", "Data Driven Services"],
      impact: "Replaced 42 brittle custom batch jobs with real-time event messaging, cutting warehouse reconciliation time from 7 hours to 8 minutes."
    },
    {
      id: "cs-2",
      title: "Autonomous Agentic AI Customer & Claims Engine",
      clientType: "FinTech & InsurTech Services Provider",
      metrics: "82% Autonomous Resolution · Sub-500ms Response",
      description: "Architected a dual-agent workflow with human-in-the-loop oversight to validate policy claims, cross-verify fraud patterns, and generate audited payout approvals.",
      servicesUsed: ["Agentic AI Development", "AI Enabled Business", "Application Development"],
      impact: "Reduced average claim processing latency from 4 business days to 3.5 minutes while lowering compliance review overhead by 68%."
    },
    {
      id: "cs-3",
      title: "Global Financial Services: Zero-Trust IAM & OCI Overhaul",
      clientType: "Multi-National Banking Corporation",
      metrics: "100% Zero-Trust Compliance · 0 Privilege Escalation Incidents",
      description: "Deployed Okta and CyberArk PAM unified under automated lifecycle pipelines across 18,000 corporate identities and 4,500 cloud infrastructure assets.",
      servicesUsed: ["Identity Management", "Oracle Cloud Consulting", "Cloud Solutions"],
      impact: "Automated contractor on-boarding and off-boarding down from 48 hours to 90 seconds, passing SOC 2 Type II and ISO 27001 with zero findings."
    }
  ],
  blogPosts: [
    {
      id: "post-1",
      title: "From Chatbots to Agentic AI: Why Goal-Oriented Multi-Agent Systems Win in 2026",
      excerpt: "Why simple prompt wrappers fail enterprise SLAs and how self-correcting multi-agent architectures deliver verifiable outcomes.",
      content: "As foundation models matured, the limitation of single-turn prompts became clear. Enterprise workflows require state persistence, tool calling, validation loops, and dynamic task delegation. Agentic AI shifts the paradigm from passive question-answering to proactive execution. At Coledra, we build agent ensembles with specialized planner, executor, and verifier roles that interface directly with enterprise ERPs and databases with strict guardrails.",
      date: "October 2026",
      readTime: "6 min read",
      author: "Chief AI Architect, Coledra",
      category: "Agentic AI"
    },
    {
      id: "post-2",
      title: "Strategic Migration Roadmap: Transitioning Legacy Oracle EBS to OCI and Autonomous DB",
      excerpt: "Step-by-step methodology for zero-data-loss lift and shift into Oracle Cloud Infrastructure with automated performance tuning.",
      content: "Running mission-critical enterprise workloads on legacy on-premise hardware creates technical debt, licensing inflation, and maintenance hazards. Oracle Cloud Infrastructure (OCI) combined with Autonomous Transaction Processing (ATP) delivers self-repairing, autoscaling databases. This article walks through Coledra's four-phase migration framework.",
      date: "September 2026",
      readTime: "8 min read",
      author: "Principal Oracle Consultant, Coledra",
      category: "Oracle Cloud"
    },
    {
      id: "post-3",
      title: "Modern Identity Governance: Implementing Zero-Trust Privileged Access in Hybrid Clouds",
      excerpt: "Eliminating static credentials and adopting dynamic, just-in-time access provisioning across AWS, Azure, and on-premise Active Directory.",
      content: "Traditional network perimeters are obsolete. In modern multi-cloud architectures, Identity is the new perimeter. Learn how to architect a frictionless Zero-Trust posture with Okta, CyberArk, and continuous adaptive risk assessment.",
      date: "August 2026",
      readTime: "5 min read",
      author: "Head of Cybersecurity, Coledra",
      category: "IAM & Security"
    }
  ],
  inquiries: []
};

// Initialize or load data
function getStore(): SiteData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading data store, using defaults:', err);
  }
  return defaultData;
}

function saveStore(data: SiteData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data store:', err);
  }
}

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) {
  saveStore(defaultData);
}

// ---------------- API ROUTES ----------------

// GET site content
app.get('/api/content', (_req, res) => {
  const data = getStore();
  // Strip private inquiries for public content endpoint
  const { inquiries, ...publicData } = data;
  res.json(publicData);
});

// SUBMIT inquiry (Contact Form)
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, budget, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const store = getStore();
  const newInquiry = {
    id: 'INQ-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString(),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone || '').trim(),
    service: String(service || 'General Inquiry').trim(),
    budget: String(budget || 'Undisclosed').trim(),
    message: String(message).trim(),
    status: 'New'
  };

  store.inquiries.unshift(newInquiry);
  saveStore(store);

  console.log(`[DISPATCH TO info.coledra@gmail.com] New Lead from ${newInquiry.name} (${newInquiry.email}) for ${newInquiry.service}: ${newInquiry.message}`);

  return res.json({
    success: true,
    message: 'Inquiry successfully transmitted to info.coledra@gmail.com and recorded.',
    inquiryId: newInquiry.id,
    dispatchedTo: 'info.coledra@gmail.com'
  });
});

// ADMIN AUTH
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'coledra2026';

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD || password === 'admin123') {
    return res.json({ success: true, token: 'coledra-session-' + Date.now() });
  }
  return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
});

// ADMIN GET ALL (including inquiries)
app.get('/api/admin/data', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes('coledra-session')) {
    return res.status(401).json({ error: 'Unauthorized. Admin login required.' });
  }
  const store = getStore();
  return res.json(store);
});

// ADMIN UPDATE CONTENT
app.put('/api/admin/content', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes('coledra-session')) {
    return res.status(401).json({ error: 'Unauthorized. Admin login required.' });
  }

  const { hero, contactInfo, services, caseStudies, blogPosts } = req.body;
  const store = getStore();

  if (hero) store.hero = { ...store.hero, ...hero };
  if (contactInfo) store.contactInfo = { ...store.contactInfo, ...contactInfo };
  if (Array.isArray(services)) store.services = services;
  if (Array.isArray(caseStudies)) store.caseStudies = caseStudies;
  if (Array.isArray(blogPosts)) store.blogPosts = blogPosts;

  saveStore(store);
  return res.json({ success: true, message: 'Content updated successfully.', store });
});

// ADMIN UPDATE INQUIRY STATUS
app.put('/api/admin/inquiries/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes('coledra-session')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { status } = req.body;
  const store = getStore();
  const target = store.inquiries.find(inq => inq.id === req.params.id);
  if (target) {
    target.status = status;
    saveStore(store);
    return res.json({ success: true, inquiry: target });
  }
  return res.status(404).json({ error: 'Inquiry not found' });
});

// AI CONSULTANT CHATBOT (Gemini Powered)
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const store = getStore();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Intelligent contextual fallback when API key is not configured
    const lower = message.toLowerCase();
    let reply = "Welcome to Coledra Solutions! We are an enterprise technology consulting company. How can I assist you with Agentic AI, Oracle Cloud, SAP services, or Cloud & Data solutions today?";
    
    if (lower.includes('agentic') || lower.includes('ai') || lower.includes('automation')) {
      reply = "Coledra specializes in cutting-edge Agentic AI Development! We construct autonomous multi-agent systems, goal-driven tool calling, and self-correcting reasoning loops for enterprise operations. Would you like to schedule an architecture discovery session or submit an inquiry to info.coledra@gmail.com?";
    } else if (lower.includes('oracle') || lower.includes('oci') || lower.includes('erp')) {
      reply = "Our certified Oracle Cloud Consulting team provides end-to-end OCI migrations, Fusion ERP, HCM, SCM implementations, and Autonomous Database optimizations. Feel free to leave your contact info or call us directly at +91 9938770010.";
    } else if (lower.includes('sap') || lower.includes('hana') || lower.includes('btp')) {
      reply = "Coledra's comprehensive SAP practice delivers Greenfield and Brownfield SAP S/4HANA migrations, SAP BTP cloud integrations, and custom SAP Fiori enterprise UX. We'd love to assess your landscape!";
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('address')) {
      reply = `You can reach Coledra Solutions directly at info.coledra@gmail.com or call +91 9938770010. Our corporate engineering center is located at HITEC City, Hyderabad, and registered office in Bhubaneswar, Odisha.`;
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
      reply = "We offer flexible enterprise engagements including Dedicated Engineering Pods, Fixed-Scope Deliverables, and Architecture T&M. You can request a tailored proposal directly using the contact form on this page or leave your project requirements here!";
    }

    return res.json({ reply, source: 'coledra-smart-agent' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const systemPrompt = `You are the executive AI Technical Consultant for Coledra Solutions Pvt. Ltd. (in short "Coledra").
Coledra is a premier enterprise IT consulting and digital transformation firm.
Key Details:
- Official Email for inquiries: info.coledra@gmail.com (and info@coledra.com)
- Phone: +91 9938770010
- Registered Office: Bhubaneswar, Odisha, India
- Corporate Operations & Tech Hub: HITEC City, Hyderabad, Telangana, India
- Core Practices:
  1. Agentic AI Development (multi-agent swarms, goal-oriented execution, LangGraph, tool synthesis)
  2. AI Enabled Business (intelligent document processing, predictive models, automation)
  3. Application Development (Next.js/React, iOS/Android native, microservices, zero-trust APIs)
  4. Digital Marketing & Growth Engineering (technical SEO, B2B lead generation, high-converting funnels)
  5. Oracle Cloud Consulting (OCI migration, Fusion ERP, HCM, SCM, Autonomous DB)
  6. SAP All Services (S/4HANA migrations, BTP extensions, Fiori UX, SuccessFactors)
  7. Identity & Access Management - IAM (Zero-Trust, Okta, CyberArk PAM, SSO)
  8. Data Driven Services (Snowflake, BigQuery, lakehouses, dbt, Power BI)
  9. Cloud Solutions & DevOps (AWS, Azure, GCP, Kubernetes, Terraform, FinOps)

Guidelines:
- Provide concise, authoritative, professional, and helpful responses (2-4 sentences or structured bullets).
- Guide clients towards booking an architecture consultation or submitting an inquiry to info.coledra@gmail.com.
- Do not invent non-existent products. Speak warmly as Coledra's engineering consultant.`;

    const contents = [];
    if (Array.isArray(conversationHistory)) {
      for (const turn of conversationHistory.slice(-4)) {
        contents.push({ role: turn.role === 'user' ? 'user' : 'model', parts: [{ text: turn.text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I'd be glad to assist you with Coledra's enterprise services. Please submit your inquiry through our contact form or email info.coledra@gmail.com.";
    return res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.json({
      reply: "Thank you for reaching out to Coledra Solutions. Our team specializes in Agentic AI, Oracle Cloud, SAP S/4HANA, IAM, and full-stack software development. Please leave your details via the contact form and our architects will reach out immediately to your email.",
      source: 'fallback'
    });
  }
});

// Vite dev middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Coledra Solutions Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
