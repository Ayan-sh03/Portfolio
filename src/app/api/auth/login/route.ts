import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, createSession, setSessionCookie } from '@/lib/auth';
import { getAdminByUsername } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'MISSING_CREDENTIALS', message: 'Username and password required' },
        { status: 400 }
      );
    }

    // Authenticate
    const result = await authenticateUser(username, password);

    if (!result.success) {
      // Add a small delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      return NextResponse.json(
        { error: 'ACCESS_DENIED', message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get user for session
    const user = await getAdminByUsername(username);
    if (!user) {
      return NextResponse.json(
        { error: 'USER_NOT_FOUND', message: 'User not found' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createSession(user.id, user.username);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: 'ACCESS_GRANTED',
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'SYSTEM_ERROR', message: 'Authentication system failure' },
      { status: 500 }
    );
  }
}

