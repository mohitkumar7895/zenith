'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Globe2,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Code2,
  DollarSign,
  Laptop,
  Users2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Building,
  Check,
} from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

const PHONE_INTL = '+917895094129';
const PHONE_INTL_DISPLAY = '+91 7895094129';
const WHATSAPP_URL =
  'https://wa.me/917895094129?text=Hello%20Zenith%20Team!%20I%20am%20interested%20in%20offshore%20software%20development%20or%20hiring%20dedicated%20developers.';

export default function GlobalPage() {
  const { openConsultationModal } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const countries = [
    {
      flag: '🇺🇸',
      name: 'United States',
      hubs: 'New York, San Francisco, Austin, Miami, Chicago',
      tz: 'EST / CST / PST (4-5 hrs daily overlap)',
      useCase: 'SaaS startups, fintech MVP builds, agency white-label overflow, dedicated React/Next.js engineers.',
    },
    {
      flag: '🇬🇧',
      name: 'United Kingdom',
      hubs: 'London, Manchester, Birmingham, Edinburgh',
      tz: 'GMT / BST (5-6 hrs daily overlap)',
      useCase: 'E-commerce engineering, bespoke CRM automation, agency engineering partner, digital transformation.',
    },
    {
      flag: '🇨🇦',
      name: 'Canada',
      hubs: 'Toronto, Vancouver, Montreal, Calgary',
      tz: 'EST / PST (4-5 hrs daily overlap)',
      useCase: 'Custom software platforms, healthcare booking systems, high-speed corporate web portals.',
    },
    {
      flag: '🇦🇺',
      name: 'Australia',
      hubs: 'Sydney, Melbourne, Brisbane, Perth',
      tz: 'AEST / AWST (4-6 hrs daily overlap)',
      useCase: 'Mobile app development (Flutter/Android), marketplace platforms, local service directory portals.',
    },
    {
      flag: '🇦🇪',
      name: 'United Arab Emirates',
      hubs: 'Dubai, Abu Dhabi, Sharjah',
      tz: 'GST (Full daily working hour alignment)',
      useCase: 'Luxury retail e-commerce, real estate booking engines, multi-currency payment portals.',
    },
    {
      flag: '🇪🇺',
      name: 'Europe & Germany',
      hubs: 'Berlin, Amsterdam, Paris, Zurich',
      tz: 'CET (5-6 hrs daily overlap)',
      useCase: 'GDPR-compliant web applications, high-concurrency MySQL/Node.js backends, API integrations.',
    },
  ];

  const engagementModels = [
    {
      title: 'Dedicated Developer / Pod',
      badge: 'Most Cost Effective for Scale',
      rate: '$18 – $25 / hr',
      period: 'or $2,400 / month full-time (160 hrs)',
      desc: 'Hire a dedicated full-stack engineer or a pod working exclusively on your product backlog.',
      highlight: true,
      features: [
        'Full-time 40 hrs/week dedicated engineer',
        'Daily video standups & real-time Slack/Teams sync',
        'Direct GitHub / GitLab repository commits',
        '4–6 hours daily US/UK/AU timezone overlap',
        '1-Week Risk-Free Trial (No commitment)',
        'Scale team up or down with 2-week notice',
        'Strict NDA & 100% IP rights ownership',
      ],
      ctaText: 'Hire Dedicated Developer',
    },
    {
      title: 'Fixed-Price Milestone Project',
      badge: 'Best For Defined MVPs & Sites',
      rate: '$199 – $1,499+',
      period: 'one-time milestone billing',
      desc: 'Ideal for custom websites, e-commerce stores, and well-scoped startup MVPs.',
      highlight: false,
      features: [
        'Comprehensive technical roadmap & architecture scope',
        'Clear milestone delivery checkpoints (25/50/75/100%)',
        'Sub-second page speeds with Next.js & Cloudflare CDN',
        'Full mobile responsiveness & technical SEO configuration',
        'Free 30 days post-launch warranty & bug-fix support',
        '100% intellectual property & source code transfer',
      ],
      ctaText: 'Request Fixed Price Scope',
    },
    {
      title: 'Monthly Engineering Retainer',
      badge: 'For Continuous Growth & Upkeep',
      rate: '$499 – $999 / mo',
      period: 'monthly recurring retainer',
      desc: 'Ongoing maintenance, security hardening, database optimization, and continuous feature additions.',
      highlight: false,
      features: [
        'Dedicated monthly hours for design & code updates',
        '24/7 uptime monitoring & automated daily backups',
        'Security patches, speed audits & Core Web Vitals checks',
        'Priority emergency support turnaround (under 2 hours)',
        'Monthly technical performance & SEO analytics report',
        'Cancel anytime with zero lock-in contracts',
      ],
      ctaText: 'Get Retainer Support',
    },
  ];

  const faqs = [
    {
      q: 'How do you handle time zone differences with US, UK, and Australian clients?',
      a: 'We establish a 4 to 6-hour daily synchronous working overlap with your local time zone (EST, PST, GMT, or AEST). Daily standups, code reviews, and ad-hoc Slack syncs take place live during your regular office hours, while async progress updates and Loom videos ensure continuous progress around the clock.',
    },
    {
      q: 'How is Intellectual Property (IP) and confidentiality protected?',
      a: 'We operate under strict US and International legal standards. A comprehensive Non-Disclosure Agreement (NDA) is executed before any discovery discussion. Upon project completion or milestone settlement, 100% of all intellectual property, source code, design assets, and database access are transferred exclusively to your company.',
    },
    {
      q: 'How much money do we save by hiring offshore developers from Zenith Web Works?',
      a: 'An in-house or local agency full-stack developer in the US or UK costs between $90,000 and $150,000 annually (or $80–$150/hr). With Zenith, top 1% dedicated full-stack developers start from $18 to $25/hr ($2,400/month), reducing your engineering payroll by up to 70% while maintaining the exact same code quality and modern stack (Next.js 16, React 19, TypeScript, Flutter).',
    },
    {
      q: 'What international payment methods do you accept?',
      a: 'We accept SWIFT Wire Transfers, Stripe, Wise, PayPal, and Escrow. We can bill in USD ($), GBP (£), EUR (€), AUD (A$), CAD (C$), or AED (AED) with transparent invoices and zero hidden conversion surcharges.',
    },
    {
      q: 'Can we interview developers before hiring?',
      a: 'Absolutely. We share developer portfolios and GitHub profiles, schedule video technical interviews via Google Meet or Zoom, and provide a 1-week risk-free trial so your tech lead can evaluate code architecture and communication before making a long-term commitment.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <PageHeaderBanner
        title="Global Offshore Software Engineering"
        bgImage="/services/web-dev.jpg"
      />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
              <Globe2 className="w-4 h-4 text-amber-500" />
              <span>Offshore Engineering Partner • USA, UK, Canada, Australia, UAE &amp; Europe</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Hire Dedicated Developers &amp; Scale Your Software at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">
                70% Less Cost
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We empower startups, agencies, and enterprises across the US, UK, Australia, and UAE with elite Next.js full-stack developers, mobile app engineers, and bespoke CRM architects. Overlapping timezones, fluent English communication, and 100% source code ownership.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5">
              <a
                href={`tel:${PHONE_INTL}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call International: {PHONE_INTL_DISPLAY}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Chat</span>
              </a>

              <button
                onClick={() => openConsultationModal()}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 transition-all cursor-pointer active:scale-95"
              >
                <span>Book 20-Min Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 justify-center">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>4-6 Hrs US/UK Overlap</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Strict Mutual NDA</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 justify-center">
                <DollarSign className="w-4 h-4 text-sky-500 shrink-0" />
                <span>From $18 / hr ($2,400/mo)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>1-Week Risk-Free Trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid: Local Agency vs Zenith Offshore */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-500">
            Why Outsource To Zenith Web Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            The Economic Advantage of Offshore Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Silicon Valley, London, and Sydney caliber code delivered without the exorbitant domestic agency overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-4xl mx-auto">
          {/* US / Domestic In-House */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-300 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                In-House US / UK Hiring
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold">Expensive &amp; Slow</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>$85 – $150 / hr agency billing rates ($12,000+ per month)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>4 to 8 weeks typical hiring &amp; onboarding cycle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Payroll taxes, employee healthcare, hardware &amp; benefits overhead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Long-term contracts with high severance liabilities</span>
              </li>
            </ul>
          </div>

          {/* Zenith Offshore Partner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e1f42] to-[#071128] border-2 border-amber-500 shadow-2xl shadow-amber-500/20 space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Zenith Dedicated Offshore Pod</span>
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Save Up to 70%</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>$18 – $25 / hr</strong> ($2,400/month flat for 160 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deploy vetted Next.js / Flutter engineers within <strong>48 hours</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero payroll taxes, equipment, or benefits liabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1-Week Risk-Free Trial with flexible monthly scale up/down</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Countries Grid */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#071026] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Global Outsourcing Corridors We Serve
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Tailored timezone schedules, compliance frameworks, and currency invoicing for leading global tech centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {country.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {country.tz}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <p><strong>Major Hubs:</strong> {country.hubs}</p>
                  <p><strong>Primary Workflows:</strong> {country.useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models & Pricing (USD) */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-500">
            Transparent Global Engagement
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            International Pricing &amp; Hiring Models
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Billed transparently in USD, GBP, EUR, or AUD. Zero hidden transaction fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {engagementModels.map((model, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                model.highlight
                  ? 'bg-gradient-to-b from-[#0e1d3e] to-[#071026] border-2 border-amber-500 shadow-2xl shadow-amber-500/20 scale-[1.02] text-white'
                  : 'bg-white dark:bg-[#071022] border border-slate-200 dark:border-slate-800 shadow-md'
              }`}
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border ${
                  model.highlight
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-amber-500 border-slate-200 dark:border-slate-700'
                }`}>
                  {model.badge}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold">
                  {model.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-80 mt-2 leading-relaxed">
                  {model.desc}
                </p>

                <div className="mt-5 pb-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold tracking-tight">
                    {model.rate}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {model.period}
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-70">Key Deliverables:</p>
                  <ul className="space-y-2">
                    {model.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                <button
                  onClick={() => openConsultationModal()}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    model.highlight
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-lg shadow-orange-500/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{model.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* International FAQs */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#071026] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Global Procurement &amp; Outsourcing FAQs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Clear answers regarding contracts, IP rights, billing, and collaboration protocols.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-amber-500 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/80 dark:border-slate-800 pt-4">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Final Conversion Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-slate-950 via-[#0a1636] to-slate-950 text-white border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Accelerate Your Engineering Roadmap?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Speak directly with our technical leadership. Receive a free architecture consultation, developer profile shortlist, and milestone scope within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${PHONE_INTL}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{PHONE_INTL_DISPLAY}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

