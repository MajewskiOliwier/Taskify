const router = require("express").Router();
const controller = require("../controllers/task.controller");

router.get("/:userID/project/:projectID/assigned", controller.getAssignedTasksFromProject); // all tasks to from the specific project user is part of 
router.get("/:userID", controller.getAssignedTasks); // all tasks to which user is assigned
router.get("/project/:projectID", controller.getProjectTasks); // all tasks to from the specific project user is part of 
//^may be ground for refactorisation to the project part rounts

router.post("/project/:projectID", controller.createTask);
router.post("/", controller.createTask);
router.put('/:taskID/project/:projectID/move', controller.moveTask);
router.put("/:taskID", controller.updateTask);
router.delete("/:taskID", controller.deleteTask);


module.exports = router;
