
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
CMD ['npm','start']
EXPOSE 3000
