import React, { useState } from 'react';
import { ArrowUpRight, Check, X, Building } from 'lucide-react';
import { CaseStudy } from '../types';

interface PortfolioSectionProps {
  caseStudies: CaseStudy[];
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  caseStudies,
  onSelectServiceForInquiry,
}) => {
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'ERP & Cloud', 'Agentic AI', 'Cybersecurity'];

  const filtered = filter === 'All'
    ? caseStudies
    : caseStudies.filter(cs => {
        if (filter === 'ERP & Cloud') return cs.servicesUsed.some(s => s.includes('SAP') || s.includes('Oracle') || s.includes('Cloud'));
        if (filter === 'Agentic AI') return cs.servicesUsed.some(s => s.includes('AI') || s.includes('Agentic'));
        if (filter === 'Cybersecurity') return cs.servicesUsed.some(s => s.includes('Identity') || s.includes('IAM'));
        return true;
      });

  return (
    <section id="portfolio" className="relative bg-[#08090C] py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
              Case Studies / Quantitative Outcomes
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F7F8F8] [text-wrap:balance]">
              Verified Architecture Outcomes
            </h2>
            <p className="mt-3 text-base text-[#8A8F98] font-normal">
              Empirical case studies detailing enterprise ERP migrations, autonomous multi-agent deployments, and Zero-Trust identity rollouts.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-[#101116] border border-white/[0.08] rounded-lg shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[5px] transition-all whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#8A8F98] hover:text-[#F7F8F8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid: Razor-Sharp 1px Borders */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filtered.map((study) => (
            <div
              key={study.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#101116] transition-all duration-200 hover:border-white/[0.18] hover:bg-[#13141A]"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden bg-[#08090C] border-b border-white/[0.08]">
                  {study.image ? (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#101116]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101116] via-[#101116]/30 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 rounded-[4px] bg-[#08090C]/85 px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.08]">
                    <span>{study.clientType}</span>
                  </div>

                  {/* Quantitative Metric */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-[5px] bg-[#08090C]/90 px-3 py-1.5 text-[11px] font-mono text-[#F7F8F8] border border-white/[0.1] backdrop-blur-md">
                    <span className="truncate">{study.metrics}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-[#F7F8F8] leading-snug">
                    {study.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-[#8A8F98] leading-relaxed line-clamp-3">
                    {study.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1 border-t border-white/[0.06] pt-3">
                    {study.servicesUsed.map((svc, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-[4px] bg-[#16171E] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06]"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action trigger */}
              <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between bg-[#0B0C10]">
                <button
                  onClick={() => setActiveModalCase(study)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors"
                >
                  <span>Architecture Report</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Case Study Detail Modal */}
      {activeModalCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-xl border border-white/[0.12] bg-[#101116] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="text-[11px] font-mono text-[#8A8F98] uppercase tracking-wider">
                  {activeModalCase.clientType}
                </div>
                <h3 className="font-display text-xl font-semibold text-[#F7F8F8] mt-1">
                  {activeModalCase.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalCase(null)}
                aria-label="Close"
                className="rounded-[6px] p-1.5 text-[#8A8F98] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeModalCase.image && (
              <div className="mt-5 overflow-hidden rounded-lg border border-white/[0.08] max-h-56">
                <img
                  src={activeModalCase.image}
                  alt={activeModalCase.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="mt-5 rounded-lg bg-[#14151B] border border-white/[0.08] p-4">
              <div className="text-[10px] font-mono text-[#626670] uppercase">
                Contractual Verification Outcome
              </div>
              <div className="text-base font-semibold text-[#F7F8F8] mt-1 font-mono">
                {activeModalCase.metrics}
              </div>
            </div>

            <div className="mt-5 space-y-4 text-xs text-[#8A8F98]">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-1">
                  Enterprise Context
                </div>
                <p className="leading-relaxed text-[#A1A6B3]">
                  {activeModalCase.description}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-1">
                  Transformation & Measured Impact
                </div>
                <p className="leading-relaxed bg-[#14151B] p-3.5 rounded-[6px] border border-white/[0.06] text-[#F7F8F8]">
                  {activeModalCase.impact}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-1.5">
                  Practices Deployed
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalCase.servicesUsed.map((svc, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#16171E] text-[#A1A6B3] px-2 py-0.5 rounded-[4px] border border-white/[0.08]">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setActiveModalCase(null)}
                className="text-xs text-[#8A8F98] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const svc = activeModalCase.servicesUsed[0] || 'Enterprise Transformation';
                  setActiveModalCase(null);
                  onSelectServiceForInquiry(svc);
                }}
                className="rounded-[6px] bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-[#E5E6E8]"
              >
                Inquire Similar Architecture
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
