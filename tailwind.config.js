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
          white: "#FFFFFF",
          black: "#000000",
          pink: "#FF526F"
        }
      },
      backgroundImage: {
        'login-background': "url('/images/Fundo_Login.png')", // Corrigido o nome da chave
      } 
    },
  },
  plugins: [],
}
