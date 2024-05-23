FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .

FROM node:18-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

RUN yarn install

EXPOSE 9000

ENV PORT 9000

CMD ["yarn", "dev"]