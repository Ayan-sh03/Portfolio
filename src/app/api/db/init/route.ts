import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

// GET /api/db/init - Initialize the database schema
export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: String(error) },
      { status: 500 }
    );
  }
}

