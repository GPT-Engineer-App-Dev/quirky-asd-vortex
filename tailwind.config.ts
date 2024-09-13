import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF', // White
        foreground: '#000000', // Black
        card: {
          DEFAULT: '#FFFFFF', // White
          foreground: '#000000', // Black
        },
        popover: {
          DEFAULT: '#FFFFFF', // White
          foreground: '#000000', // Black
        },
        primary: {
          DEFAULT: '#FF0000', // Red
          foreground: '#FFFFFF', // White
        },
        secondary: {
          DEFAULT: '#0000FF', // Blue
          foreground: '#FFFFFF', // White
        },
        muted: {
          DEFAULT: '#CCCCCC', // Light Gray
          foreground: '#000000', // Black
        },
        accent: {
          DEFAULT: '#FFFF00', // Yellow
          foreground: '#000000', // Black
        },
        destructive: {
          DEFAULT: '#FF00FF', // Magenta
          foreground: '#FFFFFF', // White
        },
        border: '#000000', // Black
        input: '#FFFFFF', // White
        ring: '#000000', // Black
      },
      borderRadius: {
        lg: '0',
        md: '0',
        sm: '0',
      },
      boxShadow: {
        'neubrutalism': '5px 5px 0 0 #000000',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;