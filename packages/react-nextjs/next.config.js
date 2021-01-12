const { resolve } = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  webpack(config, { defaultLoaders }) {
    const paths = ['react-material-ui-kit', 'icons', 'react-shared'].flatMap(p => [
      resolve(process.cwd(), '..', p),
      `@app/${p}`
    ]);

    defaultLoaders.babel.options.rootMode = 'upward';

    // Next (and next-transpile-modules) dont support Yarn workspaces with PnP mode
    config.module.rules.push({
      test: /\.+(js|jsx|mjs|ts|tsx)$/,
      use: defaultLoaders.babel,
      // include all modules in "packages" folder
      include: p => paths.some(pp => p.includes(pp))
    });

    return config;
  }
});
