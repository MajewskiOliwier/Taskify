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
            res.json({ id: result.insertId, name });
        });
    }
};
