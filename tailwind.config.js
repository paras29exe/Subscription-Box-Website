/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "xxs" : "10px",
      },
      screens: {
        xs: '320px',
        sm: "639px",
        // md: '769px',  // Default 768px → Now 769px
        md2: '820px',
        '2xl': '1537px' // Default 1536px → Now 1537px
      },
      
    },
  },
  
  plugins: [require('tailwind-scrollbar-hide')],

}