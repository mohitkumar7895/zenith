import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Zenith Web Works | Our Story, Team & Engineering Values',
  description:
    'Meet the engineering minds behind Zenith Web Works. Delivering 320+ successful web and mobile solutions with 99/100 performance scores and 98.5% client retention.',
  keywords: [
    'About Zenith Web Works',
    'IT Software Agency',
    'Full Stack Engineering Team',
    'Next.js Specialists',
    'Custom Software Developers',
    'Web Architecture Company',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Zenith Web Works',
    description:
      'Discover our leadership, engineering values, and track record delivering high-converting digital products for worldwide clients.',
    url: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
