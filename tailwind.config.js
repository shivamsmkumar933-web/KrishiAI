/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          50: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#fdfbf7',
          100: '#f7f2e8',
          200: '#efe3cf',
          300: '#e2cca7',
          400: '#d2af7b',
          500: '#c29457',
          600: '#b17b44',
          700: '#915d38',
          800: '#764a32',
          900: '#613e2c',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Hind', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
