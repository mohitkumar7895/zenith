import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Website Sitemap & Uttar Pradesh Local Directory (All 75 Districts)',
  description:
    'Complete directory of all pages, custom software development services, and local district-wise IT solutions across all 75 districts of Uttar Pradesh. Direct call: +91 7895094129 / +91 9193648939.',
  keywords: [
    'HTML Sitemap Uttar Pradesh',
    'Website Development in UP',
    'Android App Development in UP',
    'Custom CRM Developer Noida Lucknow Kanpur',
    'Website Designer Agra Varanasi Meerut',
    'All 75 Districts Uttar Pradesh IT Services',
    'Zenith Web Works Sitemap',
  ],
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
