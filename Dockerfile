# base node image
FROM node:20-bullseye-slim as base

RUN npm install -g pnpm

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json ./
RUN pnpm install

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .
RUN pnpm build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

ENV NODE_ENV production
# COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=deps /myapp/node_modules /myapp/node_modules

COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/start.sh /myapp/start.sh

RUN pnpm prune --prod
