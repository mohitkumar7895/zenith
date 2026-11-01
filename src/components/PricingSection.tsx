'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, CheckCircle2, Zap, ArrowRight, ShieldCheck, Sparkles, MessageCircle, Globe2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const PHONE_1 = '+917895094129';
const PHONE_1_DISPLAY = '+91 7895094129';

export interface PricingPackage {
  name: string;
  badge: string;
  price: string;
  period: string;
  delivery: string;
  description: string;
  highlight: boolean;
  features: string[];
  callNumber: string;
  callDisplay: string;
  tag: string;
}

export default function PricingSection() {
  const { openConsultationModal } = useApp();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const packagesINR: PricingPackage[] = [
    {
      name: 'Starter Business Website',
      badge: 'Most Popular for Small Business',
      price: '₹4,999',
      period: 'one-time setup',
      delivery: '3 – 5 Days Delivery',
      description: 'Ideal for local businesses, shops, doctors, schools, lawyers, and consulting agencies.',
      highlight: false,
      features: [
        '5 High-Converting Responsive Pages',
        'Free 1-Year Domain (.in / .com) & Hosting',
        'Free SSL Security Certificate',
        'One-Tap WhatsApp & Direct Call Buttons',
        'Google Maps & Contact Inquiry Form',
        'Mobile-First & Ultra-Fast Loading (Under 2s)',
        'Basic On-Page SEO & Google Indexing',
        '100% Full Source Code & Admin Access',
      ],
      callNumber: PHONE_1,
      callDisplay: PHONE_1_DISPLAY,
      tag: 'Starter',
    },
    {
      name: 'Dynamic E-Commerce Store',
      badge: 'Best For Retail & Online Sales',
      price: '₹12,999',
      period: 'one-time setup',
      delivery: '5 – 7 Days Delivery',
      description: 'Complete online shopping store to sell products, collect UPI & card payments directly.',
      highlight: true,
      features: [
        'Unlimited Products & Category Management',
        'Razorpay, PhonePe & Paytm Payment Gateway',
        'Mobile-Friendly Shopping Cart & Checkout',
        'Order Tracking & Customer Notification System',
        'Admin Dashboard to manage prices from phone',
        'Free 1-Year Cloud Hosting & SSL Certificate',
        'Advanced E-Commerce SEO & Schema Markup',
        'Coupon Codes, Discounts & Banner Slider',
        '100% Source Code & Zero Monthly Commission',
      ],
      callNumber: PHONE_1,
      callDisplay: PHONE_1_DISPLAY,
      tag: 'E-Commerce',
    },
    {
      name: 'Custom Web App & Mobile App',
      badge: 'For Startups & Growing Companies',
      price: '₹24,999+',
      period: 'custom scope',
      delivery: '10 – 20 Days Delivery',
      description: 'Custom software, CRM, billing portal, or native Android mobile application.',
      highlight: false,
      features: [
        'Native Android App (Kotlin / Flutter)',
        'Custom Web App / CRM / ERP Platform',
        'Role-Based Staff & Customer Portals',
        'Real-Time MySQL Database & Cloudflare CDN',
        'SMS / WhatsApp API & Invoice Generator',
        'Google Play Store Submission & Setup',
        'High-Security Architecture & Automated Backups',
        'Dedicated Project Lead & Priority Support',
      ],
      callNumber: PHONE_1,
      callDisplay: PHONE_1_DISPLAY,
      tag: 'Enterprise',
    },
  ];

  const packagesUSD: PricingPackage[] = [
    {
      name: 'Starter Business Website',
      badge: 'Most Popular for SMBs',
      price: '$149',
      period: 'one-time milestone',
      delivery: '3 – 5 Days Delivery',
      description: 'High-speed Next.js conversion website for international SMBs, consultants, and agencies.',
      highlight: false,
      features: [
        '5 High-Converting Next.js Responsive Pages',
        'Free 1-Year Global Cloud Hosting & SSL',
        'Sub-second page load times with Cloudflare CDN',
        'WhatsApp, Calendly & Contact Lead Integration',
        '100% Intellectual Property & GitHub transfer',
        'Comprehensive On-Page SEO & Schema Markup',
        'Overlapping US/UK/AU timezone communications',
        'Free 30 days post-launch technical warranty',
      ],
      callNumber: PHONE_1,
      callDisplay: PHONE_1_DISPLAY,
      tag: 'Starter',
    },
    {
      name: 'Dedicated Remote Developer',
      badge: 'Save 70% Over Local Hiring',
      price: '$18 / hr',
      period: 'or $2,400 / month (160 hrs)',
      delivery: 'Immediate 48h Deployment',
      description: 'Dedicated full-stack Next.js, React, Node.js or Flutter engineer working exclusively on your product.',
      highlight: true,
      features: [
        'Full-time 40 hrs/week senior full-stack engineer',
        '4 to 6 hours daily US/UK/AU timezone overlap',
        'Daily video standups & real-time Slack/Teams sync',
        'Direct commits to your GitHub / GitLab repo',
        '1-Week Risk-Free Trial (Zero commitment)',
        'Scale team up or down with 2 weeks notice',
        'Strict Mutual NDA & 100% Code Ownership',
      ],
      callNumber: PHONE_1,
      callDisplay: PHONE_1_DISPLAY,
      tag: 'Dedicated Pod',
    },
    {
      name: 'Custom Web App & CRM (MVP)',
      badge: 'For Tech Startups & SaaS',
      price: '$799+',
      period: 'fixed-scope milestone',
      delivery: '10 – 20 Days Delivery',
      description: 'Custom SaaS platform, multi-tenant portal, or cross-platform Flutter/Android mobile app.',
      highlight: false,
      features: [
        'Full-Stack Next.js 16 + React 19 + Node/MySQL',
        'Stripe, PayPal or Multi-Currency Payment Gateway',
        'Role-Based Access Control (RBAC) & Auth',
        'High-concurrency database architecture',
        'REST / GraphQL APIs & Webhook automations',
        'Automated CI/CD deployment pipelines',
        '100% Code Repository transfer under your name',
        'Dedicated Project Lead & Sprint Demos',
      ],
      callNumber: PHONE_1,
      callDisplay: PHONE_1_DISPLAY,
      tag: 'Custom MVP',
    },
  ];

  const currentPackages: PricingPackage[] = currency === 'INR' ? packagesINR : packagesUSD;

  return (
    <section id="pricing" className="py-12 sm:py-20 bg-slate-900/60 dark:bg-[#040918] relative overflow-hidden border-t border-slate-200/20 dark:border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Pricing • Zero Hidden Costs</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight">
            Affordable Website, App &amp; Developer Packages
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Choose the right plan for your business. We serve clients across all Indian states and global corridors (USA, UK, Canada, Australia &amp; UAE).
          </p>

          {/* Currency Toggle: INR vs USD */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-inner">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🇮🇳 Domestic (INR ₹)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === 'USD'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>🌍 Global / USA / UK (USD $)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 font-semibold pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> 100% Code Ownership
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Free 1-Year Hosting &amp; Domain
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> 3 to 7 Days Delivery
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {currentPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.highlight
                  ? 'bg-gradient-to-b from-[#0e1d3e] to-[#071026] border-2 border-amber-500 shadow-2xl shadow-amber-500/20 scale-[1.02] lg:-translate-y-2'
                  : 'bg-slate-900/90 dark:bg-[#071022] border border-slate-700/60 hover:border-slate-600 shadow-xl'
              }`}
            >
              {/* Highlight ribbon */}
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  <span>{pkg.badge}</span>
                </div>
              )}

              <div>
                {!pkg.highlight && (
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold mb-3 border border-slate-700">
                    {pkg.badge}
                  </span>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ {pkg.period}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{pkg.delivery}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What’s Included:</p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call-To-Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 space-y-2.5">
                <a
                  href={`tel:${pkg.callNumber}`}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    pkg.highlight
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold shadow-orange-500/30'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Order: {pkg.callDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/917895094129?text=Hello%20Zenith%20team,%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package%20(${encodeURIComponent(pkg.price)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Offshore Callout Link */}
        <div className="mt-8 text-center">
          <Link
            href="/global"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-amber-500 text-xs sm:text-sm font-bold text-amber-400 transition-all shadow-lg"
          >
            <Globe2 className="w-4 h-4" />
            <span>International Client? Explore Our Dedicated Offshore Software Engineering Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Founder Helpline Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1532] to-slate-900 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-5 h-5 text-amber-400" />
              <span>Need a Custom Scope or Have Questions?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our co-founders Dhani Ram Singh &amp; Mohit Kumar. Free 15-minute technical guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+917895094129"
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>+91 7895094129</span>
            </a>
            <a
              href="tel:+919193648939"
              className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>+91 9193648939</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
