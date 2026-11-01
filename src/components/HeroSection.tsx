'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ArrowRight, CheckCircle2, Phone, MessageCircle, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { openConsultationModal } = useApp();

  return (
    <section className="relative overflow-hidden pt-0 sm:pt-3 pb-3 lg:pt-4 lg:pb-4 w-full">
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Full Hero Image Banner with Overlay Typography - Full width on mobile, rounded on desktop */}
        <div className="relative w-full rounded-none sm:rounded-3xl overflow-hidden shadow-2xl border-y sm:border border-slate-200/50 dark:border-amber-500/20 group">
          {/* Background Full Image */}
          <div className="relative w-full min-h-[560px] sm:min-h-[600px] lg:min-h-[660px]">
            <Image
              src="/hero-bg.jpg"
              alt="Zenith Web Works - Digital Agency"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out brightness-105"
            />

            {/* Soft, Transparent Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f]/90 via-[#060d1f]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060d1f]/60 via-[#060d1f]/20 to-transparent" />

            {/* Content Positioned Directly Over the Image */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 xs:p-6 sm:p-12 lg:p-16 text-left">
              <div className="max-w-4xl">
                {/* Trust / Speed / Price Hook Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold mb-3 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Websites from ₹4,999 • Ready in 3-7 Days • Call Now</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-[26px] xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15] sm:leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                  We Build Ideas For A{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">
                    Better Web.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-3 sm:mt-5 text-xs xs:text-sm sm:text-xl text-white max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-medium">
                  Custom high-converting websites, native Android applications, and custom business CRMs. Speak directly with our technical team today!
                </p>

                {/* High-Converting Action Buttons: Direct Call + WhatsApp + Consultation */}
                <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                  {/* 1. Direct Phone Call Button */}
                  <a
                    href="tel:+917895094129"
                    className="px-6 py-3.5 sm:py-4 rounded-xl text-xs xs:text-sm sm:text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 shadow-xl shadow-emerald-600/40 hover:shadow-emerald-600/60 active:scale-95 flex items-center justify-center gap-2 group/call"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover/call:rotate-12 transition-transform" />
                    <span>Call Now: +91 7895094129</span>
                  </a>

                  {/* 2. Direct WhatsApp Button */}
                  <a
                    href="https://wa.me/917895094129?text=Namaste%20Zenith%20team,%20mujhe%20website%20ya%20app%20ke%20liye%20baat%20karni%20hai."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 sm:py-4 rounded-xl text-xs xs:text-sm sm:text-base font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all duration-300 shadow-xl shadow-emerald-500/30 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  {/* 3. Online Quote / Consultation */}
                  <button
                    onClick={() => openConsultationModal()}
                    className="px-6 py-3.5 sm:py-4 rounded-xl text-xs xs:text-sm sm:text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-xl shadow-orange-500/35 hover:shadow-orange-500/50 active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-5 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-6 text-[11px] xs:text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span>Custom Next.js & React</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                    <span>Android & Flutter Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                    <span>100% Code Ownership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span>Free 1-Yr Hosting & Domain</span>
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
