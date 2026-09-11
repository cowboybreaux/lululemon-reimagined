import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "lulu-red": "#e3243b",
        "lulu-dark": "#0e0e0e",
        "lulu-neutral": "#1a1a1a",
        "lulu-muted": "#888888",
        "lulu-border": "rgba(255, 255, 255, 0.15)",
      },
      fontFamily: {
        calibre: [
          "var(--font-calibre)",
          "Calibre",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      letterSpacing: {
        editorial: "0.25em",
        wide: "0.15em",
        tighter: "-0.04em",
      },
      transitionTimingFunction: {
        "editorial-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
