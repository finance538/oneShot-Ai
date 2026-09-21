import type { Config } from "tailwindcss";

const config: Config = {
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
        oneshot: {
          50: "#FFF5F0",
          100: "#FFE8DE",
          200: "#FFD1BD",
          300: "#FB8656",
          400: "#F06733",
          500: "#E05520",
          600: "#C44315",
          700: "#9B4D2F",
          800: "#752B16",
          900: "#4D1B0D",
          carbon: "#0B0D0F",
          surface: "#121519",
          card: "#181C22",
          border: "#232832",
          subtle: "#333A48",
          muted: "#8892A2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
