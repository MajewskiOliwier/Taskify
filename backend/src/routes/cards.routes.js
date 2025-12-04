const router = require("express").Router();
const controller = require("../controllers/cards.controller");

router.get("/:listId", controller.getByList);        // Get cards in list
router.post("/", controller.create);                // Add card
router.put("/:cardId/move", controller.move);       // Move card
router.patch("/:cardId", controller.update);        // Edit card
router.delete("/:cardId", controller.delete);       // Delete card

router.get("/id/:cardId", controller.getById);
module.exports = router;
