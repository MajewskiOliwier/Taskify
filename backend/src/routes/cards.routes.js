const router = require("express").Router();
const controller = require("../controllers/cards.controller");

router.get("/:listId", controller.getByList);
router.post("/", controller.create);
router.put("/:cardId/move", controller.move);

module.exports = router;
