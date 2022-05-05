FROM node:15-slim

RUN mkdir /external-service

WORKDIR /external-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]