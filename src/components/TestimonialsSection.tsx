'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '@/lib/data';
import { Star, Sparkles, CheckCircle2, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [typedTitle, setTypedTitle] = useState('');
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fullTitle = 'Trusted by Enterprise Leaders';

  // Intersection Observer for scroll-triggered typewriter headline
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasScrolledIntoView) {
          setHasScrolledIntoView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasScrolledIntoView]);

  // Fast typewriter effect when scrolled into view
  useEffect(() => {
    if (!hasScrolledIntoView) return;

    let currentIndex = 0;
    setTypedTitle('');

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [hasScrolledIntoView]);

  const avatarGradients = [
    'from-amber-500 to-orange-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-10 bg-white dark:bg-[#060d1f] relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Client Endorsements</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center">
              <span>{typedTitle || (hasScrolledIntoView ? '' : fullTitle)}</span>
              <span className="inline-block w-1 h-5 sm:h-7 bg-orange-500 ml-1.5 animate-pulse" />
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">5.0 / 5.0</span>
            <span className="hidden sm:inline text-slate-400">• 100% Verified Delivery</span>
          </div>
        </div>

        {/* Compact, Sleek 3-Card Grid (Takes minimal space, looks ultra-clean) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {TESTIMONIALS.map((t, idx) => {
            const initials = t.author
              .split(' ')
              .map((n) => n[0])
              .join('');
            const gradient = avatarGradients[idx % avatarGradients.length];

            return (
              <div
                key={idx}
                className="group relative p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-[#0b152d] border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/50 shadow-xs hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Avatar + Author Info + Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${gradient} text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0`}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {t.author}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Compact Quote Text */}
                  <div className="relative pl-3 border-l-2 border-orange-500/40 my-2">
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Rating Stars footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">Sub-second Latency</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
