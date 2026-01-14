const db = require("../config/db");
const { randomUUID } = require('crypto');

module.exports = {
    getParticipatingProjects: (userID, callback) =>{
        const getQuery = `
            SELECT p.*
            FROM PROJECT p
            INNER JOIN CONTAINS c ON p.id_project = c.id_project
            WHERE c.id_user = ?
        `;

        db.query(getQuery, [userID], callback);
    },

    getProjectColumns: (projectID, callback) => {
        const query = `
            SELECT
                c.id_COLONNE,
                c.title,
                c.position,
                c.created_at
            FROM PROJECT p
            JOIN OWNS o ON o.id_project = p.id_project
            JOIN BOARD b ON b.id_board = o.id_board
            JOIN HAS h ON h.id_board = b.id_board
            JOIN COLONNE c ON c.id_COLONNE = h.id_COLONNE
            WHERE p.id_project = ?
            ORDER BY c.position
        `;

        db.query(query, [projectID], callback);
    },

    // createDefaultProject: (name, plan_type, userID, callback) => {
    //     const projectId = randomUUID();
    //     const todoId = randomUUID();
    //     const inProgressId = randomUUID();
    //     const doneId = randomUUID();

    //     db.getConnection((err, conn) => {
    //         if (err) return callback(err);

    //         conn.beginTransaction(err => {
    //         if (err) return callback(err);  

    //         conn.query(
    //             `INSERT INTO PROJECT (id_project, name, plan_type, created_at)
    //             VALUES (?, ?, ?, NOW())`,
    //             [projectId, name, plan_type],
    //             err => {
    //                 if (err) return conn.rollback(() => callback(err));

    //                 conn.query(
    //                 `INSERT INTO CONTAINS (id_user, id_project)
    //                 VALUES (?, ?)`,
    //                 [userID, projectId],
    //                 err => {
    //                     if (err) return conn.rollback(() => callback(err));

    //                     conn.query(
    //                     `INSERT INTO BOARD (id_board, name, created_at, updated_at)
    //                     VALUES (?, 'TODO', NOW(), NOW()),
    //                             (?, 'IN PROGRESS', NOW(), NOW()),
    //                             (?, 'DONE', NOW(), NOW())`,
    //                     [todoId, inProgressId, doneId],
    //                     err => {
    //                         if (err) return conn.rollback(() => callback(err));

    //                         conn.query(
    //                         `INSERT INTO OWNS (id_project, id_board)
    //                         VALUES (?, ?),
    //                                 (?, ?),
    //                                 (?, ?)`,
    //                         [
    //                             projectId, todoId,
    //                             projectId, inProgressId,
    //                             projectId, doneId
    //                         ],
    //                         err => {
    //                             if (err) return conn.rollback(() => callback(err));

    //                             conn.query(
    //                             `INSERT INTO CREATES (id_user, id_board)
    //                             VALUES (?, ?),
    //                                     (?, ?),
    //                                     (?, ?)`,
    //                             [
    //                                 userID, todoId,
    //                                 userID, inProgressId,
    //                                 userID, doneId
    //                             ],
    //                             err => {
    //                                 if (err) return conn.rollback(() => callback(err));

    //                                 conn.commit(err => {
    //                                 if (err) return conn.rollback(() => callback(err));
    //                                 conn.release();
    //                                 callback(null, { projectId });
    //                                 });
    //                             }
    //                             );
    //                         }
    //                         );
    //                     }
    //                     );
    //                 }
    //                 );
    //             }
    //             );
    //         });
    //     });
    // }

    createDefaultProject: (name, plan_type, userID, callback) => {
        const projectId = randomUUID();

        const boardId = randomUUID();         
        const todoColId = randomUUID();
        const inProgressColId = randomUUID();
        const doneColId = randomUUID();

        db.getConnection((err, conn) => {
            if (err) return callback(err);

            conn.beginTransaction(err => {
            if (err) return callback(err);

            conn.query(
                `INSERT INTO PROJECT (id_project, name, plan_type, created_at)
                VALUES (?, ?, ?, NOW())`,
                [projectId, name, plan_type],
                err => {
                if (err) return conn.rollback(() => callback(err));

                conn.query(
                    `INSERT INTO CONTAINS (id_project, id_user)
                    VALUES (?, ?)`,
                    [projectId, userID],
                    err => {
                    if (err) return conn.rollback(() => callback(err));

                    conn.query(
                        `INSERT INTO BOARD (id_board, name, created_at, updated_at)
                        VALUES (?, ?, NOW(), NOW())`,
                        [boardId, name],
                        err => {
                        if (err) return conn.rollback(() => callback(err));

                        conn.query(
                            `INSERT INTO OWNS (id_project, id_board)
                            VALUES (?, ?)`,
                            [projectId, boardId],
                            err => {
                            if (err) return conn.rollback(() => callback(err));

                            conn.query(
                                `INSERT INTO COLONNE (id_COLONNE, title, position, created_at)
                                VALUES
                                (?, 'TODO', '1', NOW()),
                                (?, 'IN PROGRESS', '2', NOW()),
                                (?, 'DONE', '3', NOW())`,
                                [todoColId, inProgressColId, doneColId],
                                err => {
                                if (err) return conn.rollback(() => callback(err));

                                conn.query(
                                    `INSERT INTO HAS (id_board, id_COLONNE)
                                    VALUES
                                    (?, ?),
                                    (?, ?),
                                    (?, ?)`,
                                    [
                                    boardId, todoColId,
                                    boardId, inProgressColId,
                                    boardId, doneColId
                                    ],
                                    err => {
                                    if (err) return conn.rollback(() => callback(err));

                                    conn.commit(err => {
                                        if (err) return conn.rollback(() => callback(err));
                                        conn.release();
                                        callback(null, { projectId, boardId });
                                    });
                                    }
                                );
                                }
                            );
                            }
                        );
                        }
                    );
                    }
                );
                }
            );
            });
        });
    }
};