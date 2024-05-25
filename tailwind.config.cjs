/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        pastel: {
          ...require("daisyui/src/theming/themes")["pastel"],
          "rounded-box": "1rem",
        },
      },
      {
        sunset: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "#d1c1d7",
          secondary: "#f6cbd1",
          accent: "#b4e9d6",
          neutral: "#3d4451",
          "base-100": "#121c22",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
