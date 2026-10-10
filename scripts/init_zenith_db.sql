-- ======================================================
-- ZENITH WEB WORKS - DATABASE INITIALIZATION SCRIPT
-- Database: zenith_it_db
-- ======================================================

CREATE DATABASE IF NOT EXISTS `zenith_it_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `zenith_it_db`;

-- 1. Contacts / Consultation Inquiries Table
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fullName` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `companyName` VARCHAR(150) DEFAULT NULL,
  `phoneNumber` VARCHAR(50) DEFAULT NULL,
  `serviceRequired` VARCHAR(100) NOT NULL,
  `budgetRange` VARCHAR(50) DEFAULT 'Flexible',
  `projectDetails` TEXT NOT NULL,
  `status` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED') DEFAULT 'NEW',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(50) PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `shortDescription` TEXT NOT NULL,
  `fullDescription` TEXT,
  `iconName` VARCHAR(50) NOT NULL,
  `technologies` JSON NOT NULL,
  `features` JSON NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Projects & Case Studies Table
CREATE TABLE IF NOT EXISTS `case_studies` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `clientIndustry` VARCHAR(100) NOT NULL,
  `summary` TEXT NOT NULL,
  `impactMetrics` JSON NOT NULL,
  `tags` JSON NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Technologies Table
