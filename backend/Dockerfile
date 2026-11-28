# ---------- Stage 1: Dependencies (همه، شامل dev) ----------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---------- Stage 2: Builder (کامپایل TypeScript) ----------
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- Stage 3: Prod-deps (فقط production) ----------
FROM node:24-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ---------- Stage 4: Runner ----------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# کاربر غیر root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# فقط چیزی که برای اجرا لازمه
COPY --from=prod-deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder   --chown=nodejs:nodejs /app/dist         ./dist
COPY --from=builder   --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 4000
ENV PORT=4000

CMD ["node", "dist/main"]