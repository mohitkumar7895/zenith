'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, ArrowUp, ArrowDown, PhoneCall, X } from 'lucide-react';

const PHONE_1 = '+917895094129';
const PHONE_1_DISPLAY = '+91 7895094129';
const PHONE_2 = '+919193648939';
const PHONE_2_DISPLAY = '+91 9193648939';

const WHATSAPP_NUMBER = '917895094129';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello Zenith Web Works! I would like to discuss a project with your team.'
);

export default function FloatingActions() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCallMenu, setShowCallMenu] = useState(false);
  const callMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleClickOutside = (e: MouseEvent) => {
      if (callMenuRef.current && !callMenuRef.current.contains(e.target as Node)) {
        setShowCallMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleScrollToggle = () => {
    if (isScrolledDown) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Quick contact and navigation"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 select-none"
    >
      {/* 1. Scroll Up / Down Button (Above the contact buttons) */}
      <div className="relative group">
        <button
          onClick={handleScrollToggle}
          aria-label={isScrolledDown ? 'Scroll to top' : 'Scroll to bottom'}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 dark:bg-slate-800/90 text-white backdrop-blur-md border border-slate-700/60 dark:border-slate-600/60 shadow-lg shadow-black/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {isScrolledDown ? (
            <ArrowUp className="w-5 h-5 text-cyan-400 animate-bounce transition-transform duration-300" />
          ) : (
            <ArrowDown className="w-5 h-5 text-cyan-400 transition-transform duration-300 group-hover:translate-y-0.5" />
          )}
        </button>

        {/* Tooltip */}
        <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-slate-800/95 text-xs font-semibold text-slate-100 whitespace-nowrap shadow-xl border border-slate-700/50 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block">
          {isScrolledDown ? 'Scroll to Top' : 'Scroll to Bottom'}
          <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-slate-900 dark:border-l-slate-800" />
        </div>
      </div>

      {/* 2. Call Button with Dual Number Menu */}
      <div className="relative" ref={callMenuRef}>
        <button
          type="button"
          onClick={() => setShowCallMenu(!showCallMenu)}
          aria-label="Call Zenith Web Works"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Phone className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
        </button>

        {/* Dual Phone Numbers Popup */}
        {showCallMenu && (
          <div className="absolute right-full bottom-0 mr-3 p-3 rounded-2xl bg-slate-900/95 dark:bg-[#0b152d]/95 backdrop-blur-md text-white border border-slate-700/80 shadow-2xl w-60 z-50 animate-in fade-in slide-in-from-right-2 duration-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Call Directly</span>
              </span>
              <button
                onClick={() => setShowCallMenu(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Close call menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <a
                href={`tel:${PHONE_1}`}
                onClick={() => setShowCallMenu(false)}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 hover:bg-blue-600/30 border border-slate-700/50 hover:border-blue-500/50 transition-all text-xs group"
              >
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary</span>
                  <span className="font-extrabold text-white group-hover:text-amber-400">{PHONE_1_DISPLAY}</span>
                </div>
                <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={`tel:${PHONE_2}`}
                onClick={() => setShowCallMenu(false)}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 hover:bg-blue-600/30 border border-slate-700/50 hover:border-blue-500/50 transition-all text-xs group"
              >
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Support & Sales</span>
                  <span className="font-extrabold text-white group-hover:text-amber-400">{PHONE_2_DISPLAY}</span>
                </div>
                <Phone className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 3. WhatsApp Button */}
      <div className="relative group">
        {/* Subtle breathing radar ring */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-500 opacity-60 animate-ping pointer-events-none" />

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/35 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] hover:shadow-2xl hover:shadow-emerald-500/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.677.15-.2.301-.777.979-.953 1.18-.175.201-.351.226-.652.075-.301-.151-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.301.301-.502.1-.201.05-.377-.025-.527-.075-.151-.677-1.632-.928-2.235-.245-.588-.494-.509-.677-.518-.176-.009-.377-.01-.577-.01-.201 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.511 0 1.482 1.079 2.912 1.23 3.113.151.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.378.198 1.897.12.578-.088 1.78-.728 2.031-1.431.251-.703.251-1.306.176-1.431-.075-.126-.276-.201-.577-.352z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.954.561 3.777 1.534 5.323L2 22l4.821-1.507A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.68 0-3.242-.486-4.564-1.326l-.328-.207-2.868.897.915-2.793-.227-.344A8.17 8.17 0 013.8 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z" />
          </svg>
        </a>

        {/* Tooltip */}
        <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-slate-800/95 text-xs font-semibold text-slate-100 whitespace-nowrap shadow-xl border border-slate-700/50 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block">
          Chat on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-slate-900 dark:border-l-slate-800" />
        </div>
      </div>
    </aside>
  );
}
