process.env.TS_NODE_TRANSPILE_ONLY = 'true';
process.env.TS_NODE_PROJECT = require('path').resolve(__dirname, '..', 'tsconfig.json');

require('ts-node/register');
require('tsconfig-paths/register');

// ====================================================

const { Runner } = require('../compiler/Runner.ts');

const [_, __, commandName] = process.argv;
const cwd = process.cwd();

const runner = new Runner({
  cwd,
  commandName
});

runner.run();
