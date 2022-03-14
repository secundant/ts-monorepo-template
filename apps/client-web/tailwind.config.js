/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  ...require('@libs/ui/tailwind.config'),
  content: ['./**/*.{tsx,css}', '../../libs/ui/core/**/*.{tsx,ts}']
};
