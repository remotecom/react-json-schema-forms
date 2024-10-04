/** @type {import('tailwindcss').Config} */
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
    colors: {
      blue: "#0061FF",
      white: "#ffffff",
      linkWater: "#F4F7FC",
      darkNavy: "#0061FF",
      darkBlue: "#00234B",
      blank: "#ffffff",
      bayoux: "#525F7F",
      redPink: "#FF4A5A",
    },
    backgroundColor: {
      black: "#000000",
      blue: "#0061FF",
      blank: "#ffffff",
      darkBlue: "#00234B",
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
