import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Theme } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  theme?: Theme;
  toggleTheme?: () => void;
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Insights', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060607]/85 dark:bg-[#060607]/85 bg-white/90 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 group focus:outline-none"
          aria-label={`${PERSONAL_INFO.name} — Back to top`}
        >
          <span className="font-display text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span
            className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)] group-hover:scale-125 transition-transform"
            title="Available for new projects"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-8"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs font-semibold uppercase tracking-widest transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-neutral-900 dark:text-white font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Start Conversation CTA */}
          <a
            href="#contact"
            id="header-start-conversation-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            id="mobile-menu-toggle-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
