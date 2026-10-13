import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Pricing, Timeline & IT Services',
  description:
    'Got questions? Read FAQs about our custom web and Android app development, tech stack, pricing, timelines, hosting, code ownership, and international client workflows.',
  keywords: [
    'Web Development FAQs',
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
    title: 'FAQs | Zenith Web Works',
    description:
      'Clear answers on custom software development timelines, code ownership, maintenance, and how to hire us.',
    url: '/faqs',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What technologies do you use for web and app development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialize in modern tech stacks: Next.js 16, React 19, TypeScript, Tailwind CSS, Node.js, and PHP / Laravel for backend engineering. For mobile apps, we develop in Android Native (Kotlin) and Flutter.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a custom website or mobile app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard custom website takes 1 to 2 weeks. Comprehensive e-commerce portals, custom web applications (CRMs), or Android mobile apps usually take 3 to 6 weeks depending on feature complexity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my website be mobile-responsive and fast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100% yes. Every single website we engineer is mobile-first, responsive across all screen sizes, and optimized to load in under 2 seconds with Cloudflare CDN edge caching.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I get complete ownership of the code and website assets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Once the project is delivered and finalized, you receive 100% intellectual property ownership of your codebase, database, design files, and server credentials.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do we get started with Zenith Web Works?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Submit an inquiry on our website. Our architecture lead will schedule a call to understand your requirements, provide a free system scope, and share a transparent milestone proposal.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
