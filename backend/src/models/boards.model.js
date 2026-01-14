const db = require("../config/db");
const { randomUUID } = require('crypto');

module.exports = {
    getAll: (callback) => {
        db.query("SELECT * FROM boards", callback);
    },

    create: (name, callback) => {
        db.query("INSERT INTO boards (name) VALUES (?)", [name], callback);
    },

    getParticipatingTeams: (userID, callback) =>{
        const getQuery = `
        SELECT b.*
            FROM USER u
            INNER JOIN board_member member ON u.id_user = member.id_user
            INNER JOIN BOARD b ON member.id_board = b.id_board
            WHERE u.id_user = ?
        `;

        db.query(getQuery, [userID], callback);
    },

    createNewBoard: (name, userID, callback) => {
        const boardId = randomUUID();

        const query = `
            START TRANSACTION;

            INSERT INTO BOARD (id_board, name, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW());

            INSERT INTO CREATES (id_user, id_board)
            VALUES ()

            INSERT INTO board_member (id_user, id_board, role)
            VALUES (?, ?, 'OWNER');

            COMMIT;
        `;

        db.query(
            query,
            [boardId, name, userID, boardId],
            callback
        );
    }
};