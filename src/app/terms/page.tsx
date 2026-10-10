import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | Zenith Web Works',
  description: 'Terms of Service, project deliverables, and client agreements of Zenith Web Works.',
};

export default function TermsAndConditionsPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Client Agreement & Service Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last updated: October 2026 • Governs all client contracts, development sprints, and IT services.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              1. Engagement & Scope of Work
            </h2>
            <p>
              By accessing this website or engaging <strong>Zenith Web Works</strong> (&ldquo;Agency,&rdquo; &ldquo;we,&rdquo; or &ldquo;our&rdquo;) for custom web development, mobile applications, UI/UX graphic design, paid advertising campaigns, SEO, or cloud hosting services, you agree to be bound by these Terms and Conditions.
            </p>
            <p>
              Each project is governed by a defined Scope of Work (SOW) or written proposal detailing sprint milestones, technical deliverables, and agreed completion timelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              2. Intellectual Property & Code Ownership
            </h2>
            <p>
              Upon receipt of full final payment for the designated project:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li><strong>100% Code Ownership:</strong> All bespoke frontend code, backend APIs, database schemas, and tailored design assets become the exclusive property of the Client.</li>
              <li><strong>Deployment & Credentials:</strong> We provide full production build deployments, repository transfer, or server access handover as agreed in the contract.</li>
              <li><strong>Open Source Libraries:</strong> Standard open-source libraries and frameworks (e.g., Next.js, React, Tailwind CSS, MySQL) remain governed by their respective open-source licenses (MIT/Apache/GPL).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              3. Payment Terms & Milestones
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Transparent Milestone-Based Billing
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Projects are typically structured with an initial kickoff advance, progress-based sprint payments, and a final deployment milestone upon project acceptance. Invoices are payable within the agreed terms specified on invoice generation.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              4. Revisions, Acceptance & Support
            </h2>
            <p>
              We conduct thorough QA testing across modern browsers and responsive viewport sizes. Each milestone includes designated review rounds to ensure deliverables match the approved design prototypes and functional specifications.
            </p>
            <p>
              Post-launch warranty periods (typically 30 days of complimentary bug-fix support) are included in standard engineering contracts. Long-term maintenance, SLA server uptime, and feature enhancements are available under ongoing retainer plans.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              5. Limitation of Liability
            </h2>
            <p>
              Zenith Web Works shall not be liable for indirect, incidental, or consequential damages resulting from third-party hosting outages, domain registrar interruptions, or unauthorized third-party intrusions on client servers beyond our configured security scope.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with services rendered shall be subject to the exclusive jurisdiction of the competent courts in Etawah / Uttar Pradesh, India.
            </p>
          </section>

          {/* Contact Box with provided number & address */}
          <section className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              7. Legal & Contract Inquiries
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For contract clarifications or legal notices, reach out to our registered office:
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
