/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
    },
    screens: {
      'cos': {'max': '1440px'},
      'xl': {'max': '1024px'},
      'sm': {'max': '500px'}
    },
    colors: {
      "primary-color": "var(--primary-color)",
    }
  },
  plugins: [],
};
