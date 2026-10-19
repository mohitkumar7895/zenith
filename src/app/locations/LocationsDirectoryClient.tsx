'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import { UP_DISTRICTS } from '@/lib/upDistricts';
import { BIHAR_DISTRICTS } from '@/lib/biharDistricts';
import { INDIA_DISTRICTS } from '@/lib/indiaDistricts';
import {
  MapPin,
  Search,
  Phone,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Globe2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const PHONE_1 = '+91 7895094129';
const PHONE_1_CLEAN = '+917895094129';
const PHONE_2 = '+91 9193648939';
const PHONE_2_CLEAN = '+919193648939';

interface LocationItem {
  slug: string;
  name: string;
  hindiName: string;
  state: string;
  prominentFor: string;
  popularServices: string[];
}

export default function LocationsDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');

  // Unified list of all 189 locations
  const allLocations: LocationItem[] = useMemo(() => {
    const upItems: LocationItem[] = UP_DISTRICTS.map((d) => ({
      slug: d.slug,
      name: d.name,
      hindiName: d.hindiName,
      state: 'Uttar Pradesh',
      prominentFor: d.prominentFor,
      popularServices: d.popularServices,
    }));

    const biharItems: LocationItem[] = BIHAR_DISTRICTS.map((d) => ({
      slug: d.slug,
      name: d.name,
      hindiName: d.hindiName,
      state: 'Bihar',
      prominentFor: d.prominentFor,
      popularServices: d.popularServices,
    }));

    const indiaItems: LocationItem[] = INDIA_DISTRICTS.map((d) => ({
      slug: d.slug,
      name: d.name,
      hindiName: d.hindiName,
      state: d.state,
      prominentFor: d.prominentFor,
      popularServices: d.popularServices,
    }));

    return [...upItems, ...biharItems, ...indiaItems];
  }, []);

  const stateList = useMemo(() => {
    const states = Array.from(new Set(allLocations.map((d) => d.state))).sort();
    return ['All', ...states];
  }, [allLocations]);

  const filteredLocations = useMemo(() => {
    return allLocations.filter((item) => {
      const matchesState = selectedState === 'All' || item.state === selectedState;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.hindiName.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.prominentFor.toLowerCase().includes(q) ||
        item.popularServices.some((s) => s.toLowerCase().includes(q));

      return matchesState && matchesSearch;
    });
  }, [allLocations, selectedState, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <PageHeaderBanner
        title="All-India District Software & SEO Hubs"
        bgImage="/services/web-dev.jpg"
      />

      <div className="max-w-7xl mx-auto py-10 sm:py-16 px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Intro Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pan-India Reach — 317+ Commercial Districts Across All 28 States</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Local Web Development, Mobile Apps &amp; SEO Solutions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              We empower local businesses, manufacturers, clinics, educators, and service providers across India with ultra-fast Next.js websites, mobile apps, and Google 1st-page Local SEO that guarantees inbound customer calls.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_1_CLEAN}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline ({PHONE_1})</span>
            </a>
          </div>
        </div>

        {/* Dedicated Direct Helpline Cards */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 border border-blue-800/60 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Pan-India Direct Consultation Desk</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Online Services For All Districts — Talk to our Tech Leads Directly
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Get free tech architecture consulting, live pricing quotations, and localized SEO keyword breakdowns within 15 minutes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-3 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/90 border border-blue-700/60 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Senior Consultant</span>
                  <a href={`tel:${PHONE_1_CLEAN}`} className="text-sm sm:text-base font-extrabold text-white hover:text-amber-400 transition-colors">
                    {PHONE_1}
                  </a>
                </div>
                <a
                  href={`https://wa.me/917895094129?text=${encodeURIComponent('Hello Zenith Web Works! I want to inquire about website / app / SEO services for my district.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0 ml-1"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-3 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/90 border border-blue-700/60 shadow-md">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Technical Helpline</span>
                  <a href={`tel:${PHONE_2_CLEAN}`} className="text-sm sm:text-base font-extrabold text-white hover:text-amber-400 transition-colors">
                    {PHONE_2}
                  </a>
                </div>
                <a
                  href={`https://wa.me/919193648939?text=${encodeURIComponent('Hello Zenith Web Works! I would like to build an online web / app solution.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0 ml-1"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Controls & Search */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search any district, city, state, or industry (e.g. Lucknow, Patna, Jaipur, Ludhiana, Chennai, Kolkata)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 self-end md:self-center shrink-0">
              Showing <span className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredLocations.length}</span> of {allLocations.length} Districts
            </div>
          </div>

          {/* State Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {stateList.map((state) => {
              const count =
                state === 'All'
                  ? allLocations.length
                  : allLocations.filter((d) => d.state === state).length;
              const isActive = selectedState === state;

              return (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {state} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Locations Grid */}
        {filteredLocations.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
            <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No districts found matching &quot;{searchQuery}&quot;
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching by city name, Hindi name, or clear the search filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedState('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredLocations.map((item) => (
              <div
                key={item.slug}
                className="group p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <Link
                      href={`/locations/${item.slug}`}
                      className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors block line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-700">
                      {item.state}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-2">
                    {item.hindiName}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    <strong className="text-slate-700 dark:text-slate-300">Focus:</strong> {item.prominentFor}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.popularServices.slice(0, 2).map((srv) => (
                      <span
                        key={srv}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Online Service Active
                  </span>
                  <Link
                    href={`/locations/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors"
                  >
                    <span>View Page</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Don&apos;t See Your Exact Tehsil or Block?
            </h2>
            <p className="text-xs sm:text-sm font-medium text-emerald-50 max-w-xl">
              We operate 100% online across all 28 states and union territories of India. Contact our senior engineers right now to start your project.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_1_CLEAN}`}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105"
            >
              Call {PHONE_1}
            </a>
            <a
              href={`https://wa.me/917895094129?text=${encodeURIComponent('Hello Zenith Web Works! I would like to discuss my project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
