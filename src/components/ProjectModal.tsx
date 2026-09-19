import { useEffect } from 'react';
import { X, CheckCircle2, Layers, Calendar, User, Building } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f0f12] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-10 text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:scale-105 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800">
            {project.number} / CASE STUDY
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            {project.category}
          </span>
        </div>

        {/* Title & Tagline */}
        <h2
          id="case-study-title"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-2"
        >
          {project.title}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium mb-6">
          {project.subtitle}
        </p>

        {/* Project Image Banner */}
        <div className="group relative aspect-video rounded-xl overflow-hidden mb-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 mb-8 font-mono text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
              <Building className="w-3.5 h-3.5" />
              <span>CLIENT</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white">{project.caseStudy.client}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>TIMELINE</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white">{project.caseStudy.timeline}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
              <User className="w-3.5 h-3.5" />
              <span>ROLE</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white">{project.caseStudy.role}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
              <Layers className="w-3.5 h-3.5" />
              <span>CATEGORY</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white">{project.category}</p>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="mb-10">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
            MEASURABLE IMPACT
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121216] shadow-sm"
              >
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem & Solution Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-neutral-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              The Challenge
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.caseStudy.problem}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-neutral-950 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              The Architectural Solution
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Key Features List */}
        <div className="mb-10 space-y-3">
          <h3 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
            Key Engineering & UX Highlights
          </h3>
          <ul className="space-y-2.5">
            {project.caseStudy.keyFeatures.map((feat, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Stack Tags */}
        <div className="mb-8">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
            TECHNOLOGIES EMPLOYED
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome Note */}
        {project.caseStudy.outcome && (
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300 font-mono uppercase tracking-wider text-[11px] block sm:inline mr-2">
                Impact & Outcome:
              </span>
              {project.caseStudy.outcome}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
