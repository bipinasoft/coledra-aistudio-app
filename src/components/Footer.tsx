import React, { useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contactInfo: ContactInfo;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contactInfo, onNavigate, onOpenAdmin }) => {
  const [modalPolicy, setModalPolicy] = useState<{ title: string; content: string } | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPrivacy = () => {
    setModalPolicy({
      title: "Data Privacy & Protection Policy",
      content: "Coledra Solutions Pvt. Ltd. ('Coledra') enforces strict data protection standards in full alignment with ISO 27001, GDPR, and Indian DPDP Act. All technical RFP data, client inquiries, and enterprise architectural blueprints are encrypted in transit and at rest. We never sell, share, or monetize enterprise client data."
    });
  };

  const openTerms = () => {
    setModalPolicy({
      title: "Enterprise Terms of Service",
      content: "All enterprise consulting engagements, proofs-of-concept, and software development services provided by Coledra Solutions Pvt. Ltd. are governed by comprehensive Master Services Agreements (MSA) and Mutual Non-Disclosure Agreements (NDA). All deliverables and architectural assets are verified against documented enterprise acceptance criteria."
    });
  };

  const openSecurity = () => {
    setModalPolicy({
      title: "Zero-Trust & ISO 27001 Information Security",
      content: "Our software development life cycle (SDLC) incorporates DevSecOps best practices, automated vulnerability scans, dynamic application security testing (DAST), and strict least-privilege IAM policies. Continuous audits ensure our engineering pods meet stringent financial and enterprise cloud compliance standards."
    });
  };

  return (
    <footer className="relative bg-[#08090C] border-t border-white/[0.08] text-[#8A8F98] text-xs">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Corporate Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-white/[0.08] border border-white/[0.12] text-white font-mono text-xs font-semibold">
                C
              </div>
              <span className="font-display text-sm font-semibold text-[#F7F8F8] tracking-[-0.02em]">
                COLEDRA SOLUTIONS
              </span>
            </div>
            
            <p className="text-xs text-[#8A8F98] leading-relaxed max-w-sm">
              Coledra Solutions Private Limited is a global enterprise software consulting and systems engineering firm specializing in Agentic AI, Oracle Cloud, SAP S/4HANA, Zero-Trust IAM, and modern data-driven architectures.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#626670] space-y-0.5">
              <div>CIN: U72900OR2020PTC034260 · Inc: Sept 2020</div>
              <div>Directors: Ranjeta Sahoo · Bishnupriya Sahoo</div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-[4px] border border-white/[0.08] bg-[#101116] px-2.5 py-1 text-[11px] font-mono text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-[4px] border border-white/[0.08] bg-[#101116] px-2.5 py-1 text-[11px] font-mono text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-[4px] border border-white/[0.08] bg-[#101116] px-2.5 py-1 text-[11px] font-mono text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Practices & Services */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
              Practices
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Agentic AI Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  AI Enabled Business
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Oracle Cloud Consulting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  SAP All Services & BTP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Identity Governance (IAM)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Application Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Data Driven Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Cloud Solutions & DevOps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Digital Marketing
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Corporate */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
              Enterprise
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Coledra
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Governance & Directors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors">
                  Enterprise Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Engineering Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Request Briefing
                </button>
              </li>
              <li>
                <button onClick={openPrivacy} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={openTerms} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={openSecurity} className="hover:text-white transition-colors">
                  Security & Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Routing */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
              Communications
            </div>
            
            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="text-[#626670] text-[10px]">Primary Routing:</div>
                <a href={`mailto:${contactInfo.email}`} className="text-[#F7F8F8] hover:underline">
                  {contactInfo.email}
                </a>
              </div>

              <div>
                <div className="text-[#626670] text-[10px]">Executive Direct:</div>
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-[#F7F8F8] hover:underline">
                  {contactInfo.phone}
                </a>
              </div>

              <div>
                <div className="text-[#626670] text-[10px]">Corporate Tech Hub:</div>
                <div className="text-[#8A8F98] text-[11px] mt-0.5 font-sans">
                  HITEC City, Hyderabad, Telangana, India
                </div>
              </div>

              <div>
                <div className="text-[#626670] text-[10px]">Registered HQ:</div>
                <div className="text-[#8A8F98] text-[11px] mt-0.5 font-sans">
                  Infocity Road, Patia, Bhubaneswar, Odisha, India
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] font-mono text-[#626670] hover:text-white transition-colors"
              >
                [Admin Portal]
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#626670]">
          <div>
            © {new Date().getFullYear()} Coledra Solutions Private Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>ISO 9001:2015 & ISO/IEC 27001 Certified Frameworks</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#8A8F98] hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Policy Modal */}
      {modalPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-xl border border-white/[0.12] bg-[#101116] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="font-display text-base font-semibold text-[#F7F8F8]">
                {modalPolicy.title}
              </h3>
              <button
                onClick={() => setModalPolicy(null)}
                className="text-[#8A8F98] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-xs text-[#A1A6B3] leading-relaxed">
              {modalPolicy.content}
            </p>
            <div className="mt-6 pt-3 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setModalPolicy(null)}
                className="rounded-[6px] bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-[#E5E6E8]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
