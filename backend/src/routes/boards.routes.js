const router = require("express").Router();
const controller = require("../controllers/boards.controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:userID", controller.getUserBoard);
router.post("/:userID", controller.createNewBoard);

module.exports = router;
