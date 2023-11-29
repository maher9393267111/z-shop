/** @type {import('tailwindcss').Config} */
const { screens } = require("tailwindcss/defaultTheme")
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./functions/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "300px",
      xxl: "1536px",
      ...screens,
    },
    extend: {

      fontFamily: {
        
        
      },


    },
  },
  plugins: [],
}