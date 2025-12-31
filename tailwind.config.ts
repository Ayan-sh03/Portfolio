/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      lineHeight: {
        'mono': '1.5rem',
      },
      spacing: {
        'line': '1.5rem',
        'ch': '1ch',
        '2ch': '2ch',
        '3ch': '3ch',
      },
      borderWidth: {
        'mono': '2px',
      },
      animation: {
        'theme-pulse': 'themePulse 0.5s ease-out',
        'sun-spin': 'sunSpin 0.5s ease-out',
        'moon-rise': 'moonRise 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        themePulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        sunSpin: {
          '0%': { transform: 'rotate(-90deg) scale(0)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        moonRise: {
          '0%': { transform: 'rotate(90deg) scale(0)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px var(--accent-color), 0 0 10px var(--accent-color)' },
          '100%': { boxShadow: '0 0 10px var(--accent-color), 0 0 20px var(--accent-color), 0 0 30px var(--accent-color)' },
        },
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Monospace theme colors - using CSS variables for dynamic theming
      mono: {
        bg: 'var(--background-color)',
        'bg-alt': 'var(--background-color-alt)',
        text: 'var(--text-color)',
        'text-alt': 'var(--text-color-alt)',
        border: 'var(--text-color)',
      },
      accent: {
        DEFAULT: 'var(--accent-color)',
        alt: 'var(--accent-color-alt)',
        cyan: 'var(--accent-cyan)',
        yellow: 'var(--accent-yellow)',
        purple: 'var(--accent-purple)',
      },
      // Keep some standard colors for flexibility
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b',
      },
      // Legacy colors for compatibility during transition
      primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#00ff88',
        500: '#00ff88',
        600: '#00cc6a',
        700: '#009950',
        800: '#006638',
        900: '#003320',
      },
      secondary: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#ff6b6b',
        500: '#ff6b6b',
        600: '#cc5555',
        700: '#993f3f',
        800: '#662a2a',
        900: '#331515',
      },
      slate: colors.slate,
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      purple: colors.purple,
      pink: colors.pink,
    },
  },
  plugins: [],
};
