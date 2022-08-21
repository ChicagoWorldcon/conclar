#This is the dockerfile to use when running on a non-local host
FROM node:current-alpine
WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .
CMD ["npm", "run", "build"]
