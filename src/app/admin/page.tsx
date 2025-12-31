'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndRedirect() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        
        if (data.authenticated) {
          router.replace('/admin/blog');
        } else {
          router.replace('/admin/login');
        }
      } catch {
        router.replace('/admin/login');
      }
    }
    
    checkAuthAndRedirect();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-mono-bg">
      <div className="text-accent animate-pulse font-mono">
        &gt; Initializing...
      </div>
    </main>
  );
}

