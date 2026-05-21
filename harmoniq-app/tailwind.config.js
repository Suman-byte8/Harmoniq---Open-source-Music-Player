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
        primary: '#E11D48',
        secondary: '#F43F5E',
        tertiary: '#00836C',
        background: '#FFF1F2',
        surface: '#FFFFFF',
        textDark: '#111827',
        textLight: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
