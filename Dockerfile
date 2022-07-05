#This is the dockerfile to use when running on a non-local host
FROM node:current-alpine
WORKDIR /app/conclar-dev

COPY package*.json ./
RUN yarn install

COPY . .
#CMD ["yarn", "start"]