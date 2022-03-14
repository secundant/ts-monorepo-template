const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  // setupTestFrameworkScriptFile: '<rootDir>/src/__helpers__/setup.ts',
  testMatch: [`<rootDir>/packages/**/*.(spec|test).ts?(x)`],
  collectCoverageFrom: [
    `<rootDir>/packages/**/*.ts`,
    `!<rootDir>/packages/**/*.d.ts`,
    `!<rootDir>/packages/**/*.test.ts?(x)`
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  testRunner: 'jest-circus/runner',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.node.json',
      isolatedModules: true
    }
  }
};
