FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm i -g pm2 && npm install && npm run build && pm2 start dist/index.js

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
