'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BIHAR_DISTRICTS,
  BIHAR_DIVISIONS,
  BiharDistrict,
} from '@/lib/biharDistricts';
import {
  Search,
  MapPin,
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Building2,
  GraduationCap,
  Stethoscope,
  Wheat,
  Factory,
  ShoppingBag,
  HelpCircle,
  ChevronDown,
  Layers,
  Code2,
} from 'lucide-react';
import DistrictInquiryForm from '@/components/DistrictInquiryForm';
import DistrictFaqAccordion from '@/components/DistrictFaqAccordion';

const PHONE_1 = '+91 7895094129';
const PHONE_1_CLEAN = '+917895094129';
const PHONE_2 = '+91 9193648939';
const PHONE_2_CLEAN = '+919193648939';

const BIHAR_FAQS = [
  {
    q: 'बिहार में वेबसाइट बनवाने का कितना खर्चा आता है?',
    a: 'जेनिथ वेब वर्क्स (Zenith Web Works) में छोटी दुकानों, क्लिनिक और लोकल बिज़नेस के लिए वेबसाइट सिर्फ ₹4,999 से ₹8,999 में शुरू होती है। कोचिंग, स्कूल, होलसेल व्यापारी और ई-कॉमर्स पोर्टल ₹14,999 से ₹24,999 में तैयार होते हैं। इसमें 1 साल का डोमेन, फास्ट होस्टिंग, SSL सिक्योरिटी और WhatsApp चैट बटन बिल्कुल फ्री मिलता है।',
  },
  {
    q: 'क्या काम शुरू करने से पहले हम फोन या WhatsApp पर बात कर सकते हैं?',
    a: 'जी हाँ, बिल्कुल! आप सीधे हमारे फाउंडर्स धनी राम सिंह और मोहित कुमार से +91 7895094129 या +91 9193648939 पर कॉल या WhatsApp कर सकते हैं। हम आपकी ज़रूरत को समझकर तुरंत लाइव डेमो और एस्टीमेट शेयर करेंगे।',
  },
  {
    q: 'वेबसाइट बनने में कितना समय लगेगा?',
    a: 'स्टैंडर्ड बिज़नेस वेबसाइट 3 से 7 वर्किंग दिनों में लाइव हो जाती है। कस्टम Android ऐप या कोचिंग/हॉस्पिटल सॉफ्टवेयर 10 से 20 दिनों में पूरा होता है। काम के दौरान हम आपको लाइव प्रीव्यू लिंक देते हैं ताकि आप अपनी आँखों से काम की प्रोग्रेस देख सकें।',
  },
  {
    q: 'क्या हमारी वेबसाइट Google Search और Google Maps में दिखेगी जिससे ग्राहक कॉल करें?',
    a: 'हाँ, 100% गारंटी के साथ। हम हर वेबसाइट का ऑन-पेज लोकल एसईओ (Local SEO), Google Business Profile (Maps) और Google Search Console में इंडेक्सिंग करते हैं। जब भी आपके जिले में कोई आपकी सर्विस सर्च करेगा, तो आपकी वेबसाइट और फोन नंबर सबसे ऊपर दिखेगा।',
  },
  {
    q: 'क्या डोमेन और सोर्स कोड का पूरा मालिकाना हक (Ownership) हमें मिलेगा?',
    a: 'हाँ, बिल्कुल। जेनिथ में हम डोमेन सीधे आपके नाम और ईमेल पर रजिस्टर करते हैं। प्रोजेक्ट पूरा होने पर पूरा GitHub सोर्स कोड, डेटाबेस और एडमिन पैनल का पासवर्ड आपको सौंप दिया जाता है। कोई छुपे हुए नियम या होस्टेज फीस नहीं है।',
  },
  {
    q: 'क्या हम खुद से फोटो, नोटिस या फोन नंबर अपने मोबाइल से बदल सकेंगे?',
    a: 'हाँ! हम आपको एक बहुत ही आसान एडमिन डैशबोर्ड देते हैं जिसे आप अपने स्मार्टफोन से ही चला सकते हैं। बिना किसी कोडिंग ज्ञान के आप 2 मिनट में नया फोटो, नोटिस, रिजल्ट या प्रोडक्ट अपडेट कर सकते हैं।',
  },
];

