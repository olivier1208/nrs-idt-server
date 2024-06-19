FROM node:20-alpine

WORKDIR .
COPY package.json yarn.lock ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

LABEL authors="scorpioliv"