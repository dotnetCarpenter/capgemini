const withAnimations = require('animated-tailwindcss')

module.exports = withAnimations ({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        'x-screen': '100vw'
      },
      strokeWidth: {
        '1': '0.2px',
        '2': '0.4px',
      },
      colors: {
        'svv-grey': 'hsl(201, 11%, 30%)',
        'svv-yellow': 'rgb(255, 214, 31)',
        'svv-red': 'hsl(355, 85%, 52%)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})
