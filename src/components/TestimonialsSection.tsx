import React from 'react';
import { TESTIMONIALS } from '../data/initialContent';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative bg-[#08090C] py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
            Social Proof / Executive Attestations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F7F8F8] [text-wrap:balance]">
            Trusted Across Critical Infrastructure
          </h2>
          <p className="mt-3 text-base text-[#8A8F98] font-normal">
            Statements from enterprise CIOs, CISOs, and technology leaders operating with Coledra-engineered architectures.
          </p>
        </div>

        {/* Linear Structured Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#101116] p-6 transition-all duration-150 hover:border-white/[0.16]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8A8F98] font-mono pb-4 border-b border-white/[0.06] mb-4">
                  <span className="tabular-nums text-[#F7F8F8] bg-[#14151B] px-2 py-0.5 rounded-[4px] border border-white/[0.06]">{t.metric}</span>
                  <span className="text-[#626670]">Verified</span>
                </div>

                <p className="text-xs text-[#A1A6B3] leading-relaxed font-normal">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Attribution */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#16171E] border border-white/[0.08] font-mono text-xs font-semibold text-[#F7F8F8]">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#F7F8F8]">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-[#8A8F98]">
                    {t.title} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
