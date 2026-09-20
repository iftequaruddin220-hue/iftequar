import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Boxes, Waves, Activity, Terminal } from 'lucide-react';
import KineticCanvasDemo from './lab/KineticCanvasDemo';
import SpatialTiltDemo from './lab/SpatialTiltDemo';
import HarmonicSynthDemo from './lab/HarmonicSynthDemo';
import FluidMorphDemo from './lab/FluidMorphDemo';
import { sectionFadeIn } from '../lib/animations';

type LabTabId = 'kinetic' | 'spatial' | 'synth' | 'morph';

interface LabExperiment {
  id: LabTabId;
  title: string;
  category: string;
  tagline: string;
  tech: string[];
  icon: typeof Sparkles;
}

const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'kinetic',
    title: 'Kinetic Mesh Physics',
    category: 'Canvas Engine',
    tagline: 'High-performance 60 FPS vector physics with interactive gravitational attraction and collision dispersal.',
    tech: ['HTML5 Canvas', 'Vector Math', '60 FPS'],
    icon: Sparkles,
  },
  {
    id: 'spatial',
    title: 'Spatial 3D Perspective',
    category: 'Hardware Accelerations',
    tagline: 'Cursor-driven 3D matrix transformation featuring real-time specular highlights and dual-sided schematic flip.',
    tech: ['CSS 3D Matrix', 'Framer Spring', 'Light Glare'],
    icon: Boxes,
  },
  {
    id: 'synth',
    title: 'Harmonic Ambient Synth',
    category: 'Web Audio API',
    tagline: 'Zero-latency pentatonic chime synthesizer with customizable waveforms and exponential decay envelopes.',
    tech: ['AudioContext', 'Oscillator Nodes', 'Pentatonic Scale'],
    icon: Waves,
  },
  {
    id: 'morph',
    title: 'Fluid Morphing Island',
    category: 'Layout Dynamics',
    tagline: 'Adaptive morphing container transitioning smoothly between media player, notifications, and telemetry views.',
    tech: ['Motion Layout', 'Spring Dynamics', 'AnimatePresence'],
    icon: Activity,
  },
];

export default function InteractiveLabSection() {
  const [activeTab, setActiveTab] = useState<LabTabId>('kinetic');

  const currentExperiment = LAB_EXPERIMENTS.find((e) => e.id === activeTab) || LAB_EXPERIMENTS[0];

  return (
    <motion.section
      id="lab"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>Interactive UI Lab · Micro-Interactions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-neutral-900 dark:text-white">
              Motion & Physics Lab
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
              Interactive prototypes exploring tactile micro-interactions, generative vector simulations, spatial perspective, and audio-visual feedback.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
            Click & interact with each live experiment below
          </div>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
          {LAB_EXPERIMENTS.map((exp) => {
            const Icon = exp.icon;
            const isSelected = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveTab(exp.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-blue-500 bg-neutral-100 dark:bg-[#121217] shadow-md -translate-y-0.5'
                    : 'border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#0c0c0f] hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {exp.category}
                  </span>
                </div>

                <div>
                  <div className="font-display font-bold text-sm text-neutral-900 dark:text-white">
                    {exp.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Experiment Metadata Bar */}
        <div className="mb-6 p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <span>{currentExperiment.title}</span>
              <span className="text-xs font-mono font-normal text-neutral-400">({currentExperiment.category})</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              {currentExperiment.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 shrink-0">
            {currentExperiment.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Active Experiment Interactive Canvas / Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'kinetic' && <KineticCanvasDemo />}
              {activeTab === 'spatial' && <SpatialTiltDemo />}
              {activeTab === 'synth' && <HarmonicSynthDemo />}
              {activeTab === 'morph' && <FluidMorphDemo />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
}
