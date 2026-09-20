import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { heroFadeIn } from '../lib/animations';

const DYNAMIC_PHRASES = [
  'digital products.',
  'intelligent software.',
  'scalable web apps.',
  'purposeful systems.',
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      id="top"
      {...heroFadeIn}
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Subtle background ambient blur */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-200/40 dark:bg-white/[0.02] rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
              <p className="font-mono text-[11px] font-medium tracking-widest text-neutral-600 dark:text-neutral-400 uppercase">
                {PERSONAL_INFO.role}
              </p>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.14] sm:leading-[1.08]">
              I turn ideas into{' '}
              <span
                onClick={() => setPhraseIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length)}
                className="inline-block relative cursor-pointer select-none"
                title="Click to switch phrase"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={DYNAMIC_PHRASES[phraseIndex]}
                    initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(3px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block font-extrabold text-neutral-900 dark:text-white border-b-2 sm:border-b-4 border-neutral-900 dark:border-white pb-0.5 sm:pb-1"
                  >
                    {DYNAMIC_PHRASES[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed font-normal">
              {PERSONAL_INFO.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#work"
                id="hero-explore-work-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white border-b border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white transition-all group"
              >
                <span>Explore selected work</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Proof Badges */}
            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap gap-6 sm:gap-10 font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                <span>Independent Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                <span>Remote · Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                <span>React 19 & Tailwind</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Portrait & Availability Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative line frame */}
              <div className="absolute -inset-3 border border-neutral-300 dark:border-neutral-800 rounded-lg pointer-events-none" />

              {/* Index number badge */}
              <div className="absolute top-4 right-4 z-20 font-mono text-xs font-semibold tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                01 — 26
              </div>

              {/* Image Container with Smooth Zoom & Lighting */}
              <div className="relative z-10 aspect-[4/3] rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group shadow-2xl transition-all duration-300">
                <img
                  src="/me-working.png"
                  alt="Iftequaruddin — Digital Product Builder & Engineer at work"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity pointer-events-none" />
              </div>

              {/* Availability Floating Glass Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 z-20 flex items-center gap-3.5 bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:px-5 sm:py-4 rounded-xl shadow-xl max-w-xs transition-transform hover:scale-[1.02]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Currently Available
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Select Projects · India & Worldwide
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
