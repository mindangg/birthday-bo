/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#FFB7C5',
        petal: '#FFD6E0',
        cream: '#FFF8F0',
        rose:  '#E8748A',
        gold:  '#C9A961',
        ink:   '#3D2C2C',
      },
      fontFamily: {
        hand:  ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':       { transform: 'translateX(-8px)' },
          '40%':       { transform: 'translateX(8px)' },
          '60%':       { transform: 'translateX(-6px)' },
          '80%':       { transform: 'translateX(6px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
