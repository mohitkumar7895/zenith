import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Zenith Web Works',
  description:
    'Review the terms of service governing software development, digital consulting, and project delivery with Zenith Web Works.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
