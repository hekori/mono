module.exports = {
  purge: ['./apps/hereismyfeedback/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        document: 'var(--document)',
        document2: 'var(--document2)',
        onDocument: 'var(--onDocument)',
        onDocument2: 'var(--onDocument2)',
        onDocument3: 'var(--onDocument3)',
        onDocumentHighlight: 'var(--onDocumentHighlight)',
        button: 'var(--button)',
        buttonHover: 'var(--buttonHover)',
        button2: 'var(--button2)',
        button2Hover: 'var(--button2Hover)',
        onButton: 'var(--onButton)',
        card: 'var(--card)',
        divider: 'var(--divider)',
        error: 'var(--error)',
        input: 'var(--input)',
        inputBorder: 'var(--inputBorder)',
        onInput: 'var(--onInput)',
        main: 'var(--main)',
        navigation: 'var(--navigation)',
        onCard: 'var(--onCard)',
        onError: 'var(--onError)',
        onMain: 'var(--onMain)',
        onNavigation: 'var(--onNavigation)',
        onSubNavigation: 'var(--onSubNavigation)',
        onSuccess: 'var(--onSuccess)',
        onWarning: 'var(--onWarning)',
        subNavigation: 'var(--subNavigation)',
        success: 'var(--success)',
        warning: 'var(--warning)',

        teaser: 'var(--teaser)',
        onTeaser: 'var(--onTeaser)',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  variants: {
    backgroundColor: ['active', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/forms')],
}
