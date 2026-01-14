const db = require("../config/db");
const { randomUUID } = require('crypto');

module.exports = {
    getParticipatingProjects: (userID, callback) =>{
        const getQuery = `
        SELECT b.*
            FROM USER u
            INNER JOIN board_member member ON u.id_user = member.id_user
            INNER JOIN BOARD b ON member.id_board = b.id_board
            WHERE u.id_user = ?
        `;

        db.query(getQuery, [userID], callback);
    },

    createDefaultProject: (name, plan_type, userID, callback) => {
        const projectId = randomUUID();
        const todoId = randomUUID();
        const inProgressId = randomUUID();
        const doneId = randomUUID();

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
                    `INSERT INTO BOARD (id_board, name, created_at, updated_at)
                    VALUES (?, 'TODO', NOW(), NOW()),
                            (?, 'IN PROGRESS', NOW(), NOW()),
                            (?, 'DONE', NOW(), NOW())`,
                    [todoId, inProgressId, doneId],
                    err => {
                    if (err) return conn.rollback(() => callback(err));

                    conn.query(
                        `INSERT INTO OWNS (id_project, id_board)
                        VALUES (?, ?),
                                (?, ?),
                                (?, ?)`,
                        [
                        projectId, todoId,
                        projectId, inProgressId,
                        projectId, doneId
                        ],
                        err => {
                        if (err) return conn.rollback(() => callback(err));

                        conn.query(
                            `INSERT INTO CREATES (id_user, id_board)
                            VALUES (?, ?),
                                    (?, ?),
                                    (?, ?)`,
                            [
                            userID, todoId,
                            userID, inProgressId,
                            userID, doneId
                            ],
                            err => {
                            if (err) return conn.rollback(() => callback(err));

                            conn.commit(err => {
                                if (err) return conn.rollback(() => callback(err));
                                conn.release();
                                callback(null, { projectId });
                            });
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