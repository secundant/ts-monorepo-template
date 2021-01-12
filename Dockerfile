FROM node:alpine as artifacts

WORKDIR /home/workspace

COPY .yarn/ .yarn/
COPY .yarnrc.yml yarn.lock .pnp.js package.json ./

COPY tsconfig.cjs.json tsconfig.json babel.config.js ./
COPY packages/ ./packages/

RUN yarn workspace @my-project/client-web build
RUN yarn workspaces focus @my-project/client-web --production

# ===

FROM node:alpine as release

ENV PORT=80

WORKDIR /home/workspace

COPY --from=artifacts /home/workspace/.yarn/ .yarn/
COPY --from=artifacts \
  /home/workspace/.yarnrc.yml \
  /home/workspace/yarn.lock \
  /home/workspace/.pnp.js \
  /home/workspace/package.json \
  ./
COPY --from=artifacts /home/workspace/packages/client-web/package.json ./packages/client-web/package.json
COPY --from=artifacts /home/workspace/packages/client-web/.next /home/workspace/packages/client-web/.next

CMD yarn workspace @my-project/client-web start -p ${PORT}
