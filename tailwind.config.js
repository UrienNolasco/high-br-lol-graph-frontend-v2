/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#0D0D0D",
        surfaceLight: "#1A1A1A",
        hextech: "#0AC8B9",
        hextechDim: "rgba(10, 200, 185, 0.15)",
        challenger: "#C8F9C4",
        mist: "#BFCAD2",
        border: "rgba(255,255,255,0.08)",
        textMain: "#FFFFFF",
        textMuted: "#C3C3C3",
        textDark: "#8A8A8A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        glass:
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
