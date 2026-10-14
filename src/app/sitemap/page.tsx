'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/data';
import { UP_DISTRICTS, SERVICE_KEYWORDS } from '@/lib/upDistricts';
import {
  FileText,
  Compass,
  Layers,
  Shield,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  PhoneCall,
  MapPin,
  Search,
  CheckCircle2,
  Building2,
  Globe2,
  MessageCircle,
  Hash,
  FolderTree,
} from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

const PHONE_1 = '+91 7895094129';
const PHONE_1_CLEAN = '+917895094129';
const PHONE_2 = '+91 9193648939';
const PHONE_2_CLEAN = '+919193648939';

const ZONES = ['All', 'NCR / Western UP', 'Central UP', 'Eastern UP', 'Bundelkhand'] as const;

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'divisions' | 'az'>('cards');

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
    { title: 'Privacy Policy', href: '/privacy', desc: 'Our policies on data protection and client confidentiality.' },
    { title: 'Terms & Conditions', href: '/terms', desc: 'Terms governing service delivery, IP ownership, and warranties.' },
  ];

  // Alphabetical sort of all 75 districts
  const alphabeticalDistricts = useMemo(() => {
    return [...UP_DISTRICTS].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Grouped by 18 Administrative Divisions
  const divisionsMap = useMemo(() => {
    const map = new Map<string, typeof UP_DISTRICTS>();
    UP_DISTRICTS.forEach((d) => {
      const existing = map.get(d.division) || [];
      existing.push(d);
      map.set(d.division, existing);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  // Filter districts based on search query and zone tab
  const filteredDistricts = useMemo(() => {
    return UP_DISTRICTS.filter((district) => {
      const matchesZone = selectedZone === 'All' || district.zone === selectedZone;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        district.name.toLowerCase().includes(q) ||
        district.hindiName.toLowerCase().includes(q) ||
        district.division.toLowerCase().includes(q) ||
        district.prominentFor.toLowerCase().includes(q) ||
        district.popularServices.some((s) => s.toLowerCase().includes(q));

      return matchesZone && matchesSearch;
    });
  }, [searchQuery, selectedZone]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <PageHeaderBanner title="HTML Sitemap & UP District Directory" bgImage="/services/web-dev.jpg" />

      <div className="max-w-7xl mx-auto py-10 sm:py-16 px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro & Emergency Helpline Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Website Directory & All 75 Districts of Uttar Pradesh</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              HTML Sitemap & Local Service Index
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Find complete navigation for every IT service, corporate page, high-intent search keywords, and dedicated software solutions available across all 75 districts of Uttar Pradesh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-xs sm:text-sm transition-all border border-slate-700"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Raw XML Sitemap</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dedicated Direct Calling & WhatsApp Support Numbers */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/70 via-indigo-950/60 to-slate-950 border border-blue-900/60 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Direct Client Helplines (All Uttar Pradesh Districts & Pan-India)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Have a Project? Speak With Our Senior Engineers Directly
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Call or WhatsApp our team for web development, Android apps, custom CRMs, and SEO consulting across any district in UP.
              </p>
            </div>

            {/* Calling Cards */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Number 1 */}
              <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-3 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/80 border border-blue-700/60 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Helpline</span>
                  <a
                    href={`tel:${PHONE_1_CLEAN}`}
                    className="text-sm sm:text-base font-extrabold text-white hover:text-amber-400 transition-colors"
                  >
                    {PHONE_1}
                  </a>
                </div>
                <a
                  href={`https://wa.me/917895094129?text=${encodeURIComponent('Hello Zenith Web Works! I would like to inquire about IT services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp on primary helpline"
                  className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0 ml-1"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              {/* Number 2 */}
              <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-3 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/80 border border-blue-700/60 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Technical Support</span>
                  <a
                    href={`tel:${PHONE_2_CLEAN}`}
                    className="text-sm sm:text-base font-extrabold text-white hover:text-amber-400 transition-colors"
                  >
                    {PHONE_2}
                  </a>
                </div>
                <a
                  href={`https://wa.me/919193648939?text=${encodeURIComponent('Hello Zenith Web Works! I need technical support / project quotation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp on technical support"
                  className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0 ml-1"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Uttar Pradesh (UP) All 75 Districts Directory */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Uttar Pradesh Local District Directory (All 75 Districts)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Every district of Uttar Pradesh has a dedicated landing page with customized services, local industry specs, and direct lead generation.
                </p>
              </div>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('divisions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'divisions'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                18 Divisions
              </button>
              <button
                onClick={() => setViewMode('az')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'az'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                A-Z Index
              </button>
            </div>
          </div>

          {/* Search Bar & Zone Filter Tabs (Active in Cards View) */}
          {viewMode === 'cards' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by district name, Hindi name, division, or industry (e.g. Noida, Kanpur, Banaras, Peetal, Carpet)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Zone Filter Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {ZONES.map((zone) => {
                    const count = zone === 'All' ? UP_DISTRICTS.length : UP_DISTRICTS.filter((d) => d.zone === zone).length;
                    const isActive = selectedZone === zone;
                    return (
                      <button
                        key={zone}
                        onClick={() => setSelectedZone(zone)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {zone} ({count})
                      </button>
                    );
                  })}
                </div>

              </div>

              {filteredDistricts.length === 0 && (
                <p className="text-center py-8 text-xs sm:text-sm text-slate-500">
                  No districts match your search query &quot;{searchQuery}&quot;. Clear search to view all 75 districts.
                </p>
              )}
            </div>
          )}

          {/* VIEW 1: Cards Grid */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDistricts.map((district) => (
                <div
                  key={district.slug}
                  className="group p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/locations/${district.slug}`}
                          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors block"
                        >
                          {district.name}
                        </Link>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {district.hindiName}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-700">
                        {district.zone.split('/')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                      <strong className="text-slate-700 dark:text-slate-300">Industry:</strong> {district.prominentFor}
                    </p>

                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                        Available Solutions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {district.popularServices.map((srv) => (
                          <span
                            key={srv}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Division: {district.division}
                    </span>
                    
                    <Link
                      href={`/locations/${district.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                    >
                      <span>View Landing Page</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW 2: 18 Administrative Divisions Grouping */}
          {viewMode === 'divisions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {divisionsMap.map(([divisionName, districtsInDiv]) => (
                <div
                  key={divisionName}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <FolderTree className="w-4 h-4 text-amber-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {divisionName} Division
                      </h3>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {districtsInDiv.length} Districts
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {districtsInDiv.map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/locations/${d.slug}`}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs transition-colors group"
                        >
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-500">
                              {d.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {d.hindiName}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-500 transition-transform" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* VIEW 3: A-Z Alphabetical Index */}
          {viewMode === 'az' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Hash className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Alphabetical Directory of All 75 Uttar Pradesh District Landing Pages
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {alphabeticalDistricts.map((d, index) => (
                  <Link
                    key={d.slug}
                    href={`/locations/${d.slug}`}
                    className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center justify-between text-xs group"
                  >
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 font-medium truncate">
                      <span className="text-slate-400 text-[10px] mr-1.5">{index + 1}.</span>
                      {d.name.split('(')[0].trim()}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-500 shrink-0 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* SECTION: Dedicated IT Services & Commercial Keywords */}
        <section className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Core IT Services &amp; Commercial Keyword Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Detailed landing pages, capabilities, and specialized search terms for our software, mobile, and digital marketing services.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_DATA.map((service) => {
              const keywordObj = SERVICE_KEYWORDS.find((k) => k.slug === service.slug);
              return (
                <div
                  key={service.slug}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-amber-500 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {service.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Target High-Intent Keywords */}
                    {keywordObj && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          High-Intent Search Keywords:
                        </span>
                        <ul className="space-y-1">
                          {keywordObj.keywords.map((kw) => (
                            <li
                              key={kw}
                              className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>{kw}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                    >
                      <span>Explore Service Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/contact"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      Request Quote →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Main Agency Portals */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Main Company Portals &amp; Case Studies
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Discover agency information, client results, engineering journals, and open developer roles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-4 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all"
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

        {/* SECTION: Compliance & Legal Information */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Legal &amp; Governance Documents
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Terms of engagement, client privacy policies, NDA adherence, and intellectual property assurances.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {legalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-4 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all"
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

        {/* Bottom Call to Action */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Build Your Website or App in Uttar Pradesh?
            </h2>
            <p className="text-sm font-medium text-slate-900/90 max-w-xl">
              From Noida &amp; Lucknow to Kanpur, Varanasi &amp; Etawah — our engineers deliver scalable software within budget and timeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_1_CLEAN}`}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105"
            >
              Call {PHONE_1}
            </a>
            <a
              href={`tel:${PHONE_2_CLEAN}`}
              className="px-6 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105"
            >
              Call {PHONE_2}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
