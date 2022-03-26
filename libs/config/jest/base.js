const GLOB_TS_FILE = '**/*.ts?(x)';
const GLOB_DTS_FILE = '**/*.d.ts';
const GLOB_TEST_FILE = '**/*.(spec|test).ts?(x)';

const ROOT_TEST_MATCH = `<rootDir>/${GLOB_TEST_FILE}`;
const ROOT_COVERAGE_PATHS = [
  `<rootDir>/${GLOB_TS_FILE}`,
  `!<rootDir>/${GLOB_DTS_FILE}`,
  `!<rootDir>/${GLOB_TEST_FILE}`
];

const createPathCollectCoverageFrom = path => [
  `<rootDir>/${path}/${GLOB_TS_FILE}`,
  `!<rootDir>/${path}/${GLOB_DTS_FILE}`,
  `!<rootDir>/${path}/${GLOB_TEST_FILE}`
];
const createPathTestMatch = path => `<rootDir>/${path}/${GLOB_TEST_FILE}`;

module.exports = {
  createJestBaseConfig({ rootFolders, tsconfig }) {
    return {
      preset: 'ts-jest',
      rootDir: '.',
      testRunner: 'jest-circus/runner',
      testEnvironment: 'node',
      cacheDirectory: '<rootDir>/node_modules/.cache/jest',
      collectCoverageFrom: rootFolders
        ? rootFolders.flatMap(createPathCollectCoverageFrom)
        : [ROOT_COVERAGE_PATHS],
      testMatch: rootFolders ? rootFolders.map(createPathTestMatch) : [ROOT_TEST_MATCH],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      globals: {
        'ts-jest': {
          compiler: 'typescript',
          tsconfig,
          isolatedModules: true
        }
      }
    };
  }
};
