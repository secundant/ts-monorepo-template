const { createJestBaseConfig } = require('./base');
const { createJestTSPathsConfig } = require('./ts-paths');

module.exports = {
  createJestProjectConfig({ displayName, pathsRoot, targets, tsConfig }) {
    return {
      displayName,
      ...createJestBaseConfig({
        rootFolders: targets,
        tsconfig: tsConfig
      }),
      ...createJestTSPathsConfig({
        tsConfig,
        target: pathsRoot
      })
    };
  }
};
