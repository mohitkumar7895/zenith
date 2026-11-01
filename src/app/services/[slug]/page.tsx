import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES_DATA } from '@/lib/data';
import ServiceInquiryButton from '@/components/ServiceInquiryButton';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  ChevronRight,
  Phone,
  MessageCircle,
} from 'lucide-react';

const SERVICE_IMAGES: Record<string, string> = {
  'custom-website-development': '/services/web-dev.jpg',
  'android-app-development': '/services/android-app.jpg',
  'graphic-designing': '/services/graphic-design.jpg',
  'logo-banner-designing': '/services/logo-design.jpg',
  'paid-ads-google-meta': '/services/paid-ads.jpg',
  'hosting-cloudflare-setup': '/services/hosting.jpg',
  'seo-performance-optimization': '/services/seo.jpg',
  'web-app-crm-development': '/services/crm.jpg',
  'website-maintenance-support': '/services/maintenance.jpg',
};

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found | Zenith Web Works',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';
  const imageUrl = SERVICE_IMAGES[slug] || '/icon.png';
  const pageTitle = `${service.title} Services | Call +91 7895094129 | Zenith Web Works`;
  const pageDesc = `${service.shortDescription} Starting from ₹4,999. Fast 3-7 days delivery & 100% code ownership. Call or WhatsApp +91 7895094129 / +91 9193648939 for instant free quote!`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      service.title,
      `Hire ${service.title} Experts`,
      `${service.title} Agency India`,
      `${service.title} Contact Number`,
      'Call 7895094129',
      'Call 9193648939',
      ...service.technologies,
      'Outsource IT Services India',
      'Best Software Engineering Agency',
      'Zenith Web Works',
    ],
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `/services/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [imageUrl],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';
  const serviceImage = SERVICE_IMAGES[slug] || '/services/web-dev.jpg';
  const otherServices = SERVICES_DATA.filter((s) => s.slug !== slug).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Zenith Web Works',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      telephone: '+917895094129',
      priceRange: '₹4,999 - ₹49,999',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '148',
        bestRating: '5',
        worstRating: '1',
      },
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.features.map((feature) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    },
  };

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
        name: 'Services',
        item: `${siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${siteUrl}/services/${slug}`,
      },
    ],
  };

  const serviceFaqs = [
    {
      q: `What is the cost of ${service.title} at Zenith Web Works?`,
      a: `${service.title} packages start from ₹4,999 for foundational solutions to ₹14,999 – ₹35,000+ for enterprise requirements. Every project includes 100% source code ownership, free 1-year hosting/domain setup, and direct founder phone support (+91 7895094129).`,
    },
    {
      q: `How long does it take to deliver ${service.title}?`,
      a: `Standard projects are completed and deployed within 3 to 7 working days. Custom enterprise scopes take 10 to 20 days with milestone demo links provided at each stage.`,
    },
    {
      q: `How can I discuss my project requirements right now?`,
      a: `You can directly call our co-founders at +91 7895094129 or +91 9193648939, or message us on WhatsApp for an instant technical consultation and free quotation.`,
    },
  ];

  const serviceFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceFaqSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#08122a]/70 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-amber-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-amber-500 transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-500 font-semibold truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>Enterprise & High-Growth IT Solutions</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2.5">
                  Core Technologies & Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Group */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <a
                  href="tel:+917895094129"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now: +91 7895094129</span>
                </a>
                <a
                  href="https://wa.me/917895094129?text=Hello%20Zenith%20Team,%20I%20am%20interested%20in%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <ServiceInquiryButton
                  serviceTitle={service.title}
                  label="Online Proposal"
                />
              </div>
            </div>

            {/* Right Media Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 group">
                <div className="aspect-4/3 relative">
                  <Image
                    src={serviceImage}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                    Zenith Delivery Standard
                  </span>
                  <p className="text-white text-base sm:text-lg font-bold">
                    Sub-second speed, 99.9% uptime & 100% IP code ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Deliverables & Features */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            What You Get With This Solution
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Engineered to remove bottlenecks and deliver tangible commercial outcomes for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {service.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {feature}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Custom tailored implementation designed to meet enterprise standards and maximize ROI.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Zenith */}
      <section className="py-12 bg-slate-100 dark:bg-[#08122a] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
              <Zap className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Speed & Performance</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Built on modern frameworks with Cloudflare CDN edge caching for sub-2s response worldwide.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">100% Code & Asset Ownership</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Full intellectual property transfer, database control, and zero vendor lock-in upon project completion.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
              <Clock className="w-8 h-8 text-blue-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">24/7 Ongoing Reliability</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Direct developer communications, transparent milestones, and responsive maintenance plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking: Explore Other Services */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Explore Complementary Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive end-to-end digital capabilities for every stage of your business.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-orange-500"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherServices.map((other) => (
            <Link
              key={other.slug}
              href={`/services/${other.slug}`}
              className="group p-4 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-sm transition-all"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                {other.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                {other.shortDescription}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Service FAQs Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {service.title} FAQs
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Common questions answered. Call +91 7895094129 for personalized technical advice.
            </p>
          </div>
          <div className="space-y-3">
            {serviceFaqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Kickstart Your {service.title} Project?
            </h3>
            <p className="text-sm sm:text-base font-medium opacity-90">
              Speak directly with our technical founders. Free architecture scoping, live project demos, and transparent milestone quote.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:+917895094129"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 text-white font-extrabold hover:bg-slate-900 transition-all text-sm shadow-xl"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Founder: +91 7895094129</span>
              </a>
              <a
                href="https://wa.me/917895094129?text=Namaste%20Zenith%20team,%20mujhe%20is%20service%20ke%20bare%20me%20baat%20karni%20hai."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba59] transition-all text-sm shadow-xl"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Now</span>
              </a>
              <ServiceInquiryButton
                serviceTitle={service.title}
                label="Request Proposal"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/20 text-slate-950 font-bold hover:bg-white/30 transition-all text-sm border border-slate-950/20 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
