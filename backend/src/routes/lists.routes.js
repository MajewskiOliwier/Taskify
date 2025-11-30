const router = require("express").Router();
const controller = require("../controllers/lists.controller");

router.get("/:boardId", controller.getByBoard);
router.post("/", controller.create);

module.exports = router;
