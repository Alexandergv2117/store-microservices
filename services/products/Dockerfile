ARG NODE_VERSION=20.11

FROM node:${NODE_VERSION}-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm i -g @nestjs/cli
RUN npm run build

FROM node:${NODE_VERSION}-alpine as runner
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production

EXPOSE 5300

ENV NODE_ENV=production
ENV PORT=5300

CMD [ "npm", "run", "start:prod" ]