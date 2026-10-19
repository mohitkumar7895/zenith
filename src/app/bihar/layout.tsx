import type { Metadata } from 'next';
import React from 'react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';

export const metadata: Metadata = {
  title: 'Best Website & Mobile App Development Company in Bihar | Zenith Web Works',
  description:
    'Top software agency in Bihar. Next.js websites, Flutter Android mobile apps, Coaching ERP, Hospital CRM & SEO. ₹4,999 onwards. 100% code ownership. Serving all 38 districts of Bihar. Call +91 7895094129 / +91 9193648939.',
  keywords: [
    'Website Development Company in Bihar',
    'Best App Development Company in Bihar',
    'Software Company in Patna Bihar',
    'Web Design Agency Bihar',
    'Coaching Institute App Developer Bihar',
    'Hospital Management Software Bihar',
    'E-commerce Website Designer Bihar',
    'Custom CRM Developer Bihar',
    'SEO Agency in Bihar',
    'Website Banwane Ki Company Bihar',
    'Zenith Web Works Bihar',
    'Muzaffarpur Website Designer',
    'Gaya App Developer',
    'Darbhanga Makhana Export Website',
    'Bhagalpur Silk E-Commerce',
  ],
  alternates: {
    canonical: `${siteUrl}/bihar`,
  },
  openGraph: {
    title: 'Best Website & Mobile App Development Company in Bihar | Zenith',
    description:
      'Empowering businesses across all 38 districts of Bihar with fast Next.js websites, mobile apps, and customer-generating SEO. Starting ₹4,999.',
    url: `${siteUrl}/bihar`,
    siteName: 'Zenith Web Works',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/icon.png`,
        width: 512,
        height: 512,
        alt: 'Zenith Web Works Bihar - IT & Web Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Website & App Development Company in Bihar | Zenith',
    description:
      'High-performance Next.js websites & mobile apps for Bihar businesses. Starting ₹4,999. Call +91 7895094129.',
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

export default function BiharLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zenith Web Works - Bihar',
    image: `${siteUrl}/icon.png`,
    '@id': `${siteUrl}/bihar#service`,
    url: `${siteUrl}/bihar`,
    telephone: '+91 7895094129',
    priceRange: '₹₹',
    currenciesAccepted: 'INR, USD',
    paymentAccepted: 'UPI, Net Banking, Credit Card',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:30-19:30',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.5941',
      longitude: '85.1376',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Bihar',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Patna',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Muzaffarpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Gaya',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Darbhanga',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Bhagalpur',
      },
    ],
    description:
      'Premier website development, Android application engineering, coaching software, and Google SEO company serving businesses across all 38 districts of Bihar.',
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
        name: 'Bihar Locations',
        item: `${siteUrl}/bihar`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
