import { useState, useMemo } from 'react';
import { Sparkles, Check, Copy, ArrowRight, ArrowUpRight, Cpu, Clock, Layers, ShieldCheck, Zap } from 'lucide-react';
import { SERVICES, PERSONAL_INFO } from '../../data/portfolioData';

interface AddonOption {
  id: string;
  label: string;
  category: string;
  description: string;
  icon: typeof Zap;
  timelineDays: number;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'edge-perf',
    label: '99+ PageSpeed & Edge Optimization',
    category: 'Performance',
    description: 'Sub-second first contentful paint with Vercel Edge caching and zero layout shift.',
    icon: Zap,
    timelineDays: 3,
  },
  {
    id: 'ai-agent',
    label: 'Autonomous AI Agent Workflows',
    category: 'AI & Systems',
    description: 'LLM tool calling, deterministic validation guards, and automated background tasks.',
    icon: Cpu,
    timelineDays: 5,
  },
  {
    id: 'design-system',
    label: 'Tailored Figma Design System',
    category: 'Design',
    description: 'Tokenized UI kit with accessible contrast, typography rules, and component states.',
    icon: Layers,
    timelineDays: 4,
  },
  {
    id: 'payments',
    label: 'Stripe Payments & Checkout',
    category: 'Commerce',
    description: 'Frictionless checkout, webhook event handling, and PCI-compliant transaction flow.',
    icon: ShieldCheck,
    timelineDays: 3,
  },
  {
    id: 'analytics',
    label: 'Telemetry & KPI Telemetry Dashboard',
    category: 'Data',
    description: 'Real-time charts, conversion tracking, and structured audit event logging.',
    icon: Layers,
    timelineDays: 4,
  },
  {
    id: 'mobile-pwa',
    label: 'Mobile PWA & Touch Micro-Interactions',
    category: 'Mobile UX',
    description: 'Offline-ready asset caching, fluid sheet drawers, and 60fps spring animations.',
    icon: Sparkles,
    timelineDays: 4,
  },
];

const STAGE_OPTIONS = [
  { id: 'greenfield', label: 'From Scratch', sub: 'New idea / blank page', baseWeeks: 3 },
  { id: 'figma-ready', label: 'Designs Ready', sub: 'Figma files exist', baseWeeks: 2.5 },
  { id: 'rebuild-scale', label: 'Rebuild / Scale', sub: 'Modernizing legacy code', baseWeeks: 4 },
];

