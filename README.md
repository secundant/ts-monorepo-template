# ts-monorepo-template

Template with most common presets for TS development

- [TypeScript](https://www.typescriptlang.org/) with path aliases for packages
  (ex. `import { ... } from '@app/my-package/foo/bar'`)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with prettier and typescript integrations
- [Jest](https://jestjs.io/) as test runner
  - Integrated with TypeScript and path aliases
  - Ready for starting tests without any config extension
- [Yarn v2](https://yarnpkg.com)
  - [Plug'n'Play](https://yarnpkg.com/features/pnp) feature - no more node_modules
  - [Workspaces](https://yarnpkg.com/features/workspaces) for great code organization
- GIT helpers
  - [Husky](https://github.com/typicode/husky) for custom local git hooks
  - [lint-staged](https://github.com/okonet/lint-staged) for advanced pre-commit hook configuring

## Setup

1. Install [Yarn](https://yarnpkg.com/getting-started/install)
2. Upgrade Yarn version: `yarn set version latest`
3. That's all :) Just run any script from root or one of packages
   (ex. `yarn workspace @app/react-nextjs dev`)
