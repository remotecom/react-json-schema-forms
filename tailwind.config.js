/** @type {import('tailwindcss').Config} */

const colors = {
  black: "#000000",
  blank: "#ffffff",
  primary: "#191c1f",
  secondary: "#4f55f1",
  error: "#FF4A5A",
};

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors,
    backgroundColor: colors,
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
