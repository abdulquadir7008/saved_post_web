import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#14110F",
          900: "#1C1815",
          800: "#2A2420",
        },
        parchment: {
          50: "#FBF8F3",
          100: "#F4EEE3",
          200: "#E9DFCC",
        },
        moss: {
          500: "#5B7358",
          600: "#495E47",
          700: "#3A4B39",
        },
        clay: {
          400: "#C9865B",
          500: "#B96F42",
          600: "#9A5A34",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
