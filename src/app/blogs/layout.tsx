import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech & Web Engineering Blog | Call +91 7895094129 | Zenith Web Works',
  description:
    'Read actionable guides on modern web architecture, Android app engineering, Local SEO tactics, and Google ranking from Zenith Web Works. Direct helpline: +91 7895094129.',
  keywords: [
    'Tech Blog India',
    'Next.js Tutorials',
    'Software Architecture Insights',
    'Mobile App Guides',
    'Local SEO Strategies',
    'Call 7895094129',
    'Zenith Web Works Blog',
  ],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Tech & Engineering Blog | Zenith Web Works',
    description:
      'Actionable guides, web engineering insights, and tech trends from our engineering team.',
    url: '/blogs',
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
