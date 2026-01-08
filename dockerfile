FROM node:25-slim AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:25-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.temp ./.temp
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/index.html ./index.html

RUN yarn install --production --frozen-lockfile && yarn cache clean

USER node

EXPOSE 3000
CMD ["node", "dist/main.js"]