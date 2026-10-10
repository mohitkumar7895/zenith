import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initializeDatabase } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { action, name, email, password } = body;

    const db = getDbPool();

    // 1. REGISTER NEW ADMIN
    if (action === 'register') {
      if (!name || !email || !password) {
        return NextResponse.json(
          { success: false, message: 'Please provide full name, email, and password.' },
          { status: 400 }
        );
      }

      // Check if email already registered
      const [existing] = await db.query<RowDataPacket[]>(
        'SELECT id FROM admins WHERE email = ?',
        [email.trim().toLowerCase()]
      );

      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json(
          { success: false, message: 'An admin with this email is already registered. Please sign in.' },
          { status: 409 }
        );
      }

      const [result] = await db.execute<ResultSetHeader>(
        'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name.trim(), email.trim().toLowerCase(), password, 'admin']
      );

      return NextResponse.json({
        success: true,
        message: 'Admin account created successfully! You can now log in.',
        admin: {
          id: result.insertId,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          role: 'admin',
        },
      });
    }

    // 2. LOGIN ADMIN
    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: 'Email and password are required.' },
          { status: 400 }
        );
      }

      const [rows] = await db.query<RowDataPacket[]>(
        'SELECT id, name, email, password, role FROM admins WHERE email = ?',
        [email.trim().toLowerCase()]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Invalid credentials. No admin found with this email.' },
          { status: 401 }
        );
      }

      const adminRecord = rows[0];

      // Match password (plaintext or hashed; fallback demo allows direct match)
      if (adminRecord.password !== password) {
        return NextResponse.json(
          { success: false, message: 'Incorrect password. Please verify and try again.' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Welcome back, ' + adminRecord.name,
        admin: {
          id: adminRecord.id,
          name: adminRecord.name,
          email: adminRecord.email,
          role: adminRecord.role,
        },
      });
    }

    // 3. CHANGE PASSWORD
    if (action === 'change_password') {
      const { adminId, currentPassword, newPassword } = body;
      if (!adminId || !currentPassword || !newPassword) {
        return NextResponse.json(
          { success: false, message: 'Admin ID, current password, and new password are required.' },
          { status: 400 }
        );
      }

      if (newPassword.length < 5) {
        return NextResponse.json(
          { success: false, message: 'New password must be at least 5 characters long.' },
          { status: 400 }
        );
      }

      const [rows] = await db.query<RowDataPacket[]>(
        'SELECT id, password FROM admins WHERE id = ?',
        [adminId]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Admin account not found.' },
          { status: 404 }
        );
      }

      const admin = rows[0];
      if (admin.password !== currentPassword) {
        return NextResponse.json(
          { success: false, message: 'Current password is incorrect. Please verify and try again.' },
          { status: 400 }
        );
      }

      await db.execute('UPDATE admins SET password = ? WHERE id = ?', [newPassword, adminId]);

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully! Keep your new password secure.',
      });
    }

    // 4. UPDATE PROFILE
    if (action === 'update_profile') {
      const { adminId, name: newName, email: newEmail } = body;
      if (!adminId || !newName || !newEmail) {
        return NextResponse.json(
          { success: false, message: 'Admin ID, name, and email are required.' },
          { status: 400 }
        );
      }

      // Check if email taken by someone else
      const [existing] = await db.query<RowDataPacket[]>(
        'SELECT id FROM admins WHERE email = ? AND id != ?',
        [newEmail.trim().toLowerCase(), adminId]
      );

      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json(
          { success: false, message: 'This email is already in use by another admin.' },
          { status: 409 }
        );
      }

      await db.execute(
        'UPDATE admins SET name = ?, email = ? WHERE id = ?',
        [newName.trim(), newEmail.trim().toLowerCase(), adminId]
      );

      return NextResponse.json({
        success: true,
        message: 'Admin profile updated successfully!',
        admin: {
          id: adminId,
          name: newName.trim(),
          email: newEmail.trim().toLowerCase(),
        },
      });
    }

    // 5. CREATE NEW ADMIN WITH AUTHORITY / ROLE
    if (action === 'create_admin') {
      const { name: newAdminName, email: newAdminEmail, password: newAdminPassword, role = 'admin' } = body;
      if (!newAdminName || !newAdminEmail || !newAdminPassword) {
        return NextResponse.json(
          { success: false, message: 'Please provide full name, email, and password for new admin.' },
          { status: 400 }
        );
      }

      const [existing] = await db.query<RowDataPacket[]>(
        'SELECT id FROM admins WHERE email = ?',
        [newAdminEmail.trim().toLowerCase()]
      );

      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json(
          { success: false, message: 'An admin with this email is already registered.' },
          { status: 409 }
        );
      }

      const [result] = await db.execute<ResultSetHeader>(
        'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
        [newAdminName.trim(), newAdminEmail.trim().toLowerCase(), newAdminPassword, role]
      );

      return NextResponse.json({
        success: true,
        message: `Admin "${newAdminName}" created successfully with ${role} authority!`,
        admin: {
          id: result.insertId,
          name: newAdminName.trim(),
          email: newAdminEmail.trim().toLowerCase(),
          role,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid auth action specified.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json(
      { success: false, message: 'Database error processing admin authentication.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initializeDatabase();
    const db = getDbPool();
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, name, email, role, createdAt FROM admins ORDER BY id ASC'
    );
    return NextResponse.json({
      success: true,
      admins: rows,
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving admins.' },
      { status: 500 }
    );
  }
}
