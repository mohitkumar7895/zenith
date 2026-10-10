import { Service, ProjectCaseStudy } from '@/models/types';

export const COMPANY_INFO = {
  name: 'Zenith Web Works',
  tagline: 'We Build Ideas For A Better Web',
  established: 2018,
  stats: [
    { label: 'Websites & Apps Delivered', value: '320+' },
    { label: 'SEO & Performance Score', value: '99/100' },
    { label: 'Client Retention Rate', value: '98.5%' },
    { label: 'MySQL & Cloud Uptime', value: '99.99%' },
  ],
};

export const SERVICES_DATA: Service[] = [
  {
    id: 'custom-website-development',
    slug: 'custom-website-development',
    title: 'Custom Website Development',
    shortDescription: 'We build fast, responsive, SEO-ready websites — from landing pages and portfolios to full e-commerce stores and corporate sites — custom-coded for your brand and built to convert.',
    fullDescription: 'Custom website development tailored for high conversions, sub-second load times, and responsive multi-device compatibility.',
    iconName: 'Globe',
    technologies: ['MERN', 'PHP / Laravel', 'E-Commerce'],
    features: ['Landing Pages & Portfolios', 'Full E-Commerce Stores', 'Corporate Business Sites', 'Custom-Coded & Conversion-Ready'],
  },
  {
    id: 'android-app-development',
    slug: 'android-app-development',
    title: 'Android App Development',
    shortDescription: 'We build powerful Android applications for businesses — from customer-facing apps and booking systems to internal tools and dashboards — with clean UI and seamless Play Store deployment.',
    fullDescription: 'Native and Flutter cross-platform Android mobile solutions optimized for usability and performance.',
    iconName: 'Smartphone',
    technologies: ['Android Native', 'Flutter', 'Play Store'],
    features: ['Customer Booking Apps', 'Internal Business Dashboards', 'Clean Modern Material UI', 'Seamless Play Store Deployment'],
  },
  {
    id: 'graphic-designing',
    slug: 'graphic-designing',
    title: 'Graphic Designing',
    shortDescription: 'Professional graphic design that makes your brand stand out — social media creatives, brochures, flyers, business cards, presentations and all marketing collateral that looks premium and on-brand.',
    fullDescription: 'Visually compelling digital and print assets engineered to elevate brand reputation and market presence.',
    iconName: 'Palette',
    technologies: ['Social Media', 'Print Design', 'Brochures'],
    features: ['Social Media Creatives', 'Flyers & Business Cards', 'Pitch Presentations', 'All Marketing Collateral'],
  },
  {
    id: 'logo-banner-designing',
    slug: 'logo-banner-designing',
    title: 'Logo & Banner Designing',
    shortDescription: 'Your logo is the face of your brand. We create unique, memorable logos and professional banners — for websites, social profiles, trade shows and advertising — that reflect your brand identity perfectly.',
    fullDescription: 'Brand identity kits, vector logos, web banners, and corporate stationery that resonate with your target audience.',
    iconName: 'Sparkles',
    technologies: ['Logo Design', 'Brand Identity', 'Banners'],
    features: ['Unique Memorable Logos', 'Website & Social Banners', 'Trade Show Displays', 'Complete Brand Identity Kits'],
  },
  {
    id: 'paid-ads-google-meta',
    slug: 'paid-ads-google-meta',
    title: 'Paid Ads (Google & Meta)',
    shortDescription: 'Get in front of your ideal customers instantly with targeted Google Ads and Meta (Facebook & Instagram) campaigns. We handle everything — strategy, creative, targeting, bidding and ROI reporting.',
    fullDescription: 'High-ROI performance marketing campaigns delivering qualified leads and measurable sales growth.',
    iconName: 'Target',
    technologies: ['Google Ads', 'Facebook Ads', 'Instagram Ads'],
    features: ['Targeted Search & Display Ads', 'Meta (FB & Insta) Funnels', 'Creative Ad Copy & Design', 'Transparent ROI Reporting'],
  },
  {
    id: 'hosting-cloudflare-setup',
    slug: 'hosting-cloudflare-setup',
    title: 'Hosting & Cloudflare Setup',
    shortDescription: 'We set up fast, secure and reliable hosting with Cloudflare CDN, SSL certificates and DNS configuration — so your website loads in under 2 seconds for every visitor anywhere in India.',
    fullDescription: 'Enterprise DNS management, SSL encryption, DDoS mitigation, and edge caching for ultra-low latency.',
    iconName: 'Cloud',
    technologies: ['cPanel Hosting', 'Cloudflare CDN', 'SSL Setup'],
    features: ['Under 2-Second Load Times', 'Global Edge CDN Caching', 'Free Lifetime SSL Security', 'DDoS Attack Shielding'],
  },
  {
    id: 'seo-performance-optimization',
    slug: 'seo-performance-optimization',
    title: 'SEO & Performance Optimization',
    shortDescription: 'Rank higher on Google and attract more organic traffic with our technical SEO, on-page optimization, Core Web Vitals improvement and data-driven content strategy — built for long-term results.',
    fullDescription: 'Comprehensive search engine optimization ensuring top Google search rankings and sustained organic traffic.',
    iconName: 'TrendingUp',
    technologies: ['Technical SEO', 'On-Page SEO', 'Off-Page SEO'],
    features: ['Technical Audit & Indexing', 'Core Web Vitals Boost', 'Keyword & Competitor Strategy', 'Long-Term Organic Growth'],
  },
  {
    id: 'web-app-crm-development',
    slug: 'web-app-crm-development',
    title: 'Web App & CRM Development',
    shortDescription: 'Automate your business operations with custom web applications and CRM systems — lead tracking, invoice management, customer portals and more — designed to eliminate manual work and save you time.',
    fullDescription: 'Custom business management software and automation tools built for operational excellence.',
    iconName: 'Cpu',
    technologies: ['Custom CRM', 'Web Apps', 'Automation'],
    features: ['Automated Lead Tracking', 'Invoice & Billing Systems', 'Client Portals', 'Zero Manual Busywork'],
  },
  {
    id: 'website-maintenance-support',
    slug: 'website-maintenance-support',
    title: 'Website Maintenance & Support',
    shortDescription: 'Keep your website secure, up-to-date and running smoothly with our ongoing maintenance plans — plugin updates, backups, bug fixes, speed checks and priority support when you need it most.',
    fullDescription: 'Dedicated technical management ensuring your web properties are 100% secure, backed up, and updated.',
    iconName: 'Wrench',
    technologies: ['Monthly Plans', 'Bug Fixes', 'Priority Support'],
    features: ['Automated Daily Backups', 'Plugin & CMS Updates', 'Instant Bug Resolution', 'Priority 24/7 Tech Support'],
  },
];

