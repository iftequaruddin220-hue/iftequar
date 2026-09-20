import { useState } from 'react';
import { Send, Check, Copy, ArrowUpRight, Mail, MapPin, Clock, Sparkles, MessageSquare, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sectionFadeIn } from '../lib/animations';

interface TemplateOption {
  id: string;
  title: string;
  subject: string;
  defaultMessage: string;
}

const INQUIRY_TEMPLATES: TemplateOption[] = [
  {
    id: 'project',
    title: 'New Web App / Project',
    subject: 'Project Inquiry: New Application Build',
    defaultMessage: `Hi Iftequaruddin,\n\nI have a project in mind and would love to discuss your availability for development:\n\n- Project Overview:\n- Timeline / Deadline:\n- Approximate Budget:\n\nLooking forward to speaking with you!`,
  },
  {
    id: 'design',
    title: 'Product & UI/UX Design',
    subject: 'Design Inquiry: Product & UI/UX Systems',
    defaultMessage: `Hi Iftequaruddin,\n\nWe are looking to design or overhaul our product interface and would like to explore collaborating:\n\n- Scope of Work:\n- Existing Product / Links:\n\nBest regards,`,
  },
  {
    id: 'chat',
    title: 'Intro & Advisory',
    subject: 'Introduction: Potential Collaboration',
    defaultMessage: `Hi Iftequaruddin,\n\nI reviewed your portfolio and would like to connect for a quick discussion regarding upcoming opportunities.\n\nBest,`,
  },
];

export default function ContactSection() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('project');
  const [senderName, setSenderName] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const activeTemplate = INQUIRY_TEMPLATES.find((t) => t.id === selectedTemplateId) || INQUIRY_TEMPLATES[0];

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  // Generate mailto link with encoded subject and pre-composed message
  const getMailtoUrl = () => {
    const subject = encodeURIComponent(activeTemplate.subject);
    const bodyContent = customNotes.trim()
      ? `Hi Iftequaruddin,\n\n${customNotes}\n\nBest,\n${senderName || 'Your Name'}`
      : activeTemplate.defaultMessage;
    const body = encodeURIComponent(bodyContent);
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    const bodyContent = customNotes.trim()
      ? `Subject: ${activeTemplate.subject}\n\nHi Iftequaruddin,\n\n${customNotes}\n\nBest,\n${senderName || 'Your Name'}`
      : `Subject: ${activeTemplate.subject}\n\n${activeTemplate.defaultMessage}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(bodyContent);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    }
  };

  return (
    <motion.section
      id="contact"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Heading & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-3">
                06 / CONTACT & INQUIRIES
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.05]">
                Have a problem <br />
                worth <span className="italic font-normal">solving?</span>
              </h2>
            </div>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Whether you are starting from an exploratory napkin sketch, modernizing an enterprise analytics portal, or integrating autonomous AI workflows, let's talk through your vision.
            </p>

            {/* Direct Email Action Card */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  DIRECT INBOX
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Avg reply &lt; 24h
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors flex-shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>IST (UTC +5:30)</span>
                </div>
              </div>
            </div>

            {/* Direct Social Network Links */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] text-neutral-800 dark:text-neutral-200 hover:border-blue-500 transition-all text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 transition-all text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Easy 1-Click Direct Inquiry Composer */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Instant Direct Communication</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                  Start an Inquiry in 1 Click
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Choose a project topic below. Launches directly in your email app with formatted subject & notes — no signup or forms required.
                </p>
              </div>

              {/* Step 1: Select Inquiry Template */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Select Topic:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {INQUIRY_TEMPLATES.map((tmpl) => {
                    const isSelected = tmpl.id === selectedTemplateId;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplateId(tmpl.id)}
                        className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {tmpl.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Optional Custom Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="composer-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Your Name / Company (Optional)
                    </label>
                    <input
                      id="composer-name"
                      type="text"
                      placeholder="e.g. Alex at Acme Corp"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-xs sm:text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="composer-subject" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Email Subject
                    </label>
                    <input
                      id="composer-subject"
                      type="text"
                      readOnly
                      value={activeTemplate.subject}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 text-xs font-mono select-all cursor-default"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="composer-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Message Notes / Details (Optional)
                  </label>
                  <textarea
                    id="composer-message"
                    rows={4}
                    placeholder={activeTemplate.defaultMessage}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-xs sm:text-sm transition-all resize-y font-mono"
                  />
                </div>
              </div>

              {/* Action Buttons: Launch in Mail Client or Copy Formatted Draft */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getMailtoUrl()}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch in Email App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all shadow-xs"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Draft Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>

              {/* Footer reassurance note */}
              <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-blue-500" />
                  <span>Delivers directly to {PERSONAL_INFO.email}</span>
                </span>
                <span>Zero third-party setup needed</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
