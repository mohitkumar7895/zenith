import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers & Opportunities | Join Zenith Web Works',
  description:
    'Join a fast-growing engineering team. Explore career opportunities for full-stack developers, mobile engineers, UI/UX designers, and digital marketers at Zenith Web Works.',
  keywords: [
    'Careers Zenith Web Works',
    'Software Engineer Jobs',
    'Remote Web Developer Jobs',
    'Next.js Developer Hiring',
    'Tech Careers India',
  ],
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers at Zenith Web Works',
    description:
      'We are looking for passionate engineers, designers, and problem solvers. Build the future of the web with us.',
    url: '/careers',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
