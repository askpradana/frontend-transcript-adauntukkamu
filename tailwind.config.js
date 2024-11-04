/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      black: '#16262e',
      border: '#2b424e',
      white: '#f1f9fa',
      realwhite: '#ffffff',
      dark: '#304e5a',
      warning: '#EF2D56',
      primary: '#5aa5b6',
      primarydarker: '#377083',
      primarykindadark: '#325d6c',
      khaki: {
        50: '#f8f7f4',
        100: '#eeede6',
        200: '#dbd8cd',
        300: '#beb7a4',
        400: '#aca18b',
        500: '#9b8d74',
        600: '#8e7d68',
        700: '#776757',
        800: '#62554a',
        900: '#50473e',
        950: '#2a2420',
      },
    },
  },
  plugins: [forms],
}
