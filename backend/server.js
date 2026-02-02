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

// CORS configuration - accetta richieste da API Gateway e frontend
const corsOptions = {
  origin: function (origin, callback) {
    // API Gateway non invia un header Origin, quindi origin sarà undefined
    // Permetti anche localhost per sviluppo locale
    const allowedOrigins = [
      'http://localhost:4200',
      process.env.FRONTEND_URL
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);  // Permetti tutto temporaneamente
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use("/boards", boardsRoutes);
app.use("/project", projectRoutes);
app.use("/lists", listsRoutes);
app.use("/cards", cardsRoutes);
app.use('/task', tasksRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT,'0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
