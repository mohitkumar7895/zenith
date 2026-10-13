import { NextRequest, NextResponse } from 'next/server';
import { connection } from 'next/server';
import { getDbPool } from '@/lib/db';
import { CASE_STUDIES_DATA } from '@/lib/data';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { ProjectCaseStudy } from '@/models/types';

export async function GET() {
  await connection();
  try {
    const db = getDbPool();
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, title, clientIndustry, summary, impactMetrics, tags, imageUrl FROM case_studies ORDER BY createdAt DESC'
    );
    if (Array.isArray(rows) && rows.length > 0) {
      const projects: ProjectCaseStudy[] = rows.map((r) => ({
        id: r.id,
        title: r.title,
        clientIndustry: r.clientIndustry,
        summary: r.summary,
        imageUrl: r.imageUrl || undefined,
        impactMetrics: typeof r.impactMetrics === 'string' ? JSON.parse(r.impactMetrics) : r.impactMetrics || [],
        tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
      }));
      return NextResponse.json({ success: true, count: projects.length, projects });
    }
  } catch (err) {
    console.warn('Could not query case_studies from MySQL:', err);
  }

  return NextResponse.json({ success: true, count: CASE_STUDIES_DATA.length, projects: CASE_STUDIES_DATA });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, clientIndustry, summary, impactMetrics, tags } = body;

    if (!title || !clientIndustry || !summary) {
      return NextResponse.json(
        { success: false, message: 'Please provide Title, Client/Industry, and Summary.' },
        { status: 400 }
      );
    }

    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `proj-${Date.now()}`;

    const formattedMetrics = Array.isArray(impactMetrics) ? impactMetrics : [];
    const formattedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [];

    const db = getDbPool();
    await db.execute<ResultSetHeader>(
      `INSERT INTO case_studies (id, title, clientIndustry, summary, impactMetrics, tags, imageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       title = VALUES(title), 
       clientIndustry = VALUES(clientIndustry), 
       summary = VALUES(summary), 
       impactMetrics = VALUES(impactMetrics), 
       tags = VALUES(tags),
       imageUrl = VALUES(imageUrl)`,
      [
        id,
        title,
        clientIndustry,
        summary,
        JSON.stringify(formattedMetrics),
        JSON.stringify(formattedTags),
        body.imageUrl || null,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully in MySQL database!',
        project: {
          id,
          title,
          clientIndustry,
          summary,
          impactMetrics: formattedMetrics,
          tags: formattedTags,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project in MySQL:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database error saving project.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Project ID is required.' }, { status: 400 });
    }

    const db = getDbPool();
    await db.execute('DELETE FROM case_studies WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: `Project ${id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete project.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, clientIndustry, summary, impactMetrics, tags, imageUrl } = body;

    if (!id || !title || !clientIndustry || !summary) {
      return NextResponse.json(
        { success: false, message: 'Please provide Project ID, Title, Industry, and Summary.' },
        { status: 400 }
      );
    }

    const formattedMetrics = Array.isArray(impactMetrics) ? impactMetrics : [];
    const formattedTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    const db = getDbPool();
    await db.execute<ResultSetHeader>(
      `UPDATE case_studies SET
       title = ?,
       clientIndustry = ?,
       summary = ?,
       impactMetrics = ?,
       tags = ?,
       imageUrl = ?
       WHERE id = ?`,
      [
        title,
        clientIndustry,
        summary,
        JSON.stringify(formattedMetrics),
        JSON.stringify(formattedTags),
        imageUrl || null,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully!',
      project: {
        id,
        title,
        clientIndustry,
        summary,
        impactMetrics: formattedMetrics,
        tags: formattedTags,
        imageUrl,
      },
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update project in database.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

