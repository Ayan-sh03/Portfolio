import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ success: true, message: 'SESSION_TERMINATED' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'LOGOUT_FAILED', message: 'Failed to terminate session' },
      { status: 500 }
    );
  }
}

