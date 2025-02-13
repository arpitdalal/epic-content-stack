# This file is moved to the root directory before building the image

# base node image
FROM node:22-bookworm-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json package-lock.json .npmrc ./
RUN npm ci --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

# Use the following environment variables to configure Sentry
# ENV SENTRY_ORG=
# ENV SENTRY_PROJECT=


WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .

# Mount the secret and set it as an environment variable and run the build
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
  export SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) && \
  npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV FLY="true"
ENV INTERNAL_PORT="8080"
ENV PORT="8081"
ENV NODE_ENV="production"

WORKDIR /myapp
WORKDIR /myapp

# Generate random value and save it to .env file which will be loaded by dotenv
RUN INTERNAL_COMMAND_TOKEN=$(openssl rand -hex 32) && \
  echo "INTERNAL_COMMAND_TOKEN=$INTERNAL_COMMAND_TOKEN" > .env

COPY --from=production-deps /myapp/node_modules /myapp/node_modules

COPY --from=build /myapp/server-build /myapp/server-build
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/app/components/ui/icons /myapp/app/components/ui/icons

ADD . .

CMD ["npm", "start"]
