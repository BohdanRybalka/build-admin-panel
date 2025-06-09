# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./

# Copy the rest of the server files
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript (if needed, but your script runs tsx directly)
# RUN npm run build

# Expose port
EXPOSE 4000

# Start the server
CMD ["npx", "tsx", "server.ts"]
