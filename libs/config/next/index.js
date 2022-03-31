const withBundleAnalyzer = require('@next/bundle-analyzer');
const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules');
const log = require('next/dist/build/output/log');

const createEnvFn =
  (fn, { defaultFallback = null }) =>
  (name, { fallback = defaultFallback } = {}) => {
    const value = process.env[name];

    return value !== void 0 ? fn(value) : fallback;
  };

module.exports = {
  log,
  env: {
    string: createEnvFn(p => p, { defaultFallback: '' }),
    number: createEnvFn(p => +p, { defaultFallback: null }),
    bool: createEnvFn(p => p === 'true', { defaultFallback: false })
  },
  createNextConfig(
    { cwd, workspaceDependencies = [], analyzer: { enabled, detailed } = {}, logSettings },
    configuration = {}
  ) {
    log.info(
      'Next application settings:\n',
      JSON.stringify(
        {
          analyzer: {
            enabled,
            detailed
          },
          workspaceDependencies,
          ...logSettings
        },
        null,
        2
      )
    );
    return withPlugins(
      [
        withBundleAnalyzer({
          enabled
        }),
        withTranspileModules(workspaceDependencies)
      ],
      {
        swcMinify: false,
        reactStrictMode: true,
        ...configuration,
        experimental: {
          externalHelpers: true,
          esmExternals: true,
          externalDir: false,
          ...(configuration.experimental ?? {})
        },
        webpack(config, options) {
          if (enabled && detailed) {
            config.optimization.concatenateModules = false;
            config.optimization.moduleIds = 'named';
            config.optimization.chunkIds = 'named';
          }
          return configuration.webpack ? configuration.webpack(config, options) : config;
        }
      }
    );
  }
};
