import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Hire Dedicated Developers & Get a Free Quote',
  description:
    'Ready to build your next digital product? Get in touch with Zenith Web Works today for a free project consultation, estimate, and roadmap within 24 hours.',
  keywords: [
    'Contact Zenith Web Works',
    'Hire Web Developers',
    'Get Project Quote',
    'Hire Android App Developers',
    'Request Consultation',
    'Software Development Outsourcing',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Get a Free Project Quote | Zenith Web Works',
    description:
      'Partner with experienced engineers. Share your project requirements and receive a comprehensive proposal within 24 hours.',
    url: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
