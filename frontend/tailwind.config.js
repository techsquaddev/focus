/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#0455BF",
        secondary: "#F2B33D",
        accent: "#F27F3D",
        text: "#333333",
        border: "#cccccc",
        white: "#ffffff",
        "dark-blue": "#0442BF",
        "soft-text": "#444444",
        "soft-gray": "#f4f4f4",
        "soft-yellow": "#FFFFE0",
        "soft-blue": "#F0FFFF",
        "soft-red": "#fff1f1",
        "red-alert": "#ff4545",
        skeliton: "#d1dff6",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
