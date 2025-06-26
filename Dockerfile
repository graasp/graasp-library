FROM node:22.17-bookworm-slim AS base

# -------------------------------------------------------
# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# -------------------------------------------------------
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG APP_VERSION
ENV VITE_APP_VERSION=${APP_VERSION:-latest}
ARG VITE_API_HOST
ENV VITE_API_HOST=${VITE_API_HOST}
ARG VITE_CLIENT_HOST
ENV VITE_CLIENT_HOST=${VITE_CLIENT_HOST}
ARG SENTRY_DSN
ENV VITE_SENTRY_DSN=${SENTRY_DSN}
ARG SENTRY_ENV
ENV VITE_SENTRY_ENV=${SENTRY_ENV}

# vars only necessary during build
ARG SENTRY_ORG
ARG SENTRY_PROJECT

# Install pnpm in the builder stage
RUN npm install -g pnpm

# Build the application
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN pnpm build

# -------------------------------------------------------
# Production image, copy all the files and run the server
FROM node:22.17-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION:-latest}
ARG BUILD_TIMESTAMP
ENV BUILD_TIMESTAMP=${BUILD_TIMESTAMP:-not-provided}
ARG SENTRY_DSN
ENV SENTRY_DSN=${SENTRY_DSN}
ARG SENTRY_ENV
ENV SENTRY_ENV=${SENTRY_ENV}

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nodejs

# Create directory for writable files with proper permissions
RUN mkdir -p /app/data && \
  chown -R nodejs:nodejs /app/data

# Copy only necessary files
COPY --from=builder /app/.output ./.output

# Expose the port the app will run on
EXPOSE 3000

USER nodejs

# Start the Node.js server
CMD ["node", ".output/server/index.mjs"]
