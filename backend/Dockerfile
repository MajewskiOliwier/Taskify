FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port defined in .env (default 3000), but it can be changed as needed <PORT>
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]