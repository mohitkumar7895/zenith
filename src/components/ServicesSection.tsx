'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Service } from '@/models/types';
import { SERVICES_DATA } from '@/lib/data';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Globe,
  Smartphone,
  Palette,
  Target,
  Cloud,
  TrendingUp,
  Cpu,
  Wrench,
} from 'lucide-react';

const SERVICE_IMAGES: Record<string, string> = {
  'custom-website-development': '/services/web-dev.jpg',
  'android-app-development': '/services/android-app.jpg',
  'graphic-designing': '/services/graphic-design.jpg',
  'logo-banner-designing': '/services/logo-design.jpg',
  'paid-ads-google-meta': '/services/paid-ads.jpg',
  'hosting-cloudflare-setup': '/services/hosting.jpg',
  'seo-performance-optimization': '/services/seo.jpg',
  'web-app-crm-development': '/services/crm.jpg',
  'website-maintenance-support': '/services/maintenance.jpg',
};

const getServiceIcon = (id: string) => {
  switch (id) {
    case 'custom-website-development':
      return <Globe className="w-4 h-4 text-amber-500" />;
    case 'android-app-development':
      return <Smartphone className="w-4 h-4 text-emerald-500" />;
    case 'graphic-designing':
      return <Palette className="w-4 h-4 text-purple-500" />;
    case 'logo-banner-designing':
      return <Sparkles className="w-4 h-4 text-amber-500" />;
    case 'paid-ads-google-meta':
      return <Target className="w-4 h-4 text-orange-500" />;
    case 'hosting-cloudflare-setup':
      return <Cloud className="w-4 h-4 text-sky-500" />;
    case 'seo-performance-optimization':
      return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    case 'web-app-crm-development':
      return <Cpu className="w-4 h-4 text-blue-500" />;
    case 'website-maintenance-support':
      return <Wrench className="w-4 h-4 text-amber-600" />;
    default:
      return <Sparkles className="w-4 h-4 text-amber-500" />;
  }
};

export default function ServicesSection() {
  const { openConsultationModal } = useApp();
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [showAll, setShowAll] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  const fullTitle = 'Our Services: Code, Design, Growth';

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

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch((err) => console.log('Using local fallback:', err));
  }, []);

  // Display 6 services initially, or all 9 if expanded
  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section ref={sectionRef} id="services" className="py-8 sm:py-10 bg-slate-50 dark:bg-[#050b1a] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Complete Digital Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center min-h-[48px] sm:min-h-[60px]">
            <span>{typedTitle || (hasScrolledIntoView ? '' : fullTitle)}</span>
            <span className="inline-block w-1 h-7 sm:h-10 bg-orange-500 ml-1.5 animate-pulse" />
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            From custom websites and Android apps to branding, paid ads and cloud hosting, we build solutions that convert.
          </p>
        </div>

        {/* Services Grid with Images and Minimal Clean Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedServices.map((service, idx) => {
            const imageSrc = SERVICE_IMAGES[service.id] || '/services/web-dev.jpg';

            return (
              <div
                key={service.id}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Image Banner with Badge */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Number Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-400 font-mono text-xs font-bold border border-white/10">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Clean, Concise Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200/80 dark:border-slate-800 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.id)}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    {/* Short concise description (km se km text) */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.technologies.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-amber-50 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => openConsultationModal(service.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-white bg-slate-100 dark:bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 border border-slate-200 dark:border-slate-800 group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md group-hover:shadow-orange-500/20"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-4 h-4 text-amber-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services / Show Less Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>{showAll ? 'Show Less (6 Services)' : 'View All Services (9)'}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 animate-bounce" />}
          </button>
        </div>
      </div>
    </section>
  );
}
