/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        cambridge: {
          blue: "#061d40",
          "blue-light": "#3861be",
          green: "#46825a",
          gray: "#2f3133",
          light: "#f8f8f8",
        },
      },
    },
  },
  plugins: [],
};
