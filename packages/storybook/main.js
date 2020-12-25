module.exports = {
  stories: ['./stories/**/*.stories.@(js|jsx|ts|tsx)', './stories/**/*.stories.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true
    }
  },
  babel: {
    extends: '../../babel.config.js'
  }
};
