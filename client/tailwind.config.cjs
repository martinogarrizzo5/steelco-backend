/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#243572",
        primaryDark: "#15255E",
        primaryDarker: "#050E2B",
        input: "#EFEFF8",
        grayBorder: "#C7C7C7",
        tile: "#F7F7FA",
        tileHover: "#EFEFF8",
        tileActive: "#E8E8F3",
        subTitle: "#77787C",
      },
    },
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
