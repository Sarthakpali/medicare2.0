module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        medi: "#10847e",
        medi: {
          100: "#10847e",
          200: "#149f98",
          300: "#16b6ae",
          400: "#33e6dd",
          500: "#60ebe4",
          600: "#bbf7f4",
          700: "#d2f9f7",
          800: "#e8fcfb",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
