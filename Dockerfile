# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build if needed (uncomment for builds)
# RUN npm run build

# App runs on port 8080
EXPOSE 8080

# Start the server
CMD ["node", "app.js"]
