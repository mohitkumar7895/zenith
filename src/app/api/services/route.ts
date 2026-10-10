import { NextResponse } from 'next/server';
import { connection } from 'next/server';
import { getDbPool } from '@/lib/db';
import { SERVICES_DATA } from '@/lib/data';
import { RowDataPacket } from 'mysql2/promise';
import { Service } from '@/models/types';

export async function GET() {
  await connection();
  try {
    const db = getDbPool();
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, slug, title, shortDescription, fullDescription, iconName, technologies, features FROM services'
    );
    if (Array.isArray(rows) && rows.length > 0) {
      const services: Service[] = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        shortDescription: r.shortDescription,
        fullDescription: r.fullDescription || '',
        iconName: r.iconName,
        technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies) : r.technologies || [],
        features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features || [],
      }));
      return NextResponse.json({ success: true, count: services.length, services });
    }
  } catch (err) {
    console.warn('Could not query services from MySQL:', err);
  }

  return NextResponse.json({ success: true, count: SERVICES_DATA.length, services: SERVICES_DATA });
}
