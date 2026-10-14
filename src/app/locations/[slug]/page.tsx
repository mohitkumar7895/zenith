import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UP_DISTRICTS,
  getDistrictBySlug,
  getAllDistrictSlugs,
} from '@/lib/upDistricts';
import { SERVICES_DATA } from '@/lib/data';
import {
  MapPin,
  Phone,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Award,
  Users2,
  Laptop,
} from 'lucide-react';
import DistrictInquiryForm from '@/components/DistrictInquiryForm';
import DistrictFaqAccordion from '@/components/DistrictFaqAccordion';

const PHONE_1 = '+91 7895094129';
const PHONE_1_CLEAN = '+917895094129';
const PHONE_2 = '+91 9193648939';
const PHONE_2_CLEAN = '+919193648939';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllDistrictSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    return {
      title: 'District Not Found | Zenith Web Works',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';
  const pageTitle = `Best Website & App Development Company in ${district.name}, UP | Zenith`;
  const pageDesc = `Leading software agency in ${district.name}, UP. Custom Next.js websites, Flutter apps, CRM & SEO. Sub-second speed, 100% code ownership. Call +91 7895094129 / +91 9193648939 for free quote.`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      `Website Development Company in ${district.name}`,
      `Android App Developer in ${district.name}`,
      `Web Design Agency ${district.name} UP`,
      `Custom Software CRM Developer in ${district.name}`,
      `SEO and Digital Marketing Agency in ${district.name}`,
      `Next.js Developer ${district.name} Uttar Pradesh`,
      `E-commerce Website Designer ${district.name}`,
      `Best IT Solutions Agency in ${district.name}`,
      `Zenith Web Works ${district.name}`,
    ],
    alternates: {
      canonical: `${siteUrl}/locations/${district.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `${siteUrl}/locations/${district.slug}`,
      siteName: 'Zenith Web Works',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/icon.png`,
          width: 512,
          height: 512,
          alt: `Zenith Web Works - IT Services in ${district.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [`${siteUrl}/icon.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  };
}

