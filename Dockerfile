#This is the dockerfile to use when running on a non-local host
FROM node:current-alpine as build-stage
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
#RUN npm install -ci
RUN npm run build

###
# Bundle static assets with nginx
FROM nginx:1.23-alpine

ENV NODE_ENV production

# Copy built assets from `build-stage` image
COPY --from=build-stage /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

#CMD [ "npx", "serve", "build" ]
#CMD ["npm", "run", "build"]
