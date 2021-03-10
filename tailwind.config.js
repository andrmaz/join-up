const colors = require('tailwindcss/colors')

module.exports = {
  // Tailwind can tree-shake unused styles in production builds
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
      extend: {
          colors: {
              gray: colors.coolGray,
              blue: colors.lightBlue,
              red: colors.rose,
              pink: colors.fuchsia,
            },
            fontFamily: {
              sans: ['Graphik', 'sans-serif'],
              serif: ['Merriweather', 'serif'],
            },
          spacing: {
              '128': '32rem',
              '144': '36rem',
          },
          borderRadius: {
              '4xl': '2rem',
          }
      },
      screens: {
          'tablet': '640px',
          // => @media (min-width: 640px) { ... }
    
          'laptop': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'desktop': '1280px',
          // => @media (min-width: 1280px) { ... }
      },
  },
  variants: {
      extend: {
          borderColor: ['focus-visible'],
          opacity: ['disabled'],
          accessibility: ['hover', 'active'],
      },
  },
}
