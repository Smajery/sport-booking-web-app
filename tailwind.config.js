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

        primary: "hsl(var(--primary))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
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
        "2xl": "1920px",
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
      fontSize: {
        "10xl": "10rem",
        "11xl": "12.5rem",
      },
      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "14px",
        xl: "16px",
        full: "50%",
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
      boxShadow: {
        sm: "var(--box-shadow-sm)",
        md: "var(--box-shadow-md)",
        lg: "var(--box-shadow-lg)",
      },
    },
  },
  plugins: [],
};
