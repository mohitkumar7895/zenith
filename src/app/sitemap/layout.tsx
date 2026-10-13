import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Website Sitemap | All Pages & IT Service Offerings',
  description:
    'Complete directory of all pages, custom software development services, case studies, and resources available across Zenith Web Works.',
  alternates: {
    canonical: '/sitemap',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
