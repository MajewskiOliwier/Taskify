const db = require("../config/db");

module.exports = {
    getAssignedTasks: (userID, callback) => {
        const query = `
            SELECT t.* 
            FROM TASK t
            INNER JOIN ASSIGNED_TO a ON t.id_task = a.id_task
            INNER JOIN USER u ON u.id_user = a.id_user
            WHERE u.id_user = ?
        `;

        db.query(query, [userID], callback);
    },

    getProjectTasks: (userID, projectID, callback) => { 
        const query = `
            SELECT t.* , c.name AS column_name, b.name AS board_name, p.name AS project_name
            FROM USER u
            INNER JOIN BELONGS_TO bt ON u.id_user = bt.id_user
            INNER JOIN BOARD b ON b.id_board = bt.id_board
            INNER JOIN OWNS o ON b.id_board = o.id_board
            INNER JOIN PROJECT p ON p.id_project = o.id_project
            INNER JOIN HAS h ON b.id_board = h.id_board
            INNER JOIN COLONNE c ON c.id_COLONNE = h.id_COLONNE
            INNER JOIN CONTAINS_TASK ct ON c.id_COLONNE = ct.id_COLONNE
            INNER JOIN TASK t ON t.id_task = ct.id_task
            WHERE u.id_user = ? AND p.id_project = ?
        `;

        db.query(query, [userID, projectID], callback);
    },

    getAssignedTasksFromProject: (userID, projectID, callback) => { 
        const query = `
            SELECT t.* , c.name AS column_name, b.name AS board_name, p.name AS project_name
            FROM USER u
            INNER JOIN BELONGS_TO bt ON u.id_user = bt.id_user
            INNER JOIN BOARD b ON b.id_board = bt.id_board
            INNER JOIN OWNS o ON b.id_board = o.id_board
            INNER JOIN PROJECT p ON p.id_project = o.id_project
            INNER JOIN HAS h ON b.id_board = h.id_board
            INNER JOIN COLONNE c ON c.id_COLONNE = h.id_COLONNE
            INNER JOIN CONTAINS_TASK ct ON c.id_COLONNE = ct.id_COLONNE
            INNER JOIN TASK t ON t.id_task = ct.id_task
            INNER JOIN ASSIGNED_TO at ON at.id_task = t.id_task AND at.id_user = u.id_user
            WHERE u.id_user = ? AND p.id_project = ?
        `;

        db.query(query, [userID, projectID], callback);
    },

    create: (title, description, listId, callback) => {
        db.query(
            "INSERT INTO cards (title, description, list_id) VALUES (?, ?, ?)",
            [title, description, listId],
            callback
        );
    }
};
