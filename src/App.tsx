/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { SocialFeedSection } from './components/SocialFeedSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { AdminModal } from './components/AdminModal';
import { initialSiteContent } from './data/initialContent';
import { SiteContent } from './types';

export default function App() {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const cached = localStorage.getItem('coledra_site_content');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn('Failed to read cached content:', e);
    }
    return initialSiteContent;
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>('Agentic AI Development');

  // Sync from backend if available
  useEffect(() => {
    fetch('/api/content')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API offline');
      })
      .then((serverData: Partial<SiteContent>) => {
        if (serverData && serverData.services && serverData.services.length > 0) {
          setContent((prev) => {
            const merged = { ...prev, ...serverData };
            localStorage.setItem('coledra_site_content', JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch((err) => {
        console.log('Using local initial content:', err.message);
      });
  }, []);

  const handleSaveContent = (updated: SiteContent) => {
    setContent(updated);
    try {
      localStorage.setItem('coledra_site_content', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F7F8F8] flex flex-col selection:bg-white selection:text-black font-sans antialiased">
      {/* Navigation Bar conforming to Top Bar Contract */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
        onSelectService={handleSelectServiceForInquiry}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Marquee Hero with High-Resolution Visual Backdrop & Proof Strip */}
        <Hero
          content={content.hero}
          onExploreServices={() => handleNavigate('services')}
          onRequestConsultation={() => handleNavigate('contact')}
        />

        {/* 9 Core Practices & Detailed Inquiry Triggers */}
        <ServicesSection
          services={content.services}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Corporate Profile, Leadership & Dual-Headquarters */}
        <AboutSection
          contactInfo={content.contactInfo}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* Quantified Enterprise Portfolio & Case Studies */}
        <PortfolioSection
          caseStudies={content.caseStudies}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Executive Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* SEO-Optimized Thought Leadership & Research Articles */}
        <BlogSection posts={content.blogPosts} />

        {/* Live Social Ecosystem & Announcements Feed */}
        <SocialFeedSection />

        {/* Enterprise Contact Form - Pushes directly to info.coledra@gmail.com */}
        <ContactSection
          contactInfo={content.contactInfo}
          services={content.services}
          preselectedService={preselectedService}
        />
      </main>

      {/* Corporate Multi-Column Footer */}
      <Footer
        contactInfo={content.contactInfo}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Interactive AI Consultant Chatbot */}
      <Chatbot />

      {/* Secure CMS & Inbound Lead Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        content={content}
        onSaveContent={handleSaveContent}
      />
    </div>
  );
}
