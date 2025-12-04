const db = require("../config/db");

module.exports = {
    getByBoard: (boardId, callback) => {
        db.query("SELECT * FROM lists WHERE board_id = ?", [boardId])
            .then(([rows]) => callback(null, rows))
            .catch(err => callback(err));
    },
    //ALTER TABLE lists ADD COLUMN position INT NOT NULL DEFAULT 0;
    //To put in the sql.Be able to manage the position of lists in a board if needed in the future.
    create: async (name, boardId, callback) => {
    try {
        // Récupérer la position max actuelle
        const [rows] = await db.query(
            "SELECT COALESCE(MAX(position), -1) AS max_pos FROM lists WHERE board_id = ?",
            [boardId]
        );

        const newPosition = rows[0].max_pos + 1;

        const [result] = await db.query(
            "INSERT INTO lists (name, board_id, position) VALUES (?, ?, ?)",
            [name, boardId, newPosition]
        );

        callback(null, result);

    } catch (err) {
        callback(err);
        }
    },

    update: (listId, name, callback) => {
        db.query("UPDATE lists SET name = ? WHERE id = ?", [name, listId])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    },
    move: async (listId, newPosition) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [[list]] = await connection.query(
            "SELECT board_id, position FROM lists WHERE id = ?",
            [listId]
        );

        if (!list) throw new Error("List not found");

        const boardId = list.board_id;
        const oldPosition = list.position;
        const [[maxPosRow]] = await connection.query(
            "SELECT MAX(position) AS max_pos FROM lists WHERE board_id = ?",
            [boardId]
        );

        const maxPosition = maxPosRow.max_pos;

        const finalPosition = Math.min(newPosition, maxPosition);
        if (finalPosition > oldPosition) {
            await connection.query(
                `UPDATE lists
                 SET position = position - 1
                 WHERE board_id = ? AND position > ? AND position <= ?`,
                [boardId, oldPosition, finalPosition]
            );
        } else {
            await connection.query(
                `UPDATE lists
                 SET position = position + 1
                 WHERE board_id = ? AND position >= ? AND position < ?`,
                [boardId, finalPosition, oldPosition]
            );
        }

       
        await connection.query(
            "UPDATE lists SET position = ? WHERE id = ?",
            [finalPosition, listId]
        );

        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
        }
    },

    delete: (listId, callback) => {
        db.query("DELETE FROM lists WHERE id = ?", [listId])
            .then(([result]) => callback(null, result))
            .catch(err => callback(err));
    }
};