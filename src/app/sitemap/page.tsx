import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/data';
import {
  FileText,
  Compass,
  Layers,
  Shield,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

export default function SitemapPage() {
  const mainPages = [
    { title: 'Home Page', href: '/', desc: 'Full agency overview, core stats, and featured engineering projects.' },
    { title: 'About Us', href: '/about', desc: 'Our background, leadership team, engineering philosophy, and values.' },
    { title: 'All Services', href: '/services', desc: 'Comprehensive list of all IT, design, and performance services.' },
    { title: 'Portfolio & Case Studies', href: '/portfolio', desc: 'Real-world digital products, apps, and client transformations.' },
    { title: 'Tech Insights Blog', href: '/blogs', desc: 'Actionable tutorials and industry insights on software and SEO.' },
    { title: 'Careers & Openings', href: '/careers', desc: 'Current openings for developers, designers, and marketing leads.' },
    { title: 'Frequently Asked Questions', href: '/faqs', desc: 'Answers on pricing, timelines, tech stacks, and code ownership.' },
    { title: 'Contact & Free Quote', href: '/contact', desc: 'Get in touch for free consultation and project estimates.' },
  ];

  const legalPages = [
    { title: 'Privacy Policy', href: '/privacy', desc: 'Our policies on data protection and confidentiality.' },
    { title: 'Terms & Conditions', href: '/terms', desc: 'Terms governing service delivery, IP ownership, and billing.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <PageHeaderBanner title="HTML Sitemap" bgImage="/services/web-dev.jpg" />

      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Website Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Website Index & Sitemap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              A comprehensive directory designed for both human visitors and search engine crawlers to discover all pages, IT services, and case studies.
            </p>
          </div>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-xs sm:text-sm transition-all border border-slate-700 shrink-0 self-start sm:self-auto"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Open Raw XML Sitemap</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Section 1: Dedicated IT Services Pages */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Dedicated Service & Keyword Pages
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Individual landing pages tailored for specific client requirements and commercial search terms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_DATA.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-500">
                  <span>Visit landing page</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Main Website Pages */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Main Company Pages
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core portals detailing our agency, case studies, insights, and contact channels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-4 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {page.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {page.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                  <span>{page.href}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Legal & Regulatory */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Compliance & Legal Policies
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Terms of engagement, client privacy protection, and intellectual property terms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {legalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-4 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {page.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {page.desc}
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                  <span>{page.href}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
