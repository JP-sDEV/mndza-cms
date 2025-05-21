# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your code
COPY . .

# Build the admin panel BEFORE runtime
RUN npm run build

# Expose the port Strapi runs on
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
