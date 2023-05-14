/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
    },
  },
  colors,
  content: ["./resources/js/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

