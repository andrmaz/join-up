const colors = require('tailwindcss/colors')

module.exports = {
  // Tailwind can tree-shake unused styles in production builds
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        auto: 'auto',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      height: {
        '1/10': '10%',
        '3/20': '15%',
        '3/10': '30%',
        '14/20': '70%',
        '18/20': '90%',
        '8v': '8vh',
        '70v': '70vh',
        '92v': '92vh',
      },
      width: {
        200: '200%',
      },
      inset: {
        18: '4.5rem',
      },
      minHeight: {
        '1/2': '50%',
      },
      maxHeight: {
        '3/4': '75%',
      },
      minWidth: {
        '1/4': '25%',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
      accessibility: ['hover', 'active'],
      backgroundColor: ['active'],
    },
  },
  plugins: [require('daisyui')],
}
