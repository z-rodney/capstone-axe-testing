FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm uninstall bcrypt
RUN npm i bcrypt

EXPOSE 8080

CMD ["node", "server/index.js"]
