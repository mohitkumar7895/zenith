'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ProjectCaseStudy } from '@/models/types';
import { CASE_STUDIES_DATA } from '@/lib/data';
import {
  Sparkles,
  Search,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
} from 'lucide-react';

import PageHeaderBanner from '@/components/PageHeaderBanner';

const CATEGORIES = [
  'All Work',
  'Web Platforms',
  'Android Apps',
  'E-Commerce',
  'Performance Growth',
];

export default function PortfolioPage() {
  const { openConsultationModal } = useApp();
  const [projects, setProjects] = useState<ProjectCaseStudy[]>(CASE_STUDIES_DATA);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Work');

  useEffect(() => {
    setLoading(true);
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          // Merge with fallback data so images and rich details are always preserved
          const merged = data.projects.map((p: ProjectCaseStudy, idx: number) => {
            const fallback = CASE_STUDIES_DATA.find((c) => c.id === p.id) || CASE_STUDIES_DATA[idx % CASE_STUDIES_DATA.length];
            return {
              ...p,
              imageUrl: p.imageUrl || fallback?.imageUrl || '/services/web-dev.jpg',
              category: p.category || fallback?.category || 'Web Platforms',
            };
          });
          setProjects(merged);
        }
      })
      .catch((err) => console.log('Using local fallback:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter projects by category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All Work' ||
      project.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      project.tags?.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientIndustry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#060d1f] transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="Portfolio" bgImage="/services/crm.jpg" />

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* Clean Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 xs:px-3.5 py-1.5 rounded-xl text-[11px] xs:text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                    : 'bg-white dark:bg-[#070e22] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, industry..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid with Images & Descriptions */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading works...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-slate-500">No projects found matching your filter.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const imageSrc = project.imageUrl || '/services/web-dev.jpg';

              return (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-orange-500/60 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Visual Showcase Banner */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950">
                      <Image
                        src={imageSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-amber-400 font-mono text-[11px] font-bold border border-white/10">
                          {project.clientIndustry}
                        </span>

                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-semibold font-mono border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Live In Production
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* 3 Metrics Banner */}
                      {project.impactMetrics && project.impactMetrics.length > 0 && (
                        <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                          {project.impactMetrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col items-center justify-center">
                              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3 text-amber-500" />
                                {m.value}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Tags & Bottom Action */}
                  <div className="p-6 pt-0">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags?.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-amber-50 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => openConsultationModal(`Inquiry for Project: ${project.title}`)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-white bg-slate-100 dark:bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 border border-slate-200 dark:border-slate-800 group-hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md group-hover:shadow-orange-500/20"
                    >
                      <span>Inquire Similar Project</span>
                      <ArrowRight className="w-4 h-4 text-amber-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
