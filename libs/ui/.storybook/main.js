const path = require('path');

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    [
      '@storybook/addon-postcss',
      {
        options: {
          postcssLoaderOptions: {
            postcssOptions: {
              plugins: [require.resolve('tailwindcss')]
            },
            implementation: require('postcss')
          }
        }
      }
    ]
  ],
  framework: '@storybook/react',
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  webpackFinal(config = {}, options = {}) {
    const cssRule = config.module.rules.find(_ => _ && _.test && _.test.toString() === css_regex);

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(_ => _ && _.test && _.test.toString() !== css_regex),
          {
            ...cssRule,
            exclude: /\.module\.css$/
          },
          {
            ...cssRule,
            test: /\.module\.css$/,
            use: cssRule.use.map(_ => {
              if (_ && _.loader && _.loader.match(/[\/\\]css-loader/g)) {
                return {
                  ..._,
                  options: {
                    ..._.options,
                    modules: {
                      localIdentName: '[name]__[local]__[hash:base64:5]'
                    }
                  }
                };
              }

              return _;
            })
          }
        ]
      }
    };
  }
};

const css_regex = '/\\.css$/';