CREATE TABLE IF NOT EXISTS `technologies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `isHighlighted` BOOLEAN DEFAULT FALSE,
  `badgeText` VARCHAR(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `author` VARCHAR(100) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `company` VARCHAR(100) NOT NULL,
  `quote` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ======================================================
-- SEED DATA INSERTION
-- ======================================================

-- Clear existing data if already present to prevent duplicates on rerun
TRUNCATE TABLE `services`;
TRUNCATE TABLE `case_studies`;
TRUNCATE TABLE `technologies`;
TRUNCATE TABLE `testimonials`;

-- Seed Services
INSERT INTO `services` (`id`, `slug`, `title`, `shortDescription`, `fullDescription`, `iconName`, `technologies`, `features`) VALUES
(
  'web-development',
  'custom-web-development',
  'Next-Gen Web Applications',
  'High-speed, responsive, SEO-optimized web applications with modern frontend frameworks and robust microservices.',
  'We engineer mission-critical digital experiences for businesses, ensuring ultra-fast page speed, resilient uptime, and conversion-focused architectures.',
  'Code',
  '["Next.js", "React 19", "TypeScript", "Tailwind CSS", "MySQL", "REST & GraphQL"]',
  '["Modern Server Components", "Sub-100ms Performance", "High-Concurrency APIs", "Fluid Mobile Experience"]'
),
(
  'cloud-devops',
  'cloud-infrastructure-devops',
  'Cloud Infrastructure & DevOps',
  'Multi-cloud architectures, automated CI/CD pipelines, container orchestration, and server reliability engineering.',
  'Design scalable and highly resilient infrastructure using AWS, GCP, and Azure with Kubernetes clusters and Terraform.',
  'Cloud',
  '["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Nginx"]',
  '["Zero-Downtime Deployment", "Auto-Scaling Clusters", "Cost-Optimized FinOps", "24/7 Health Telemetry"]'
),
(
  'enterprise-ai',
  'enterprise-ai-automation',
  'AI & Intelligent Automation',
  'Custom LLM models, RAG document knowledge bases, automated business workflows, and predictive analytics.',
  'Empower your company operations with private, secure artificial intelligence integrations and workflow automation.',
  'Cpu',
  '["Python", "OpenAI", "LangChain", "Vector DB", "FastAPI", "PyTorch"]',
  '["Private Enterprise RAG", "Workflow Automation Agents", "Natural Language Analytics", "Secure Data Guardrails"]'
),
(
  'cybersecurity',
  'cybersecurity-compliance',
  'Cybersecurity & Audit',
  'End-to-end vulnerability assessments, zero-trust network implementation, and compliance auditing.',
  'Harden your web and database assets against modern threat vectors with proactive penetration testing and automated security protocols.',
  'ShieldCheck',
  '["Zero Trust", "OWASP", "WAF", "SSL/TLS", "SOC2 Readiness", "Vault"]',
  '["Penetration Testing", "Continuous Threat Monitoring", "Role-Based Access Control", "Data Encryption at Rest"]'
),
(
  'database-mysql',
  'mysql-database-solutions',
  'High-Availability Database Engineering',
  'Expert MySQL schema design, query optimization, indexing, replication, and high-throughput data pipelines.',
  'We architect rock-solid relational and analytical database layers capable of supporting millions of daily active users.',
  'Database',
  '["MySQL 8.0+", "PostgreSQL", "Redis", "Kafka", "Prisma", "Database Sharding"]',
  '["Complex Query Optimization", "Master-Slave Replication", "Automated Daily Backups", "Sub-Millisecond Cache Layers"]'
),
(
  'mobile-solutions',
  'cross-platform-mobile',
  'Cross-Platform Mobile Apps',
  'Native-grade iOS & Android applications with offline-first synchronization and fluid UX.',
  'Build and ship beautiful mobile experiences powered by unified TypeScript codebases and reactive backends.',
  'Smartphone',
  '["React Native", "Flutter", "iOS", "Android", "Firebase", "WebSockets"]',
  '["Biometric Authentication", "Offline-First Sync", "Push Notification Engines", "Store Publishing Support"]'
);

-- Seed Case Studies
INSERT INTO `case_studies` (`id`, `title`, `clientIndustry`, `summary`, `impactMetrics`, `tags`) VALUES
(
  'neobank-core',
  'Modern Core Banking Platform for FinTech Leader',
  'FinTech & Payments',
  'Rebuilt transaction processing portal using Next.js, MySQL clustering, and distributed caching, scaling to 15,000 transactions/sec.',
  '[{"label": "Query Latency", "value": "<12ms"}, {"label": "Throughput", "value": "4.5x Boost"}, {"label": "Uptime", "value": "99.999%"}]',
  '["Next.js", "MySQL", "AWS", "Docker"]'
),
(
  'health-portal',
  'HIPAA-Compliant Telehealth & Diagnostics Platform',
  'Healthcare & Life Sciences',
  'Engineered patient dashboard with encrypted records in MySQL, video consultation WebSockets, and AI triage assistance.',
  '[{"label": "Consultations", "value": "250K+"}, {"label": "Compliance", "value": "100% HIPAA"}, {"label": "Patient CSAT", "value": "98.7%"}]',
  '["React", "TypeScript", "MySQL", "Tailwind CSS"]'
),
(
  'ecommerce-scale',
  'High-Traffic Global Marketplace Infrastructure',
  'E-Commerce & Retail',
  'Migrated legacy platform to headless Next.js architecture with MySQL read replicas, cutting bounce rate by 42%.',
  '[{"label": "Page Load", "value": "0.6s"}, {"label": "Sales Lift", "value": "+34%"}, {"label": "Black Friday Traffic", "value": "2.2M Users"}]',
  '["Next.js", "MySQL", "Redis", "Cloudflare"]'
);

-- Seed Technologies
INSERT INTO `technologies` (`category`, `name`, `isHighlighted`, `badgeText`) VALUES
('Frontend', 'Next.js 16 (App Router)', 1, 'Core Framework'),
('Frontend', 'React 19', 0, NULL),
('Frontend', 'TypeScript', 0, NULL),
('Frontend', 'Tailwind CSS', 0, NULL),
('Frontend', 'Framer Motion', 0, NULL),
('Frontend', 'HTML5 / Modern CSS', 0, NULL),

('Backend', 'Node.js & Express', 0, NULL),
('Backend', 'Python FastAPI', 0, NULL),
('Backend', 'RESTful API Services', 0, NULL),
('Backend', 'GraphQL', 0, NULL),
('Backend', 'WebSockets', 0, NULL),
('Backend', 'Microservices Architecture', 0, NULL),

('Databases', 'MySQL 8.0+', 1, 'Primary Relational DB'),
('Databases', 'Redis Cache', 0, NULL),
('Databases', 'PostgreSQL', 0, NULL),
('Databases', 'MongoDB', 0, NULL),
('Databases', 'Apache Kafka', 0, NULL),
('Databases', 'Database Sharding & Replication', 0, NULL),

('Cloud & DevOps', 'Amazon Web Services (AWS)', 1, 'Cloud Partner'),
('Cloud & DevOps', 'Docker Containers', 0, NULL),
('Cloud & DevOps', 'Kubernetes Orchestration', 0, NULL),
('Cloud & DevOps', 'Terraform (IaC)', 0, NULL),
('Cloud & DevOps', 'CI/CD Automation', 0, NULL),
('Cloud & DevOps', 'Cloudflare CDN & WAF', 0, NULL);

-- Seed Testimonials
INSERT INTO `testimonials` (`author`, `role`, `company`, `quote`, `rating`) VALUES
('Arjun Mehta', 'Founder & CEO', 'VenturePulse Media', 'Zenith Web Works built our company web portal and database architecture with unbelievable polish. Page load speed dropped from 4 seconds to under 800ms!', 5),
('Sarah Jenkins', 'Head of Digital Products', 'Aura Health International', 'Working with Zenith on our enterprise platform was a breath of fresh air. They understand database optimization, security, and slick modern UI inside and out.', 5),
('Rahul Sharma', 'Director of Engineering', 'PaySphere Technologies', 'Their MySQL schema optimization and Next.js frontend migration allowed us to scale seamlessly during our highest traffic product launch without a single hiccup.', 5);

-- Seed Sample Inquiries (to populate contacts table)
INSERT INTO `contacts` (`fullName`, `email`, `companyName`, `phoneNumber`, `serviceRequired`, `budgetRange`, `projectDetails`, `status`) VALUES
('Rohan Kapoor', 'rohan@kapoortech.com', 'Kapoor Technologies', '+91 98765 43210', 'Next-Gen Web Applications', '$25k - $50k', 'We need a high-performance customer portal with MySQL database integration, real-time dashboard analytics, and mobile responsive design.', 'QUALIFIED'),
('David Miller', 'david.m@cloudscale.io', 'CloudScale Global', '+1 415 889 0122', 'High-Availability Database Engineering', '$50k+', 'Need MySQL replication setup, query performance tuning, and high availability disaster recovery configuration.', 'CONTACTED');
