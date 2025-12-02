const db = require("../config/db");

module.exports = {
    getAll: (callback) => {
        db.query("SELECT * FROM boards", callback);
    },

    create: (name, callback) => {
        db.query("INSERT INTO boards (name) VALUES (?)", [name], callback);
    }
};