# Build stage
FROM node:20 AS build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# Production stage
FROM nginx:1.25-alpine

# Copy built application
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
