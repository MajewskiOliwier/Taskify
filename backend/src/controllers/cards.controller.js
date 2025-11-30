const Card = require("../models/cards.model");

module.exports = {
    getByList: (req, res) => {
        Card.getByList(req.params.listId, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    create: (req, res) => {
        const { title, description, list_id } = req.body;
        Card.create(title, description, list_id, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({
                id: result.insertId,
                title,
                description,
                list_id
            });
        });
    },

    move: (req, res) => {
        const { new_list_id } = req.body;
        Card.move(req.params.cardId, new_list_id, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Card moved successfully!" });
        });
    }
};
