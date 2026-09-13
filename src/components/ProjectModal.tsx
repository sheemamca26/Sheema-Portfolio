import React from 'react';
import { X, Github, CheckCircle2, Brain } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#12111b] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image & Close */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1a1827]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12111b] via-[#12111b]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category and title on bottom of header */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 rounded-md bg-[#ff007a] text-white text-[11px] font-mono font-semibold uppercase tracking-wider inline-block mb-2">
              {project.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Project Purpose */}
          {project.purpose && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold mb-2">
                Project Overview & Purpose
              </h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {project.purpose}
              </p>
            </div>
          )}

          {/* Machine Learning Project Specifications (Accurate Details Only) */}
          {project.datasetInfo && (
            <div className="p-4 rounded-xl bg-[#1a1727] border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                <Brain className="w-4 h-4" />
                <span>Dataset & Machine Learning Specifications</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
                  <span className="text-gray-400 block mb-0.5">Dataset File:</span>
                  <span className="text-white font-semibold">{project.datasetInfo.dataset}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
                  <span className="text-gray-400 block mb-0.5">Target Variable:</span>
                  <span className="text-white font-semibold">{project.datasetInfo.target} (Diabetic / Not Diabetic)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
                  <span className="text-gray-400 block mb-0.5">Algorithm:</span>
                  <span className="text-white font-semibold">{project.datasetInfo.model}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
                  <span className="text-gray-400 block mb-0.5">Hyperparameters:</span>
                  <span className="text-white font-semibold">{project.datasetInfo.config}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/10 sm:col-span-2">
                  <span className="text-gray-400 block mb-0.5">Dataset Split:</span>
                  <span className="text-purple-300 font-semibold">{project.datasetInfo.dataSplit}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-gray-400 block mb-1.5">8 Health Input Features:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.datasetInfo.inputFeatures.map((feat) => (
                    <span
                      key={feat}
                      className="px-2.5 py-1 rounded bg-purple-950/50 text-[11px] font-mono text-purple-200 border border-purple-500/30"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#1c1a29] text-gray-300 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Highlights / Features */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold mb-3">
              Key Technical Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(project.features || project.learningFocus).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ff007a] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Demonstrated */}
          <div className="p-3.5 rounded-xl bg-[#161422] border border-white/10 text-xs">
            <span className="font-mono uppercase tracking-wider text-[#ff007a] font-semibold block mb-1">
              Skills Demonstrated
            </span>
            <p className="text-gray-300 leading-relaxed">
              {project.skillsDemonstrated}
            </p>
          </div>

        </div>

        {/* Footer with Actions */}
        <div className="p-6 border-t border-white/10 bg-[#151421] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="modal-btn-github"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1f1d2d] hover:bg-[#2c2940] border border-white/10 hover:border-[#ff007a]/40 text-xs font-mono text-white transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 text-[#ff007a]" />
                <span>View GitHub Repository</span>
              </a>
            ) : (
              <a
                href="https://github.com/sheemamca26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1f1d2d] hover:bg-[#2c2940] border border-white/10 hover:border-white/20 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 text-white" />
                <span>sheemamca26 on GitHub</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
