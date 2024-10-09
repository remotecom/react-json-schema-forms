/** @type {import('tailwindcss').Config} */

import { colors } from "./src/theme.json";

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
