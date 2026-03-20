/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        acid: '#D4FF00',
        rust: '#D44000',
        charcoal: '#111111',
        offwhite: '#F0EDE6',
        muted: '#888880',
        steel: '#3A3A3A',
        warn: '#FF6B1A',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        mono: ['var(--font-dmmono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
