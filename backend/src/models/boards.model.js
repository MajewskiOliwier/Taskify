const db = require("../config/db");

module.exports = {
    getAll: (callback) => {
        db.query("SELECT * FROM boards")
            .then(([rows])=>callback(null,rows))
            .catch(err => callback(err));
    },

    create: (name, callback) => {
        db.query("INSERT INTO boards (name) VALUES (?)", [name])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },
    getById: (id, callback) => {
        db.query("SELECT * FROM boards WHERE id = ?", [id])
            .then(([rows]) => callback(null, rows.length ? rows[0] : null))
            .catch(err => callback(err));
    },
    update: (id, name, callback) => {
        db.query("UPDATE boards SET name = ? WHERE id = ?", [name, id])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },

    delete: (id, callback) => {
        db.query("DELETE FROM boards WHERE id = ?", [id])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    }
};