import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/db';

// GET /api/blog/tags - Get all unique tags
export async function GET() {
  try {
    const tags = await getAllTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

