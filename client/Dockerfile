# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Set environment variable to fix OpenSSL issue
ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV CHOKIDAR_USEPOLLING=false

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all project files into the container
COPY . .

# Start the development server
CMD ["npm", "run", "dev"]