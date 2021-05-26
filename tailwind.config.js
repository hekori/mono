module.exports = {
  purge: ['./apps/hereismyfeedback/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: 'var(--background-primary)',
      secondary: 'var(--background-secondary)',
    }),
  },
  variants: {
    backgroundColor: ['active', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/forms')],
}
