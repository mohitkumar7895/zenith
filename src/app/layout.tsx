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
    default: 'Zenith Web Works | Best Website & App Development Company | Call +91 7895094129',
    template: '%s | Zenith Web Works',
  },
  description:
    'Top custom website & Android mobile app development company. Websites starting at ₹4,999 with 3-7 day delivery & 100% source code ownership. Call or WhatsApp +91 7895094129 / +91 9193648939 for instant free quotation!',
  keywords: [
    'Zenith Web Works',
    'Website Development Company in India',
    'Best Website Development Company',
    'Website Banwane Ke Liye Sampark Karein',
    'Website Banane Wale Ka Number',
    'Android App Development Company',
    'Hire Dedicated Web Developers',
    'Outsource Software Development India',
    'Next.js Development Agency',
    'React Full-Stack Developers',
    'Custom Web App & CRM Solutions',
    'Low Cost Website Development India',
    'Ecommerce Website Design Company',
    'UI UX Graphic Design Agency',
    'SEO & Technical Performance Optimization',
    'Cloudflare & Cloud Hosting Setup',
    'Call 7895094129',
    'Call 9193648939',
    '7895094129',
    '9193648939',
    'Zenith Web Works Contact Number',
    'Website Development Helpline 7895094129',
    'Software Developer UP Bihar Delhi Phone Number',
  ],
  authors: [{ name: 'Zenith Web Works', url: siteUrl }],
  creator: 'Zenith Web Works',
  publisher: 'Zenith Web Works',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Zenith Web Works',
    title: 'Zenith Web Works | Best Website & App Development Company | Call +91 7895094129',
    description:
      'High-speed custom websites, Android applications, and software systems starting at ₹4,999. Fast 3-7 days delivery. Call +91 7895094129 for instant quotation.',
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
    title: 'Zenith Web Works | Best Website & App Development Company | Call +91 7895094129',
    description:
      'High-speed websites & Android apps starting at ₹4,999. Fast 3-7 days delivery. Call +91 7895094129.',
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
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Zenith Web Works',
      description: 'Best Custom Website & Mobile App Development Company in India',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Zenith Web Works',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description:
        'Award-winning IT and software engineering agency delivering custom websites, Android apps, custom CRMs, UI/UX design, and cloud hosting worldwide.',
      email: 'infozenithwebworks@gmail.com',
      telephone: '+917895094129',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+917895094129',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['Hindi', 'English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+919193648939',
          contactType: 'technical support',
          areaServed: 'IN',
          availableLanguage: ['Hindi', 'English'],
        },
      ],
      sameAs: [],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Zenith Web Works',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}/icon.png`,
      telephone: '+917895094129',
      description:
        'Custom web development, mobile app development, CRM solutions, and digital marketing company starting from ₹4,999. Fast 3-7 day delivery with 100% source code ownership.',
      priceRange: '₹4,999 - ₹49,999',
      currenciesAccepted: 'INR, USD, EUR, GBP',
      paymentAccepted: 'UPI, Net Banking, Credit Card, Wire Transfer',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bidhuna Road, Bharthana',
        addressLocality: 'Etawah',
        addressRegion: 'Uttar Pradesh',
        postalCode: '206242',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.7533,
        longitude: 79.2312,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '148',
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
        { '@type': 'AdministrativeArea', name: 'Bihar' },
        { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Australia' },
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
                'High-converting, responsive business websites built with Next.js & React starting at ₹4,999.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Android Mobile App Development',
              description:
                'Native Kotlin & Flutter Android apps for business and startups with Play Store deployment.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'E-Commerce Website Development',
              description:
                'Full online store with payment gateway, cart, order tracking, and admin dashboard.',
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
                'Local SEO, Google ranking optimization, Core Web Vitals, and lead generation.',
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
