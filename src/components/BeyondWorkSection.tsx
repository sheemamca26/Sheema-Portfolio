import React, { useState } from 'react';
import { Sparkles, Award, BookOpen, ExternalLink, FileCheck, GraduationCap, Calendar, Eye, CheckCircle2 } from 'lucide-react';
import { beyondWorkData, educationList } from '../data/portfolioData';
import { CertificateModal } from './CertificateModal';
import { BeyondWorkItem } from '../types';

interface BeyondWorkSectionProps {
  onOpenCertificate?: () => void;
}

export const BeyondWorkSection: React.FC<BeyondWorkSectionProps> = ({ onOpenCertificate }) => {
  const [isInternalCertModalOpen, setIsInternalCertModalOpen] = useState(false);

  const handleOpenCert = () => {
    if (onOpenCertificate) {
      onOpenCertificate();
    } else {
      setIsInternalCertModalOpen(true);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#ff007a]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#ff007a]" />;
    }
  };

  return (
    <section id="beyond-work" className="py-8 sm:py-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1928] border border-white/10 text-xs font-mono text-gray-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff007a]" />
            Continuous Learning & Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007a] to-[#a855f7]">Work</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 font-mono max-w-sm">
          Technical certifications, academic milestones, and engineering growth beyond classroom projects.
        </p>
      </div>

      {/* 3-Card Grid for Beyond Work Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {beyondWorkData.map((item: BeyondWorkItem) => {
          const isCert = item.id === 'cert-fullstack-java';

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isCert) handleOpenCert();
              }}
              className={`group rounded-2xl sm:rounded-3xl bg-[#14131e] border border-white/[0.08] ${
                isCert
                  ? 'hover:border-amber-500/50 cursor-pointer shadow-amber-500/5 ring-1 ring-amber-500/10'
                  : 'hover:border-[#ff007a]/40'
              } overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/30 flex flex-col`}
            >
              {/* Image Frame */}
              <div className="h-48 overflow-hidden relative bg-[#1b1928]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14131e] via-transparent to-transparent opacity-80" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 bg-[#0c0b10]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 text-xs font-mono text-gray-200">
                  {getIcon(item.iconName)}
                  <span>{item.category}</span>
                </div>

                {/* Certificate Specific Interactive Indicator */}
                {isCert && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCert();
                    }}
                    className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-400 text-black px-2.5 py-1 rounded-md text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/30 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>View Certificate</span>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ff007a] transition-colors">
                      {item.title}
                    </h3>
                    {isCert && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCert();
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-mono shrink-0 transition-colors cursor-pointer"
                        title="View Certificate"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Certificate extra details */}
                  {item.certificateDetails && (
                    <div className="mt-4 p-3 rounded-xl bg-[#191726] border border-amber-500/20 text-xs font-mono space-y-1 text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-amber-400 font-semibold">{item.certificateDetails.institute}</span>
                        <span className="text-emerald-400 text-[11px]">ISO 9001:2015</span>
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Course: <span className="text-white font-medium">{item.certificateDetails.courseName}</span>
                      </div>
                      <div className="text-[11px] text-gray-400">
                        Period: <span className="text-gray-200">{item.certificateDetails.period}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer of Card */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className={isCert ? 'text-amber-400 font-medium' : 'text-[#ff007a]'}>
                    {item.impact}
                  </span>

                  {isCert && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCert();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-mono font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic Education & Qualifications Section */}
      <div className="mt-16 pt-12 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff007a]/10 border border-[#ff007a]/30 flex items-center justify-center text-[#ff007a]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Education & Academic Qualifications
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono">
                Verified educational milestones • Postgraduation in Computer Applications
              </p>
            </div>
          </div>
        </div>

        {/* 2x2 Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#14131e] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {edu.degree}
                  </h4>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold shrink-0">
                    {edu.score}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#ff007a] font-medium mb-3">
                  {edu.institution}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {edu.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  Graduated: {edu.year}
                </span>
                <span className="text-emerald-400 font-medium">Completed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Certification Banner with Icon beside certificate */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/[0.09] to-[#14131e] border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold text-white">
                  Full Stack Java Developer Course – NareshIT
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-bold">
                  Verified
                </span>
              </div>
              <p className="text-xs text-gray-300 font-mono mt-0.5">
                Software Training & Development • Java, Spring Boot, OOP, MySQL, REST APIs
              </p>
            </div>
          </div>

          {/* Interactive Icon Beside Certificate */}
          <button
            type="button"
            onClick={handleOpenCert}
            id="btn-view-cert-edu-banner"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
            title="Click to view the Course Completion Certificate"
          >
            <Eye className="w-4 h-4 stroke-[2.5]" />
            <span>View Certificate</span>
          </button>
        </div>
      </div>

      {/* Internal Certificate Modal fallback */}
      {!onOpenCertificate && (
        <CertificateModal
          isOpen={isInternalCertModalOpen}
          onClose={() => setIsInternalCertModalOpen(false)}
        />
      )}
    </section>
  );
};
