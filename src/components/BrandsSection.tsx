'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';

interface BrandItem {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  category?: string;
}

const FALLBACK_BRANDS: BrandItem[] = [
  {
    id: 10,
    name: 'Jan Seva Portal',
    description:
      'A Digital Jan Seva & E-Governance Portal providing citizens with easy access to government services, online documentation, certificates, Aadhaar, PAN, bill payments, and public welfare schemes all in one place.',
    category: 'E-Governance',
    websiteUrl: 'https://www.jan-seva.site/',
    logoUrl: '/uploads/jan-seva-logo-1791908116145.png',
  },
  {
    id: 11,
    name: 'Repnexa',
    description:
      'Repnexa is a smart service booking platform connecting customers with trusted professionals for AC, Washing Machine, Refrigerator, Mobile, Laptop, CCTV and other repair services. Join as a service partner, receive customer leads, grow your business and earn more.',
    category: 'Home & Electronics Repair Services',
    websiteUrl: 'https://repnexa.vercel.app/',
    logoUrl: '/uploads/repnexa.avif',
  },
  {
    id: 12,
    name: 'Bhartiyebazar',
    description: 'Bhartiyebazar offers awareness and digital Solutions to ecommerce projects.',
    category: 'E-Commerce',
    websiteUrl: 'https://bhartiyebazar.com',
  },
];

