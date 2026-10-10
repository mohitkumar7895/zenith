'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TECH_STACK } from '@/lib/data';
import { Layers, Smartphone, Database, Server, Code2, Search, Cpu, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function TechStackSection() {
  // Removed 'All' tab, default to 'Frontend & Web'
  const [activeCategory, setActiveCategory] = useState<string>('Frontend & Web');
  const [searchQuery, setSearchQuery] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fullTitle = 'Battle-Tested Modern Stack';

  // Intersection Observer for scroll-triggered typewriter animation
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

  // Typewriter effect triggered once when scrolled into view
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
    }, 45);

    return () => clearInterval(typingInterval);
  }, [hasScrolledIntoView]);

  // Flatten all items
  const allItems = TECH_STACK.flatMap((g) =>
    g.items.map((item) => ({ ...item, categoryGroup: g.category }))
  );

  // Marquee highlights (distinct set of top tech across Web, App, Backend, DB & Cloud)
  const marqueeItemsRow1 = [
    { name: 'Next.js 16', tag: 'v16.4 Core', dot: 'bg-black dark:bg-white' },
    { name: 'Android Kotlin', tag: 'Native 2.0', dot: 'bg-green-500' },
    { name: 'MySQL Enterprise', tag: 'Primary RDBMS', dot: 'bg-amber-500' },
    { name: 'Flutter & Dart', tag: 'Multi-OS', dot: 'bg-sky-500' },
    { name: 'React 19', tag: 'Concurrent', dot: 'bg-cyan-500' },
    { name: 'TypeScript', tag: 'v5.6 Strict', dot: 'bg-blue-600' },
    { name: 'Node.js', tag: 'v22 LTS', dot: 'bg-emerald-500' },
    { name: 'Redis Cache', tag: 'In-Memory', dot: 'bg-red-500' },
  ];

  const marqueeItemsRow2 = [
    { name: 'React Native', tag: 'Mobile Cross', dot: 'bg-cyan-400' },
    { name: 'Python FastAPI', tag: 'Async Core', dot: 'bg-emerald-400' },
    { name: 'Jetpack Compose', tag: 'Modern UI', dot: 'bg-green-600' },
    { name: 'PHP 8.3 & Laravel 11', tag: 'Enterprise MVC', dot: 'bg-red-600' },
    { name: 'AWS Cloud (EC2/RDS)', tag: 'Cloud Leader', dot: 'bg-orange-500' },
    { name: 'PostgreSQL 16', tag: 'ACID RDBMS', dot: 'bg-blue-400' },
    { name: 'Play Store Launch', tag: 'Production APK', dot: 'bg-amber-500' },
    { name: 'Cloudflare CDN', tag: 'Edge WAF', dot: 'bg-amber-600' },
  ];

  const categories = [
    { name: 'Frontend & Web', label: 'Web & UI', icon: Layers },
    { name: 'App Development', label: 'App Development', icon: Smartphone },
    { name: 'Backend & APIs', label: 'Backend & APIs', icon: Code2 },
    { name: 'Databases & Storage', label: 'Databases & Storage', icon: Database },
    { name: 'DevOps, Cloud & Growth', label: 'Cloud & DevOps', icon: Server },
  ];

  // Filter items
  const filteredItems = allItems.filter((item) => {
    const matchesCategory = searchQuery.trim() ? true : item.categoryGroup === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="py-8 sm:py-10 bg-[#f8fafc] dark:bg-[#070e22] relative overflow-hidden transition-colors duration-300"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 dark:bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header with Typewriter Headline */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span>Modern Tech Infrastructure</span>
          </div>

          {/* Typewriter Title */}
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight min-h-[44px] flex items-center justify-center">
            <span>{typedTitle || (hasScrolledIntoView ? '' : fullTitle)}</span>
            <span className="inline-block w-1 h-6 sm:h-9 bg-orange-500 ml-1.5 animate-pulse" />
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
            Fast, secure, enterprise-grade frameworks selected for high concurrency, mobile scalability, and sub-second speed.
          </p>
        </div>

        {/* ALAG TARIKE SE: Infinite Flowing Marquee Ribbons (Smooth Animated Ticker) */}
        <div className="relative overflow-hidden mb-8 py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Row 1 - Flowing Left */}
          <div className="animate-marquee-left gap-3 mb-3">
            {[...marqueeItemsRow1, ...marqueeItemsRow1].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800/80 shadow-xs hover:border-orange-500/50 transition-all shrink-0 cursor-default"
              >
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 - Flowing Right */}
          <div className="animate-marquee-right gap-3">
            {[...marqueeItemsRow2, ...marqueeItemsRow2].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800/80 shadow-xs hover:border-orange-500/50 transition-all shrink-0 cursor-default"
              >
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls: Category Tabs (No 'All' tab) + Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* Category Chips with Icons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = activeCategory === cat.name && !searchQuery.trim();

              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                      : 'bg-white dark:bg-[#0b152d] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800/80 shadow-2xs'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. android, mysql)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Compact Tech Grid: Small boxes with blue point right in front of name */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5">
          {filteredItems.map((tech, idx) => (
            <div
              key={idx}
              className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#091226] border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/60 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-2 group cursor-default"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform shadow-sm shadow-blue-500/50" />
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                  {tech.name}
                </span>
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 shrink-0">
                {tech.version.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
