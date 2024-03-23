FROM node:18

WORKDIR /app

COPY . .

RUN npm ci && npm cache clean --force