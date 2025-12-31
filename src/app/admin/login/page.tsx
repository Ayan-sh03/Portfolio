'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type TerminalLine = {
  id: number;
  text: string;
  type: 'system' | 'input' | 'success' | 'error' | 'warning';
  delay?: number;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phase, setPhase] = useState<'boot' | 'username' | 'password' | 'authenticating' | 'success' | 'error'>('boot');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootSequence: TerminalLine[] = [
    { id: 1, text: '> AYAN_OS v3.14.159 [BUILD 2024.12.31]', type: 'system', delay: 100 },
    { id: 2, text: '> Initializing secure terminal...', type: 'system', delay: 300 },
    { id: 3, text: '> Loading encryption modules... [OK]', type: 'system', delay: 200 },
    { id: 4, text: '> Establishing secure connection... [OK]', type: 'system', delay: 400 },
    { id: 5, text: '> Running security protocols... [OK]', type: 'system', delay: 200 },
    { id: 6, text: '', type: 'system', delay: 100 },
    { id: 7, text: '╔══════════════════════════════════════════╗', type: 'warning', delay: 50 },
    { id: 9, text: '║   Unauthorized access is prohibited.     ║', type: 'warning', delay: 50 },
    { id: 10, text:'║   All sessions are monitored & logged.   ║', type: 'warning', delay: 50 },
    { id: 11, text:'╚══════════════════════════════════════════╝', type: 'warning', delay: 50 },
    { id: 12, text: '', type: 'system', delay: 200 },
    { id: 13, text: '> Authentication required.', type: 'system', delay: 300 },
    { id: 14, text: '', type: 'system', delay: 100 },
  ];

  // Boot sequence animation
  useEffect(() => {
    if (phase !== 'boot') return;

    let totalDelay = 0;
    bootSequence.forEach((line, index) => {
      totalDelay += line.delay || 100;
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        setCurrentLineIndex(index + 1);
      }, totalDelay);
    });

    setTimeout(() => {
      setPhase('username');
      inputRef.current?.focus();
    }, totalDelay + 500);
  }, [phase]);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Focus input when phase changes
  useEffect(() => {
    if (phase === 'username' || phase === 'password') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  const addLine = (text: string, type: TerminalLine['type']) => {
    setTerminalLines(prev => [...prev, { id: Date.now(), text, type }]);
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    addLine(`> USERNAME: ${username}`, 'input');
    addLine('> Username accepted.', 'system');
    addLine('', 'system');
    setPhase('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    addLine(`> PASSWORD: ${'•'.repeat(password.length)}`, 'input');
    addLine('', 'system');
    addLine('> Initiating authentication sequence...', 'system');
    setPhase('authenticating');

    // Simulated authentication steps
    const authSteps = [
      { text: '> Validating credentials...', delay: 400 },
      { text: '> Checking access permissions...', delay: 600 },
      { text: '> Verifying identity hash...', delay: 500 },
    ];

    for (const step of authSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      addLine(step.text, 'system');
    }

    // Actual authentication
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        addLine('', 'system');
        addLine('╔══════════════════════════════════════════╗', 'success');
        addLine('║         ✓ ACCESS GRANTED ✓               ║', 'success');
        addLine('╚══════════════════════════════════════════╝', 'success');
        addLine('', 'system');
        addLine(`> Welcome back, ${username}.`, 'success');
        addLine('> Redirecting to admin panel...', 'system');
        setPhase('success');

        setTimeout(() => {
          router.push('/admin/blog');
        }, 2000);
      } else {
        throw new Error(data.error || 'ACCESS_DENIED');
      }
    } catch (error) {
      addLine('', 'system');
      addLine('╔══════════════════════════════════════════╗', 'error');
      addLine('║         ✗ ACCESS DENIED ✗                ║', 'error');
      addLine('╚══════════════════════════════════════════╝', 'error');
      addLine('', 'system');
      addLine('> Invalid credentials. This incident has been logged.', 'error');
      addLine('> IP address recorded for security review.', 'error');
      addLine('', 'system');
      setPhase('error');

      setTimeout(() => {
        addLine('> Resetting terminal...', 'system');
        setTimeout(() => {
          setUsername('');
          setPassword('');
          setPhase('username');
          addLine('', 'system');
          addLine('> Enter credentials to continue.', 'system');
        }, 1000);
      }, 2000);
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'success': return 'text-accent';
      case 'error': return 'text-accent-alt';
      case 'warning': return 'text-accent-yellow';
      case 'input': return 'text-accent-cyan';
      default: return 'text-mono-text';
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-mono-bg">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,136,0.1)_2px,rgba(0,255,136,0.1)_4px)]" />
      </div>

      {/* CRT flicker effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40 bg-accent/5"
        animate={{ opacity: [0, 0.02, 0, 0.01, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: Math.random() * 5 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Terminal Window */}
        <div className="border-2 border-accent/50 bg-mono-bg shadow-[0_0_50px_rgba(0,255,136,0.1)]">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-accent/30 bg-mono-bg-alt">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-alt" />
              <div className="w-3 h-3 rounded-full bg-accent-yellow" />
              <div className="w-3 h-3 rounded-full bg-accent" />
            </div>
            <span className="text-sm text-mono-text-alt font-mono">
              admin@ayan-portfolio:~
            </span>
            <div className="w-16" />
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="h-[400px] overflow-y-auto p-4 font-mono text-sm"
          >
            <AnimatePresence>
              {terminalLines.map((line, index) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`${getLineColor(line.type)} whitespace-pre-wrap`}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Username Input */}
            {phase === 'username' && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleUsernameSubmit}
                className="flex items-center"
              >
                <span className="text-accent-cyan mr-2">&gt; USERNAME:</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-mono-text font-mono"
                  autoComplete="username"
                  spellCheck={false}
                />
                <span className="animate-pulse text-accent">█</span>
              </motion.form>
            )}

            {/* Password Input */}
            {phase === 'password' && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handlePasswordSubmit}
                className="flex items-center"
              >
                <span className="text-accent-cyan mr-2">&gt; PASSWORD:</span>
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-mono-text font-mono"
                  autoComplete="current-password"
                />
                <span className="animate-pulse text-accent">█</span>
              </motion.form>
            )}

            {/* Authenticating Spinner */}
            {phase === 'authenticating' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center text-accent-cyan"
              >
                <span className="mr-2">&gt;</span>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  ⣾
                </motion.span>
                <span className="ml-2">Processing...</span>
              </motion.div>
            )}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-1 border-t border-accent/30 bg-mono-bg-alt text-xs text-mono-text-alt">
            <span>SECURE CONNECTION: TLS 1.3</span>
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${phase === 'success' ? 'bg-accent' : phase === 'error' ? 'bg-accent-alt' : 'bg-accent-yellow animate-pulse'}`} />
              {phase === 'boot' && 'INITIALIZING'}
              {phase === 'username' && 'AWAITING INPUT'}
              {phase === 'password' && 'AWAITING INPUT'}
              {phase === 'authenticating' && 'AUTHENTICATING'}
              {phase === 'success' && 'AUTHENTICATED'}
              {phase === 'error' && 'ACCESS DENIED'}
            </span>
          </div>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-center text-mono-text-alt text-xs mt-4"
        >
          Press Enter to submit • Escape to cancel
        </motion.p>
      </motion.div>
    </main>
  );
}

