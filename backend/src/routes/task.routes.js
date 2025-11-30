const router = require("express").Router();
const controller = require("../controllers/task.controller");

router.get("/:userID", controller.getAssignedTasks); // all tasks to which user is assigned
router.post("/", controller.create);

module.exports = router;
