import React from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#12111a] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#161522] shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-mono text-white font-semibold">
              Course Completion Certificate
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              id="btn-close-cert-modal"
              aria-label="Close Certificate Modal"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas Frame */}
        <div className="p-3 sm:p-6 md:p-8 bg-[#09080e] overflow-auto flex justify-center items-center flex-1">
          
          {/* Certificate Visual Card reproducing user's exact NareshIT certificate */}
          <div
            id="certificate-view-canvas"
            className="w-full max-w-2xl bg-[#fffefb] text-[#1c1a27] rounded-lg shadow-2xl border-4 border-[#c29b38] relative p-5 sm:p-8 md:p-10 select-none font-serif"
            style={{
              backgroundImage: `radial-gradient(#d4af37 0.5px, transparent 0.5px)`,
              backgroundSize: '24px 24px',
            }}
          >
            {/* Watermark Pattern repeating NiT */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex flex-wrap gap-8 p-6 overflow-hidden select-none items-center justify-center font-sans font-black text-2xl tracking-widest text-[#0d47a1]">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="rotate-[-25deg]">
                  NiT
                </span>
              ))}
            </div>

            {/* Corner Decorative Ribbon Accents (Gold Geometric) */}
            <div className="absolute top-0 left-0 w-14 sm:w-16 h-14 sm:h-16 pointer-events-none">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <polygon points="0,0 64,0 0,64" fill="#a17a22" opacity="0.9" />
                <polygon points="0,0 48,0 0,48" fill="#d4af37" />
                <polygon points="0,0 32,0 0,32" fill="#f3e5ab" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-14 sm:w-16 h-14 sm:h-16 pointer-events-none rotate-90">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <polygon points="0,0 64,0 0,64" fill="#a17a22" opacity="0.9" />
                <polygon points="0,0 48,0 0,48" fill="#d4af37" />
                <polygon points="0,0 32,0 0,32" fill="#f3e5ab" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-14 sm:w-16 h-14 sm:h-16 pointer-events-none -rotate-90">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <polygon points="0,0 64,0 0,64" fill="#a17a22" opacity="0.9" />
                <polygon points="0,0 48,0 0,48" fill="#d4af37" />
                <polygon points="0,0 32,0 0,32" fill="#f3e5ab" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-14 sm:w-16 h-14 sm:h-16 pointer-events-none rotate-180">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <polygon points="0,0 64,0 0,64" fill="#a17a22" opacity="0.9" />
                <polygon points="0,0 48,0 0,48" fill="#d4af37" />
                <polygon points="0,0 32,0 0,32" fill="#f3e5ab" />
              </svg>
            </div>

            {/* Certificate Header / Logo */}
            <div className="text-center pt-2 sm:pt-3 mb-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 font-sans font-black text-2xl sm:text-3xl tracking-wide">
                <span className="px-1.5 py-0.5 rounded bg-[#0d47a1] text-white text-xs font-mono font-bold">
                  NT
                </span>
                <span className="text-[#d32f2f] tracking-tight font-extrabold">NARESH</span>
                <span className="text-[#0d47a1] italic font-serif text-3xl sm:text-4xl -ml-0.5">i</span>
                <span className="text-[10px] align-super text-gray-500 font-sans">®</span>
              </div>
              <p className="font-sans font-bold text-xs sm:text-sm tracking-wider text-[#1a237e] uppercase mt-0.5">
                technologies
              </p>
              <p className="font-sans text-[11px] text-gray-700 font-medium">
                Software Training & Development
              </p>
              <p className="font-sans text-[10px] text-gray-500 italic">
                An ISO 9001:2015 Certified Company
              </p>
            </div>

            {/* Certificate Main Title */}
            <div className="text-center my-3 sm:my-4 relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-[#a2741d] font-serif">
                COURSE COMPLETION CERTIFICATE
              </h2>
              <div className="w-36 h-0.5 bg-[#a2741d]/40 mx-auto mt-1.5" />
            </div>

            {/* Certification Body */}
            <div className="text-center space-y-3 sm:space-y-4 my-4 relative z-10 text-gray-800 text-xs sm:text-sm leading-relaxed px-2 sm:px-6">
              <p className="font-serif italic text-gray-700 text-sm sm:text-base">
                This is to certify that
              </p>

              {/* Student Name */}
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-serif text-xs sm:text-sm text-gray-600">Mr. / Miss.</span>
                <span className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 border-b-2 border-gray-400 px-6 pb-0.5 min-w-[200px] tracking-wide">
                  Sheema
                </span>
              </div>

              {/* Course Title */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 pt-1">
                <span className="font-serif text-xs sm:text-sm text-gray-600">Completed A Course On</span>
                <span className="font-serif font-bold text-base sm:text-lg md:text-xl text-[#0d47a1] border-b-2 border-gray-400 px-4 pb-0.5 min-w-[240px]">
                  Full Stack Java Developer
                </span>
              </div>

              {/* Period */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm">
                <span className="font-serif text-gray-600">Successfully From</span>
                <span className="font-serif font-semibold text-gray-900 border-b border-gray-400 px-3 pb-0.5">
                  May 2025
                </span>
                <span className="font-serif text-gray-600">to</span>
                <span className="font-serif font-semibold text-gray-900 border-b border-gray-400 px-3 pb-0.5">
                  October-2025
                </span>
              </div>
            </div>

            {/* Bottom Signature & Stamp */}
            <div className="flex items-end justify-between px-2 sm:px-6 mt-6 mb-2 relative z-10">
              <div className="text-left font-sans text-[10px] sm:text-[11px] text-gray-500">
                <span className="block text-gray-400 font-mono">ISO 9001:2015</span>
                <span className="font-medium text-gray-700">Official Certification</span>
              </div>

              {/* Seal Stamp Graphic */}
              <div className="flex flex-col items-center">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-[#0d47a1]/70 p-1 flex items-center justify-center text-center -rotate-12 select-none">
                  <div className="w-full h-full rounded-full border border-[#0d47a1]/50 flex flex-col items-center justify-center text-[8px] font-sans text-[#0d47a1] font-bold leading-tight">
                    <span>★ NARESH i ★</span>
                    <span className="text-[7px]">TECHNOLOGIES</span>
                    <span className="text-[6px] text-gray-500 font-normal">Ameerpet, Hyd</span>
                  </div>
                </div>
                <div className="mt-1 text-center font-serif text-xs font-semibold text-gray-800 border-t border-gray-400 pt-0.5 px-4">
                  Center Head
                </div>
              </div>
            </div>

            {/* Red Footer Bar Matching Original Document */}
            <div className="mt-4 -mx-5 sm:-mx-8 md:-mx-10 -mb-5 sm:-mb-8 md:-mb-10 bg-[#d32f2f] text-white p-2.5 sm:p-3 text-center font-sans text-[10px] sm:text-[11px] leading-tight space-y-0.5">
              <p className="font-medium">
                Address: H.O.: D.No. 201-204, Durga Bhavani Plaza, Ameerpet, Hyd - 16.
              </p>
              <p className="text-red-100 text-[9px] sm:text-[10px]">
                Ph: 040-2374 6666, +91 81791 91999 • Mail: info@nareshit.com • Web: www.nareshit.com
              </p>
            </div>

          </div>
        </div>

        {/* Modal Footer Notes */}
        <div className="p-3 sm:p-4 bg-[#141320] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-gray-400 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">
              Curriculum: Java, Spring Boot, OOP, MySQL, REST APIs, Web Engineering
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
