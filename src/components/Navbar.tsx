import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Lock, 
  ChevronDown, 
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Database,
  Shield,
  Activity,
  Cloud,
  TrendingUp,
  Boxes
} from 'lucide-react';
import { SYSTEMS_TOPOLOGY_IMAGE } from '../data/initialContent';

interface NavbarProps {
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectService: (serviceTitle: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAdmin, 
  onNavigate, 
  onSelectService,
  activeSection 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    {
      id: 'agentic-ai',
      title: 'Agentic AI Systems',
      desc: 'Multi-agent autonomous swarms & tool synthesis',
      icon: <Terminal className="h-4 w-4 text-white" />,
      tag: 'Autonomous'
    },
    {
      id: 'ai-enabled-business',
      title: 'AI Enabled Business',
      desc: 'Cognitive process automation & forecasting models',
      icon: <Cpu className="h-4 w-4 text-white" />,
      tag: 'Automation'
    },
    {
      id: 'app-development',
      title: 'Application Development',
      desc: 'Distributed microservices, web & native platforms',
      icon: <Layers className="h-4 w-4 text-white" />,
      tag: 'Full-Stack'
    },
    {
      id: 'oracle-cloud',
      title: 'Oracle Cloud Consulting',
      desc: 'OCI migrations, Fusion ERP & Autonomous DB',
      icon: <Database className="h-4 w-4 text-white" />,
      tag: 'Enterprise'
    },
    {
      id: 'sap-services',
      title: 'SAP All Services',
      desc: 'SAP S/4HANA transitions, BTP & Fiori architecture',
      icon: <Boxes className="h-4 w-4 text-white" />,
      tag: 'S/4HANA'
    },
    {
      id: 'identity-management',
      title: 'Identity Governance (IAM)',
      desc: 'Zero-Trust access policies, Okta & CyberArk PAM',
      icon: <Shield className="h-4 w-4 text-white" />,
      tag: 'Security'
    },
    {
      id: 'data-driven-services',
      title: 'Data Systems & Lakehouses',
      desc: 'Snowflake, BigQuery pipelines & streaming dbt',
      icon: <Activity className="h-4 w-4 text-white" />,
      tag: 'Analytics'
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions & DevOps',
      desc: 'Kubernetes orchestration, IaC & FinOps governance',
      icon: <Cloud className="h-4 w-4 text-white" />,
      tag: 'Infra'
    },
    {
      id: 'digital-marketing',
      title: 'Growth & Performance',
      desc: 'Technical SEO, telemetry & B2B lead pipelines',
      icon: <TrendingUp className="h-4 w-4 text-white" />,
      tag: 'Growth'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(id);
  };

  const handleServiceClick = (serviceTitle: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    onSelectService(serviceTitle);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#08090C]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand: Linear-style minimal geometric monogram & wordmark */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-white/[0.08] border border-white/[0.12] text-white font-mono text-xs font-semibold transition-colors group-hover:border-white/30">
            C
          </div>
          <span className="font-display text-[15px] font-semibold tracking-[-0.03em] text-[#F7F8F8]">
            COLEDRA
          </span>
        </a>

        {/* Navigation Links with Razor-Sharp Linear Dropdown */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#8A8F98]">
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-[#F7F8F8] ${
                activeSection === 'services' || servicesDropdownOpen ? 'text-[#F7F8F8]' : 'text-[#8A8F98]'
              }`}
            >
              <span>Capabilities</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${servicesDropdownOpen ? 'rotate-180 text-white' : 'text-[#626670]'}`} />
            </button>

            {/* Linear-Style Razor-Sharp Mega Menu */}
            {servicesDropdownOpen && (
              <div 
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[740px] rounded-xl border border-white/[0.1] bg-[#101116] p-5 shadow-2xl backdrop-blur-xl grid grid-cols-12 gap-5 z-50 animate-in fade-in duration-150"
              >
                <div className="col-span-8 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                      Enterprise Practices
                    </span>
                    <button
                      onClick={() => handleLinkClick('services')}
                      className="text-[11px] text-[#8A8F98] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>All Specifications</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                    {servicesList.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => handleServiceClick(svc.title)}
                        className="flex items-start gap-2.5 p-2 rounded-lg text-left transition-all hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] group"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-[#16171E] border border-white/[0.08] group-hover:border-white/20 transition-colors">
                          {svc.icon}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-[#F7F8F8] group-hover:text-white">
                              {svc.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#626670] line-clamp-1 mt-0.5">
                            {svc.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right 4 Cols: Technical Topology Spec Banner */}
                <div className="col-span-4 rounded-lg border border-white/[0.08] bg-[#14151B] p-3 flex flex-col justify-between">
                  <div>
                    <div className="overflow-hidden rounded-[5px] border border-white/[0.06] mb-2.5">
                      <img
                        src={SYSTEMS_TOPOLOGY_IMAGE}
                        alt="Systems Topology"
                        className="h-24 w-full object-cover opacity-85"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs font-semibold text-[#F7F8F8]">
                      Topology & Architecture
                    </div>
                    <p className="mt-1 text-[11px] text-[#8A8F98] leading-relaxed">
                      Deterministic verification loops, event streams, and Zero-Trust boundary compliance.
                    </p>
                  </div>

                  <button
                    onClick={() => handleServiceClick('Agentic AI Development')}
                    className="mt-3 w-full rounded-[6px] border border-white/[0.12] bg-white/[0.06] py-1.5 text-center text-xs font-medium text-[#F7F8F8] hover:bg-white hover:text-black transition-all"
                  >
                    Inquire Specification
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('about')}
            className={`transition-colors hover:text-[#F7F8F8] ${
              activeSection === 'about' ? 'text-[#F7F8F8]' : 'text-[#8A8F98]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleLinkClick('portfolio')}
            className={`transition-colors hover:text-[#F7F8F8] ${
              activeSection === 'portfolio' ? 'text-[#F7F8F8]' : 'text-[#8A8F98]'
            }`}
          >
            Case Studies
          </button>

          <button
            onClick={() => handleLinkClick('blog')}
            className={`transition-colors hover:text-[#F7F8F8] ${
              activeSection === 'blog' ? 'text-[#F7F8F8]' : 'text-[#8A8F98]'
            }`}
          >
            Research
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            className={`transition-colors hover:text-[#F7F8F8] ${
              activeSection === 'contact' ? 'text-[#F7F8F8]' : 'text-[#8A8F98]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Primary Action Button (Linear Style: High-Precision Button) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-[6px] bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition-all hover:bg-[#E5E6E8] active:scale-[0.98] whitespace-nowrap shrink-0 shadow-sm"
          >
            Request Briefing
          </button>

          <button
            onClick={onOpenAdmin}
            title="Admin Login & CMS"
            aria-label="Admin Portal"
            className="flex items-center gap-1.5 rounded-[6px] border border-white/[0.08] bg-[#101116] px-2.5 py-1.5 text-xs font-medium text-[#8A8F98] hover:border-white/[0.16] hover:text-[#F7F8F8] transition-colors whitespace-nowrap shrink-0"
          >
            <Lock className="h-3 w-3 text-[#8A8F98]" />
            <span className="hidden lg:inline text-[11px]">CMS</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/[0.08] bg-[#101116] text-[#8A8F98] hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#08090C] px-4 pt-2 pb-5 md:hidden">
          <nav className="flex flex-col space-y-2.5 pt-1 text-sm font-medium">
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full py-1.5 text-[#F7F8F8]"
              >
                <span>Capabilities</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-3 py-1.5 space-y-1.5 border-l border-white/[0.08] my-1">
                  {servicesList.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => handleServiceClick(svc.title)}
                      className="flex items-center gap-2 w-full text-left py-1 text-xs text-[#8A8F98] hover:text-white"
                    >
                      <span>{svc.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('about')}
              className="text-left text-[#8A8F98] hover:text-white py-1"
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('portfolio')}
              className="text-left text-[#8A8F98] hover:text-white py-1"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleLinkClick('blog')}
              className="text-left text-[#8A8F98] hover:text-white py-1"
            >
              Research
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left text-[#8A8F98] hover:text-white py-1"
            >
              Contact
            </button>

            <div className="pt-3 border-t border-white/[0.08]">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full rounded-[6px] bg-white py-2 text-center text-xs font-semibold text-black"
              >
                Request Briefing
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
