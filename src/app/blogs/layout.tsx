import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech & Engineering Blog | Insights on Next.js, Apps & Growth',
  description:
    'Read the latest guides and industry perspectives from Zenith Web Works: modern web architecture, Android app development, SEO tactics, and digital scaling.',
  keywords: [
    'Tech Blog',
    'Next.js Tutorials',
    'Software Architecture Insights',
    'Mobile App Guides',
    'SEO Strategies',
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
