import React, { useState } from 'react';
import { ArrowRight, X, Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="relative bg-[#08090C] py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
            Research / Technical Perspectives
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F7F8F8] [text-wrap:balance]">
            Engineering Blueprints & Research
          </h2>
          <p className="mt-3 text-base text-[#8A8F98] font-normal">
            Technical writing from Coledra architects on multi-agent execution loops, cloud ERP migrations, and Zero-Trust identity engineering.
          </p>
        </div>

        {/* Blog Post Cards Grid: Linear Razor-Sharp Aesthetic */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#101116] transition-all duration-200 hover:border-white/[0.18] hover:bg-[#13141A]"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-44 w-full overflow-hidden bg-[#08090C] border-b border-white/[0.08]">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#101116]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101116] via-[#101116]/30 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 rounded-[4px] bg-[#08090C]/85 px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.08]">
                    {post.category}
                  </div>

                  <div className="absolute bottom-3 right-3 rounded-[4px] bg-[#08090C]/90 px-2 py-0.5 text-[10px] font-mono text-[#626670] border border-white/[0.06]">
                    {post.readTime}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#626670] mb-2">
                    <span>{post.date}</span>
                    <span>/</span>
                    <span className="truncate">{post.author}</span>
                  </div>

                  <h3 className="font-display text-base font-semibold text-[#F7F8F8] leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#8A8F98] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between bg-[#0B0C10]">
                <span className="text-[11px] font-mono text-[#626670]">
                  Engineering R&D
                </span>

                <button
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors"
                >
                  <span>Read Blueprint</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-xl border border-white/[0.12] bg-[#101116] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A8F98] uppercase">
                  <span>{activePost.category}</span>
                  <span>/</span>
                  <span>{activePost.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#F7F8F8] mt-1 leading-snug">
                  {activePost.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#626670] font-mono">
                  <span>{activePost.author}</span>
                  <span>·</span>
                  <span>{activePost.date}</span>
                </div>
              </div>

              <button
                onClick={() => setActivePost(null)}
                aria-label="Close"
                className="rounded-[6px] p-1.5 text-[#8A8F98] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activePost.image && (
              <div className="mt-5 overflow-hidden rounded-lg border border-white/[0.08] max-h-56">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="mt-6 border-t border-white/[0.06] pt-5 text-xs text-[#A1A6B3] leading-relaxed space-y-4">
              <p className="font-medium text-[#F7F8F8] bg-[#14151B] p-3.5 rounded-[6px] border border-white/[0.06]">
                {activePost.excerpt}
              </p>
              
              <div className="leading-relaxed space-y-3 whitespace-pre-line text-xs">
                {activePost.content}
              </div>

              <div className="rounded-[6px] border border-white/[0.08] bg-[#14151B] p-4 mt-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#626670]">
                  Architectural Principle
                </div>
                <p className="text-xs text-[#8A8F98] mt-1">
                  Enterprise digital resilience requires modular, self-governing systems. Whether designing multi-agent loops or refactoring legacy ERP estates, deterministic guardrails and automated telemetry must precede scale.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-[#626670]">
                Coledra Solutions Technical Editorial
              </span>
              <button
                onClick={() => setActivePost(null)}
                className="rounded-[6px] border border-white/[0.1] bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-[#F7F8F8] hover:bg-white hover:text-black transition-all"
              >
                Close Blueprint
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
