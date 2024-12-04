import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navTextLight: "#7d7d7d",
        navTextDark: "#ffffff",
        secondaryColorLight: "#6345ed",
        secondaryColorDark: "#dc39fc",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, rgb(99, 69, 237), #dc39fc)",
      },
    },
  },
  plugins: [],
} satisfies Config;
