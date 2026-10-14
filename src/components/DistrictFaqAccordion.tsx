'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface DistrictFaqAccordionProps {
  faqs: FaqItem[];
  districtName: string;
}

export default function DistrictFaqAccordion({ faqs, districtName }: DistrictFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-200 border ${
              isOpen
                ? 'bg-white dark:bg-[#0b152d] border-amber-500/50 shadow-md'
                : 'bg-white/60 dark:bg-[#0b152d]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white"
            >
              <span className="flex items-start gap-2.5">
                <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${isOpen ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>{faq.q}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-amber-500' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
