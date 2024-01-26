# Use an official Node.js runtime as a parent image
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 8080

CMD ["node", "app.js"]
