FROM node:18

# Créer dossier dans le container
WORKDIR /app

# Copier package.json
COPY package*.json ./
#commande npm init -y
# Installer les dépendances
RUN npm install express mysql2 cors dotenv

# Copier le projet
COPY . .

# Port exposé
EXPOSE 3000

# Commande de lancement
CMD ["npm", "start"]