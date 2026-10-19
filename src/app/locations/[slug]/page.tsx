import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UP_DISTRICTS,
  getDistrictBySlug,
  getAllDistrictSlugs,
  UPDistrict,
} from '@/lib/upDistricts';
import {
  BIHAR_DISTRICTS,
  getBiharDistrictBySlug,
  getAllBiharDistrictSlugs,
  BiharDistrict,
} from '@/lib/biharDistricts';
import {
  INDIA_DISTRICTS,
  getIndiaDistrictBySlug,
  getAllIndiaDistrictSlugs,
  IndiaDistrict,
} from '@/lib/indiaDistricts';
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
  Check,
  X,
  TrendingUp,
  Building2,
  ShieldAlert,
  Smartphone,
  Star,
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

type UnifiedDistrict =
  | (UPDistrict & { state: 'Uttar Pradesh'; stateHindi: 'उत्तर प्रदेश'; isBihar: false; topIndustries?: string[]; localHighlights?: string })
  | (BiharDistrict & { state: 'Bihar'; stateHindi: 'बिहार'; isBihar: true })
  | (IndiaDistrict & { stateHindi?: string; isBihar: false; division?: string; zone?: string });

function getAnyDistrict(slug: string): UnifiedDistrict | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();

  const biharMatch = getBiharDistrictBySlug(clean);
  if (biharMatch) {
    return {
      ...biharMatch,
      state: 'Bihar',
      stateHindi: 'बिहार',
      isBihar: true,
    };
  }

  const indiaMatch = getIndiaDistrictBySlug(clean);
  if (indiaMatch) {
    return {
      ...indiaMatch,
      isBihar: false,
    };
  }

  const upMatch = getDistrictBySlug(clean);
  if (upMatch) {
    return {
      ...upMatch,
      state: 'Uttar Pradesh',
      stateHindi: 'उत्तर प्रदेश',
      isBihar: false,
    };
  }

  return undefined;
}

