import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        left: "-5px 0 5px -2px rgba(0, 0, 0, 0.1)", // Adjust values as needed
        right: "5px 0 5px -2px rgba(0, 0, 0, 0.1)", // Right shadow
        bottom: "0 5px 5px -2px rgba(0, 0, 0, 0.1)", // Bottom shadow
        top: "0 -5px 5px -2px rgba(0, 0, 0, 0.1)", // Top shadow
        colorLeft: "-5px 0 5px -2px rgba(99, 69, 237, 0.5)", // Left shadow
        colorRight: "5px 0 5px -2px rgba(99, 69, 237, 0.15)", // Right shadow
        colorBottom: "0 5px 5px -2px rgba(99, 69, 237, 0.5)", // Bottom shadow
        colorTop: "0 -5px 5px -2px rgba(99, 69, 237, 0.5)", // Top shadow
        combinedDay:
          "5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(0, 0, 0, 0.1)",
        combinedNight:
          "5px 5px 10px rgba(99, 69, 237, 0.5), -5px -5px 10px rgba(99, 69, 237, 0.5)",
      },

      colorShadow: {},

      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-in-out forwards",
        "slide-out": "slideOut 0.5s ease-in-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navTextLight: "#7d7d7d",
        navTextDark: "#ffffff",
        secondaryColorLight: "#6345ed",
        secondaryColorDark: "#dc39fc",
        blueLight: "#f4f2fe",
        customBg: "rgba(13, 13, 18, 1)",

        customPurple: "rgba(99, 69, 237, 0.12)",
        customPurpleBorder: "rgba(99, 69, 237, 1)",
        linksColor: "#DC39FC",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, rgb(99, 69, 237), #dc39fc)",
        "blue-gradientLight": "linear-gradient(to top, #f4f2fe, #dc39fc)",
      },
    },
  },
  plugins: [],
} satisfies Config;
