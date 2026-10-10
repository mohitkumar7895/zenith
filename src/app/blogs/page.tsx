'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Tag } from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

interface Article {
  id: string | number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  tags: string[];
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'nextjs-16-web-performance',
    title: 'Why Next.js 16 & Server Components Are The Future of Web Performance',
    category: 'Web Engineering',
    date: 'October 2026',
    readTime: '5 min read',
    image: '/services/web-dev.jpg',
    summary: 'Explore how React 19 server components, Turbopack, and partial pre-rendering in Next.js 16 deliver instant page loads and superior Core Web Vitals.',
    tags: ['Next.js 16', 'React 19', 'Performance', 'Web Architecture'],
  },
  {
    id: 'mysql-high-availability-scaling',
    title: 'Scaling MySQL For High-Concurrency Enterprise Web Platforms',
    category: 'Database Engineering',
    date: 'September 2026',
    readTime: '7 min read',
    image: '/services/hosting.jpg',
    summary: 'Practical guide to query optimization, composite indexing strategies, connection pooling, and multi-region replication in MySQL 8.0+.',
    tags: ['MySQL', 'Database', 'Backend', 'High Availability'],
  },
  {
    id: 'android-native-vs-flutter',
    title: 'Native Android vs. Flutter: Choosing The Right Tech Stack in 2026',
    category: 'Mobile Development',
    date: 'August 2026',
    readTime: '6 min read',
    image: '/services/android-app.jpg',
    summary: 'A detailed breakdown of performance, development speed, hardware integration, and Play Store compliance between Kotlin Native and Flutter.',
    tags: ['Android', 'Flutter', 'Mobile Apps', 'Play Store'],
  },
  {
    id: 'technical-seo-core-web-vitals',
    title: 'The Core Web Vitals Playbook: Achieving Under 2-Second Page Loads',
    category: 'SEO & Growth',
    date: 'July 2026',
    readTime: '4 min read',
    image: '/services/seo.jpg',
    summary: 'Step-by-step techniques for image optimization, Cloudflare edge caching, critical CSS inlining, and technical SEO to dominate Google search rankings.',
    tags: ['Technical SEO', 'Cloudflare', 'PageSpeed', 'Google Rankings'],
  },
];

export default function BlogsPage() {
  const { openConsultationModal } = useApp();
  const [articles, setArticles] = React.useState<Article[]>(DEFAULT_ARTICLES);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setArticles(data.blogs);
        }
      })
      .catch((err) => console.warn('Could not load dynamic blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#060d1f] transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="Our Blogs" bgImage="/services/seo.jpg" />

      <div className="max-w-6xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        {/* Featured Article */}
        <div className="mb-16 rounded-3xl overflow-hidden bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-full">
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">
              Featured Insight
            </span>
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-amber-500 font-bold">{articles[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{articles[0].date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{articles[0].readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white hover:text-amber-500 transition-colors">
                {articles[0].title}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {articles[0].summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {articles[0].tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => openConsultationModal(`Blog Inquiry: ${articles[0].title}`)}
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
              >
                <span>Read Full Article & Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((art) => (
            <div
              key={art.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48">
                  <Image src={art.image} alt={art.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-amber-400 text-[11px] font-bold">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-amber-500 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {art.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => openConsultationModal(`Blog Discuss: ${art.title}`)}
                  className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
