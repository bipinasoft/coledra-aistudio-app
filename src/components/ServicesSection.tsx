import React, { useState } from 'react';
import { 
  Terminal,
  Cpu, 
  Layers, 
  TrendingUp, 
  Database, 
  Boxes, 
  Shield, 
  Activity, 
  Cloud,
  ArrowRight,
  X,
  Check,
  Search
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceForInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Enterprise Systems',
    'Software Engineering',
    'Cybersecurity',
    'Data & Analytics',
    'Cloud & Infrastructure',
    'Growth & Marketing'
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'agentic-ai':
        return <Terminal className="h-4 w-4 text-[#F7F8F8]" />;
      case 'ai-enabled-business':
        return <Cpu className="h-4 w-4 text-[#F7F8F8]" />;
      case 'app-development':
        return <Layers className="h-4 w-4 text-[#F7F8F8]" />;
      case 'digital-marketing':
        return <TrendingUp className="h-4 w-4 text-[#F7F8F8]" />;
      case 'oracle-cloud':
        return <Database className="h-4 w-4 text-[#F7F8F8]" />;
      case 'sap-services':
        return <Boxes className="h-4 w-4 text-[#F7F8F8]" />;
      case 'identity-management':
        return <Shield className="h-4 w-4 text-[#F7F8F8]" />;
      case 'data-driven-services':
        return <Activity className="h-4 w-4 text-[#F7F8F8]" />;
      case 'cloud-solutions':
        return <Cloud className="h-4 w-4 text-[#F7F8F8]" />;
      default:
        return <Terminal className="h-4 w-4 text-[#F7F8F8]" />;
    }
  };

  return (
    <section id="services" className="relative bg-[#08090C] py-24 lg:py-32 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Linear Restraint */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-3">
              Capabilities / Engineering Practices
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F7F8F8] [text-wrap:balance]">
              Enterprise Systems & Practice Matrices
            </h2>
            <p className="mt-3 text-base text-[#8A8F98] font-normal">
              Structured engineering practices staffed by certified pods delivering immutable architectures, production deployment gates, and verifiable SLAs.
            </p>
          </div>

          {/* Minimalist Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#626670]" />
            <input
              type="text"
              placeholder="Search practices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[6px] border border-white/[0.08] bg-[#101116] pl-8 pr-3 py-2 text-xs text-[#F7F8F8] placeholder-[#626670] focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Linear Segmented Category Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-1.5 p-1 rounded-lg border border-white/[0.08] bg-[#101116] overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-[5px] px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Practice Cards Grid: Razor-Sharp 1px Borders & Calm Spacing */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#101116] transition-all duration-200 hover:border-white/[0.18] hover:bg-[#13141A]"
              >
                <div>
                  {/* Visual Header with Razor-Sharp Border */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#08090C] border-b border-white/[0.08]">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#101116]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101116] via-[#101116]/30 to-transparent" />
                    
                    {/* Unboxed Metadata Pill Alternative */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-[4px] bg-[#08090C]/85 px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.08]">
                      <span>{service.category}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#08090C]/90 border border-white/[0.1]">
                      {getServiceIcon(service.id)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#F7F8F8]">
                      {service.title}
                    </h3>
                    
                    <p className="mt-2 text-xs text-[#8A8F98] leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mt-5 space-y-1.5 border-t border-white/[0.06] pt-3.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#626670]">
                        Key Deliverables
                      </div>
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#A1A6B3]">
                          <span className="text-white/40 font-mono text-[11px]">•</span>
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {service.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-[4px] bg-[#16171E] px-1.5 py-0.5 font-mono text-[10px] text-[#8A8F98] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between bg-[#0B0C10]">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#8A8F98] hover:text-[#F7F8F8] transition-colors"
                  >
                    <span>Specification</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="inline-flex items-center gap-1.5 rounded-[5px] border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-[#F7F8F8] hover:bg-white hover:text-black transition-all"
                  >
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-[#8A8F98] text-xs font-mono">
            No practices found matching "{searchQuery}".
          </div>
        )}

      </div>

      {/* Structured Specification Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-xl border border-white/[0.12] bg-[#101116] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#16171E] border border-white/[0.1]">
                  {getServiceIcon(activeModalService.id)}
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#8A8F98] uppercase">
                    {activeModalService.category}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#F7F8F8]">
                    {activeModalService.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                aria-label="Close"
                className="rounded-[6px] p-1.5 text-[#8A8F98] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeModalService.image && (
              <div className="mt-5 overflow-hidden rounded-lg border border-white/[0.08] max-h-56">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-1.5">
                  Architectural Scope
                </div>
                <p className="text-xs text-[#A1A6B3] leading-relaxed">
                  {activeModalService.fullDesc}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-2">
                  Complete Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.deliverables.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-[6px] bg-[#14151B] border border-white/[0.06] text-xs text-[#F7F8F8] flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-white/70 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#626670] mb-2">
                  Technology Frameworks
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalService.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-[4px] bg-[#16171E] px-2 py-0.5 font-mono text-[11px] text-[#A1A6B3] border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-[#626670]">
                Direct route: info.coledra@gmail.com
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-3 py-1.5 text-xs text-[#8A8F98] hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectServiceForInquiry(title);
                  }}
                  className="rounded-[6px] bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-[#E5E6E8]"
                >
                  Inquire Specification
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
