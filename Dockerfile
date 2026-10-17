# Platform baseline: baobab-dev Node 24 (not the pre-migration Node 26 image).
FROM node:26.11.1-trixie-slim@sha256:193fe51b64e77981119c98c2002c9e32a70e2f006fb4d25068ce0558998917f0 AS dependencies
WORKDIR /app
RUN npm install --global pnpm@11.24.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# Read-only token exists only during this BuildKit RUN. Never in an ARG,
# image layer, source file, application environment or the runtime stage.
RUN --mount=type=secret,id=npm_token,required=true \
    --mount=type=tmpfs,target=/tmp/bxs-npm-auth \
    sh -eu -c 'printf "//npm.pkg.github.com/:_authToken=%s\n" "$(cat /run/secrets/npm_token)" > /tmp/bxs-npm-auth/.npmrc; \
      NPM_CONFIG_USERCONFIG=/tmp/bxs-npm-auth/.npmrc pnpm install --frozen-lockfile'
FROM dependencies AS build
COPY . .
ARG MEDUSA_BACKEND_URL=http://localhost:9000
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_build_only
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_MARKET=za
ARG NEXT_PUBLIC_DEFAULT_REGION_ID=reg_build_only
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_MARKET=$NEXT_PUBLIC_MARKET NEXT_PUBLIC_DEFAULT_REGION_ID=$NEXT_PUBLIC_DEFAULT_REGION_ID
RUN pnpm build
# Distroless hardened runtime; no npm/shell, pinned to the vetted CP Node 24 base.
FROM gcr.io/distroless/nodejs24-debian13:nonroot@sha256:9eeb7f5887d0e239e78264b06f7f11d2e14be534050481803a9e4728fcdd278e AS runtime
ARG VERSION=0.0.0-dev
ARG REVISION=unknown
LABEL org.opencontainers.image.source="https://github.com/baobab-platform/thamani" \
      org.opencontainers.image.title="thamani" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${REVISION}"
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
WORKDIR /app
COPY --from=build --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=build --chown=nonroot:nonroot /app/.next/static ./.next/static
USER nonroot:nonroot
EXPOSE 3000
# The runtime image has node but no curl; /api/health is the liveness route.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD ["/nodejs/bin/node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/api/health').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]
CMD ["server.js"]
