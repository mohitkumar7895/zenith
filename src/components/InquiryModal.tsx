'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { SERVICES_DATA } from '@/lib/data';
import { Service } from '@/models/types';
import { X, Send, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InquiryModal() {
  const { isModalOpen, selectedService, closeConsultationModal, submitContactForm, isSubmitting } = useApp();
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceRequired, setServiceRequired] = useState(selectedService);
  const [budgetRange, setBudgetRange] = useState('₹25,000 – ₹50,000');
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const serviceIconMap: Record<string, string> = {
    'Custom Website Development': '🌐',
    'Android App Development': '📱',
    'Graphic Designing': '🎨',
    'Logo & Banner Designing': '✨',
    'Paid Ads (Google & Meta)': '🎯',
    'Hosting & Cloudflare Setup': '☁️',
    'SEO & Performance Optimization': '📈',
    'Web App & CRM Development': '💻',
    'Website Maintenance & Support': '🔧',
  };

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedService) {
      setServiceRequired(selectedService);
    }
  }, [selectedService]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitContactForm({
      fullName,
      email,
      companyName,
      phoneNumber,
      serviceRequired,
      budgetRange,
      projectDetails,
    });

    if (success) {
      setIsSubmittedSuccess(true);
      setTimeout(() => {
        setIsSubmittedSuccess(false);
        setFullName('');
        setEmail('');
        setCompanyName('');
        setPhoneNumber('');
        setProjectDetails('');
        closeConsultationModal();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Book a Project Consultation
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Speak directly with our technical lead. Fast response within 2-4 hours.
            </p>
          </div>
          <button
            onClick={closeConsultationModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmittedSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Inquiry Sent Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Our engineering team is reviewing your project requirements and will connect with you shortly.
            </p>
          </div>
        ) : (
          /* Form (100% theme reactive) */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder-slate-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Business Email <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder-slate-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Media"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder-slate-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 78950 94129"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder-slate-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Required Service <span className="text-orange-500">*</span>
              </label>
              <select
                value={serviceRequired}
                onChange={(e) => setServiceRequired(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                {services.map((s) => {
                  const icon = serviceIconMap[s.title] || '⚡';
                  return (
                    <option key={s.id} value={s.title} className="bg-white dark:bg-[#060d1f]">
                      {icon} {s.title}
                    </option>
                  );
                })}
                <option value="General IT Strategy" className="bg-white dark:bg-[#060d1f]">
                  ⚡ General IT Strategy & Consultation
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Project Scope & Requirements <span className="text-orange-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Describe your goals, desired features, timeline expectations, or references..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder-slate-400 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeConsultationModal}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
