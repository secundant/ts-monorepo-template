ARG NODE_IMAGE=node:15.6.0-alpine

FROM ${NODE_IMAGE} as workspace

WORKDIR /home/workspace

COPY .yarn/ .yarn/
COPY .yarnrc.yml yarn.lock .pnp.js package.json ./

COPY tsconfig.cjs.json tsconfig.json tsconfig.common.nest.json babel.config.js ./

# TODO Make template/script for copying all package.json files

COPY packages/client-web/package.json packages/client-web/package.json
COPY packages/graphql/package.json packages/graphql/package.json
COPY packages/icons/package.json packages/icons/package.json
COPY packages/service-auth/package.json packages/service-auth/package.json
COPY packages/service-shared/package.json packages/service-shared/package.json
COPY packages/service-users/package.json packages/service-users/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/storybook/package.json packages/storybook/package.json
COPY packages/uikit-web/package.json packages/uikit-web/package.json

RUN yarn install --immutable --immutable-cache --inline-builds --skip-builds

# ===

FROM workspace as service-users__artifacts

COPY packages/service-users packages/service-users
COPY packages/service-shared packages/service-shared

RUN yarn workspace @my-project/service-users build

# ===

FROM workspace as service-auth__artifacts

COPY packages/service-auth packages/service-auth
COPY packages/service-users packages/service-users
COPY packages/service-shared packages/service-shared

RUN yarn workspace @my-project/service-auth build

# ===

FROM workspace as client-web__artifacts

COPY packages/client-web packages/client-web
COPY packages/uikit-web packages/uikit-web
COPY packages/shared packages/shared
COPY packages/icons packages/icons

RUN yarn workspace @my-project/client-web build

# ===

FROM ${NODE_IMAGE} as service-users

WORKDIR /home/workspace

COPY --from=workspace /home/workspace/ ./
COPY --from=service-users__artifacts /home/workspace/packages/service-users/dist ./packages/service-users/dist
COPY --from=service-users__artifacts /home/workspace/packages/service-users/.env.example ./packages/service-users/.env.example

CMD yarn workspace @my-project/service-users start

# ===

FROM ${NODE_IMAGE} as service-auth

WORKDIR /home/workspace

COPY --from=workspace /home/workspace/ ./
COPY --from=service-auth__artifacts /home/workspace/packages/service-auth/dist ./packages/service-auth/dist
COPY --from=service-auth__artifacts /home/workspace/packages/service-auth/.env.example ./packages/service-auth/.env.example

CMD yarn workspace @my-project/service-auth start

# ===

FROM ${NODE_IMAGE} as client-web

ENV PORT=80

COPY --from=client-web__artifacts /home/workspace/.yarn/ .yarn/
COPY --from=client-web__artifacts \
  /home/workspace/.yarnrc.yml \
  /home/workspace/yarn.lock \
  /home/workspace/.pnp.js \
  /home/workspace/package.json \
  ./

COPY --from=client-web__artifacts /home/workspace/packages/client-web/package.json ./packages/client-web/package.json
COPY --from=client-web__artifacts /home/workspace/packages/client-web/.next /home/workspace/packages/client-web/.next

CMD yarn workspace @my-project/client-web start -p ${PORT}
