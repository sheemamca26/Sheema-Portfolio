import React from 'react';
import { Home, ArrowDownRight, Sparkles, Code2, Award, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface IntroduceSectionProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

export const IntroduceSection: React.FC<IntroduceSectionProps> = ({
  onScrollToProjects,
  onScrollToContact,
}) => {
  return (
    <section id="introduce" className="pt-2 pb-16 lg:pb-20 scroll-mt-28">
      {/* Section Tag Pill matching mockup */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181622] border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-300 mb-8">
        <Home className="w-3.5 h-3.5 text-[#ff007a]" />
        <span>Introduce</span>
      </div>

      {/* Main Display Headline matching screenshot */}
      <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-white tracking-tight leading-[1.15] mb-6 font-sans">
        Say Hi from <span className="text-[#ff007a]">{personalInfo.name}</span>,<br />
        {personalInfo.role}
      </h1>

      {/* Bio Paragraphs */}
      <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-5 font-normal">
        {personalInfo.shortBio}
      </p>

      <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mb-10">
        {personalInfo.fullBio}
      </p>

      {/* Bottom Row: Key Highlights + Rotating Project Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-6 border-t border-white/[0.08]">
        
        {/* Quick Stats: Fresher Status (completed & avg perf stats removed as requested) */}
        <div className="flex items-center gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              Fresher
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono mt-1">
              Level & Status
            </div>
          </div>
        </div>

        {/* Rotating Circular Project Badge matching screenshot */}
        <button
          onClick={onScrollToProjects}
          id="btn-circular-projects-badge"
          aria-label="Scroll to projects"
          className="group relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 self-end sm:self-auto flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          {/* Circular SVG Text with Slow Rotation */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin-slow"
            viewBox="0 0 120 120"
          >
            <path
              id="circlePath"
              d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
              fill="none"
            />
            <text className="text-[9.5px] font-mono font-semibold uppercase tracking-[0.24em] fill-gray-400 group-hover:fill-[#ff007a] transition-colors">
              <textPath href="#circlePath" startOffset="0%">
                • MY PROJECTS • MY PROJECTS •
              </textPath>
            </text>
          </svg>

          {/* Center Arrow Circle */}
          <div className="w-12 h-12 rounded-full bg-[#1b1928] border border-white/15 group-hover:border-[#ff007a] flex items-center justify-center text-white group-hover:text-[#ff007a] transition-all shadow-md shadow-black/40">
            <ArrowDownRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>

      </div>
    </section>
  );
};