export default async function DistrictLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  // Get neighboring/same-zone districts
  const relatedDistricts = UP_DISTRICTS.filter(
    (d) => d.slug !== district.slug && (d.division === district.division || d.zone === district.zone)
  ).slice(0, 6);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';

  // Localized District FAQs for High Google Search Snippet Ranking
  const districtFaqs = [
    {
      q: `What is the cost of website development in ${district.name}, Uttar Pradesh?`,
      a: `Website development costs in ${district.name} typically start from ₹15,000 for standard business landing pages and ₹35,000 to ₹90,000+ for full-stack custom web applications, multi-vendor e-commerce portals, or custom CRM solutions. Every project includes custom Next.js code, free lifetime SSL, Cloudflare CDN, and 30 days of priority technical support. Call +91 7895094129 for a free itemized quote.`,
    },
    {
      q: `How long does it take to launch an Android app or website for a ${district.name} business?`,
      a: `Standard business websites are designed, developed, and deployed within 5 to 10 working days. Custom Android mobile applications and advanced CRM platforms usually take 2 to 4 weeks depending on the feature scope. We provide interactive staging links so you can preview progress in real time before launch.`,
    },
    {
      q: `Do you provide on-site support and direct meetings in ${district.name}?`,
      a: `Yes! While our primary engineering base is located in Uttar Pradesh (Etawah / NCR connectivity), we provide direct on-site consultation, video strategy calls (Google Meet / Zoom), and dedicated WhatsApp/phone assistance across all 75 districts of Uttar Pradesh including ${district.name}.`,
    },
    {
      q: `Will our website rank on Google for local searches in ${district.name}?`,
      a: `Yes, guaranteed. Every website we build is engineered with complete Technical On-Page SEO: lightning-fast Core Web Vitals (<1 second load time), Google Search Console sitemap indexing, localized Schema.org markup, semantic headings, and Google Business Profile optimization to ensure top visibility for customers searching in ${district.name} and across Uttar Pradesh.`,
    },
    {
      q: `Will I get 100% ownership of the website code and database?`,
      a: `Yes, 100%. Upon final project handover, Zenith provides complete ownership of your GitHub source code repository, MySQL database credentials, domain DNS, and server keys. We never lock clients into proprietary vendor platforms.`,
    },
  ];

  // Schema 1: LocalBusiness & ProfessionalService
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Zenith Web Works - ${district.name}`,
    image: `${siteUrl}/icon.png`,
    '@id': `${siteUrl}/locations/${district.slug}#service`,
    url: `${siteUrl}/locations/${district.slug}`,
    telephone: PHONE_1,
    priceRange: '₹₹',
    currenciesAccepted: 'INR, USD',
    paymentAccepted: 'UPI, Net Banking, Credit Card',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:30-19:30',
    address: {
      '@type': 'PostalAddress',
      addressLocality: district.name,
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'IN',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: `${district.name}, Uttar Pradesh`,
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Uttar Pradesh',
      },
    ],
    description: `Leading website development, Android application, custom CRM, and SEO engineering agency serving clients in ${district.name}, Uttar Pradesh.`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `IT & Software Services in ${district.name}`,
      itemListElement: SERVICES_DATA.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${s.title} in ${district.name}`,
          description: s.shortDescription,
        },
      })),
    },
  };

  // Schema 2: FAQPage for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: districtFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  // Schema 3: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${siteUrl}/sitemap`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Uttar Pradesh',
        item: `${siteUrl}/sitemap`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: district.name,
        item: `${siteUrl}/locations/${district.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Search Engine Schemas (Tri-Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#071126]/70 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 truncate">
            <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/sitemap" className="hover:text-amber-500 transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-slate-400">Uttar Pradesh</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold truncate">{district.name}</span>
          </nav>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a href={`tel:${PHONE_1_CLEAN}`} className="hover:text-emerald-500 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-500" />
              <span>{PHONE_1}</span>
            </a>
            <span className="text-slate-400">|</span>
            <a href={`tel:${PHONE_2_CLEAN}`} className="hover:text-blue-500 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-blue-500" />
              <span>{PHONE_2}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>{district.name} ({district.hindiName}) • {district.division} Division</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Custom Website &amp; App Development in{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {district.name}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We empower startups, manufacturers, retailers, and institutions in <strong>{district.name}</strong> with high-performance Next.js websites, Android applications, custom CRM portals, and data-driven SEO campaigns engineered for revenue growth.
            </p>

            {/* Local Prominence Pill */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-white">Commercial Hub Specialization:</strong> {district.prominentFor}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#inquiry-form"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
              >
                Request Free Quote for {district.name}
              </a>

              <a
                href={`tel:${PHONE_1_CLEAN}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {PHONE_1}</span>
              </a>

              <a
                href={`https://wa.me/917895094129?text=${encodeURIComponent(`Hello Zenith! I need custom website / app development in ${district.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#20ba59] transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Services Tailored For District */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              High-Performance Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Our Core IT Services in {district.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              From bespoke corporate web applications to Android native mobile apps and multi-channel Google/Meta campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.slug}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {srv.title} in {district.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {srv.shortDescription}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {srv.features.slice(0, 3).map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {srv.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-amber-500 hover:text-amber-400 flex items-center gap-1"
                  >
                    <span>View Service Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="#inquiry-form"
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    Get Estimate →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Proven Engineering Process */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Seamless Project Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How We Build Your Digital Product in {district.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              A transparent, structured development workflow that keeps you informed at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-3xl font-extrabold text-amber-500/20 absolute top-3 right-4">01</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Free Consultation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct strategy call to analyze your business goals, target audience in {district.name}, and exact technical needs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-3xl font-extrabold text-blue-500/20 absolute top-3 right-4">02</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Modern UI/UX Design</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bespoke interactive mockups crafted for high conversion rates, modern aesthetics, and fluid mobile responsiveness.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-3xl font-extrabold text-emerald-500/20 absolute top-3 right-4">03</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Full-Stack Coding</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Clean, hand-written Next.js 16 or Flutter code backed by high-speed relational MySQL/PostgreSQL databases.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-3xl font-extrabold text-purple-500/20 absolute top-3 right-4">04</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs mb-3">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Speed &amp; Local SEO</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Comprehensive Core Web Vitals audit, SSL installation, Cloudflare CDN setup, and local Google schema indexing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-3xl font-extrabold text-rose-500/20 absolute top-3 right-4">05</span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-xs mb-3">
                05
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Launch &amp; Support</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Live Google Play Store / Web domain deployment with 30 days of free post-launch monitoring and bug fixing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Zenith in Uttar Pradesh */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">The Zenith Advantage</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Businesses in {district.name} Partner With Zenith
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Built by experienced engineers who deliver superior code quality, sub-second load times, and true client accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Zero WordPress Bloat</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Custom Next.js &amp; TypeScript code eliminates vulnerable plugins, slow database queries, and messy page builders.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sub-Second Load Times</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cloudflare CDN edge caching and modern bundle optimization ensure lightning-fast speeds for all mobile visitors in {district.name}.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">100% Code Ownership</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You own 100% of your source code, GitHub repository, database credentials, and server keys with zero vendor lock-in.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Direct Engineer Helpline</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct phone and WhatsApp access to our founders Dhani Ram Singh and Mohit Kumar — no middlemen or confusing ticketing systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Lead Capture Form Section */}
      <section id="inquiry-form" className="py-14 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                Instant Project Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Start Your Project in {district.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Fill out the quick form below. Our development team will review your requirements and provide a detailed scope, timeline, and pricing breakdown.
              </p>
            </div>

            <DistrictInquiryForm districtName={district.name} />
          </div>
        </div>
      </section>

      {/* Local Frequently Asked Questions (SEO Google Snippet Power) */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Local Search FAQ &amp; Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions for {district.name} Clients
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Everything you need to know about pricing, timelines, technology stacks, and maintenance in Uttar Pradesh.
            </p>
          </div>

          <DistrictFaqAccordion faqs={districtFaqs} districtName={district.name} />
        </div>
      </section>

      {/* Neighboring & Regional Districts Directory */}
      {relatedDistricts.length > 0 && (
        <section className="py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Nearby Districts in {district.division} &amp; {district.zone}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore custom web and mobile app development services in neighboring districts across Uttar Pradesh.
                </p>
              </div>

              <Link
                href="/sitemap"
                className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 shrink-0"
              >
                <span>View All 75 Districts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {relatedDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/locations/${d.slug}`}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all group"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors block truncate">
                    {d.name.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {d.hindiName}
                  </span>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                    <span>Explore</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Direct Calling Floating Banner */}
      <section className="p-8 sm:p-10 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border-t border-blue-900/40 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Prefer to Discuss Your {district.name} Project Over a Call?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect directly with our lead developers for technical feasibility, architectural guidance, or custom feature estimates.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${PHONE_1_CLEAN}`}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              Call {PHONE_1}
            </a>
            <a
              href={`tel:${PHONE_2_CLEAN}`}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              Call {PHONE_2}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
