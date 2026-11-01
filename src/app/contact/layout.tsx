import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithwebworks.in';

export const metadata: Metadata = {
  title: 'Contact Us | Call +91 7895094129 / +91 9193648939 | Zenith Web Works',
  description:
    'Call or WhatsApp our co-founders directly on +91 7895094129 / +91 9193648939. Get instant website & mobile app estimates, roadmap, and free technical consultation in minutes.',
  keywords: [
    'Contact Zenith Web Works',
    'Call 7895094129',
    'Call 9193648939',
    'Website Development Helpline',
    'Website Banwane Ka Number',
    'Hire Dedicated Developers India',
    'Get Website Project Quote',
    'Zenith Web Works Phone Number',
    'Software Company Contact Etawah UP',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Zenith Web Works | Direct Founder Helpline +91 7895094129',
    description:
      'Speak directly with technical founders Dhani Ram Singh & Mohit Kumar. Receive a free quote and architecture roadmap.',
    url: '/contact',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Zenith Web Works',
  url: `${siteUrl}/contact`,
  description: 'Direct phone and WhatsApp helpline to hire custom website and mobile app engineers.',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'Zenith Web Works',
    image: `${siteUrl}/icon.png`,
    telephone: '+917895094129',
    email: 'infozenithwebworks@gmail.com',
    priceRange: '₹4,999 - ₹49,999',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bidhuna Road, Bharthana',
      addressLocality: 'Etawah',
      addressRegion: 'Uttar Pradesh',
      postalCode: '206242',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+917895094129',
        contactType: 'founder & sales',
        availableLanguage: ['Hindi', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+919193648939',
        contactType: 'founder & technical support',
        availableLanguage: ['Hindi', 'English'],
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  );
}