export default function BrandsSection() {
  const [brands, setBrands] = useState<BrandItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('zenith_cached_brands');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return FALLBACK_BRANDS;
  });
  const [typedTitle, setTypedTitle] = useState('');
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fullTitle = 'Our Brands';

  // Intersection Observer for scroll-triggered walking title animation
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

  // Typewriter animation
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

  // Fetch fresh brands from MySQL API without stale cache
  useEffect(() => {
    fetch('/api/brands', {
      cache: 'no-store',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.brands) && data.brands.length > 0) {
          setBrands(data.brands);
          try {
            localStorage.setItem('zenith_cached_brands', JSON.stringify(data.brands));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Helper to render brand logo - supports admin uploaded logo image URL or custom stylized emblems
  const renderBrandLogo = (brand: BrandItem) => {
    if (brand.logoUrl && brand.logoUrl.trim() !== '') {
      return (
        <div className="flex items-center justify-center w-full h-20 sm:h-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logoUrl}
            alt={brand.name}
            className="max-h-20 sm:max-h-24 max-w-[220px] sm:max-w-[260px] object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      );
    }

    const lower = brand.name.toLowerCase();

    if (lower.includes('jan seva')) {
      return (
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 44 44" className="w-11 h-11 shrink-0" fill="none">
            <rect width="44" height="44" rx="12" fill="#0f172a" />
            <circle cx="22" cy="22" r="14" stroke="#f97316" strokeWidth="2.5" />
            <path d="M 14 22 L 22 14 L 30 22 L 22 30 Z" fill="#10b981" />
            <circle cx="22" cy="22" r="3.5" fill="#ffffff" />
          </svg>
          <div className="text-left font-black leading-none">
            <span className="block text-sm text-amber-600 dark:text-amber-400 font-extrabold tracking-wider">
              JAN SEVA
            </span>
            <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 tracking-widest font-black mt-1">
              PORTAL
            </span>
          </div>
        </div>
      );
    }

    if (lower.includes('repnexa')) {
      return (
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 44 44" className="w-11 h-11 shrink-0" fill="none">
            <rect width="44" height="44" rx="12" fill="#0f172a" />
            <path d="M 13 14 L 22 30 L 31 14" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 17 22 L 27 22" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="22" cy="30" r="2.5" fill="#38bdf8" />
          </svg>
          <div className="text-left font-black leading-none">
            <span className="block text-base tracking-wider text-indigo-600 dark:text-indigo-400 font-black">
              REPNEXA
            </span>
            <span className="block text-[9px] text-slate-500 dark:text-slate-400 tracking-widest font-bold mt-1">
              TECH SYSTEMS
            </span>
          </div>
        </div>
      );
    }

    if (lower.includes('provisioning')) {
      return (
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-10 h-10 shrink-0" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#1e293b" strokeWidth="2.5" />
            <path d="M 12 14 L 28 20 L 12 26 Z" fill="#991b1b" />
            <path d="M 16 11 L 30 20 L 16 29" stroke="#ea580c" strokeWidth="2" />
          </svg>
          <div className="text-left font-black leading-none">
            <span className="block text-sm text-[#991b1b] dark:text-red-400 font-extrabold tracking-wider">
              PROVISIONING
            </span>
            <span className="block text-xs text-slate-800 dark:text-slate-200 tracking-widest font-black mt-0.5">
              TECH
            </span>
          </div>
        </div>
      );
    }

    if (lower.includes('bhartiyebazar')) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-xs">
            B
          </div>
          <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
            Bhartiyebazar
          </span>
        </div>
      );
    }

    if (lower.includes('distributors')) {
      return (
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 50 36" className="w-12 h-9 shrink-0" fill="none">
            <path d="M 4 28 L 14 8 L 22 28 L 30 14 L 38 28" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 32 8 L 46 8 L 46 22" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="28" y1="20" x2="44" y2="8" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
          <div className="text-left font-black leading-tight">
            <span className="block text-sm text-slate-900 dark:text-white font-extrabold">
              Want<span className="text-sky-500">Distributors</span>
            </span>
            <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-medium">
              distributor, stockist & cnf
            </span>
          </div>
        </div>
      );
    }

    // Default stylish brand badge
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-sm flex items-center justify-center shadow-md">
          {brand.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
          {brand.name}
        </span>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-10 bg-white dark:bg-[#060d1f] relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header exactly as requested */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center min-h-[44px] sm:min-h-[60px]">
            <span>{typedTitle || (hasScrolledIntoView ? '' : fullTitle)}</span>
            <span className="inline-block w-1 h-6 sm:h-11 bg-orange-500 ml-1.5 animate-pulse" />
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            We build and manage powerful digital brands across Healthcare, Technology, Distribution, Agriculture and Business Solutions.
          </p>
        </div>

        {/* 3-Column Clean Card Layout matching the screenshot (strictly 3 featured brands) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {brands.slice(0, 3).map((brand, idx) => {
            const description =
              brand.description ||
              (brand.name.toLowerCase().includes('jan seva')
                ? 'Official Digital Public Services & E-Governance Portal connecting citizens with online government documentation, certificates, and utility solutions.'
                : brand.name.toLowerCase().includes('repnexa')
                ? 'Next-Gen Enterprise IT Solutions including Custom Software Engineering, Mobile Applications, Cloud Systems, SEO & Digital Performance.'
                : brand.name.toLowerCase().includes('provisioning')
                ? 'Complete IT Solutions including Software Development, Mobile Apps, Website Development, SEO and Digital Marketing.'
                : brand.name.toLowerCase().includes('bhartiyebazar')
                ? 'Bhartiyebazar offers awareness and digital Solutions to ecommerce projects.'
                : brand.name.toLowerCase().includes('distributors')
                ? 'Connect with verified Distributors, Dealers, Franchise Partners and Business Opportunities.'
                : 'High-growth technology and digital platform engineering built for scale.');

            return (
              <div
                key={brand.id || idx}
                className="group relative p-5 xs:p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="w-full flex flex-col">
                  {/* Top Corner: Brand Name subtle & light */}
                  <div className="w-full flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] sm:text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500">
                      {brand.name}
                    </span>
                    {brand.category && (
                      <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-slate-200/50 dark:border-slate-800">
                        {brand.category}
                      </span>
                    )}
                  </div>

                  {/* Brand Logo / Mark - Enlarged & centered */}
                  <div className="h-20 sm:h-24 flex items-center justify-center my-3 w-full transition-transform group-hover:scale-105 duration-300">
                    {renderBrandLogo(brand)}
                  </div>

                  {/* Clean Short Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal text-center">
                    {description}
                  </p>
                </div>

                {/* Visit Website Outline Button */}
                <div className="mt-6 w-full flex justify-center">
                  <a
                    href={brand.websiteUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-7 py-2.5 rounded-full border border-blue-500/80 dark:border-blue-400/80 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
