import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Database, 
  Check 
} from 'lucide-react';
import { HeroContent } from '../types';
import { HERO_IMAGE, SYSTEMS_TOPOLOGY_IMAGE } from '../data/initialContent';

interface HeroProps {
  content: HeroContent;
  onExploreServices: () => void;
  onRequestConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  content,
  onExploreServices,
  onRequestConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'agents' | 'compliance'>('topology');

  return (
    <section id="hero" className="relative bg-[#08090C] pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-white/[0.08]">
      
      {/* Linear-style subtle grid overlay */}
      <div className="absolute inset-0 linear-grid opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8A8F98] mb-5">
          <span className="text-[#F7F8F8] font-medium">Coledra Solutions</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>Enterprise Systems & Architecture</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>Dual Technology Centers</span>
        </div>

        {/* Display Headline & Value Proposition */}
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-[-0.035em] text-[#F7F8F8] [text-wrap:balance] leading-[1.08]">
            {content.headline}{' '}
            <span className="text-white">
              {content.highlightText}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#8A8F98] max-w-2xl font-normal leading-relaxed">
            {content.subheadline}
          </p>

          {/* Linear Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestConsultation}
              className="inline-flex items-center gap-2 rounded-[6px] bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-[#E5E6E8] active:scale-[0.98] shadow-sm"
            >
              <span>{content.ctaPrimary}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 rounded-[6px] border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-xs font-medium text-[#F7F8F8] transition-all hover:bg-white/[0.08] hover:border-white/20"
            >
              <span>{content.ctaSecondary}</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#8A8F98]" />
            </button>
          </div>

          {/* Linear Minimalist Verification Flags */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8A8F98]">
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-white/70" />
              <span>ISO 27001 & ISO 9001 Certified SDLC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-white/70" />
              <span>Zero-Trust Least-Privilege IAM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-white/70" />
              <span>Certified Oracle OCI & SAP S/4HANA</span>
            </div>
          </div>
        </div>

        {/* Structured Linear Architectural Console Card */}
        <div className="mt-16 rounded-xl border border-white/[0.08] bg-[#101116] overflow-hidden shadow-2xl">
          
          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 bg-[#0B0C10]">
            <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
              <span className="font-mono text-[#F7F8F8]">COLEDRA-SPEC-2026.04</span>
              <span className="text-white/20">|</span>
              <span>Enterprise Systems Infrastructure & Multi-Agent Swarms</span>
            </div>

            {/* Segmented Mode Selector */}
            <div className="flex items-center gap-1 rounded-[6px] border border-white/[0.08] bg-[#14151B] p-0.5 text-xs">
              <button
                onClick={() => setActiveTab('topology')}
                className={`rounded-[4px] px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeTab === 'topology' ? 'bg-white text-black font-semibold' : 'text-[#8A8F98] hover:text-white'
                }`}
              >
                Data Topology
              </button>
              <button
                onClick={() => setActiveTab('agents')}
                className={`rounded-[4px] px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeTab === 'agents' ? 'bg-white text-black font-semibold' : 'text-[#8A8F98] hover:text-white'
                }`}
              >
                Agentic Verification
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={`rounded-[4px] px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeTab === 'compliance' ? 'bg-white text-black font-semibold' : 'text-[#8A8F98] hover:text-white'
                }`}
              >
                Zero-Trust IAM
              </button>
            </div>
          </div>

          {/* Console Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Panel: High-contrast architectural & systems diagram */}
            <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-white/[0.08] relative bg-[#08090C]">
              {activeTab === 'topology' && (
                <div className="p-4 sm:p-6">
                  <div className="overflow-hidden rounded-lg border border-white/[0.08]">
                    <img
                      src={SYSTEMS_TOPOLOGY_IMAGE}
                      alt="Enterprise Systems Data Topology"
                      className="w-full h-80 sm:h-96 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#8A8F98] font-mono">
                    <span>Figure 1.0: Deterministic Ingestion & Cross-System Event Pipeline</span>
                    <span>Status: Verified</span>
                  </div>
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="p-4 sm:p-6">
                  <div className="overflow-hidden rounded-lg border border-white/[0.08]">
                    <img
                      src={HERO_IMAGE}
                      alt="Coledra Enterprise Operations Center"
                      className="w-full h-80 sm:h-96 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#8A8F98] font-mono">
                    <span>Figure 1.1: Multi-Agent Swarm Orchestration & Tool Execution Loop</span>
                    <span>Active Pods: 14</span>
                  </div>
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="p-4 sm:p-6">
                  <div className="overflow-hidden rounded-lg border border-white/[0.08]">
                    <img
                      src="/src/assets/images/service_identity_security_1794250163550.jpg"
                      alt="Zero-Trust IAM Governance"
                      className="w-full h-80 sm:h-96 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-[#8A8F98] font-mono">
                    <span>Figure 1.2: Adaptive Continuous Verification & Okta/CyberArk Integration</span>
                    <span>Posture: Enforced</span>
                  </div>
                </div>
              )}
            </div>

            {/* Spec Readout Column */}
            <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#101116] space-y-6">
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670]">
                  System Telemetry & Invariants
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-md bg-[#14151B] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#8A8F98]">Agent Swarm Ingestion</span>
                    <span className="text-[#F7F8F8] tabular-nums">Sub-240ms</span>
                  </div>

                  <div className="p-3 rounded-md bg-[#14151B] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#8A8F98]">Infrastructure SLA</span>
                    <span className="text-[#F7F8F8] tabular-nums">99.98%</span>
                  </div>

                  <div className="p-3 rounded-md bg-[#14151B] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#8A8F98]">IAM Security Posture</span>
                    <span className="text-[#F7F8F8]">Zero-Trust / ISO 27001</span>
                  </div>

                  <div className="p-3 rounded-md bg-[#14151B] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-[#8A8F98]">ERP Integration Layer</span>
                    <span className="text-[#F7F8F8]">SAP BTP & Oracle OCI</span>
                  </div>
                </div>

                <p className="text-xs text-[#8A8F98] leading-relaxed pt-1 font-sans">
                  Deterministic architectures with verified human-in-the-loop audit gates, eliminating non-deterministic errors in enterprise execution.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  onClick={onRequestConsultation}
                  className="w-full rounded-[6px] border border-white/[0.14] bg-white/[0.06] py-2 text-center text-xs font-medium text-[#F7F8F8] hover:bg-white hover:text-black transition-all"
                >
                  Request Architecture Document
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 4-Column Structured Cartesian Proof Grid (Razor-Sharp Hairline Dividers) */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-xl border border-white/[0.08] bg-[#101116] divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/[0.08] overflow-hidden">
          <div className="p-6">
            <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F7F8F8] tabular-nums font-mono">
              $3.8M+
            </div>
            <div className="mt-1 text-xs text-[#8A8F98]">
              Verified Enterprise OpEx Saved
            </div>
          </div>

          <div className="p-6">
            <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F7F8F8] tabular-nums font-mono">
              82%
            </div>
            <div className="mt-1 text-xs text-[#8A8F98]">
              Autonomous Resolution Rate
            </div>
          </div>

          <div className="p-6">
            <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F7F8F8] tabular-nums font-mono">
              99.98%
            </div>
            <div className="mt-1 text-xs text-[#8A8F98]">
              Contractual Cloud SLA
            </div>
          </div>

          <div className="p-6">
            <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F7F8F8] tabular-nums font-mono">
              300+
            </div>
            <div className="mt-1 text-xs text-[#8A8F98]">
              Enterprise Systems Deployed
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
