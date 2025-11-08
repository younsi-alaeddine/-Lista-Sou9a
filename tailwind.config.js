/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f73ff',
          dark: '#1650b5',
        },
        tunisian: {
          sand: '#f3d9b1',
          olive: '#718355',
          sea: '#006d77',
        },
      },
      fontFamily: {
        heading: ['"Tajawal"', 'sans-serif'],
        body: ['"Cairo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

