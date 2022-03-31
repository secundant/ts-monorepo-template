# ts-monorepo-template

Monorepo template for fullstack projects

## Setup

1. Install [Yarn](https://yarnpkg.com/getting-started/install)
   and update it to latest version (probably, optional) - `yarn set version latest`
2. (`optional`) Run `yarn install` for building platform-specific dependencies
3. Run any package command ex. `yarn workspace @my-project/client-web dev`

## Tools

- [Taskfile](https://taskfile.dev/#/) - Task manager
- [Hygen](https://www.hygen.io/) - Code generation tool

## Scripts

See

## Tech/framework used

### FrontEnd

- [NextJS](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)

### BackEnd

- `TODO` [NestJS](https://nestjs.com/)

### Tests

- [Jest](https://jestjs.io/) for unit tests.

Other test types not supported yet.

### Package manager - [Yarn v3](https://yarnpkg.com)

- [Workspaces](https://yarnpkg.com/features/workspaces) for great code organization

### Code style

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with prettier and typescript support

### Other

- [Husky](https://github.com/typicode/husky) for custom local git hooks
- [lint-staged](https://github.com/okonet/lint-staged) for advanced pre-commit hook configuration
