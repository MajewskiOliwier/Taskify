const router = require("express").Router();
const controller = require("../controllers/task.controller");

router.get("/:userID", controller.getByList);
router.post("/", controller.create);
router.put("/:cardId/move", controller.move);

module.exports = router;
