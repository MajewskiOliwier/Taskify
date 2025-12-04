const Board = require("../models/boards.model");

module.exports = {
    getAll: (req, res) => {
        Board.getAll((err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    create: (req, res) => {
        const { name } = req.body;
        Board.create(name, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ id: result.insertId, name });
        });
    },
    getById: (req, res) => {
        Board.getById(req.params.boardId, (err, result) => {
            if (err) return res.status(500).json(err);
            if (!result) return res.status(404).json({ message: "Board not found" });
            res.json(result);
        });
    },
    update: (req, res) => {
        const boardId = req.params.boardId;
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "name is required" });

        Board.update(boardId, name, (err, result) => {
            if (err) return res.status(500).json(err);
            
            if (result.affectedRows === 0)
                return res.status(404).json({ message: "Board not found" });

            res.json({ message: "Board updated", id: boardId, name });
        });
    },
    delete: (req, res) => {
        const boardId = req.params.boardId;

        Board.delete(boardId, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            if (result.affectedRows === 0)
                return res.status(404).json({ message: "Board not found" });

            res.json({ message: "Board deleted" });
        });
    }
};
