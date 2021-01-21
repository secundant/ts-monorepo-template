const { resolve, basename } = require('path');
const { readdirSync } = require('fs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  webpack(config, { defaultLoaders }) {
    const selfDirName = basename(__dirname);
    const monorepoPackages = readdirSync(resolve(__dirname, '..'))
      .filter(name => name !== selfDirName)
      .flatMap(name => [resolve(__dirname, '..', name), `@my-project/${name}`]);

    defaultLoaders.babel.options.rootMode = 'upward';

    // Next (and next-transpile-modules) dont support Yarn workspaces with PnP mode
    config.module.rules.push({
      test: /\.+(js|jsx|mjs|ts|tsx)$/,
      use: defaultLoaders.babel,
      // include all modules in "packages" folder
      include: importName => monorepoPackages.some(name => importName.includes(name))
    });

    return config;
  }
});
