const withBundleAnalyzer = require('@next/bundle-analyzer');
const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules');
const nextLogger = require('next/dist/build/output/log');

const env = name => process.env[name];
const envT = name => env(name) === 'true';
const enableFullAnalyze = envT('BUILD_ANALYZE');
const settings = {
  enableBundleAnalyzer: enableFullAnalyze || envT('BUILD_ANALYZE_BUNDLE'),
  enableStatoscopePlugin: enableFullAnalyze || envT('BUILD_ANALYZE_STATOSCOPE')
};

nextLogger.info('Settings:\n', JSON.stringify(settings, null, 2));

/**
 * @type {import('next').NextConfig}
 */
const configuration = {
  experimental: {
    esmExternals: false,
    externalDir: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      enabled: settings.enableBundleAnalyzer
    }),
    withTranspileModules(['@libs/ui', '@libs/icons'])
  ],
  configuration
);
