import mysql, { Pool, PoolOptions } from 'mysql2/promise';

let pool: Pool | null = null;
let tablesInitialized = false;

// Create or reuse MySQL connection pool
export function getDbPool(): Pool {
  if (!pool) {
    const config: PoolOptions = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'zenith_it_db',
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 4000,
    };

    pool = mysql.createPool(config);
  }
  return pool;
}

// Automatically creates necessary MySQL tables if they do not exist
export async function initializeDatabase(): Promise<boolean> {
  try {
    // First, connect without specifying database to create database if missing
    const rootConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 3306,
      connectTimeout: 3000,
    });

    const dbName = process.env.DB_NAME || 'zenith_it_db';
    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConnection.end();

    const db = getDbPool();

    // Table: Contacts / Leads
    await db.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        companyName VARCHAR(150) DEFAULT NULL,
        phoneNumber VARCHAR(50) DEFAULT NULL,
        serviceRequired VARCHAR(100) NOT NULL,
        budgetRange VARCHAR(50) DEFAULT NULL,
        projectDetails TEXT NOT NULL,
        status ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED') DEFAULT 'NEW',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Table: Services (Metadata)
    await db.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(50) PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        title VARCHAR(150) NOT NULL,
        shortDescription TEXT NOT NULL,
        fullDescription TEXT,
        iconName VARCHAR(50),
        technologies JSON,
        features JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Table: Admins
    await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed default admin if none exists
    const [adminRows] = await db.query('SELECT id FROM admins LIMIT 1');
    if (Array.isArray(adminRows) && adminRows.length === 0) {
      await db.execute(
        'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Senior Admin', 'admin@zenithwebworks.io', 'admin123', 'superadmin']
      );
    }

    // Table: Brands / Clients
    await db.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        logoUrl VARCHAR(255) DEFAULT NULL,
        websiteUrl VARCHAR(255) DEFAULT NULL,
        category VARCHAR(100) DEFAULT 'Enterprise Client',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure description column exists in brands if table was created previously
    try {
      await db.query(`ALTER TABLE brands ADD COLUMN description TEXT AFTER name;`);
    } catch {}

    // Seed/Update requested brands
    const [brandRows] = await db.query('SELECT id FROM brands LIMIT 1');
    if (Array.isArray(brandRows) && brandRows.length === 0) {
      await db.query(`
        INSERT INTO brands (name, description, category, websiteUrl, logoUrl) VALUES
        ('Jan Seva Portal', 'A Digital Jan Seva & E-Governance Portal providing citizens with easy access to government services, online documentation, certificates, Aadhaar, PAN, bill payments, and public welfare schemes all in one place.', 'E-Governance', 'https://www.jan-seva.site/', '/uploads/jan-seva-logo-1791908116145.png'),
        ('Repnexa', 'Repnexa is a smart service booking platform connecting customers with trusted professionals for AC, Washing Machine, Refrigerator, Mobile, Laptop, CCTV and other repair services. Join as a service partner, receive customer leads, grow your business and earn more.', 'Home & Electronics Repair Services', 'https://repnexa.vercel.app/', '/uploads/repnexa.avif'),
        ('Bhartiyebazar', 'Bhartiyebazar offers awareness and digital Solutions to ecommerce projects.', 'E-Commerce', 'https://bhartiyebazar.com', NULL);
      `);
    }

    // Table: Careers / Job Openings
    await db.query(`
      CREATE TABLE IF NOT EXISTS careers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        department VARCHAR(100) NOT NULL,
        location VARCHAR(100) DEFAULT 'Remote / Hybrid',
        type VARCHAR(50) DEFAULT 'Full-Time',
        tags JSON,
        description TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed default careers if none exists
    const [careerRows] = await db.query('SELECT id FROM careers LIMIT 1');
    if (Array.isArray(careerRows) && careerRows.length === 0) {
      await db.execute(`
        INSERT INTO careers (title, department, location, type, tags, description) VALUES
        (
          'Senior Next.js & Full-Stack Engineer',
          'Engineering',
          'Remote (India)',
          'Full-Time',
          '["Next.js 16", "React 19", "TypeScript", "MySQL", "Tailwind CSS"]',
          'Build high-performance web applications, server components, and relational database pipelines for enterprise clients.'
        ),
        (
          'Android & Flutter Mobile Developer',
          'Mobile Engineering',
          'Hybrid',
          'Full-Time',
          '["Android Native", "Flutter", "Kotlin", "Firebase"]',
          'Develop fluid, offline-first mobile apps for consumer businesses, booking engines, and internal CRM portals.'
        ),
        (
          'Senior UI/UX & Graphic Designer',
          'Design & Creative',
          'Remote',
          'Full-Time',
          '["Figma", "Brand Identity", "Social Media Creatives", "Vector Art"]',
          'Craft memorable brand identities, modern web UI designs, marketing collaterals, and high-converting ad visuals.'
        ),
        (
          'Performance Marketing & Paid Ads Lead',
          'Growth & Marketing',
          'Remote',
          'Full-Time',
          '["Google Ads", "Meta Ads", "Funnel Optimization", "Analytics"]',
          'Lead data-driven PPC campaigns, lead generation funnels, and ROI tracking across Google and Meta ad platforms.'
        );
      `);
    }

    // Table: Case Studies / Projects
    await db.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        clientIndustry VARCHAR(150) NOT NULL,
        summary TEXT NOT NULL,
        impactMetrics JSON,
        tags JSON,
        imageUrl VARCHAR(255) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure imageUrl column exists if table was created in an earlier migration
    try {
      await db.query(`ALTER TABLE case_studies ADD COLUMN imageUrl VARCHAR(255) DEFAULT NULL;`);
    } catch {}

    // Table: Blogs / Insights
    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(200) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'Web Engineering',
        author VARCHAR(100) NOT NULL DEFAULT 'Zenith Engineering Team',
        date VARCHAR(100) DEFAULT 'October 2026',
        readTime VARCHAR(50) DEFAULT '5 min read',
        image VARCHAR(255) DEFAULT '/services/web-dev.jpg',
        summary TEXT NOT NULL,
        content LONGTEXT,
        tags JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed default blogs if empty
    const [blogRows] = await db.query('SELECT id FROM blogs LIMIT 1');
    if (Array.isArray(blogRows) && blogRows.length === 0) {
      await db.execute(`
        INSERT INTO blogs (slug, title, category, author, date, readTime, image, summary, content, tags) VALUES
        (
          'nextjs-16-web-performance',
          'Why Next.js 16 & Server Components Are The Future of Web Performance',
          'Web Engineering',
          'Zenith Tech Team',
          'October 2026',
          '5 min read',
          '/services/web-dev.jpg',
          'Explore how React 19 server components, Turbopack, and partial pre-rendering in Next.js 16 deliver instant page loads and superior Core Web Vitals.',
          'Next.js 16 represents a massive leap forward for production web applications. By shifting heavy computation to React 19 Server Components, streaming HTML chunks directly to edge runtimes, and utilizing Turbopack compilation pipelines, applications load in under 500ms even on slow mobile networks. At Zenith Web Works, our architecture leverages zero-client-JS layouts combined with selective hydration to achieve perfect 100/100 Lighthouse scores.',
          '["Next.js 16", "React 19", "Performance", "Web Architecture"]'
        ),
        (
          'mysql-high-availability-scaling',
          'Scaling MySQL For High-Concurrency Enterprise Web Platforms',
          'Database Engineering',
          'Database Architecture Group',
          'September 2026',
          '7 min read',
          '/services/hosting.jpg',
          'Practical guide to query optimization, composite indexing strategies, connection pooling, and multi-region replication in MySQL 8.0+.',
          'Scaling relational databases requires a disciplined strategy around indexing, pooling, and connection management. In this comprehensive guide, we cover connection pooling with mysql2, query cache invalidation, multi-thread query optimization, and structured JSON columns for dynamic entity schemas.',
          '["MySQL", "Database", "Backend", "High Availability"]'
        ),
        (
          'android-native-vs-flutter',
          'Native Android vs. Flutter: Choosing The Right Tech Stack in 2026',
          'Mobile Development',
          'Mobile Solutions Team',
          'August 2026',
          '6 min read',
          '/services/android-app.jpg',
          'A detailed breakdown of performance, development speed, hardware integration, and Play Store compliance between Kotlin Native and Flutter.',
          'Choosing between native Android (Kotlin with Jetpack Compose) and cross-platform Flutter is one of the most critical decisions for digital businesses. We evaluate startup latencies, APK bundle sizes, battery consumption, and native Bluetooth/camera hardware APIs.',
          '["Android", "Flutter", "Mobile Apps", "Play Store"]'
        ),
        (
          'technical-seo-core-web-vitals',
          'The Core Web Vitals Playbook: Achieving Under 2-Second Page Loads',
          'SEO & Growth',
          'Growth Marketing Team',
          'July 2026',
          '4 min read',
          '/services/seo.jpg',
          'Step-by-step techniques for image optimization, Cloudflare edge caching, critical CSS inlining, and technical SEO to dominate Google search rankings.',
          'Google ranking algorithms directly reward websites that satisfy strict INP (Interaction to Next Paint), LCP (Largest Contentful Paint), and CLS metrics. Discover the exact Cloudflare edge-caching rules and responsive image optimizations we use to rank client brands at the top of organic search.',
          '["Technical SEO", "Cloudflare", "PageSpeed", "Google Rankings"]'
        );
      `);
    }

    tablesInitialized = true;
    return true;
  } catch (error) {
    console.warn('[MySQL Initialization Warning]: Could not auto-initialize MySQL tables.', error instanceof Error ? error.message : error);
    return false;
  }
}

// Check database connection status
export async function checkDbConnection(): Promise<{ connected: boolean; message: string; host: string; database: string }> {
  const host = process.env.DB_HOST || 'localhost';
  const database = process.env.DB_NAME || 'zenith_it_db';

  try {
    const db = getDbPool();
    const [rows] = await db.query('SELECT 1 as ping');
    return {
      connected: Array.isArray(rows) && rows.length > 0,
      message: 'Connected to MySQL successfully',
      host,
      database,
    };
  } catch (err) {
    return {
      connected: false,
      message: err instanceof Error ? err.message : 'Unable to connect to MySQL',
      host,
      database,
    };
  }
}
