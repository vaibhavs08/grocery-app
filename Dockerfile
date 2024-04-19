# Use an official Node runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Move the contents of dist directory to /app directory
RUN mv dist/* .

# Remove the empty dist directory
RUN rm -rf dist

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "index.js"]