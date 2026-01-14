const router = require("express").Router();
const controller = require("../controllers/project.controller");

router.get("/:projectID/columns", controller.getProjectColumns);
router.get("/:userID", controller.getUserProjects);
router.post("/:userID", controller.createDefaultProject);

module.exports = router;