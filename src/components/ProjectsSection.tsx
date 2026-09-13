import React, { useState } from 'react';
import { LayoutGrid, Github, CheckCircle2, Database, Brain, Code2, ArrowUpRight, Cpu } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects (3)' },
    { id: 'java-fullstack', label: 'Java Full-Stack' },
    { id: 'python-fullstack', label: 'Python Full-Stack' },
    { id: 'machine-learning', label: 'Machine Learning' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'java-fullstack':
        return {
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          accentBorder: 'group-hover:border-amber-500/50',
          accentText: 'text-amber-400',
          icon: Code2,
        };
      case 'python-fullstack':
        return {
          badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          accentBorder: 'group-hover:border-cyan-500/50',
          accentText: 'text-cyan-400',
          icon: Database,
        };
      case 'machine-learning':
        return {
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          accentBorder: 'group-hover:border-purple-500/50',
          accentText: 'text-purple-400',
          icon: Brain,
        };
      default:
        return {
          badgeBg: 'bg-[#ff007a]/10 text-[#ff007a] border-[#ff007a]/30',
          accentBorder: 'group-hover:border-[#ff007a]/50',
          accentText: 'text-[#ff007a]',
          icon: Cpu,
        };
    }
  };

  return (
    <section id="projects" className="py-16 lg:py-20 border-t border-white/[0.08] scroll-mt-28">
      {/* Section Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181622] border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-300 mb-6">
        <LayoutGrid className="w-3.5 h-3.5 text-[#ff007a]" />
        <span>Projects</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Practical, hands-on projects reflecting my journey as an MCA fresher across Java, Python, and Machine Learning.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              id={`filter-${cat.id}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#ff007a] text-white font-semibold shadow-sm shadow-[#ff007a]/30'
                  : 'bg-[#181624] text-gray-400 hover:text-white hover:bg-[#221f33] border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid: 3 Distinct, Polished Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const styles = getCategoryStyles(project.category);
          const CategoryIcon = styles.icon;

          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className={`group rounded-2xl bg-[#14131e]/90 border border-white/[0.08] ${styles.accentBorder} overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/30 flex flex-col cursor-pointer`}
            >
              {/* Project Image Mockup Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1826] border-b border-white/[0.06]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14131e] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Left Badge: Category tag */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border backdrop-blur-md ${styles.badgeBg}`}>
                    <CategoryIcon className="w-3 h-3" />
                    <span>{project.tag}</span>
                  </span>
                </div>

                {/* Top Right: Quick inspect hint */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2 py-1 rounded-md bg-black/70 text-[10px] font-mono text-gray-200 border border-white/20 backdrop-blur-sm flex items-center gap-1">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3 h-3 text-[#ff007a]" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff007a]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ff007a] transition-colors leading-snug mb-2.5">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Machine Learning Specific Callout (Accurate: No fake metrics) */}
                  {project.datasetInfo && (
                    <div className="mb-4 p-3 rounded-xl bg-[#1b1928] border border-purple-500/20 text-xs font-mono space-y-1.5">
                      <div className="flex justify-between text-gray-300">
                        <span className="text-purple-400">Dataset:</span>
                        <span>{project.datasetInfo.dataset} (Target: {project.datasetInfo.target})</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span className="text-purple-400">Algorithm:</span>
                        <span>{project.datasetInfo.model}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span className="text-purple-400">Configuration:</span>
                        <span>{project.datasetInfo.config}</span>
                      </div>
                      <div className="flex justify-between text-gray-300 pt-1 border-t border-white/10 text-[11px]">
                        <span className="text-gray-400">Data Split:</span>
                        <span className="text-purple-300 font-medium">{project.datasetInfo.dataSplit}</span>
                      </div>
                    </div>
                  )}

                  {/* Technologies Badges */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                      Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#1d1b2b] text-[11px] font-mono text-gray-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights / Features */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {(project.features || project.learningFocus).slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff007a] shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Skills & Actions */}
                <div className="pt-4 border-t border-white/[0.08] space-y-3">
                  <div className="text-[11px] text-gray-400 leading-tight">
                    <strong className="text-gray-300 font-mono">Skills:</strong>{' '}
                    <span className="text-gray-400">{project.skillsDemonstrated}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        id={`btn-github-${project.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#1d1b2b] hover:bg-[#28253b] border border-white/10 hover:border-[#ff007a]/40 text-xs font-mono text-white transition-all shadow-sm cursor-pointer"
                        title="View GitHub Project Repository"
                      >
                        <Github className="w-3.5 h-3.5 text-[#ff007a]" />
                        <span>View on GitHub</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className={`px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        project.githubUrl ? '' : 'w-full'
                      }`}
                    >
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
