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
        background: '#FFF700', // Bright yellow
        foreground: '#FF00FF', // Hot pink
        card: {
          DEFAULT: '#00FFFF', // Cyan
          foreground: '#FF00FF', // Hot pink
        },
        popover: {
          DEFAULT: '#00FFFF', // Cyan
          foreground: '#FF00FF', // Hot pink
        },
        primary: {
          DEFAULT: '#FF6600', // Neon orange
          foreground: '#FFFFFF', // White
        },
        secondary: {
          DEFAULT: '#00FF00', // Lime green
          foreground: '#000000', // Black
        },
        muted: {
          DEFAULT: '#C0C0C0', // Silver
          foreground: '#000000', // Black
        },
        accent: {
          DEFAULT: '#FF1493', // Deep pink
          foreground: '#FFFFFF', // White
        },
        destructive: {
          DEFAULT: '#FF0000', // Red
          foreground: '#FFFFFF', // White
        },
        border: '#000000', // Black
        input: '#C0C0C0', // Silver
        ring: '#FF00FF', // Hot pink
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      backgroundImage: {
        'retro-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;