import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SOCIAL_UPDATES } from '../data/initialContent';

export const SocialFeedSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="relative bg-[#08090C] py-20 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-2">
              Changelog & Dispatches
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#F7F8F8]">
              Public Engineering Updates
            </h2>
          </div>
          <div className="text-xs font-mono text-[#8A8F98] flex items-center gap-3">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/20">/</span>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              X (Twitter)
            </a>
            <span className="text-white/20">/</span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* 3-Column Linear Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SOCIAL_UPDATES.map((post, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#101116] p-5 transition-all duration-150 hover:border-white/[0.16]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8F98] pb-3 border-b border-white/[0.06] mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#F7F8F8] font-medium">{post.platform}</span>
                    <span className="text-[#626670]">{post.handle}</span>
                  </div>
                  <span>{post.date}</span>
                </div>

                <p className="text-xs text-[#A1A6B3] leading-relaxed font-normal">
                  {post.content}
                </p>

                <div className="mt-4">
                  <span className="inline-block rounded-[4px] bg-[#16171E] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06]">
                    #{post.tag.replace(/\s+/g, '')}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#626670] font-mono">
                <span>Verified Release</span>

                <button
                  onClick={() => handleCopy(post.content, idx)}
                  className="inline-flex items-center gap-1 text-[#8A8F98] hover:text-white transition-colors"
                  title="Copy update"
                >
                  {copiedIndex === idx ? (
                    <span className="text-white flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      <span>Copied</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
