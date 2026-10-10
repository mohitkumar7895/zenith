import { getDbPool, initializeDatabase } from '@/lib/db';
import { ContactLead } from './types';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// In-memory fallback in case MySQL database is temporarily unreachable
const inMemoryLeadsFallback: ContactLead[] = [];

export class ContactModel {
  /**
   * Save a new contact / consultation inquiry lead to MySQL
   */
  static async create(lead: ContactLead): Promise<{ id: number; savedToMysql: boolean }> {
    try {
      await initializeDatabase();
      const db = getDbPool();

      const [result] = await db.execute<ResultSetHeader>(
        `INSERT INTO contacts (fullName, email, companyName, phoneNumber, serviceRequired, budgetRange, projectDetails, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lead.fullName,
          lead.email,
          lead.companyName || null,
          lead.phoneNumber || null,
          lead.serviceRequired,
          lead.budgetRange || 'Flexible',
          lead.projectDetails,
          lead.status || 'NEW',
        ]
      );

      return {
        id: result.insertId,
        savedToMysql: true,
      };
    } catch (error) {
      console.warn('[ContactModel]: MySQL unavailable, saving to memory fallback.', error instanceof Error ? error.message : error);
      const fallbackId = inMemoryLeadsFallback.length + 1;
      inMemoryLeadsFallback.unshift({
        ...lead,
        id: fallbackId,
        createdAt: new Date().toISOString(),
      });
      return {
        id: fallbackId,
        savedToMysql: false,
      };
    }
  }

  /**
   * Fetch all leads from MySQL (or fallback)
   */
  static async findAll(): Promise<{ leads: ContactLead[]; source: 'mysql' | 'memory' }> {
    try {
      await initializeDatabase();
      const db = getDbPool();
      const [rows] = await db.query<RowDataPacket[]>(
        'SELECT id, fullName, email, companyName, phoneNumber, serviceRequired, budgetRange, projectDetails, status, createdAt FROM contacts ORDER BY createdAt DESC LIMIT 50'
      );

      const leads: ContactLead[] = rows.map((r) => ({
        id: r.id,
        fullName: r.fullName,
        email: r.email,
        companyName: r.companyName,
        phoneNumber: r.phoneNumber,
        serviceRequired: r.serviceRequired,
        budgetRange: r.budgetRange,
        projectDetails: r.projectDetails,
        status: r.status,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : undefined,
      }));

      return { leads, source: 'mysql' };
    } catch (err) {
      console.warn('[ContactModel]: Using fallback lead store.', err instanceof Error ? err.message : err);
      return { leads: inMemoryLeadsFallback, source: 'memory' };
    }
  }
}
