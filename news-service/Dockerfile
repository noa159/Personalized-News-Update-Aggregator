FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc ./.npmrc

RUN npm install

COPY . .

EXPOSE 3002

ENV NODE_ENV production

CMD ["npm", "start"]
