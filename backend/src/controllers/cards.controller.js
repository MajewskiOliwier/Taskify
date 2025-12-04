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
        if (!title || !list_id){
            return res.status(400).json({message: "The title of the ID list is are required"})
        }
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
    delete: (req, res) => {
        const cardId = req.params.cardId;

        Card.delete(cardId, (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0)
                return res.status(404).json({ message: "Card not found" });

            res.json({ message: "Card deleted" });
        });
    },
    update: (req, res) => {
        const cardId = req.params.cardId;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required for update." });
        }

        Card.update(cardId, title, description, (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0)
                return res.status(404).json({ message: "Card not found" });

            res.json({ message: "Card updated successfully", id: cardId, title, description });
        });
    },
    getById: (req, res) => {
        Card.getById(req.params.cardId, (err, result) => {
            if (err) return res.status(500).json(err);
            if (!result) return res.status(404).json({ message: "Card not found" });
            res.json(result);
        });
    },
    move: async (req, res) => {
        const { new_list_id, new_position } = req.body;
        const cardId = req.params.cardId;
        if (!new_list_id || new_position === undefined) {
            return res.status(400).json({ message: "L'ID de la nouvelle liste et la position sont requis." });
        }
        try {
            await Card.move(cardId, new_list_id, new_position); 
            res.json({ message: "Card moved successfully!" });
        } catch (err) {
            console.error("Erreur lors du déplacement de la carte:", err);
            return res.status(500).json({ 
                message: "Erreur lors du déplacement de la carte.", 
                error: err.message 
            });
        }
    }
};
    