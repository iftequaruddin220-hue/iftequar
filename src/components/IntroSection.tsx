export default function IntroSection() {
  return (
    <section className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Section Number Label */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block">
              01 / PERSPECTIVE
            </span>
          </div>

          {/* Statement & Philosophy Copy */}
          <div className="lg:col-span-9 space-y-8">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              I believe great technology should feel{' '}
              <span className="italic font-normal underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-8">
                simple.
              </span>
              <br />
              Behind every product is a problem worth{' '}
              <span className="italic font-normal text-neutral-500 dark:text-neutral-400">
                solving.
              </span>
            </h2>

            <div className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal space-y-4">
              <p>
                I bring together design, software engineering, and artificial intelligence to turn complex ideas into clear, useful digital experiences. From high-converting web platforms and enterprise applications to autonomous workflows, I focus on building technology that is purposeful, scalable, and built to deliver measurable value.
              </p>
              <p>
                Every project begins with radical clarity: understanding the actual friction, eliminating superfluous noise, and crafting interfaces that empower users effortlessly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
