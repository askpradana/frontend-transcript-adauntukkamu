/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      black: '#272727',
      white: '#FFFFF9',
      dark: '#424651',
      warning: '#EF2D56',
      primary: '#FED766',
      secondary: '#668DFE',
      secondary_darker: '#3467FE',
    },
  },
  plugins: [forms],
}
