module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      iconColor: {
        lightBlue: '#91dde6',
        lightGreen: '#79bfa1',
        lightGreenOP30:'#d7ece3',
        lightGreenOP20:'#e4f2ec',
        black: '#000',
        white: '#fff',
      },
      gray:{
        200:'#E2E8F0',
        100:'#F1F5F9',
        300:'#CBD5E1'
      },
      red:{
        red:"red"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
