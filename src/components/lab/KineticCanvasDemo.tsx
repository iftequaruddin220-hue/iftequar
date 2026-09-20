import { useRef, useEffect, useState } from 'react';
import { RotateCcw, Sliders, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function KineticCanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<'attract' | 'repel' | 'drift'>('attract');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [particleDensity, setParticleDensity] = useState<'normal' | 'dense'>('normal');
  const [showConnections, setShowConnections] = useState<boolean>(true);

  // Mouse coords relative to canvas
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const count = particleDensity === 'normal' ? 45 : 85;

    const initParticles = (width: number, height: number) => {
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 1.8 + 1.2,
        });
      }
      particlesRef.current = arr;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // Render loop
    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(20, 20, 25, 0.75)';
      const connectionBase = isDark ? '255, 255, 255' : '20, 20, 25';

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectDist = 110;
      const interactDist = 140;

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Velocity update
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactDist && dist > 0) {
            const force = (interactDist - dist) / interactDist;
            const fx = (dx / dist) * force * 1.5;
            const fy = (dy / dist) * force * 1.5;

            if (mode === 'attract') {
              p.x += fx * 2.2;
              p.y += fy * 2.2;
            } else if (mode === 'repel') {
              p.x -= fx * 3;
              p.y -= fy * 3;
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect lines
        if (showConnections) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < connectDist) {
              const alpha = (1 - dist / connectDist) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${connectionBase}, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Connect to cursor if active
      if (mouse.active && showConnections) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
          if (dist < interactDist) {
            const alpha = (1 - dist / interactDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = isDark
              ? `rgba(96, 165, 250, ${alpha})`
              : `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Mouse focal ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mode === 'repel' ? 32 : 24, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, [mode, speedMultiplier, particleDensity, showConnections]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  const handleBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Add 8 burst particles
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const speed = Math.random() * 3 + 2;
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1.5,
      });
    }

    // Keep max particle bounds
    if (particlesRef.current.length > 120) {
      particlesRef.current.splice(0, particlesRef.current.length - 120);
    }
  };

  const handleReset = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const count = particleDensity === 'normal' ? 45 : 85;
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 1.8 + 1.2,
      });
    }
    particlesRef.current = arr;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Interactive Stage */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleBurst}
        className="relative w-full h-[380px] sm:h-[440px] rounded-2xl bg-neutral-100 dark:bg-[#070709] border border-neutral-200 dark:border-neutral-800 overflow-hidden cursor-crosshair select-none touch-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Tip overlay */}
        <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>Move cursor to attract / Click to spawn burst</span>
        </div>

        <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] font-mono text-neutral-400 dark:text-neutral-600">
          60 FPS · Vector Physics
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Interaction Mode */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Mode:</span>
          <div className="flex rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5">
            {(['attract', 'repel', 'drift'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-md capitalize transition-all ${
                  mode === m
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Speed:</span>
          <div className="flex rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 p-0.5">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  speedMultiplier === s
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Constellation Lines Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowConnections(!showConnections)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              showConnections
                ? 'border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
            }`}
          >
            Lines: {showConnections ? 'ON' : 'OFF'}
          </button>

          <button
            type="button"
            onClick={() => setParticleDensity(particleDensity === 'normal' ? 'dense' : 'normal')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition-all"
          >
            {particleDensity === 'normal' ? 'Dense (85)' : 'Light (45)'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset particles"
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
