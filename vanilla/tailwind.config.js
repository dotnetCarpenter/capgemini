const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./js/**/*.{html,js,mjs}",
  ],
  theme: {
    colors: {
      ...colors,
      'svv-grey': 'hsl(201, 11%, 30%)',
      'svv-yellow': 'rgb(255, 214, 31)',
      'svv-red': 'hsl(355, 85%, 52%)'
    },
    extend: {
      strokeWidth: {
        '1': '0.2px',
        '2': '0.4px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
