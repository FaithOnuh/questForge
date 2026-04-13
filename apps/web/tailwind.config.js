/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          blue: '#0E41F5',
          purple: '#7B2FBE',
        },
      },
    },
  },
  plugins: [],
};
