FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install express mysql2 cors dotenv

COPY . .

EXPOSE 3000

CMD ["npm", "start"]