import { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowUpRight, X, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/portfolioData';
import { sectionFadeIn, cardFadeIn } from '../lib/animations';

export default function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (post: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#blog-${post.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.section
      id="blog"
      {...sectionFadeIn}
      className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                03 / INSIGHTS & WRITING
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              Design Process & <br />
              <span className="italic font-normal">Technical Insights.</span>
            </h2>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-sm font-normal leading-relaxed">
            Notes and practical teardowns on design systems, high-density analytics, and modern AI application engineering.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              {...cardFadeIn(index)}
              onClick={() => setActiveArticle(post)}
              className="group cursor-pointer rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0f] p-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Meta row */}
                <div className="flex items-center justify-between font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold bg-neutral-200/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              </div>

              {/* Read Article Trigger */}
              <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                <span className="group-hover:underline underline-offset-4">Read Article</span>
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-950 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =========================================================
            ARTICLE FULL READER MODAL
           ========================================================= */}
        {activeArticle && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f0f12] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-12 text-neutral-900 dark:text-neutral-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                type="button"
                aria-label="Close article"
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Article Meta Header */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                <span className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 uppercase font-semibold text-neutral-800 dark:text-neutral-200">
                  {activeArticle.category}
                </span>
                <span>{activeArticle.date}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              {/* Title */}
              <h2
                id="article-modal-title"
                className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-6 leading-tight"
              >
                {activeArticle.title}
              </h2>

              {/* Excerpt Lead */}
              <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border-l-4 border-neutral-900 dark:border-white mb-8 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-medium italic">
                "{activeArticle.excerpt}"
              </div>

              {/* Article Body */}
              <div className="space-y-5 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Author byline and share */}
              <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Written by Iftequaruddin
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Digital Products · Software Engineering · AI
                  </p>
                </div>

                <button
                  onClick={() => handleShare(activeArticle)}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </motion.section>
  );
}
