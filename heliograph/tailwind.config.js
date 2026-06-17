/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070a12",
        bg2: "#0b101d",
        panel: "#111a2e",
        panel2: "#16203a",
        line: "#233150",
        accent: "#ff6b1a",
        accent2: "#ffa726",
        sci: "#4aa8ff",
        eng: "#ff8a3d",
        isro: "#34d399",
        soft: "#4aa8ff",
        hard: "#ff6b1a",
        deriv: "#a78bfa",
        ink: "#e8edf7",
        muted: "#93a0b8",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      keyframes: {
        twinkle: { "0%,100%": { opacity: "0.2" }, "50%": { opacity: "1" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        dash: { to: { strokeDashoffset: "-1000" } },
        pulseRing: { "0%": { transform: "scale(0.8)", opacity: "0.7" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
        dash: "dash 20s linear infinite",
        pulseRing: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
