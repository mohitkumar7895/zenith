'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, ArrowRight, Phone } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-slate-950 dark:bg-[#040814] text-slate-400 text-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10">
          {/* Brand Logo */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-2.5 sm:space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white rounded-xl px-2.5 xs:px-3.5 py-1.5 xs:py-2 shadow-md shadow-orange-500/10 inline-flex items-center transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/logo.png"
                  alt="Zenith Web Works"
                  width={2172}
                  height={724}
                  className="h-8 xs:h-9 sm:h-12 w-auto max-w-[160px] xs:max-w-[210px] object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              We deliver custom web applications, Android mobile apps, graphic design, paid ads and high-performance cloud hosting that power high-growth digital businesses.
            </p>
          </div>

          {/* Core Practices & Solutions Side-by-Side on Mobile, 2 distinct columns on Desktop */}
          <div className="grid grid-cols-2 gap-4 xs:gap-6 sm:contents">
            {/* Core Practices */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-2.5 sm:mb-4">Core Practices</h3>
              <ul className="space-y-1.5 sm:space-y-2.5 text-xs text-slate-400">
                <li><Link href="/services/custom-website-development" className="hover:text-amber-400 transition-colors">Custom Websites</Link></li>
                <li><Link href="/services/android-app-development" className="hover:text-amber-400 transition-colors">Android Apps</Link></li>
                <li><Link href="/services/graphic-designing" className="hover:text-amber-400 transition-colors">Graphic Designing</Link></li>
                <li><Link href="/services/logo-banner-designing" className="hover:text-amber-400 transition-colors">Logo & Banners</Link></li>
                <li><Link href="/services/paid-ads-google-meta" className="hover:text-amber-400 transition-colors">Google & Meta Ads</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-2.5 sm:mb-4">Solutions</h3>
              <ul className="space-y-1.5 sm:space-y-2.5 text-xs text-slate-400">
                <li><Link href="/services/web-app-crm-development" className="hover:text-amber-400 transition-colors">Business CRMs</Link></li>
                <li><Link href="/services/seo-performance-optimization" className="hover:text-amber-400 transition-colors">SEO & Speed</Link></li>
                <li><Link href="/services/hosting-cloudflare-setup" className="hover:text-amber-400 transition-colors">Cloud & Hosting</Link></li>
                <li><Link href="/services/website-maintenance-support" className="hover:text-amber-400 transition-colors">Maintenance Plans</Link></li>
                <li><Link href="/services" className="hover:text-amber-400 font-semibold text-amber-500/90 transition-colors">View All Services →</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="pt-2 sm:pt-0 border-t border-slate-900 sm:border-0">
            <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-2.5 sm:mb-4">Get In Touch</h3>
            <div className="space-y-2 sm:space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Office: Bidhuna Road, Bharthana, Etawah, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+917895094129" className="hover:text-amber-400 transition-colors font-medium">
                  +91 7895094129
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:contact@zenithwebworks.io" className="hover:text-amber-400 transition-colors">
                  contact@zenithwebworks.io
                </a>
              </div>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-orange-400 transition-colors"
                >
                  <span>Visit Contact Office Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Zenith Web Works. All rights reserved. • We Build Ideas For A Better Web</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <Link href="/sitemap" className="text-amber-400/90 hover:text-amber-300 font-semibold transition-colors">HTML Sitemap</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Sitemap.xml</a>
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Direct Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
