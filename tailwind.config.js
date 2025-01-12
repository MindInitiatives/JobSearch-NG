/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,scss,ts,css}"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        antiquewhite: "var(--antiquewhite)",
        "light-slate": "var(--light-slate)",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)"],
        playfair_display: ["var(--font-playfair_display)"],
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
  },
  plugins: [],
}