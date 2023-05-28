/** @type {import('tailwindcss').Config} */
export default {
  content: [`./src/**/*.svelte`, "./index.html"],
  theme: {
    extend: {
      boxShadow: {
        key: '0 0px 20px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'xl': '2rem'
      }
    },
  },
  plugins: [],
}

