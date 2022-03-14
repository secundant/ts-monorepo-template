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
- [Material UI](https://material-ui.com/)
- [styled-components](https://styled-components.com/)

### BackEnd

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/) by `@nestjs/graphql`

### Tests

- [Jest](https://jestjs.io/) for unit tests.

Other test types not supported yet.

### Package manager - [Yarn v3](https://yarnpkg.com)

- [Plug'n'Play](https://yarnpkg.com/features/pnp) feature - no more node_modules
- [Workspaces](https://yarnpkg.com/features/workspaces) for great code organization

### Code style

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with prettier and typescript support

### Other

- [Husky](https://github.com/typicode/husky) for custom local git hooks
- [lint-staged](https://github.com/okonet/lint-staged) for advanced pre-commit hook configuration

## Packages

### [client-web](apps/client-web)

React + NextJS application for web platform.
Features included:

- Resolving mobile/desktop theme at server side
- styled-components + material-ui integration
- Bundle analyzing

### [uikit-web](apps/uikit-web)

UIKit for web platform based on material-ui and styled-components

### [shared](apps/shared)

Package for shared utils/hooks/models/etc.

### [icons](apps/icons)

Example of react icons library with raw *.svg files as sources
and compiling them to react components by svgr

### [graphql](apps/graphql)

GraphQL API gateway based on NestJS
