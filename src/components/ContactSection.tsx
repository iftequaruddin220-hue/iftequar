import { useState, FormEvent } from 'react';
import { Send, Check, Copy, ArrowUpRight, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service: 'Full-Stack Web App',
    budget: '$5k – $10k',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [modeNote, setModeNote] = useState<string>('');

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    setModeNote('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        // Live production sending through EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            service_interest: formData.service,
            budget: formData.budget,
            message: formData.message,
            to_name: PERSONAL_INFO.name,
          },
          publicKey
        );
        setModeNote('Message sent directly to inbox via EmailJS.');
      } else {
        // Graceful client simulation with clear configuration instructions
        await new Promise((resolve) => setTimeout(resolve, 800));
        setModeNote('Demo simulation mode: Message recorded! To connect your personal EmailJS account, set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        service: 'Full-Stack Web App',
        budget: '$5k – $10k',
        message: '',
      });
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      setStatus('error');
      setErrorMessage(err?.text || `Failed to dispatch email. Please reach out directly to ${PERSONAL_INFO.email}.`);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80">
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
                  DIRECT EMAIL INBOX
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
                  {copied ? (
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
          </div>

          {/* Right Column: Contact Form with EmailJS Integration */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 shadow-xl">
              
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Powered by EmailJS integration. Messages deliver directly to my mailbox.
                </p>
              </div>

              {/* Success Notification */}
              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-sm">Inquiry Received Successfully</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-700 dark:text-emerald-400">
                    Thank you for getting in touch! I will review your project requirements and follow up within one business day.
                  </p>
                  {modeNote && (
                    <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400/90 pt-1 border-t border-emerald-500/20">
                      {modeNote}
                    </p>
                  )}
                  <div className="pt-2">
                    <button
                      onClick={() => setStatus('idle')}
                      type="button"
                      className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 text-emerald-800 dark:text-emerald-200"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Service & Budget Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-service" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        Service of Interest
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-sm transition-all"
                      >
                        <option value="Full-Stack Web App">Full-Stack Web Application</option>
                        <option value="KPI & Analytics Dashboard">KPI & Analytics Dashboard</option>
                        <option value="Product & UI/UX Design">Product & UI/UX Design</option>
                        <option value="AI & Intelligent Automation">AI & Intelligent Automation</option>
                        <option value="Design System & Architecture">Design System & Architecture</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-budget" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        Anticipated Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-sm transition-all"
                      >
                        <option value="< $5k">&lt; $5,000</option>
                        <option value="$5k – $10k">$5,000 – $10,000</option>
                        <option value="$10k – $25k">$10,000 – $25,000</option>
                        <option value="$25k+">$25,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Project Goals & Context *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell me a bit about the product you're building, key deadlines, or problems you're looking to resolve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-sm transition-all resize-y"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
