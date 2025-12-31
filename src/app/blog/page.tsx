'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, TagIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  created_at: string;
  reading_time: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, tagsRes] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/blog/tags')
        ]);
        
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setPosts(postsData);
          setFilteredPosts(postsData);
        }
        
        if (tagsRes.ok) {
          const tagsData = await tagsRes.json();
          setTags(tagsData);
        }
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedTag(null);

    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }

    try {
      const res = await fetch(`/api/blog?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setFilteredPosts(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, [posts]);

  const handleTagFilter = useCallback(async (tag: string | null) => {
    setSelectedTag(tag);
    setSearchQuery('');

    if (!tag) {
      setFilteredPosts(posts);
      return;
    }

    try {
      const res = await fetch(`/api/blog?tag=${encodeURIComponent(tag)}`);
      if (res.ok) {
        const data = await res.json();
        setFilteredPosts(data);
      }
    } catch (error) {
      console.error('Tag filter failed:', error);
    }
  }, [posts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mt-16 px-4 py-12 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-accent">&gt;</span> blog
            <span className="cursor-blink"></span>
          </h1>
          <p className="text-mono-text-alt">
            Thoughts on code, tech, and building things that matter.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mono-text-alt" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-mono-bg-alt border-2 border-mono-text/20 focus:border-accent outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Tags */}
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            <button
              onClick={() => handleTagFilter(null)}
              className={`px-3 py-1 text-sm border-2 transition-all ${
                !selectedTag
                  ? 'border-accent bg-accent text-mono-bg'
                  : 'border-mono-text/20 hover:border-accent'
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-3 py-1 text-sm border-2 transition-all flex items-center gap-1 ${
                  selectedTag === tag
                    ? 'border-accent bg-accent text-mono-bg'
                    : 'border-mono-text/20 hover:border-accent'
                }`}
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-accent animate-pulse">Loading posts...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-mono-text-alt text-lg mb-4">No posts found.</p>
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="text-accent hover:underline"
              >
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="p-6 border-2 border-mono-text/10 hover:border-accent transition-all bg-mono-bg-alt/50 hover:bg-mono-bg-alt">
                      {/* Post Title */}
                      <h2 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-mono-text-alt mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-mono-text-alt">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(post.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {post.reading_time} min read
                        </span>
                        {post.tags.length > 0 && (
                          <div className="flex items-center gap-2">
                            <TagIcon className="w-4 h-4" />
                            <div className="flex gap-1">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs border border-mono-text/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <Footer />
    </main>
  );
}

