'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mt-16 px-4 py-20 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-accent">404</h1>
          <p className="text-xl text-mono-text-alt mb-8">
            Post not found. It might have been deleted or never existed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-mono-bg transition-all"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to blog
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}

