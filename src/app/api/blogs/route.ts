import { NextRequest, NextResponse, connection } from 'next/server';
import { getDbPool, initializeDatabase } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

const FALLBACK_BLOGS = [
  {
    id: 1,
    slug: 'nextjs-16-web-performance',
    title: 'Why Next.js 16 & Server Components Are The Future of Web Performance',
    category: 'Web Engineering',
    author: 'Zenith Tech Team',
    date: 'October 2026',
    readTime: '5 min read',
    image: '/services/web-dev.jpg',
    summary: 'Explore how React 19 server components, Turbopack, and partial pre-rendering in Next.js 16 deliver instant page loads and superior Core Web Vitals.',
    content: 'Next.js 16 represents a massive leap forward for production web applications. By shifting heavy computation to React 19 Server Components, streaming HTML chunks directly to edge runtimes, and utilizing Turbopack compilation pipelines, applications load in under 500ms even on slow mobile networks. At Zenith Web Works, our architecture leverages zero-client-JS layouts combined with selective hydration to achieve perfect 100/100 Lighthouse scores.',
    tags: ['Next.js 16', 'React 19', 'Performance', 'Web Architecture'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    slug: 'mysql-high-availability-scaling',
    title: 'Scaling MySQL For High-Concurrency Enterprise Web Platforms',
    category: 'Database Engineering',
    author: 'Database Architecture Group',
    date: 'September 2026',
    readTime: '7 min read',
    image: '/services/hosting.jpg',
    summary: 'Practical guide to query optimization, composite indexing strategies, connection pooling, and multi-region replication in MySQL 8.0+.',
    content: 'Scaling relational databases requires a disciplined strategy around indexing, pooling, and connection management. In this comprehensive guide, we cover connection pooling with mysql2, query cache invalidation, multi-thread query optimization, and structured JSON columns for dynamic entity schemas.',
    tags: ['MySQL', 'Database', 'Backend', 'High Availability'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    slug: 'android-native-vs-flutter',
    title: 'Native Android vs. Flutter: Choosing The Right Tech Stack in 2026',
    category: 'Mobile Development',
    author: 'Mobile Solutions Team',
    date: 'August 2026',
    readTime: '6 min read',
    image: '/services/android-app.jpg',
    summary: 'A detailed breakdown of performance, development speed, hardware integration, and Play Store compliance between Kotlin Native and Flutter.',
    content: 'Choosing between native Android (Kotlin with Jetpack Compose) and cross-platform Flutter is one of the most critical decisions for digital businesses. We evaluate startup latencies, APK bundle sizes, battery consumption, and native Bluetooth/camera hardware APIs.',
    tags: ['Android', 'Flutter', 'Mobile Apps', 'Play Store'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    slug: 'technical-seo-core-web-vitals',
    title: 'The Core Web Vitals Playbook: Achieving Under 2-Second Page Loads',
    category: 'SEO & Growth',
    author: 'Growth Marketing Team',
    date: 'July 2026',
    readTime: '4 min read',
    image: '/services/seo.jpg',
    summary: 'Step-by-step techniques for image optimization, Cloudflare edge caching, critical CSS inlining, and technical SEO to dominate Google search rankings.',
    content: 'Google ranking algorithms directly reward websites that satisfy strict INP (Interaction to Next Paint), LCP (Largest Contentful Paint), and CLS metrics. Discover the exact Cloudflare edge-caching rules and responsive image optimizations we use to rank client brands at the top of organic search.',
    tags: ['Technical SEO', 'Cloudflare', 'PageSpeed', 'Google Rankings'],
    createdAt: new Date().toISOString(),
  },
];

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET() {
  await connection();
  try {
    await initializeDatabase();
    const db = getDbPool();

    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, slug, title, category, author, date, readTime, image, summary, content, tags, createdAt FROM blogs ORDER BY id DESC'
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: true, blogs: FALLBACK_BLOGS },
        { headers: NO_CACHE_HEADERS }
      );
    }

    const formatted = rows.map((r) => {
      let tagsArray: string[] = [];
      if (typeof r.tags === 'string') {
        try {
          tagsArray = JSON.parse(r.tags);
        } catch {
          tagsArray = r.tags.split(',').map((t: string) => t.trim());
        }
      } else if (Array.isArray(r.tags)) {
        tagsArray = r.tags;
      }

      return {
        ...r,
        tags: tagsArray,
      };
    });

    return NextResponse.json(
      { success: true, blogs: formatted },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.warn('Database error fetching blogs, using fallback:', error);
    return NextResponse.json(
      { success: true, blogs: FALLBACK_BLOGS },
      { headers: NO_CACHE_HEADERS }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const {
      title,
      category = 'Web Engineering',
      author = 'Zenith Engineering Team',
      readTime = '5 min read',
      image = '/services/web-dev.jpg',
      summary,
      content,
      tags = [],
    } = body;

    if (!title || !summary) {
      return NextResponse.json(
        { success: false, message: 'Blog title and summary/content are required.' },
        { status: 400 }
      );
    }

    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : [tags]);

    const db = getDbPool();
    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO blogs (slug, title, category, author, date, readTime, image, summary, content, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        slug,
        title.trim(),
        category.trim(),
        author.trim(),
        dateStr,
        readTime.trim(),
        image.trim(),
        summary.trim(),
        (content || summary).trim(),
        tagsJson,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Blog article published successfully!',
      blogId: result.insertId,
      slug,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Database error saving blog article.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Blog ID is required to delete.' },
        { status: 400 }
      );
    }

    await initializeDatabase();
    const db = getDbPool();

    await db.execute('DELETE FROM blogs WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Blog article deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Database error deleting blog article.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const {
      id,
      title,
      category = 'Web Engineering',
      author = 'Zenith Engineering Team',
      readTime = '5 min read',
      image = '/services/web-dev.jpg',
      summary,
      content,
      tags = [],
    } = body;

    if (!id || !title || !summary) {
      return NextResponse.json(
        { success: false, message: 'Blog ID, title, and summary are required.' },
        { status: 400 }
      );
    }

    const tagsJson = JSON.stringify(
      Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [tags]
    );

    const db = getDbPool();
    await db.execute<ResultSetHeader>(
      'UPDATE blogs SET title = ?, category = ?, author = ?, readTime = ?, image = ?, summary = ?, content = ?, tags = ? WHERE id = ?',
      [
        title.trim(),
        category.trim(),
        author.trim(),
        readTime.trim(),
        image.trim(),
        summary.trim(),
        (content || summary).trim(),
        tagsJson,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Blog article updated successfully!',
      blogId: id,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Database error updating blog article.' },
      { status: 500 }
    );
  }
}

