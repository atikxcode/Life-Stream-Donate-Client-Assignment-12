/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '10px 10px 10px 10px #00000040',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

