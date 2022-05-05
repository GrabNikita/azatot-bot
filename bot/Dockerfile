FROM node:15-slim

RUN mkdir /bot

WORKDIR /bot

COPY package*.json ./

RUN npm install

COPY bot.js bot.js

EXPOSE 8080

CMD ["npm", "run", "start"]