#This is the dockerfile to use when running on a non-local host
FROM node:current-alpine as build-stage
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
