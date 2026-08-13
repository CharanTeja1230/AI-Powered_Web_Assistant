/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lumo: {
          purple: '#a855f7',
          blue: '#3b82f6',
          cyan: '#00f3ff',
          magenta: '#ff007f',
          darkBg: '#0f0c29',
        }
      }
    },
  },
  plugins: [],
}
