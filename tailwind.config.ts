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
        left: "-5px 0 5px -2px rgba(0, 0, 0, 0.1)",
        right: "5px 0 5px -2px rgba(0, 0, 0, 0.1)",
        bottom: "0 5px 5px -2px rgba(0, 0, 0, 0.1)",
        top: "0 -5px 5px -2px rgba(0, 0, 0, 0.1)",
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
        btnGray: "#e8e3fc",
        customPurple: "rgba(99, 69, 237, 0.12)",
        customPurpleBorder: "rgba(99, 69, 237, 1)",
        linksColor: "#DC39FC",
        pinkishBorder: "#DC39FC",
        bluishBorder: "#E3DDFC",
        secondaryBlack: "#1e1e2f",
        footerBlack: "#0D0D12",
        searchFilterBorder: "rgba(99, 69, 237, 0.1)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, rgb(99, 69, 237), #dc39fc)",

        "disabled-button": "linear-gradient(to right, #D3D3D3, #D3D3D3)",
        "blue-gradientLight": "linear-gradient(to top, #f4f2fe, #dc39fc)",
        "dark-custom-gradient":
          "linear-gradient(to right, rgb(0, 0, 0), #000000)",

        "curve-light":
          "linear-gradient(to right, rgba(99, 69, 237, 0.9), rgba(220, 57, 252, 0.9))",
        "curve-dark":
          "linear-gradient(to right, rgba(0, 0, 0,0.7), rgba(0, 0, 0, 0.7))",
      },
    },
  },
  plugins: [],
} satisfies Config;
