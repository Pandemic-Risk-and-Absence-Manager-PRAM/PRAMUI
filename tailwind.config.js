/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-27': 'rgba(95, 255, 98, 0.27)',
      },
    },
  },
  plugins: [],
}
