# Base image
FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl required for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Generate Prisma Client and compile TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
