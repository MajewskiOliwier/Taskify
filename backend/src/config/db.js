const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/../.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erreur de connexion MySQL :", err);
        return;
    }
    console.log("Connecté à MySQL !");
    connection.release();
});

module.exports = pool;
