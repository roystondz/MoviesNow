/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#030014',  // Deep dark color
        secondary: '#151312', // Dark secondary shade
        light: {
          100: '#D6C6FF',  // Light lavender
          200: '#A8B5DB',  // Soft blue-gray
          300: '#9CA4AB',  // Muted gray
        },
        dark: {
          100: '#221f3d',  // Dark purple
          200: '#0f0d23',  // Very dark purple
        },
        accent: '#AB8BFF', // Accent lavender shade
      },
    },
  },
  plugins: [],
}
