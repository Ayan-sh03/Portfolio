import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🚀 Starting database seed...\n');

  // Admin credentials
  const ADMIN_USERNAME = 'ayansh03';
  const ADMIN_PASSWORD = 'AROW#$1234';

  try {
    // Create admin_users table
    console.log('📦 Creating admin_users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    console.log('✅ admin_users table ready\n');

    // Create blog_posts table
    console.log('📦 Creating blog_posts table...');
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
    console.log('✅ blog_posts table ready\n');

    // Create indexes
    console.log('📇 Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published)`;
    console.log('✅ Indexes created\n');

    // Hash password and create admin user
    console.log('🔐 Creating admin user...');
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    
    await sql`
      INSERT INTO admin_users (username, password_hash)
      VALUES (${ADMIN_USERNAME}, ${passwordHash})
      ON CONFLICT (username) 
      DO UPDATE SET password_hash = ${passwordHash}
    `;
    console.log(`✅ Admin user "${ADMIN_USERNAME}" created/updated\n`);

    console.log('═'.repeat(50));
    console.log('🎉 Database seeded successfully!');
    console.log('═'.repeat(50));
    console.log('\n📝 Admin Credentials:');
    console.log(`   Username: ${ADMIN_USERNAME}`);
    console.log(`   Password: ${'*'.repeat(ADMIN_PASSWORD.length)}`);
    console.log('\n🔗 Login at: /admin/login');
    console.log('═'.repeat(50));

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();

