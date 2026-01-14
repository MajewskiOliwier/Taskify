const router = require("express").Router();
const controller = require("../controllers/project.controller");

router.get("/:userID", controller.getUserProjects);
router.post("/:userID", controller.createDefaultProject);

module.exports = router;