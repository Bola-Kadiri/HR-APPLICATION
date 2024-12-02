# Use Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the project files
COPY . ./

# Expose port 5173 (default Vite port)
EXPOSE 5173

# Set environment variables for production (optional)
ENV NODE_ENV=production

# Start the app
CMD ["npm", "run", "dev"]

