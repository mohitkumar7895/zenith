import { NextRequest, NextResponse } from 'next/server';
import { connection } from 'next/server';
import { getDbPool, initializeDatabase } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface CareerItem {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
  description: string;
  createdAt?: string;
}

const DEFAULT_CAREERS: CareerItem[] = [
  {
    id: 1,
    title: 'Senior Next.js & Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (India)',
    type: 'Full-Time',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'MySQL', 'Tailwind CSS'],
    description: 'Build high-performance web applications, server components, and relational database pipelines for enterprise clients.',
  },
  {
    id: 2,
    title: 'Android & Flutter Mobile Developer',
    department: 'Mobile Engineering',
    location: 'Hybrid / Remote',
    type: 'Full-Time',
    tags: ['Android Native', 'Flutter', 'Kotlin', 'Firebase', 'Play Store'],
    description: 'Develop fluid, offline-first mobile apps for consumer businesses, booking engines, and internal CRM portals.',
  },
  {
    id: 3,
    title: 'Senior UI/UX & Graphic Designer',
    department: 'Design & Creative',
    location: 'Remote',
    type: 'Full-Time',
    tags: ['Figma', 'Brand Identity', 'Social Media Creatives', 'Vector Art'],
    description: 'Craft memorable brand identities, modern web UI designs, marketing collaterals, and high-converting ad visuals.',
  },
  {
    id: 4,
    title: 'Performance Marketing & Paid Ads Lead',
    department: 'Growth & Marketing',
    location: 'Remote',
    type: 'Full-Time',
    tags: ['Google Ads', 'Meta Ads', 'Funnel Optimization', 'Analytics'],
    description: 'Lead data-driven PPC campaigns, lead generation funnels, and ROI tracking across Google and Meta ad platforms.',
  },
];

export async function GET() {
  await connection();
  try {
    await initializeDatabase();
    const db = getDbPool();
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, title, department, location, type, tags, description, createdAt FROM careers ORDER BY id DESC'
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const careers: CareerItem[] = rows.map((r) => ({
        id: r.id,
        title: r.title,
        department: r.department,
        location: r.location,
        type: r.type,
        tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
        description: r.description,
        createdAt: r.createdAt,
      }));
      return NextResponse.json({ success: true, count: careers.length, careers });
    }
  } catch (err) {
    console.warn('MySQL careers query error, returning fallback:', err);
  }

  return NextResponse.json({ success: true, count: DEFAULT_CAREERS.length, careers: DEFAULT_CAREERS });
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { title, department, location, type, tags, description } = body;

    if (!title || !department || !description) {
      return NextResponse.json(
        { success: false, message: 'Please provide Title, Department, and Description.' },
        { status: 400 }
      );
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    const db = getDbPool();
    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO careers (title, department, location, type, tags, description) VALUES (?, ?, ?, ?, ?, ?)',
      [
        title,
        department,
        location || 'Remote / Hybrid',
        type || 'Full-Time',
        JSON.stringify(tagsArray),
        description,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Job opening posted successfully!',
        career: {
          id: result.insertId,
          title,
          department,
          location: location || 'Remote / Hybrid',
          type: type || 'Full-Time',
          tags: tagsArray,
          description,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error posting career:', error);
    return NextResponse.json(
      { success: false, message: 'Database error saving job opening.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Job ID is required.' }, { status: 400 });
    }

    const db = getDbPool();
    await db.execute('DELETE FROM careers WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: `Job opening #${id} removed successfully.` });
  } catch (error) {
    console.error('Error deleting job opening:', error);
    return NextResponse.json(
      { success: false, message: 'Database error deleting job opening.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { id, title, department, location, type, tags, description } = body;

    if (!id || !title || !department || !description) {
      return NextResponse.json(
        { success: false, message: 'Please provide ID, Title, Department, and Description.' },
        { status: 400 }
      );
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    const db = getDbPool();
    await db.execute<ResultSetHeader>(
      'UPDATE careers SET title = ?, department = ?, location = ?, type = ?, tags = ?, description = ? WHERE id = ?',
      [
        title,
        department,
        location || 'Remote / Hybrid',
        type || 'Full-Time',
        JSON.stringify(tagsArray),
        description,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Job opening updated successfully!',
      career: {
        id: Number(id),
        title,
        department,
        location: location || 'Remote / Hybrid',
        type: type || 'Full-Time',
        tags: tagsArray,
        description,
      },
    });
  } catch (error) {
    console.error('Error updating career:', error);
    return NextResponse.json(
      { success: false, message: 'Database error updating job opening.' },
      { status: 500 }
    );
  }
}

