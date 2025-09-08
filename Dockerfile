# Use the official Node.js image as the base image
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files to the container
COPY . .

# Expose a port (optional, if you need to run a web server)
EXPOSE 3000

# Set the command to run the "test-qa" script from package.json
CMD ["npm", "run", "test-qa"]
