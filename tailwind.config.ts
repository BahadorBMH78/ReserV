import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        brandColor: "#005f56",
        grayText: "#4b4b4b",
        dark_gray700: "#333741",
        dark_gray600: "#61646c",
        grayIron50: "#fafafa",
        error600: "#d92d20",
        passiveIcons: "#94969C"
      },
    },
  },
  plugins: [],
};
export default config;
