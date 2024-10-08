/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'inter': ['Manrope',],
      },
      colors:{
        'orrange':'#FFE868',
        'grrey':'#6B6B6B',
        'bblue':'#96C1EC',
        'cBlack':'#2A1010'
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out'
      }
    },
  },
  plugins: [],
}