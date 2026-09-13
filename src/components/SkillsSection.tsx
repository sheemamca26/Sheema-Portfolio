import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { circularSkills } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // SVG parameters for circular meter
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="py-16 lg:py-20 border-t border-white/[0.08] scroll-mt-28">
      {/* Section Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181622] border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-300 mb-6">
        <Cpu className="w-3.5 h-3.5 text-[#ff007a]" />
        <span>Skills</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 font-sans">
        Professional Skills
      </h2>
      <p className="text-gray-400 text-base max-w-2xl mb-12">
        Core technical proficiencies across backend development, programming languages, modern frontend UI, and relational database management.
      </p>

      {/* 6 Circular Gauge Rings (Java, SpringBoot & Microservices, Python, ReactJs, HTML/CSS, Oracle) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
        {circularSkills.map((skill) => {
          const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="p-5 sm:p-6 rounded-2xl bg-[#14131e]/70 border border-white/[0.08] hover:border-[#ff007a]/40 flex flex-col items-center justify-center transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/20 relative"
            >
              {/* Circular Gauge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  {/* Track ring */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    className="stroke-[#222030]"
                    strokeWidth="7"
                    fill="none"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    className="stroke-[#00e599] group-hover:stroke-[#ff007a] transition-all duration-700 ease-out"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* Percentage Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight group-hover:scale-110 transition-transform">
                    {skill.percentage}%
                  </span>
                </div>
              </div>

              {/* Skill Label */}
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight text-center group-hover:text-[#ff007a] transition-colors">
                {skill.name}
              </h3>
              <span className="text-xs text-gray-400 mt-1 font-mono text-center">
                {skill.category}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
