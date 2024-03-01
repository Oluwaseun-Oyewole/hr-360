import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const COLORS = {
  primary: {
    100: "#534FEB",
  },
};

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

      colors: {
        ...colors,
        ...COLORS,
      },
    },
  },
  plugins: [],
};
export default config;
