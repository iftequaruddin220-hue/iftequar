import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/portfolioData';
import { sectionFadeIn } from '../lib/animations';

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <motion.section
      id="services"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-3">
              04 / CAPABILITIES & SERVICES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              From a blank page <br />
              <span className="italic font-normal">to something that works.</span>
            </h2>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-sm font-normal leading-relaxed">
            I bring strategy, design, engineering, and intelligent automation together to build digital solutions around the way your business actually operates.
          </p>
        </div>

        {/* Services List with Expandable Deliverables */}
        <div className="border-t border-neutral-200 dark:border-neutral-800">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={service.number}
                className="border-b border-neutral-200 dark:border-neutral-800 transition-colors"
              >
                <div
                  onClick={() => toggleExpand(index)}
                  className="py-8 sm:py-10 grid grid-cols-12 gap-4 sm:gap-6 items-center cursor-pointer group hover:px-3 sm:hover:px-4 transition-all duration-300 rounded-lg"
                >
                  {/* Service Number */}
                  <div className="col-span-2 sm:col-span-1 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                    {service.number}
                  </div>

                  {/* Title */}
                  <div className="col-span-10 sm:col-span-5">
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Brief Description */}
                  <div className="hidden sm:block sm:col-span-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {service.description}
                  </div>

                  {/* Icon Indicator */}
                  <div className="hidden sm:flex sm:col-span-1 justify-end text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-blue-500' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Deliverables Drawer */}
                {isExpanded && (
                  <div className="pb-8 pt-2 px-4 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
                    {service.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800"
                      >
                        <span className="font-mono text-[10px] text-neutral-400 block mb-1">
                          0{dIdx + 1}
                        </span>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-200">
                          {del}
                        </p>
                      </div>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-4 pt-2">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Discuss this capability for your project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
