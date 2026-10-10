'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCaseStudy } from '@/models/types';
import { CASE_STUDIES_DATA } from '@/lib/data';
import { TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProjectsSection() {
  const { openConsultationModal } = useApp();
  const [caseStudies, setCaseStudies] = useState<ProjectCaseStudy[]>(CASE_STUDIES_DATA);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setCaseStudies(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="case-studies" className="py-24 bg-white dark:bg-[#060d1f] border-t border-slate-200 dark:border-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
              Enterprise Case Studies
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base font-medium">
              Real architecture transformations, MySQL performance scaling, and cloud migrations delivered for industry leaders.
            </p>
          </div>

          <button
            onClick={() => openConsultationModal('Case Study Strategy')}
            className="self-start md:self-auto px-6 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 cursor-pointer hover:border-amber-500/50 shadow-sm"
          >
            <span>Request Full Portfolio</span>
            <ExternalLink className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((project) => (
            <div
              key={project.id}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-gradient-to-b dark:from-[#0b152d] dark:to-[#060d1f] border border-slate-200 dark:border-slate-800/90 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60">
                    {project.clientIndustry}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>MySQL Scaled</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {project.summary}
                </p>

                {/* Impact Metrics Banner */}
                {project.impactMetrics && project.impactMetrics.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center shadow-inner">
                    {project.impactMetrics.map((metric, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center">
                        <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3 text-amber-500" />
                          {metric.value}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-200/80 dark:bg-[#0b152d] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
