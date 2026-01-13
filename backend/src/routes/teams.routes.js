const router = require("express").Router();
const controller = require("../controllers/task.controller");

router.get("/availableBoards/:userID");

module.exports = router;
