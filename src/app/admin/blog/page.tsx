'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../../Components/Navbar';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  reading_time: number;
}

interface User {
  id: number;
  username: string;
}

type EditorMode = 'list' | 'create' | 'edit';

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<EditorMode>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    tags: '',
    published: false,
  });

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        
        if (!data.authenticated) {
          router.push('/admin/login');
          return;
        }
        
        setUser(data.user);
        setCheckingAuth(false);
        fetchPosts();
        initDatabase();
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      }
    }
    
    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async function initDatabase() {
    try {
      await fetch('/api/db/init');
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }

  async function fetchPosts() {
    try {
      const res = await fetch('/api/blog?all=true');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      cover_image: '',
      tags: '',
      published: false,
    });
    setEditingPost(null);
  }

  function handleEdit(post: BlogPost) {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || '',
      tags: post.tags.join(', '),
      published: post.published,
    });
    setMode('edit');
  }

  function handleCreate() {
    resetForm();
    setMode('create');
  }

  function handleCancel() {
    resetForm();
    setMode('list');
    setMessage(null);
  }

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      slug: formData.slug || generateSlug(formData.title),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      cover_image: formData.cover_image || null,
      tags: tagsArray,
      published: formData.published,
    };

    try {
      let res: Response;

      if (mode === 'edit' && editingPost) {
        res = await fetch(`/api/blog/${editingPost.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setMessage({
          type: 'success',
          text: mode === 'edit' ? 'Post updated successfully!' : 'Post created successfully!',
        });
        await fetchPosts();
        setTimeout(() => {
          handleCancel();
        }, 1500);
      } else {
        const error = await res.json();
        setMessage({ type: 'error', text: error.error || 'Failed to save post' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p) => p.slug !== slug));
        setMessage({ type: 'success', text: 'Post deleted successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete post' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  }

  async function togglePublished(post: BlogPost) {
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      });

      if (res.ok) {
        setPosts(
          posts.map((p) =>
            p.slug === post.slug ? { ...p, published: !p.published } : p
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle published:', error);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mt-16 px-4 py-12 max-w-5xl mx-auto">
        {/* Auth Loading State */}
        {checkingAuth && (
          <div className="flex items-center justify-center py-20">
            <div className="text-accent animate-pulse font-mono">
              &gt; Verifying credentials...
            </div>
          </div>
        )}

        {!checkingAuth && (
          <>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-accent">&gt;</span> admin/blog
            </h1>
            {user && (
              <p className="text-sm text-mono-text-alt mt-1">
                Logged in as <span className="text-accent">{user.username}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {mode === 'list' && (
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-mono-bg font-medium hover:opacity-90 transition-opacity"
              >
                <PlusIcon className="w-5 h-5" />
                New Post
              </button>
            )}
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center gap-2 px-3 py-2 border-2 border-mono-text/20 hover:border-accent-alt hover:text-accent-alt transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 border-2 ${
                message.type === 'success'
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-accent-alt bg-accent-alt/10 text-accent-alt'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Form */}
        <AnimatePresence mode="wait">
          {(mode === 'create' || mode === 'edit') && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="border-2 border-mono-text/20 p-6 bg-mono-bg-alt/50">
                <h2 className="text-xl font-bold mb-6">
                  {mode === 'create' ? 'Create New Post' : 'Edit Post'}
                </h2>

                <div className="grid gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-mono-bg border-2 border-mono-text/20 focus:border-accent outline-none"
                      placeholder="My Awesome Blog Post"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                      Slug (auto-generated if empty)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 bg-mono-bg border-2 border-mono-text/20 focus:border-accent outline-none"
                      placeholder="my-awesome-blog-post"
                      disabled={mode === 'edit'}
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                      Excerpt *
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      required
                      rows={2}
                      className="w-full px-4 py-3 bg-mono-bg border-2 border-mono-text/20 focus:border-accent outline-none resize-y"
                      placeholder="A brief summary of your post..."
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                      Content (Markdown) *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      rows={15}
                      className="w-full px-4 py-3 bg-mono-bg border-2 border-mono-text/20 focus:border-accent outline-none resize-y font-mono text-sm"
                      placeholder="Write your post in markdown..."
                    />
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.cover_image}
                      onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                      className="w-full px-4 py-3 bg-mono-bg border-2 border-mono-text/20 focus:border-accent outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-3 bg-mono-bg border-2 border-mono-text/20 focus:border-accent outline-none"
                      placeholder="react, nextjs, tutorial"
                    />
                  </div>

                  {/* Published */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, published: !formData.published })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        formData.published ? 'bg-accent' : 'bg-mono-text/20'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-mono-bg rounded-full transition-transform ${
                          formData.published ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                    <span className="text-sm">
                      {formData.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-mono-text/10">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-accent text-mono-bg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <CheckIcon className="w-5 h-5" />
                        {mode === 'create' ? 'Create Post' : 'Save Changes'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2 border-2 border-mono-text/20 hover:border-accent-alt hover:text-accent-alt transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Posts List */}
        {mode === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {loading ? (
              <div className="text-center py-20 text-mono-text-alt">
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 border-2 border-mono-text/10 bg-mono-bg-alt/50">
                <DocumentTextIcon className="w-16 h-16 mx-auto mb-4 text-mono-text-alt" />
                <p className="text-mono-text-alt text-lg mb-4">No posts yet</p>
                <button
                  onClick={handleCreate}
                  className="text-accent hover:underline"
                >
                  Create your first post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start justify-between gap-4 p-4 border-2 border-mono-text/10 bg-mono-bg-alt/50 hover:border-mono-text/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold truncate">{post.title}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs border ${
                            post.published
                              ? 'border-accent text-accent'
                              : 'border-accent-yellow text-accent-yellow'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-mono-text-alt truncate mb-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-mono-text-alt">
                        <span>/{post.slug}</span>
                        <span>{formatDate(post.created_at)}</span>
                        <span>{post.reading_time} min read</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => togglePublished(post)}
                        title={post.published ? 'Unpublish' : 'Publish'}
                        className="p-2 border border-mono-text/20 hover:border-accent hover:text-accent transition-colors"
                      >
                        {post.published ? (
                          <EyeSlashIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        title="Edit"
                        className="p-2 border border-mono-text/20 hover:border-accent hover:text-accent transition-colors"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        title="Delete"
                        className="p-2 border border-mono-text/20 hover:border-accent-alt hover:text-accent-alt transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        </>
        )}
      </div>
    </main>
  );
}

