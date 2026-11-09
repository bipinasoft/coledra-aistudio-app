import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  Shield
} from 'lucide-react';
import { ContactInfo, ServiceItem } from '../types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  services: ServiceItem[];
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  services,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Agentic AI Development',
    budget: '$25,000 - $50,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please provide a brief project summary (at least 10 characters).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccessResponse({
        inquiryId: data.inquiryId || 'COLEDRA-' + Date.now().toString(36).toUpperCase(),
        message: data.message || 'Inquiry successfully transmitted to info.coledra@gmail.com.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: services[0]?.title || 'Agentic AI Development',
        budget: '$25,000 - $50,000',
        message: ''
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Unable to transmit inquiry. Please email directly to info.coledra@gmail.com.');
    } finally {
      setLoading(false);
    }
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service || 'Enterprise Consultation'} - ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Service: ${formData.service}\n` +
      `Budget: ${formData.budget}\n\n` +
      `Project Brief:\n${formData.message}\n`
    );
    return `mailto:info.coledra@gmail.com?subject=${subject}&body=${body}`;
  };

  const copyInquiryDetails = () => {
    const text = `To: info.coledra@gmail.com\nSubject: Project Inquiry: ${formData.service}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDetails: ${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative bg-[#08090C] py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
            Inquiries / Enterprise Transmission
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F7F8F8] [text-wrap:balance]">
            Initiate Architecture Briefing
          </h2>
          <p className="mt-3 text-base text-[#8A8F98] font-normal leading-relaxed">
            All RFPs and technical inquiries are routed directly to <span className="text-[#F7F8F8] font-mono">info.coledra@gmail.com</span> with contractual NDA protection and an SLA response under 24 business hours.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#101116] p-6 sm:p-8">
            
            {successResponse ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[6px] bg-white/[0.08] text-white border border-white/[0.14]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#F7F8F8]">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs text-[#8A8F98] max-w-md mx-auto leading-relaxed">
                  Recorded and delivered to <span className="text-white font-mono">info.coledra@gmail.com</span>. A principal solutions architect will review your technical specifications.
                </p>
                <div className="inline-block rounded-[4px] bg-[#14151B] px-3 py-1.5 font-mono text-xs text-[#8A8F98] border border-white/[0.08]">
                  Reference ID: <span className="text-[#F7F8F8] font-medium">{successResponse.inquiryId}</span>
                </div>
                <div className="pt-3">
                  <button
                    onClick={() => setSuccessResponse(null)}
                    className="rounded-[6px] bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-[#E5E6E8]"
                  >
                    Submit New Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                    Project Specifications
                  </span>
                  <span className="text-[11px] text-[#8A8F98] font-mono">
                    Routing: info.coledra@gmail.com
                  </span>
                </div>

                {errorMessage && (
                  <div className="rounded-[6px] bg-red-950/20 border border-red-500/20 p-3 text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8A8F98] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Wright"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3 py-2 text-xs text-[#F7F8F8] placeholder-[#626670] focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A8F98] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. david@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3 py-2 text-xs text-[#F7F8F8] placeholder-[#626670] focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8A8F98] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9938770010"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3 py-2 text-xs text-[#F7F8F8] placeholder-[#626670] focus:border-white/30 focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A8F98] mb-1.5">
                      Practice Focus
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3 py-2 text-xs text-[#F7F8F8] focus:border-white/30 focus:outline-none transition-colors"
                    >
                      {services.map((svc) => (
                        <option key={svc.id} value={svc.title} className="bg-[#101116] text-[#F7F8F8]">
                          {svc.title}
                        </option>
                      ))}
                      <option value="General Enterprise Consultation" className="bg-[#101116] text-[#F7F8F8]">
                        General Enterprise Consultation
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8A8F98] mb-1.5">
                    Investment Scope
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3 py-2 text-xs text-[#F7F8F8] focus:border-white/30 focus:outline-none transition-colors"
                  >
                    <option value="Under $25,000" className="bg-[#101116] text-[#F7F8F8]">Pilot Engagement (&lt; $25,000)</option>
                    <option value="$25,000 - $50,000" className="bg-[#101116] text-[#F7F8F8]">$25,000 - $50,000 (Departmental Rollout)</option>
                    <option value="$50,000 - $150,000" className="bg-[#101116] text-[#F7F8F8]">$50,000 - $150,000 (Enterprise Modernization)</option>
                    <option value="$150,000+" className="bg-[#101116] text-[#F7F8F8]">$150,000+ (Multi-Year Global Transformation)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-[#8A8F98]">
                      Technical Requirements Brief *
                    </label>
                    <span className="text-[10px] font-mono text-[#626670]">Presets:</span>
                  </div>

                  {/* Linear Minimalist Scenario Chips */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          service: 'Agentic AI Development',
                          message: 'We are seeking to architect an autonomous multi-agent swarm with tool-calling capabilities to automate cross-departmental operations and claims verification.'
                        });
                      }}
                      className="rounded-[4px] bg-[#14151B] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06] hover:border-white/20 hover:text-white transition-colors"
                    >
                      Agentic AI Swarm
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          service: 'SAP All Services',
                          message: 'We require an enterprise assessment and migration strategy to transition our legacy SAP ECC landscape into SAP S/4HANA Cloud and integrate custom services via SAP BTP.'
                        });
                      }}
                      className="rounded-[4px] bg-[#14151B] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06] hover:border-white/20 hover:text-white transition-colors"
                    >
                      SAP S/4HANA Migration
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          service: 'Oracle Cloud Consulting',
                          message: 'We are planning to migrate our mission-critical enterprise workloads from on-premise hardware to Oracle Cloud Infrastructure (OCI) and optimize Oracle Autonomous DB.'
                        });
                      }}
                      className="rounded-[4px] bg-[#14151B] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06] hover:border-white/20 hover:text-white transition-colors"
                    >
                      Oracle Cloud & OCI
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          service: 'Identity Management (IAM)',
                          message: 'We want to enforce a Zero-Trust identity architecture across our corporate identities with Okta SSO, CyberArk PAM, and adaptive biometric authentication.'
                        });
                      }}
                      className="rounded-[4px] bg-[#14151B] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06] hover:border-white/20 hover:text-white transition-colors"
                    >
                      Zero-Trust IAM
                    </button>
                  </div>

                  <textarea
                    required
                    rows={4}
                    placeholder="Provide architecture constraints, timelines, compliance standards, and existing infrastructure..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3 py-2 text-xs text-[#F7F8F8] placeholder-[#626670] focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-[6px] bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-[#E5E6E8] disabled:opacity-50 active:scale-[0.98]"
                  >
                    {loading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Transmit Technical Inquiry</span>
                        <Send className="h-3 w-3" />
                      </>
                    )}
                  </button>

                  <a
                    href={generateMailtoUrl()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-[6px] border border-white/[0.08] bg-[#14151B] px-3.5 py-2.5 text-xs font-medium text-[#8A8F98] hover:text-white hover:border-white/[0.16] transition-colors font-mono"
                    title="Launch default email client"
                  >
                    <span>Mail Client</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    type="button"
                    onClick={copyInquiryDetails}
                    className="text-[#8A8F98] hover:text-white p-2 rounded-[6px] border border-white/[0.08] bg-[#14151B]"
                    title="Copy details"
                  >
                    {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="text-[10px] font-mono text-[#626670] pt-1">
                  Enforced TLS 1.3 encryption · Direct routing to info.coledra@gmail.com
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Corporate Contacts */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-xl border border-white/[0.08] bg-[#101116] p-6 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                Corporate Communications
              </div>

              <div className="space-y-2.5 text-xs">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06] hover:border-white/20 transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#8A8F98] mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono text-[#626670]">Primary Inbound Routing</div>
                    <div className="text-xs font-mono font-medium text-[#F7F8F8] mt-0.5">{contactInfo.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-3 p-3 rounded-[6px] bg-[#14151B] border border-white/[0.06] hover:border-white/20 transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#8A8F98] mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono text-[#626670]">Direct Executive Line</div>
                    <div className="text-xs font-mono font-medium text-[#F7F8F8] mt-0.5">{contactInfo.phone}</div>
                    <div className="text-[10px] text-[#626670] mt-0.5">{contactInfo.businessHours}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#101116] p-6 space-y-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-[#626670]">
                Facility Addresses
              </div>

              <div className="space-y-3">
                <div className="border-l border-white/20 pl-3">
                  <div className="text-[#F7F8F8] font-sans font-medium text-xs">Technology Hub (Hyderabad)</div>
                  <div className="text-[#8A8F98] font-sans text-xs mt-0.5">{contactInfo.corpOffice}</div>
                </div>

                <div className="border-l border-white/20 pl-3">
                  <div className="text-[#F7F8F8] font-sans font-medium text-xs">Registered HQ (Bhubaneswar)</div>
                  <div className="text-[#8A8F98] font-sans text-xs mt-0.5">{contactInfo.regOffice}</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#14151B] p-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#8A8F98] shrink-0" />
              <div className="text-xs text-[#8A8F98]">
                <span className="text-[#F7F8F8] font-medium">Confidentiality Guarantee:</span> Mutual NDA executed prior to code, architecture, or database inspection.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
