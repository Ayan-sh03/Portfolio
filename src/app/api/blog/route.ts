import { NextRequest, NextResponse } from 'next/server';
import { 
  getPublishedPosts, 
  getAllPosts, 
  searchPosts, 
  getPostsByTag,
  createPost,
  calculateReadingTime
} from '@/lib/db';

// GET /api/blog - Get all published posts or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const tag = searchParams.get('tag');
    const includeUnpublished = searchParams.get('all') === 'true';

    let posts;
    
    if (query) {
      posts = await searchPosts(query);
    } else if (tag) {
      posts = await getPostsByTag(tag);
    } else if (includeUnpublished) {
      posts = await getAllPosts();
    } else {
      posts = await getPublishedPosts();
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { slug, title, excerpt, content, cover_image, tags, published } = body;

    if (!slug || !title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title, excerpt, content' },
        { status: 400 }
      );
    }

    // Calculate reading time
    const reading_time = calculateReadingTime(content);

    const post = await createPost({
      slug,
      title,
      excerpt,
      content,
      cover_image,
      tags: tags || [],
      published: published ?? false,
      reading_time,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', details: String(error) },
      { status: 500 }
    );
  }
}

