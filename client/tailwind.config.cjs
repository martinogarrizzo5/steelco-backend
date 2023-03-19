/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#243572",
        primaryDark: "#1E2A5F",
        primaryDarker: "#1A234F",
        input: "#EFEFF8",
        grayBorder: "#C7C7C7",
        tileHover: "#F7F7FA",
      },
    },
  },
  plugins: [],
};
