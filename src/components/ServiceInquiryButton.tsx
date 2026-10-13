'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  serviceTitle: string;
  className?: string;
  label?: string;
}

export default function ServiceInquiryButton({
  serviceTitle,
  className = '',
  label = 'Get a Free Project Quote',
}: Props) {
  const { openConsultationModal } = useApp();

  return (
    <button
      onClick={() => openConsultationModal()}
      type="button"
      className={
        className ||
        'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm sm:text-base'
      }
    >
      <Sparkles className="w-4 h-4 text-slate-950" />
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 text-slate-950" />
    </button>
  );
}
