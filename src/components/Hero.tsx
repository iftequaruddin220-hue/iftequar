import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Camera, Check, UploadCloud, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

const DYNAMIC_PHRASES = [
  'digital products.',
  'intelligent software.',
  'scalable web apps.',
  'purposeful systems.',
];

export default function Hero() {
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_photo');
      if (saved && saved.trim().length > 0) return saved;
    }
    return '/me-working.png';
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setPhotoSrc(dataUrl);
        setPhotoError(false);
        try {
          // Sync to server public/me-working.png so it is permanent on disk
          const resp = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl, filename: 'me-working.png' }),
          });
          const result = await resp.json();
          if (result.success && result.url) {
            setPhotoSrc(result.url);
            try {
              localStorage.setItem('user_photo', result.url);
            } catch {
              // Ignore quota errors
            }
          }
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
          console.error('Failed to sync avatar:', err);
          try {
            localStorage.setItem('user_photo', dataUrl);
          } catch {
            // Ignore quota errors
          }
        } finally {
          setIsUploading(false);
        }
      } else {
        setIsUploading(false);
      }
    };
    reader.onerror = () => setIsUploading(false);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <section
      id="top"
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

              {/* Image Container with Smooth Zoom, Drag & Drop, and Replacement Option */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative z-10 aspect-[4/3] rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900 border cursor-pointer group shadow-2xl transition-all duration-300 ${
                  isDragging
                    ? 'border-emerald-500 ring-4 ring-emerald-500/20 scale-[1.01]'
                    : 'border-neutral-200 dark:border-neutral-800'
                }`}
                title="Click or drag and drop to replace photo (me-working.png)"
              >
                {/* Hidden Native File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload photo"
                />

                {/* Visible Upload Photo Option Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  title="Upload or replace photo (persists across reloads)"
                  className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg text-xs font-mono bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md shadow-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  {isUploading ? (
                    <span className="animate-pulse text-amber-300">Uploading...</span>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-neutral-200" />
                      <span>Upload Photo</span>
                    </>
                  )}
                </button>

                {!photoError ? (
                  <>
                    <img
                      key={photoSrc}
                      src={photoSrc}
                      onError={() => {
                        // If custom URL fails, immediately fall back to /me-working.png
                        if (photoSrc !== '/me-working.png') {
                          setPhotoSrc('/me-working.png');
                          try {
                            localStorage.removeItem('user_photo');
                          } catch {
                            // ignore
                          }
                        } else {
                          setPhotoError(true);
                        }
                      }}
                      alt="Iftequaruddin — Digital Product Builder & Engineer at work"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                  </>
                ) : (
                  /* Elegant Interactive Placeholder Card if file not yet on disk */
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-[#08080a]">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-display text-2xl font-black mb-3 shadow-xl">
                      IA
                    </div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 mb-4">
                      Digital Product Builder
                    </p>

                    <div className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Select Photo</span>
                    </div>
                  </div>
                )}

                {/* Dragging Overlay */}
                {isDragging && (
                  <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 animate-in fade-in">
                    <UploadCloud className="w-10 h-10 text-emerald-400 mb-2 animate-bounce" />
                    <p className="text-sm font-bold">Drop your photo here</p>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">me-working.png</p>
                  </div>
                )}

                {/* Saved Notification */}
                {isSaved && (
                  <div className="absolute top-14 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-lg animate-in fade-in">
                    <Check className="w-3.5 h-3.5" />
                    <span>Photo Saved & Synced</span>
                  </div>
                )}

                {/* Hover Action Badge to Replace */}
                {!photoError && (
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono tracking-wider">
                    <Camera className="w-3 h-3" />
                    <span>Click to change</span>
                  </div>
                )}
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
    </section>
  );
}
