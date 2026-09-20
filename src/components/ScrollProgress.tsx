import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Spring smoothing for responsive yet tactile progression
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      id="scroll-progress-container"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] pointer-events-none overflow-hidden bg-transparent"
    >
      <motion.div
        id="scroll-progress-bar"
        className="h-full w-full origin-left bg-gradient-to-r from-neutral-800 via-neutral-950 to-neutral-900 dark:from-neutral-300 dark:via-neutral-100 dark:to-white shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
}
