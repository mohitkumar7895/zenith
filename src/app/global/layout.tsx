import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';

export const metadata: Metadata = {
  title: 'Offshore Software Development & Hire Dedicated Developers | USA, UK, Canada, Australia | Zenith Web Works',
  description:
    'Award-winning offshore software development company. Hire dedicated Next.js, React, Node.js & Flutter developers from $18/hr. Overlapping US/UK/AU time zones, fluent English, 100% IP ownership. Call/WhatsApp +91 7895094129.',
  keywords: [
    'Offshore Software Development Company',
    'Hire Dedicated Developers India',
    'Outsource Web Development to India',
    'Hire Next.js Developers',
    'Hire React Full Stack Developers',
    'Custom Software Development USA UK Australia',
    'Hire Flutter Mobile App Developers',
    'Software Outsourcing Company',
    'Dedicated Remote Software Engineers $18 hr',
    'Web Development Agency for US Startups',
    'Outsource Web App Development Canada',
    'Software Engineering Firm UAE Dubai',
    'Zenith Web Works Global',
  ],
  alternates: {
    canonical: `${siteUrl}/global`,
  },
  openGraph: {
    title: 'Offshore Software Development & Dedicated Developers | USA, UK, Australia, UAE | Zenith Web Works',
    description:
      'Scale your engineering capacity with top 1% offshore developers. 4-6 hours timezone overlap with US/UK/AU, 100% IP code ownership, flexible hourly & fixed rates.',
    url: `${siteUrl}/global`,
    siteName: 'Zenith Web Works Global',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/icon.png`,
        width: 512,
        height: 512,
        alt: 'Zenith Web Works - Offshore Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offshore Software Development & Hire Dedicated Developers | Zenith Web Works',
    description:
      'Hire dedicated Next.js, React & mobile app engineers starting at $18/hr. 4-6 hrs US/UK/AU timezone overlap. Call +91 7895094129.',
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

const globalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/global#service`,
  name: 'Zenith Web Works - Global Offshore Software Development',
  url: `${siteUrl}/global`,
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/icon.png`,
  telephone: '+917895094129',
  email: 'infozenithwebworks@gmail.com',
  description:
    'Premier offshore software development and dedicated engineering team provider serving startups, scale-ups, and enterprises in the United States, United Kingdom, Canada, Australia, and the UAE.',
  priceRange: '$149 - $4,999',
  currenciesAccepted: 'USD, GBP, EUR, AUD, CAD, AED, INR',
  paymentAccepted: 'Wire Transfer, Credit Card, Stripe, PayPal, Wise, Escrow',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Singapore' },
    { '@type': 'Country', name: 'India' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '148',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Offshore Software Engineering & Dedicated Developer Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hire Dedicated Full-Stack Developer',
          description:
            'Dedicated full-time Next.js, React, Node.js or Flutter engineer working 40 hours/week with daily US/UK/AU timezone overlap.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web Application & SaaS Development',
          description:
            'Bespoke web applications, CRM portals, internal tools, and SaaS platforms engineered for high scalability and sub-second speed.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Native & Flutter Mobile App Development',
          description:
            'High-performance iOS and Android mobile applications with complete Play Store & App Store deployment.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Converting E-Commerce Store Engineering',
          description:
            'Global e-commerce websites with multi-currency checkout, Stripe/PayPal payment gateways, and inventory automations.',
        },
      },
    ],
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
      name: 'Global & Offshore Software Development',
      item: `${siteUrl}/global`,
    },
  ],
};

const internationalFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you handle time zone differences with US, UK, and Australian clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide 4 to 6 hours of daily synchronous business hour overlap with US Eastern (EST), US Pacific (PST), UK (GMT/BST), and Australian (AEST) time zones. Daily standups, Slack communications, and sprint demos happen in real-time during your working hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Intellectual Property (IP) and confidentiality protected?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We sign comprehensive Non-Disclosure Agreements (NDAs) before discussing project specifics. Upon delivery and final milestone settlement, 100% intellectual property, source code, database rights, and GitHub repository ownership are transferred to your company.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the pricing models for hiring offshore developers from Zenith Web Works?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer two transparent models: (1) Hourly / Monthly Dedicated Developers starting at $18 to $25/hour ($2,400/month for full-time 160 hours), saving you up to 70% compared to local hiring; and (2) Fixed-Scope Milestone Projects starting at $149 for websites and $799+ for full custom web/mobile applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'What international payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We support international SWIFT Wire Transfers, Stripe, Wise, PayPal, and Escrow in USD, GBP, EUR, AUD, CAD, and AED currencies with zero hidden conversion fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I interview and test developers before committing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We conduct technical resume sharing, video interview calls via Google Meet or Zoom, and provide a 1-week risk-free trial so you can evaluate code quality and communication firsthand.',
      },
    },
  ],
};

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(globalServiceSchema).replace(/</g, '\\u003c'),
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
          __html: JSON.stringify(internationalFaqSchema).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  );
}

