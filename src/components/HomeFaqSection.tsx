'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle, Sparkles } from 'lucide-react';

export const HOME_FAQS = [
  {
    q: 'Website banwane ka kitna charge hota hai (What is the cost of website development)?',
    a: 'Zenith Web Works me small business aur shop websites starting price sirf ₹4,999 hai jisme 5 responsive pages, free 1-year domain, high-speed cloud hosting, SSL security aur WhatsApp button shamil hai. E-Commerce online shopping store ₹12,999 se start hota hai aur custom web application / CRM ₹24,999+ se. Direct estimate ke liye call karein: +91 7895094129.',
  },
  {
    q: 'Website kitne din me bankar live ho jati hai (How fast is delivery)?',
    a: 'Normal business websites 3 se 5 working days ke andar ready aur Google par live ho jati hain. E-commerce portals 5 se 7 days me aur custom Android apps 10 se 20 days me complete hote hain. Har stage par client ko live preview link share kiya jata hai.',
  },
  {
    q: 'Kya website banne ke baad Google Search par dikhegi (Local SEO)?',
    a: 'Haan, bilkul! Hum har website me technical On-Page SEO, Google Search Console indexing, sitemap submission, Google Business Profile (Map) integration aur schema structured markup add karte hain taaki aapke shahar aur all-India ke customers aapko Google par search karke direct call karein.',
  },
  {
    q: 'Kya mujhe website ka source code aur admin panel milega?',
    a: 'Haan! Zenith Web Works aapko 100% intellectual property & source code ownership deta hai. Aapko simple mobile-friendly admin panel diya jata hai jisse aap bina kisi technical knowledge ke photos, phone numbers, prices aur services khud update kar sakte hain.',
  },
  {
    q: 'Kya hum directly phone par baat karke project discuss kar sakte hain?',
    a: 'Haan, aap hamare co-founders Dhani Ram Singh (+91 7895094129) aur Mohit Kumar (+91 9193648939) ko directly call ya WhatsApp kar sakte hain. Hum aapke business model ke anusaar free technical guidance aur best price roadmap provide karte hain.',
  },
  {
    q: 'Payment kaise karni hoti hai (What is the payment process)?',
    a: 'Hum transparent milestones par kaam karte hain. Kaam shuru karne ke liye chhota advance liya jata hai, live staging link par aapko website dikhayi jati hai, aur final live delivery & satisfaction ke baad baaki payment li jati hai. Payment UPI, Net Banking ya Credit Card se ki ja sakti hai.',
  },
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-[#060d1f] relative overflow-hidden transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Aapke sabhi sawalon ke spasht jawab. Direct founder support ke liye hume kabhi bhi call karein.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/80 pt-4">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Helpline Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Koi aur sawal hai? Direct baat karein:</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Available Monday to Sunday, 8:00 AM – 10:00 PM</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+917895094129"
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 7895094129</span>
            </a>
            <a
              href="https://wa.me/917895094129?text=Namaste%20Zenith%20team,%20mujhe%20ek%20sawal%20puchhna%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

