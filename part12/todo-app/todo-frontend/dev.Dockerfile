FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV CHOKIDAR_USEPOLLING=true

RUN npm install

CMD ["npm", "start"]