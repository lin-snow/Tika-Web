FROM node:22

WORKDIR /app

COPY .output/server /app/server

CMD ["node", "server/index.mjs"]