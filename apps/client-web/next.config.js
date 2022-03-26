const { createNextConfig, env } = require('@libs/config/next');

/**
 * @type {import('next').NextConfig}
 */
const configuration = {
  experimental: {
    esmExternals: false,
    externalDir: false
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = createNextConfig(
  {
    cwd: __dirname,
    workspaceDependencies: ['@libs/ui', '@libs/utils'],
    enableBundleAnalyzer: env.bool('ANALYZE')
  },
  configuration
);
