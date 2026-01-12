require('dotenv').config({ path: './src/.env' });

//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const boardsRoutes = require("./src/routes/boards.routes");
const listsRoutes = require("./src/routes/lists.routes");
const cardsRoutes = require("./src/routes/cards.routes");
const authRoutes = require("./src/routes/login.routes");

const app = express();
app.use(cors({
	origin: 'http://localhost:4200',
	credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/boards", boardsRoutes);
app.use("/lists", listsRoutes);
app.use("/cards", cardsRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3306;
app.listen(PORT, () => console.log(`API Trello running on http://taskifydb.c1sgsamwsjxd.eu-north-1.rds.amazonaws.com:${PORT}`));
