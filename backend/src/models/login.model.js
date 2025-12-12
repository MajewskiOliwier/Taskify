const db = require("../config/db");

module.exports = {
    findByEmail: (email, callback) => {
        db.query("SELECT id_user, email, password_hash FROM USER WHERE email = ?", [email], callback);
    },

    create: (email, hashedPassword, callback) => {
        db.query(
            "INSERT INTO USER (email, password_hash) VALUES (?, ?)",
            [email, hashedPassword],
            callback
        );
    }
};