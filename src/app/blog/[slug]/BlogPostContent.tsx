'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeftIcon, TagIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

interface BlogPost {
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

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="mt-16 px-4 py-12 max-w-3xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mono-text-alt hover:text-accent transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-accent/50 text-accent hover:bg-accent hover:text-mono-bg transition-all"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-mono-text-alt">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.reading_time} min read
            </span>
          </div>
        </motion.header>

        {/* Cover Image */}
        {post.cover_image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full border-2 border-mono-text/10"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none blog-content"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-12 mb-4 text-mono-text border-b-2 border-mono-text/20 pb-2">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mt-10 mb-3 text-mono-text">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold mt-8 mb-2 text-mono-text">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-mono-text/90 leading-relaxed">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-mono-text/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-mono-text/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-mono-text-alt">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 bg-mono-bg-alt text-accent text-sm font-mono rounded">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="p-4 bg-mono-bg-alt border-2 border-mono-text/10 overflow-x-auto my-6 text-sm">
                  {children}
                </pre>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ''}
                  className="w-full border-2 border-mono-text/10 my-6"
                />
              ),
              hr: () => (
                <hr className="my-8 border-mono-text/20" />
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border-2 border-mono-text/20">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-mono-text/20 px-4 py-2 bg-mono-bg-alt text-left font-bold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-mono-text/20 px-4 py-2">
                  {children}
                </td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t-2 border-mono-text/10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-mono-text/20 hover:border-accent hover:text-accent transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all posts
          </Link>
        </motion.div>
      </article>
      <Footer />
    </main>
  );
}

