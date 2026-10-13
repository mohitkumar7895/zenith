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
    id: 1,
    name: 'Jan Seva Portal',
    description: 'Official Digital Public Services & E-Governance Portal connecting citizens with online government documentation, certificates, and utility solutions.',
    category: 'E-Governance',
    websiteUrl: 'https://jansevaportal.in',
  },
  {
    id: 2,
    name: 'Repnexa',
    description: 'Next-Gen Enterprise IT Solutions including Custom Software Engineering, Mobile Applications, Cloud Systems, SEO & Digital Performance.',
    category: 'Technology',
    websiteUrl: 'https://repnexa.com',
  },
  {
    id: 3,
    name: 'Bhartiyebazar',
    description: 'Bhartiyebazar offers awareness and digital Solutions to ecommerce projects.',
    category: 'E-Commerce',
    websiteUrl: 'https://bhartiyebazar.com',
  },
];

export async function GET() {
  await connection();
  try {
    await initializeDatabase();
    const db = getDbPool();
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, name, description, logoUrl, websiteUrl, category, createdAt FROM brands ORDER BY id ASC'
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ success: true, count: rows.length, brands: rows });
    }
  } catch (err) {
    console.warn('MySQL brands query error, returning fallback:', err);
  }

  return NextResponse.json({ success: true, count: DEFAULT_BRANDS.length, brands: DEFAULT_BRANDS });
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

