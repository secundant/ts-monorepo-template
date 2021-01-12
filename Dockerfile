FROM node:alpine as artifacts

WORKDIR /home/workspace

COPY .yarn/ .yarn/
COPY .yarnrc.yml yarn.lock .pnp.js package.json ./

COPY tsconfig.cjs.json tsconfig.json babel.config.js ./
COPY packages/ ./packages/

RUN yarn workspace @app/react-nextjs build
RUN yarn workspaces focus @app/react-nextjs --production

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
COPY --from=artifacts /home/workspace/packages/react-nextjs/package.json ./packages/react-nextjs/package.json
COPY --from=artifacts /home/workspace/packages/react-nextjs/.next /home/workspace/packages/react-nextjs/.next

CMD yarn workspace @app/react-nextjs start -p ${PORT}
