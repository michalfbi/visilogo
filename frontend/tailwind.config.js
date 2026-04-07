/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border-subtle)",
        input: "var(--border-subtle)",
        ring: "var(--brand-primary)",
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--brand-primary)",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--bg-overlay)",
          foreground: "var(--text-primary)",
        },
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "soft-float": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "25%": { transform: "translate3d(10px, -14px, 0) scale(1.02)" },
          "50%": { transform: "translate3d(-8px, -24px, 0) scale(1.05)" },
          "75%": { transform: "translate3d(14px, -8px, 0) scale(1.015)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0%" },
          "100%": { backgroundPosition: "-200% 0%" }
        },
        spotlight: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.94)" },
          "50%": { opacity: "0.75", transform: "scale(1.06)" }
        },
        "marquee-premium": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "border-flow": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "soft-float": "soft-float 12s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        shimmer: "shimmer 3.8s linear infinite",
        spotlight: "spotlight 6s ease-in-out infinite",
        "marquee-premium": "marquee-premium 38s linear infinite",
        "border-flow": "border-flow 2.6s linear infinite"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
