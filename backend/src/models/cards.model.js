const db = require("../config/db");

module.exports = {
    getByList: (listId, callback) => {
        db.query("SELECT * FROM cards WHERE list_id = ?", [listId], callback);
    },

    create: (title, description, listId, callback) => {
        db.query(
            "INSERT INTO cards (title, description, list_id) VALUES (?, ?, ?)",
            [title, description, listId],
            callback
        );
    },

    move: (cardId, newListId, callback) => {
        db.query(
            "UPDATE cards SET list_id = ? WHERE id = ?",
            [newListId, cardId],
            callback
        );
    }
};
