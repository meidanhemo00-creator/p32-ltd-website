# syntax=docker/dockerfile:1

# --- build: static export of the Next.js site into /app/out ---
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# app/layout.tsx emits noindex robots meta unless VERCEL_ENV=production.
# Pass --build-arg VERCEL_ENV=production for the indexable production image.
ARG VERCEL_ENV
ENV VERCEL_ENV=$VERCEL_ENV \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- runtime: nginx serving the exported files ---
FROM nginx:stable-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO /dev/null http://127.0.0.1/ || exit 1
