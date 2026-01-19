FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia tutto il codice del frontend
COPY . .

# Espone la porta 4200
EXPOSE 4200

# Avvia il development server Angular accessibile dall'esterno
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
