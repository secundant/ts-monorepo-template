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
    { cwd, workspaceDependencies = [], enableBundleAnalyzer, logSettings },
    configuration
  ) {
    log.info(
      'Next application settings:\n',
      JSON.stringify(
        {
          enableBundleAnalyzer,
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
          enabled: enableBundleAnalyzer
        }),
        withTranspileModules(workspaceDependencies)
      ],
      configuration
    );
  }
};
