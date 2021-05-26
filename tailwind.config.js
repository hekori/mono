module.exports = {
  purge: ['./apps/hereismyfeedback/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'primary-background': 'var(--background-primary)',
        'secondary-background': 'var(--background-secondary)',
        'primary-contrast-background': 'var(--background-primary-contrast)',
        'secondary-contrast-background': 'var(--background-secondary-contrast)',
        'primary-text': 'var(--color-text-primary)',
        'secondary-text': 'var(--color-text-secondary)',
        'primary-contrast-text': 'var(--color-text-primary-contrast)',
        'secondary-contrast-text': 'var(--color-text-secondary-contrast)',
        'text-link': 'var(--color-text-link)',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  variants: {
    backgroundColor: ['active'],
  },
  plugins: [require('@tailwindcss/forms')],
}
