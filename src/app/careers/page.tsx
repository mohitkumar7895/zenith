'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  Laptop,
  TrendingUp,
  Building2,
  Loader2,
} from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

interface CareerJob {
  id: number | string;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
  description: string;
}

const FALLBACK_POSITIONS: CareerJob[] = [
  {
    id: 1,
    title: 'Senior Next.js & Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (India)',
    type: 'Full-Time',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'MySQL', 'Tailwind CSS'],
    description: 'Build high-performance web applications, server components, and relational database pipelines for enterprise clients.',
  },
  {
    id: 2,
    title: 'Android & Flutter Mobile Developer',
    department: 'Mobile Engineering',
    location: 'Hybrid / Remote',
    type: 'Full-Time',
    tags: ['Android Native', 'Flutter', 'Kotlin', 'Firebase', 'Play Store'],
    description: 'Develop fluid, offline-first mobile apps for consumer businesses, booking engines, and internal CRM portals.',
  },
  {
    id: 3,
    title: 'Senior UI/UX & Graphic Designer',
    department: 'Design & Creative',
    location: 'Remote',
    type: 'Full-Time',
    tags: ['Figma', 'Brand Identity', 'Social Media Creatives', 'Vector Art'],
    description: 'Craft memorable brand identities, modern web UI designs, marketing collaterals, and high-converting ad visuals.',
  },
  {
    id: 4,
    title: 'Performance Marketing & Paid Ads Lead',
    department: 'Growth & Marketing',
    location: 'Remote',
    type: 'Full-Time',
    tags: ['Google Ads', 'Meta Ads', 'Funnel Optimization', 'Analytics'],
    description: 'Lead data-driven PPC campaigns, lead generation funnels, and ROI tracking across Google and Meta ad platforms.',
  },
];

export default function CareersPage() {
  const { openConsultationModal } = useApp();
  const [positions, setPositions] = useState<CareerJob[]>(FALLBACK_POSITIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/careers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.careers) && data.careers.length > 0) {
          setPositions(data.careers);
        }
      })
      .catch((err) => console.log('Using local fallback:', err))
      .finally(() => setLoading(false));
  }, []);

  const perks = [
    { title: 'Competitive Compensation', desc: 'Above-market pay with performance bonuses and appraisal cycles.', icon: <TrendingUp className="w-5 h-5 text-amber-500" /> },
    { title: 'Flexible / Hybrid Culture', desc: 'Work from our modern tech office or remotely from anywhere in India.', icon: <Laptop className="w-5 h-5 text-orange-500" /> },
    { title: 'Cutting-Edge Tech Stack', desc: 'Build with the newest tools: Next.js 16, Flutter, Tailwind v4, and modern cloud infrastructure.', icon: <Sparkles className="w-5 h-5 text-sky-500" /> },
    { title: 'Health & Learning Stipend', desc: 'Dedicated annual budget for online certifications, books, and wellness.', icon: <Heart className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#060d1f] transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="Careers" bgImage="/services/android-app.jpg" />

      <div className="max-w-6xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        {/* Perks Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {perks.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions List */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Open Positions ({positions.length})
            </h2>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-orange-500" />}
          </div>

          <div className="space-y-4">
            {positions.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-orange-500/60 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                      {job.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      {job.type}
                    </span>
                  </div>

                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {job.tags.map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => openConsultationModal(`Job Application: ${job.title}`)}
                    className="w-full md:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Don&apos;t see an exact fit?</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            We are always happy to hear from talented developers, designers, and marketers. Send your resume to <strong className="text-orange-500 font-mono">careers@zenithwebworks.io</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
