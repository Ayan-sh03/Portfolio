"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="w-10 h-10 border-2 border-mono-text bg-mono-bg-alt" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 border-2 border-mono-text bg-mono-bg-alt cursor-pointer overflow-hidden hover:border-accent transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Sun Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent-yellow"
            >
              {/* Sun center */}
              <motion.circle
                cx="12"
                cy="12"
                r="4"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${i * 45} 12 12)`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.03, duration: 0.2 }}
                />
              ))}
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Moon Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent-purple"
            >
              <motion.path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Stars */}
              <motion.circle
                cx="19"
                cy="5"
                r="1"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              />
              <motion.circle
                cx="21"
                cy="9"
                r="0.5"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative corner brackets */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};

export default ThemeToggle;
