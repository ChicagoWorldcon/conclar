#This is the dockerfile to use when running on a non-local host
FROM node:current-alpine
WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

#CMD [ "npx", "serve", "build" ]
#CMD ["npm", "run", "build"]
