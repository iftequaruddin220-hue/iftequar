import { useState, useRef, useEffect } from 'react';
import { Play, Square, Volume2, VolumeX, Sparkles, Waves } from 'lucide-react';
import { motion } from 'motion/react';

interface NoteData {
  note: string;
  freq: number;
  label: string;
}

const SCALE_NOTES: NoteData[] = [
  { note: 'C4', freq: 261.63, label: 'Do' },
  { note: 'D4', freq: 293.66, label: 'Re' },
  { note: 'E4', freq: 329.63, label: 'Mi' },
  { note: 'G4', freq: 392.0, label: 'Sol' },
  { note: 'A4', freq: 440.0, label: 'La' },
  { note: 'C5', freq: 523.25, label: 'Do⁺' },
  { note: 'D5', freq: 587.33, label: 'Re⁺' },
  { note: 'E5', freq: 659.25, label: 'Mi⁺' },
];

export default function HarmonicSynthDemo() {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [waveform, setWaveform] = useState<OscillatorType>('sine');
  const [decaySeconds, setDecaySeconds] = useState<number>(1.2);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlayingArp, setIsPlayingArp] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const arpIntervalRef = useRef<number | null>(null);

  // Clean cleanup on unmount
  useEffect(() => {
    return () => {
      if (arpIntervalRef.current) {
        clearInterval(arpIntervalRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Initialize or get audio context safely on user gesture
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTone = (freq: number, noteName: string) => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveform;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Smooth attack & exponential decay envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decaySeconds);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + decaySeconds + 0.05);

      setActiveNote(noteName);
      setTimeout(() => {
        setActiveNote((current) => (current === noteName ? null : current));
      }, 300);
    } catch {
      // AudioContext policy catch
    }
  };

  const toggleArpeggio = () => {
    if (isPlayingArp) {
      if (arpIntervalRef.current) clearInterval(arpIntervalRef.current);
      setIsPlayingArp(false);
      return;
    }

    setIsPlayingArp(true);
    let step = 0;
    const arpSequence = [0, 2, 3, 5, 4, 2, 1, 3, 6, 7, 5, 3];

    // Trigger initial note
    const firstIdx = arpSequence[0];
    playTone(SCALE_NOTES[firstIdx].freq, SCALE_NOTES[firstIdx].note);

    arpIntervalRef.current = window.setInterval(() => {
      step = (step + 1) % arpSequence.length;
      const noteIdx = arpSequence[step];
      playTone(SCALE_NOTES[noteIdx].freq, SCALE_NOTES[noteIdx].note);
    }, 280);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Soundboard Stage */}
      <div className="w-full min-h-[360px] rounded-2xl bg-neutral-100 dark:bg-[#070709] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle soundwave graphic effect */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl pointer-events-none" />

        {/* Top Info Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              Web Audio API · Zero Latency
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
            aria-label={isMuted ? 'Unmute synth' : 'Mute synth'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Chime Pads Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 my-8 relative z-10">
          {SCALE_NOTES.map((item) => {
            const isActive = activeNote === item.note;
            return (
              <motion.button
                key={item.note}
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => playTone(item.freq, item.note)}
                className={`relative h-28 sm:h-36 rounded-xl flex flex-col justify-between p-3 border transition-all duration-150 select-none ${
                  isActive
                    ? 'border-blue-500 bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] -translate-y-1'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-blue-100' : 'text-neutral-400'}`}>
                  {item.label}
                </span>

                <div className="space-y-1 text-center">
                  <div className="font-display font-bold text-lg sm:text-xl tracking-tight">
                    {item.note}
                  </div>
                  <div className={`text-[9px] font-mono ${isActive ? 'text-blue-100' : 'text-neutral-400'}`}>
                    {Math.round(item.freq)}Hz
                  </div>
                </div>

                <div className="w-full h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  {isActive && <div className="w-full h-full bg-white animate-pulse" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Hint */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 relative z-10">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Pentatonic harmony: Click any pad to synthesize real-time harmonic frequencies.</span>
          </div>

          <button
            type="button"
            onClick={toggleArpeggio}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-xs transition-all shadow-sm ${
              isPlayingArp
                ? 'border-blue-500 bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:border-neutral-400'
            }`}
          >
            {isPlayingArp ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingArp ? 'Stop Sequence' : 'Auto Arpeggio'}</span>
          </button>
        </div>
      </div>

      {/* Synth Controls Bar */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Waveform Selector */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
            <Waves className="w-3 h-3" /> Wave:
          </span>
          <div className="flex rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5">
            {(['sine', 'triangle', 'square'] as OscillatorType[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWaveform(w)}
                className={`px-3 py-1 rounded-md capitalize transition-all ${
                  waveform === w
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Decay / Sustain Time */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Release:</span>
          <div className="flex rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5">
            {[0.6, 1.2, 2.0].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setDecaySeconds(sec)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  decaySeconds === sec
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
