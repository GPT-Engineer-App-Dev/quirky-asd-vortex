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
        background: {
          DEFAULT: '#FFFFFF',
          hacker: '#000000',
          '90s': '#FF00FF',
        },
        foreground: {
          DEFAULT: '#000000',
          hacker: '#00FF00',
          '90s': '#FFFF00',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
          hacker: '#0A0A0A',
          'hacker-foreground': '#00FF00',
          '90s': '#00FFFF',
          '90s-foreground': '#FF0000',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
          hacker: '#0A0A0A',
          'hacker-foreground': '#00FF00',
          '90s': '#00FFFF',
          '90s-foreground': '#FF0000',
        },
        primary: {
          DEFAULT: '#FF0000',
          foreground: '#FFFFFF',
          hacker: '#00FF00',
          'hacker-foreground': '#000000',
          '90s': '#FF00FF',
          '90s-foreground': '#FFFF00',
        },
        secondary: {
          DEFAULT: '#0000FF',
          foreground: '#FFFFFF',
          hacker: '#008000',
          'hacker-foreground': '#000000',
          '90s': '#00FFFF',
          '90s-foreground': '#FF0000',
        },
        muted: {
          DEFAULT: '#CCCCCC',
          foreground: '#000000',
          hacker: '#1A1A1A',
          'hacker-foreground': '#00CC00',
          '90s': '#FF69B4',
          '90s-foreground': '#000000',
        },
        accent: {
          DEFAULT: '#FFFF00',
          foreground: '#000000',
          hacker: '#00FFFF',
          'hacker-foreground': '#000000',
          '90s': '#FFA500',
          '90s-foreground': '#000000',
        },
        destructive: {
          DEFAULT: '#FF00FF',
          foreground: '#FFFFFF',
          hacker: '#FF0000',
          'hacker-foreground': '#000000',
          '90s': '#FF4500',
          '90s-foreground': '#FFFFFF',
        },
        border: {
          DEFAULT: '#000000',
          hacker: '#00FF00',
          '90s': '#FF1493',
        },
        input: {
          DEFAULT: '#FFFFFF',
          hacker: '#0A0A0A',
          '90s': '#FAFAD2',
        },
        ring: {
          DEFAULT: '#000000',
          hacker: '#00FF00',
          '90s': '#FF1493',
        },
      },
      borderRadius: {
        lg: '0',
        md: '0',
        sm: '0',
      },
      boxShadow: {
        'neubrutalism': '5px 5px 0 0 #000000',
        'hacker': '0 0 10px #00FF00',
        '90s': '5px 5px 0 0 #FF1493, -5px -5px 0 0 #00FFFF',
      },
      fontFamily: {
        '90s': ['"Comic Sans MS"', 'cursive'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;