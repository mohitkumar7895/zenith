'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const { openConsultationModal } = useApp();

  return (
    <section className="relative overflow-hidden pt-3 pb-3 lg:pt-4 lg:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full Hero Image Banner with Overlay Typography */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-amber-500/20 group">
          {/* Background Full Image */}
          <div className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px]">
            <Image
              src="/hero-bg.jpg"
              alt="Zenith Web Works - Digital Agency"
              fill
              priority
              className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Dark & Vibrant Ambient Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f] via-[#060d1f]/75 to-[#060d1f]/35" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#060d1f]/40 to-[#060d1f]/85" />

            {/* Content Positioned Directly Over the Image */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 text-center sm:text-left">
              <div className="max-w-4xl">
                {/* Main Headline as requested: "We Build Ideas For A Better Web." */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-lg">
                  We Build Ideas For A{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">
                    Better Web.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-5 text-base sm:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md font-medium">
                  High-speed websites, native Android applications, Google & Meta ads, and custom CRMs engineered to accelerate your business growth.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => openConsultationModal()}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-xl shadow-orange-500/35 hover:shadow-orange-500/50 active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="#services"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-black/50 hover:bg-black/70 border border-white/20 hover:border-amber-400/50 transition-all backdrop-blur-md flex items-center justify-center gap-2"
                  >
                    <span>Explore Our Services</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>MERN, Laravel & Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Android & Flutter Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
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
