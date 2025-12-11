const db = require("../config/db");

module.exports = {
    findByEmail: (email, callback) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], callback);
    },

    create: (email, hashedPassword, callback) => {
        db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword],
            callback
        );
    }
};