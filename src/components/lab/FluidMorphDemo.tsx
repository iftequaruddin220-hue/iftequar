import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Bell, Activity, Check, Copy, Code, Music, Sparkles } from 'lucide-react';

type IslandState = 'idle' | 'player' | 'notification' | 'telemetry';

export default function FluidMorphDemo() {
  const [islandState, setIslandState] = useState<IslandState>('idle');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'code'>('interactive');

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Morphing Stage */}
      <div className="w-full min-h-[380px] sm:min-h-[420px] rounded-2xl bg-neutral-100 dark:bg-[#070709] border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col items-center justify-between relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Header Status */}
        <div className="w-full flex items-center justify-between relative z-10">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-500" />
            FLUID MORPH ENGINE
          </span>

          <div className="flex rounded-lg bg-neutral-200/70 dark:bg-neutral-800/80 p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'interactive'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Interactive
            </button>
            <button
              type="button"
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'code'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>
        </div>

        {viewMode === 'interactive' ? (
          /* The Morphing Dynamic Island */
          <div className="w-full flex-1 flex flex-col items-center justify-center my-6 relative z-10">
            <motion.div
              layout
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 32,
              }}
              className="bg-neutral-950 text-white rounded-[28px] border border-neutral-800 shadow-2xl overflow-hidden cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {islandState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setIslandState('player')}
                    className="px-5 py-2.5 flex items-center gap-3 select-none"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-neutral-300">Ready · Tap to expand</span>
                  </motion.div>
                )}

                {islandState === 'player' && (
                  <motion.div
                    key="player"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 flex items-center gap-4 w-[320px] sm:w-[360px] select-none"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner">
                      <Music className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">Ambient Synth Loops</div>
                      <div className="text-[11px] font-mono text-neutral-400 truncate">Spatial Harmonic Studio</div>

                      {/* Equalizer Bars */}
                      <div className="flex items-center gap-1 mt-1.5 h-3">
                        {[0.6, 1, 0.4, 0.8, 0.5, 0.9].map((height, i) => (
                          <motion.span
                            key={i}
                            animate={isPlaying ? { scaleY: [0.3, height, 0.2] } : { scaleY: 0.2 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              delay: i * 0.1,
                              ease: 'easeInOut',
                            }}
                            className="w-1 h-3 rounded-full bg-blue-400 origin-bottom"
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </motion.div>
                )}

                {islandState === 'notification' && (
                  <motion.div
                    key="notification"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 flex items-center gap-3.5 w-[330px] sm:w-[380px] select-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Check className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>Production Deployed</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 font-mono text-neutral-300">
                          v2.4
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 truncate">
                        Synchronized to 18 global edge points.
                      </div>
                    </div>
                  </motion.div>
                )}

                {islandState === 'telemetry' && (
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 w-[310px] sm:w-[350px] space-y-3 select-none"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 flex items-center gap-1.5 font-mono">
                        <Activity className="w-3.5 h-3.5 text-blue-400" />
                        Latency
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">18ms (Edge CDN)</span>
                    </div>

                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                      />
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>Mem: 48MB / 512MB</span>
                      <span>Health: 100%</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          /* Code Recipe View */
          <div className="w-full flex-1 my-4 overflow-hidden rounded-xl border border-neutral-800 bg-[#0c0c10] p-4 text-left relative">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[11px] font-mono text-neutral-400">
              <span>FluidIsland.tsx</span>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-all text-[10px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="mt-3 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-[220px] leading-relaxed">
              <code>{CODE_SNIPPET}</code>
            </pre>
          </div>
        )}

        {/* State Selector Buttons */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 relative z-10 font-mono text-xs">
          {(['idle', 'player', 'notification', 'telemetry'] as IslandState[]).map((state) => (
            <button
              key={state}
              type="button"
              onClick={() => setIslandState(state)}
              className={`px-3 py-1.5 rounded-lg border capitalize transition-all ${
                islandState === state
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const CODE_SNIPPET = `<motion.div
  layout
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 32
  }}
  className="bg-neutral-950 text-white rounded-[28px]"
>
  <AnimatePresence mode="wait">
    {state === 'player' && (
      <motion.div
        key="player"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
      >
        {/* Dynamic media player layout */}
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>`;
