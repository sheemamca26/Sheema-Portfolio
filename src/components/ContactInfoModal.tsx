import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Linkedin, Github, Copy, Check, ExternalLink, MessageSquare, MessageCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMessageForm?: () => void;
}

export const ContactInfoModal: React.FC<ContactInfoModalProps> = ({
  isOpen,
  onClose,
  onOpenMessageForm,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const handleGoToForm = () => {
    onClose();
    if (onOpenMessageForm) {
      onOpenMessageForm();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#12111b] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#171524]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff007a]/15 border border-[#ff007a]/30 flex items-center justify-center text-[#ff007a]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Contact Information
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Direct details to reach {personalInfo.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-contact-modal"
            aria-label="Close Contact Modal"
            className="p-2 rounded-xl bg-[#222033] hover:bg-[#2e2a44] text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Contact Details */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Email Card */}
          <div className="p-4 rounded-2xl bg-[#181625] border border-white/10 hover:border-[#ff007a]/40 transition-colors group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ff007a]/10 border border-[#ff007a]/25 flex items-center justify-center text-[#ff007a] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white group-hover:text-[#ff007a] font-medium text-sm sm:text-base break-all transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(personalInfo.email, 'email')}
                aria-label="Copy Email Address"
                className="p-2 rounded-lg bg-[#221f33] hover:bg-[#2e2945] text-gray-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer"
                title="Copy Email"
              >
                {copiedType === 'email' ? (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Phone Numbers Card */}
          <div className="p-4 rounded-2xl bg-[#181625] border border-white/10 hover:border-emerald-500/40 transition-colors group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    Phone Numbers
                  </span>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <a
                      href={`tel:${personalInfo.primaryPhone}`}
                      className="text-white hover:text-emerald-400 font-mono font-semibold text-sm sm:text-base transition-colors"
                    >
                      {personalInfo.primaryPhone}
                    </a>
                    <span className="text-gray-500 font-mono text-xs">or</span>
                    <a
                      href={`tel:${personalInfo.secondaryPhone}`}
                      className="text-white hover:text-emerald-400 font-mono font-semibold text-sm sm:text-base transition-colors"
                    >
                      {personalInfo.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('9391621778 / 7013431104', 'phone')}
                aria-label="Copy Phone Numbers"
                className="p-2 rounded-lg bg-[#221f33] hover:bg-[#2e2945] text-gray-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer"
                title="Copy Phone Numbers"
              >
                {copiedType === 'phone' ? (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {/* Direct Call & WhatsApp Action Badges */}
            <div className="space-y-2 mt-3 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${personalInfo.primaryPhone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#221f33] hover:bg-[#2b2742] text-xs font-mono text-emerald-400 border border-emerald-500/20 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call 9391621778</span>
                </a>
                <a
                  href={`tel:${personalInfo.secondaryPhone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#221f33] hover:bg-[#2b2742] text-xs font-mono text-emerald-400 border border-emerald-500/20 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call 7013431104</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/91${personalInfo.primaryPhone}?text=${encodeURIComponent("Hi Sheema, I saw your portfolio and would like to discuss an opportunity.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-xs font-mono text-[#25D366] border border-[#25D366]/30 transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp 9391621778</span>
                </a>
                <a
                  href={`https://wa.me/91${personalInfo.secondaryPhone}?text=${encodeURIComponent("Hi Sheema, I saw your portfolio and would like to discuss an opportunity.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  <span>WhatsApp 7013431104</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-4 rounded-2xl bg-[#181625] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                  Location
                </span>
                <span className="text-white font-semibold text-sm sm:text-base">
                  {personalInfo.location}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Open to Relocation
            </span>
          </div>

          {/* LinkedIn Profile Card */}
          <div className="p-4 rounded-2xl bg-[#181625] border border-white/10 hover:border-[#0a66c2]/50 transition-colors group">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#0a66c2]/15 border border-[#0a66c2]/30 flex items-center justify-center text-[#0a66c2] shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    LinkedIn Profile
                  </span>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white group-hover:text-[#0a66c2] font-mono text-xs sm:text-sm truncate block transition-colors"
                  >
                    linkedin.com/in/sheema-2601mca
                  </a>
                </div>
              </div>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#084e96] text-white text-xs font-mono font-medium transition-colors shrink-0 cursor-pointer shadow-md shadow-[#0a66c2]/20"
              >
                <span>Visit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GitHub Profile Card */}
          <div className="p-4 rounded-2xl bg-[#181625] border border-white/10 hover:border-white/40 transition-colors group">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    GitHub Profile
                  </span>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 font-mono text-xs sm:text-sm truncate block transition-colors"
                  >
                    github.com/sheemamca26
                  </a>
                </div>
              </div>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252238] hover:bg-[#322e4d] text-white text-xs font-mono font-medium border border-white/10 transition-colors shrink-0 cursor-pointer"
              >
                <span>Visit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-white/10 bg-[#151322] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleGoToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#ff007a] hover:bg-[#e0006c] text-white text-xs font-mono font-semibold transition-colors cursor-pointer shadow-md shadow-[#ff007a]/25"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Message via Form</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#222033] hover:bg-[#2d2943] text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer text-center"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
