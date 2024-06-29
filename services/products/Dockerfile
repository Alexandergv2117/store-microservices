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
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_LOGGING=${DB_LOGGING}

ENV AWS_BUCKET_NAME_IMAGE=${AWS_BUCKET_NAME_IMAGE}
ENV AWS_BUCKET_NAME_REGION=${AWS_BUCKET_NAME_REGION}
ENV AWS_PUBLIC_KEY=${AWS_PUBLIC_KEY}
ENV AWS_SECRET_KEY=${AWS_SECRET_KEY}

CMD [ "npm", "run", "start:prod" ]