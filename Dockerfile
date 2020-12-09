FROM node:alpine as base

WORKDIR /home/workspace

COPY .yarn/ .yarn/
COPY .yarnrc.yml yarn.lock .pnp.js package.json ./

# ===

FROM base as artifacts

WORKDIR /home/workspace

COPY tsconfig.cjs.json tsconfig.json babel.config.js ./
COPY packages/ ./packages/
RUN yarn workspace @app/react-nextjs build

# ===

FROM base as release

ENV PORT=80

COPY packages/react-nextjs/package.json ./packages/react-nextjs/package.json
COPY --from=artifacts /home/workspace/packages/react-nextjs/.next /home/workspace/packages/react-nextjs/.next

CMD yarn workspace @app/react-nextjs start -p ${PORT}
