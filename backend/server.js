// Toujours charger les variables d'environnement en premier
require('dotenv').config({ path: './src/.env' });

const express = require("express");
const cors = require("cors");

// Importer vos routes
const boardsRoutes = require("./src/routes/boards.routes");
const listsRoutes = require("./src/routes/lists.routes");
const cardsRoutes = require("./src/routes/cards.routes");
const boardMembersRoutes = require("./src/routes/board_members.routes");
const app = express();

// Configuration des Middlewares
app.use(cors());
app.use(express.json()); // Permet à Express de lire le corps des requêtes JSON

// Définition des Routes
app.use("/boards", boardsRoutes);
app.use("/lists", listsRoutes);
app.use("/cards", cardsRoutes);

// ******* Middleware de Gestion des Erreurs *******

// 1. Gestion 404 pour les routes non définies
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});

// 2. Gestion des erreurs internes 500
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ 
        message: "Internal Server Error",
        error: err.message
    });
});

app.use('/boards/:boardId/members', boardMembersRoutes);
// Démarrage du Serveur

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`API Trello running on http://${HOST}:${PORT}`);
    console.log(`Ctrl+C to stop the server.`);
});