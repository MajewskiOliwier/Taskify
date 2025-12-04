const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/../.env' });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    queueLimit: 0
});

console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Connecté à MySQL !");
        connection.release();
    } catch (err) {
        console.error("Erreur de connexion MySQL :", err);
    }
})();

module.exports = db;
