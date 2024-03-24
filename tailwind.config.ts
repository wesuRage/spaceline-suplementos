import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "250px",
      md: "537px",
      lg: "1000px",
    },

    extend: {
      keyframes: {
        scaleUp: {
          "0%": {
            transform: "translate(-50%, -50%) scale(0)",
          },
          "90%": {
            transform: "translate(-50%, -50%) scale(1.1)",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
      },
      colors: {
        "main-green": "#4dda41",
        "sec-green": "#053900",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
