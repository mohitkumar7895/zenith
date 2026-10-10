'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProcessSection() {
  const { openConsultationModal } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0.3);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      num: '01',
      title: 'Discovery & Strategic Architecture',
      pills: ['Brand Audit', 'Market Research', 'Competitive Analysis', 'Strategic Roadmap'],
      desc: 'System architecture discovery, MySQL database indexing blueprint, and end-to-end technical roadmap.',
      metric: 'Day 1-4 Architecture Plan',
    },
    {
      num: '02',
      title: 'UX/UI Prototyping & Design Systems',
      pills: ['Wireframes', 'Hi-Fi Prototypes', 'Design System', 'Interaction Specs'],
      desc: 'Modern component tokens, responsive UI layout engineering, and frictionless conversion journey mapping.',
      metric: 'Interactive Prototype Ready',
    },
    {
      num: '03',
      title: 'Full-Stack Agile Engineering',
      pills: ['Sprint Planning', 'CI/CD Pipeline', 'API Integration', 'Performance Audits'],
      desc: 'High-throughput Next.js 16 code, sub-12ms MySQL telemetry queries, and automated testing pipelines.',
      metric: '100% Type-Safe Codebase',
    },
    {
      num: '04',
      title: 'Quality Assurance, Launch & Scaling',
      pills: ['QA Testing', 'SEO Optimisation', 'Live Deployment', 'Growth Analytics'],
      desc: 'Automated end-to-end QA, Core Web Vitals 99+ score, Cloudflare edge security, and zero-downtime cutover.',
      metric: '99.99% Production Uptime',
    },
  ];

  const [typedTitle, setTypedTitle] = useState('');
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  const fullTitle = 'How We Deliver: Predictable Engineering';

  // Intersection observer for heading walk-in
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

  // Scroll listener to update line flow and active step smoothly as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of section through the viewport
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);

      // Dynamically activate step based on scroll depth
      if (progress < 0.25) {
        setActiveStep(0);
      } else if (progress < 0.5) {
        setActiveStep(1);
      } else if (progress < 0.75) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-8 sm:py-10 bg-white dark:bg-[#060d1f] relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient background glow (no harsh lines) */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Delivery Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight flex items-center justify-center min-h-[48px] sm:min-h-[60px]">
            <span>{typedTitle || (hasScrolledIntoView ? '' : fullTitle)}</span>
            <span className="inline-block w-1 h-7 sm:h-10 bg-orange-500 ml-1.5 animate-pulse" />
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
            Scroll to follow our live engineering telemetry. Every milestone connects directly into production deployment.
          </p>
        </div>

        {/* Seamless Unified Interactive Pipeline: Left Cards flowing directly into Right SVG Telemetry Hub (Side-by-Side on Mobile & Desktop) */}
        <div className="grid grid-cols-12 gap-2 xs:gap-3 sm:gap-6 lg:gap-8 items-center">
          {/* LEFT: 4 Connected Milestone Cards (7 cols on mobile, 6 cols on tablet/desktop) */}
          <div className="col-span-7 sm:col-span-6 space-y-1.5 xs:space-y-2 sm:space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative p-2 xs:p-2.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-amber-50/60 dark:bg-[#0d1a38] border-2 border-[#ea580c] shadow-md shadow-orange-500/10 scale-[1.01]'
                      : 'bg-slate-50/80 dark:bg-[#081126] border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-1.5 xs:gap-2.5 sm:gap-5">
                    {/* Step Number */}
                    <span
                      className={`text-base xs:text-lg sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-mono transition-colors duration-200 shrink-0 ${
                        isActive
                          ? 'text-[#ea580c] dark:text-[#ea580c]'
                          : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400'
                      }`}
                    >
                      {step.num}
                    </span>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-[11px] xs:text-xs sm:text-base lg:text-lg font-bold transition-colors leading-tight line-clamp-2 ${
                            isActive
                              ? 'text-slate-900 dark:text-white font-extrabold'
                              : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Live Step Badge (Desktop) */}
                        {isActive && (
                          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100/80 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-300 dark:border-orange-800 shrink-0 ml-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                            Active Flow
                          </span>
                        )}
                      </div>

                      {/* Pill Tags: 2 compact pills on mobile, all pills on tablet/desktop */}
                      <div className="mt-1 xs:mt-1.5 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                        {step.pills.slice(0, 2).map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full text-[8.5px] xs:text-[9.5px] sm:text-xs font-semibold leading-none transition-all ${
                              isActive
                                ? 'bg-orange-100/90 dark:bg-orange-950/60 text-[#ea580c] dark:text-orange-300 border border-orange-300 dark:border-orange-500/40'
                                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/70 dark:border-slate-800'
                            }`}
                          >
                            {pill}
                          </span>
                        ))}
                        {step.pills.slice(2).map((pill, pIdx) => (
                          <span
                            key={pIdx + 2}
                            className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                              isActive
                                ? 'bg-orange-100/90 dark:bg-orange-950/60 text-[#ea580c] dark:text-orange-300 border border-orange-300 dark:border-orange-500/40'
                                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/70 dark:border-slate-800'
                            }`}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: High-Tech Telemetry Flow Canvas & Production Launch Engine (5 cols on mobile, 6 cols on tablet/desktop) */}
          <div className="col-span-5 sm:col-span-6 relative w-full h-[280px] xs:h-[310px] sm:h-[440px] lg:h-[500px] flex items-center justify-center select-none">
            {/* MOBILE TELEMETRY CANVAS (viewBox 0 0 250 500 - Perfectly aligned face-to-face with cards) */}
            <svg
              className="block sm:hidden w-full h-full overflow-visible"
              viewBox="0 0 250 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="telemetry-glow-mobile" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base Static Guide Tracks */}
              <path d="M 0 65 C 65 70, 130 180, 190 250" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1.5" fill="none" />
              <path d="M 0 185 C 65 190, 130 220, 190 250" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1.5" fill="none" />
              <path d="M 0 305 C 65 300, 130 270, 190 250" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1.5" fill="none" />
              <path d="M 0 425 C 65 410, 130 310, 190 250" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1.5" fill="none" />

              {/* CONTINUOUS FLOWING ANIMATED DASHED LINES */}
              <path
                d="M 0 65 C 65 70, 130 180, 190 250"
                stroke={activeStep === 0 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 0 ? '3.5' : '1.8'}
                strokeOpacity={activeStep === 0 ? '1' : '0.45'}
                className={activeStep === 0 ? 'flowing-line-active' : 'flowing-line-slow'}
                fill="none"
                filter={activeStep === 0 ? 'url(#telemetry-glow-mobile)' : undefined}
              />
              <path
                d="M 0 185 C 65 190, 130 220, 190 250"
                stroke={activeStep === 1 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 1 ? '3.5' : '1.8'}
                strokeOpacity={activeStep === 1 ? '1' : '0.45'}
                className={activeStep === 1 ? 'flowing-line-active' : 'flowing-line-medium'}
                fill="none"
                filter={activeStep === 1 ? 'url(#telemetry-glow-mobile)' : undefined}
              />
              <path
                d="M 0 305 C 65 300, 130 270, 190 250"
                stroke={activeStep === 2 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 2 ? '3.5' : '1.8'}
                strokeOpacity={activeStep === 2 ? '1' : '0.45'}
                className={activeStep === 2 ? 'flowing-line-active' : 'flowing-line-fast'}
                fill="none"
                filter={activeStep === 2 ? 'url(#telemetry-glow-mobile)' : undefined}
              />
              <path
                d="M 0 425 C 65 410, 130 310, 190 250"
                stroke={activeStep === 3 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 3 ? '3.5' : '1.8'}
                strokeOpacity={activeStep === 3 ? '1' : '0.45'}
                className={activeStep === 3 ? 'flowing-line-active' : 'flowing-line-medium'}
                fill="none"
                filter={activeStep === 3 ? 'url(#telemetry-glow-mobile)' : undefined}
              />

              {/* Dynamic Traveling Comet Heads */}
              <circle r="3.5" fill="#ffffff" stroke="#ea580c" strokeWidth="2" filter="url(#telemetry-glow-mobile)">
                <animateMotion
                  path={
                    activeStep === 0
                      ? 'M 0 65 C 65 70, 130 180, 190 250'
                      : activeStep === 1
                      ? 'M 0 185 C 65 190, 130 220, 190 250'
                      : activeStep === 2
                      ? 'M 0 305 C 65 300, 130 270, 190 250'
                      : 'M 0 425 C 65 410, 130 310, 190 250'
                  }
                  dur="1.7s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="2.5" fill="#fb923c" opacity="0.8">
                <animateMotion
                  path="M 0 305 C 65 300, 130 270, 190 250"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Central Mobile Launch Engine Hub */}
              <g transform="translate(190, 250)">
                <circle r="44" stroke="#ea580c" strokeOpacity="0.15" strokeWidth="1.2" strokeDasharray="4 4" />
                <circle r="30" stroke="#ea580c" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '24s' }} />
                <circle r="20" fill="#ea580c" fillOpacity="0.1" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle r="14" fill="#ea580c" fillOpacity="0.2" />
                <circle r="9" fill="#ea580c" filter="url(#telemetry-glow-mobile)" />
                <circle r="3.5" fill="#ffffff" />
                <g className="animate-spin" style={{ animationDuration: '10s' }}>
                  <circle cx="30" cy="0" r="2.5" fill="#ea580c" />
                  <circle cx="-30" cy="0" r="2" fill="#f59e0b" />
                </g>
              </g>

              {/* Forward Cloud Line */}
              <line x1="190" y1="250" x2="242" y2="250" stroke="#ea580c" strokeWidth="2" strokeDasharray="5 4" className="flowing-line-fast" />
              <circle cx="242" cy="250" r="3.5" fill="#10b981" />
            </svg>

            {/* DESKTOP TELEMETRY CANVAS (viewBox 0 0 540 500) */}
            <svg
              className="hidden sm:block w-full h-full overflow-visible"
              viewBox="0 0 540 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Intense Orange Glow Filter */}
                <filter id="telemetry-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base Static Guide Tracks (Connecting directly from card outputs) */}
              <path
                d="M 0 65 C 160 70, 310 180, 430 250"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 0 185 C 160 190, 310 220, 430 250"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 0 305 C 160 300, 310 270, 430 250"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 0 425 C 160 410, 310 310, 430 250"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1.5"
                fill="none"
              />

              {/* CONTINUOUS FLOWING ANIMATED DASHED LINES */}
              {/* Path 1 */}
              <path
                d="M 0 65 C 160 70, 310 180, 430 250"
                stroke={activeStep === 0 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 0 ? '4' : '2'}
                strokeOpacity={activeStep === 0 ? '1' : '0.45'}
                className={activeStep === 0 ? 'flowing-line-active' : 'flowing-line-slow'}
                fill="none"
                filter={activeStep === 0 ? 'url(#telemetry-glow)' : undefined}
              />

              {/* Path 2 */}
              <path
                d="M 0 185 C 160 190, 310 220, 430 250"
                stroke={activeStep === 1 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 1 ? '4' : '2'}
                strokeOpacity={activeStep === 1 ? '1' : '0.45'}
                className={activeStep === 1 ? 'flowing-line-active' : 'flowing-line-medium'}
                fill="none"
                filter={activeStep === 1 ? 'url(#telemetry-glow)' : undefined}
              />

              {/* Path 3 */}
              <path
                d="M 0 305 C 160 300, 310 270, 430 250"
                stroke={activeStep === 2 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 2 ? '4' : '2'}
                strokeOpacity={activeStep === 2 ? '1' : '0.45'}
                className={activeStep === 2 ? 'flowing-line-active' : 'flowing-line-fast'}
                fill="none"
                filter={activeStep === 2 ? 'url(#telemetry-glow)' : undefined}
              />

              {/* Path 4 */}
              <path
                d="M 0 425 C 160 410, 310 310, 430 250"
                stroke={activeStep === 3 ? '#ea580c' : '#f97316'}
                strokeWidth={activeStep === 3 ? '4' : '2'}
                strokeOpacity={activeStep === 3 ? '1' : '0.45'}
                className={activeStep === 3 ? 'flowing-line-active' : 'flowing-line-medium'}
                fill="none"
                filter={activeStep === 3 ? 'url(#telemetry-glow)' : undefined}
              />

              {/* Dynamic Traveling Comet Heads */}
              <circle r="4.5" fill="#ffffff" stroke="#ea580c" strokeWidth="2.5" filter="url(#telemetry-glow)">
                <animateMotion
                  path={
                    activeStep === 0
                      ? 'M 0 65 C 160 70, 310 180, 430 250'
                      : activeStep === 1
                      ? 'M 0 185 C 160 190, 310 220, 430 250'
                      : activeStep === 2
                      ? 'M 0 305 C 160 300, 310 270, 430 250'
                      : 'M 0 425 C 160 410, 310 310, 430 250'
                  }
                  dur="1.7s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="3" fill="#fb923c" opacity="0.8">
                <animateMotion
                  path="M 0 305 C 160 300, 310 270, 430 250"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* CENTRAL PRODUCTION DEPLOYMENT & SCALING ENGINE */}
              <g transform="translate(430, 250)">
                {/* Outer concentric telemetry radar rings */}
                <circle r="60" stroke="#ea580c" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="6 6" />
                <circle r="42" stroke="#ea580c" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '24s' }} />
                
                {/* Pulsing Beacon Waves */}
                <circle r="30" fill="#ea580c" fillOpacity="0.1" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle r="22" fill="#ea580c" fillOpacity="0.2" />

                {/* Core Production Node */}
                <circle r="14" fill="#ea580c" filter="url(#telemetry-glow)" />
                <circle r="6" fill="#ffffff" />

                {/* Orbiting Telemetry Satellites */}
                <g className="animate-spin" style={{ animationDuration: '10s' }}>
                  <circle cx="42" cy="0" r="3.5" fill="#ea580c" />
                  <circle cx="-42" cy="0" r="2.5" fill="#f59e0b" />
                </g>
              </g>

              {/* Horizontal forward pipeline to Global Cloud */}
              <line x1="430" y1="250" x2="520" y2="250" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="8 6" className="flowing-line-fast" />
              <circle cx="520" cy="250" r="5" fill="#10b981" />
            </svg>


          </div>
        </div>
      </div>
    </section>
  );
}
