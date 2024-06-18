FROM node:20-alpine

WORKDIR /server

COPY package.json yarn.lock ./
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

LABEL authors="scorpioliv"