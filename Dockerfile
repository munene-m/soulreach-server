FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build \
    && npm cache clean --force

FROM node:18-alpine AS production
WORKDIR /app    

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --only=production \
    && npm cache clean --force

EXPOSE 4001

CMD ["node", "./dist/index.js"]