/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
     {'attr-letters': 'attr(data-letters)'}
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ["Inter", "sans-serif"],

      },
    },
  },
  plugins: [],
}

