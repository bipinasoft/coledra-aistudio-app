export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  category: 'Artificial Intelligence' | 'Enterprise Systems' | 'Software Engineering' | 'Cybersecurity' | 'Data & Analytics' | 'Cloud & Infrastructure' | 'Growth & Marketing';
  image?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  metrics: string;
  description: string;
  servicesUsed: string[];
  impact: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image?: string;
}

export interface InquiryItem {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Closed';
}

export interface HeroContent {
  badge: string;
  headline: string;
  highlightText: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  regOffice: string;
  corpOffice: string;
  businessHours: string;
}

export interface SiteContent {
  hero: HeroContent;
  contactInfo: ContactInfo;
  services: ServiceItem[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
}
