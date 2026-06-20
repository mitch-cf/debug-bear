import type { Config } from "tailwindcss";
import relumePreset from "@relume_io/relume-tailwind";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [relumePreset],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "chunky-sm": "0 4px 0 0 #0A111B",
      },
      colors: {
        fur: {
          50: "#FDFBF8",
          100: "#F8F2EB",
          200: "#EEE0C8",
          300: "#DED0B8",
          400: "#C8B89F",
          500: "#A99679",
          600: "#88775F",
          700: "#665946",
          800: "#443B2F",
          900: "#2C261E",
          950: "#17130E",
        },
        night: {
          50: "#E8F1FA",
          100: "#B3CFE8",
          200: "#6B95C3",
          300: "#3A68A3",
          400: "#25508A",
          500: "#1D406D",
          600: "#123564",
          700: "#0C2959",
          800: "#0A214A",
          900: "#021645",
          950: "#0A111B",
        },
        signal: {
          50: "#EDF6FD",
          100: "#D7EBFA",
          200: "#AFD7F4",
          300: "#85BEEB",
          400: "#5EA1DD",
          500: "#3F83C3",
          600: "#2E6EA6",
          700: "#255886",
          800: "#1F486D",
          900: "#1B3D5C",
          950: "#10263A",
        },
        zap: {
          50: "#FCFDE8",
          100: "#F8FACB",
          200: "#F1F7A7",
          300: "#E6F26F",
          400: "#D7E85A",
          500: "#BEDB39",
          600: "#9DB72B",
          700: "#788C24",
          800: "#5F6F22",
          900: "#4F5E21",
          950: "#29340D",
        },
        bear: {
          50: "#F8F1EB",
          100: "#EEDCCB",
          200: "#DFBD9D",
          300: "#C79F7C",
          400: "#B3845E",
          500: "#9A6B48",
          600: "#7A563C",
          700: "#5B4032",
          800: "#3F2C23",
          900: "#271B15",
          950: "#160E0A",
        },
      },
    },
  },
};

export default config;
