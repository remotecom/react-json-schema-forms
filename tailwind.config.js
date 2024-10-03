/** @type {import('tailwindcss').Config} */
export default {
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
      black: "#0061FF",
      blue: "#0061FF",
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
