import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Software & Web Agency | Call +91 7895094129 | Zenith Web Works',
  description:
    'Meet the engineering team behind Zenith Web Works. Over 320+ successful websites, Android apps, and software systems delivered. Speak with founders directly on +91 7895094129.',
  keywords: [
    'About Zenith Web Works',
    'Call 7895094129',
    'Call 9193648939',
    'IT Software Agency India',
    'Full Stack Engineering Team',
    'Next.js Specialists India',
    'Custom Software Developers UP',
    'Web Architecture Company',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Zenith Web Works | Founder Helpline +91 7895094129',
    description:
      'Discover our leadership, engineering values, and track record delivering high-converting digital products for businesses across India.',
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
