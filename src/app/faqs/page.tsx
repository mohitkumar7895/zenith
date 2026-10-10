'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircleQuestion } from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

export default function FaqsPage() {
  const { openConsultationModal } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What technologies do you use for web and app development?',
      a: 'We specialize in modern, high-performance tech stacks: Next.js 16, React 19, TypeScript, Tailwind CSS, Node.js, and PHP / Laravel for backend engineering. For databases, we use high-availability MySQL 8.0+ and Redis. For mobile apps, we develop in Android Native (Kotlin) and Flutter.',
    },
    {
      q: 'How long does it take to build a custom website or mobile app?',
      a: 'A standard custom business website or conversion landing page typically takes 1 to 2 weeks. Comprehensive e-commerce portals, custom web applications (CRMs), or Android mobile apps usually take 3 to 6 weeks, depending on the complexity of features and integrations.',
    },
    {
      q: 'Will my website be mobile-responsive and fast?',
      a: '100% yes. Every single website we engineer is mobile-first, responsive across all screen sizes, and optimized to load in under 2 seconds. We configure Cloudflare CDN edge caching, asset compression, and clean code to ensure top Google PageSpeed scores.',
    },
    {
      q: 'Do you provide domain, hosting, and SSL certificates?',
      a: 'Yes. We offer complete Hosting & Cloudflare Setup including high-speed cPanel/VPS servers, Cloudflare CDN integration, DNS records management, and free lifetime SSL security certificates so your website is safe from day one.',
    },
    {
      q: 'How do your paid advertising (Google & Meta) campaigns work?',
      a: 'We handle everything from start to finish: customer persona research, keyword selection for Google Search, compelling ad copy & creatives for Meta (Facebook & Instagram), conversion pixel tracking, and transparent weekly ROI reports.',
    },
    {
      q: 'Do I get complete ownership of the code and website assets?',
      a: 'Yes. Once the project is delivered and finalized, you receive 100% intellectual property ownership of your codebase, database, design files, graphics, and server credentials.',
    },
    {
      q: 'What kind of website maintenance and support do you provide?',
      a: 'We offer monthly maintenance plans that cover regular plugin/CMS updates, daily automated database backups, security patches, bug fixes, and priority 24/7 technical assistance.',
    },
    {
      q: 'How do we get started with Zenith Web Works?',
      a: 'Simply click "Get Consultation" or submit an inquiry on our website. Our architecture lead will schedule a call to understand your requirements, provide a free system scope, and share a transparent milestone proposal.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#060d1f] transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="FAQs" bgImage="/services/maintenance.jpg" />

      <div className="max-w-4xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <MessageCircleQuestion className="w-5 h-5 text-amber-500 shrink-0" />
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    <p className="mt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help */}
        <div className="mt-16 p-8 rounded-3xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-500/30 text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Still have questions?</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Our technology consultants are available to discuss your specific business requirements anytime. Call us at +91 7895094129.
          </p>
          <button
            onClick={() => openConsultationModal('FAQ General Inquiry')}
            className="mt-6 px-8 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-md cursor-pointer"
          >
            Ask a Question Directly
          </button>
        </div>
      </div>
    </div>
  );
}
