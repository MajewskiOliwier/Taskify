require('dotenv').config({ path: './src/.env' });

//require("dotenv").config();
const express = require("express");
const cors = require("cors");

const boardsRoutes = require("./src/routes/boards.routes");
const listsRoutes = require("./src/routes/lists.routes");
const cardsRoutes = require("./src/routes/cards.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/boards", boardsRoutes);
app.use("/lists", listsRoutes);
app.use("/cards", cardsRoutes);

const PORT = 3306;
app.listen(PORT, () => console.log(`API Trello running on http://taskifydb.c1sgsamwsjxd.eu-north-1.rds.amazonaws.com:${PORT}`));
