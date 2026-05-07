# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose the port your server runs on
EXPOSE 4000

# Start the server
CMD ["npx", "nodemon", "server.js"]