import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT & Software Development Services | Web, Mobile & CRM',
  description:
    'Full-cycle IT and software development services: custom responsive websites, Android mobile apps, enterprise CRMs, UI/UX design, and technical SEO built to convert.',
  keywords: [
    'Custom Website Development',
    'Android App Development Services',
    'Web Application Development',
    'Custom CRM Software',
    'Graphic Designing & Branding',
    'SEO & Performance Optimization',
    'Hire Dedicated Developers',
    'IT Outsourcing Services',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Software & Web Development Services | Zenith Web Works',
    description:
      'Explore high-impact digital solutions: custom websites, mobile apps, CRM systems, and technical performance optimization for high-growth businesses.',
    url: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
