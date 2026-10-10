'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const { openConsultationModal } = useApp();

  return (
    <section className="relative overflow-hidden pt-0 sm:pt-3 pb-3 lg:pt-4 lg:pb-4 w-full">
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Full Hero Image Banner with Overlay Typography - Full width on mobile, rounded on desktop */}
        <div className="relative w-full rounded-none sm:rounded-3xl overflow-hidden shadow-2xl border-y sm:border border-slate-200/50 dark:border-amber-500/20 group">
          {/* Background Full Image */}
          <div className="relative w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[640px]">
            <Image
              src="/hero-bg.jpg"
              alt="Zenith Web Works - Digital Agency"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out brightness-105"
            />

            {/* Soft, Transparent Overlay - Image is clearly visible without being too black */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f]/70 via-[#060d1f]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060d1f]/40 via-transparent to-transparent" />

            {/* Content Positioned Directly Over the Image */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 xs:p-6 sm:p-12 lg:p-16 text-left">
              <div className="max-w-4xl">
                {/* Main Headline as requested: "We Build Ideas For A Better Web." */}
                <h1 className="text-[26px] xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15] sm:leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                  We Build Ideas For A{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">
                    Better Web.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-3 sm:mt-5 text-xs xs:text-sm sm:text-xl text-white max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-medium">
                  High-speed websites, native Android applications, Google & Meta ads, and custom CRMs engineered to accelerate your business growth.
                </p>

                {/* Action Buttons */}
                <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => openConsultationModal()}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-xs xs:text-sm sm:text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-xl shadow-orange-500/35 hover:shadow-orange-500/50 active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="#services"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-xs xs:text-sm sm:text-base font-bold text-white bg-black/50 hover:bg-black/70 border border-white/20 hover:border-amber-400/50 transition-all backdrop-blur-md flex items-center justify-center gap-2"
                  >
                    <span>Explore Our Services</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-5 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-6 text-[11px] xs:text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span>MERN, Laravel & Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                    <span>Android & Flutter Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                    <span>Cloudflare Edge Under 2s Load</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
