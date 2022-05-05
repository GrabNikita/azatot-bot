FROM node:15-slim

RUN mkdir /bot

WORKDIR /bot

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]