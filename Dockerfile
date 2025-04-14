# Stage 1: Build stage
FROM oven/bun:latest AS build

WORKDIR /app

# Log: Mulai proses build
RUN echo "===== MULAI PROSES BUILD ====="

# Langkah 1: Salin file untuk install dependencies
COPY bun.lock package.json ./

# Langkah 2: Instal dependencies
RUN echo "===== LANGKAH 2: MULAI INSTALASI DEPENDENCIES =====" && \
    bun install --frozen-lockfile && \
    echo "===== INSTALASI DEPENDENCIES SELESAI ====="

# Langkah 3: Salin seluruh project (kecuali yg di .dockerignore)
COPY . .

# Langkah 4: Set environment dan build
ENV NODE_ENV=production
RUN echo "===== LANGKAH 5: MULAI BUILD APLIKASI =====" && \
    bun run build && \
    echo "===== BUILD APLIKASI SELESAI ====="

# Stage 2: Production stage
FROM oven/bun:latest AS production

WORKDIR /app

# Langkah 6: Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Langkah 7: Tambah user non-root
RUN echo "===== MEMBUAT USER NON-ROOT =====" && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Langkah 8-12: Salin hasil build dari stage sebelumnya
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs

# Gunakan user non-root
USER nextjs

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "start"]
