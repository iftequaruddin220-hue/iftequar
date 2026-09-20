import { CheckCircle2, Clock, GitBranch, Shield, Sparkles, Terminal, Video, ArrowUpRight } from 'lucide-react';

const PHASES = [
  {
    step: '01',
    phase: 'Discovery & Spec Lock',
    timeframe: 'Days 1 – 3',
    summary: 'Clear technical requirements, wireframe mapping, and architecture definition.',
    points: [
      'Problem breakdown and scope boundary definition',
      'Database schema & API contract specification',
      'Figma component inventory and UI token mapping',
      'Fixed milestone and timeline agreement',
    ],
  },
  {
    step: '02',
    phase: 'Interactive Staging Build',
    timeframe: 'Weeks 1 – 2',
    summary: 'A live, clickable prototype deployed on Vercel preview environments early.',
    points: [
      'Core responsive viewports & layout scaffolding',
      'Real interactions, state management, and routing',
      'Early access URL for asynchronous team testing',
      'Bi-weekly Loom walkthroughs demonstrating progress',
    ],
  },
  {
    step: '03',
    phase: 'Deep Engineering & Hardening',
    timeframe: 'Weeks 2 – 3',
    summary: 'Production backend connections, API resilience, and performance tuning.',
    points: [
      'Type-safe data fetching and optimistic UI patterns',
      'Lighthouse 99+ Core Web Vitals audit & zero layout shift',
      'Enterprise security, validation, and error boundaries',
      'Cross-device testing across iOS, Android, and desktop',
    ],
  },
  {
    step: '04',
    phase: 'Zero-Downtime Deployment',
    timeframe: 'Final Days',
    summary: 'Seamless production launch, DNS setup, and clean code handover.',
    points: [
      'Full GitHub repository transfer with documentation',
      'Custom domain & SSL certificate cutover on Edge CDN',
      'Recorded code walkthrough video for your team',
      '14-day complimentary post-launch warranty support',
    ],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'sprint',
    title: 'Fixed-Scope Sprint',
    bestFor: 'Founders launching an MVP, new landing page, or discrete feature module.',
    cadence: '2 – 6 Weeks',
    commitment: 'Milestone-based',
    features: [
      'Guaranteed scope & delivery deadline',
      'Fixed transparent pricing with no surprise overages',
      'Private live staging build updated every 48 hours',
      'Complete repository and asset ownership',
    ],
    highlight: true,
  },
  {
    id: 'fractional',
    title: 'Fractional Technical Lead',
    bestFor: 'Startups requiring senior engineering & architecture velocity without full-time overhead.',
    cadence: 'Monthly Retainer',
    commitment: '15 – 25 Hours / Week',
    features: [
      'Embedded directly in your Slack and GitHub',
      'Sprint planning, PR code reviews, and architecture decisions',
      'Hands-on full-stack TypeScript feature development',
      'Flexible week-to-week priority pivoting',
    ],
    highlight: false,
  },
  {
    id: 'audit',
    title: 'Rapid Architecture Audit',
    bestFor: 'Teams facing slow loading speeds, technical debt, or accessibility issues.',
    cadence: '5 Business Days',
    commitment: '1-Week Intensive',
    features: [
      'Lighthouse & Core Web Vitals telemetry audit',
      'Database query & bundle size optimization plan',
      'Actionable pull requests addressing critical leaks',
      'Prioritized 90-day technical roadmap',
    ],
    highlight: false,
  },
];

export default function ProcessWorkflow() {
  return (
    <div className="space-y-12">
      {/* 4-Phase Delivery Cadence */}
      <div>
        <div className="mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
            Execution Blueprint
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            How every project moves from brief to production
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
            A transparent, low-friction engineering process designed for high velocity, clear asynchronous communication, and zero surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map((p) => (
            <div
              key={p.step}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0e0e12] flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="font-bold text-neutral-950 dark:text-white text-base">
                    {p.step}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {p.timeframe}
                  </span>
                </div>
                <h4 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                  {p.phase}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                  {p.summary}
                </p>
              </div>

              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                {p.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-neutral-600 dark:text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Models */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80">
        <div className="mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
            Collaboration Tiers
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Flexible ways to collaborate
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Choose the engagement model that matches your team’s roadmap and operational speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.id}
              className={`p-7 rounded-2xl border flex flex-col justify-between transition-all ${
                model.highlight
                  ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-950/10 shadow-sm ring-1 ring-blue-500/30'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0e0e12]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                    {model.commitment}
                  </span>
                  {model.highlight && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-600 text-white">
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-display text-xl font-bold text-neutral-950 dark:text-white">
                    {model.title}
                  </h4>
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                    Typical Cadence: {model.cadence}
                  </div>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {model.bestFor}
                </p>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2">
                  {model.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    model.highlight
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200'
                      : 'border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500'
                  }`}
                >
                  <span>Select {model.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Strip */}
        <div className="mt-8 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0d] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <GitBranch className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-950 dark:text-white">Complete IP Ownership</div>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Every commit, Figma vector, and line of code belongs 100% to you under your GitHub organization.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Video className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-950 dark:text-white">Asynchronous First</div>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Detailed Loom video walkthroughs and staging links let you review progress on your schedule without meetings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-950 dark:text-white">14-Day Warranty</div>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Complimentary post-launch bug fixing and monitoring to guarantee a stable, uninterrupted rollout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
