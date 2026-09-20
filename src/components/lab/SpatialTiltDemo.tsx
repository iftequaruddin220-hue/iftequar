import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { RotateCw, Sparkles, Cpu, Layers, ShieldCheck } from 'lucide-react';

export default function SpatialTiltDemo() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [glareEnabled, setGlareEnabled] = useState(true);
  const [intensity, setIntensity] = useState<number>(20); // max rotation degrees

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 3D Stage */}
      <div
        className="w-full min-h-[420px] rounded-2xl bg-neutral-100 dark:bg-[#070709] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-8 overflow-hidden relative"
        style={{ perspective: 1200 }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* 3D Perspective Container */}
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[340px] sm:max-w-[380px] h-[240px] sm:h-[260px] rounded-2xl cursor-grab active:cursor-grabbing select-none"
        >
          {/* Card Front */}
          <div
            className={`absolute inset-0 rounded-2xl p-7 border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#0e0e12]/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden ${
              isFlipped ? 'pointer-events-none' : ''
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(1px)',
            }}
          >
            {/* Dynamic Glare Overlay */}
            {glareEnabled && (
              <motion.div
                className="absolute -inset-[100%] pointer-events-none opacity-40 dark:opacity-25"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)',
                  left: glareX,
                  top: glareY,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}

            {/* Top Bar */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  SYSTEM · ACTIVE
                </span>
              </div>
              <Cpu className="w-4 h-4 text-neutral-400" />
            </div>

            {/* Card Center Info */}
            <div className="space-y-1.5 relative z-10">
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                Full-Stack Architect
              </div>
              <h4 className="text-xl font-display font-bold tracking-tight text-neutral-900 dark:text-white">
                Spatial Perspective
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                Responsive 3D matrix calculation with spring physics and cursor-tracked specular lighting.
              </p>
            </div>

            {/* Bottom Metrics */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-400 relative z-10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>60 FPS</span>
              </span>
              <span className="text-neutral-500">Angle: {intensity}°</span>
            </div>
          </div>

          {/* Card Back (Schematic Blueprint) */}
          <div
            className="absolute inset-0 rounded-2xl p-7 border border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-neutral-100 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
            }}
          >
            {/* Blueprint Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                <Layers className="w-3 h-3" />
                SCHEMATICS
              </span>
              <span className="text-[10px] font-mono text-neutral-500">v2.4</span>
            </div>

            <div className="space-y-2 relative z-10 font-mono text-xs text-neutral-300">
              <div className="p-2.5 rounded bg-black/50 border border-neutral-800 text-[11px] space-y-1">
                <div className="text-emerald-400 flex justify-between">
                  <span>transformStyle:</span>
                  <span>preserve-3d</span>
                </div>
                <div className="text-blue-300 flex justify-between">
                  <span>stiffness / damping:</span>
                  <span>220 / 24</span>
                </div>
                <div className="text-neutral-400 flex justify-between">
                  <span>rotationalRange:</span>
                  <span>±{intensity}deg</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 relative z-10 pt-2 border-t border-neutral-800">
              <span>Hardware Accelerated</span>
              <span className="text-blue-400">GPU Bound</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Flip button */}
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium hover:border-neutral-500 transition-all shadow-sm"
        >
          <RotateCw className="w-3.5 h-3.5 text-blue-500" />
          <span>{isFlipped ? 'Flip Front' : 'Flip Blueprint'}</span>
        </button>

        {/* Tilt Intensity */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Tilt Depth:</span>
          <div className="flex rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5">
            {[10, 20, 32].map((deg) => (
              <button
                key={deg}
                type="button"
                onClick={() => setIntensity(deg)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  intensity === deg
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>

        {/* Glare Toggle */}
        <button
          type="button"
          onClick={() => setGlareEnabled(!glareEnabled)}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            glareEnabled
              ? 'border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
              : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
          }`}
        >
          Specular Light: {glareEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}
