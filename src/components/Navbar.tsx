import React, { useState } from 'react';
import { Menu, X, FileDown, ExternalLink, Share2, Check } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenCV }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    const shareUrl = window.location.origin;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2500);
      });
    }
  };

  const navItems = [
    { id: 'profile-hero', label: 'Profile' },
    { id: 'introduce', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'beyond-work', label: 'Beyond Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c0b10]/85 border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo matching {Cōde} */}
        <a 
          href="#profile-hero"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick('profile-hero');
          }}
          className="group flex items-center text-xl sm:text-2xl font-mono font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          id="logo-brand"
        >
          <span className="text-[#ff007a] transition-transform group-hover:-translate-x-0.5">{'{'}</span>
          <span className="px-0.5 tracking-wider">Cōde</span>
          <span className="text-[#ff007a] transition-transform group-hover:translate-x-0.5">{'}'}</span>
        </a>

        {/* Center Floating Pill Navigation (Desktop) */}
        <nav className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-[#161520]/80 border border-white/[0.08] shadow-inner shadow-black/40">
          <ul className="flex items-center space-x-1 sm:space-x-2 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    id={`nav-link-${item.id}`}
                    className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#ff007a] font-semibold bg-white/[0.05]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions: Share Link + Download CV button */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <button
            onClick={handleCopyLink}
            id="btn-copy-link-nav"
            title="Copy portfolio website link"
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 cursor-pointer ${
              linkCopied
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/10'
            }`}
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#ff007a]" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCV}
            id="btn-download-cv-nav"
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-white border border-[#ff007a]/60 hover:border-[#ff007a] bg-[#ff007a]/10 hover:bg-[#ff007a]/20 transition-all duration-200 shadow-sm shadow-[#ff007a]/20 hover:shadow-[#ff007a]/40 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-[#ff007a] group-hover:translate-y-0.5 transition-transform" />
            <span>Download CV (PDF)</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center space-x-1.5">
          <button
            onClick={handleCopyLink}
            id="btn-copy-link-mobile-top"
            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
              linkCopied
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'border-white/10 text-gray-300 bg-white/5'
            }`}
            title="Copy portfolio website link"
          >
            {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#ff007a]" />}
            <span>{linkCopied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onOpenCV}
            id="btn-download-cv-mobile-top"
            className="p-2 rounded-lg border border-[#ff007a]/50 text-[#ff007a] bg-[#ff007a]/10 hover:bg-[#ff007a]/20 text-xs font-semibold flex items-center gap-1"
            title="Download CV"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-lg bg-[#1a1825] border border-white/10 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#12111a] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  id={`mobile-nav-${item.id}`}
                  className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#ff007a]/20 text-[#ff007a] font-semibold border border-[#ff007a]/30'
                      : 'bg-[#1a1825] text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                handleCopyLink();
              }}
              id="btn-mobile-share-link"
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm border transition-colors ${
                linkCopied
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-white/5 text-gray-200 hover:bg-white/10 border-white/10'
              }`}
            >
              {linkCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#ff007a]" />}
              <span>{linkCopied ? 'Portfolio Link Copied!' : 'Copy Portfolio Link for Recruiters'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              id="btn-mobile-download-cv"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#ff007a] text-white font-medium text-sm hover:bg-[#e0006c] transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Full CV (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
