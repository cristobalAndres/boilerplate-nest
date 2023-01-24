# Create a new Node 14 image
FROM node:14 as dev

# Set the working directory
WORKDIR /app

# Copy all files
COPY . .

# Install the dependencies
RUN npm install -g @nestjs/cli
RUN npm install --silent

# Serve the app
CMD [ "npm", "run", "start:debug" ]