export default function ProjectEstimator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0]?.number || '01');
  const [selectedStage, setSelectedStage] = useState<string>('greenfield');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['edge-perf', 'design-system']);
  const [copiedScope, setCopiedScope] = useState<boolean>(false);

  const currentService = SERVICES.find((s) => s.number === selectedServiceId) || SERVICES[0];
  const currentStage = STAGE_OPTIONS.find((s) => s.id === selectedStage) || STAGE_OPTIONS[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate scope timeline estimate
  const estimation = useMemo(() => {
    let totalDays = currentStage.baseWeeks * 5;
    selectedAddons.forEach((addonId) => {
      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
      if (addon) totalDays += addon.timelineDays;
    });

    const calculatedWeeks = Math.max(2, Math.round((totalDays / 5) * 10) / 10);
    const sprintCount = Math.ceil(calculatedWeeks / 2);

    // Recommended architecture based on choices
    const stack: string[] = ['React 19 / TypeScript', 'Tailwind CSS'];
    if (selectedAddons.includes('edge-perf')) stack.push('Vercel Edge / CDN');
    if (selectedAddons.includes('ai-agent')) stack.push('Gemini AI Models');
    if (selectedAddons.includes('payments')) stack.push('Stripe Elements');
    if (selectedAddons.includes('analytics')) stack.push('Recharts / PostgreSQL');
    if (selectedServiceId === '03' || selectedServiceId === '04') stack.push('Node.js / Cloud Run');

    return {
      weeks: calculatedWeeks,
      sprints: sprintCount,
      stack,
      addonObjects: ADDON_OPTIONS.filter((a) => selectedAddons.includes(a.id)),
    };
  }, [currentStage, selectedAddons, selectedServiceId]);

  // Plain-text formatted scope brief
  const scopeBrief = useMemo(() => {
    return [
      `PROJECT SCOPE ESTIMATE`,
      `Service: ${currentService.title}`,
      `Stage: ${currentStage.label} (${currentStage.sub})`,
      `Estimated Cadence: ~${estimation.weeks} Weeks (${estimation.sprints} Sprints)`,
      `Recommended Architecture: ${estimation.stack.join(', ')}`,
      `Selected Capabilities:`,
      ...estimation.addonObjects.map((a) => `  • ${a.label} (${a.category})`),
      `Deliverables Included:`,
      ...currentService.deliverables.map((d) => `  • ${d}`),
    ].join('\n');
  }, [currentService, currentStage, estimation]);

  const handleCopyScope = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(scopeBrief);
      setCopiedScope(true);
      setTimeout(() => setCopiedScope(false), 2500);
    }
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(`Project Scoping Inquiry: ${currentService.title}`);
    const body = encodeURIComponent(
      `Hi Iftequaruddin,\n\nI used your interactive project scoping tool and would like to discuss building our project with this scope:\n\n${scopeBrief}\n\nLooking forward to speaking with you!\n\nBest,\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-xs">
      {/* Tool Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Scoping Engine</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Estimate your project timeline & architecture
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Select your project requirements to calculate estimated sprint milestones, recommended modern tech stack, and deliverable commitments in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyScope}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer"
            title="Copy structured scope brief to clipboard"
          >
            {copiedScope ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScope ? 'Scope Copied' : 'Copy Scope Brief'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              Step 1 · Select Primary Capability
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SERVICES.map((service) => {
                const isSelected = selectedServiceId === service.number;
                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => setSelectedServiceId(service.number)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-neutral-950 dark:text-white ring-1 ring-blue-500'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121216] text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-400">{service.number}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {service.category}
                      </span>
                    </div>
                    <div className="font-semibold text-sm line-clamp-1">{service.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Starting State */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              Step 2 · Project Stage
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {STAGE_OPTIONS.map((stg) => {
                const isSelected = selectedStage === stg.id;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setSelectedStage(stg.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-neutral-950 dark:text-white ring-1 ring-blue-500'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121216] text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-950 dark:text-white mb-0.5">{stg.label}</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{stg.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Capabilities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Step 3 · Architecture Add-ons & Focus Areas
              </label>
              <span className="text-xs font-mono text-neutral-400">
                {selectedAddons.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDON_OPTIONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                const Icon = addon.icon;
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? 'border-neutral-400 dark:border-neutral-600 bg-white dark:bg-[#141419] shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#101014]/60 opacity-75 hover:opacity-100 hover:border-neutral-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-blue-600 text-white'
                          : 'border border-neutral-300 dark:border-neutral-700 bg-transparent'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                          {addon.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Scope Output Blueprint */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121217] p-6 sm:p-7 shadow-sm space-y-6">
            
            {/* Estimate Summary Header */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
                Generated Assessment
              </span>
              <h4 className="text-lg font-bold text-neutral-950 dark:text-white">
                {currentService.title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Tailored delivery blueprint based on your selected requirements.
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-neutral-100 dark:border-neutral-800/80">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Estimated Delivery</span>
                </span>
                <div className="font-display text-xl font-bold text-neutral-950 dark:text-white">
                  ~{estimation.weeks} Weeks
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {estimation.sprints} Agile Sprints
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Target SLA</span>
                </span>
                <div className="font-display text-xl font-bold text-neutral-950 dark:text-white">
                  {currentService.impactMetric?.value || '99+ Score'}
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {currentService.impactMetric?.label || 'Quality Benchmark'}
                </span>
              </div>
            </div>

            {/* Recommended Modern Tech Stack */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Recommended Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {estimation.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Core Deliverables
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-normal">
                {currentService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions: Start conversation with this scope */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleOpenMailto}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <span>Draft Inquiry with this Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                <span>Or use the on-page composer below</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
