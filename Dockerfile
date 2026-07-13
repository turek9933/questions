FROM oven/bun:1.3.14-debian AS builder

WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun run build

FROM oven/bun:1.3.14-debian AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
