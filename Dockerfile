# Use Node.js lightweight image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy all project files into container
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["http-server", "-p", "8080"]
