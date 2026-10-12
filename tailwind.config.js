/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        ivory: '#F6EEDF',
        sand: '#E6D5B5',
        brass: '#9A8459',
        gold: { DEFAULT: '#D4AF37', light: '#F1D77C', readable: '#856611' },
        maroon: '#800000',
        kumkum: { DEFAULT: '#5B0E16', ink: '#2A070B' },
        charcoal: '#2C2C2C',
        'ink-soft': '#5E5146',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Tiro Telugu"', 'Georgia', 'serif'],
        sans: ['Mukta', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: { container: '77.5rem' },
    },
  },
  plugins: [],
};
