import { NextResponse } from 'next/server';
import { connection } from 'next/server';
import { checkDbConnection } from '@/lib/db';

export async function GET() {
  await connection();
  const status = await checkDbConnection();
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    ...status,
  });
}
