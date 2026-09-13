import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SidebarProfile } from './components/SidebarProfile';
import { IntroduceSection } from './components/IntroduceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BeyondWorkSection } from './components/BeyondWorkSection';
import { ContactSection } from './components/ContactSection';
import { CVModal } from './components/CVModal';
import { ProjectModal } from './components/ProjectModal';
import { ContactInfoModal } from './components/ContactInfoModal';
import { CertificateModal } from './components/CertificateModal';
import { Project } from './types';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('introduce');
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const contactInputRef = useRef<HTMLInputElement | null>(null);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['profile-hero', 'introduce', 'skills', 'projects', 'beyond-work', 'contact'];
    
    const observers: IntersectionObserver[] = [];

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll for back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleOpenMessageForm = () => {
    scrollToSection('contact');
    setTimeout(() => {
      contactInputRef.current?.focus();
    }, 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0b10] text-[#e2e2ea] relative selection:bg-[#ff007a] selection:text-white font-sans">
      
      {/* Ambient background glows matching the reference mockup */}
      <div className="fixed top-0 left-0 w-[550px] h-[550px] bg-[#ff007a]/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-0 w-[450px] h-[450px] bg-[#8a2be2]/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-[500px] h-[500px] bg-[#ff007a]/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sticky Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenCV={() => setIsCVModalOpen(true)}
      />

      {/* Main Container with Systematic Full-Width Section Flow */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
        
        {/* 1. First Page: Profile Showcase ("first page the pic etc") */}
        <SidebarProfile
          onContactClick={handleContactClick}
          onOpenCV={() => setIsCVModalOpen(true)}
        />

        {/* 2. Second Page: Introduce / About Section */}
        <div className="pt-2 border-t border-white/[0.08]">
          <IntroduceSection
            onScrollToProjects={() => scrollToSection('projects')}
            onScrollToContact={handleContactClick}
          />
        </div>

        {/* 3. Skills Section (Full Width, Normal) */}
        <SkillsSection />

        {/* 4. Projects Section (Full Width, Normal) */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5. Beyond Work Section (Full Width, Normal) */}
        <BeyondWorkSection
          onOpenCertificate={() => setIsCertModalOpen(true)}
        />

        {/* 6. Contact Form Section (Full Width, Normal) */}
        <ContactSection inputRef={contactInputRef} />

        {/* Bottom Mini Footer */}
        <footer className="pt-12 pb-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-tight">
              <span className="text-[#ff007a]">{'{'}</span>Cōde<span className="text-[#ff007a]">{'}'}</span>
            </span>
            <span>• SHEEMA Portfolio</span>
          </div>
          <p>© 2024 SHEEMA. Designed with clean minimalist aesthetics.</p>
        </footer>

      </main>

      {/* Back to Top Floating Action Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          id="btn-back-to-top"
          aria-label="Back to top of page"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[#1b1928] border border-white/15 text-gray-300 hover:text-white hover:border-[#ff007a] shadow-xl hover:shadow-[#ff007a]/20 transition-all duration-200 z-30 cursor-pointer animate-fadeIn"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* CV Download / Print Preview Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        onOpenCertificate={() => setIsCertModalOpen(true)}
      />

      {/* Official Certificate Viewer Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Direct Contact Information Modal */}
      <ContactInfoModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onOpenMessageForm={handleOpenMessageForm}
      />

    </div>
  );
}
