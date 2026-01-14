const db = require("../config/db");
const { randomUUID } = require('crypto');

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

    getProjectTasks: (projectID, callback) => {
        // const query = `
        //     SELECT t.* , c.name AS column_name, b.name AS board_name, p.name AS project_name
        //     FROM USER u
        //     INNER JOIN BELONGS_TO bt ON u.id_user = bt.id_user
        //     INNER JOIN BOARD b ON b.id_board = bt.id_board
        //     INNER JOIN OWNS o ON b.id_board = o.id_board
        //     INNER JOIN PROJECT p ON p.id_project = o.id_project
        //     INNER JOIN HAS h ON b.id_board = h.id_board
        //     INNER JOIN COLONNE c ON c.id_COLONNE = h.id_COLONNE
        //     INNER JOIN CONTAINS_TASK ct ON c.id_COLONNE = ct.id_COLONNE
        //     INNER JOIN TASK t ON t.id_task = ct.id_task
        //     WHERE u.id_user = ? AND p.id_project = ?
        // `;

        const query = `
            SELECT
            t.id_task,
            t.title AS task_title,
            t.description,
            t.priority,
            t.created_at,
            c.id_COLONNE ,
            c.title AS column_name
            FROM PROJECT p
            JOIN OWNS o ON p.id_project = o.id_project
            JOIN BOARD b ON o.id_board = b.id_board
            JOIN HAS h ON b.id_board = h.id_board
            JOIN COLONNE c ON h.id_COLONNE = c.id_COLONNE
            JOIN CONTAINS_TASK ct ON c.id_COLONNE = ct.id_COLONNE
            JOIN TASK t ON ct.id_task = t.id_task
            WHERE p.id_project = ?
            ORDER BY c.title, t.created_at
        `;

        db.query(query, [projectID], callback);
    },

    getAssignedTasksFromProject: (userID, projectID, callback) => {
        const query = `
            SELECT t.* , c.title AS column_title, b.name AS board_name, p.name AS project_name
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
    },

    createTaskInTodo: (projectID, title, description, callback) => {
        const taskId = randomUUID();

        db.getConnection((err, conn) => {
        if (err) return callback(err);

        conn.beginTransaction(err => {
            if (err) return callback(err);

            conn.query(
            `
            SELECT c.id_COLONNE
            FROM COLONNE c
            INNER JOIN HAS h ON h.id_COLONNE = c.id_COLONNE
            INNER JOIN BOARD b ON b.id_board = h.id_board
            INNER JOIN OWNS o ON o.id_board = b.id_board
            WHERE o.id_project = ? AND c.title = 'TODO'
            LIMIT 1
            `,
            [projectID],
            (err, rows) => {
                if (err || rows.length === 0) {
                    return conn.rollback(() =>
                        callback(err || new Error("TODO column not found"))
                    );
                }

                const columnId = rows[0].id_COLONNE;

                conn.query(
                `
                INSERT INTO TASK (id_task, title, description, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
                `,
                [taskId, title, description],
                err => {
                    if (err)
                        return conn.rollback(() => callback(err));

                    conn.query(
                    `
                    INSERT INTO CONTAINS_TASK (id_COLONNE, id_task)
                    VALUES (?, ?)
                    `,
                    [columnId, taskId],
                    err => {
                        if (err) return conn.rollback(() => callback(err));

                        conn.commit(err => {
                        if (err) return conn.rollback(() => callback(err));
                        conn.release();
                        callback(null, { taskId });
                        });
                    }
                    );
                }
                );
            }
            );
        });
        });
    },

    addTaskHistoryLog: (id_task, action, details, callback) => {
        const id_history = uuid();
        const created_at = new Date();

        const insertHistory = `
            INSERT INTO TASK_HISTORY (id_history, action, details, created_at)
            VALUES (?,?,?,?)
        `;

        const insertGenerates = `
            INSERT INTO GENERATES (id_history, id_task) VALUES (? , ?)
        `
        db.beginTransaction(err => {
            if (err) return callback(err);

            db.query(
                insertHistory,
                [id_history, action, details, created_at],
                (err1) => {
                    return db.rollback(() => callback(err1));
                }
            );

            db.query(
                insertGenerates,
                [id_history, id_task],
                (err2) => {
                    if (err2) {
                        return db.rollback(() => callback(err2));
                    }

                    db.commit(err3 => {
                        if (err3) {
                            return db.rollback(() => callback(err3));
                            callback(null, { id_history, task_ID: id_task })
                        }
                    });
                }
            );
        });
    },

    addAttachmentToTask: (filename, mime_type, size_bytes, created_at, callback) => {
        db.query(
            "INSERT INTO ATTACHMENT (filename, mime_type, size_bytes, created_at) VALUES (?, ?, ?, ?)",
            [filename, mime_type, size_bytes, created_at],
            callback
        );
    },
};