export const CASE_STUDIES_DATA: ProjectCaseStudy[] = [
  {
    id: 'neobank-core',
    title: 'Modern Core Banking Platform for FinTech Leader',
    clientIndustry: 'FinTech & Payments',
    summary: 'Rebuilt real-time transaction processing portal and customer account dashboard using Next.js 16, MySQL clustering, and distributed caching, scaling to 15,000 tx/sec with sub-second execution.',
    imageUrl: '/services/crm.jpg',
    category: 'Web Platforms',
    impactMetrics: [
      { label: 'Query Latency', value: '<12ms' },
      { label: 'Throughput', value: '4.5x Boost' },
      { label: 'Uptime', value: '99.999%' },
    ],
    tags: ['Next.js 16', 'MySQL Clustering', 'AWS', 'Redis'],
  },
  {
    id: 'health-portal',
    title: 'HIPAA-Compliant Telehealth & Diagnostics App',
    clientIndustry: 'Healthcare & Life Sciences',
    summary: 'Engineered native Android doctor-patient application and doctor portal with real-time video consultation WebSockets, instant prescription PDF generation, and automated calendar sync.',
    imageUrl: '/services/android-app.jpg',
    category: 'Android Apps',
    impactMetrics: [
      { label: 'Consultations', value: '250K+' },
      { label: 'Crash-Free', value: '99.9%' },
      { label: 'User CSAT', value: '4.9 ★' },
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'WebSockets', 'MySQL'],
  },
  {
    id: 'ecommerce-scale',
    title: 'High-Traffic Fashion & Lifestyle Direct-to-Consumer Store',
    clientIndustry: 'E-Commerce & Retail',
    summary: 'Built headless e-commerce storefront with instantaneous faceted search, one-click WhatsApp checkout, payment gateway integration, and automated inventory sync with central ERP.',
    imageUrl: '/services/web-dev.jpg',
    category: 'E-Commerce',
    impactMetrics: [
      { label: 'Page Speed', value: '0.7s' },
      { label: 'Sales Lift', value: '+38%' },
      { label: 'Peak Concurrency', value: '25K Users' },
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Razorpay', 'Cloudflare'],
  },
  {
    id: 'logistics-telemetry',
    title: 'Autonomous AI Fleet Dispatch & Delivery System',
    clientIndustry: 'Logistics & Shipping',
    summary: 'Real-time GPS delivery driver tracking app and warehouse dispatch portal handling route optimization, fuel reduction telemetry, and instant proof-of-delivery barcode scanning.',
    imageUrl: '/services/hosting.jpg',
    category: 'Android Apps',
    impactMetrics: [
      { label: 'Dispatch Speed', value: '5.2x Faster' },
      { label: 'Fuel Saved', value: '18% MoM' },
      { label: 'Uptime', value: '99.99%' },
    ],
    tags: ['Flutter', 'Android Native', 'Node.js', 'Google Maps API'],
  },
  {
    id: 'enterprise-crm',
    title: 'Omnichannel B2B Customer Portal & CRM Suite',
    clientIndustry: 'B2B Enterprise',
    summary: 'Custom operational management platform replacing spreadsheets with unified client onboarding, automated GST invoice workflows, role-based access control, and sales pipelines.',
    imageUrl: '/services/seo.jpg',
    category: 'Web Platforms',
    impactMetrics: [
      { label: 'Admin Hours Saved', value: '40 hrs/wk' },
      { label: 'Invoicing Speed', value: 'Instant' },
      { label: 'Data Accuracy', value: '100%' },
    ],
    tags: ['React 19', 'FastAPI', 'MySQL 8.0', 'Docker'],
  },
  {
    id: 'brand-identity-funnel',
    title: 'High-Converting Performance Ads & Brand Identity',
    clientIndustry: 'Growth & Marketing',
    summary: 'Engineered high-converting landing pages and targeted Meta & Google ad funnels for a premier lifestyle brand, generating over 12,000 qualified inbound customer leads in 90 days.',
    imageUrl: '/services/paid-ads.jpg',
    category: 'Performance Growth',
    impactMetrics: [
      { label: 'Inbound Leads', value: '12,000+' },
      { label: 'CPL Reduction', value: '-44%' },
      { label: 'Ad ROI', value: '6.4x ROAS' },
    ],
    tags: ['Google Ads', 'Meta Ads', 'Conversion UX', 'Next.js'],
  },
];

export interface TechItem {
  name: string;
  category: string;
  version: string;
  badge?: string;
  description: string;
  isPrimary?: boolean;
}

export const TECH_STACK = [
  {
    category: 'Frontend & Web',
    items: [
      { name: 'Next.js 16', version: 'v16.4 App Router', badge: 'Core Framework', description: 'Server components, streaming SSR, TurboPack engine' },
      { name: 'React 19', version: 'v19.0 Concurrent', badge: 'UI Library', description: 'Server actions, optimistic hooks, asset loading' },
      { name: 'TypeScript', version: 'v5.6 Strict', badge: 'Type Safety', description: 'End-to-end type safety, zero runtime crashes' },
      { name: 'Tailwind CSS', version: 'v4.0 Modern', badge: 'Styling', description: 'JIT compilation, CSS tokens, glassmorphism' },
      { name: 'Redux / Zustand', version: 'Modern Store', badge: 'State Mgmt', description: 'Predictable atomic state management' },
      { name: 'Vue.js & Nuxt', version: 'v3 Composition', badge: 'Framework', description: 'Reactivity, progressive web applications' },
      { name: 'HTML5 & Modern CSS', version: 'W3C Standard', badge: 'Foundation', description: 'Semantic markup, accessible WCAG 2.1 UI' },
      { name: 'Framer Motion', version: 'v11 Motion', badge: 'Animation', description: 'Hardware-accelerated fluid web animations' },
    ],
  },
  {
    category: 'App Development',
    items: [
      { name: 'Android Native', version: 'Kotlin 2.0', badge: 'Primary OS', description: 'Jetpack Compose, clean Android architecture' },
      { name: 'Flutter & Dart', version: 'v3.24 Multi-OS', badge: 'Cross-Platform', description: 'High-performance cross-platform mobile apps' },
      { name: 'React Native', version: 'v0.76 Modern', badge: 'Hybrid Mobile', description: 'Fabric renderer, shared TypeScript codebase' },
      { name: 'Jetpack Compose', version: 'Modern UI', badge: 'Declarative', description: 'Modern declarative native Android interfaces' },
      { name: 'Play Store Launch', version: 'AAB / APK', badge: 'Deployment', description: 'Signed production bundle publishing and review' },
      { name: 'Firebase Mobile', version: 'FCM & Auth', badge: 'Mobile BaaS', description: 'Push notifications, analytics, remote config' },
      { name: 'Room / SQLite DB', version: 'Local Storage', badge: 'Offline First', description: 'High-speed local caching and offline synchronization' },
      { name: 'Swift & iOS', version: 'SwiftUI Native', badge: 'Apple iOS', description: 'Native iOS application engineering' },
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js', version: 'v22 LTS', badge: 'Runtime', description: 'Asynchronous event-driven backend microservices' },
      { name: 'Express.js', version: 'v5.0 Fast', badge: 'REST Engine', description: 'Lightweight high-speed RESTful routing API' },
      { name: 'PHP 8.3 & Laravel 11', version: 'v11.x MVC', badge: 'Enterprise PHP', description: 'Eloquent ORM, queue workers, robust APIs' },
      { name: 'Python FastAPI', version: 'Async Core', badge: 'High-Speed API', description: 'Pydantic typing, auto Swagger documentation' },
      { name: 'Django REST', version: 'v5.1 Python', badge: 'Secure Backend', description: 'Admin management, battle-tested security' },
      { name: 'Go (Golang)', version: 'v1.23 Micro', badge: 'Concurrency', description: 'Goroutine microservices with sub-5ms latency' },
      { name: 'REST & GraphQL', version: 'Federated API', badge: 'Integration', description: 'Clean schemas, Apollo Server, rate limiting' },
      { name: 'WebSockets & Socket.io', version: 'Real-Time', badge: 'Live Stream', description: 'Bi-directional live communication channels' },
      { name: 'MERN Stack', version: 'Full Architecture', badge: 'End-to-End', description: 'Unified JavaScript ecosystem web engineering' },
      { name: 'NestJS', version: 'Enterprise Node', badge: 'Modular Architecture', description: 'Dependency injection, microservices ready' },
    ],
  },
  {
    category: 'Databases & Storage',
    items: [
      { name: 'MySQL Enterprise', version: 'v8.4 LTS', badge: 'Primary RDBMS', description: 'InnoDB clustering, B-tree query indexing, replication', isPrimary: true },
      { name: 'Redis Cache', version: 'v7.4 In-Memory', badge: 'Ultra-Fast Cache', description: 'Sub-millisecond session & query caching' },
      { name: 'PostgreSQL', version: 'v16 ACID', badge: 'Relational DB', description: 'Complex analytics, JSONB documents, PostGIS' },
      { name: 'MongoDB', version: 'v7.0 Document', badge: 'NoSQL DB', description: 'Flexible schemaless document clustering' },
      { name: 'Prisma ORM', version: 'v5.20 Type-Safe', badge: 'Data Modeling', description: 'Auto-generated migrations and type inference' },
      { name: 'Cloudflare KV & D1', version: 'Edge Storage', badge: 'Edge Database', description: 'Global sub-10ms distributed edge reads' },
      { name: 'Supabase / Firebase', version: 'Cloud BaaS', badge: 'Cloud DB', description: 'Real-time database sync and secure auth rules' },
      { name: 'Automated Daily Backups', version: 'Point-in-Time', badge: 'Data Security', description: 'Encrypted off-site snapshots, instant restore' },
    ],
  },
  {
    category: 'DevOps, Cloud & Growth',
    items: [
      { name: 'Cloudflare CDN & WAF', version: 'Edge Network', badge: 'DDoS Shield', description: 'Global CDN edge caching, SSL, bot mitigation' },
      { name: 'AWS Cloud (EC2/S3/RDS)', version: 'Global Infra', badge: 'Cloud Leader', description: 'Elastic scaling, managed MySQL RDS, S3 storage' },
      { name: 'Docker & Containers', version: 'Compose & Build', badge: 'Containerization', description: 'Consistent zero-drift build environments' },
      { name: 'cPanel & Linux VPS', version: 'CentOS / Ubuntu', badge: 'Reliable Hosting', description: 'Dedicated resources, Apache/Nginx configuration' },
      { name: 'Google Ads & PPC', version: 'High-ROI Funnels', badge: 'Search & Display', description: 'Conversion tracking, negative keywords, high ROAS' },
      { name: 'Meta Ads (FB & Insta)', version: 'Lookalike Ads', badge: 'Paid Social', description: 'Targeted demographics, creative A/B testing' },
      { name: 'Technical SEO Suite', version: 'Google Search Console', badge: 'Organic Growth', description: 'Core Web Vitals 99+, schema markup, indexing' },
      { name: 'GitHub CI/CD Actions', version: 'Automated Test', badge: 'Zero-Downtime', description: 'Automated build, lint, test, and live deploy' },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Zenith Web Works built our company web portal and database architecture with unbelievable polish. Page load speed dropped from 4 seconds to under 800ms!',
    author: 'Arjun Mehta',
    role: 'Founder & CEO',
    company: 'VenturePulse Media',
  },
  {
    quote: 'Working with Zenith on our enterprise platform was a breath of fresh air. They understand database optimization, security, and slick modern UI inside and out.',
    author: 'Sarah Jenkins',
    role: 'Head of Digital Products',
    company: 'Aura Health International',
  },
  {
    quote: 'Their MySQL schema optimization and Next.js frontend migration allowed us to scale seamlessly during our highest traffic product launch without a single hiccup.',
    author: 'Rahul Sharma',
    role: 'Director of Engineering',
    company: 'PaySphere Technologies',
  },
];
