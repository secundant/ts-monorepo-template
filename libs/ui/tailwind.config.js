const withOpacityValue =
  name =>
  ({ opacityValue }) =>
    opacityValue === void 0 || +opacityValue === 1
      ? `var(--palette-${name})`
      : `rgb(var(--palette-rgb-${name}) / ${opacityValue})`;

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./**/*.tsx', './**/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";'
      },
      boxShadow: {
        'el-sm':
          '0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        'el-md':
          '0px 2px 4px -1px rgba(0, 0, 0, 0.20), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        'el-lg':
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)'
      },
      colors: {
        ui: {
          label: '#61718D'
        },
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
      },
      spacing: {
        'size-sm': '32px',
        'size-md': '40px',
        'size-lg': '48px'
      }
    }
  },
  plugins: []
};
