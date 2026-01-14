const router = require("express").Router();
const controller = require("../controllers/task.controller");

router.get("/:userID", controller.getAssignedTasks); // all tasks to which user is assigned
router.get("/project/:projectID", controller.getProjectTasks); // all tasks to from the specific project user is part of 
//^may be ground for refactorisation to the project part rounts
router.get("/:userID/project/:projectID/assigned", controller.getAssignedTasksFromProject); // all tasks to from the specific project user is part of 

router.post("/project/:projectID", controller.createTask);
router.post("/", controller.createTask);


module.exports = router;
