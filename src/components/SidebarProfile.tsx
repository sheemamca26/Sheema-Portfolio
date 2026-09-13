import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, FileDown, Sparkles, CheckCircle2, Share2, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface SidebarProfileProps {
  onContactClick: () => void;
  onOpenCV?: () => void;
}

export const SidebarProfile: React.FC<SidebarProfileProps> = ({ onContactClick, onOpenCV }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareWebsite = () => {
    const shareUrl = window.location.origin;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2500);
      });
    }
  };
  return (
    <section id="profile-hero" className="w-full pt-4 pb-2">
      <div className="rounded-3xl bg-[#14131d]/90 border border-white/[0.08] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/40 relative overflow-hidden transition-all duration-300 hover:border-white/[0.15]">
        
        {/* Interior ambient neon glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#ff007a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8a2be2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 relative z-10">
          
          {/* Profile Image with Rounded Frame and Glowing Hover */}
          <div className="relative w-52 h-56 sm:w-60 sm:h-64 lg:w-72 lg:h-80 rounded-2xl overflow-hidden bg-[#1f1d2b] border border-white/10 group shadow-2xl shrink-0">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14131d]/80 via-transparent to-transparent opacity-60" />
            
            {/* Availability Badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-[#0c0b10]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-400 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for opportunities</span>
            </div>
          </div>

          {/* Profile Details & Overview */}
          <div className="flex-1 flex flex-col justify-between text-center md:text-left space-y-4">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff007a]/15 text-[#ff007a] border border-[#ff007a]/30 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>MCA Postgraduate</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Immediate Joiner</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 text-xs font-mono">
                  <span>Graduated: 2024</span>
                </span>
              </div>

              {/* Candidate Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 font-sans">
                {personalInfo.name}
              </h1>

              {/* Role Title */}
              <p className="text-[#ff007a] text-sm sm:text-base font-semibold tracking-wider font-mono mb-3 uppercase">
                {personalInfo.role}
              </p>

              {/* Bio summary */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mb-4">
                {personalInfo.shortBio}
              </p>

              {/* Location */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-gray-400 font-mono mb-6">
                <MapPin className="w-4 h-4 text-[#ff007a] shrink-0" />
                <span>{personalInfo.location}</span>
                <span className="text-gray-600">•</span>
                <a href={`mailto:${personalInfo.email}`} className="text-gray-300 hover:text-white underline">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center justify-center md:justify-start gap-3">
              {/* Contact Me Button */}
              <button
                onClick={onContactClick}
                id="profile-btn-contact-me"
                className="py-2.5 px-6 rounded-xl bg-[#ff007a] hover:bg-[#e0006c] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#ff007a]/25 hover:shadow-[#ff007a]/40 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>

              {/* Download CV Button */}
              {onOpenCV && (
                <button
                  onClick={onOpenCV}
                  id="profile-btn-view-cv"
                  className="py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#ff007a]" />
                  <span>Download CV (PDF)</span>
                </button>
              )}

              {/* LinkedIn Link */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="profile-link-linkedin"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1c1a29] hover:bg-[#272538] border border-white/10 hover:border-[#0a66c2]/80 text-gray-300 hover:text-white transition-all duration-200 cursor-pointer text-xs font-mono"
              >
                <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub Link */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                id="profile-link-github"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1c1a29] hover:bg-[#272538] border border-white/10 hover:border-white/50 text-gray-300 hover:text-white transition-all duration-200 cursor-pointer text-xs font-mono"
              >
                <Github className="w-4 h-4 text-white" />
                <span>GitHub</span>
              </a>

              {/* Share Portfolio Link button */}
              <button
                onClick={handleShareWebsite}
                id="profile-btn-share-portfolio"
                title="Copy website link to share with recruiters"
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer text-xs font-mono ${
                  linkCopied
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                    : 'bg-[#1c1a29] hover:bg-[#272538] border-white/10 hover:border-[#ff007a]/40 text-gray-300 hover:text-white'
                }`}
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#ff007a]" />
                    <span>Share Link</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
