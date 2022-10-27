const withAnimations = require('animated-tailwindcss')

module.exports = withAnimations ({
  content: [
    './index.html',
    './js/**/*.{html,js,mjs}',
  ],
  theme: {
    fontFamily: {
      sans: '"LFT Etica", "Lucida Sans Unicode", "Lucida Grande", sans-serif',
    },
    extend: {
      maxWidth: {
        'x-screen': '100vw'
      },
      colors: {
        'svv-grey': 'hsl(201, 11%, 30%)',
        'svv-yellow': 'rgb(255, 214, 31)',
        'svv-red': 'hsl(355, 85%, 52%)'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})
