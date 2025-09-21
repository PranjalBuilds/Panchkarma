/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ayurveda theme colors
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd18d',
          400: '#5bb85b',
          500: '#3a9d3a',
          600: '#2d7d2d',
          700: '#256325',
          800: '#215021',
          900: '#1e421e',
        },
        earth: {
          50: '#faf9f7',
          100: '#f3f1ed',
          200: '#e6e1d8',
          300: '#d4ccbc',
          400: '#c0b49a',
          500: '#b19d7f',
          600: '#a0886a',
          700: '#857157',
          800: '#6d5c49',
          900: '#594c3e',
        },
        warm: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf2e6',
          300: '#f6e8d1',
          400: '#f0d9b5',
          500: '#e8c896',
          600: '#dbb374',
          700: '#c49a5a',
          800: '#a07e4a',
          900: '#83663e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
