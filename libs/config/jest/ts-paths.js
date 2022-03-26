const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  createJestTSPathsConfig({ tsConfig, target }) {
    const {
      compilerOptions: { paths }
    } = require(tsConfig);

    if (!paths) return {};
    return {
      moduleNameMapper: {
        // tslib: require.resolve('tslib'),
        ...pathsToModuleNameMapper(paths, {
          prefix: `<rootDir>/${target}`
        })
      }
    };
  }
};
