import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website & App Development FAQs | Call +91 7895094129 | Zenith Web Works',
  description:
    'Find answers on website prices starting ₹4,999, 3-7 day delivery, 100% code ownership, and Android apps. Speak with founders directly on +91 7895094129 / +91 9193648939.',
  keywords: [
    'Web Development FAQs',
    'Website Banwane Ka Kharcha',
    'Website Development Price India',
    'Call 7895094129',
    'Call 9193648939',
    'IT Services Questions',
    'Mobile App Timeline',
    'Code Ownership',
    'Software Pricing & Estimates',
    'Zenith Web Works FAQ',
  ],
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'FAQs | Call +91 7895094129 | Zenith Web Works',
    description:
      'Clear answers on custom website development, pricing from ₹4,999, timelines, code ownership, and direct phone consultation.',
    url: '/faqs',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the cost of website development at Zenith Web Works?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Small business websites start at just ₹4,999 with 5 responsive pages, free domain, high-speed hosting, and SSL certificate. E-commerce online shopping portals start at ₹12,999 and custom web applications / CRMs from ₹24,999. Call +91 7895094129 for an exact quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build and deploy a website or app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard business websites take 3 to 5 working days. Comprehensive e-commerce portals take 5 to 7 days, and custom Android mobile apps take 10 to 20 days. Clients receive staging preview links at each stage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do we get started or talk to your team directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can directly call or WhatsApp our co-founders Dhani Ram Singh at +91 7895094129 or Mohit Kumar at +91 9193648939. We explain the complete roadmap and share live demo links with zero obligation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I get complete ownership of the code and website assets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! You receive 100% intellectual property ownership of your codebase, database, domain credentials, and design assets upon project delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will our website rank on Google Search (SEO)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, every website comes with On-Page SEO, Google Search Console indexing, local Schema markup, and Google Business Profile optimization to help local customers find and call you.',
      },
    },
  ],
};

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  );
}
