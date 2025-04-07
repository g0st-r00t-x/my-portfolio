# Gunakan Bun sebagai base image
FROM oven/bun:1 AS base
WORKDIR /app

# Tahap 1: Install dependencies dengan devDependencies (untuk build)
FROM base AS deps
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

# Tahap 2: Build aplikasi
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Tahap 3: Buat image production yang lebih ringan
FROM oven/bun:1-slim AS runner
WORKDIR /app

# Copy hanya yang dibutuhkan
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

ENV NODE_ENV=production
EXPOSE 3000

# Jalankan Next.js dengan Bun
CMD ["bun", "run", "start"]
