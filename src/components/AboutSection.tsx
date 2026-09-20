import { ArrowUpRight, Code, Palette, Cpu, Globe, Terminal, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sectionFadeIn } from '../lib/animations';

export default function AboutSection() {
  const stack = [
    { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'Motion'] },
    { category: 'Architecture & Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Cloud Run', 'Vercel Edge', 'REST & GraphQL'] },
    { category: 'Design & Craft', items: ['Figma', 'Design Systems', 'UI/UX Architecture', 'Micro-Interactions', 'Typography'] },
    { category: 'AI & Automation', items: ['Gemini API', 'Multi-Agent Systems', 'Structured Tool Calling', 'Autonomous Workflows'] },
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
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <Terminal className="w-4 h-4" />
                <span>CORE STACK & METHODOLOGY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stack.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
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
