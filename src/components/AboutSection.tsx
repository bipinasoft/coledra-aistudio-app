import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Shield, 
  Users, 
  Target, 
  Clock, 
  PhoneCall, 
  Mail, 
  ArrowRight,
  Check
} from 'lucide-react';
import { ContactInfo } from '../types';
import { ABOUT_INNOVATION_IMAGE, OPERATIONS_ROOM_IMAGE } from '../data/initialContent';

interface AboutSectionProps {
  contactInfo: ContactInfo;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ contactInfo, onContactClick }) => {
  const [activeCenter, setActiveCenter] = useState<'hyderabad' | 'bhubaneswar'>('hyderabad');

  return (
    <section id="about" className="relative bg-[#08090C] py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
            Company / Corporate Architecture
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F7F8F8] [text-wrap:balance]">
            Engineering the Autonomous Enterprise
          </h2>
          <p className="mt-3 text-base text-[#8A8F98] font-normal leading-relaxed">
            Founded in September 2020, Coledra Solutions Private Limited bridges visionary Agentic AI research with enterprise-scale SAP, Oracle Cloud, and Zero-Trust Cybersecurity execution.
          </p>
        </div>

        {/* Linear High-Contrast Architectural Banner */}
        <div className="mt-12 overflow-hidden rounded-xl border border-white/[0.08] bg-[#101116] grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-8 overflow-hidden relative">
            <img
              src={ABOUT_INNOVATION_IMAGE}
              alt="Coledra Enterprise Technology Hub in HITEC City Hyderabad"
              className="w-full h-72 sm:h-96 object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101116] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#8A8F98] font-mono bg-[#08090C]/80 px-3 py-1.5 rounded-[4px] border border-white/[0.08] backdrop-blur-md">
              <span>Facility: HITEC City Tech Operations, Hyderabad</span>
              <span>CIN: U72900OR2020PTC034260</span>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#101116] space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                Institutional Governance
              </div>

              <h3 className="font-display text-lg font-semibold text-[#F7F8F8]">
                Dual-Hub Infrastructure
              </h3>

              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Operating with dedicated engineering pods out of Hyderabad's premier technology corridor and corporate administrative governance headquartered in Bhubaneswar.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-[#A1A6B3]">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-white/70" />
                  <span>ISO 27001 Data Security Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-white/70" />
                  <span>ISO 9001 Quality Management System</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-white/70" />
                  <span>SOC 2 Type II Engagement Alignment</span>
                </div>
              </div>
            </div>

            <button
              onClick={onContactClick}
              className="w-full rounded-[6px] border border-white/[0.12] bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-[#E5E6E8] transition-all"
            >
              Consult Leadership
            </button>
          </div>

        </div>

        {/* 2-Column Split: Architectural Pillars + Leadership */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mission & Leadership */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="rounded-xl border border-white/[0.08] bg-[#101116] p-6 sm:p-7">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-2">
                Operational Framework
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F7F8F8]">
                Mission-Critical Engineering Rigor
              </h3>
              <p className="mt-3 text-xs text-[#8A8F98] leading-relaxed">
                We engineer deterministic software and multi-agent workflows built for enterprise resilience. Rather than unvalidated prompts, our systems employ static analysis, semantic vector memory, self-healing retries, and strict RBAC authorization boundaries.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
                <div className="p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06]">
                  <div className="text-xs font-semibold text-[#F7F8F8]">Zero-Trust Security</div>
                  <div className="text-[11px] text-[#626670] mt-0.5">Least privilege & PAM</div>
                </div>

                <div className="p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06]">
                  <div className="text-xs font-semibold text-[#F7F8F8]">99.98% SLA Uptime</div>
                  <div className="text-[11px] text-[#626670] mt-0.5">Automated telemetry</div>
                </div>

                <div className="p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06]">
                  <div className="text-xs font-semibold text-[#F7F8F8]">Certified Pods</div>
                  <div className="text-[11px] text-[#626670] mt-0.5">Oracle & SAP specialists</div>
                </div>
              </div>
            </div>

            {/* Leadership Profiles */}
            <div className="rounded-xl border border-white/[0.08] bg-[#101116] p-6 sm:p-7">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                  Corporate Governance
                </div>
                <span className="text-xs text-[#8A8F98] font-mono">Directors</span>
              </div>
              
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/[0.06] bg-[#14151B] p-4">
                  <div className="text-sm font-semibold text-[#F7F8F8]">Ranjeta Sahoo</div>
                  <div className="text-xs text-[#8A8F98] font-mono mt-0.5">Director · Operations & Delivery</div>
                  <p className="mt-2.5 text-xs text-[#8A8F98] leading-relaxed">
                    Directing enterprise delivery lifecycles, resource governance, and corporate compliance across international client portfolios.
                  </p>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-[#14151B] p-4">
                  <div className="text-sm font-semibold text-[#F7F8F8]">Bishnupriya Sahoo</div>
                  <div className="text-xs text-[#8A8F98] font-mono mt-0.5">Director · Technology Advisory</div>
                  <p className="mt-2.5 text-xs text-[#8A8F98] leading-relaxed">
                    Spearheading proprietary Agentic AI architectures, large-scale ERP modernization programs, and research initiatives.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Operating Hub Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-xl border border-white/[0.08] bg-[#101116] p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                  Operating Facilities
                </div>
                
                <div className="flex rounded-[5px] bg-[#14151B] p-0.5 border border-white/[0.06]">
                  <button
                    onClick={() => setActiveCenter('hyderabad')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] transition-colors ${
                      activeCenter === 'hyderabad' ? 'bg-white text-black font-semibold' : 'text-[#8A8F98] hover:text-white'
                    }`}
                  >
                    Hyderabad Hub
                  </button>
                  <button
                    onClick={() => setActiveCenter('bhubaneswar')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] transition-colors ${
                      activeCenter === 'bhubaneswar' ? 'bg-white text-black font-semibold' : 'text-[#8A8F98] hover:text-white'
                    }`}
                  >
                    Bhubaneswar HQ
                  </button>
                </div>
              </div>

              {activeCenter === 'hyderabad' ? (
                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="text-[#F7F8F8] font-sans font-semibold text-sm">
                    Technology Operations & Agentic AI Hub
                  </div>
                  <div className="p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06] text-[#A1A6B3] font-sans leading-relaxed">
                    {contactInfo.corpOffice}
                  </div>
                  <div className="space-y-1 text-[#626670] pt-1 text-[11px]">
                    <div>• Agentic AI R&D Pods</div>
                    <div>• Cloud & DevOps Operations Center</div>
                    <div>• 24/7 Managed OCI and SAP Support</div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="text-[#F7F8F8] font-sans font-semibold text-sm">
                    Registered Corporate Headquarters
                  </div>
                  <div className="p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06] text-[#A1A6B3] font-sans leading-relaxed">
                    {contactInfo.regOffice}
                  </div>
                  <div className="space-y-1 text-[#626670] pt-1 text-[11px]">
                    <div>• Corporate Governance & Legal</div>
                    <div>• Financial & Compliance Operations</div>
                    <div>• Institutional Partnerships</div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2 text-xs font-mono">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#626670]" />
                  <span>{contactInfo.email}</span>
                </a>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-[#626670]" />
                  <span>{contactInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#14151B] p-6 space-y-3">
              <div className="text-xs font-semibold text-[#F7F8F8]">
                Enterprise Non-Disclosure & Security
              </div>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                All client architectural inquiries and technical specifications are handled under mutual non-disclosure agreements with strict information barriers.
              </p>
              <button
                onClick={onContactClick}
                className="w-full rounded-[6px] border border-white/[0.12] bg-white/[0.06] py-2 text-xs font-medium text-[#F7F8F8] hover:bg-white hover:text-black transition-all"
              >
                Initiate NDA Briefing
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
