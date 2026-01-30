require('dotenv').config({ path: './src/.env' });

//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const boardsRoutes = require("./src/routes/boards.routes");
const projectRoutes = require("./src/routes/project.routes");

const listsRoutes = require("./src/routes/lists.routes");
const cardsRoutes = require("./src/routes/cards.routes");

const authRoutes = require("./src/routes/login.routes");
const tasksRoutes = require("./src/routes/task.routes");

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/boards", boardsRoutes);
app.use("/project", projectRoutes);
app.use("/lists", listsRoutes);
app.use("/cards", cardsRoutes);
app.use('/task', tasksRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT,'0.0.0.0', () => {console.log(`API Trello running on http://taskifydb.c1sgsamwsjxd.eu-north-1.rds.amazonaws.com:${PORT}`);
                                 });
