const withOpacityValue =
  name =>
  ({ opacityValue }) =>
    opacityValue === void 0 || +opacityValue === 1
      ? `var(--palette-${name})`
      : `rgb(var(--palette-rgb-${name}) / ${opacityValue})`;

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./core/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'var(--palette-primary-light)',
          main: withOpacityValue('primary-main'),
          dark: 'var(--palette-primary-dark)'
        },
        secondary: {
          light: 'var(--palette-secondary-light)',
          main: withOpacityValue('secondary-main'),
          dark: 'var(--palette-secondary-dark)'
        }
      }
    }
  },
  plugins: []
};
