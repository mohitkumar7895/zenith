import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zenith Web Works',
  description:
    'Our commitment to your privacy. Learn how Zenith Web Works collects, protects, and handles your personal and project information.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
