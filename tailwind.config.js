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
          100: "hsl(var(--background-100))",
        },
        foreground: "hsl(var(--foreground))",
        divider: "hsl(var(--divider))",
        focus: "hsl(var(--focus))",

        content1: "hsl(var(--content1))",
        content2: "hsl(var(--content2))",
        content3: "hsl(var(--content3))",
        content4: "hsl(var(--content4))",

        default: "hsl(var(--default))",
        primary: "hsl(var(--primary))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          600: "hsl(var(--secondary-600))",
        },
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
        "unit-11": "44px",
        "unit-12": "48px",
        "unit-13": "52px",
        "unit-14": "56px",
        "unit-15": "60px",
        "unit-16": "64px",
        "unit-17": "68px",
        "unit-18": "72px",
        "unit-20": "80px",
        "unit-22": "88px",
        "unit-23": "92px",
        "unit-24": "96px",
        "unit-28": "112px",
        "unit-30": "120px",
        "unit-32": "128px",
        "unit-36": "144px",
        "unit-40": "160px",
        "unit-44": "176px",
        "unit-48": "192px",
        "unit-52": "208px",
        "unit-56": "224px",
        "unit-60": "240px",
        "unit-64": "256px",
        "unit-72": "288px",
        "unit-74": "296px",
        "unit-80": "320px",
        "unit-96": "384px",
        "unit-115": "460px",
        "unit-xs": "8px",
        "unit-sm": "12px",
        "unit-md": "16px",
        "unit-lg": "22px",
        "unit-xl": "36px",
        "unit-2xl": "48px",
        "unit-3xl": "80px",
        "unit-4xl": "120px",
        "unit-5xl": "224px",
        "unit-6xl": "288px",
        "unit-7xl": "384px",
        "unit-8xl": "512px",
        "unit-9xl": "640px",
      },
      fontSize: {
        tiny: "0.625rem",
        xs: "0.75rem",
        "2xs": "0.8125rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
      },
      lineHeight: {
        11: "2.5rem",
        12: "3rem",
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
        sm: "0px 0px 1px 0px hsla(0, 0%, 0%, 0.3), 0px 2px 30px 0px hsla(0, 0%, 0%, 0.08), 0px 0px 15px 0px hsla(0, 0%, 0%, 0.03)",
        md: "var(--box-shadow-md)",
        lg: "var(--box-shadow-lg)",
      },
    },
  },
  plugins: [],
};
