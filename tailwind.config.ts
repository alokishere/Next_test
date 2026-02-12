import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "blinking-light": {
          "0%": { opacity: "1" },
          "40%": { opacity: "0" },
          "41%": { opacity: "1" },
          "80%": { opacity: "0" },
          "81%": { opacity: "1" },
          "82%": { opacity: "0" },
          "83%": { opacity: "1" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.2s ease-out infinite",
        "slow-spin": "spin 15s linear infinite",
        "reverse-slow-spin": "spin reverse 15s linear infinite",
        "blinking-light": "blinking-light 10s infinite steps(1)",
      },
    },
    fontFamily: {
      "roboto-regular": ["Roboto", "sans-serif", "400"],
    },
  },
  plugins: [],
};
export default config;
