import { ArrowUpRight, Code, Palette, Cpu, Globe, Terminal, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sectionFadeIn } from '../lib/animations';

export default function AboutSection() {
  const stack = [
    {
      category: 'Frontend',
      icon: Code,
      accent: 'text-blue-500',
      items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'Motion'],
    },
    {
      category: 'Architecture & Backend',
      icon: Cpu,
      accent: 'text-emerald-500',
      items: ['Node.js', 'Express', 'PostgreSQL', 'Cloud Run', 'Vercel Edge', 'REST & GraphQL'],
    },
    {
      category: 'Design & Craft',
      icon: Palette,
      accent: 'text-purple-500',
      items: ['Figma', 'Design Systems', 'UI/UX Architecture', 'Micro-Interactions', 'Typography'],
    },
    {
      category: 'AI & Automation',
      icon: Sparkles,
      accent: 'text-amber-500',
      items: ['Gemini API', 'Multi-Agent Systems', 'Structured Tool Calling', 'Autonomous Workflows'],
    },
  ];

  return (
    <motion.section
      id="about"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block">
              05 / ABOUT THE MAKER
            </span>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
              Technology is the craft. <br />
              <span className="italic font-normal text-neutral-500 dark:text-neutral-400">
                Solving the right problem is the point.
              </span>
            </h2>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              I’m <strong className="text-neutral-900 dark:text-white">Iftequaruddin</strong> — an independent software engineer based in India, working with founders and teams to design and build thoughtful digital products.
            </p>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              My work spans software engineering, artificial intelligence, data, and backend systems. I enjoy taking an idea from its early stages, understanding the problem behind it, and turning it into a reliable product that people can actually use.
            </p>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              I believe the best work comes from close collaboration, clear thinking, and attention to detail. Whether I’m building a product from scratch or solving a specific technical challenge, my goal is always the same: create software that is useful, well-engineered, and built with purpose.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-900 dark:border-white pb-1 hover:pb-1.5 transition-all"
              >
                <span>Initiate a discussion</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Engineering Stack & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div
              id="core-stack-card"
              className="p-8 sm:p-10 rounded-2xl bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden space-y-7 transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              {/* Subtle ambient accent glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header with live status badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">CORE STACK & METHODOLOGY</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Production-Vetted
                </span>
              </div>

              {/* Stack Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 relative z-10">
                {stack.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div key={group.category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-md bg-neutral-200/60 dark:bg-neutral-800/70">
                          <Icon className={`w-3.5 h-3.5 ${group.accent}`} />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                          {group.category}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-950 dark:hover:text-white transition-all cursor-default shadow-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Engineering Standards Footer */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 relative z-10">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>Modern Web & Cloud Architecture</span>
                </span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  Type-Safe · Modular · Accessible
                </span>
              </div>
            </div>

            {/* Operating Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0f]">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-950 dark:text-white mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h4>High Signal, Zero Fluff</h4>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Every button, query, and animation is placed for a deliberate reason. No unnecessary complexity or marketing vanity metrics.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0f]">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-950 dark:text-white mb-1.5">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <h4>Remote-First Collaboration</h4>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Asynchronous workflows, transparent Loom walkthroughs, and frequent prototype staging builds deployed on Vercel.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
