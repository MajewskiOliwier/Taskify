const db = require("../config/db");

module.exports = {
    getByBoard: (boardId, callback) => {
        db.query("SELECT * FROM lists WHERE board_id = ?", [boardId], callback);
    },

    create: (name, boardId, callback) => {
        db.query(
            "INSERT INTO lists (name, board_id) VALUES (?, ?)",
            [name, boardId],
            callback
        );
    }
};