import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Zenith Web Works',
  description: 'Privacy Policy and client data protection practices of Zenith Web Works.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16 bg-white dark:bg-[#060d1f] min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Your Privacy & Data Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last updated: October 2026 • Effective for all clients, visitors, and platform inquiries.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Zenith Web Works</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We respect your personal privacy and are committed to protecting the confidential information, technical specifications, and personal data you share with us when using our website or engaging our software development, design, and cloud consulting services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              2. Information We Collect
            </h2>
            <p>We may collect information directly from you through our contact forms, consultation requests, or project onboarding:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li><strong>Contact Information:</strong> Full name, business email address, phone number, and WhatsApp handle.</li>
              <li><strong>Business & Project Details:</strong> Company name, estimated budget, scope requirements, tech stack preferences, and architectural briefs.</li>
              <li><strong>Technical Metadata:</strong> IP address, browser type, device information, and interaction logs collected purely for platform stability and abuse prevention.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              3. How We Use Your Information
            </h2>
            <p>We strictly utilize your provided data for legitimate engineering and business purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Project Scoping & Delivery
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Preparing customized project proposals, architecture blueprints, and budget milestones.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Engineering Support
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Providing direct developer communication, SLAs, server monitoring, and code delivery.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              * We never sell, lease, or monetize your contact information or project specifications to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              4. Code Confidentiality & Non-Disclosure (NDA)
            </h2>
            <p>
              All proprietary business logic, database schemas, codebases, API credentials, and product concepts shared with Zenith Web Works remain your confidential intellectual property. We are happy to execute standard bilateral Non-Disclosure Agreements (NDAs) prior to formal sprint kickoff.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              5. Data Security Standards
            </h2>
            <p>
              We implement industry-standard security protocols to guard all stored records against unauthorized access, alteration, or disclosure. Inquiries are stored on secured relational databases with strict network firewalls and encrypted connections.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              6. Your Rights
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or request deletion from our active CRM database by writing to our direct support email.
            </p>
          </section>

          {/* Contact Box with provided number & address */}
          <section className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              7. Contact Our Privacy Office
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For any questions or privacy concerns regarding our data handling practices:
            </p>
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Office: Bidhuna Road, Bharthana, Etawah, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Phone / WhatsApp: +91 7895094129</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Email: contact@zenithwebworks.io</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
