// require.resolve because https://github.com/vercel/next.js/discussions/19640

module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        require.resolve('next/babel'),
        {
          'preset-env': {
            targets: {
              chrome: 80
            },
            useBuiltIns: 'usage',
            corejs: 3
          }
        }
      ]
    ],
    plugins: [
      require.resolve('babel-plugin-date-fns'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: '@material-ui/core',
          libraryDirectory: '',
          camel2DashComponentName: false
        },
        'core'
      ],
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'lodash',
          libraryDirectory: '',
          camel2DashComponentName: false
        },
        ''
      ],
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: '',
          camel2DashComponentName: false
        },
        '@material-ui/icons'
      ],
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: '@app/icons',
          libraryDirectory: 'src',
          camel2DashComponentName: false
        },
        '@app/icons'
      ]
    ],
    env: {
      production: {
        plugins: [
          [
            require.resolve('babel-plugin-styled-components'),
            {
              ssr: true,
              pure: true,
              minify: true,
              displayName: false
            }
          ]
        ]
      },
      development: {
        plugins: [
          [
            require.resolve('babel-plugin-styled-components'),
            {
              ssr: true,
              displayName: true
            }
          ]
        ]
      }
    }
  };
};
