/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        adobeClean: ['"Adobe Clean"', "sans-serif"]
      },
      colors: {
        'hover': '#ededed',
        'active': '#e0e0e0',
        'darkGray': '#69665C',
        'lightGray': '#B2AFA1',
        'yellow': '#FFF9DE',
        'blue': '#D1E5F7',
        'green': '#DAF2D6',
        'red': '#FFCECE',
        'errorRed': '#C76969',
        'purple': '#D2CEFF'
      }
    },
  },
  plugins: [],
}