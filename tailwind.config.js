module.exports = {
  purge: ['./apps/hereismyfeedback/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        card: 'var(--card)',
        divider: 'var(--divider)',
        document: 'var(--document)',
        onDocument: 'var(--onDocument)',
        error: 'var(--error)',
        input: 'var(--input)',
        main: 'var(--main)',
        navigation: 'var(--navigation)',
        onCard: 'var(--onCard)',
        onError: 'var(--onError)',
        onInput: 'var(--onInput)',
        onMain: 'var(--onMain)',
        onNavigation: 'var(--onNavigation)',
        onSubNavigation: 'var(--onSubNavigation)',
        onSuccess: 'var(--onSuccess)',
        onWarning: 'var(--onWarning)',
        subNavigation: 'var(--subNavigation)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        button: 'var(--button)',
        onButton: 'var(--onButton)',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  variants: {
    backgroundColor: ['active', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/forms')],
}
