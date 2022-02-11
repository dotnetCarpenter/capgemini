module.exports = {
  content: [
    "./index.html",
    "./js/**/*.{html,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
