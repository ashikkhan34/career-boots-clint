/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- এই লাইনটা খুবই গুরুত্বপূর্ণ
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
