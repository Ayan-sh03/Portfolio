import { sql } from '@vercel/postgres';

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN USER
// ═══════════════════════════════════════════════════════════════════════════
export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: Date;
}

// ═══════════════════════════════════════════════════════════════════════════
// BLOG POSTS
// ═══════════════════════════════════════════════════════════════════════════
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  created_at: Date;
  updated_at: Date;
  reading_time: number;
}

export interface CreateBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  tags?: string[];
  published?: boolean;
  reading_time?: number;
}

// Initialize the database schema
export async function initializeDatabase() {
  // Admin users table
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Blog posts table
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(500) NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      cover_image TEXT,
      tags TEXT[] DEFAULT '{}',
      published BOOLEAN DEFAULT false,
      reading_time INTEGER DEFAULT 1,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  
  // Create index for faster slug lookups
  await sql`
    CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)
  `;
  
  // Create index for published posts
  await sql`
    CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published)
  `;
  
  return { success: true };
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN USER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════
export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const { rows } = await sql`
    SELECT * FROM admin_users WHERE username = ${username} LIMIT 1
  `;
  return rows[0] as AdminUser | null;
}

export async function createAdminUser(username: string, passwordHash: string): Promise<AdminUser> {
  const { rows } = await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES (${username}, ${passwordHash})
    ON CONFLICT (username) DO UPDATE SET password_hash = ${passwordHash}
    RETURNING *
  `;
  return rows[0] as AdminUser;
}

// Get all published blog posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    WHERE published = true 
    ORDER BY created_at DESC
  `;
  return rows as BlogPost[];
}

// Get all blog posts (including drafts, for admin)
export async function getAllPosts(): Promise<BlogPost[]> {
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    ORDER BY created_at DESC
  `;
  return rows as BlogPost[];
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] as BlogPost | null;
}

// Search blog posts by title or content
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const searchTerm = `%${query}%`;
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    WHERE published = true 
    AND (
      LOWER(title) LIKE LOWER(${searchTerm})
      OR LOWER(content) LIKE LOWER(${searchTerm})
      OR LOWER(excerpt) LIKE LOWER(${searchTerm})
      OR ${query} = ANY(tags)
    )
    ORDER BY created_at DESC
  `;
  return rows as BlogPost[];
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    WHERE published = true 
    AND ${tag} = ANY(tags)
    ORDER BY created_at DESC
  `;
  return rows as BlogPost[];
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const { rows } = await sql`
    SELECT DISTINCT unnest(tags) as tag 
    FROM blog_posts 
    WHERE published = true
    ORDER BY tag
  `;
  return rows.map(row => row.tag);
}

// Create a new blog post
export async function createPost(post: CreateBlogPost): Promise<BlogPost> {
  const { rows } = await sql`
    INSERT INTO blog_posts (slug, title, excerpt, content, cover_image, tags, published, reading_time)
    VALUES (
      ${post.slug},
      ${post.title},
      ${post.excerpt},
      ${post.content},
      ${post.cover_image || null},
      ${post.tags || []},
      ${post.published ?? false},
      ${post.reading_time || 1}
    )
    RETURNING *
  `;
  return rows[0] as BlogPost;
}

// Update a blog post
export async function updatePost(slug: string, post: Partial<CreateBlogPost>): Promise<BlogPost | null> {
  const existingPost = await getPostBySlug(slug);
  if (!existingPost) return null;

  const { rows } = await sql`
    UPDATE blog_posts SET
      title = COALESCE(${post.title ?? null}, title),
      excerpt = COALESCE(${post.excerpt ?? null}, excerpt),
      content = COALESCE(${post.content ?? null}, content),
      cover_image = COALESCE(${post.cover_image ?? null}, cover_image),
      tags = COALESCE(${post.tags ?? null}, tags),
      published = COALESCE(${post.published ?? null}, published),
      reading_time = COALESCE(${post.reading_time ?? null}, reading_time),
      updated_at = NOW()
    WHERE slug = ${slug}
    RETURNING *
  `;
  return rows[0] as BlogPost;
}

// Delete a blog post
export async function deletePost(slug: string): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM blog_posts WHERE slug = ${slug}
  `;
  return (rowCount ?? 0) > 0;
}

// Calculate reading time from content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

