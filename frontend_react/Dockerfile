# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* .npmrc* ./
RUN npm ci || npm install

COPY . .

# Build for production
RUN npm run build

# Serve built app via a lightweight server
FROM node:20-alpine AS runner
WORKDIR /app

# Install a minimal HTTP server
RUN npm install -g serve

# Copy build artifacts
COPY --from=base /app/dist /app/dist

ENV PORT=3000
EXPOSE 3000

# For API base URL, Vite uses baked-time env; runtime can be proxied via ingress.
CMD ["serve", "-s", "dist", "-l", "3000"]