export async function generateStaticParams() {
  const upSlugs = getAllDistrictSlugs();
  const biharSlugs = getAllBiharDistrictSlugs();
  const indiaSlugs = getAllIndiaDistrictSlugs();
  const allSlugs = [...upSlugs, ...biharSlugs, ...indiaSlugs];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const district = getAnyDistrict(slug);

  if (!district) {
    return {
      title: 'District Not Found | Zenith Web Works',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';
  const pageTitle = `Best Website & App Development Company in ${district.name}, ${district.state} | Zenith`;
  const pageDesc = `Top software agency in ${district.name}, ${district.state}. Custom Next.js websites, mobile apps, CRM, ERP & SEO. ₹4,999 onwards. 100% code ownership. Call +91 7895094129 / +91 9193648939.`;

  const localizedKeywords = [
    `Website Development Company in ${district.name}`,
    `Android App Developer in ${district.name} ${district.state}`,
    `Web Design Agency ${district.name} ${district.state}`,
    `Custom Software CRM Developer in ${district.name}`,
    `SEO and Digital Marketing Agency in ${district.name}`,
    `Next.js Developer ${district.name} ${district.state}`,
    `E-commerce Website Designer ${district.name}`,
    `Best IT Solutions Agency in ${district.name} ${district.state}`,
    `Zenith Web Works ${district.name}`,
    `Website banwane ke liye sampark karein ${district.name}`,
    `Call 7895094129`,
    `Call 9193648939`,
  ];

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: localizedKeywords,
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
          alt: `Zenith Web Works - IT Services in ${district.name}, ${district.state}`,
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
  const district = getAnyDistrict(slug);

  if (!district) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';

  // Neighboring / same-state districts
  let relatedDistricts: { slug: string; name: string; hindiName: string }[] = [];
  if (district.isBihar) {
    relatedDistricts = BIHAR_DISTRICTS.filter((d) => d.slug !== district.slug).slice(0, 6);
  } else if (district.state === 'Uttar Pradesh') {
    relatedDistricts = UP_DISTRICTS.filter((d) => d.slug !== district.slug).slice(0, 6);
  } else {
    relatedDistricts = INDIA_DISTRICTS.filter(
      (d) => d.state === district.state && d.slug !== district.slug
    ).slice(0, 6);
    if (relatedDistricts.length < 6) {
      const more = INDIA_DISTRICTS.filter((d) => d.slug !== district.slug).slice(0, 6 - relatedDistricts.length);
      relatedDistricts = [...relatedDistricts, ...more];
    }
  }

  // Localized District FAQs for High Google Search Snippet Ranking
  const districtFaqs = [
    {
      q: `What is the cost of website development in ${district.name}, ${district.state}?`,
      a: `Website development costs in ${district.name} start from just ₹4,999 to ₹8,999 for small business and shop websites, and ₹14,999 to ₹35,000+ for custom dynamic portals, hospital booking systems, and e-commerce stores. Every website includes 1-year free domain/hosting, SSL security, WhatsApp chat button, and 100% source code ownership. Call +91 7895094129 for an instant quote.`,
    },
    {
      q: `Can I discuss my project on phone or WhatsApp before making any payment?`,
      a: `Yes, absolutely! You can speak directly with our co-founders Dhani Ram Singh and Mohit Kumar on +91 7895094129 or +91 9193648939. We explain the complete technical roadmap, share live demos of similar projects in ${district.state}, and give you an exact written estimate with zero hidden fees.`,
    },
    {
      q: `How long does it take to make a website or mobile app for a ${district.name} business?`,
      a: `Standard business websites are built and deployed on Google within 3 to 7 working days. Custom Android mobile applications and advanced CRM platforms take 10 to 20 days. You receive live preview staging links to check and approve progress at every step.`,
    },
    {
      q: `Will our website rank on Google Search & Google Maps in ${district.name}, ${district.state}?`,
      a: `Yes, 100%. We configure technical local SEO, Google Search Console indexing, Google Business Profile (Map) integration, and localized Schema markup so that local customers searching in ${district.name} and across ${district.state} find your business at the top when searching for your services.`,
    },
    {
      q: `Will I get full ownership of my domain and source code?`,
      a: `Yes! Unlike freelancers who lock your domain under their account, Zenith buys the domain under YOUR name, provides 100% GitHub code ownership, database access, and admin credentials. You are never held hostage.`,
    },
    {
      q: `Can I update photos, phone numbers, and products myself from my mobile phone?`,
      a: `Yes, we provide an easy, password-protected admin dashboard designed for non-technical users. You can update your phone numbers, photos, student results, product prices, or notices directly from your smartphone in seconds.`,
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
      addressRegion: district.state,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'IN',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: `${district.name}, ${district.state}`,
      },
      {
        '@type': 'AdministrativeArea',
        name: district.state,
      },
    ],
    description: `Leading website development, Android application, custom CRM, and SEO engineering agency serving clients in ${district.name}, ${district.state}.`,
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
        item: `${siteUrl}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: district.state,
        item: district.isBihar ? `${siteUrl}/bihar` : `${siteUrl}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: district.name,
        item: `${siteUrl}/locations/${district.slug}`,
      },
    ],
  };

  const whatsappMessage = `Namaste Zenith team! Mujhe ${district.name} (${district.state}) me business ke liye website / mobile app banwani hai. Price aur live demo share karein.`;

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
            <Link href="/locations" className="hover:text-amber-500 transition-colors">Locations</Link>
            <span>/</span>
            {district.isBihar ? (
              <Link href="/bihar" className="hover:text-amber-500 transition-colors font-medium text-emerald-600 dark:text-emerald-400">
                Bihar
              </Link>
            ) : (
              <span className="text-slate-400">{district.state}</span>
            )}
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-emerald-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {district.name} ({district.hindiName}) • {district.state}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Best Website &amp; Mobile App Development Company in{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {district.name}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>{district.name}</strong> में अपने व्यापार, कोचिंग, हॉस्पिटल, फैक्ट्री या दुकान के लिए कस्टम Next.js वेबसाइट और Android ऐप बनवाएं। Google Search पर नंबर 1 रैंक करें और रोज़ाना असली ग्राहक पाएं।
            </p>

            {/* Local Prominence Pill */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-white">Commercial Specialization:</strong> {district.prominentFor}
              </span>
            </div>

            {/* Local Paragraph Highlight */}
            {district.localHighlights && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs text-slate-700 dark:text-amber-200/90 max-w-2xl mx-auto text-left leading-relaxed">
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>{district.name} Market Growth &amp; Digital Opportunity:</span>
                </div>
                <p>{district.localHighlights}</p>
              </div>
            )}

            {/* High-Converting Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing-plans"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
              >
                View Transparent Pricing Plans
              </a>

              <a
                href={`https://wa.me/917895094129?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#20ba59] transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Inquiry</span>
              </a>

              <a
                href={`tel:${PHONE_1_CLEAN}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {PHONE_1}</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              <div className="p-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Code Ownership</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>3 to 7 Days Delivery</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Sub-1 Sec Fast Loading</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>1 Year Free Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Top Local Industries in this District */}
      {district.topIndustries && district.topIndustries.length > 0 && (
        <section className="py-10 border-t border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-[#050c1c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                Local Sector Solutions
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Industries We Specialize in for {district.name}, {district.state}
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto pt-2">
              {district.topIndustries.map((ind) => (
                <div
                  key={ind}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 hover:border-amber-500 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Conversion Pricing Packages */}
      <section id="pricing-plans" className="py-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
              Affordable &amp; 100% Transparent
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Website &amp; App Packages for {district.name} Businesses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              No hidden monthly fees, no domain hostage tricks. Complete ownership with 1-year free SSL, domain, and technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Plan 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Starter Package</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Small Business Website</h3>
                <p className="text-xs text-slate-500 mt-1">For local retail shops, clinics, advocates, and local service providers in {district.name}.</p>
                
                <div className="mt-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹4,999 <span className="text-xs font-normal text-slate-500">- ₹8,999</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">One-time payment • 3-5 days delivery</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>3 to 5 Modern Responsive Pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Direct WhatsApp Chat &amp; Call Buttons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Google Maps Location Listing Setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>1 Year Free Domain (.com/.in) &amp; Fast Hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Lifetime Free SSL Security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>100% Mobile Friendly (Jio/Airtel 4G/5G Fast)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`https://wa.me/917895094129?text=${encodeURIComponent(`Namaste Zenith, mujhe ${district.name} (${district.state}) ke liye Starter Website (₹4,999 - ₹8,999) banwani hai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Starter Website</span>
                </a>
              </div>
            </div>

            {/* Plan 2 - Featured */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1836] border-2 border-amber-500 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
                Most Popular across India
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Growth &amp; High Leads</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Dynamic / E-Commerce / School Portal</h3>
                <p className="text-xs text-slate-500 mt-1">For coaching institutes, schools, wholesalers, exporters &amp; online brands in {district.name}.</p>
                
                <div className="mt-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹14,999 <span className="text-xs font-normal text-slate-500">- ₹24,999</span>
                  </div>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">One-time payment • 7-10 days delivery</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Next.js 16 Full-Stack Speed (&lt;1 Second Load)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Admin Dashboard (Change photos/prices from mobile)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Razorpay / UPI Payment Gateway Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Inquiry Lead CRM with Instant WhatsApp Alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Full On-Page Technical SEO for Google #1 Ranking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>100% Complete Source Code &amp; Database Handover</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`https://wa.me/917895094129?text=${encodeURIComponent(`Namaste Zenith, mujhe ${district.name} (${district.state}) ke liye Dynamic/E-Commerce portal (₹14,999 - ₹24,999) banwani hai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Get Dynamic Portal Demo</span>
                </a>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-500">Enterprise &amp; Mobile</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Custom Android App &amp; CRM</h3>
                <p className="text-xs text-slate-500 mt-1">For EdTech coaching test series, hospital management, multi-vendor stores &amp; ERP.</p>
                
                <div className="mt-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹29,999+ <span className="text-xs font-normal text-slate-500">Custom Scope</span>
                  </div>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">Native Flutter / Android • 15-25 days</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Android App published on Google Play Store</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Live Video / PDF Notes / Online Test Series Engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Push Notifications &amp; Automated SMS Reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Student / Patient / Customer Portal &amp; Accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>MySQL / PostgreSQL Dedicated Cloud Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Dedicated Technical Manager Support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`tel:${PHONE_1_CLEAN}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Call to Discuss App Project</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison: Zenith vs Cheap Freelancers (Dhokhadhadi Se Bachein) */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060d1f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Fraud Protection &amp; Quality Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why 90% of Cheap Agencies in {district.state} Fail You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Always ask these questions before giving advance payment to any local website designer.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b152d] shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60">
                  <th className="p-4 font-bold text-slate-900 dark:text-white">Crucial Feature</th>
                  <th className="p-4 font-bold text-rose-500">Unverified Freelancers / Cheap Agencies</th>
                  <th className="p-4 font-bold text-emerald-500">Zenith Web Works ({district.name})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold">Domain &amp; Code Ownership</td>
                  <td className="p-4 text-rose-500 flex items-center gap-1.5">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Domain registered under their name; demand ransom later</span>
                  </td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>100% Domain &amp; GitHub Code under YOUR name</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Loading Speed on Jio/Airtel</td>
                  <td className="p-4 text-rose-500 flex items-center gap-1.5">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Pirated WordPress themes take 7-10 seconds to open</span>
                  </td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Custom Next.js loads in &lt;1 second with 99+ PageSpeed</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Customer Lead Generation</td>
                  <td className="p-4 text-rose-500 flex items-center gap-1.5">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Static brochure page; zero leads or inquiries</span>
                  </td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Instant WhatsApp notification whenever a customer inquires</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">After-Launch Phone Support</td>
                  <td className="p-4 text-rose-500 flex items-center gap-1.5">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Phone switched off or charge ₹500 for small changes</span>
                  </td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Direct founder phone helpline with 1 year free bug support</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Hidden Renewal Costs</td>
                  <td className="p-4 text-rose-500 flex items-center gap-1.5">
                    <X className="w-4 h-4 shrink-0" />
                    <span>"₹2,000 me banaye" then demand ₹8,000 yearly renewal</span>
                  </td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Fixed transparent pricing with zero surprise charges</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Full-Stack Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              IT &amp; Digital Solutions in {district.name}
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
                Live Google Play Store / Web domain deployment with free post-launch monitoring and continuous bug fixing.
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
                Start Your Project in {district.name}, {district.state}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Fill out the quick form below. Our development team will review your requirements and provide a detailed scope, timeline, and pricing breakdown.
              </p>
            </div>

            <DistrictInquiryForm districtName={`${district.name}, ${district.state}`} />
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
              Everything you need to know about pricing, timelines, technology stacks, and maintenance in {district.state}.
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
                  Other Leading Districts in {district.state}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore custom web and mobile app development services in neighboring districts across {district.state}.
                </p>
              </div>

              <Link
                href="/locations"
                className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 shrink-0"
              >
                <span>View All Locations</span>
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

      {/* Direct Calling & WhatsApp Sticky Banner */}
      <section className="p-8 sm:p-10 bg-gradient-to-r from-emerald-950 via-slate-950 to-blue-950 border-t border-emerald-900/40 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Prefer to Discuss Your {district.name} Project Over a Call?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect directly with founders Dhani Ram Singh and Mohit Kumar for technical guidance, cost breakdown, and live demos.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/917895094129?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
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
