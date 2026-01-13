const db = require("../config/db");

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
    }
};