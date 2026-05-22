/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sonic Bloom Palette
        primary: {
          DEFAULT: '#b80035',
          container: '#e11d48',
        },
        'primary-container': '#e11d48',
        surface: {
          DEFAULT: '#fff8f7',
          container: {
            lowest: '#ffffff',
            low: '#fef0f1',
            high: '#f3e5e6',
          },
          tint: '#b80035',
        },
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fef0f1',
        'surface-container-high': '#f3e5e6',
        'surface-tint': '#b80035',
        'on-surface': '#211a1b',
        'outline-variant': 'rgba(225, 29, 72, 0.15)',

        // Retro-compatibility & Aliases
        background: '#fff8f7',
        textDark: '#211a1b',
        textLight: '#ffffff',
        secondary: '#e11d48', // mapped to primary-container for compatibility
        tertiary: '#b80035', // mapped to primary for compatibility
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': [
          '3.5rem',
          {
            lineHeight: '4.25rem',
            letterSpacing: '-0.02em',
            fontWeight: '700',
          },
        ],
        'headline-lg': [
          '2rem',
          {
            lineHeight: '2.5rem',
            fontWeight: '600',
          },
        ],
        'body-sm': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
      },
      borderRadius: {
        'card-lg': '2rem',
        'card-xl': '3rem',
        input: '12px',
        pill: '50px',
      },
      boxShadow: {
        rose: '0 20px 50px -10px rgba(225, 29, 72, 0.08)',
      },
    },
  },
  plugins: [],
};
