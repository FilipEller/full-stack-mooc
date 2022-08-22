FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
# http://localhost:3001 without Nginx

RUN npm run build

FROM nginx:1.23-alpine

WORKDIR /

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html