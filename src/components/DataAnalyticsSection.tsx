import { useState } from 'react';
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Github, 
  Filter, 
  Layers, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Coffee, 
  Flame, 
  Zap, 
  Activity, 
  CheckCircle2, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { INSIGHTPULSE_PROJECT, STARBUCKS_GALLERY, STARBUCKS_INSIGHTS } from '../data/portfolioData';
import { sectionFadeIn, cardFadeIn } from '../lib/animations';

interface DataAnalyticsSectionProps {
  onSelectProject?: (project: Project) => void;
}

const TECH_BADGES = [
  { name: 'Power BI', icon: BarChart3 },
  { name: 'DAX', icon: Activity },
  { name: 'Power Query', icon: Filter },
  { name: 'Excel', icon: FileSpreadsheet },
  { name: 'Data Cleaning', icon: Sparkles },
  { name: 'Data Modeling', icon: Database },
  { name: 'Data Visualization', icon: Layers },
  { name: 'Business Intelligence', icon: TrendingUp },
];

export default function DataAnalyticsSection({ onSelectProject }: DataAnalyticsSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = STARBUCKS_GALLERY[activeImageIndex] || STARBUCKS_GALLERY[0];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % STARBUCKS_GALLERY.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + STARBUCKS_GALLERY.length) % STARBUCKS_GALLERY.length);
  };

  return (
    <motion.section
      id="data-analytics"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#070709]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                03 / BUSINESS INTELLIGENCE & ANALYTICS
              </span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              Data <br />
              <span className="italic font-normal">Analytics.</span>
            </h2>

            <p className="mt-3 font-mono text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-medium">
              &ldquo;Turning raw data into decisions.&rdquo;
            </p>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-md font-normal leading-relaxed">
            I build interactive analytical experiences that transform complex datasets into clear, actionable insights using business intelligence, data visualization, and modern analytics workflows.
          </p>
        </div>

        {/* Technology Strip */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Core Analytics Stack
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {TECH_BADGES.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0e0e12] text-neutral-700 dark:text-neutral-300 text-xs font-medium tracking-wide shadow-2xs hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-emerald-500" />
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Project Showcase Container */}
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0f] shadow-xl overflow-hidden transition-all duration-300">
          
          {/* Project Header Bar */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-white/[0.01]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40">
                    Featured BI Dashboard
                  </span>
                  <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
                    Microsoft Power BI · DAX · Power Query
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  InsightPulse BI — Starbucks Analytics Dashboard
                </h3>

                <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                  An interactive Power BI dashboard designed to analyze Starbucks beverage data, transforming nutritional and product information into clear business intelligence insights.
                </p>

                <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
                  Focus dimensions: calories · sugar · caffeine · protein · beverage categories · beverage preparation · product-level trends
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://github.com/iftequaruddin220-hue/InsightPulse-BI"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="insightpulse-github-btn"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
                  aria-label="View InsightPulse BI repository on GitHub (opens in new tab)"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {onSelectProject && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(INSIGHTPULSE_PROJECT)}
                    id="insightpulse-casestudy-btn"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white transition-all bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    <span>Case Study</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Verified Project KPIs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#0e0e13]/60">
            
            {/* KPI 1 */}
            <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Dataset Scope</span>
                <Coffee className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  33
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                  Total Beverages
                </div>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Nutritional Avg</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  33.02 <span className="text-xl sm:text-2xl font-semibold text-neutral-400 dark:text-neutral-500">g</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                  Average Sugar
                </div>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Energy Metric</span>
                <Flame className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  194.30
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                  Average Calories
                </div>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Stimulant Density</span>
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                  81 <span className="text-xl sm:text-2xl font-semibold text-neutral-400 dark:text-neutral-500">mg</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                  Average Caffeine
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Project Showcase Gallery */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                  Dashboard & Analytics Gallery
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  Inspect the interactive Power BI report views, statistical distribution charts, and analytical pipeline.
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Previous gallery image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 px-1">
                  {activeImageIndex + 1} / {STARBUCKS_GALLERY.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Next gallery image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Interactive Preview Container */}
            <div 
              className="relative aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group shadow-lg cursor-pointer"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true); }}
              aria-label="Click to enlarge image in fullscreen lightbox"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.id}
                  src={activeImage.url}
                  alt={activeImage.alt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>

              {/* View Overlay Tag & Enlarge Button */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeImage.title}</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-300 hidden sm:inline">{activeImage.subtitle}</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Enlarge</span>
                </div>
              </div>

              {/* Verified repository note watermark */}
              <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <span className="text-[10px] font-mono text-neutral-400 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded border border-white/5">
                  .PBIX & Data in GitHub Repo
                </span>
              </div>
            </div>

            {/* Thumbnail Selector Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STARBUCKS_GALLERY.map((img, idx) => {
                const isSelected = activeImageIndex === idx;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative p-2 rounded-xl text-left border transition-all duration-200 flex flex-col gap-2 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-1 ring-emerald-500/50'
                        : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <img
                        src={img.url}
                        alt={`Thumbnail: ${img.alt}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="px-1">
                      <p className={`text-xs font-bold tracking-tight truncate ${
                        isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'text-neutral-800 dark:text-neutral-200'
                      }`}>
                        {img.title}
                      </p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                        {img.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Project Capabilities & Architecture Breakdown */}
          <div className="p-6 sm:p-8 lg:p-10 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-white/[0.01]">
            <h4 className="font-display text-lg sm:text-xl font-bold text-neutral-950 dark:text-white mb-6">
              Core Capabilities & BI Architecture
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                { title: 'Average Calories by Beverage Category', desc: 'Comparative category aggregation highlighting energy densities' },
                { title: 'Average Caffeine by Category', desc: 'Comprehensive stimulant concentration benchmark across brew lines' },
                { title: 'Beverage Category Distribution', desc: 'Proportional segmentation of the 33 tracked Starbucks products' },
                { title: 'Top 5 Highest Caffeine Beverages', desc: 'Ranked metric table isolating peak stimulant profiles' },
                { title: 'Protein Range Filtering', desc: 'Dynamic parameter filtering across nutritional protein thresholds' },
                { title: 'Beverage Preparation Filtering', desc: 'Multi-select slicers for dairy choices, milk fat, and brew styles' },
                { title: 'Interactive Power BI Dashboard', desc: 'Multi-visual synchronized cross-filtering layout (.pbix format)' },
                { title: 'Data Transformation with Power Query', desc: 'M-code data ingestion, typecasting, normalization, and null sanitation' },
                { title: 'Analytical Calculations using DAX', desc: 'Custom measures for category means, standard deviation, and dynamic ranks' },
                { title: 'Data Modeling & BI Visualization', desc: 'Star-schema dimensional modeling connecting facts with dimension tables' },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#0e0e12] flex items-start gap-3 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                      {item.title}
                    </h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights at a Glance Grid */}
          <div className="p-6 sm:p-8 lg:p-10 border-t border-neutral-200 dark:border-neutral-800">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                Verified Findings
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-extrabold text-neutral-950 dark:text-white">
                Insights at a Glance
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Key patterns and operational observations surfaced from the Starbuck beverage dataset:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STARBUCKS_INSIGHTS.map((insight, idx) => (
                <motion.div
                  key={insight.id}
                  {...cardFadeIn(idx)}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0d0d11] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {insight.stat}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    
                    <h5 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      {insight.headline}
                    </h5>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                      {insight.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Section CTA Bar */}
          <div className="p-6 sm:p-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="space-y-1">
                <p className="font-display text-base font-bold text-neutral-900 dark:text-white">
                  Explore the full project
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Download the complete <code className="font-mono text-emerald-600 dark:text-emerald-400">.pbix</code> Power BI model, dataset files, and documentation on GitHub.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/iftequaruddin220-hue/InsightPulse-BI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all shadow-sm"
                >
                  <span>View on GitHub →</span>
                  <Github className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <span>Need data-driven solutions?</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High resolution dashboard preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div className="font-mono text-xs text-neutral-300 flex items-center gap-2">
                <span>{activeImage.title}</span>
                <span>—</span>
                <span className="text-neutral-400">{activeImage.subtitle}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close fullscreen lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image */}
            <div className="relative w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl">
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>

            {/* Thumbnail Quick Switch in Lightbox */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto py-1">
              {STARBUCKS_GALLERY.map((img, idx) => (
                <button
                  key={`lightbox-${img.id}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    activeImageIndex === idx
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                  }`}
                >
                  {img.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </motion.section>
  );
}
