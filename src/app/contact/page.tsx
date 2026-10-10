'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Headphones,
} from 'lucide-react';
import PageHeaderBanner from '@/components/PageHeaderBanner';

export default function ContactPage() {
  const { submitContactForm } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    serviceRequired: 'Custom Website Development',
    budgetRange: '₹25,000 – ₹50,000',
    projectDetails: '',
  });

  const servicesList = [
    'Custom Website Development',
    'Android App Development',
    'Graphic Designing',
    'Logo & Banner Designing',
    'Paid Ads (Google & Meta)',
    'Hosting & Cloudflare Setup',
    'SEO & Performance Optimization',
    'Web App & CRM Development',
    'Website Maintenance & Support',
  ];

  const budgetOptions = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000+ Enterprise',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectDetails.trim()) {
      setErrorMessage('Please fill in your name, email, and project scope.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await submitContactForm({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber || undefined,
        companyName: formData.companyName || undefined,
        serviceRequired: formData.serviceRequired,
        budgetRange: formData.budgetRange,
        projectDetails: formData.projectDetails,
      });

      if (success) {
        setIsSubmitted(true);
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again or reach out on WhatsApp/Phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#060d1f] min-h-screen transition-colors duration-300">
      {/* Background Image Banner with Page Title */}
      <PageHeaderBanner title="Contact Us" bgImage="/services/hosting.jpg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Main Grid: Info Cards (Left) + High-Converting Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Contact Channels & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200/90 dark:border-slate-800/80 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-orange-500" />
                <span>Direct Contact Channels</span>
              </h2>

              {/* Office Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Address</h3>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    Bidhuna Road, Bharthana
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Etawah, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Email</h3>
                  <a
                    href="mailto:contact@zenithwebworks.io"
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-colors mt-0.5 block"
                  >
                    contact@zenithwebworks.io
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Typical response within 2 hours
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone & WhatsApp</h3>
                  <a
                    href="tel:+917895094129"
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-colors mt-0.5 block"
                  >
                    +91 7895094129
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mon – Sat, 9:30 AM to 7:30 PM IST
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Working Hours</h3>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    Monday to Saturday
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    9:30 AM – 7:30 PM IST (Emergency ops 24/7)
                  </p>
                </div>
              </div>
            </div>

            {/* Commitments & Guarantees */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200/90 dark:border-slate-800/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Our Delivery Promises
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>4-Hour Response SLA</strong> on all business inquiries</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                  <span><strong>Strict Confidentiality & NDA</strong> protection for your IP</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><strong>Direct Engineering Team</strong> — speak directly with tech architects</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Converting Project Intake Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200/90 dark:border-slate-800 shadow-md">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your project specifications have been logged in our system. Our engineering lead will review them and connect with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        companyName: '',
                        serviceRequired: 'Custom Website Development',
                        budgetRange: '₹25,000 – ₹50,000',
                        projectDetails: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-orange-500" />
                      <span>Send Project Requirements</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Fill out the form below for a free technical estimation and architecture breakdown.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Business Email <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="+91 78950 94129"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Acme Innovations"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Required Service <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                    >
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv} className="bg-white dark:bg-[#070e22]">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Scope & Requirements <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Tell us about your project goals, preferred features, timeline expectations, or links to references..."
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 active:scale-95 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Requirements...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 We respect your privacy. No spam. 100% direct consultation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
