# Use node version image as the base image
FROM node:22

# Set the working directory to /app
WORKDIR /auth-service/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the app's dependencies
RUN npm ci

# Copy the app's source code into the container
COPY . .

# Expose the port of app listens
EXPOSE 8080

# Start the app
CMD ["npm", "run", "server"]