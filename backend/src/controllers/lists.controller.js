const List = require("../models/lists.model");

module.exports = {
    getByBoard: (req, res) => {
        List.getByBoard(req.params.boardId, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    create: (req, res) => {
        const { name, board_id } = req.body;
        
        if (!name || !board_id)
            return res.status(400).json({ message: "name and board_id are required" });

        List.create(name, board_id, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ id: result.insertId, name, board_id });
        });
    },

    update: (req, res) => {
        const listId = req.params.listId;
        const { name } = req.body;

        if (!name)
            return res.status(400).json({ message: "name is required" });

        List.update(listId, name, (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0)
                return res.status(404).json({ message: "List not found" });

            res.json({ message: "List updated", id: listId, name });
        });
    },
    move: async (req, res) => {
        const listId = req.params.listId;
        const { new_position } = req.body;

        if (new_position === undefined)
            return res.status(400).json({ message: "new_position is required" });

        try {
            await List.move(listId, new_position);
            res.json({ message: "List moved successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    delete: (req, res) => {
        const listId = req.params.listId;

        List.delete(listId, (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0)
                return res.status(404).json({ message: "List not found" });

            res.json({ message: "List deleted" });
        });
    }
};
