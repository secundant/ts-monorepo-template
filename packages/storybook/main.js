const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { resolve } = require('path');

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
  },
  webpackFinal(config) {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.plugins) config.resolve.plugins = [];

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: resolve(process.cwd(), 'tsconfig.json')
      })
    );

    return config;
  }
};
