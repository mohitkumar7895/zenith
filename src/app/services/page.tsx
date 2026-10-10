'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { SERVICES_DATA } from '@/lib/data';
import {
  Globe,
  Smartphone,
  Palette,
  Sparkles,
  Target,
  Cloud,
  TrendingUp,
  Code2,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

import PageHeaderBanner from '@/components/PageHeaderBanner';

const SERVICE_IMAGES: Record<string, string> = {
  'custom-website-development': '/services/web-dev.jpg',
  'android-app-development': '/services/android-app.jpg',
  'graphic-designing': '/services/graphic-design.jpg',
  'logo-banner-designing': '/services/logo-banner.jpg',
  'paid-ads-google-meta': '/services/paid-ads.jpg',
  'hosting-cloudflare-setup': '/services/hosting.jpg',
  'seo-performance-optimization': '/services/seo.jpg',
  'web-app-crm-development': '/services/web-dev.jpg',
  'website-maintenance-support': '/services/hosting.jpg',
};

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'custom-website-development': Globe,
  'android-app-development': Smartphone,
  'graphic-designing': Palette,
  'logo-banner-designing': Sparkles,
  'paid-ads-google-meta': Target,
  'hosting-cloudflare-setup': Cloud,
  'seo-performance-optimization': TrendingUp,
  'web-app-crm-development': Code2,
  'website-maintenance-support': Wrench,
};

export default function ServicesPage() {
  const { openConsultationModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web & Apps', 'Design & Branding', 'Marketing & Cloud'];

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Web & Apps') {
      return [
        'custom-website-development',
        'android-app-development',
        'web-app-crm-development',
        'website-maintenance-support',
      ].includes(service.id);
    }
    if (selectedCategory === 'Design & Branding') {
      return ['graphic-designing', 'logo-banner-designing'].includes(service.id);
    }
    if (selectedCategory === 'Marketing & Cloud') {
      return [
        'paid-ads-google-meta',
        'hosting-cloudflare-setup',
        'seo-performance-optimization',
      ].includes(service.id);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#060d1f] transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="Our Services" bgImage="/services/web-dev.jpg" />

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white dark:bg-[#0b152d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 9 Services Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.id] || Globe;
            const imageSrc = SERVICE_IMAGES[service.id] || '/services/web-dev.jpg';

            return (
              <div
                key={service.id}
                className="group rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Showcase Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        Service #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                      {service.title}
                    </h2>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>

                    {/* Features Checklist */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        What We Deliver:
                      </span>
                      {service.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies Tag Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-[#070e22] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => openConsultationModal(service.title)}
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b152d] to-slate-900 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready To Transform Your Digital Presence?
            </h3>
            <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
              Speak directly with our technical lead. Free project consultation, architecture estimation, and milestone roadmap within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openConsultationModal()}
                className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/30 cursor-pointer"
              >
                Schedule Free Consultation
              </button>
              <a
                href="tel:+917895094129"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
              >
                Call: +91 7895094129
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
