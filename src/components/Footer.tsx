import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sectionFadeIn } from '../lib/animations';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      {...sectionFadeIn}
      className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-[#08080a] py-14 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <a
              href="#top"
              className="inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
            >
              <span>{PERSONAL_INFO.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </a>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Digital Products · Software Engineering · AI Automation · Product Design
            </p>
          </div>

          {/* Quick Nav Anchor Links */}
          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <a href="#about" className="hover:text-neutral-950 dark:hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Work</a>
            <a href="#blog" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Insights</a>
            <a href="#contact" className="hover:text-neutral-950 dark:hover:text-white transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

<div className="flex items-center gap-4">
  <span>{PERSONAL_INFO.location}</span>
</div>
        </div>

      </div>
    </motion.footer>
  );
}
