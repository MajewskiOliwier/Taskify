const db = require("../config/db");

module.exports = {

    getByList: (listId, callback) => {
        db.query("SELECT * FROM cards WHERE list_id = ?", [listId])
            .then(([rows]) => callback(null, rows))
            .catch(err => callback(err));
    },

    create: (title, description, listId, callback) => {
        db.query(
            "INSERT INTO cards (title, description, list_id) VALUES (?, ?, ?)",
            [title, description, listId]
        )
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },
    getById: (cardId, callback) => {
        db.query("SELECT * FROM cards WHERE id = ?", [cardId])
            .then(([rows]) => callback(null, rows.length ? rows[0] : null))
            .catch(err => callback(err));
    },
    update: (cardId, title, description, callback) => {
        db.query(
            "UPDATE cards SET title = ?, description = ? WHERE id = ?",
            [title, description, cardId]
        )
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },

    delete: (cardId, callback) => {
        db.query("DELETE FROM cards WHERE id = ?", [cardId])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },
    move: async (cardId, newListId, newPosition) => {

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [maxPositionResult] = await connection.query(
                "SELECT MAX(position) AS max_pos FROM cards WHERE list_id = ?",
                [newListId]
            );

            const maxPosition = maxPositionResult[0].max_pos === null
                ? 0
                : maxPositionResult[0].max_pos + 1;

            const finalPosition = Math.min(newPosition, maxPosition);
            await connection.query(
                "UPDATE cards SET position = position + 1 WHERE list_id = ? AND position >= ?",
                [newListId, finalPosition]
            );
            await connection.query(
                "UPDATE cards SET list_id = ?, position = ? WHERE id = ?",
                [newListId, finalPosition, cardId]
            );

            await connection.commit();

        } catch (error) {
            await connection.rollback();
            throw error;

        } finally {
            connection.release();
        }
    }

};
