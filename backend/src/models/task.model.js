const db = require("../config/db");

module.exports = {
    getAssignedTasks: (userID, callback) => {
        db.query("SELECT * FROM task t WHERE " +
            "INNER JOIN ASSIGNED_TO a ON t.id_task = a.id_task" + 
            "INNER JOIN user u on u.id_user = a.id_user" +
            "WHERE u.id_user = '1'", [userID], callback);
    },

    // getProjectTasks: (userID, projectID, callback) => {  //dont know what the colonne is for?
    //     db.query("SELECT * FROM task t WHERE " +
    //         "INNER JOIN ASSIGNED_TO a ON t.id_task = a.id_task" + 
    //         "INNER JOIN user u on u.id_user = a.id_user" +
    //         "WHERE u.id_user = '?' ", [userID], callback);
    // },

    create: (title, description, listId, callback) => {
        db.query(
            "INSERT INTO cards (title, description, list_id) VALUES (?, ?, ?)",
            [title, description, listId],
            callback
        );
    }
};
