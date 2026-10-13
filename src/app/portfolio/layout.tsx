import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portfolio & Case Studies | Delivered Digital Projects',
  description:
    'Explore our successful projects: e-commerce platforms, custom web applications, Android mobile apps, and high-converting websites delivered for clients across India and globally.',
  keywords: [
    'Web Development Portfolio',
    'Mobile App Case Studies',
    'Delivered Client Projects',
    'Custom Website Examples',
    'Android App Showcase',
    'Zenith Web Works Case Studies',
  ],
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Client Portfolio & Case Studies | Zenith Web Works',
    description:
      'Proven engineering results. Browse our delivered web applications, Android apps, and client transformations.',
    url: '/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
