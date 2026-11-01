import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website & App Development Services | Call +91 7895094129 | Zenith Web Works',
  description:
    'Full-cycle IT and software development services: custom responsive websites, Android mobile apps, enterprise CRMs, UI/UX design, and technical SEO from ₹4,999. Call or WhatsApp +91 7895094129 for instant free quote.',
  keywords: [
    'Custom Website Development',
    'Android App Development Services',
    'Web Application Development',
    'Custom CRM Software',
    'Graphic Designing & Branding',
    'SEO & Performance Optimization',
    'Hire Dedicated Developers',
    'IT Outsourcing Services India',
    'Call 7895094129',
    'Call 9193648939',
    'Website Development Price India',
    'Zenith Web Works Services',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Software & Web Development Services | Call +91 7895094129 | Zenith Web Works',
    description:
      'High-impact custom websites, mobile apps, CRM systems, and technical SEO starting at ₹4,999. Speak directly with our technical team today.',
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
