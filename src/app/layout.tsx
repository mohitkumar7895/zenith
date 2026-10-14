import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryModal from '@/components/InquiryModal';
import FloatingActions from '@/components/FloatingActions';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Zenith Web Works | Custom Web & Mobile App Development Company',
    template: '%s | Zenith Web Works',
  },
  description:
    'Award-winning IT & software engineering agency. We build custom websites, Android apps, custom CRMs, UI/UX designs, and cloud infrastructure for businesses in the US, UK, Canada, Australia, India, and worldwide.',
  keywords: [
    'Zenith Web Works',
    'Custom Website Development',
    'Android App Development Company',
    'Hire Dedicated Web Developers',
    'Outsource Software Development',
    'Next.js Development Agency',
    'React Full-Stack Developers',
    'Custom Web App & CRM Solutions',
    'UI UX Graphic Design Agency',
    'SEO & Technical Performance Optimization',
    'Cloudflare & Cloud Hosting Setup',
    'IT Solutions Worldwide',
    'Offshore Development India',
  ],
  authors: [{ name: 'Zenith Web Works', url: siteUrl }],
  creator: 'Zenith Web Works',
  publisher: 'Zenith Web Works',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Zenith Web Works',
    title: 'Zenith Web Works | Custom Web & Mobile App Development Company',
    description:
      'We engineer fast, scalable, conversion-ready websites, Android applications, and bespoke software systems for businesses worldwide.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Zenith Web Works - Software & Web Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenith Web Works | Custom Web & Mobile App Development Company',
    description:
      'High-performance websites, Android apps, and custom software delivered for global startups and growing businesses.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Zenith Web Works',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description:
        'Global custom website, Android application, and software engineering agency delivering high-performance digital products worldwide.',
      email: 'contact@zenithwebworks.io',
      sameAs: [],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Zenith Web Works',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}/icon.png`,
      description:
        'Full-cycle IT and software development agency specializing in custom web applications, Android apps, UI/UX design, cloud architecture, and SEO.',
      priceRange: '$$',
      currenciesAccepted: 'USD, EUR, GBP, AUD, CAD, INR',
      paymentAccepted: 'Wire Transfer, Credit Card, PayPal, UPI',
      areaServed: [
        { '@type': 'Place', name: 'Worldwide' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'IT & Software Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Website Development',
              description:
                'Custom-coded, high-converting websites and web applications built with Next.js, React, and modern full-stack architectures.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Android Mobile App Development',
              description:
                'Native and Flutter Android applications for businesses, startups, and enterprises with Google Play Store deployment.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom CRM & Web App Development',
              description:
                'Custom business automation, internal workflows, billing portals, and enterprise CRM solutions.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO & Performance Optimization',
              description:
                'Technical search engine optimization, Core Web Vitals optimization, and long-term organic ranking growth.',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema).replace(/</g, '\\u003c'),
          }}
        />
        <Script
          id="zenith-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('zenith_theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-black transition-colors duration-200">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <InquiryModal />
          <FloatingActions />
        </AppProvider>
      </body>
    </html>
  );
}
