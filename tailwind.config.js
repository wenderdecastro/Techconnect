/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          blue: "#74BDE8",
          red: "#FF526F",
        },
        neutral: {
          background: "#050505",
          gray: "#121212",
          lighter_gray: "#191919",
          lightest_gray: "#1e1e1e",
          light_gray: "#727272"
        },
      },
      backgroundImage: {
        atvGradient: "linear-gradient(149deg, #2272b5 -10.8%, #005195 37.95%, #004582 100%)",
      },
    },
  },
  plugins: [],
};
