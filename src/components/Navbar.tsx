'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  ChevronDown,
  Building2,
  Users,
  HelpCircle,
  Briefcase,
  BookOpen,
  Home,
  Mail,
  Layers,
  MapPin,
  Phone,
  MessageCircle,
} from 'lucide-react';


export default function Navbar() {
  const pathname = usePathname();
  const { openConsultationModal, theme, toggleTheme } = useApp();

  if (pathname?.startsWith('/admin')) return null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCompanyDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 dark:bg-[#060d1f]/95 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      {/* Top Phone & Helpline Bar - Prominently Displayed on EVERY Page */}
      <div className="bg-gradient-to-r from-slate-950 via-[#071126] to-slate-950 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="font-semibold text-slate-200 hidden sm:inline">
              Direct Founder Helpline:
            </span>
            <span className="text-slate-400 font-medium truncate">
              Instant Quotes &amp; Architecture Consultation
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 font-bold text-slate-200 shrink-0">
            <a
              href="tel:+917895094129"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors group"
              title="Call Dhani Ram Singh (+91 7895094129)"
            >
              <Phone className="w-3 h-3 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>+91 7895094129</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+919193648939"
              className="hover:text-blue-400 flex items-center gap-1 transition-colors group"
              title="Call Mohit Kumar (+91 9193648939)"
            >
              <Phone className="w-3 h-3 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span>+91 9193648939</span>
            </a>
            <a
              href="https://wa.me/917895094129?text=Namaste%20Zenith%20team,%20mujhe%20website%20ya%20app%20ke%20liye%20baat%20karni%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-[#25D366] hover:text-[#20ba59] pl-1 font-semibold"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0 py-2">
            <div className="relative bg-white px-2.5 xs:px-3 py-1.5 rounded-xl shadow-sm border border-slate-200/80 dark:border-white/10 flex items-center transition-transform group-hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Zenith Web Works"
                width={2172}
                height={724}
                className="h-8 xs:h-10 sm:h-12 w-auto max-w-[150px] xs:max-w-[190px] sm:max-w-[240px] object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
            {/* Home Link */}
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {/* Services Link */}
            <Link
              href="/services"
              className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Services</span>
            </Link>

            {/* Portfolio Link */}
            <Link
              href="/portfolio"
              className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4 text-amber-500" />
              <span>Portfolio</span>
            </Link>

            {/* Company Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                onMouseEnter={() => setCompanyDropdownOpen(true)}
                className="flex items-center gap-1.5 hover:text-amber-500 transition-colors cursor-pointer py-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>

              {companyDropdownOpen && (
                <div
                  onMouseLeave={() => setCompanyDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-slide-in"
                >
                  <Link
                    href="/about"
                    onClick={() => setCompanyDropdownOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-900 hover:text-amber-500 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-amber-500" />
                    <div>
                      <div>About Us</div>
                      <span className="text-[10px] text-slate-400 font-normal">Our team & vision</span>
                    </div>
                  </Link>

                  <Link
                    href="/careers"
                    onClick={() => setCompanyDropdownOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-900 hover:text-amber-500 transition-colors"
                  >
                    <Users className="w-4 h-4 text-orange-500" />
                    <div>
                      <div>Careers</div>
                      <span className="text-[10px] text-slate-400 font-normal">Join our team (5 roles)</span>
                    </div>
                  </Link>

                  <Link
                    href="/faqs"
                    onClick={() => setCompanyDropdownOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-900 hover:text-amber-500 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-sky-500" />
                    <div>
                      <div>FAQs</div>
                      <span className="text-[10px] text-slate-400 font-normal">Questions answered</span>
                    </div>
                  </Link>

                  <Link
                    href="/bihar"
                    onClick={() => setCompanyDropdownOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-emerald-500 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-bold">Bihar Hub</div>
                      <span className="text-[10px] text-slate-400 font-normal">All 38 districts</span>
                    </div>
                  </Link>
                </div>
              )}

            </div>

            {/* Blogs Link */}
            <Link
              href="/blogs"
              className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>Blogs</span>
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Actions: Theme Toggle, Admin, CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:border-amber-500/50 transition-all cursor-pointer shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>



            {/* Consultation Button */}
            <button
              onClick={() => openConsultationModal()}
              className="relative group px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 transition-all duration-200 shadow-lg shadow-orange-500/25 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-amber-400"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#060d1f]/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 font-semibold"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 font-semibold"
          >
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Services</span>
          </Link>
          <Link
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 font-semibold"
          >
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>Portfolio</span>
          </Link>

          {/* Company Mobile Links */}
          <div className="pt-2 pb-1 border-y border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company</span>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-amber-500"
            >
              • About Us
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-amber-500"
            >
              • Careers (5 Positions)
            </Link>
            <Link
              href="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-amber-500"
            >
              • FAQs
            </Link>
            <Link
              href="/bihar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-xs text-emerald-500 font-bold hover:text-emerald-400"
            >
              • Bihar Hub (38 Districts)
            </Link>
          </div>


          <Link
            href="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 font-semibold"
          >
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span>Blogs</span>
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 font-semibold"
          >
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>Contact Us</span>
          </Link>



          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openConsultationModal();
            }}
            className="w-full mt-3 py-3 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-lg shadow-orange-500/20"
          >
            Get Consultation
          </button>
        </div>
      )}
    </header>
  );
}
