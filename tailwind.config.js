/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
        },

        foreground: "hsl(var( --foreground))",
        "muted-foreground": "hsl(var( --muted-foreground))",
        "muted-foreground-100": "hsl(var( --muted-foreground-100))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        border: "hsl(var(--border))",
        destructive: "hsl(var(--destructive))",

        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },

      screens: {
        xs: "376px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      spacing: {
        "unit-1": "4px",
        "unit-2": "8px",
        "unit-3": "12px",
        "unit-4": "16px",
        "unit-5": "20px",
        "unit-6": "24px",
        "unit-7": "28px",
        "unit-8": "32px",
        "unit-9": "36px",
        "unit-10": "40px",
      },
      animation: {
        opacity: "animationOpacity .5s ease-in-out",
        scaleIn: "scaleIn .35s ease-in-out",
      },
      keyframes: {
        animationOpacity: {
          from: { opacity: 0.2 },
          to: { opacity: 1 },
        },
        scaleIn: {
          "0%": {
            opacity: 0,
            transform: "scale(0.9)",
          },
          "50%": {
            opacity: 0.3,
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      textOverflow: {
        ellipsis: "ellipsis",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        "bottom-sm": "0px 4px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
