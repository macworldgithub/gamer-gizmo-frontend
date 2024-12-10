import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        blueLight: '#f4f2fe',
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, rgb(99, 69, 237), #dc39fc)",
          "blue-gradientLight":
          "linear-gradient(to top, #f4f2fe, #dc39fc)",
          
      },
    },
  },
  plugins: [],
} satisfies Config;
