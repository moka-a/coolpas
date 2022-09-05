const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  purge: ['./pages/**/*.vue', './components/**/*.vue'],
  plugins: [require('@tailwindcss/aspect-ratio')],
  theme: {
    colors: {
      ...colors,
      black: '#0E141A',
    },
    extend: {
      width: {
        inherit: 'inherit',
      },
      spacing: {
        84: '21rem',
        88: '22rem',
      },
      padding: {
        full: '100%',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
}
