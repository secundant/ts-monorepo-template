const { join } = require('path');

module.exports = {
  getTailwindConfig({ cwd }) {
    /** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
    return {
      ...require('./tailwind.config'),
      content: ['./**/*.{tsx,css}', '../../libs/ui/**/*.{tsx,ts}']
    };
  },
  getPostCSSConfig({ cwd }) {
    return {
      plugins: {
        tailwindcss: {
          config: join(cwd, 'tailwind.config.js')
        },
        autoprefixer: {}
      }
    };
  }
};
