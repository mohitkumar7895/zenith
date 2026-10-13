import { NextRequest, NextResponse } from 'next/server';
import { connection } from 'next/server';
import { getDbPool, initializeDatabase } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface BrandItem {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  category?: string;
  createdAt?: string;
}

const DEFAULT_BRANDS: BrandItem[] = [
  {
    id: 10,
    name: 'Jan Seva Portal',
    description:
      'A Digital Jan Seva & E-Governance Portal providing citizens with easy access to government services, online documentation, certificates, Aadhaar, PAN, bill payments, and public welfare schemes all in one place.',
    category: 'E-Governance',
    websiteUrl: 'https://www.jan-seva.site/',
    logoUrl: '/uploads/jan-seva-logo-1791908116145.png',
  },
  {
    id: 11,
    name: 'Repnexa',
    description:
      'Repnexa is a smart service booking platform connecting customers with trusted professionals for AC, Washing Machine, Refrigerator, Mobile, Laptop, CCTV and other repair services. Join as a service partner, receive customer leads, grow your business and earn more.',
    category: 'Home & Electronics Repair Services',
    websiteUrl: 'https://repnexa.vercel.app/',
    logoUrl: '/uploads/repnexa.avif',
  },
  {
    id: 12,
    name: 'Bhartiyebazar',
    description: 'Bhartiyebazar offers awareness and digital Solutions to ecommerce projects.',
    category: 'E-Commerce',
    websiteUrl: 'https://bhartiyebazar.com',
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

    // Auto-sync default brand details to ensure live database has the latest URLs and logos
    for (const b of DEFAULT_BRANDS) {
      try {
        await db.execute(
          'UPDATE brands SET description = ?, logoUrl = ?, websiteUrl = ?, category = ? WHERE name = ?',
          [b.description || '', b.logoUrl || null, b.websiteUrl || null, b.category || '', b.name]
        );
      } catch {}
    }

    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, name, description, logoUrl, websiteUrl, category, createdAt FROM brands ORDER BY id ASC'
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(
        { success: true, count: rows.length, brands: rows },
        { headers: NO_CACHE_HEADERS }
      );
    }
  } catch (err) {
    console.warn('MySQL brands query error, returning fallback:', err);
  }

  return NextResponse.json(
    { success: true, count: DEFAULT_BRANDS.length, brands: DEFAULT_BRANDS },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { name, description, logoUrl, websiteUrl, category } = body;

    if (!name) {
      return NextResponse.json({ success: false, message: 'Brand name is required.' }, { status: 400 });
    }

    const db = getDbPool();
    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO brands (name, description, logoUrl, websiteUrl, category) VALUES (?, ?, ?, ?, ?)',
      [name, description || '', logoUrl || null, websiteUrl || null, category || 'Enterprise Client']
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Brand added successfully!',
        brand: {
          id: result.insertId,
          name,
          description,
          logoUrl,
          websiteUrl,
          category: category || 'Enterprise Client',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding brand:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to insert brand into MySQL database.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Brand ID is required.' }, { status: 400 });
    }

    const db = getDbPool();
    await db.execute('DELETE FROM brands WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: `Brand #${id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json(
      { success: false, message: 'Database error deleting brand.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { id, name, description, logoUrl, websiteUrl, category } = body;

    if (!id || !name) {
      return NextResponse.json(
        { success: false, message: 'Brand ID and name are required.' },
        { status: 400 }
      );
    }

    const db = getDbPool();
    await db.execute(
      'UPDATE brands SET name = ?, description = ?, logoUrl = ?, websiteUrl = ?, category = ? WHERE id = ?',
      [
        name.trim(),
        description || '',
        logoUrl || null,
        websiteUrl || null,
        category || 'Enterprise Client',
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Brand updated successfully!',
      brand: {
        id: Number(id),
        name: name.trim(),
        description,
        logoUrl,
        websiteUrl,
        category: category || 'Enterprise Client',
      },
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json(
      { success: false, message: 'Database error updating brand.' },
      { status: 500 }
    );
  }
}

