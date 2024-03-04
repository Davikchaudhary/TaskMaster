/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#1F2544',
        'grey': '#474F7A',
        'purple': '#81689D',
        'pink': '#FFD0EC', 
      },
    },
  },
  plugins: [],
};
