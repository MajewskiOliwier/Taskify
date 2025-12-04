const db = require("../config/db");

module.exports = {
    addMember: (boardId, userId, callback) => {
        db.query(
            "INSERT INTO board_members (board_id, user_id) VALUES (?, ?)",
            [boardId, userId]
        )
        .then(([result]) => callback(null, result))
        .catch(err => callback(err));
    },
    removeMember: (boardId, userId, callback) => {
        db.query(
            "DELETE FROM board_members WHERE board_id = ? AND user_id = ?",
            [boardId, userId]
        )
        .then(([result]) => callback(null, result))
        .catch(err => callback(err));
    },
    getMembers: (boardId, callback) => {
        db.query(
            `SELECT u.id, u.username, u.email 
             FROM board_members bm
             JOIN users u ON bm.user_id = u.id
             WHERE bm.board_id = ?`,
            [boardId]
        )
        .then(([rows]) => callback(null, rows))
        .catch(err => callback(err));
    }
};