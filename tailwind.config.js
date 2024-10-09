/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#388E3C',
        secondary: '#FFEB3B',
        accent: '#C0D95A',
        backgroundLight: '#F9F9F9',
        backgroundDark: '#2C2C2C',
        textLight: '#FFFFFF',
        textDark: '#333333',
        placeholder: '#B0B0B0',
      },
    },
  },
  plugins: [],
};
