const db = require("../config/db");

module.exports = {
    getParticipatingTeams: (userID, callback) =>{
        const getQuery = `
            SELECT b.*
            FROM USER u
            INNER JOIN board_member member ON u.id_user = member.id_user
            INNER JOIN BOARD b ON member.id_board = b.id_board
        `;

        db.query(getQuery, [userID], callback);
    }
};
