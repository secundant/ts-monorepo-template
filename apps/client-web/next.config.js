const { createNextConfig, env } = require('@libs/config/next');

/**
 * @type {import('next').NextConfig}
 */
const configuration = {
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = createNextConfig(
  {
    cwd: __dirname,
    workspaceDependencies: ['@libs/ui', '@libs/utils'],
    analyzer: {
      enabled: env.bool('ANALYZE'),
      detailed: true
    }
  },
  configuration
);
