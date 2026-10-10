import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryModal from '@/components/InquiryModal';

export const metadata: Metadata = {
  title: 'Zenith Web Works | We Build Ideas For A Better Web',
  description:
    'Zenith Web Works delivers custom websites, Android apps, graphic design, SEO, paid ads, and cloud hosting for businesses in India and worldwide.',
  keywords: ['Zenith Web Works', 'Custom Website Development', 'Android App Development', 'SEO', 'Google Ads', 'Graphic Design', 'Lucknow'],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('zenith_theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-black transition-colors duration-200">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <InquiryModal />
        </AppProvider>
      </body>
    </html>
  );
}
