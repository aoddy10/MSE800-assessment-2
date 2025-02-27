# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
# COPY package.json package-lock.json ./
COPY package.json ./

# Copy all project files into the container
COPY . .
RUN npm install


# Start the development server
CMD ["npm", "run", "dev"]
