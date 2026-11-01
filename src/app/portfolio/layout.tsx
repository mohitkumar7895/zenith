import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects & Client Portfolio | Call +91 7895094129 | Zenith Web Works',
  description:
    'Explore live websites, e-commerce stores, Android mobile apps, and custom CRMs built by Zenith Web Works. Call +91 7895094129 to start your project with fast 3-7 day delivery!',
  keywords: [
    'Web Development Portfolio',
    'Mobile App Case Studies',
    'Website Design Examples',
    'Call 7895094129',
    'Call 9193648939',
    'Delivered Client Projects',
    'Custom Website Examples India',
    'Android App Showcase',
    'Zenith Web Works Portfolio',
  ],
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Client Portfolio & Live Demos | Call +91 7895094129 | Zenith Web Works',
    description:
      'Proven software engineering results. Browse our delivered web applications, Android apps, and client transformations.',
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
