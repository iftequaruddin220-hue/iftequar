import { useState } from 'react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Sparkles, 
  Clock, 
  Check, 
  Layers, 
  Sliders, 
  Workflow, 
  FolderGit2, 
  LayoutGrid, 
  List,
  Cpu,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, PROJECTS } from '../data/portfolioData';
import { sectionFadeIn } from '../lib/animations';
import { Project } from '../types';
import ProjectEstimator from './services/ProjectEstimator';
import ProcessWorkflow from './services/ProcessWorkflow';

type ViewMode = 'catalog' | 'estimator' | 'process';
type LayoutMode = 'cards' | 'list';

interface ServicesSectionProps {
  onSelectProject?: (project: Project) => void;
}

export default function ServicesSection({ onSelectProject }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<ViewMode>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('cards');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First open by default in list mode

  // Categories extracted from services
  const categories = ['All', 'Frontend & Web', 'Product & Design', 'Full Stack & SaaS', 'Infrastructure & DevOps', 'AI & Systems'];

  // Filtered services
  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <motion.section
      id="services"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">
              <span>04 / CAPABILITIES & SERVICES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
              From a blank page <br />
              <span className="italic font-normal text-neutral-500 dark:text-neutral-400">to something that works.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              I bring product strategy, design systems, full-stack engineering, and AI automation together to build high-performance software around your specific operational workflows.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>5 Core Disciplines</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Rapid Sprint Execution</span>
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Main Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-[#121217] border border-neutral-200 dark:border-neutral-800 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Service Catalog</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('estimator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'estimator'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-500" />
              <span>Project Scoper</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                Interactive
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('process')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'process'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-purple-500" />
              <span>Delivery Blueprint</span>
            </button>
          </div>

          {/* Sub-controls when in Catalog view: Category chips or Layout switcher */}
          {activeTab === 'catalog' && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 border border-neutral-200 dark:border-neutral-800 rounded-lg p-1 bg-white dark:bg-neutral-900">
                <button
                  type="button"
                  onClick={() => setLayoutMode('cards')}
                  className={`p-1.5 rounded transition-colors ${
                    layoutMode === 'cards'
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  title="Card Grid Layout"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    layoutMode === 'list'
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  title="Compact List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tab 1: Service Catalog */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-xs'
                      : 'bg-neutral-100 dark:bg-[#121216] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  <span>{cat}</span>
                  {cat === 'All' && (
                    <span className="ml-1.5 opacity-60">({SERVICES.length})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Layout: Card Grid Mode */}
            {layoutMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                  const relatedProject = PROJECTS.find((p) => p.id === service.relatedProjectId);

                  return (
                    <div
                      key={service.number}
                      className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0f] p-7 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden"
                    >
                      {/* Ambient corner glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

                      <div className="space-y-5 relative z-10">
                        {/* Top Meta Line: Number + Category + Timeline */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500">
                              {service.number}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                              {service.category}
                            </span>
                          </div>

                          {service.timeline && (
                            <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                              <Clock className="w-3 h-3 text-neutral-400" />
                              <span>{service.timeline}</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed font-normal">
                            {service.description}
                          </p>
                        </div>

                        {/* Benchmark Metric Pill */}
                        {service.impactMetric && (
                          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                              {service.impactMetric.label}
                            </span>
                            <span className="font-display font-bold text-sm text-neutral-950 dark:text-white">
                              {service.impactMetric.value}
                            </span>
                          </div>
                        )}

                        {/* Deliverables List */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                            Key Deliverables
                          </span>
                          <ul className="space-y-1.5">
                            {service.deliverables.map((del, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-normal"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Chips */}
                        {service.technologies && (
                          <div className="pt-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                              Core Technologies
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions: Related Case Study & Inquire */}
                      <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3 relative z-10">
                        {relatedProject && (
                          <button
                            type="button"
                            onClick={() => onSelectProject ? onSelectProject(relatedProject) : window.location.assign('#work')}
                            className="w-full flex items-center justify-between text-left p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer group/proj"
                          >
                            <div className="flex items-center gap-2">
                              <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
                              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                Case Study: {relatedProject.title}
                              </span>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/proj:text-neutral-900 dark:group-hover/proj:text-white transition-colors" />
                          </button>
                        )}

                        <a
                          href="#contact"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all"
                        >
                          <span>Inquire About This Service</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Layout: Compact Expandable List Mode */
              <div className="border-t border-neutral-200 dark:border-neutral-800">
                {filteredServices.map((service, index) => {
                  const isExpanded = expandedIndex === index;
                  const relatedProject = PROJECTS.find((p) => p.id === service.relatedProjectId);

                  return (
                    <div
                      key={service.number}
                      className="border-b border-neutral-200 dark:border-neutral-800 transition-colors"
                    >
                      <div
                        onClick={() => toggleExpand(index)}
                        className="py-8 sm:py-9 grid grid-cols-12 gap-4 items-center cursor-pointer group hover:px-3 sm:hover:px-4 transition-all duration-300 rounded-xl"
                      >
                        {/* Number */}
                        <div className="col-span-2 sm:col-span-1 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                          {service.number}
                        </div>

                        {/* Title & Category */}
                        <div className="col-span-8 sm:col-span-5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              {service.category}
                            </span>
                            {service.timeline && (
                              <span className="hidden sm:inline font-mono text-[10px] text-neutral-400">
                                · {service.timeline}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                        </div>

                        {/* Brief Description */}
                        <div className="hidden sm:block sm:col-span-5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {service.description}
                        </div>

                        {/* Chevron Indicator */}
                        <div className="col-span-2 sm:col-span-1 flex justify-end text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-blue-500' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Expanded Drawer with Deliverables, Tech & Links */}
                      {isExpanded && (
                        <div className="pb-8 pt-2 px-4 sm:px-12 space-y-6 animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {service.deliverables.map((del, dIdx) => (
                              <div
                                key={dIdx}
                                className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800"
                              >
                                <span className="font-mono text-[10px] text-neutral-400 block mb-1">
                                  0{dIdx + 1}
                                </span>
                                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-200">
                                  {del}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                            {service.technologies && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[11px] font-mono text-neutral-400 mr-1">Stack:</span>
                                {service.technologies.map((t) => (
                                  <span
                                    key={t}
                                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-4">
                              {relatedProject && (
                                <button
                                  type="button"
                                  onClick={() => onSelectProject ? onSelectProject(relatedProject) : window.location.assign('#work')}
                                  className="inline-flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                >
                                  <span>View {relatedProject.title} Case Study</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              )}

                              <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <span>Discuss this scope</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Interactive Project Scoper & Estimator */}
        {activeTab === 'estimator' && (
          <div className="animate-in fade-in duration-200">
            <ProjectEstimator />
          </div>
        )}

        {/* Tab 3: Delivery Blueprint & Engagement Models */}
        {activeTab === 'process' && (
          <div className="animate-in fade-in duration-200">
            <ProcessWorkflow />
          </div>
        )}

      </div>
    </motion.section>
  );
}
