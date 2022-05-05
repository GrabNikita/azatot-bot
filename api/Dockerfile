FROM node:15-slim

RUN mkdir /bot-api

WORKDIR /bot-api

COPY package*.json ./

RUN npm install

COPY server.js server.js

EXPOSE 80

CMD ["npm", "run", "start"]