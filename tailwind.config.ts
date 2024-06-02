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
        primary: "#12141c",
        secondary: "#3a414f",
        tertiary: "rgba(0, 0, 0, 0.5)",
        teal: "#1fc2d1",
        bluePrimary: "rgba(35, 108, 255, 1)",
        bulutBrand500: "#236cff",
        grayText: "#4b4b4b",
        baseWhite: "#fff",
        warning100: "#FEEFC7",
        warning600: "#dc6803",
        dark_gray700: "#333741",
        dark_gray600: "#61646c",
        toastErrorBg: "#fee4e2",
        toastErrorText: "#0c111d",
        toastErrorBorder: "#f04438"
      },
    },
  },
  plugins: [],
};
export default config;
