module.exports = {
  purge: {
    enabled: false, // set to true to remove all unused classes from App.css
    content: ['./apps/**/*.{js,ts,jsx,tsx}', './libs/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        document: 'var(--document)',
        document2: 'var(--document2)',
        document3: 'var(--document3)',
        onDocument: 'var(--onDocument)',
        onDocument2: 'var(--onDocument2)',
        onDocument3: 'var(--onDocument3)',
        onDocumentHighlight: 'var(--onDocumentHighlight)',
        button: 'var(--button)',
        buttonHover: 'var(--buttonHover)',
        button2: 'var(--button2)',
        button2Hover: 'var(--button2Hover)',
        onButton: 'var(--onButton)',
        touchableHighlight: 'var(--touchableHighlight)',
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
