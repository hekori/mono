module.exports = {
  purge: ['./apps/hereismyfeedback/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--textPrimary)',
        secondary: 'var(--textSecondary)',
        input: 'var(--textInput)',
        navigation: 'var(--textNavigation)',
        divider: 'var(--divider)',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: 'var(--backgroundPrimary)',
      secondary: 'var(--backgroundSecondary)',
      input: 'var(--backgroundInput)',
      navigation: 'var(--backgroundNavigation)',
    }),
  },
  variants: {
    backgroundColor: ['active', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/forms')],
}

//  textPrimary: string
//   textSecondary: string
//   backgroundPrimary: string
//   backgroundSecondary: string
//   backgroundInput: string
//   textInput: string
//   backgroundNavigation: string
//   textNavigation: string
//   divider: string