export default function BiharMasterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');

  // Filter districts
  const filteredDistricts = useMemo(() => {
    return BIHAR_DISTRICTS.filter((district) => {
      const matchesDivision =
        selectedDivision === 'All' ||
        district.division.toLowerCase() === selectedDivision.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        district.name.toLowerCase().includes(q) ||
        district.hindiName.includes(q) ||
        district.prominentFor.toLowerCase().includes(q) ||
        district.division.toLowerCase().includes(q) ||
        district.popularServices.some((s) => s.toLowerCase().includes(q));

      return matchesDivision && matchesSearch;
    });
  }, [searchQuery, selectedDivision]);

  const whatsappGeneralMessage =
    'Namaste Zenith Web Works team! Mujhe Bihar me apne business ke liye custom website / mobile app banwani hai. Kripya pricing aur demo share karein.';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060d1f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#071126]/70 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 truncate">
            <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/sitemap" className="hover:text-amber-500 transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Bihar (All 38 Districts)</span>
          </nav>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a href={`tel:${PHONE_1_CLEAN}`} className="hover:text-emerald-500 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-500" />
              <span>{PHONE_1}</span>
            </a>
            <span className="text-slate-400">|</span>
            <a href={`tel:${PHONE_2_CLEAN}`} className="hover:text-blue-500 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-blue-500" />
              <span>{PHONE_2}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-amber-500/15 via-emerald-500/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>बिहार के सभी 38 जिलों में वेबसाइट एवं सॉफ्टवेयर निर्माण</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Best Website &amp; Mobile App Development Company in{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Bihar
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              कोचिंग, हॉस्पिटल, स्कूल, होलसेल मंडी, रियल एस्टेट एवं रिटेल व्यापार के लिए अल्ट्रा-फास्ट Next.js वेबसाइट और Android ऐप। Google Search पर नंबर 1 रैंक करें और अपने बिज़नेस में रोज़ाना असली ग्राहक पाएं।
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl font-extrabold text-amber-500">38 Districts</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Active Across Bihar</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl font-extrabold text-emerald-500">&lt;1 Second</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Jio/Airtel PageSpeed</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl font-extrabold text-blue-500">100%</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Client Code Ownership</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="text-2xl font-extrabold text-purple-500">₹4,999</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Starter Package Price</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#district-directory"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
              >
                Find Your District in Bihar
              </a>

              <a
                href={`https://wa.me/917895094129?text=${encodeURIComponent(whatsappGeneralMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#20ba59] transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consultation (+91 7895094129)</span>
              </a>

              <a
                href={`tel:${PHONE_1_CLEAN}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Founder Direct</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Top Bihar Sectors & Business Growth Solutions */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Built For Bihar's Real Economy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Digital Solutions Tailored for Bihar's Top Industries
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              We understand the local Bihar market. Here is how we generate high-paying clients for your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Coaching Institutes &amp; EdTech (Patna, Gaya, Bhagalpur)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Online test series, student admission portal, recorded &amp; live video lectures, and fee payment gateway for Boring Road, Kankarbagh &amp; district coaching centres.
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-500">
                Key Districts: Patna, Gaya, Bhagalpur, Darbhanga, Rohtas
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hospitals, Clinics &amp; Specialist Doctors
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Doctor appointment booking systems, patient token management, and localized Google Maps ranking so nearby patients can call your clinic directly.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-500">
                Key Districts: Patna, Muzaffarpur, Purnia, Darbhanga, Saharsa
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Wheat className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Makhana, Litchi &amp; Grain Exporters
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                B2B export portals with product catalogs, international buyer inquiry forms, and Google Ads funnels to sell Mithila Makhana and Shahi Litchi globally.
              </p>
              <div className="pt-2 text-xs font-semibold text-blue-500">
                Key Districts: Darbhanga, Madhubani, Muzaffarpur, Purnia, Khagaria
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Industrial &amp; Government Contractors (Begusarai, Hajipur)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enterprise B2B websites for refinery, fertilizer, railway and construction contractors in Barauni, Nabinagar, Marhaura and Hajipur industrial clusters.
              </p>
              <div className="pt-2 text-xs font-semibold text-purple-500">
                Key Districts: Begusarai, Vaishali, Aurangabad, Saran, Munger
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Retail Showrooms, Silk Weavers &amp; Wholesalers
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                E-commerce storefronts for Bhagalpur Tussar silk sarees, Sutapatti Muzaffarpur garment wholesalers, and Madhubani paintings with UPI/Card checkout.
              </p>
              <div className="pt-2 text-xs font-semibold text-rose-500">
                Key Districts: Bhagalpur, Muzaffarpur, Madhubani, Siwan, Gaya
              </div>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hotels, Banquets &amp; Tourism Booking Engines
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct commission-free room and banquet booking portals for Bodh Gaya, Rajgir, Nalanda, and Patna hospitality properties to bypass high OTA commissions.
              </p>
              <div className="pt-2 text-xs font-semibold text-teal-500">
                Key Districts: Gaya, Nalanda, Patna, Sitamarhi, Banka
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transparent Pricing Packages */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060d1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
              Fair &amp; Transparent Rates
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Bihar Business Website &amp; App Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              No hidden annual hostage fees. 100% full ownership with free domain, hosting, and founder phone support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Package 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Starter Package</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Small Business / Shop Website</h3>
                <p className="text-xs text-slate-500 mt-1">For retail stores, local clinics, advocate firms, and service agents.</p>
                
                <div className="mt-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹4,999 <span className="text-xs font-normal text-slate-500">- ₹8,999</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">One-time payment • 3-5 days delivery</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>3 to 5 Custom Mobile-First Pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Instant WhatsApp Chat &amp; Direct Call Button</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Google Maps Business Location Setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>1 Year Free Domain (.com/.in) &amp; Cloud Hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>SSL Certificate &amp; Mobile Responsive</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`https://wa.me/917895094129?text=${encodeURIComponent('Namaste Zenith, mujhe Starter Business Website (₹4,999 - ₹8,999) banwani hai.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Package 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1836] border-2 border-amber-500 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
                Best Seller for Bihar
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Growth &amp; High Leads</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Dynamic / E-Commerce / School Portal</h3>
                <p className="text-xs text-slate-500 mt-1">For coaching institutes, schools, wholesalers, and online shops.</p>
                
                <div className="mt-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹14,999 <span className="text-xs font-normal text-slate-500">- ₹24,999</span>
                  </div>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">One-time payment • 7-10 days delivery</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Next.js 16 Full-Stack Speed (&lt;1 Second Load)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Mobile Admin Panel (Change photos &amp; content anytime)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Razorpay / UPI Payment Gateway Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Lead Capture CRM with Instant WhatsApp Alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Google SEO First-Page Ranking Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>100% Code &amp; Database Ownership</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`https://wa.me/917895094129?text=${encodeURIComponent('Namaste Zenith, mujhe Dynamic/E-Commerce Portal (₹14,999 - ₹24,999) banwani hai.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Get Live Demo &amp; Book</span>
                </a>
              </div>
            </div>

            {/* Package 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-500">Enterprise &amp; App</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Custom Android App &amp; ERP</h3>
                <p className="text-xs text-slate-500 mt-1">For EdTech coaching test series, hospital management &amp; multi-branch ERP.</p>
                
                <div className="mt-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹29,999+ <span className="text-xs font-normal text-slate-500">Custom Scope</span>
                  </div>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">Native Flutter / Android • 15-25 days</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Android Mobile App on Google Play Store</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Video Lectures / PDF Notes / Online Test Series</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Push Notifications &amp; Automated SMS System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Student / Patient Login &amp; Dedicated Profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>100% Full Source Code &amp; Database Handover</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`tel:${PHONE_1_CLEAN}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Call to Plan App Scope</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Directory of All 38 Districts in Bihar with Filter & Search */}
      <section id="district-directory" className="py-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Statewide Coverage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Explore Services Across All 38 Districts of Bihar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Click on your district to explore customized digital solutions, localized commercial case studies, and transparent pricing.
            </p>
          </div>

          {/* Search Input & Division Filter Tabs */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search district (e.g. Patna, Muzaffarpur, Gaya, Darbhanga)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
              />
            </div>

            {/* Division Filters */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDivision('All')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedDivision === 'All'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white dark:bg-[#0b152d] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
                }`}
              >
                All Divisions (38)
              </button>
              {BIHAR_DIVISIONS.map((div) => (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedDivision === div
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-white dark:bg-[#0b152d] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-xs text-slate-500">
            Showing <strong className="text-slate-900 dark:text-white">{filteredDistricts.length}</strong> of 38 Districts in Bihar
          </div>

          {/* Districts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDistricts.map((d) => (
              <Link
                key={d.slug}
                href={`/locations/${d.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {d.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">
                        {d.hindiName}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                      {d.division} Div.
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {d.prominentFor}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {d.popularServices.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>View {d.name} Services</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Embedded Lead Capture Form Section */}
      <section id="inquiry-form" className="py-16 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                Instant Consultation &amp; Quote
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Start Your Digital Project in Bihar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Fill out the quick form below. Our founders and tech leads will analyze your requirements and get back to you with live demos and a transparent quotation.
              </p>
            </div>

            <DistrictInquiryForm districtName="Bihar (All Districts)" />
          </div>
        </div>
      </section>

      {/* Local Frequently Asked Questions (Google Snippet SEO Power) */}
      <section className="py-14 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bihar Business FAQ &amp; Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              बिहार में वेबसाइट एवं ऐप से जुड़े अक्सर पूछे जाने वाले सवाल (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              प्राइसिंग, डिलीवरी का समय, डोमेन ओनरशिप और गूगल रैंकिंग से जुड़ी पूरी जानकारी।
            </p>
          </div>

          <DistrictFaqAccordion faqs={BIHAR_FAQS} districtName="Bihar" />
        </div>
      </section>

      {/* Bottom Sticky Direct Action Banner */}
      <section className="p-8 sm:p-10 bg-gradient-to-r from-emerald-950 via-slate-950 to-blue-950 border-t border-emerald-900/40 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              बिहार में किसी भी ज़िले के लिए डायरेक्ट बात करें
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              फाउंडर्स धनी राम सिंह और मोहित कुमार से सीधे कॉल या WhatsApp पर बात करें और अपने प्रोजेक्ट का फ्री कोटेशन पाएं।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/917895094129?text=${encodeURIComponent(whatsappGeneralMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={`tel:${PHONE_1_CLEAN}`}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              Call {PHONE_1}
            </a>
            <a
              href={`tel:${PHONE_2_CLEAN}`}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              Call {PHONE_2}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
