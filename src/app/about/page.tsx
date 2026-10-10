'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Smartphone,
  Palette,
  Award,
} from 'lucide-react';

import PageHeaderBanner from '@/components/PageHeaderBanner';

export default function AboutPage() {
  const { openConsultationModal } = useApp();

  // 4 Team Members: 2 Guys, 2 Girls with distinct stylized cartoon avatar representations
  const teamMembers = [
    {
      name: 'Mohit Kumar',
      gender: 'male',
      role: 'Founder & Chief Architect',
      specialty: 'Next.js 16, MySQL Clustering, Distributed Systems',
      experience: '8+ Years Tech Architecture',
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      tagColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
      avatarType: 'aryan',
    },
    {
      name: 'Rachita Saxsena',
      gender: 'female',
      role: 'Lead UI/UX & Brand Director',
      specialty: 'Design Systems, Micro-Interactions, Conversion UX',
      experience: '7+ Years Product Design',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      tagColor: 'text-pink-500 bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-800',
      avatarType: 'ananya',
    },
    {
      name: 'Ranjnaa Sharmaa',
      gender: 'male',
      role: 'Senior Full-Stack & Cloud Lead',
      specialty: 'Node.js, Laravel 11, Cloudflare Edge, DevOps',
      experience: '6+ Years Full-Stack Engineering',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      tagColor: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
      avatarType: 'rohan',
    },
    {
      name: 'Shashii Kumarie',
      gender: 'female',
      role: 'Head of Mobile & Growth',
      specialty: 'Android Native (Kotlin), Flutter, Google & Meta Ads',
      experience: '6+ Years Mobile & Growth',
      gradient: 'from-emerald-500 via-teal-500 to-green-600',
      tagColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
      avatarType: 'priya',
    },
  ];

  // Render high-fidelity cartoon avatar illustrations
  const renderCartoonAvatar = (type: string) => {
    switch (type) {
      case 'aryan': // Guy 1: Short styled dark hair, glasses, orange blazer
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
            {/* Background Circle */}
            <circle cx="60" cy="60" r="56" fill="url(#grad-aryan)" />
            <defs>
              <linearGradient id="grad-aryan" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="1" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            {/* Torso / Blazer */}
            <path d="M 30 115 C 32 88, 45 80, 60 80 C 75 80, 88 88, 90 115 Z" fill="#1e293b" />
            <path d="M 52 80 L 60 98 L 68 80 Z" fill="#f8fafc" />
            <path d="M 58 84 L 60 92 L 62 84 Z" fill="#ea580c" />
            {/* Neck */}
            <rect x="53" y="70" width="14" height="15" rx="3" fill="#fed7aa" />
            {/* Head */}
            <ellipse cx="60" cy="56" rx="20" ry="24" fill="#fed7aa" />
            {/* Hair (Guy with modern textured dark crop) */}
            <path d="M 38 48 C 38 30, 48 24, 60 24 C 72 24, 82 30, 82 48 C 82 40, 78 30, 60 30 C 42 30, 38 40, 38 48 Z" fill="#0f172a" />
            <path d="M 40 42 C 45 32, 65 30, 78 40 C 75 35, 62 26, 48 30 Z" fill="#1e293b" />
            {/* Ears */}
            <circle cx="39" cy="56" r="4.5" fill="#fdba74" />
            <circle cx="81" cy="56" r="4.5" fill="#fdba74" />
            {/* Eyebrows & Eyes */}
            <path d="M 47 48 Q 52 46 56 48" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <path d="M 64 48 Q 68 46 73 48" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="51" cy="53" r="2.5" fill="#0f172a" />
            <circle cx="69" cy="53" r="2.5" fill="#0f172a" />
            {/* Modern Glasses */}
            <rect x="44" y="47" width="14" height="11" rx="3" stroke="#0284c7" strokeWidth="2" fill="none" />
            <rect x="62" y="47" width="14" height="11" rx="3" stroke="#0284c7" strokeWidth="2" fill="none" />
            <line x1="58" y1="52" x2="62" y2="52" stroke="#0284c7" strokeWidth="2" />
            {/* Smile */}
            <path d="M 54 67 Q 60 72 66 67" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'ananya': // Girl 1: Long stylish dark brown hair, creative headphones, warm smile
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="60" cy="60" r="56" fill="url(#grad-ananya)" />
            <defs>
              <linearGradient id="grad-ananya" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ec4899" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {/* Hair behind shoulders */}
            <path d="M 32 50 C 30 75, 34 100, 42 115 L 78 115 C 86 100, 90 75, 88 50 Z" fill="#312e81" />
            {/* Torso / Top */}
            <path d="M 32 115 C 34 90, 46 82, 60 82 C 74 82, 86 90, 88 115 Z" fill="#4338ca" />
            <path d="M 52 82 Q 60 92 68 82 Z" fill="#fbcfe8" />
            {/* Neck */}
            <rect x="54" y="70" width="12" height="15" rx="3" fill="#fbcfe8" />
            {/* Head */}
            <ellipse cx="60" cy="56" rx="19" ry="22" fill="#fbcfe8" />
            {/* Hair front & bangs */}
            <path d="M 38 48 C 38 30, 48 22, 60 22 C 72 22, 82 30, 82 48 C 80 34, 72 32, 60 32 C 48 32, 40 34, 38 48 Z" fill="#1e1b4b" />
            <path d="M 39 42 Q 52 38 56 46 Q 66 38 81 42" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" />
            {/* Cute Earrings */}
            <circle cx="40" cy="60" r="2.5" fill="#fbbf24" />
            <circle cx="80" cy="60" r="2.5" fill="#fbbf24" />
            {/* Eyes & Lashes */}
            <circle cx="51" cy="53" r="2.5" fill="#1e1b4b" />
            <circle cx="69" cy="53" r="2.5" fill="#1e1b4b" />
            <path d="M 48 50 Q 51 47 54 50" stroke="#1e1b4b" strokeWidth="1.8" fill="none" />
            <path d="M 66 50 Q 69 47 72 50" stroke="#1e1b4b" strokeWidth="1.8" fill="none" />
            {/* Warm Smile & Blush */}
            <circle cx="46" cy="60" r="3" fill="#f472b6" fillOpacity="0.4" />
            <circle cx="74" cy="60" r="3" fill="#f472b6" fillOpacity="0.4" />
            <path d="M 54 65 Q 60 70 66 65" stroke="#be185d" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Creative Studio Headphones around neck */}
            <path d="M 45 74 C 45 84, 75 84, 75 74" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <rect x="41" y="70" width="7" height="12" rx="3" fill="#f43f5e" />
            <rect x="72" y="70" width="7" height="12" rx="3" fill="#f43f5e" />
          </svg>
        );

      case 'rohan': // Guy 2: Tech hoodie, messy hair, focus, code vibes
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="60" cy="60" r="56" fill="url(#grad-rohan)" />
            <defs>
              <linearGradient id="grad-rohan" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            {/* Hoodie */}
            <path d="M 30 115 C 32 88, 44 80, 60 80 C 76 80, 88 88, 90 115 Z" fill="#0f172a" />
            <path d="M 48 80 C 48 95, 72 95, 72 80 Z" fill="#1e293b" />
            <line x1="56" y1="88" x2="56" y2="102" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="64" y1="88" x2="64" y2="102" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Neck */}
            <rect x="53" y="70" width="14" height="14" rx="3" fill="#fde68a" />
            {/* Head */}
            <ellipse cx="60" cy="56" rx="20" ry="23" fill="#fde68a" />
            {/* Hair (messy spike cool developer hair) */}
            <path d="M 38 46 C 36 28, 46 20, 60 20 C 74 20, 84 28, 82 46 C 80 32, 75 28, 60 26 C 45 28, 40 32, 38 46 Z" fill="#18181b" />
            <path d="M 46 22 L 52 16 L 56 22 Z" fill="#18181b" />
            <path d="M 58 20 L 64 14 L 68 22 Z" fill="#18181b" />
            {/* Ears */}
            <circle cx="39" cy="56" r="4.5" fill="#fcd34d" />
            <circle cx="81" cy="56" r="4.5" fill="#fcd34d" />
            {/* Eyebrows & Eyes */}
            <path d="M 47 47 Q 52 44 56 47" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 64 47 Q 68 44 73 47" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="51" cy="52" r="2.5" fill="#18181b" />
            <circle cx="69" cy="52" r="2.5" fill="#18181b" />
            {/* Smart friendly smirk */}
            <path d="M 54 66 Q 61 70 67 65" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'priya': // Girl 2: Ponytail / bob, glasses, energetic tech leader
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="60" cy="60" r="56" fill="url(#grad-priya)" />
            <defs>
              <linearGradient id="grad-priya" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* High Ponytail puff */}
            <circle cx="78" cy="30" r="14" fill="#172554" />
            {/* Torso */}
            <path d="M 32 115 C 34 88, 46 80, 60 80 C 74 80, 86 88, 88 115 Z" fill="#047857" />
            <path d="M 50 80 Q 60 90 70 80 Z" fill="#fef08a" />
            {/* Neck */}
            <rect x="54" y="68" width="12" height="15" rx="3" fill="#fef08a" />
            {/* Head */}
            <ellipse cx="60" cy="54" rx="19" ry="22" fill="#fef08a" />
            {/* Hair sleek side part */}
            <path d="M 39 46 C 39 28, 48 20, 60 20 C 72 20, 81 28, 81 46 C 79 32, 70 30, 60 30 C 48 30, 41 34, 39 46 Z" fill="#0f172a" />
            {/* Glasses */}
            <circle cx="50" cy="51" r="7" stroke="#047857" strokeWidth="2" fill="none" />
            <circle cx="70" cy="51" r="7" stroke="#047857" strokeWidth="2" fill="none" />
            <line x1="57" y1="51" x2="63" y2="51" stroke="#047857" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="50" cy="51" r="2.2" fill="#0f172a" />
            <circle cx="70" cy="51" r="2.2" fill="#0f172a" />
            {/* Confident Smile */}
            <path d="M 54 64 Q 60 70 66 64" stroke="#a16207" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-[#060d1f] min-h-screen transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="About Us" bgImage="/hero-bg.jpg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* 1 SIDE PHOTO + 1 SIDE COMPANY DETAILS (Clean & Direct as requested) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          {/* LEFT: Premium Agency Workspace Photo */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group">
            <Image
              src="/hero-bg.jpg"
              alt="Zenith Web Works Engineering Workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="px-3 py-1 rounded-full bg-orange-500/90 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase mb-2 inline-block">
                Office & Tech Studio • Etawah, UP
              </span>
              <p className="text-sm font-semibold text-slate-100">
                Where high-performance code meets conversion-driven UI design.
              </p>
            </div>
          </div>

          {/* RIGHT: Company Information */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-500" />
              <span>Office: Bidhuna Road, Bharthana, Etawah, UP</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              Engineering Digital Products That Deliver Real Business ROI
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              At Zenith Web Works, we don&apos;t just build websites — we engineer complete digital assets that load in sub-2 seconds, convert visitors into qualified leads, and scale reliably on cloud infrastructure.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              From bespoke Next.js 16 portals and native Android apps to high-converting Meta & Google ad funnels, we provide direct senior developer collaboration and complete code ownership.
            </p>

            {/* 4 Quick Stat Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xl font-black text-orange-600 dark:text-orange-400">320+</span>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Projects Delivered</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xl font-black text-amber-500">99%</span>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Client CSAT</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xl font-black text-emerald-500">&lt;1.8s</span>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Avg Load Time</p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xl font-black text-blue-500">24/7</span>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Cloud Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* OUR TEAM SECTION: 4 Cartoon Avatars (2 Guys, 2 Girls as requested!) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Core Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Meet Our Engineering & Design Team
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              The hands-on creators, architects, and designers turning your business ideas into reality.
            </p>
          </div>

          {/* 4 Member Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200/90 dark:border-slate-800 hover:border-orange-500/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Stylized Cartoon Avatar Illustration */}
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-orange-500/30 to-amber-500/30 mb-4 transition-transform group-hover:scale-105 duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#060d1f]">
                      {renderCartoonAvatar(member.avatarType)}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-0.5">
                    {member.role}
                  </p>

                  {/* Specialty */}
                  <div className="mt-3 px-3 py-1.5 rounded-xl bg-white dark:bg-[#070e22] border border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 font-medium w-full">
                    {member.specialty}
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/70 w-full flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{member.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fast Action Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to work directly with our engineering team?
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              Book a consultation call or drop us your project requirements.
            </p>
          </div>

          <button
            onClick={() => openConsultationModal()}
            className="shrink-0 px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-amber-100 shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Start Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
