const { createJestProjectConfig } = require('@libs/config/jest');

module.exports = {
  projects: [
    createJestProjectConfig({
      displayName: '@apps/client-web',
      pathsRoot: 'apps/client-web',
      tsConfig: require.resolve('./apps/client-web/tsconfig.node.json'),
      targets: ['apps/client-web']
    }),
    createJestProjectConfig({
      displayName: '@libs/<*>',
      targets: ['libs/ui', 'libs/utils'],
      tsConfig: require.resolve('./tsconfig.node.json')
    })
  ]
};
