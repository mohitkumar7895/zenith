import React from 'react';
import type { Metadata } from 'next';
import LocationsDirectoryClient from './LocationsDirectoryClient';

export const metadata: Metadata = {
  title: 'All India 28 States & 317+ Districts Locations Directory | Web Development, Apps & Local SEO Services',
  description:
    'Explore Zenith Web Works commercial hubs across 317+ districts in all 28 Indian States. Custom software, mobile apps & high-ranking local SEO. Call +91 7895094129 / +91 9193648939.',
  keywords: [
    'Web development services India',
    'Local SEO services all districts',
    'Mobile app development company India',
    'Website design agency India',
    'District wise website developer',
    'Zenith Web Works locations',
  ],
  alternates: {
    canonical: 'https://zenithwebworks.in/locations',
  },
  openGraph: {
    title: 'All India 28 States & 317+ Districts Directory | Zenith Web Works',
    description:
      'Search high-intent local IT solutions, web development, Android apps, and SEO services across 317+ districts in all 28 states of India.',
    url: 'https://zenithwebworks.in/locations',
    siteName: 'Zenith Web Works',
    type: 'website',
  },
};

export default function LocationsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zenith Web Works - All India District Software & Local SEO Directory',
    description: 'Comprehensive directory of web development, app engineering, and local SEO services across 317+ Indian districts.',
    url: 'https://zenithwebworks.in/locations',
    numberOfItems: 317,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationsDirectoryClient />
    </>
  );
}
