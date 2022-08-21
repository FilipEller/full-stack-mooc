FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3001

ENV CHOKIDAR_USEPOLLING=true

RUN npm install

CMD ["npm", "start"]