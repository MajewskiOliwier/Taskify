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
        List.create(name, board_id, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, name, board_id });
        });
    }
};
