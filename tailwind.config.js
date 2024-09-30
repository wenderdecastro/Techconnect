/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#74BDE8",
          purple: "#FF526F",
        },
        neutral: {
          background: "#050505",
          gray: "#121212",
          lighter_gray: "#1e1e1e",
          lightest_gray: "#191919",
        },
      },
      backgroundImage: {
        atvGradient: "linear-gradient(149deg, #2272b5 -10.8%, #005195 37.95%, #004582 100%)",
      },
    },
  },
  plugins: [],
};
